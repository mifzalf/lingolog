import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { getMixedProgress, mixedRoute } from '../../src/features/practice/mixed.repository';
import { GameMode } from '../../src/features/practice/session.repository';
import { useTheme } from '../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../src/theme/tokens';
const labels: Record<GameMode, string> = { flashcard: 'Kartu flash', dictation: 'Dikte', matchup: 'Jodohkan kata', delayed_recall: 'Ingat Lagi' };
export default function MixedPracticeScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors); const { sessionId } = useLocalSearchParams<{ sessionId: string }>(); const [error, setError] = useState('');
  useEffect(() => { getMixedProgress(database, Number(sessionId)).then((progress) => { if (!progress) return setError('Sesi campuran tidak ditemukan.'); if (!progress.current) { router.replace({ pathname: '/practice/mixed-result', params: { sessionId } }); return; } router.replace({ pathname: mixedRoute(progress.current.mode) as never, params: { sessionId: String(progress.current.sessionId), mixedSessionId: sessionId } }); }).catch((cause) => { console.error(cause); setError('Sesi campuran belum dapat dibuka.'); }); }, [database, sessionId]);
  return <View style={styles.screen}>{error ? <><Ionicons name="alert-circle-outline" size={30} color={colors.danger} /><Text style={styles.error}>{error}</Text><Pressable onPress={() => router.dismissTo('/practice')} style={styles.button}><Text style={styles.buttonText}>Kembali ke Latihan</Text></Pressable></> : <><ActivityIndicator color={colors.primary} /><Text style={styles.text}>Menyiapkan game berikutnya…</Text></>}</View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({ screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, backgroundColor: colors.paper }, text: { color: colors.inkMuted }, error: { color: colors.danger, fontWeight: '800', textAlign: 'center' }, button: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 18, borderRadius: radius.md, backgroundColor: colors.primary }, buttonText: { color: colors.primaryInk, fontWeight: '900' } });
