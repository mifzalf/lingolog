import { Caveat_600SemiBold, useFonts } from '@expo-google-fonts/caveat';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DatabaseProvider } from '../src/db/DatabaseProvider';
import { ThemeProvider, useTheme } from '../src/theme/ThemeProvider';

function AppNavigator() {
  const { colors, resolvedTheme } = useTheme();
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

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} backgroundColor={colors.paper} />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: colors.paper } }} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Caveat_600SemiBold });
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#F4F3EF' }} />;
  return (
    <ThemeProvider>
      <Suspense fallback={<View style={styles.loading}><ActivityIndicator color="#355A46" /></View>}>
        <DatabaseProvider><AppNavigator /></DatabaseProvider>
      </Suspense>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F3EF' },
});
