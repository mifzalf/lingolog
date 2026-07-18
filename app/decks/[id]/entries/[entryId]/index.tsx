import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { PaperScreen } from '../../../../../src/components/PaperScreen';
import { IconButton, Pill } from '../../../../../src/components/ui';
import { useDatabase } from '../../../../../src/db/DatabaseProvider';
import { getDeck } from '../../../../../src/features/decks/deck.repository';
import { getLanguage } from '../../../../../src/features/decks/languages';
import { getEntry, toggleFavorite } from '../../../../../src/features/entries/entry.repository';
import { useTheme } from '../../../../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../../../../src/theme/tokens';

const typeLabels = { word: 'Kata', phrase: 'Frasa', sentence: 'Kalimat' };

export default function EntryDetailScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors);
  const params = useLocalSearchParams<{ id: string; entryId: string }>(); const deckId = Number(params.id); const entryId = Number(params.entryId);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>();
  const [entry, setEntry] = useState<Awaited<ReturnType<typeof getEntry>>>();
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(async () => { try { setError(''); const [d, e] = await Promise.all([getDeck(database, deckId), getEntry(database, entryId)]); setDeck(d); setEntry(e); } catch (cause) { console.error(cause); setError('Detail entri belum dapat dibuka.'); } finally { setLoading(false); } }, [database, deckId, entryId]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  async function favorite() { if (!entry) return; await toggleFavorite(database, entry.id, !entry.isFavorite); await load(); }

  if (loading) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  if (error || !deck || !entry) return <View style={[styles.center, { backgroundColor: colors.paper }]}><Ionicons name="alert-circle-outline" size={28} color={colors.danger} /><Text style={styles.error}>{error || 'Entri tidak ditemukan.'}</Text><Pressable onPress={load}><Text style={styles.retry}>Muat ulang</Text></Pressable></View>;
  const created = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(entry.createdAt);
  return <PaperScreen>
    <View style={styles.topbar}><IconButton name="arrow-back" label="Kembali" onPress={() => router.back()} /><View style={styles.heading}><Text style={styles.deck} numberOfLines={1}>{deck.name}</Text><Text style={styles.pair}>{getLanguage(deck.sourceLanguage).short} → {getLanguage(deck.targetLanguage).short}</Text></View><IconButton name="create-outline" label="Ubah entri" onPress={() => router.push(`/decks/${deckId}/entries/${entryId}/edit`)} /></View>
    <View style={styles.metaRow}><Pill tone="plain">{typeLabels[entry.type]}</Pill><Text style={styles.date}>Ditulis {created}</Text><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: entry.isFavorite }} accessibilityLabel="Favorit" onPress={favorite} style={styles.favorite}><Ionicons name={entry.isFavorite ? 'star' : 'star-outline'} size={24} color={entry.isFavorite ? colors.highlight : colors.inkMuted} /></Pressable></View>
    <View style={styles.paperCard}><Text style={styles.language}>{getLanguage(deck.sourceLanguage).name}</Text><Text selectable style={styles.source}>{entry.sourceText}</Text><View style={styles.divider} /><Text style={styles.language}>{getLanguage(deck.targetLanguage).name}</Text><Text selectable style={styles.translation}>{entry.translatedText}</Text></View>
    {entry.exampleText || entry.exampleTranslation ? <Section icon="chatbubble-ellipses-outline" title="Contoh" styles={styles} colors={colors}><Text selectable style={styles.bodyStrong}>{entry.exampleText}</Text>{entry.exampleTranslation ? <Text selectable style={styles.bodyMuted}>{entry.exampleTranslation}</Text> : null}</Section> : null}
    {entry.notes ? <Section icon="pencil-outline" title="Catatan" styles={styles} colors={colors}><Text selectable style={styles.body}>{entry.notes}</Text></Section> : null}
    {entry.tags.length ? <Section icon="pricetags-outline" title="Tag" styles={styles} colors={colors}><View style={styles.tags}>{entry.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</View></Section> : null}
  </PaperScreen>;
}

function Section({ icon, title, children, styles, colors }: { icon: keyof typeof Ionicons.glyphMap; title: string; children: React.ReactNode; styles: ReturnType<typeof createStyles>; colors: ThemeColors }) { return <View style={styles.section}><View style={styles.sectionTitle}><Ionicons name={icon} size={18} color={colors.primary} /><Text style={styles.sectionLabel}>{title}</Text></View>{children}</View>; }
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 9, padding: 24 }, error: { color: colors.danger, textAlign: 'center', fontWeight: '700' }, retry: { color: colors.primary, fontWeight: '900' },
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 23 }, heading: { flex: 1 }, deck: { color: colors.ink, fontSize: 19, fontWeight: '900' }, pair: { color: colors.primary, fontSize: 11, fontWeight: '900', marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }, date: { color: colors.inkMuted, fontSize: 12 }, favorite: { marginLeft: 'auto', padding: 6 },
  paperCard: { padding: 21, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.paperRaised, shadowColor: colors.shadow, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } }, language: { color: colors.primary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.7 }, source: { color: colors.ink, fontSize: 27, lineHeight: 35, fontWeight: '900', marginTop: 8 }, divider: { width: 53, height: 3, borderRadius: 3, backgroundColor: colors.highlight, marginVertical: 20, transform: [{ rotate: '-1deg' }] }, translation: { color: colors.ink, fontSize: 20, lineHeight: 29, fontWeight: '600', marginTop: 7 },
  section: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.rule }, sectionTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 11 }, sectionLabel: { color: colors.ink, fontSize: 15, fontWeight: '900' }, body: { color: colors.ink, fontSize: 15, lineHeight: 23 }, bodyStrong: { color: colors.ink, fontSize: 17, lineHeight: 25, fontWeight: '700' }, bodyMuted: { color: colors.inkMuted, fontSize: 14, lineHeight: 22, marginTop: 5 }, tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
});
