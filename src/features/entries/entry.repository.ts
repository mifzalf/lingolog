import { and, asc, desc, eq, ne, or, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, entries, entryTags, masteryStates, tags } from '../../db/schema';

export type EntryType = 'word' | 'phrase' | 'sentence';
export type EntryInput = {
  deckId: number;
  type: EntryType;
  sourceText: string;
  translatedText: string;
  notes?: string;
  exampleText?: string;
  exampleTranslation?: string;
  isFavorite: boolean;
  tags: string[];
};

export type EntryListItem = typeof entries.$inferSelect & { grade: number; tagNames: string[] };
export type EntrySort = 'alphabetical' | 'newest' | 'oldest' | 'updated';
export type EntryFilters = {
  search?: string;
  type?: EntryType;
  favoritesOnly?: boolean;
  grade?: number;
  tag?: string;
  sort?: EntrySort;
};

export async function getEntryCount(database: Database, deckId: number) {
  const [row] = await database.select({ value: sql<number>`count(*)` }).from(entries).where(eq(entries.deckId, deckId));
  return row?.value ?? 0;
}

export async function listEntryTags(database: Database, deckId: number) {
  return database.select({ name: tags.name, count: sql<number>`count(distinct ${entryTags.entryId})` })
    .from(tags)
    .innerJoin(entryTags, eq(entryTags.tagId, tags.id))
    .innerJoin(entries, eq(entries.id, entryTags.entryId))
    .where(eq(entries.deckId, deckId))
    .groupBy(tags.id)
    .orderBy(asc(tags.name));
}

export async function listEntries(database: Database, deckId: number, filters: EntryFilters = {}): Promise<EntryListItem[]> {
  const search = filters.search?.trim().toLocaleLowerCase();
  const conditions = [eq(entries.deckId, deckId)];
  if (filters.type) conditions.push(eq(entries.type, filters.type));
  if (filters.favoritesOnly) conditions.push(eq(entries.isFavorite, true));
  if (filters.grade !== undefined) conditions.push(sql`coalesce(${masteryStates.grade}, 0) = ${filters.grade}`);
  if (filters.tag) conditions.push(sql`exists (
    select 1 from entry_tags selected_entry_tags
    inner join tags selected_tags on selected_tags.id = selected_entry_tags.tag_id
    where selected_entry_tags.entry_id = ${entries.id} and selected_tags.name = ${filters.tag}
  )`);
  if (search) {
    const pattern = `%${search}%`;
    conditions.push(or(
      sql`lower(${entries.sourceText}) like ${pattern}`,
      sql`lower(${entries.translatedText}) like ${pattern}`,
      sql`lower(coalesce(${entries.notes}, '')) like ${pattern}`,
      sql`lower(coalesce(${entries.exampleText}, '')) like ${pattern}`,
      sql`lower(coalesce(${entries.exampleTranslation}, '')) like ${pattern}`,
      sql`exists (
        select 1 from entry_tags searched_entry_tags
        inner join tags searched_tags on searched_tags.id = searched_entry_tags.tag_id
        where searched_entry_tags.entry_id = ${entries.id} and lower(searched_tags.name) like ${pattern}
      )`,
    )!);
  }
  const order = filters.sort === 'newest' ? desc(entries.createdAt)
    : filters.sort === 'oldest' ? asc(entries.createdAt)
    : filters.sort === 'updated' ? desc(entries.updatedAt)
    : asc(entries.sourceText);

  const rows = await database
    .select({
      id: entries.id, deckId: entries.deckId, type: entries.type, sourceText: entries.sourceText,
      translatedText: entries.translatedText, notes: entries.notes, exampleText: entries.exampleText,
      exampleTranslation: entries.exampleTranslation, isFavorite: entries.isFavorite,
      createdAt: entries.createdAt, updatedAt: entries.updatedAt,
      grade: sql<number>`coalesce(${masteryStates.grade}, 0)`,
      tagNames: sql<string>`coalesce(group_concat(${tags.name}, '|||'), '')`,
    })
    .from(entries)
    .leftJoin(masteryStates, eq(masteryStates.entryId, entries.id))
    .leftJoin(entryTags, eq(entryTags.entryId, entries.id))
    .leftJoin(tags, eq(tags.id, entryTags.tagId))
    .where(and(...conditions))
    .groupBy(entries.id)
    .orderBy(order, asc(entries.sourceText));

  return rows.map((row) => ({ ...row, tagNames: row.tagNames ? row.tagNames.split('|||') : [] }));
}

export async function getEntry(database: Database, id: number) {
  const entry = await database.query.entries.findFirst({ where: eq(entries.id, id) });
  if (!entry) return undefined;
  const assignedTags = await database.select({ name: tags.name }).from(entryTags).innerJoin(tags, eq(tags.id, entryTags.tagId)).where(eq(entryTags.entryId, id));
  return { ...entry, tags: assignedTags.map((tag) => tag.name) };
}

export async function findDuplicate(database: Database, input: Pick<EntryInput, 'deckId' | 'sourceText' | 'translatedText'>, excludeId?: number) {
  const conditions = [
    eq(entries.deckId, input.deckId),
    sql`lower(trim(${entries.sourceText})) = lower(trim(${input.sourceText}))`,
    sql`lower(trim(${entries.translatedText})) = lower(trim(${input.translatedText}))`,
  ];
  if (excludeId) conditions.push(ne(entries.id, excludeId));
  return database.select({ id: entries.id }).from(entries).where(and(...conditions)).limit(1).then((rows) => rows[0]);
}

function cleanTags(values: string[]) {
  return [...new Set(values.map((tag) => tag.trim().toLocaleLowerCase()).filter(Boolean))].slice(0, 12);
}

async function replaceTags(transaction: Parameters<Parameters<Database['transaction']>[0]>[0], entryId: number, names: string[]) {
  await transaction.delete(entryTags).where(eq(entryTags.entryId, entryId));
  for (const name of cleanTags(names)) {
    await transaction.insert(tags).values({ name }).onConflictDoNothing();
    const tag = await transaction.query.tags.findFirst({ where: eq(tags.name, name) });
    if (tag) await transaction.insert(entryTags).values({ entryId, tagId: tag.id }).onConflictDoNothing();
  }
}

export async function createEntry(database: Database, input: EntryInput) {
  return database.transaction(async (transaction) => {
    const now = new Date();
    const [created] = await transaction.insert(entries).values({
      deckId: input.deckId, type: input.type, sourceText: input.sourceText.trim(), translatedText: input.translatedText.trim(),
      notes: input.notes?.trim() || null, exampleText: input.exampleText?.trim() || null,
      exampleTranslation: input.exampleTranslation?.trim() || null, isFavorite: input.isFavorite,
      createdAt: now, updatedAt: now,
    }).returning();
    await transaction.insert(masteryStates).values({ entryId: created.id, updatedAt: now });
    await transaction.insert(activityEvents).values({ type: 'entry_created', entryId: created.id, deckId: input.deckId, occurredAt: now });
    await replaceTags(transaction, created.id, input.tags);
    return created;
  });
}

export async function updateEntry(database: Database, id: number, input: EntryInput) {
  return database.transaction(async (transaction) => {
    const [updated] = await transaction.update(entries).set({
      type: input.type, sourceText: input.sourceText.trim(), translatedText: input.translatedText.trim(),
      notes: input.notes?.trim() || null, exampleText: input.exampleText?.trim() || null,
      exampleTranslation: input.exampleTranslation?.trim() || null, isFavorite: input.isFavorite, updatedAt: new Date(),
    }).where(and(eq(entries.id, id), eq(entries.deckId, input.deckId))).returning();
    await replaceTags(transaction, id, input.tags);
    return updated;
  });
}

export async function deleteEntry(database: Database, id: number) {
  await database.delete(entries).where(eq(entries.id, id));
}

export async function toggleFavorite(database: Database, id: number, favorite: boolean) {
  await database.update(entries).set({ isFavorite: favorite, updatedAt: new Date() }).where(eq(entries.id, id));
}
