import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { isDictationCorrect } from '../../src/features/practice/answer';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function DictationScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const expected = 'Es kommt darauf an.';
  const check = () => setResult(isDictationCorrect(answer, expected, 'de-DE'));
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={styles.top}><Pressable onPress={() => router.back()}><Ionicons name="close" size={27} color={colors.ink} /></Pressable><Text style={styles.counter}>Dikte · 1 / 8</Text><Ionicons name="ellipsis-horizontal" size={24} color={colors.ink} /></View>
    <View style={styles.progress}><View style={styles.progressFill} /></View>
    <View style={styles.main}>
      <Text style={styles.eyebrow}>DENGARKAN KALIMAT</Text>
      <Pressable onPress={() => Speech.speak(expected, { language: 'de-DE', rate: 0.78 })} style={styles.listen}><Ionicons name="volume-high" size={40} color={colors.white} /></Pressable>
      <Text style={styles.replay}>Ketuk untuk memutar ulang</Text>
      <TextInput value={answer} onChangeText={(v) => { setAnswer(v); setResult(null); }} multiline autoCapitalize="sentences" placeholder="Tulis yang kamu dengar…" placeholderTextColor={colors.muted} style={styles.input} />
      <Text style={styles.tolerance}>Kapital, spasi berlebih, dan tanda baca tidak dihitung.</Text>
      {result !== null && <View style={[styles.result, !result && styles.resultWrong]}><Ionicons name={result ? 'checkmark-circle' : 'close-circle'} size={22} color={result ? colors.moss : colors.coral} /><View><Text style={styles.resultTitle}>{result ? 'Tepat!' : 'Belum tepat'}</Text>{!result && <Text style={styles.expected}>Jawaban: {expected}</Text>}</View></View>}
    </View>
    <Pressable onPress={check} disabled={!answer.trim()} style={[styles.button, !answer.trim() && { opacity: 0.45 }]}><Text style={styles.buttonText}>Periksa jawaban</Text><Ionicons name="arrow-forward" size={20} color={colors.white} /></Pressable>
  </KeyboardAvoidingView>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingTop: 58, paddingHorizontal: 20, paddingBottom: 24 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, counter: { color: colors.ink, fontWeight: '900' }, progress: { height: 5, backgroundColor: colors.line, borderRadius: 5, marginTop: 22 }, progressFill: { width: '12.5%', height: 5, backgroundColor: colors.moss, borderRadius: 5 }, main: { flex: 1, alignItems: 'center', paddingTop: 58 }, eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  listen: { width: 106, height: 106, borderRadius: 53, backgroundColor: colors.moss, alignItems: 'center', justifyContent: 'center', marginTop: 28, shadowColor: colors.moss, shadowOpacity: 0.25, shadowRadius: 15, shadowOffset: { width: 0, height: 8 } }, replay: { color: colors.muted, fontSize: 12, marginTop: 14 }, input: { width: '100%', minHeight: 112, textAlignVertical: 'top', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 18, marginTop: 43, color: colors.ink, fontSize: 18, fontWeight: '600' }, tolerance: { alignSelf: 'flex-start', color: colors.muted, fontSize: 11, marginTop: 9 },
  result: { width: '100%', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.mossSoft, borderRadius: radius.md, padding: 14, marginTop: 16 }, resultWrong: { backgroundColor: '#F4DDD7' }, resultTitle: { color: colors.ink, fontWeight: '900' }, expected: { color: colors.muted, fontSize: 12, marginTop: 3 }, button: { height: 56, borderRadius: radius.md, backgroundColor: colors.moss, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }, buttonText: { color: colors.white, fontSize: 15, fontWeight: '900' },
});
