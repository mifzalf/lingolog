import { eq } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { createEntry, findDuplicate } from '../entries/entry.repository';
import { activityEvents, entries, entryTags, masteryStates, settings, tags, decks } from '../../db/schema';
import type { StarterDeck } from './catalog';
import type { LingologDeckFile } from '../transfer/deck-transfer';

const key = (id: string) => `starter-deck:${id}`;
export type StarterDeckInstallation = { catalogId: string; version: number; deckId: number; installedAt: string };

export async function listStarterDeckInstallations(database: Database) {
  const rows = await database.select().from(settings);
  const result = new Map<string, StarterDeckInstallation>();
  for (const row of rows) { if (!row.key.startsWith('starter-deck:')) continue; try { const value = JSON.parse(row.value) as StarterDeckInstallation; if (value.catalogId && Number.isInteger(value.deckId)) result.set(value.catalogId, value); } catch { /* Abaikan penanda lama yang rusak. */ } }
  return result;
}

function cleanTags(values: string[]) { return [...new Set(values.map((value) => value.trim().toLocaleLowerCase()).filter(Boolean))].slice(0, 12); }

type StarterEntry = LingologDeckFile['deck']['entries'][number];
export function starterEntryKey(entry: Pick<StarterEntry, 'sourceText' | 'translatedText'>) {
  return `${entry.sourceText.normalize('NFKC').trim().toLocaleLowerCase()}\u0000${entry.translatedText.normalize('NFKC').trim().toLocaleLowerCase()}`;
}

export async function listCopiedStarterEntryKeys(database: Database, deckId: number) {
  const rows = await database.select({ sourceText: entries.sourceText, translatedText: entries.translatedText }).from(entries).where(eq(entries.deckId, deckId));
  return new Set(rows.map(starterEntryKey));
}

export async function copyStarterEntry(database: Database, starter: StarterDeck, entry: StarterEntry, destinationDeckId: number) {
  if (!starter.file.deck.entries.includes(entry)) throw new Error('ENTRY_NOT_IN_STARTER_DECK');
  const destination = await database.query.decks.findFirst({ where: eq(decks.id, destinationDeckId) });
  if (!destination) throw new Error('DESTINATION_NOT_FOUND');
  if (destination.isArchived) throw new Error('DESTINATION_ARCHIVED');
  if (destination.sourceLanguage !== starter.file.deck.sourceLanguage || destination.targetLanguage !== starter.file.deck.targetLanguage) throw new Error('INCOMPATIBLE_LANGUAGES');
  const input = { deckId: destinationDeckId, type: entry.type, sourceText: entry.sourceText, translatedText: entry.translatedText, notes: entry.notes ?? undefined, exampleText: entry.exampleText ?? undefined, exampleTranslation: entry.exampleTranslation ?? undefined, isFavorite: false, tags: entry.tags };
  const duplicate = await findDuplicate(database, input);
  if (duplicate) return { entryId: duplicate.id, alreadyExists: true };
  const created = await createEntry(database, input);
  return { entryId: created.id, alreadyExists: false };
}

export async function copyStarterEntries(database: Database, starter: StarterDeck, selected: StarterEntry[], destinationDeckId: number) {
  if (!selected.length) return { added: 0, skipped: 0 };
  if (selected.some((entry) => !starter.file.deck.entries.includes(entry))) throw new Error('ENTRY_NOT_IN_STARTER_DECK');
  return database.transaction(async (transaction) => {
    const destination = await transaction.query.decks.findFirst({ where: eq(decks.id, destinationDeckId) });
    if (!destination) throw new Error('DESTINATION_NOT_FOUND');
    if (destination.isArchived) throw new Error('DESTINATION_ARCHIVED');
    if (destination.sourceLanguage !== starter.file.deck.sourceLanguage || destination.targetLanguage !== starter.file.deck.targetLanguage) throw new Error('INCOMPATIBLE_LANGUAGES');
    const existingRows = await transaction.select({ sourceText: entries.sourceText, translatedText: entries.translatedText }).from(entries).where(eq(entries.deckId, destinationDeckId));
    const existing = new Set(existingRows.map(starterEntryKey)); const now = new Date(); let added = 0; let skipped = 0;
    for (const item of selected) {
      const itemKey = starterEntryKey(item); if (existing.has(itemKey)) { skipped += 1; continue; }
      const [entry] = await transaction.insert(entries).values({ deckId: destinationDeckId, type: item.type, sourceText: item.sourceText.trim(), translatedText: item.translatedText.trim(), notes: item.notes?.trim() || null, exampleText: item.exampleText?.trim() || null, exampleTranslation: item.exampleTranslation?.trim() || null, isFavorite: false, createdAt: now, updatedAt: now }).returning();
      await transaction.insert(masteryStates).values({ entryId: entry.id, updatedAt: now });
      await transaction.insert(activityEvents).values({ type: 'entry_created', entryId: entry.id, deckId: destinationDeckId, occurredAt: now });
      for (const name of cleanTags(item.tags)) { await transaction.insert(tags).values({ name }).onConflictDoNothing(); const tag = await transaction.query.tags.findFirst({ where: eq(tags.name, name) }); if (tag) await transaction.insert(entryTags).values({ entryId: entry.id, tagId: tag.id }).onConflictDoNothing(); }
      existing.add(itemKey); added += 1;
    }
    if (added) await transaction.update(decks).set({ updatedAt: now }).where(eq(decks.id, destinationDeckId));
    return { added, skipped };
  });
}

export async function installStarterDeck(database: Database, starter: StarterDeck) {
  return database.transaction(async (transaction) => {
    const marker = await transaction.query.settings.findFirst({ where: eq(settings.key, key(starter.id)) });
    if (marker) { try { const installed = JSON.parse(marker.value) as StarterDeckInstallation; const existing = await transaction.query.decks.findFirst({ where: eq(decks.id, installed.deckId) }); if (existing) return { deck: existing, alreadyInstalled: true }; } catch { /* Penanda akan diganti. */ } }
    const now = new Date(); const input = starter.file.deck;
    const [deck] = await transaction.insert(decks).values({ name: input.name, description: input.description?.trim() || null, sourceLanguage: input.sourceLanguage, targetLanguage: input.targetLanguage, color: input.color ?? '#355A46', createdAt: now, updatedAt: now }).returning();
    for (const item of input.entries) {
      const [entry] = await transaction.insert(entries).values({ deckId: deck.id, type: item.type, sourceText: item.sourceText, translatedText: item.translatedText, notes: item.notes?.trim() || null, exampleText: item.exampleText?.trim() || null, exampleTranslation: item.exampleTranslation?.trim() || null, isFavorite: false, createdAt: now, updatedAt: now }).returning();
      await transaction.insert(masteryStates).values({ entryId: entry.id, updatedAt: now });
      for (const name of cleanTags(item.tags)) { await transaction.insert(tags).values({ name }).onConflictDoNothing(); const tag = await transaction.query.tags.findFirst({ where: eq(tags.name, name) }); if (tag) await transaction.insert(entryTags).values({ entryId: entry.id, tagId: tag.id }).onConflictDoNothing(); }
    }
    const installation: StarterDeckInstallation = { catalogId: starter.id, version: starter.version, deckId: deck.id, installedAt: now.toISOString() };
    await transaction.insert(settings).values({ key: key(starter.id), value: JSON.stringify(installation), updatedAt: now }).onConflictDoUpdate({ target: settings.key, set: { value: JSON.stringify(installation), updatedAt: now } });
    return { deck, alreadyInstalled: false };
  });
}

export async function repairStarterDeckMarkers(database: Database) {
  const installations = await listStarterDeckInstallations(database); let changed = false;
  for (const installation of installations.values()) { const exists = await database.query.decks.findFirst({ where: eq(decks.id, installation.deckId) }); if (!exists) { await database.delete(settings).where(eq(settings.key, key(installation.catalogId))); changed = true; } }
  return changed;
}
