import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useSpeech } from '../../src/features/speech/SpeechProvider';
import { completePracticeSession } from '../../src/features/practice/session.repository';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { usePracticeSession } from '../../src/features/practice/usePracticeSession';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function FlashcardScreen() {
  const { colors } = useTheme(); const styles = createStyles(colors); const database = useDatabase(); const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { data, loading, error } = usePracticeSession(Number(sessionId)); const { speak, stop, speakingKey } = useSpeech();
  const [revealed, setRevealed] = useState(false); const [index, setIndex] = useState(0);
  if (loading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
  const item = data?.items[index]; if (error || !data || !item) return <View style={styles.center}><Text style={styles.error}>{error || 'Materi sesi tidak tersedia.'}</Text><Pressable onPress={() => router.dismissTo('/practice')}><Text style={styles.back}>Kembali ke latihan</Text></Pressable></View>;
  const direction = data.config?.flashcardDirection === 'mixed' ? (index % 2 ? 'target_to_source' : 'source_to_target') : data.config?.flashcardDirection ?? 'source_to_target';
  const prompt = direction === 'target_to_source' ? item.translatedText : item.sourceText; const answer = direction === 'target_to_source' ? item.sourceText : item.translatedText;
  const language = revealed ? (direction === 'target_to_source' ? item.sourceLanguage : item.targetLanguage) : (direction === 'target_to_source' ? item.targetLanguage : item.sourceLanguage);
  function rate() { if (!data) return; void stop(); setRevealed(false); void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); if (index < data.items.length - 1) setIndex(index + 1); else { void completePracticeSession(database, data.session.id, data.session.startedAt); router.dismissTo('/practice'); } }
  return <View style={styles.screen}>
    <View style={styles.top}><Pressable onPress={() => router.dismissTo('/practice')}><Ionicons name="close" size={27} color={colors.ink} /></Pressable><Text style={styles.counter}>{index + 1} / {data.items.length}</Text><Text style={styles.deck} numberOfLines={1}>{item.deckName}</Text></View>
    <View style={styles.progress}><View style={[styles.progressFill, { width: `${((index + 1) / data.items.length) * 100}%` }]} /></View>
    <Text style={styles.hint}>{revealed ? 'SEBERAPA KUAT INGATANMU?' : 'KETUK KARTU UNTUK MEMBALIK'}</Text>
    <Pressable onPress={() => { setRevealed(!revealed); void Haptics.selectionAsync(); }} style={[styles.card, revealed && styles.cardBack]}><Text style={styles.lang}>{revealed ? 'JAWABAN' : 'PERTANYAAN'}</Text><Text style={styles.word}>{revealed ? answer : prompt}</Text>{!revealed && item.exampleText && direction === 'source_to_target' ? <Text style={styles.sentence}>{item.exampleText}</Text> : null}<Pressable accessibilityLabel={speakingKey === 'flashcard' ? 'Hentikan audio' : 'Dengarkan kartu'} onPress={(event) => { event.stopPropagation(); speakingKey === 'flashcard' ? void stop() : void speak(revealed ? answer : prompt, language, 'flashcard'); }} style={styles.speaker}><Ionicons name={speakingKey === 'flashcard' ? 'stop' : 'volume-medium'} size={24} color={colors.moss} /></Pressable></Pressable>
    {revealed ? <View style={styles.ratings}>{[['Lupa',colors.coral],['Sulit',colors.amber],['Ingat',colors.moss],['Kuat','#274235']].map(([label,color]) => <Pressable key={label} style={styles.rating} onPress={rate}><View style={[styles.ratingBar,{backgroundColor: color}]} /><Text style={styles.ratingText}>{label}</Text></Pressable>)}</View> : <Text style={styles.foot}>Coba ucapkan artinya sebelum membalik kartu.</Text>}
  </View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  center: { flex: 1, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 }, error: { color: colors.danger, fontWeight: '800' }, back: { color: colors.primary, fontWeight: '900' }, screen: { flex: 1, backgroundColor: colors.paper, paddingTop: 58, paddingHorizontal: 20 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, counter: { color: colors.ink, fontWeight: '900' }, deck: { maxWidth: 110, color: colors.inkMuted, fontSize: 11, fontWeight: '700' }, progress: { height: 5, backgroundColor: colors.line, borderRadius: 5, marginTop: 22 }, progressFill: { height: 5, backgroundColor: colors.moss, borderRadius: 5 }, hint: { textAlign: 'center', color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginTop: 43, marginBottom: 15 },
  card: { minHeight: 390, backgroundColor: colors.surface, borderRadius: 28, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', padding: 28, shadowColor: colors.shadow, shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 9 } }, cardBack: { backgroundColor: colors.mossSoft }, lang: { color: colors.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.5 }, word: { color: colors.ink, fontSize: 31, lineHeight: 39, fontWeight: '900', textAlign: 'center', marginTop: 20 }, sentence: { color: colors.muted, fontSize: 15, marginTop: 14, fontStyle: 'italic' }, speaker: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: 35 }, foot: { textAlign: 'center', color: colors.muted, fontSize: 13, marginTop: 28 },
  ratings: { flexDirection: 'row', gap: 8, marginTop: 22 }, rating: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, overflow: 'hidden', alignItems: 'center' }, ratingBar: { height: 5, alignSelf: 'stretch' }, ratingText: { color: colors.ink, fontSize: 12, fontWeight: '800', paddingVertical: 14 },
});
