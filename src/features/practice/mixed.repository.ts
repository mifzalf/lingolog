import AsyncStorage from '@react-native-async-storage/async-storage';
import { and, desc, eq, sql } from 'drizzle-orm';
import type { Database } from '../decks/deck.repository';
import { practiceAnswers, practiceSessions } from '../../db/schema';
import { completePracticeSession, createPracticeSession, GameMode, listPracticeCandidates, PracticeConfig } from './session.repository';

export const MIXED_SETUP_KEY = 'lingolog.mixed-practice-setup.v1';
const routes: Record<GameMode, string> = { flashcard: '/practice/flashcard', dictation: '/practice/dictation', matchup: '/practice/matchup', delayed_recall: '/practice/delayed-recall' };

export function mixedRoute(mode: GameMode) { return routes[mode]; }
export function shuffledMixedModes(modes: GameMode[], seed: number) {
  return [...modes].sort((a, b) => mixedHash(seed, a) - mixedHash(seed, b) || a.localeCompare(b));
}
function mixedHash(seed: number, mode: GameMode) { let value = seed ^ [...mode].reduce((sum, character) => sum + character.charCodeAt(0), 0); value = Math.imul(value ^ value >>> 16, 0x45d9f3b); return (value ^ value >>> 16) >>> 0; }
export async function saveMixedSetup(config: PracticeConfig) { await AsyncStorage.setItem(MIXED_SETUP_KEY, JSON.stringify({ ...config, mixedSegments: undefined })); }
export async function loadMixedSetup(): Promise<PracticeConfig | undefined> { try { const raw = await AsyncStorage.getItem(MIXED_SETUP_KEY); return raw ? JSON.parse(raw) : undefined; } catch { return undefined; } }

export async function createMixedPracticeSession(database: Database, config: PracticeConfig) {
  const modes = shuffledMixedModes(config.mixedModes?.length ? config.mixedModes : ['flashcard', 'dictation'], Date.now());
  const sharedCandidates = await listPracticeCandidates(database, config, config.itemLimit);
  const { session } = await createPracticeSession(database, 'mixed', config, sharedCandidates);
  const segments: { mode: GameMode; sessionId: number }[] = [];
  for (const mode of modes) {
    if (mode === 'delayed_recall' && sharedCandidates.length < 3) continue;
    const segmentConfig = { ...config, mixedParentSessionId: session.id, itemLimit: mode === 'delayed_recall' ? Math.max(3, Math.ceil(config.itemLimit / 3) * 3) : mode === 'matchup' ? Math.max(5, Math.ceil(config.itemLimit / 5) * 5) : config.itemLimit };
    const usable = mode === 'delayed_recall' ? sharedCandidates.slice(0, Math.floor(sharedCandidates.length / 3) * 3) : sharedCandidates;
    if (!usable.length) continue;
    const { session: child } = await createPracticeSession(database, mode, segmentConfig, usable); segments.push({ mode, sessionId: child.id });
  }
  await database.update(practiceSessions).set({ configJson: JSON.stringify({ ...config, mixedSegments: segments }) }).where(eq(practiceSessions.id, session.id));
  return { session, segments };
}
export async function getMixedProgress(database: Database, sessionId: number) {
  const session = await database.query.practiceSessions.findFirst({ where: and(eq(practiceSessions.id, sessionId), eq(practiceSessions.mode, 'mixed')) });
  if (!session) return undefined; const config = session.configJson ? JSON.parse(session.configJson) as PracticeConfig : undefined; const segments = config?.mixedSegments ?? [];
  for (const segment of segments) { const child = await database.query.practiceSessions.findFirst({ where: eq(practiceSessions.id, segment.sessionId) }); if (child && !child.completedAt) return { session, config, segments, current: segment }; }
  if (!session.completedAt) await completePracticeSession(database, session.id, session.startedAt);
  return { session: { ...session, completedAt: session.completedAt ?? new Date() }, config, segments, current: undefined };
}
export async function getLatestOpenMixedSession(database: Database) {
  const rows = await database.select({ id: practiceSessions.id, startedAt: practiceSessions.startedAt, totalItems: practiceSessions.totalItems, answered: sql<number>`count(${practiceAnswers.id})` }).from(practiceSessions).leftJoin(practiceAnswers, eq(practiceAnswers.sessionId, practiceSessions.id)).where(and(eq(practiceSessions.mode, 'mixed'), sql`${practiceSessions.completedAt} is null`)).groupBy(practiceSessions.id).orderBy(desc(practiceSessions.startedAt)).limit(1); return rows[0];
}
