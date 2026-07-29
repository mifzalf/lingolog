import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { settings } from '../../db/schema';
import type { Database } from '../decks/deck.repository';
import { DeckTransferError, parseDeckFile } from '../transfer/deck-transfer';
import { starterDecks as bundledStarterDecks, type StarterDeck } from './catalog';

export const CATALOG_FORMAT = 'lingolog.catalog';
export const CATALOG_FORMAT_VERSION = 1;
export const MAX_CATALOG_BYTES = 20 * 1024 * 1024;
export const MAX_CATALOG_DECKS = 250;
export const MAX_CATALOG_ENTRIES = 50_000;
const packageKey = (id: string) => `starter-catalog:${id}`;

const catalogDeckSchema = z.object({
  id: z.string().trim().min(1).max(100).regex(/^[a-z0-9][a-z0-9._-]*$/),
  version: z.number().int().positive(),
  level: z.enum(['pemula', 'menengah', 'lanjutan']),
  category: z.enum(['sehari-hari', 'perjalanan', 'sekolah', 'kerja', 'lainnya']),
  featured: z.boolean().optional(),
  summary: z.string().trim().min(1).max(240),
  file: z.unknown(),
}).strict();
const catalogPackageSchema = z.object({
  format: z.literal(CATALOG_FORMAT),
  version: z.literal(CATALOG_FORMAT_VERSION),
  packageId: z.string().trim().min(1).max(100).regex(/^[a-z0-9][a-z0-9._-]*$/),
  packageVersion: z.number().int().positive(),
  name: z.string().trim().min(1).max(80),
  publisher: z.string().trim().min(1).max(80),
  createdAt: z.string().datetime(),
  decks: z.array(catalogDeckSchema).min(1).max(MAX_CATALOG_DECKS),
}).strict();

type ParsedOuterPackage = z.infer<typeof catalogPackageSchema>;
export type StarterCatalogPackage = Omit<ParsedOuterPackage, 'decks'> & { decks: StarterDeck[] };
export type CatalogPackageSummary = Pick<StarterCatalogPackage, 'packageId' | 'packageVersion' | 'name' | 'publisher' | 'createdAt'> & { deckCount: number; entryCount: number };
export class CatalogPackageError extends Error {
  constructor(public code: 'INVALID_JSON' | 'INVALID_FORMAT' | 'UNSUPPORTED_VERSION' | 'TOO_LARGE' | 'EMPTY_PACKAGE' | 'VERSION_NOT_NEWER') { super(code); }
}

export function parseCatalogPackage(text: string): StarterCatalogPackage {
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { throw new CatalogPackageError('INVALID_JSON'); }
  if (!raw || typeof raw !== 'object' || (raw as { format?: unknown }).format !== CATALOG_FORMAT) throw new CatalogPackageError('INVALID_FORMAT');
  if ((raw as { version?: unknown }).version !== CATALOG_FORMAT_VERSION) throw new CatalogPackageError('UNSUPPORTED_VERSION');
  const outer = catalogPackageSchema.safeParse(raw);
  if (!outer.success) throw new CatalogPackageError('INVALID_FORMAT');
  const ids = new Set<string>(); let entryCount = 0;
  const decks = outer.data.decks.map((item) => {
    if (ids.has(item.id)) throw new CatalogPackageError('INVALID_FORMAT');
    ids.add(item.id);
    let file;
    try { file = parseDeckFile(JSON.stringify(item.file)); } catch (cause) {
      if (cause instanceof DeckTransferError && cause.code === 'UNSUPPORTED_VERSION') throw new CatalogPackageError('UNSUPPORTED_VERSION');
      throw new CatalogPackageError('INVALID_FORMAT');
    }
    if (!file.deck.contentType || file.deck.entries.some((entry) => entry.type !== file.deck.contentType)) throw new CatalogPackageError('INVALID_FORMAT');
    entryCount += file.deck.entries.length;
    if (entryCount > MAX_CATALOG_ENTRIES) throw new CatalogPackageError('TOO_LARGE');
    return { ...item, file };
  });
  return { ...outer.data, decks };
}

export function mergeStarterCatalog(packages: StarterCatalogPackage[]) {
  const merged = new Map(bundledStarterDecks.map((deck) => [deck.id, deck]));
  for (const catalogPackage of [...packages].sort((a, b) => a.packageVersion - b.packageVersion)) {
    for (const deck of catalogPackage.decks) {
      const current = merged.get(deck.id);
      if (!current || deck.version > current.version) merged.set(deck.id, deck);
    }
  }
  return [...merged.values()];
}

export async function listCatalogPackages(database: Database) {
  const rows = await database.select().from(settings);
  const packages: StarterCatalogPackage[] = [];
  for (const row of rows) {
    if (!row.key.startsWith('starter-catalog:')) continue;
    try { packages.push(parseCatalogPackage(row.value)); } catch { /* Paket rusak tidak boleh merusak katalog bawaan. */ }
  }
  return packages;
}

export async function listAvailableStarterDecks(database: Database) {
  return mergeStarterCatalog(await listCatalogPackages(database));
}

export async function saveCatalogPackage(database: Database, catalogPackage: StarterCatalogPackage) {
  const key = packageKey(catalogPackage.packageId);
  const existing = await database.query.settings.findFirst({ where: eq(settings.key, key) });
  if (existing) {
    try {
      const previous = parseCatalogPackage(existing.value);
      if (catalogPackage.packageVersion <= previous.packageVersion) throw new CatalogPackageError('VERSION_NOT_NEWER');
    } catch (cause) { if (cause instanceof CatalogPackageError && cause.code === 'VERSION_NOT_NEWER') throw cause; }
  }
  const before = mergeStarterCatalog(await listCatalogPackages(database));
  const beforeVersions = new Map(before.map((deck) => [deck.id, deck.version]));
  const added = catalogPackage.decks.filter((deck) => !beforeVersions.has(deck.id)).length;
  const updated = catalogPackage.decks.filter((deck) => { const version = beforeVersions.get(deck.id); return version !== undefined && version < deck.version; }).length;
  const ignored = catalogPackage.decks.length - added - updated;
  const now = new Date();
  await database.insert(settings).values({ key, value: JSON.stringify(catalogPackage), updatedAt: now }).onConflictDoUpdate({ target: settings.key, set: { value: JSON.stringify(catalogPackage), updatedAt: now } });
  return { added, updated, ignored, deckCount: catalogPackage.decks.length, entryCount: catalogPackage.decks.reduce((total, deck) => total + deck.file.deck.entries.length, 0) };
}

export function catalogPackageSummary(catalogPackage: StarterCatalogPackage): CatalogPackageSummary {
  return { packageId: catalogPackage.packageId, packageVersion: catalogPackage.packageVersion, name: catalogPackage.name, publisher: catalogPackage.publisher, createdAt: catalogPackage.createdAt, deckCount: catalogPackage.decks.length, entryCount: catalogPackage.decks.reduce((total, deck) => total + deck.file.deck.entries.length, 0) };
}

export function catalogPackageErrorMessage(cause: unknown) {
  if (!(cause instanceof CatalogPackageError)) return 'Paket katalog tidak dapat diproses.';
  return ({ INVALID_JSON: 'File bukan JSON yang dapat dibaca.', INVALID_FORMAT: 'File bukan paket Deck siap pakai Lingolog yang valid atau isinya rusak.', UNSUPPORTED_VERSION: 'Versi paket belum didukung aplikasi ini.', TOO_LARGE: 'Paket melewati batas 20 MB atau 50.000 materi.', EMPTY_PACKAGE: 'Paket tidak berisi deck.', VERSION_NOT_NEWER: 'Versi paket ini sama atau lebih lama daripada yang sudah diimpor.' } as const)[cause.code];
}
