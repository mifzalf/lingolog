import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

type AccessibilityContextValue = {
  reduceMotion: boolean;
  announce: (message: string) => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue>({
  reduceMotion: false,
  announce: () => {},
});

export function AccessibilityProvider({ children }: PropsWithChildren) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  const announce = useCallback((message: string) => {
    AccessibilityInfo.announceForAccessibility(message);
  }, []);
  const value = useMemo(() => ({ reduceMotion, announce }), [announce, reduceMotion]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
