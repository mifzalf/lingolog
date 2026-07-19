import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/tokens';

export function ScreenHeader({ note, eyebrow, title, action }: { note?: string; eyebrow?: string; title: string; action?: ReactNode }) {
  note ??= eyebrow;
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        {note ? <Text style={[styles.note, { color: colors.primary }]}>{note}</Text> : null}
        <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>{title}</Text>
        <View style={[styles.underline, { backgroundColor: colors.highlight }]} />
      </View>
      {action}
    </View>
  );
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.sectionTitle}>
      <Text accessibilityRole="header" style={[styles.sectionText, { color: colors.ink }]}>{children}</Text>
      {aside ? <Text style={[styles.aside, { color: colors.inkMuted }]}>{aside}</Text> : null}
    </View>
  );
}

export function IconButton({ name, onPress, label, disabled = false }: { name: keyof typeof Ionicons.glyphMap; onPress?: () => void; label: string; disabled?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} disabled={disabled} hitSlop={6} onPress={onPress} style={({ pressed }) => [styles.iconButton, disabled && styles.disabled, { borderColor: colors.rule, backgroundColor: pressed ? colors.paperPressed : colors.paperRaised }]}>
      <Ionicons name={name} size={22} color={colors.ink} />
    </Pressable>
  );
}

export function Pill({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'amber' | 'plain' }) {
  const { colors } = useTheme();
  const backgroundColor = tone === 'amber' ? colors.highlightSoft : tone === 'plain' ? colors.paper : colors.primarySoft;
  return <View style={[styles.pill, { backgroundColor, borderColor: colors.rule }]}><Text style={[styles.pillText, { color: colors.ink }]}>{children}</Text></View>;
}

export function ThemeButton() {
  const { colors, mode, cycleMode } = useTheme();
  const icon = mode === 'dark' ? 'moon-outline' : mode === 'light' ? 'sunny-outline' : 'contrast-outline';
  const label = mode === 'system' ? 'Tema mengikuti sistem' : `Tema ${mode}`;
  return <IconButton name={icon} onPress={cycleMode} label={`${label}. Ketuk untuk mengganti.`} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginBottom: 28 },
  headerCopy: { flex: 1 },
  note: { fontFamily: typography.handwriting, fontSize: 19, lineHeight: 23, marginBottom: 1 },
  title: { fontSize: 30, lineHeight: 35, fontWeight: '800', letterSpacing: -0.9 },
  underline: { width: 64, height: 3, borderRadius: 5, marginTop: 10, transform: [{ rotate: '-1.5deg' }] },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 2, marginBottom: 13 },
  sectionText: { fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  aside: { fontSize: 13, fontWeight: '600' },
  iconButton: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.45 },
  pill: { alignSelf: 'flex-start', borderRadius: radius.sm, paddingHorizontal: 9, paddingVertical: 5, borderWidth: StyleSheet.hairlineWidth, transform: [{ rotate: '-0.5deg' }] },
  pillText: { fontSize: 11, fontWeight: '800' },
});
