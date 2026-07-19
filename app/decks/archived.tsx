import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PaperScreen } from '../../src/components/PaperScreen';
import { useAppDialog } from '../../src/components/AppDialog';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { setDeckArchived } from '../../src/features/decks/deck.repository';
import { getLanguage } from '../../src/features/decks/languages';
import { useDecks } from '../../src/features/decks/useDecks';
import { useTheme } from '../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../src/theme/tokens';

export default function ArchivedDecksScreen() {
  const database = useDatabase();
  const { colors } = useTheme();
  const styles = createStyles(colors); const { showDialog } = useAppDialog();
  const { decks, loading, error, reload } = useDecks(true);

  async function restore(id: number) {
    try { await setDeckArchived(database, id, false); await reload(); } catch { showDialog({ title: 'Deck belum dipulihkan', message: 'Coba lagi tanpa meninggalkan halaman ini.', icon: 'alert-circle-outline' }); }
  }

  return <PaperScreen>
    <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={23} color={colors.ink} /></Pressable><Text style={styles.title}>Deck diarsipkan</Text></View>
    <Text style={styles.note}>Deck tersimpan di sini dan tidak muncul di Pustaka.</Text>
    {!loading && !error && decks.length === 0 ? <View style={styles.empty}><Ionicons name="archive-outline" size={35} color={colors.primary} /><Text style={styles.emptyTitle}>Arsip masih kosong</Text><Text style={styles.meta}>Deck yang diarsipkan akan muncul di halaman ini.</Text></View> : null}
    {error ? <Text style={styles.error}>{error}</Text> : null}
    {decks.map((deck) => <View style={styles.row} key={deck.id}><View style={[styles.dot, { backgroundColor: deck.color ?? colors.primary }]} /><View style={styles.grow}><Text style={styles.name}>{deck.name}</Text><Text style={styles.meta}>{getLanguage(deck.sourceLanguage).short} → {getLanguage(deck.targetLanguage).short} · {deck.entryCount} entri</Text></View><Pressable onPress={() => restore(deck.id)} style={styles.restore}><Text style={styles.restoreText}>Pulihkan</Text></Pressable></View>)}
  </PaperScreen>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }, back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }, title: { color: colors.ink, fontSize: 23, fontWeight: '900' }, note: { color: colors.inkMuted, fontSize: 14, lineHeight: 20, marginBottom: 25 },
  empty: { alignItems: 'center', backgroundColor: colors.paperRaised, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.rule, padding: 30 }, emptyTitle: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 12, marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.rule }, grow: { flex: 1 }, dot: { width: 11, height: 11, borderRadius: 6 }, name: { color: colors.ink, fontSize: 16, fontWeight: '900' }, meta: { color: colors.inkMuted, fontSize: 12, lineHeight: 18 }, restore: { backgroundColor: colors.primarySoft, borderRadius: radius.sm, paddingHorizontal: 11, paddingVertical: 8 }, restoreText: { color: colors.primary, fontSize: 12, fontWeight: '900' }, error: { color: colors.danger, fontWeight: '700' },
});
