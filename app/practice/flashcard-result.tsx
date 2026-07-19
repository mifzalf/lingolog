import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { PaperScreen } from '../../src/components/PaperScreen';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { FlashcardRating, getFlashcardResult } from '../../src/features/practice/flashcard.repository';
import { useTheme } from '../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../src/theme/tokens';

const labels: Record<FlashcardRating, string> = { again: 'Lupa', hard: 'Sulit', good: 'Ingat', easy: 'Kuat' };
export default function FlashcardResultScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors); const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const [result, setResult] = useState<Awaited<ReturnType<typeof getFlashcardResult>>>(); const [loading, setLoading] = useState(true);
  useEffect(() => { getFlashcardResult(database, Number(sessionId)).then(setResult).catch(console.error).finally(() => setLoading(false)); }, [database, sessionId]);
  if (loading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
  if (!result) return <View style={styles.center}><Text style={styles.error}>Hasil sesi tidak ditemukan.</Text><Pressable onPress={() => router.dismissTo('/practice')}><Text style={styles.link}>Kembali</Text></Pressable></View>;
  const percentage = result.answered ? Math.round(result.remembered / result.answered * 100) : 0; const duration = Math.max(1, Math.round(result.session.durationMs / 60000));
  return <PaperScreen contentContainerStyle={styles.content}><View style={styles.mark}><Ionicons name={percentage >= 70 ? 'sparkles' : 'leaf-outline'} size={35} color={colors.primary} /></View><Text style={styles.note}>Sesi selesai</Text><Text style={styles.title}>{percentage >= 70 ? 'Ingatanmu tumbuh hari ini.' : 'Catatan sulit sudah ditemukan.'}</Text><Text style={styles.subtitle}>Tidak harus sempurna. Rating ini membantu Lingolog mengenali materi yang perlu lebih sering kamu temui.</Text>
    <View style={styles.hero}><Text style={styles.heroValue}>{percentage}%</Text><Text style={styles.heroLabel}>berhasil diingat</Text><View style={styles.rule} /><View style={styles.heroMeta}><Text style={styles.metaStrong}>{result.answered} kartu</Text><Text style={styles.metaText}>{duration} menit · rata-rata {(result.averageMs / 1000).toFixed(1)} detik</Text></View></View>
    <View style={styles.breakdown}>{(Object.keys(labels) as FlashcardRating[]).map((rating) => <View style={styles.stat} key={rating}><Text style={styles.statValue}>{result.counts[rating]}</Text><Text style={styles.statLabel}>{labels[rating]}</Text></View>)}</View>
    <View style={styles.insight}><Ionicons name="analytics-outline" size={22} color={colors.primary} /><Text style={styles.insightText}><Text style={styles.insightStrong}>{result.counts.again + result.counts.hard} kartu</Text> masih perlu latihan. Grade mastery diperbarui dari bukti sesi ini, bukan dari jadwal wajib.</Text></View>
    <Pressable onPress={() => router.replace({ pathname: '/practice/setup', params: { mode: 'flashcard' } })} style={styles.primary}><Ionicons name="refresh" size={19} color={colors.primaryInk} /><Text style={styles.primaryText}>Latihan lagi</Text></Pressable><Pressable onPress={() => router.dismissTo('/practice')} style={styles.secondary}><Text style={styles.secondaryText}>Kembali ke Latihan</Text></Pressable>
  </PaperScreen>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  center: { flex: 1, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center', gap: 10 }, error: { color: colors.danger, fontWeight: '800' }, link: { color: colors.primary, fontWeight: '900' }, content: { alignItems: 'center', paddingTop: 70 }, mark: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, marginBottom: 13 }, note: { color: colors.primary, fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.2 }, title: { color: colors.ink, fontSize: 27, lineHeight: 34, fontWeight: '900', textAlign: 'center', marginTop: 7 }, subtitle: { color: colors.inkMuted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 9, paddingHorizontal: 8 },
  hero: { width: '100%', alignItems: 'center', marginTop: 25, padding: 23, borderRadius: radius.lg, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule }, heroValue: { color: colors.ink, fontSize: 45, fontWeight: '900' }, heroLabel: { color: colors.primary, fontSize: 12, fontWeight: '900' }, rule: { width: 62, height: 3, backgroundColor: colors.highlight, borderRadius: 3, marginVertical: 17, transform: [{ rotate: '-1deg' }] }, heroMeta: { alignItems: 'center' }, metaStrong: { color: colors.ink, fontSize: 14, fontWeight: '900' }, metaText: { color: colors.inkMuted, fontSize: 11, marginTop: 3 },
  breakdown: { width: '100%', flexDirection: 'row', gap: 7, marginTop: 11 }, stat: { flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: radius.md, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule }, statValue: { color: colors.ink, fontSize: 20, fontWeight: '900' }, statLabel: { color: colors.inkMuted, fontSize: 10, fontWeight: '800', marginTop: 2 }, insight: { width: '100%', flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 15, marginTop: 16, borderRadius: radius.md, backgroundColor: colors.primarySoft }, insightText: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 18 }, insightStrong: { fontWeight: '900' },
  primary: { width: '100%', minHeight: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, borderRadius: radius.md, backgroundColor: colors.primary }, primaryText: { color: colors.primaryInk, fontWeight: '900' }, secondary: { minHeight: 47, justifyContent: 'center', paddingHorizontal: 20 }, secondaryText: { color: colors.primary, fontWeight: '900' },
});
