import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { PaperScreen } from '../../../src/components/PaperScreen';
import { IconButton, Pill } from '../../../src/components/ui';
import { useDatabase } from '../../../src/db/DatabaseProvider';
import { getDeck } from '../../../src/features/decks/deck.repository';
import { getLanguage } from '../../../src/features/decks/languages';
import { activeFilterCount, LibraryControls, LibraryFilterState } from '../../../src/features/entries/LibraryControls';
import { EntryListItem, getEntryCount, listEntries, listEntryTags, toggleFavorite } from '../../../src/features/entries/entry.repository';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../../src/theme/tokens';

const typeLabels = { word: 'Kata', phrase: 'Frasa', sentence: 'Kalimat' };
const gradeLabels = ['Baru', 'Dipelajari', 'Familiar', 'Dikuasai'];

export default function DeckScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors);
  const { id } = useLocalSearchParams<{ id: string }>(); const deckId = Number(id);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>(); const [items, setItems] = useState<EntryListItem[]>([]);
  const [total, setTotal] = useState(0); const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [search, setSearch] = useState(''); const [filters, setFilters] = useState<LibraryFilterState>({ sort: 'alphabetical' }); const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(async () => { try { setError(''); const [d, e, count, tagRows] = await Promise.all([getDeck(database, deckId), listEntries(database, deckId, { ...filters, search }), getEntryCount(database, deckId), listEntryTags(database, deckId)]); setDeck(d); setItems(e); setTotal(count); setTags(tagRows); } catch (cause) { console.error(cause); setError('Isi deck belum dapat dibuka.'); } finally { setLoading(false); } }, [database, deckId, filters, search]);
  useEffect(() => { const timer = setTimeout(() => { void load(); }, 180); return () => clearTimeout(timer); }, [load]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  async function favorite(item: EntryListItem) { await toggleFavorite(database, item.id, !item.isFavorite); await load(); }
  const filtering = Boolean(search.trim()) || activeFilterCount(filters) > 0;

  return <PaperScreen keyboardShouldPersistTaps="handled">
    <View style={styles.topbar}><IconButton name="arrow-back" label="Kembali" onPress={() => router.back()} /><View style={styles.heading}><Text style={styles.title} numberOfLines={1}>{deck?.name ?? 'Deck'}</Text>{deck ? <Text style={styles.pair}>{getLanguage(deck.sourceLanguage).short} → {getLanguage(deck.targetLanguage).short}</Text> : null}</View><IconButton name="settings-outline" label="Pengaturan deck" onPress={() => router.push(`/decks/${deckId}/edit`)} /></View>
    <View style={styles.summary}><View><Text style={styles.summaryCount}>{filtering ? items.length : total}</Text><Text style={styles.summaryText}>{filtering ? ` dari ${total} entri` : ' entri dalam deck ini'}</Text></View><Pressable onPress={() => router.push(`/decks/${deckId}/entries/new`)} style={styles.add}><Ionicons name="add" size={19} color={colors.primaryInk} /><Text style={styles.addText}>Tambah</Text></Pressable></View>
    {total > 0 ? <LibraryControls search={search} onSearchChange={setSearch} filters={filters} onFiltersChange={setFilters} tags={tags} open={filterOpen} onOpen={() => setFilterOpen(true)} onClose={() => setFilterOpen(false)} /> : null}

    {loading ? <View style={styles.state}><ActivityIndicator color={colors.primary} /></View> : null}
    {error ? <View style={styles.state}><Text style={styles.error}>{error}</Text><Pressable onPress={load}><Text style={styles.retry}>Muat ulang</Text></Pressable></View> : null}
    {!loading && !error && total === 0 ? <View style={styles.empty}><Ionicons name="pencil-outline" size={39} color={colors.primary} /><Text style={styles.emptyTitle}>Belum ada catatan</Text><Text style={styles.emptyText}>Tambahkan kata, frasa, atau kalimat pertama yang ingin kamu ingat.</Text><Pressable onPress={() => router.push(`/decks/${deckId}/entries/new`)} style={styles.emptyButton}><Text style={styles.emptyButtonText}>Tulis entri pertama</Text></Pressable></View> : null}
    {!loading && !error && total > 0 && items.length === 0 ? <View style={styles.noResults}><Ionicons name="search-outline" size={31} color={colors.inkMuted} /><Text style={styles.noResultsTitle}>Tidak ada catatan yang cocok</Text><Text style={styles.emptyText}>Coba kata lain atau hapus beberapa filter.</Text><Pressable onPress={() => { setSearch(''); setFilters({ sort: 'alphabetical' }); }} style={styles.clear}><Text style={styles.clearText}>Bersihkan pencarian</Text></Pressable></View> : null}
    {items.map((item) => <Pressable accessibilityRole="button" accessibilityLabel={`Buka ${item.sourceText}`} key={item.id} onPress={() => router.push(`/decks/${deckId}/entries/${item.id}`)} style={({ pressed }) => [styles.entry, pressed && { opacity: 0.68 }]}>
      <View style={styles.entryText}><View style={styles.entryTop}><Text style={styles.source}>{item.sourceText}</Text><Pressable hitSlop={10} accessibilityRole="checkbox" accessibilityState={{ checked: item.isFavorite }} accessibilityLabel={item.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'} onPress={(event) => { event.stopPropagation(); void favorite(item); }}><Ionicons name={item.isFavorite ? 'star' : 'star-outline'} size={20} color={item.isFavorite ? colors.highlight : colors.inkFaint} /></Pressable></View><Text style={styles.translation}>{item.translatedText}</Text><View style={styles.tags}><Pill tone="plain">{typeLabels[item.type]}</Pill><Pill tone={item.grade === 3 ? 'green' : 'plain'}>{gradeLabels[item.grade] ?? 'Baru'}</Pill>{item.tagNames.slice(0, 2).map((tag) => <Pill key={tag}>{tag}</Pill>)}{item.tagNames.length > 2 ? <Pill tone="plain">+{item.tagNames.length - 2}</Pill> : null}</View></View><Ionicons name="chevron-forward" size={18} color={colors.inkMuted} />
    </Pressable>)}
  </PaperScreen>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 22 }, heading: { flex: 1 }, title: { color: colors.ink, fontSize: 23, fontWeight: '900' }, pair: { color: colors.primary, fontSize: 12, fontWeight: '900', marginTop: 3 },
  summary: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.rule, paddingBottom: 15, marginBottom: 13 }, summaryCount: { color: colors.ink, fontSize: 20, fontWeight: '900' }, summaryText: { color: colors.inkMuted, fontSize: 12 }, add: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5, minHeight: 43, paddingHorizontal: 14, backgroundColor: colors.primary, borderRadius: radius.md }, addText: { color: colors.primaryInk, fontSize: 12, fontWeight: '900' },
  state: { alignItems: 'center', paddingVertical: 44, gap: 9 }, error: { color: colors.danger, fontWeight: '700' }, retry: { color: colors.primary, fontWeight: '900' },
  empty: { alignItems: 'center', marginTop: 24, padding: 30, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.paperRaised }, emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 12 }, emptyText: { color: colors.inkMuted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 7 }, emptyButton: { marginTop: 18, backgroundColor: colors.primarySoft, borderRadius: radius.md, paddingHorizontal: 15, paddingVertical: 11 }, emptyButtonText: { color: colors.primary, fontWeight: '900' },
  noResults: { alignItems: 'center', paddingVertical: 45 }, noResultsTitle: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 12 }, clear: { marginTop: 17, paddingHorizontal: 15, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.primarySoft }, clearText: { color: colors.primary, fontWeight: '900' },
  entry: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.rule }, entryText: { flex: 1 }, entryTop: { flexDirection: 'row', alignItems: 'center', gap: 10 }, source: { flex: 1, color: colors.ink, fontSize: 17, lineHeight: 22, fontWeight: '900' }, translation: { color: colors.inkMuted, fontSize: 13, lineHeight: 19, marginTop: 3 }, tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 9 },
});
