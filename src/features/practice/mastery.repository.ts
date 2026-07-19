import { desc, eq } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, masteryStates, practiceAnswers } from '../../db/schema';
import { evidenceGrade, MasteryGrade } from './mastery';

export type MasteryState = {
  entryId: number;
  grade: MasteryGrade;
  manualGrade: MasteryGrade | null;
  correctCount: number;
  incorrectCount: number;
  correctStreak: number;
  failureStreak: number;
  masteryScore: number;
  lastPracticedAt: Date | null;
  masteredAt: Date | null;
  updatedAt: Date;
};

export async function getMasteryState(database: Database, entryId: number): Promise<MasteryState> {
  const state = await database.query.masteryStates.findFirst({ where: eq(masteryStates.entryId, entryId) });
  return state ? { ...state, grade: state.grade as MasteryGrade, manualGrade: state.manualGrade as MasteryGrade | null } : { entryId, grade: 0, manualGrade: null, correctCount: 0, incorrectCount: 0, correctStreak: 0, failureStreak: 0, masteryScore: 0, lastPracticedAt: null, masteredAt: null, updatedAt: new Date() };
}

export async function listRecentMasteryEvidence(database: Database, entryId: number, limit = 8) {
  return database.select({ id: practiceAnswers.id, mode: practiceAnswers.mode, rating: practiceAnswers.rating, isCorrect: practiceAnswers.isCorrect, manuallyCorrected: practiceAnswers.manuallyCorrected, answeredAt: practiceAnswers.answeredAt })
    .from(practiceAnswers).where(eq(practiceAnswers.entryId, entryId)).orderBy(desc(practiceAnswers.answeredAt)).limit(limit);
}

export async function setManualMasteryGrade(database: Database, entryId: number, deckId: number, manualGrade: MasteryGrade | null) {
  return database.transaction(async (transaction) => {
    const now = new Date();
    await transaction.insert(masteryStates).values({ entryId, updatedAt: now }).onConflictDoNothing();
    const state = await transaction.query.masteryStates.findFirst({ where: eq(masteryStates.entryId, entryId) });
    if (!state) throw new Error('MASTERY_NOT_FOUND');
    const previousGrade = state.grade as MasteryGrade;
    const automaticGrade = evidenceGrade(state.correctCount, state.incorrectCount, state.correctStreak, state.failureStreak);
    const grade = manualGrade ?? automaticGrade;
    await transaction.update(masteryStates).set({ grade, manualGrade, manuallyMastered: manualGrade === 3, masteredAt: grade === 3 ? (state.masteredAt ?? now) : null, updatedAt: now }).where(eq(masteryStates.entryId, entryId));
    if (previousGrade !== 3 && grade === 3) await transaction.insert(activityEvents).values({ type: 'entry_mastered', entryId, deckId, occurredAt: now });
    if (previousGrade === 3 && grade !== 3) await transaction.insert(activityEvents).values({ type: 'entry_unmastered', entryId, deckId, occurredAt: now });
    return { ...state, grade, manualGrade };
  });
}
