import { and, desc, eq, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, masteryStates, practiceAnswers, practiceSessions } from '../../db/schema';
import { calculateMastery } from './mastery';

export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';
export const successfulRatings: FlashcardRating[] = ['good', 'easy'];

export async function getFlashcardProgress(database: Database, sessionId: number) {
  const answers = await database.select({ entryId: practiceAnswers.entryId, rating: practiceAnswers.rating, responseTimeMs: practiceAnswers.responseTimeMs })
    .from(practiceAnswers).where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'flashcard'))).orderBy(practiceAnswers.id);
  return { answers, answeredIds: new Set(answers.map((answer) => answer.entryId)) };
}

export async function recordFlashcardRating(database: Database, sessionId: number, entryId: number, deckId: number, rating: FlashcardRating, responseTimeMs: number) {
  const isCorrect = successfulRatings.includes(rating);
  return database.transaction(async (transaction) => {
    const existing = await transaction.query.practiceAnswers.findFirst({ where: and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.entryId, entryId)) });
    if (existing) return existing;
    const now = new Date();
    const mastery = await transaction.query.masteryStates.findFirst({ where: eq(masteryStates.entryId, entryId) });
    const previousGrade = (mastery?.grade ?? 0) as 0 | 1 | 2 | 3;
    const next = calculateMastery({ correctCount: mastery?.correctCount ?? 0, incorrectCount: mastery?.incorrectCount ?? 0, correctStreak: mastery?.correctStreak ?? 0, failureStreak: mastery?.failureStreak ?? 0, currentGrade: previousGrade, manualGrade: mastery?.manualGrade as 0 | 1 | 2 | 3 | null ?? null }, isCorrect);
    const [answer] = await transaction.insert(practiceAnswers).values({ sessionId, entryId, mode: 'flashcard', rating, isCorrect, responseTimeMs: Math.max(0, Math.round(responseTimeMs)), answeredAt: now }).returning();
    await transaction.insert(masteryStates).values({ entryId, updatedAt: now }).onConflictDoNothing();
    await transaction.update(masteryStates).set({ ...next, lastPracticedAt: now, masteredAt: next.grade === 3 ? (mastery?.masteredAt ?? now) : null, updatedAt: now }).where(eq(masteryStates.entryId, entryId));
    await transaction.update(practiceSessions).set({ correctItems: sql`${practiceSessions.correctItems} + ${Number(isCorrect)}` }).where(eq(practiceSessions.id, sessionId));
    if (previousGrade !== 3 && next.grade === 3) await transaction.insert(activityEvents).values({ type: 'entry_mastered', entryId, deckId, occurredAt: now });
    if (previousGrade === 3 && next.grade < 3) await transaction.insert(activityEvents).values({ type: 'entry_unmastered', entryId, deckId, occurredAt: now });
    return answer;
  });
}

export async function getFlashcardResult(database: Database, sessionId: number) {
  const session = await database.query.practiceSessions.findFirst({ where: and(eq(practiceSessions.id, sessionId), eq(practiceSessions.mode, 'flashcard')) });
  if (!session) return undefined;
  const rows = await database.select({ rating: practiceAnswers.rating, count: sql<number>`count(*)`, averageMs: sql<number>`avg(${practiceAnswers.responseTimeMs})` }).from(practiceAnswers)
    .where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'flashcard'))).groupBy(practiceAnswers.rating);
  const counts: Record<FlashcardRating, number> = { again: 0, hard: 0, good: 0, easy: 0 };
  let answered = 0; let weightedMs = 0;
  for (const row of rows) { if (row.rating) counts[row.rating] = row.count; answered += row.count; weightedMs += row.count * row.averageMs; }
  return { session, counts, answered, remembered: counts.good + counts.easy, averageMs: answered ? Math.round(weightedMs / answered) : 0 };
}

export async function getLatestOpenFlashcardSession(database: Database) {
  const rows = await database.select({ id: practiceSessions.id, startedAt: practiceSessions.startedAt, totalItems: practiceSessions.totalItems, answered: sql<number>`count(${practiceAnswers.id})` })
    .from(practiceSessions).leftJoin(practiceAnswers, eq(practiceAnswers.sessionId, practiceSessions.id))
    .where(and(eq(practiceSessions.mode, 'flashcard'), sql`${practiceSessions.completedAt} is null`)).groupBy(practiceSessions.id)
    .having(sql`count(${practiceAnswers.id}) < ${practiceSessions.totalItems}`).orderBy(desc(practiceSessions.startedAt)).limit(1);
  return rows[0];
}
