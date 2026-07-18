import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { darkColors, lightColors, ResolvedTheme, ThemeColors, ThemeMode } from './tokens';

const STORAGE_KEY = 'lingolog.theme-mode';

type ThemeContextValue = {
  colors: ThemeColors;
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(mode: ThemeMode, system: ColorSchemeName): ResolvedTheme {
  if (mode === 'system') return system === 'dark' ? 'dark' : 'light';
  return mode;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [mode, setStoredMode] = useState<ThemeMode>('system');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value === 'system' || value === 'light' || value === 'dark') setStoredMode(value);
      })
      .finally(() => setReady(true));
  }, []);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setStoredMode(nextMode);
    void AsyncStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  const cycleMode = useCallback(() => {
    const order: ThemeMode[] = ['system', 'light', 'dark'];
    setMode(order[(order.indexOf(mode) + 1) % order.length]);
  }, [mode, setMode]);

  const resolvedTheme = resolveTheme(mode, systemTheme);
  const value = useMemo(() => ({
    colors: resolvedTheme === 'dark' ? darkColors : lightColors,
    mode,
    resolvedTheme,
    setMode,
    cycleMode,
    ready,
  }), [mode, resolvedTheme, setMode, cycleMode, ready]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
