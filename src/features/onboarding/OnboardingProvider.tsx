import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { sql } from 'drizzle-orm';
import { useDatabase } from '../../db/DatabaseProvider';
import { decks } from '../../db/schema';

export const ONBOARDING_STORAGE_KEY = 'lingolog.onboarding-completed.v1';
type OnboardingContextValue = { ready: boolean; completed: boolean; complete: () => Promise<void>; restart: () => Promise<void> };
const OnboardingContext = createContext<OnboardingContextValue | null>(null);
export function OnboardingProvider({ children }: PropsWithChildren) {
  const database = useDatabase(); const [ready, setReady] = useState(false); const [completed, setCompleted] = useState(false);
  useEffect(() => { AsyncStorage.getItem(ONBOARDING_STORAGE_KEY).then(async (value) => { if (value === 'true') { setCompleted(true); return; } const [row] = await database.select({ value: sql<number>`count(*)` }).from(decks); if ((row?.value ?? 0) > 0) { await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true'); setCompleted(true); } }).catch(console.error).finally(() => setReady(true)); }, [database]);
  const complete = useCallback(async () => { await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true'); setCompleted(true); }, []);
  const restart = useCallback(async () => { await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY); setCompleted(false); }, []);
  const value = useMemo(() => ({ ready, completed, complete, restart }), [ready, completed, complete, restart]);
  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}
export function useOnboarding() { const value = useContext(OnboardingContext); if (!value) throw new Error('useOnboarding harus berada di dalam OnboardingProvider'); return value; }
