import { asc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import type { Database } from '../decks/deck.repository';
import { activityEvents, decks, entries, entryTags, masteryStates, tags } from '../../db/schema';

export const DECK_FORMAT = 'lingolog.deck';
export const DECK_FORMAT_VERSION = 1;
export const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
export const MAX_IMPORT_ENTRIES = 20_000;

const nullableText = z.string().max(1_000).nullable();
const entrySchema = z.object({
  type: z.enum(['word', 'phrase', 'sentence']), sourceText: z.string().trim().min(1).max(500), translatedText: z.string().trim().min(1).max(500),
  notes: nullableText, exampleText: z.string().max(500).nullable(), exampleTranslation: z.string().max(500).nullable(), tags: z.array(z.string().trim().min(1).max(60)).max(12),
}).strict();
const deckSchema = z.object({ name: z.string().trim().min(1).max(60), description: z.string().max(180).nullable(), sourceLanguage: z.string().min(2).max(35), targetLanguage: z.string().min(2).max(35), color: z.string().max(30).nullable(), entries: z.array(entrySchema).max(MAX_IMPORT_ENTRIES) }).strict().refine((deck) => deck.sourceLanguage !== deck.targetLanguage, { message: 'Language pair must differ' });
const deckFileSchema = z.object({ format: z.literal(DECK_FORMAT), version: z.literal(DECK_FORMAT_VERSION), exportedAt: z.string().datetime(), deck: deckSchema }).strict();
export type LingologDeckFile = z.infer<typeof deckFileSchema>;

export class DeckTransferError extends Error { constructor(public code: 'NOT_FOUND' | 'INVALID_JSON' | 'INVALID_FORMAT' | 'UNSUPPORTED_VERSION' | 'TOO_LARGE' | 'EMPTY_DECK') { super(code); } }

export function parseDeckFile(text: string): LingologDeckFile {
  let raw: unknown; try { raw = JSON.parse(text); } catch { throw new DeckTransferError('INVALID_JSON'); }
  if (!raw || typeof raw !== 'object' || (raw as { format?: unknown }).format !== DECK_FORMAT) throw new DeckTransferError('INVALID_FORMAT');
  if ((raw as { version?: unknown }).version !== DECK_FORMAT_VERSION) throw new DeckTransferError('UNSUPPORTED_VERSION');
  const result = deckFileSchema.safeParse(raw); if (!result.success) throw new DeckTransferError('INVALID_FORMAT');
  return result.data;
}

export async function buildDeckExport(database: Database, deckId: number): Promise<LingologDeckFile> {
  const deck = await database.query.decks.findFirst({ where: eq(decks.id, deckId) }); if (!deck) throw new DeckTransferError('NOT_FOUND');
  const rows = await database.select({ id: entries.id, type: entries.type, sourceText: entries.sourceText, translatedText: entries.translatedText, notes: entries.notes, exampleText: entries.exampleText, exampleTranslation: entries.exampleTranslation, tagNames: sql<string>`coalesce(group_concat(${tags.name}, '|||'), '')` }).from(entries).leftJoin(entryTags, eq(entryTags.entryId, entries.id)).leftJoin(tags, eq(tags.id, entryTags.tagId)).where(eq(entries.deckId, deckId)).groupBy(entries.id).orderBy(asc(entries.id));
  return { format: DECK_FORMAT, version: DECK_FORMAT_VERSION, exportedAt: new Date().toISOString(), deck: { name: deck.name, description: deck.description, sourceLanguage: deck.sourceLanguage, targetLanguage: deck.targetLanguage, color: deck.color, entries: rows.map(({ id: _id, tagNames, ...entry }) => ({ ...entry, tags: tagNames ? tagNames.split('|||') : [] })) } };
}

function cleanTags(values: string[]) { return [...new Set(values.map((value) => value.trim().toLocaleLowerCase()).filter(Boolean))].slice(0, 12); }
export async function importDeckFile(database: Database, file: LingologDeckFile) {
  return database.transaction(async (transaction) => {
    const now = new Date(); const input = file.deck;
    const [deck] = await transaction.insert(decks).values({ name: input.name, description: input.description?.trim() || null, sourceLanguage: input.sourceLanguage, targetLanguage: input.targetLanguage, color: input.color ?? '#355A46', createdAt: now, updatedAt: now }).returning();
    for (const item of input.entries) {
      const [entry] = await transaction.insert(entries).values({ deckId: deck.id, type: item.type, sourceText: item.sourceText, translatedText: item.translatedText, notes: item.notes?.trim() || null, exampleText: item.exampleText?.trim() || null, exampleTranslation: item.exampleTranslation?.trim() || null, isFavorite: false, createdAt: now, updatedAt: now }).returning();
      await transaction.insert(masteryStates).values({ entryId: entry.id, updatedAt: now });
      for (const name of cleanTags(item.tags)) { await transaction.insert(tags).values({ name }).onConflictDoNothing(); const tag = await transaction.query.tags.findFirst({ where: eq(tags.name, name) }); if (tag) await transaction.insert(entryTags).values({ entryId: entry.id, tagId: tag.id }).onConflictDoNothing(); }
    }
    await transaction.insert(activityEvents).values({ type: 'deck_imported', deckId: deck.id, occurredAt: now });
    return deck;
  });
}

export function safeDeckFileName(name: string) { const base = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'deck'; return `${base}.lingolog.json`; }
export function transferErrorMessage(cause: unknown) { if (!(cause instanceof DeckTransferError)) return 'File tidak dapat diproses. Coba lagi.'; return ({ NOT_FOUND: 'Deck tidak ditemukan.', INVALID_JSON: 'File bukan JSON yang dapat dibaca.', INVALID_FORMAT: 'File bukan deck Lingolog yang valid atau isinya rusak.', UNSUPPORTED_VERSION: 'Versi file deck belum didukung oleh aplikasi ini.', TOO_LARGE: 'File lebih besar dari batas 5 MB.', EMPTY_DECK: 'File deck tidak berisi data.' } as const)[cause.code]; }
