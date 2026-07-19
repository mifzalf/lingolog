import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const HAPTICS_STORAGE_KEY = 'lingolog.haptics-enabled';
type HapticsContextValue = { enabled: boolean; ready: boolean; setEnabled: (enabled: boolean) => void; selection: () => Promise<void>; impact: (style?: Haptics.ImpactFeedbackStyle) => Promise<void>; notification: (type: Haptics.NotificationFeedbackType) => Promise<void> };
const HapticsContext = createContext<HapticsContextValue | null>(null);

export function HapticsProvider({ children }: PropsWithChildren) {
  const [enabled, setStoredEnabled] = useState(true); const [ready, setReady] = useState(false);
  useEffect(() => { AsyncStorage.getItem(HAPTICS_STORAGE_KEY).then((value) => { if (value === 'false') setStoredEnabled(false); }).finally(() => setReady(true)); }, []);
  const setEnabled = useCallback((next: boolean) => { setStoredEnabled(next); void AsyncStorage.setItem(HAPTICS_STORAGE_KEY, String(next)); if (next) void Haptics.selectionAsync(); }, []);
  const value = useMemo<HapticsContextValue>(() => ({ enabled, ready, setEnabled, selection: async () => { if (enabled) await Haptics.selectionAsync(); }, impact: async (style = Haptics.ImpactFeedbackStyle.Light) => { if (enabled) await Haptics.impactAsync(style); }, notification: async (type) => { if (enabled) await Haptics.notificationAsync(type); } }), [enabled, ready, setEnabled]);
  return <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>;
}
export function useHaptics() { const value = useContext(HapticsContext); if (!value) throw new Error('useHaptics must be used inside HapticsProvider'); return value; }
