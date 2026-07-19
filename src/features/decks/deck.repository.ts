import { asc, count, eq, sql } from 'drizzle-orm';
import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import * as schema from '../../db/schema';
import { activityEvents, decks, entries, entryTags, masteryStates, practiceSessionDecks, practiceSessions } from '../../db/schema';

export type Database = ExpoSQLiteDatabase<typeof schema>;
export type DeckInput = {
  name: string;
  description?: string;
  sourceLanguage: string;
  targetLanguage: string;
  color?: string;
};

export type DeckSummary = typeof decks.$inferSelect & { entryCount: number; masteredCount: number };

export async function listDecks(database: Database, archived?: boolean): Promise<DeckSummary[]> {
  const query = database
    .select({
      id: decks.id,
      name: decks.name,
      description: decks.description,
      sourceLanguage: decks.sourceLanguage,
      targetLanguage: decks.targetLanguage,
      color: decks.color,
      isArchived: decks.isArchived,
      createdAt: decks.createdAt,
      updatedAt: decks.updatedAt,
      entryCount: count(entries.id),
      masteredCount: sql<number>`coalesce(sum(case when ${masteryStates.grade} = 3 then 1 else 0 end), 0)`,
    })
    .from(decks)
    .leftJoin(entries, eq(entries.deckId, decks.id))
    .leftJoin(masteryStates, eq(masteryStates.entryId, entries.id))
    .where(archived === undefined ? undefined : eq(decks.isArchived, archived))
    .groupBy(decks.id)
    .orderBy(asc(decks.isArchived), asc(decks.name));
  return query;
}

export async function getDeck(database: Database, id: number) {
  return database.query.decks.findFirst({ where: eq(decks.id, id) });
}

export async function createDeck(database: Database, input: DeckInput) {
  const now = new Date();
  const [created] = await database.insert(decks).values({
    name: input.name.trim(),
    description: input.description?.trim() || null,
    sourceLanguage: input.sourceLanguage,
    targetLanguage: input.targetLanguage,
    color: input.color ?? '#355A46',
    createdAt: now,
    updatedAt: now,
  }).returning();
  return created;
}

export async function updateDeck(database: Database, id: number, input: DeckInput) {
  const [updated] = await database.update(decks).set({
    name: input.name.trim(),
    description: input.description?.trim() || null,
    sourceLanguage: input.sourceLanguage,
    targetLanguage: input.targetLanguage,
    color: input.color ?? '#355A46',
    updatedAt: new Date(),
  }).where(eq(decks.id, id)).returning();
  return updated;
}

export async function setDeckArchived(database: Database, id: number, archived: boolean) {
  await database.update(decks).set({ isArchived: archived, updatedAt: new Date() }).where(eq(decks.id, id));
}

export async function deleteDeck(database: Database, id: number) {
  await database.delete(decks).where(eq(decks.id, id));
}

export async function hasEntries(database: Database, id: number) {
  const [row] = await database.select({ value: count(entries.id) }).from(entries).where(eq(entries.deckId, id));
  return (row?.value ?? 0) > 0;
}

export async function listCompatibleDecks(database: Database, sourceId: number) {
  const source = await getDeck(database, sourceId); if (!source) return [];
  return listDecks(database).then((rows) => rows.filter((deck) => deck.id !== sourceId && deck.sourceLanguage === source.sourceLanguage && deck.targetLanguage === source.targetLanguage));
}

export async function duplicateDeck(database: Database, sourceId: number) {
  return database.transaction(async (transaction) => {
    const source = await transaction.query.decks.findFirst({ where: eq(decks.id, sourceId) }); if (!source) throw new Error('DECK_NOT_FOUND');
    const now = new Date();
    const [copy] = await transaction.insert(decks).values({ name: `${source.name} (salinan)`, description: source.description, sourceLanguage: source.sourceLanguage, targetLanguage: source.targetLanguage, color: source.color, createdAt: now, updatedAt: now }).returning();
    const sourceEntries = await transaction.select().from(entries).where(eq(entries.deckId, sourceId)).orderBy(asc(entries.id));
    for (const item of sourceEntries) {
      const [created] = await transaction.insert(entries).values({ deckId: copy.id, type: item.type, sourceText: item.sourceText, translatedText: item.translatedText, notes: item.notes, exampleText: item.exampleText, exampleTranslation: item.exampleTranslation, isFavorite: item.isFavorite, createdAt: now, updatedAt: now }).returning();
      await transaction.insert(masteryStates).values({ entryId: created.id, updatedAt: now });
      const assigned = await transaction.select({ tagId: entryTags.tagId }).from(entryTags).where(eq(entryTags.entryId, item.id));
      if (assigned.length) await transaction.insert(entryTags).values(assigned.map(({ tagId }) => ({ entryId: created.id, tagId })));
    }
    return copy;
  });
}

export async function mergeDecks(database: Database, sourceId: number, destinationId: number) {
  if (sourceId === destinationId) throw new Error('SAME_DECK');
  return database.transaction(async (transaction) => {
    const [source, destination] = await Promise.all([transaction.query.decks.findFirst({ where: eq(decks.id, sourceId) }), transaction.query.decks.findFirst({ where: eq(decks.id, destinationId) })]);
    if (!source || !destination) throw new Error('DECK_NOT_FOUND');
    if (source.sourceLanguage !== destination.sourceLanguage || source.targetLanguage !== destination.targetLanguage) throw new Error('INCOMPATIBLE_LANGUAGES');
    const sessionRows = await transaction.select({ sessionId: practiceSessionDecks.sessionId }).from(practiceSessionDecks).where(eq(practiceSessionDecks.deckId, sourceId));
    if (sessionRows.length) await transaction.insert(practiceSessionDecks).values(sessionRows.map(({ sessionId }) => ({ sessionId, deckId: destinationId }))).onConflictDoNothing();
    await transaction.delete(practiceSessionDecks).where(eq(practiceSessionDecks.deckId, sourceId));
    await transaction.update(practiceSessions).set({ deckId: destinationId }).where(eq(practiceSessions.deckId, sourceId));
    await transaction.update(activityEvents).set({ deckId: destinationId }).where(eq(activityEvents.deckId, sourceId));
    await transaction.update(entries).set({ deckId: destinationId, updatedAt: new Date() }).where(eq(entries.deckId, sourceId));
    await transaction.update(decks).set({ updatedAt: new Date() }).where(eq(decks.id, destinationId));
    await transaction.delete(decks).where(eq(decks.id, sourceId));
    return destination;
  });
}
