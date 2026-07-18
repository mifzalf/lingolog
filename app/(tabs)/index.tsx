import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IconButton, Pill, ScreenHeader, SectionTitle, ThemeButton } from '../../src/components/ui';
import { PaperScreen } from '../../src/components/PaperScreen';
import { getLanguage } from '../../src/features/decks/languages';
import { useDecks } from '../../src/features/decks/useDecks';
import { useTheme } from '../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../src/theme/tokens';

export default function LibraryScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { decks, loading, error, reload } = useDecks();

  return (
    <PaperScreen refreshControl={undefined}>
      <ScreenHeader note="Lingolog" title="Kata yang sedang kamu tumbuhkan." action={<View style={styles.headerActions}><ThemeButton /><IconButton name="add" label="Tambah deck" onPress={() => router.push('/decks/new')} /></View>} />
      <Pressable accessibilityRole="button" onPress={() => router.push('/decks/archived')} style={styles.archiveLink}><Ionicons name="archive-outline" size={17} color={colors.primary} /><Text style={styles.archiveText}>Lihat deck diarsipkan</Text></Pressable>

      <SectionTitle aside={loading ? undefined : `${decks.length} deck`}>Pustaka</SectionTitle>
      {loading ? <View style={styles.state}><ActivityIndicator color={colors.primary} /><Text style={styles.stateText}>Membuka catatan…</Text></View> : null}
      {error ? <View style={styles.state}><Ionicons name="alert-circle-outline" size={28} color={colors.danger} /><Text style={styles.stateTitle}>Pustaka belum dapat dibuka</Text><Text style={styles.stateText}>{error}</Text><Pressable onPress={reload} style={styles.retry}><Text style={styles.retryText}>Muat ulang</Text></Pressable></View> : null}
      {!loading && !error && decks.length === 0 ? <View style={styles.empty}><View style={styles.emptySketch}><Ionicons name="book-outline" size={43} color={colors.primary} /><View style={styles.sketchLine} /></View><Text style={styles.emptyTitle}>Halaman pertamamu masih kosong</Text><Text style={styles.emptyText}>Buat deck untuk mengumpulkan kata dan kalimat dalam satu pasangan bahasa.</Text><Pressable onPress={() => router.push('/decks/new')} style={styles.primaryButton}><Ionicons name="add" size={19} color={colors.primaryInk} /><Text style={styles.primaryText}>Buat deck pertama</Text></Pressable></View> : null}

      {decks.map((deck) => {
        const percentage = deck.entryCount ? Math.round(deck.masteredCount / deck.entryCount * 100) : 0;
        return <Pressable accessibilityRole="button" accessibilityLabel={`Buka deck ${deck.name}`} onPress={() => router.push(`/decks/${deck.id}`)} key={deck.id} style={({ pressed }) => [styles.deck, pressed && styles.deckPressed]}>
          <View style={[styles.deckDot, { backgroundColor: deck.color ?? colors.primary }]} />
          <View style={styles.deckContent}>
            <View style={styles.deckTop}><Text style={styles.deckName} numberOfLines={1}>{deck.name}</Text><Ionicons name="chevron-forward" size={18} color={colors.inkMuted} /></View>
            <Text style={styles.meta}>{deck.entryCount} entri · {deck.masteredCount} dikuasai</Text>
            <View style={styles.progressTrack}><View style={[styles.progress, { width: `${percentage}%` }]} /></View>
            <Pill>{getLanguage(deck.sourceLanguage).short} → {getLanguage(deck.targetLanguage).short}</Pill>
          </View>
        </Pressable>;
      })}
    </PaperScreen>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  headerActions: { flexDirection: 'row', gap: 8 },
  archiveLink: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8, marginTop: -13, marginBottom: 24 }, archiveText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  state: { alignItems: 'center', paddingVertical: 42, gap: 9 }, stateTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' }, stateText: { color: colors.inkMuted, fontSize: 13, textAlign: 'center' }, retry: { marginTop: 5, paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.primarySoft }, retryText: { color: colors.primary, fontWeight: '900' },
  empty: { alignItems: 'center', backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, borderRadius: radius.lg, paddingHorizontal: 25, paddingVertical: 31 }, emptySketch: { alignItems: 'center', marginBottom: 17, transform: [{ rotate: '-2deg' }] }, sketchLine: { width: 62, height: 3, backgroundColor: colors.highlight, borderRadius: 3, marginTop: 5 }, emptyTitle: { color: colors.ink, fontSize: 19, fontWeight: '900', textAlign: 'center' }, emptyText: { color: colors.inkMuted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8, marginBottom: 20 }, primaryButton: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: colors.primary, minHeight: 48, borderRadius: radius.md, paddingHorizontal: 17 }, primaryText: { color: colors.primaryInk, fontWeight: '900' },
  deck: { flexDirection: 'row', gap: 15, padding: 18, backgroundColor: colors.paperRaised, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.rule, marginBottom: 12, shadowColor: colors.shadow, shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }, deckPressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  deckDot: { width: 11, height: 11, borderRadius: 6, marginTop: 6 }, deckContent: { flex: 1 }, deckTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }, deckName: { flex: 1, color: colors.ink, fontSize: 19, fontWeight: '800' }, meta: { color: colors.inkMuted, fontSize: 13, lineHeight: 20 }, progressTrack: { height: 4, backgroundColor: colors.primarySoft, borderRadius: 4, marginVertical: 12, transform: [{ rotate: '-0.4deg' }] }, progress: { height: 4, backgroundColor: colors.primary, borderRadius: 4 },
});
