import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function FlashcardScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [revealed, setRevealed] = useState(false);
  return <View style={styles.screen}>
    <View style={styles.top}><Pressable onPress={() => router.back()}><Ionicons name="close" size={27} color={colors.ink} /></Pressable><Text style={styles.counter}>1 / 12</Text><Ionicons name="ellipsis-horizontal" size={24} color={colors.ink} /></View>
    <View style={styles.progress}><View style={styles.progressFill} /></View>
    <Text style={styles.hint}>{revealed ? 'SEBERAPA KUAT INGATANMU?' : 'KETUK KARTU UNTUK MEMBALIK'}</Text>
    <Pressable onPress={() => { setRevealed(!revealed); Haptics.selectionAsync(); }} style={[styles.card, revealed && styles.cardBack]}>
      <Text style={styles.lang}>{revealed ? 'BAHASA INDONESIA' : 'DEUTSCH'}</Text>
      <Text style={styles.word}>{revealed ? 'waktu setelah selesai bekerja' : 'Feierabend'}</Text>
      {!revealed && <Text style={styles.sentence}>Endlich Feierabend!</Text>}
      <View style={styles.speaker}><Ionicons name="volume-medium" size={24} color={colors.moss} /></View>
    </Pressable>
    {revealed ? <View style={styles.ratings}>{[['again','Lupa',colors.coral],['hard','Sulit',colors.amber],['good','Ingat',colors.moss],['easy','Kuat','#274235']].map(([key,label,color]) => <Pressable key={key} style={styles.rating} onPress={() => { setRevealed(false); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}><View style={[styles.ratingBar,{backgroundColor: color}]} /><Text style={styles.ratingText}>{label}</Text></Pressable>)}</View> : <Text style={styles.foot}>Coba ucapkan artinya sebelum membalik kartu.</Text>}
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingTop: 58, paddingHorizontal: 20 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, counter: { color: colors.ink, fontWeight: '900' }, progress: { height: 5, backgroundColor: colors.line, borderRadius: 5, marginTop: 22 }, progressFill: { width: '8%', height: 5, backgroundColor: colors.moss, borderRadius: 5 }, hint: { textAlign: 'center', color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginTop: 43, marginBottom: 15 },
  card: { minHeight: 390, backgroundColor: colors.surface, borderRadius: 28, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', padding: 28, shadowColor: '#302C22', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 9 } }, cardBack: { backgroundColor: colors.mossSoft }, lang: { color: colors.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.5 }, word: { color: colors.ink, fontSize: 31, lineHeight: 39, fontWeight: '900', textAlign: 'center', marginTop: 20 }, sentence: { color: colors.muted, fontSize: 15, marginTop: 14, fontStyle: 'italic' }, speaker: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: 35 }, foot: { textAlign: 'center', color: colors.muted, fontSize: 13, marginTop: 28 },
  ratings: { flexDirection: 'row', gap: 8, marginTop: 22 }, rating: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, overflow: 'hidden', alignItems: 'center' }, ratingBar: { height: 5, alignSelf: 'stretch' }, ratingText: { color: colors.ink, fontSize: 12, fontWeight: '800', paddingVertical: 14 },
});
