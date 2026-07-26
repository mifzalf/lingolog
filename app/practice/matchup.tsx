import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppDialog } from '../../src/components/AppDialog';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { useAccessibility } from '../../src/features/accessibility/AccessibilityProvider';
import { useHaptics } from '../../src/features/settings/HapticsProvider';
import { useSpeech } from '../../src/features/speech/SpeechProvider';
import { createMatchupRounds } from '../../src/features/practice/matchup';
import { getMatchupProgress, recordMatchupPair } from '../../src/features/practice/matchup.repository';
import { completePracticeSession } from '../../src/features/practice/session.repository';
import { usePracticeSession } from '../../src/features/practice/usePracticeSession';
import { useTheme } from '../../src/theme/ThemeProvider';
import { radius, ThemeColors } from '../../src/theme/tokens';

type Side = 'source' | 'target';
type Selection = { side: Side; id: number } | null;

export default function MatchupScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const styles = createStyles(colors); const { announce, reduceMotion } = useAccessibility(); const haptics = useHaptics(); const { speakFast, stop: stopSpeech } = useSpeech(); const { showDialog } = useAppDialog();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>(); const id = Number(sessionId); const { data, loading, error, reload } = usePracticeSession(id);
  const [progressLoading, setProgressLoading] = useState(true); const [answeredIds, setAnsweredIds] = useState<Set<number>>(new Set()); const [selection, setSelection] = useState<Selection>(null); const [mistakes, setMistakes] = useState<Record<number, number>>({}); const [wrong, setWrong] = useState<number[]>([]); const [saving, setSaving] = useState(false); const roundStartedAt = useRef(Date.now());
  const rounds = useMemo(() => createMatchupRounds(data?.items ?? [], id), [data?.items, id]);
  const roundIndex = rounds.findIndex((round) => round.items.some((item) => !answeredIds.has(item.id))); const round = rounds[roundIndex];
  useEffect(() => { if (!data) return; getMatchupProgress(database, id).then(async (progress) => { setAnsweredIds(progress.answeredIds); if (progress.answeredIds.size >= data.items.length) { if (!data.session.completedAt) await completePracticeSession(database, data.session.id, data.session.startedAt); router.replace({ pathname: '/practice/matchup-result', params: { sessionId } }); } }).catch(console.error).finally(() => setProgressLoading(false)); }, [data, database, id, sessionId]);
  useEffect(() => { roundStartedAt.current = Date.now(); setSelection(null); setMistakes({}); setWrong([]); }, [roundIndex]);
  useEffect(() => () => { void stopSpeech(); }, [stopSpeech]);
  if (loading || progressLoading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /><Text style={styles.help}>Menyiapkan pasangan…</Text></View>;
  if (error || !data || !round) return <View style={styles.center}><Text accessibilityRole="alert" style={styles.error}>{error || 'Materi sesi tidak tersedia.'}</Text>{error ? <Pressable onPress={reload}><Text style={styles.link}>Coba lagi</Text></Pressable> : null}<Pressable onPress={() => router.dismissTo('/practice')}><Text style={styles.link}>Kembali ke latihan</Text></Pressable></View>;

  const sessionData = data;
  const remaining = round.items.filter((item) => !answeredIds.has(item.id));
  function requestExit() { showDialog({ title: 'Jeda sesi?', message: 'Pasangan yang sudah ditemukan tetap tersimpan. Ronde ini dapat dilanjutkan dari halaman Latihan.', icon: 'pause-circle-outline', actions: [{ label: 'Jeda & keluar', tone: 'primary', onPress: () => router.dismissTo('/practice') }, { label: 'Lanjut bermain', tone: 'neutral' }] }); }
  async function choose(side: Side, entryId: number) {
    if (saving || answeredIds.has(entryId)) return;
    if (side === 'source') {
      const item = round.items.find((candidate) => candidate.id === entryId);
      if (item) void speakFast(item.sourceText, item.sourceLanguage, `matchup-source-${entryId}`);
    }
    if (!selection || selection.side === side) { setSelection(selection?.side === side && selection.id === entryId ? null : { side, id: entryId }); void haptics.selection(); return; }
    const sourceId = side === 'source' ? entryId : selection.id; const targetId = side === 'target' ? entryId : selection.id;
    if (sourceId !== targetId) {
      setMistakes((current) => ({ ...current, [sourceId]: (current[sourceId] ?? 0) + 1, [targetId]: (current[targetId] ?? 0) + 1 })); setWrong([sourceId, targetId]); setSelection(null); announce('Belum cocok, coba pasangan lain'); void haptics.notification(Haptics.NotificationFeedbackType.Warning); setTimeout(() => setWrong([]), reduceMotion ? 0 : 380); return;
    }
    const item = round.items.find((candidate) => candidate.id === sourceId)!;
    try {
      setSaving(true); await recordMatchupPair(database, { sessionId: sessionData.session.id, entryId: item.id, deckId: item.deckId, mistakes: mistakes[item.id] ?? 0, responseTimeMs: Date.now() - roundStartedAt.current });
      const nextAnswered = new Set(answeredIds).add(item.id); setAnsweredIds(nextAnswered); setSelection(null); announce(`Cocok: ${item.sourceText}, ${item.translatedText}`); void haptics.notification(Haptics.NotificationFeedbackType.Success);
      if (nextAnswered.size >= sessionData.items.length) { await completePracticeSession(database, sessionData.session.id, sessionData.session.startedAt); router.replace({ pathname: '/practice/matchup-result', params: { sessionId } }); }
    } catch (cause) { console.error(cause); showDialog({ title: 'Pasangan belum tersimpan', message: 'Coba pilih pasangan itu kembali.', icon: 'alert-circle-outline' }); } finally { setSaving(false); }
  }

  const completed = answeredIds.size; return <View style={styles.screen}>
    <View style={styles.top}><Pressable accessibilityLabel="Jeda dan keluar" hitSlop={9} onPress={requestExit}><Ionicons name="close" size={27} color={colors.ink} /></Pressable><View style={styles.heading}><Text style={styles.counter}>Ronde {roundIndex + 1} / {rounds.length}</Text><Text style={styles.deck} numberOfLines={1}>{round.items[0]?.deckName}</Text></View><Text accessibilityLabel={`${remaining.length} pasangan tersisa`} style={styles.remaining}>{remaining.length}</Text></View>
    <View accessible accessibilityRole="progressbar" accessibilityLabel="Progres Jodohkan kata" accessibilityValue={{ min: 0, max: sessionData.items.length, now: completed, text: `${completed} dari ${sessionData.items.length}` }} style={styles.progress}><View style={[styles.progressFill, { width: `${completed / sessionData.items.length * 100}%` }]} /></View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Text style={styles.instruction}>{selection ? `Sekarang pilih ${selection.side === 'source' ? 'arti' : 'kata'} pasangannya` : 'Pilih satu kata atau arti'}</Text><View style={styles.labels}><Text style={styles.label}>KATA</Text><Text style={styles.label}>ARTI</Text></View><View style={styles.board}><View style={styles.column}>{round.sourceOrder.map((entryId) => { const item = round.items.find((entry) => entry.id === entryId)!; return <MatchTile key={entryId} text={item.sourceText} selected={selection?.side === 'source' && selection.id === entryId} wrong={wrong.includes(entryId)} matched={answeredIds.has(entryId)} onPress={() => void choose('source', entryId)} styles={styles} />; })}</View><View style={styles.column}>{round.targetOrder.map((entryId) => { const item = round.items.find((entry) => entry.id === entryId)!; return <MatchTile key={entryId} text={item.translatedText} selected={selection?.side === 'target' && selection.id === entryId} wrong={wrong.includes(entryId)} matched={answeredIds.has(entryId)} onPress={() => void choose('target', entryId)} styles={styles} />; })}</View></View></ScrollView>
  </View>;
}
function MatchTile({ text, selected, wrong, matched, onPress, styles }: { text: string; selected: boolean; wrong: boolean; matched: boolean; onPress: () => void; styles: ReturnType<typeof createStyles> }) { return <Pressable accessibilityRole="button" accessibilityLabel={text} accessibilityState={{ selected, disabled: matched }} disabled={matched} onPress={onPress} style={({ pressed }) => [styles.tile, selected && styles.tileSelected, wrong && styles.tileWrong, matched && styles.tileMatched, pressed && styles.pressed]}><Text numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.78} style={[styles.tileText, selected && styles.tileTextSelected, wrong && styles.tileTextWrong]}>{matched ? '✓' : text}</Text></Pressable>; }
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24, backgroundColor: colors.paper }, help: { color: colors.inkMuted, fontSize: 12 }, error: { color: colors.danger, fontWeight: '800' }, link: { color: colors.primary, fontWeight: '900' }, screen: { flex: 1, paddingTop: 58, paddingHorizontal: 18, backgroundColor: colors.paper }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, heading: { alignItems: 'center' }, counter: { color: colors.ink, fontWeight: '900' }, deck: { maxWidth: 180, color: colors.inkMuted, fontSize: 10, marginTop: 2 }, remaining: { minWidth: 29, color: colors.primary, fontSize: 19, fontWeight: '900', textAlign: 'right' }, progress: { height: 5, marginTop: 18, borderRadius: 5, backgroundColor: colors.line }, progressFill: { height: 5, borderRadius: 5, backgroundColor: colors.primary }, content: { flexGrow: 1, paddingTop: 22, paddingBottom: 30 }, instruction: { minHeight: 22, color: colors.ink, fontSize: 13, fontWeight: '800', textAlign: 'center' }, labels: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, marginBottom: 7 }, label: { width: '48%', color: colors.inkMuted, fontSize: 10, fontWeight: '900', letterSpacing: 1.1, textAlign: 'center' }, board: { flexDirection: 'row', gap: 9 }, column: { flex: 1, gap: 9 }, tile: { minHeight: 73, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 9, paddingVertical: 10, borderRadius: radius.md, borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.paperRaised }, tileSelected: { borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primarySoft }, tileWrong: { borderColor: colors.danger, backgroundColor: colors.dangerSoft }, tileMatched: { minHeight: 73, opacity: 0.2, backgroundColor: colors.primarySoft }, pressed: { opacity: 0.68 }, tileText: { color: colors.ink, fontSize: 14, lineHeight: 19, fontWeight: '800', textAlign: 'center' }, tileTextSelected: { color: colors.primary }, tileTextWrong: { color: colors.danger },
});
