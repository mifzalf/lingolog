import { and, asc, eq, gte, inArray, lt, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { decks, entries, masteryStates, practiceSessionDecks, practiceSessionEntries, practiceSessions } from '../../db/schema';

export type PracticeMode = 'flashcard' | 'dictation';
export type FlashcardDirection = 'source_to_target' | 'target_to_source' | 'mixed';
export type DictationVariant = 'audio_to_source' | 'meaning_to_source';
export type PracticeConfig = {
  deckIds: number[];
  dateFrom?: string;
  dateTo?: string;
  grades: number[];
  itemLimit: number;
  shuffle: boolean;
  flashcardDirection: FlashcardDirection;
  dictationVariant: DictationVariant;
};
export type PracticeCandidate = {
  id: number; deckId: number; type: 'word' | 'phrase' | 'sentence'; sourceText: string; translatedText: string;
  exampleText: string | null; sourceLanguage: string; targetLanguage: string; deckName: string; grade: number;
};

export function isValidPracticeDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
function localDate(value: string, endExclusive = false) {
  if (!isValidPracticeDate(value)) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day + Number(endExclusive));
}
function conditions(config: PracticeConfig) {
  const values = [inArray(entries.deckId, config.deckIds)];
  const from = config.dateFrom ? localDate(config.dateFrom) : undefined;
  const to = config.dateTo ? localDate(config.dateTo, true) : undefined;
  if (from) values.push(gte(entries.createdAt, from));
  if (to) values.push(lt(entries.createdAt, to));
  if (config.grades.length < 4) values.push(sql`coalesce(${masteryStates.grade}, 0) in (${sql.join(config.grades.map((grade) => sql`${grade}`), sql`, `)})`);
  return values;
}

export async function countPracticeCandidates(database: Database, config: PracticeConfig) {
  if (!config.deckIds.length || !config.grades.length) return 0;
  const [row] = await database.select({ value: sql<number>`count(*)` }).from(entries).leftJoin(masteryStates, eq(masteryStates.entryId, entries.id)).where(and(...conditions(config)));
  return row?.value ?? 0;
}

export async function listPracticeCandidates(database: Database, config: PracticeConfig, limit = config.itemLimit): Promise<PracticeCandidate[]> {
  if (!config.deckIds.length || !config.grades.length) return [];
  return database.select({
    id: entries.id, deckId: entries.deckId, type: entries.type, sourceText: entries.sourceText, translatedText: entries.translatedText,
    exampleText: entries.exampleText, sourceLanguage: decks.sourceLanguage, targetLanguage: decks.targetLanguage, deckName: decks.name,
    grade: sql<number>`coalesce(${masteryStates.grade}, 0)`,
  }).from(entries).innerJoin(decks, eq(decks.id, entries.deckId)).leftJoin(masteryStates, eq(masteryStates.entryId, entries.id))
    .where(and(...conditions(config))).orderBy(config.shuffle ? sql`random()` : asc(entries.createdAt), asc(entries.id)).limit(limit);
}

export async function createPracticeSession(database: Database, mode: PracticeMode, config: PracticeConfig) {
  const candidates = await listPracticeCandidates(database, config);
  if (!candidates.length) throw new Error('NO_CANDIDATES');
  return database.transaction(async (transaction) => {
    const [session] = await transaction.insert(practiceSessions).values({
      deckId: config.deckIds.length === 1 ? config.deckIds[0] : null, mode, startedAt: new Date(), totalItems: candidates.length,
      configJson: JSON.stringify(config),
    }).returning();
    await transaction.insert(practiceSessionDecks).values(config.deckIds.map((deckId) => ({ sessionId: session.id, deckId })));
    await transaction.insert(practiceSessionEntries).values(candidates.map((entry, position) => ({ sessionId: session.id, entryId: entry.id, position })));
    return { session, candidates };
  });
}

export async function completePracticeSession(database: Database, id: number, startedAt: Date) {
  const completedAt = new Date();
  await database.update(practiceSessions).set({ completedAt, durationMs: Math.max(0, completedAt.getTime() - startedAt.getTime()) }).where(eq(practiceSessions.id, id));
}

export async function getPracticeSession(database: Database, id: number) {
  const session = await database.query.practiceSessions.findFirst({ where: eq(practiceSessions.id, id) });
  if (!session) return undefined;
  const items = await database.select({
    id: entries.id, deckId: entries.deckId, type: entries.type, sourceText: entries.sourceText, translatedText: entries.translatedText,
    exampleText: entries.exampleText, sourceLanguage: decks.sourceLanguage, targetLanguage: decks.targetLanguage, deckName: decks.name,
    grade: sql<number>`coalesce(${masteryStates.grade}, 0)`, position: practiceSessionEntries.position,
  }).from(practiceSessionEntries).innerJoin(entries, eq(entries.id, practiceSessionEntries.entryId)).innerJoin(decks, eq(decks.id, entries.deckId)).leftJoin(masteryStates, eq(masteryStates.entryId, entries.id))
    .where(eq(practiceSessionEntries.sessionId, id)).orderBy(asc(practiceSessionEntries.position));
  return { session, config: session.configJson ? JSON.parse(session.configJson) as PracticeConfig : undefined, items };
}
