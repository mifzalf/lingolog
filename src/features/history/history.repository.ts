import { and, desc, eq, gte, inArray, lt, or, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { activityEvents, decks, entries, practiceAnswers, practiceSessionDecks, practiceSessions } from '../../db/schema';

export type DayActivity = { dateKey: string; entries: number; sessions: number; mastery: number; answers: number; intensity: number };
export type HistoryEntry = { id: number; deckId: number; sourceText: string; translatedText: string; deckName: string; createdAt: Date };
export type HistorySession = { id: number; mode: 'flashcard' | 'dictation'; startedAt: Date; completedAt: Date | null; totalItems: number; correctItems: number; durationMs: number; answered: number; corrected: number; deckNames: string[]; configJson: string | null };
export type MasteryEvent = { id: number; type: 'entry_mastered' | 'entry_unmastered' | 'deck_imported'; entryId: number | null; deckId: number | null; sourceText: string | null; deckName: string | null; occurredAt: Date };
export type DayHistory = { entries: HistoryEntry[]; sessions: HistorySession[]; masteryEvents: MasteryEvent[]; answers: number; correct: number };
export type PracticeOverview = { practicedToday: number; accuracyThisWeek: number | null; answersThisWeek: number; completedThisWeek: number };

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function startOfDay(date: Date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
export function endOfDay(date: Date) { const end = startOfDay(date); end.setDate(end.getDate() + 1); return end; }
export function startOfWeek(date: Date) { const start = startOfDay(date); start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); return start; }

export async function getMonthActivity(database: Database, month: Date): Promise<DayActivity[]> {
  const start = new Date(month.getFullYear(), month.getMonth(), 1); const end = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const [entryRows, sessionRows, eventRows, answerRows] = await Promise.all([
    database.select({ at: entries.createdAt }).from(entries).where(and(gte(entries.createdAt, start), lt(entries.createdAt, end))),
    database.select({ startedAt: practiceSessions.startedAt, completedAt: practiceSessions.completedAt }).from(practiceSessions).where(or(and(gte(practiceSessions.startedAt, start), lt(practiceSessions.startedAt, end)), and(gte(practiceSessions.completedAt, start), lt(practiceSessions.completedAt, end)))), 
    database.select({ at: activityEvents.occurredAt }).from(activityEvents).where(and(inArray(activityEvents.type, ['entry_mastered', 'entry_unmastered', 'deck_imported']), gte(activityEvents.occurredAt, start), lt(activityEvents.occurredAt, end))),
    database.select({ at: practiceAnswers.answeredAt }).from(practiceAnswers).where(and(gte(practiceAnswers.answeredAt, start), lt(practiceAnswers.answeredAt, end))),
  ]);
  const days = new Map<string, DayActivity>();
  const add = (at: Date, field: 'entries' | 'sessions' | 'mastery' | 'answers') => { const key = dateKey(at); const value = days.get(key) ?? { dateKey: key, entries: 0, sessions: 0, mastery: 0, answers: 0, intensity: 0 }; value[field] += 1; days.set(key, value); };
  entryRows.forEach((row) => add(row.at, 'entries')); sessionRows.forEach((row) => { add(row.startedAt, 'sessions'); if (row.completedAt && dateKey(row.completedAt) !== dateKey(row.startedAt)) add(row.completedAt, 'sessions'); }); eventRows.forEach((row) => add(row.at, 'mastery')); answerRows.forEach((row) => add(row.at, 'answers')); 
  return [...days.values()].map((day) => ({ ...day, intensity: day.entries + day.sessions + day.mastery + day.answers }));
}

export async function getDayHistory(database: Database, date: Date): Promise<DayHistory> {
  const start = startOfDay(date); const end = endOfDay(date);
  const [entryRows, sessionRows, eventRows, answerSummary] = await Promise.all([
    database.select({ id: entries.id, deckId: entries.deckId, sourceText: entries.sourceText, translatedText: entries.translatedText, deckName: decks.name, createdAt: entries.createdAt }).from(entries).innerJoin(decks, eq(decks.id, entries.deckId)).where(and(gte(entries.createdAt, start), lt(entries.createdAt, end))).orderBy(desc(entries.createdAt)),
    database.select({ id: practiceSessions.id, mode: practiceSessions.mode, startedAt: practiceSessions.startedAt, completedAt: practiceSessions.completedAt, totalItems: practiceSessions.totalItems, correctItems: practiceSessions.correctItems, durationMs: practiceSessions.durationMs, configJson: practiceSessions.configJson, answered: sql<number>`count(distinct ${practiceAnswers.id})`, corrected: sql<number>`count(distinct case when ${practiceAnswers.manuallyCorrected} = 1 then ${practiceAnswers.id} end)`, deckNames: sql<string>`coalesce(group_concat(distinct ${decks.name}), '')` }).from(practiceSessions).leftJoin(practiceAnswers, eq(practiceAnswers.sessionId, practiceSessions.id)).leftJoin(practiceSessionDecks, eq(practiceSessionDecks.sessionId, practiceSessions.id)).leftJoin(decks, eq(decks.id, practiceSessionDecks.deckId)).where(or(and(gte(practiceSessions.startedAt, start), lt(practiceSessions.startedAt, end)), and(gte(practiceSessions.completedAt, start), lt(practiceSessions.completedAt, end)), sql`exists (select 1 from practice_answers day_answer where day_answer.session_id = ${practiceSessions.id} and day_answer.answered_at >= ${start} and day_answer.answered_at < ${end})`)).groupBy(practiceSessions.id).orderBy(desc(practiceSessions.startedAt)),
    database.select({ id: activityEvents.id, type: activityEvents.type, entryId: activityEvents.entryId, deckId: activityEvents.deckId, sourceText: entries.sourceText, deckName: decks.name, occurredAt: activityEvents.occurredAt }).from(activityEvents).leftJoin(entries, eq(entries.id, activityEvents.entryId)).leftJoin(decks, eq(decks.id, activityEvents.deckId)).where(and(inArray(activityEvents.type, ['entry_mastered', 'entry_unmastered', 'deck_imported']), gte(activityEvents.occurredAt, start), lt(activityEvents.occurredAt, end))).orderBy(desc(activityEvents.occurredAt)),
    database.select({ answers: sql<number>`count(*)`, correct: sql<number>`coalesce(sum(case when ${practiceAnswers.isCorrect} = 1 then 1 else 0 end), 0)` }).from(practiceAnswers).where(and(gte(practiceAnswers.answeredAt, start), lt(practiceAnswers.answeredAt, end))),
  ]);
  return { entries: entryRows, sessions: sessionRows.map((row) => ({ ...row, deckNames: row.deckNames ? row.deckNames.split(',') : [] })), masteryEvents: eventRows as MasteryEvent[], answers: answerSummary[0]?.answers ?? 0, correct: answerSummary[0]?.correct ?? 0 };
}

export async function getPracticeOverview(database: Database, now = new Date()): Promise<PracticeOverview> {
  const today = startOfDay(now); const tomorrow = endOfDay(now); const week = startOfWeek(now);
  const [todayRows, weekRows, sessions] = await Promise.all([
    database.select({ count: sql<number>`count(*)` }).from(practiceAnswers).where(and(gte(practiceAnswers.answeredAt, today), lt(practiceAnswers.answeredAt, tomorrow))),
    database.select({ answers: sql<number>`count(*)`, correct: sql<number>`coalesce(sum(case when ${practiceAnswers.isCorrect} = 1 then 1 else 0 end), 0)` }).from(practiceAnswers).where(and(gte(practiceAnswers.answeredAt, week), lt(practiceAnswers.answeredAt, tomorrow))),
    database.select({ count: sql<number>`count(*)` }).from(practiceSessions).where(and(gte(practiceSessions.completedAt, week), lt(practiceSessions.completedAt, tomorrow))),
  ]);
  const answers = weekRows[0]?.answers ?? 0; return { practicedToday: todayRows[0]?.count ?? 0, answersThisWeek: answers, accuracyThisWeek: answers ? Math.round((weekRows[0].correct / answers) * 100) : null, completedThisWeek: sessions[0]?.count ?? 0 };
}
