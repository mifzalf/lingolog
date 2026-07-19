import { and, desc, eq, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, masteryStates, practiceAnswers, practiceSessions } from '../../db/schema';
import { calculateMastery } from './mastery';

export type DictationAnswerInput = {
  sessionId: number;
  entryId: number;
  deckId: number;
  userAnswer: string;
  autoIsCorrect: boolean;
  isCorrect: boolean;
  responseTimeMs: number;
};

export async function getDictationProgress(database: Database, sessionId: number) {
  const answers = await database.select({ entryId: practiceAnswers.entryId, isCorrect: practiceAnswers.isCorrect })
    .from(practiceAnswers).where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'dictation'))).orderBy(practiceAnswers.id);
  return { answers, answeredIds: new Set(answers.map((answer) => answer.entryId)) };
}

export async function recordDictationAnswer(database: Database, input: DictationAnswerInput) {
  return database.transaction(async (transaction) => {
    const existing = await transaction.query.practiceAnswers.findFirst({ where: and(eq(practiceAnswers.sessionId, input.sessionId), eq(practiceAnswers.entryId, input.entryId)) });
    if (existing) return existing;
    const now = new Date();
    const mastery = await transaction.query.masteryStates.findFirst({ where: eq(masteryStates.entryId, input.entryId) });
    const previousGrade = (mastery?.grade ?? 0) as 0 | 1 | 2 | 3;
    const next = calculateMastery({ correctCount: mastery?.correctCount ?? 0, incorrectCount: mastery?.incorrectCount ?? 0, correctStreak: mastery?.correctStreak ?? 0, failureStreak: mastery?.failureStreak ?? 0, currentGrade: previousGrade, manualGrade: mastery?.manualGrade as 0 | 1 | 2 | 3 | null ?? null }, input.isCorrect);
    const [answer] = await transaction.insert(practiceAnswers).values({ sessionId: input.sessionId, entryId: input.entryId, mode: 'dictation', userAnswer: input.userAnswer.trim(), autoIsCorrect: input.autoIsCorrect, isCorrect: input.isCorrect, manuallyCorrected: input.autoIsCorrect !== input.isCorrect, responseTimeMs: Math.max(0, Math.round(input.responseTimeMs)), answeredAt: now }).returning();
    await transaction.insert(masteryStates).values({ entryId: input.entryId, updatedAt: now }).onConflictDoNothing();
    await transaction.update(masteryStates).set({ ...next, lastPracticedAt: now, masteredAt: next.grade === 3 ? (mastery?.masteredAt ?? now) : null, updatedAt: now }).where(eq(masteryStates.entryId, input.entryId));
    await transaction.update(practiceSessions).set({ correctItems: sql`${practiceSessions.correctItems} + ${Number(input.isCorrect)}` }).where(eq(practiceSessions.id, input.sessionId));
    if (previousGrade !== 3 && next.grade === 3) await transaction.insert(activityEvents).values({ type: 'entry_mastered', entryId: input.entryId, deckId: input.deckId, occurredAt: now });
    if (previousGrade === 3 && next.grade < 3) await transaction.insert(activityEvents).values({ type: 'entry_unmastered', entryId: input.entryId, deckId: input.deckId, occurredAt: now });
    return answer;
  });
}

export async function getDictationResult(database: Database, sessionId: number) {
  const session = await database.query.practiceSessions.findFirst({ where: and(eq(practiceSessions.id, sessionId), eq(practiceSessions.mode, 'dictation')) });
  if (!session) return undefined;
  const [summary] = await database.select({ answered: sql<number>`count(*)`, correct: sql<number>`sum(case when ${practiceAnswers.isCorrect} = 1 then 1 else 0 end)`, corrected: sql<number>`sum(case when ${practiceAnswers.manuallyCorrected} = 1 then 1 else 0 end)`, averageMs: sql<number>`avg(${practiceAnswers.responseTimeMs})` })
    .from(practiceAnswers).where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'dictation')));
  return { session, answered: summary?.answered ?? 0, correct: summary?.correct ?? 0, corrected: summary?.corrected ?? 0, averageMs: Math.round(summary?.averageMs ?? 0) };
}

export async function getLatestOpenDictationSession(database: Database) {
  const rows = await database.select({ id: practiceSessions.id, startedAt: practiceSessions.startedAt, totalItems: practiceSessions.totalItems, answered: sql<number>`count(${practiceAnswers.id})` })
    .from(practiceSessions).leftJoin(practiceAnswers, eq(practiceAnswers.sessionId, practiceSessions.id))
    .where(and(eq(practiceSessions.mode, 'dictation'), sql`${practiceSessions.completedAt} is null`)).groupBy(practiceSessions.id)
    .having(sql`count(${practiceAnswers.id}) < ${practiceSessions.totalItems}`).orderBy(desc(practiceSessions.startedAt)).limit(1);
  return rows[0];
}
