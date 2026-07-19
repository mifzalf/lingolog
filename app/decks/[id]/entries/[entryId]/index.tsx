import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { PaperScreen } from '../../../../../src/components/PaperScreen';
import { useAppDialog } from '../../../../../src/components/AppDialog';
import { IconButton, Pill } from '../../../../../src/components/ui';
import { useDatabase } from '../../../../../src/db/DatabaseProvider';
import { getDeck } from '../../../../../src/features/decks/deck.repository';
import { getLanguage } from '../../../../../src/features/decks/languages';
import { getEntry, toggleFavorite } from '../../../../../src/features/entries/entry.repository';
import { MasterySheet, MasterySummary } from '../../../../../src/features/practice/MasteryPanel';
import { MasteryGrade } from '../../../../../src/features/practice/mastery';
import { getMasteryState, listRecentMasteryEvidence, setManualMasteryGrade } from '../../../../../src/features/practice/mastery.repository';
import { EntryStatistics, getEntryStatistics } from '../../../../../src/features/statistics/statistics.repository';
import { EmptyStatistics, Metric, ModeBreakdown } from '../../../../../src/features/statistics/StatisticsViews';
import { SpeakButton, SpeechNotice, SpeechSettings } from '../../../../../src/features/speech/SpeechControls';
import { useSpeech } from '../../../../../src/features/speech/SpeechProvider';
import { useTheme } from '../../../../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../../../../src/theme/tokens';

const typeLabels = { word: 'Kata', phrase: 'Frasa', sentence: 'Kalimat' };

export default function EntryDetailScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors); const { showDialog } = useAppDialog();
  const params = useLocalSearchParams<{ id: string; entryId: string }>(); const deckId = Number(params.id); const entryId = Number(params.entryId);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>();
  const [entry, setEntry] = useState<Awaited<ReturnType<typeof getEntry>>>();
  const [mastery, setMastery] = useState<Awaited<ReturnType<typeof getMasteryState>>>(); const [statistics, setStatistics] = useState<EntryStatistics>(); const [evidence, setEvidence] = useState<Awaited<ReturnType<typeof listRecentMasteryEvidence>>>([]);
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [speechSettings, setSpeechSettings] = useState(false); const [masteryOpen, setMasteryOpen] = useState(false); const [masterySaving, setMasterySaving] = useState(false);
  const { stop } = useSpeech();
  const load = useCallback(async () => { try { setError(''); const [d, e, m, recent, stats] = await Promise.all([getDeck(database, deckId), getEntry(database, entryId), getMasteryState(database, entryId), listRecentMasteryEvidence(database, entryId), getEntryStatistics(database, entryId)]); setDeck(d); setEntry(e); setMastery(m); setEvidence(recent); setStatistics(stats); } catch (cause) { console.error(cause); setError('Detail entri belum dapat dibuka.'); } finally { setLoading(false); } }, [database, deckId, entryId]);
  useFocusEffect(useCallback(() => { void load(); return () => { void stop(); }; }, [load, stop]));
  async function favorite() { if (!entry) return; await toggleFavorite(database, entry.id, !entry.isFavorite); await load(); }
  async function setMasteryGrade(grade: MasteryGrade | null) { try { setMasterySaving(true); await setManualMasteryGrade(database, entryId, deckId, grade); await load(); if (grade === null) setMasteryOpen(false); } catch (cause) { console.error(cause); showDialog({ title: 'Mastery belum berubah', message: 'Coba lagi tanpa menutup halaman ini.', icon: 'alert-circle-outline' }); } finally { setMasterySaving(false); } }

  if (loading) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  if (error || !deck || !entry || !mastery) return <View style={[styles.center, { backgroundColor: colors.paper }]}><Ionicons name="alert-circle-outline" size={28} color={colors.danger} /><Text style={styles.error}>{error || 'Entri tidak ditemukan.'}</Text><Pressable onPress={load}><Text style={styles.retry}>Muat ulang</Text></Pressable></View>;
  const created = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(entry.createdAt);
  return <PaperScreen>
    <View style={styles.topbar}><IconButton name="arrow-back" label="Kembali" onPress={() => router.back()} /><View style={styles.heading}><Text style={styles.deck} numberOfLines={1}>{deck.name}</Text><Text style={styles.pair}>{getLanguage(deck.sourceLanguage).short} → {getLanguage(deck.targetLanguage).short}</Text></View><View style={styles.actions}><IconButton name="options-outline" label="Pengaturan suara" onPress={() => setSpeechSettings(true)} /><IconButton name="create-outline" label="Ubah entri" onPress={() => router.push(`/decks/${deckId}/entries/${entryId}/edit`)} /></View></View>
    <SpeechNotice />
    <View style={styles.metaRow}><Pill tone="plain">{typeLabels[entry.type]}</Pill><Text style={styles.date}>Ditulis {created}</Text><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: entry.isFavorite }} accessibilityLabel="Favorit" onPress={favorite} style={styles.favorite}><Ionicons name={entry.isFavorite ? 'star' : 'star-outline'} size={24} color={entry.isFavorite ? colors.highlight : colors.inkMuted} /></Pressable></View>
    <View style={styles.paperCard}><Text style={styles.language}>{getLanguage(deck.sourceLanguage).name}</Text><Text selectable style={styles.source}>{entry.sourceText}</Text><SpeakButton text={entry.sourceText} language={deck.sourceLanguage} speechKey={`entry-${entry.id}-source`} label={getLanguage(deck.sourceLanguage).name} /><View style={styles.divider} /><Text style={styles.language}>{getLanguage(deck.targetLanguage).name}</Text><Text selectable style={styles.translation}>{entry.translatedText}</Text><SpeakButton text={entry.translatedText} language={deck.targetLanguage} speechKey={`entry-${entry.id}-target`} label={getLanguage(deck.targetLanguage).name} /></View>
    <MasterySummary state={mastery} onPress={() => setMasteryOpen(true)} />
    {statistics ? <Section icon="analytics-outline" title="Statistik latihan" styles={styles} colors={colors}>{statistics.answers ? <><View style={styles.statMetrics}><Metric value={`${statistics.accuracy}%`} label="Akurasi" detail={`${statistics.answers} percobaan`} /><Metric value={statistics.averageResponseMs == null ? '—' : `${(statistics.averageResponseMs / 1000).toFixed(1)} dtk`} label="Rata-rata respons" detail={statistics.corrected ? `${statistics.corrected} koreksi Dikte` : undefined} /></View><ModeBreakdown data={statistics.modes} /></> : <EmptyStatistics />}</Section> : null}
    {entry.exampleText || entry.exampleTranslation ? <Section icon="chatbubble-ellipses-outline" title="Contoh" styles={styles} colors={colors}><Text selectable style={styles.bodyStrong}>{entry.exampleText}</Text>{entry.exampleText ? <SpeakButton compact text={entry.exampleText} language={deck.sourceLanguage} speechKey={`entry-${entry.id}-example`} label="contoh" /> : null}{entry.exampleTranslation ? <Text selectable style={styles.bodyMuted}>{entry.exampleTranslation}</Text> : null}</Section> : null}
    {entry.notes ? <Section icon="pencil-outline" title="Catatan" styles={styles} colors={colors}><Text selectable style={styles.body}>{entry.notes}</Text></Section> : null}
    {entry.tags.length ? <Section icon="pricetags-outline" title="Tag" styles={styles} colors={colors}><View style={styles.tags}>{entry.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</View></Section> : null}
    <MasterySheet state={mastery} recent={evidence} visible={masteryOpen} saving={masterySaving} onClose={() => setMasteryOpen(false)} onSelect={(grade) => void setMasteryGrade(grade)} />
    <SpeechSettings visible={speechSettings} languages={[getLanguage(deck.sourceLanguage), getLanguage(deck.targetLanguage)]} onClose={() => setSpeechSettings(false)} />
  </PaperScreen>;
}

function Section({ icon, title, children, styles, colors }: { icon: keyof typeof Ionicons.glyphMap; title: string; children: React.ReactNode; styles: ReturnType<typeof createStyles>; colors: ThemeColors }) { return <View style={styles.section}><View style={styles.sectionTitle}><Ionicons name={icon} size={18} color={colors.primary} /><Text style={styles.sectionLabel}>{title}</Text></View>{children}</View>; }
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 9, padding: 24 }, error: { color: colors.danger, textAlign: 'center', fontWeight: '700' }, retry: { color: colors.primary, fontWeight: '900' },
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 23 }, actions: { flexDirection: 'row', gap: 6 }, heading: { flex: 1 }, deck: { color: colors.ink, fontSize: 19, fontWeight: '900' }, pair: { color: colors.primary, fontSize: 11, fontWeight: '900', marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }, date: { color: colors.inkMuted, fontSize: 12 }, favorite: { marginLeft: 'auto', padding: 6 },
  paperCard: { padding: 21, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.paperRaised, shadowColor: colors.shadow, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } }, language: { color: colors.primary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.7 }, source: { color: colors.ink, fontSize: 27, lineHeight: 35, fontWeight: '900', marginTop: 8, marginBottom: 13 }, divider: { width: 53, height: 3, borderRadius: 3, backgroundColor: colors.highlight, marginVertical: 20, transform: [{ rotate: '-1deg' }] }, translation: { color: colors.ink, fontSize: 20, lineHeight: 29, fontWeight: '600', marginTop: 7, marginBottom: 13 },
  section: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.rule }, statMetrics: { flexDirection: 'row', gap: 8, marginBottom: 10 }, sectionTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 11 }, sectionLabel: { color: colors.ink, fontSize: 15, fontWeight: '900' }, body: { color: colors.ink, fontSize: 15, lineHeight: 23 }, bodyStrong: { color: colors.ink, fontSize: 17, lineHeight: 25, fontWeight: '700' }, bodyMuted: { color: colors.inkMuted, fontSize: 14, lineHeight: 22, marginTop: 5 }, tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
});
