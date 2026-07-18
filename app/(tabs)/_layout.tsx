import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/theme/ThemeProvider';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'library-outline',
  practice: 'shapes-outline',
  repository: 'albums-outline',
  calendar: 'calendar-clear-outline',
};

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.inkMuted,
      tabBarStyle: { height: 76, paddingTop: 8, paddingBottom: 10, backgroundColor: colors.tabBar, borderTopColor: colors.rule },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
    })}>
      <Tabs.Screen name="index" options={{ title: 'Pustaka' }} />
      <Tabs.Screen name="practice" options={{ title: 'Latihan' }} />
      <Tabs.Screen name="repository" options={{ title: 'Katalog' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Kalender' }} />
    </Tabs>
  );
}
