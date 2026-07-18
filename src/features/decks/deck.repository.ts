import { asc, count, eq, sql } from 'drizzle-orm';
import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import * as schema from '../../db/schema';
import { decks, entries, masteryStates } from '../../db/schema';

export type Database = ExpoSQLiteDatabase<typeof schema>;
export type DeckInput = {
  name: string;
  description?: string;
  sourceLanguage: string;
  targetLanguage: string;
  color?: string;
};

export type DeckSummary = typeof decks.$inferSelect & { entryCount: number; masteredCount: number };

export async function listDecks(database: Database, archived = false): Promise<DeckSummary[]> {
  return database
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
    .where(eq(decks.isArchived, archived))
    .groupBy(decks.id)
    .orderBy(asc(decks.name));
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
