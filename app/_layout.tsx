import { Caveat_600SemiBold, useFonts } from '@expo-google-fonts/caveat';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppDialogProvider } from '../src/components/AppDialog';
import { DatabaseProvider } from '../src/db/DatabaseProvider';
import { SpeechProvider } from '../src/features/speech/SpeechProvider';
import { HapticsProvider } from '../src/features/settings/HapticsProvider';
import { OnboardingProvider, useOnboarding } from '../src/features/onboarding/OnboardingProvider';
import { AccessibilityProvider, useAccessibility } from '../src/features/accessibility/AccessibilityProvider';
import { ThemeProvider, useTheme } from '../src/theme/ThemeProvider';

function AppNavigator() {
  const { colors, resolvedTheme } = useTheme(); const { reduceMotion } = useAccessibility(); const onboarding = useOnboarding(); const pathname = usePathname(); const router = useRouter();
  useEffect(() => { if (onboarding.ready && !onboarding.completed && pathname !== '/onboarding') router.replace('/onboarding'); }, [onboarding.ready, onboarding.completed, pathname, router]);
  const navigationTheme = {
    ...(resolvedTheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(resolvedTheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.paper,
      card: colors.paperRaised,
      text: colors.ink,
      border: colors.rule,
      notification: colors.highlight,
    },
  };

  if (!onboarding.ready) return <View style={[styles.loading, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} backgroundColor={colors.paper} />
      <Stack screenOptions={{ headerShown: false, animation: reduceMotion ? 'none' : 'slide_from_right', contentStyle: { backgroundColor: colors.paper } }} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Caveat_600SemiBold });
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#F4F3EF' }} />;
  return (
    <ThemeProvider>
      <Suspense fallback={<View style={styles.loading}><ActivityIndicator color="#355A46" /></View>}>
        <AccessibilityProvider><AppDialogProvider><DatabaseProvider><OnboardingProvider><HapticsProvider><SpeechProvider><AppNavigator /></SpeechProvider></HapticsProvider></OnboardingProvider></DatabaseProvider></AppDialogProvider></AccessibilityProvider>
      </Suspense>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F3EF' },
});
