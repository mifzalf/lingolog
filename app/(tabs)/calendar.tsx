import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pill, ScreenHeader, SectionTitle } from '../../src/components/ui';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useTheme } from '../../src/theme/ThemeProvider';

const days = Array.from({ length: 35 }, (_, i) => i - 2);
const active: Record<number, number> = { 2: 1, 4: 2, 7: 1, 8: 3, 11: 2, 12: 1, 15: 3, 18: 1, 19: 2, 22: 1 };

export default function CalendarScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader eyebrow="Jejak belajar" title="Juli 2026" />
      <View style={styles.calendar}>
        <View style={styles.week}>{['S','S','R','K','J','S','M'].map((d, i) => <Text key={i} style={styles.weekText}>{d}</Text>)}</View>
        <View style={styles.grid}>{days.map((day, i) => {
          const valid = day > 0 && day <= 31; const level = active[day] || 0;
          return <View key={i} style={styles.dayWrap}><View style={[styles.day, level === 1 && styles.l1, level === 2 && styles.l2, level === 3 && styles.l3, day === 18 && styles.selected]}><Text style={[styles.dayText, !valid && { opacity: 0 }, level > 1 && { color: colors.white }]}>{valid ? day : '0'}</Text></View></View>;
        })}</View>
        <View style={styles.legend}><Text style={styles.legendText}>Sepi</Text>{[0,1,2,3].map(x => <View key={x} style={[styles.dot, x === 1 && styles.l1, x === 2 && styles.l2, x === 3 && styles.l3]} />)}<Text style={styles.legendText}>Aktif</Text></View>
      </View>

      <SectionTitle aside="Sabtu, 18 Juli">Aktivitas</SectionTitle>
      <Event icon="add-circle-outline" title="6 entri ditambahkan" detail="Deutsch Alltag" tone="amber" />
      <Event icon="copy-outline" title="Kartu flash · 12 kartu" detail="9 kuat, 3 perlu dilatih" />
      <Event icon="ear-outline" title="Dikte · 8 soal" detail="Akurasi 75% · 4 menit" />
      <View style={styles.info}><Ionicons name="information-circle-outline" size={20} color={colors.moss} /><Text style={styles.infoText}>Kalender mencatat tanggal kata masuk dan histori permainan—bukan jadwal review wajib.</Text></View>
    </ScrollView>
  );
}

function Event({ icon, title, detail, tone }: { icon: keyof typeof Ionicons.glyphMap; title: string; detail: string; tone?: 'amber' }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return <View style={styles.event}><View style={[styles.eventIcon, tone === 'amber' && { backgroundColor: colors.amberSoft }]}><Ionicons name={icon} size={22} color={colors.ink} /></View><View style={{ flex: 1 }}><Text style={styles.eventTitle}>{title}</Text><Text style={styles.eventDetail}>{detail}</Text></View><Pill tone="plain">Lihat</Pill></View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper }, content: { paddingTop: 62, paddingHorizontal: 20, paddingBottom: 32 }, calendar: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 15, marginBottom: 28 },
  week: { flexDirection: 'row', marginBottom: 7 }, weekText: { width: '14.285%', textAlign: 'center', color: colors.muted, fontSize: 11, fontWeight: '800' }, grid: { flexDirection: 'row', flexWrap: 'wrap' }, dayWrap: { width: '14.285%', aspectRatio: 1, padding: 3 }, day: { flex: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paper }, dayText: { color: colors.ink, fontSize: 13, fontWeight: '700' }, l1: { backgroundColor: colors.mossSoft }, l2: { backgroundColor: '#78917F' }, l3: { backgroundColor: colors.moss }, selected: { borderWidth: 2, borderColor: colors.amber },
  legend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5, marginTop: 10 }, legendText: { fontSize: 10, color: colors.muted }, dot: { width: 11, height: 11, borderRadius: 3, backgroundColor: colors.paper },
  event: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.line }, eventIcon: { width: 43, height: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mossSoft }, eventTitle: { color: colors.ink, fontSize: 14, fontWeight: '900' }, eventDetail: { color: colors.muted, fontSize: 12, marginTop: 4 },
  info: { flexDirection: 'row', gap: 10, backgroundColor: colors.mossSoft, borderRadius: radius.md, padding: 15, marginTop: 24 }, infoText: { flex: 1, color: colors.moss, fontSize: 12, lineHeight: 18, fontWeight: '600' },
});
