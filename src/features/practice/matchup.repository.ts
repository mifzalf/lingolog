import { and, desc, eq, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, masteryStates, practiceAnswers, practiceSessions } from '../../db/schema';
import { calculateMastery } from './mastery';

export async function getMatchupProgress(database: Database, sessionId: number) {
  const answers = await database.select({ entryId: practiceAnswers.entryId, isCorrect: practiceAnswers.isCorrect, responseTimeMs: practiceAnswers.responseTimeMs })
    .from(practiceAnswers).where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'matchup'))).orderBy(practiceAnswers.id);
  return { answers, answeredIds: new Set(answers.map((answer) => answer.entryId)) };
}

export async function recordMatchupPair(database: Database, input: { sessionId: number; entryId: number; deckId: number; mistakes: number; responseTimeMs: number }) {
  const isCorrect = input.mistakes === 0;
  return database.transaction(async (transaction) => {
    const existing = await transaction.query.practiceAnswers.findFirst({ where: and(eq(practiceAnswers.sessionId, input.sessionId), eq(practiceAnswers.entryId, input.entryId)) });
    if (existing) return existing;
    const now = new Date();
    const mastery = await transaction.query.masteryStates.findFirst({ where: eq(masteryStates.entryId, input.entryId) });
    const previousGrade = (mastery?.grade ?? 0) as 0 | 1 | 2 | 3;
    const next = calculateMastery({ correctCount: mastery?.correctCount ?? 0, incorrectCount: mastery?.incorrectCount ?? 0, correctStreak: mastery?.correctStreak ?? 0, failureStreak: mastery?.failureStreak ?? 0, currentGrade: previousGrade, manualGrade: mastery?.manualGrade as 0 | 1 | 2 | 3 | null ?? null }, isCorrect);
    const [answer] = await transaction.insert(practiceAnswers).values({ sessionId: input.sessionId, entryId: input.entryId, mode: 'matchup', userAnswer: JSON.stringify({ mistakes: Math.max(0, Math.round(input.mistakes)) }), isCorrect, responseTimeMs: Math.max(0, Math.round(input.responseTimeMs)), answeredAt: now }).onConflictDoNothing().returning();
    if (!answer) return transaction.query.practiceAnswers.findFirst({ where: and(eq(practiceAnswers.sessionId, input.sessionId), eq(practiceAnswers.entryId, input.entryId)) });
    await transaction.insert(masteryStates).values({ entryId: input.entryId, updatedAt: now }).onConflictDoNothing();
    await transaction.update(masteryStates).set({ ...next, lastPracticedAt: now, masteredAt: next.grade === 3 ? (mastery?.masteredAt ?? now) : null, updatedAt: now }).where(eq(masteryStates.entryId, input.entryId));
    await transaction.update(practiceSessions).set({ correctItems: sql`${practiceSessions.correctItems} + ${Number(isCorrect)}` }).where(eq(practiceSessions.id, input.sessionId));
    if (previousGrade !== 3 && next.grade === 3) await transaction.insert(activityEvents).values({ type: 'entry_mastered', entryId: input.entryId, deckId: input.deckId, occurredAt: now });
    if (previousGrade === 3 && next.grade < 3) await transaction.insert(activityEvents).values({ type: 'entry_unmastered', entryId: input.entryId, deckId: input.deckId, occurredAt: now });
    return answer;
  });
}

export async function getMatchupResult(database: Database, sessionId: number) {
  const session = await database.query.practiceSessions.findFirst({ where: and(eq(practiceSessions.id, sessionId), eq(practiceSessions.mode, 'matchup')) });
  if (!session) return undefined;
  const answers = await database.select({ isCorrect: practiceAnswers.isCorrect, responseTimeMs: practiceAnswers.responseTimeMs, userAnswer: practiceAnswers.userAnswer }).from(practiceAnswers)
    .where(and(eq(practiceAnswers.sessionId, sessionId), eq(practiceAnswers.mode, 'matchup')));
  const mistakes = answers.reduce((sum, answer) => { try { return sum + Number(JSON.parse(answer.userAnswer ?? '{}').mistakes ?? 0); } catch { return sum; } }, 0);
  const totalMs = answers.reduce((sum, answer) => sum + answer.responseTimeMs, 0);
  return { session, answered: answers.length, perfect: answers.filter((answer) => answer.isCorrect).length, mistakes, averageMs: answers.length ? Math.round(totalMs / answers.length) : 0 };
}

export async function getLatestOpenMatchupSession(database: Database) {
  const rows = await database.select({ id: practiceSessions.id, startedAt: practiceSessions.startedAt, totalItems: practiceSessions.totalItems, answered: sql<number>`count(${practiceAnswers.id})` })
    .from(practiceSessions).leftJoin(practiceAnswers, eq(practiceAnswers.sessionId, practiceSessions.id))
    .where(and(eq(practiceSessions.mode, 'matchup'), sql`${practiceSessions.completedAt} is null`)).groupBy(practiceSessions.id)
    .having(sql`count(${practiceAnswers.id}) < ${practiceSessions.totalItems}`).orderBy(desc(practiceSessions.startedAt)).limit(1);
  return rows[0];
}
