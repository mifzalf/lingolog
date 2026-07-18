import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pill, ScreenHeader, SectionTitle } from '../../src/components/ui';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function PracticeScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader eyebrow="Latihan bebas" title="Dua cara untuk benar-benar mengingat." />
      <View style={styles.summary}>
        <View><Text style={styles.summaryValue}>12</Text><Text style={styles.summaryLabel}>dilatih hari ini</Text></View>
        <View style={styles.divider} />
        <View><Text style={styles.summaryValue}>84%</Text><Text style={styles.summaryLabel}>akurasi pekan ini</Text></View>
      </View>

      <SectionTitle>Pilih permainan</SectionTitle>
      <Pressable onPress={() => router.push({ pathname: '/practice/setup', params: { mode: 'flashcard' } })} style={({ pressed }) => [styles.game, pressed && styles.pressed]}>
        <View style={[styles.gameIcon, { backgroundColor: colors.amberSoft }]}><Ionicons name="copy-outline" size={29} color={colors.ink} /></View>
        <View style={{ flex: 1 }}><Pill tone="amber">Mengingat</Pill><Text style={styles.gameTitle}>Kartu flash</Text><Text style={styles.description}>Balik kartu, lalu nilai sendiri seberapa kuat ingatanmu.</Text></View>
        <Ionicons name="arrow-forward" size={22} color={colors.ink} />
      </Pressable>

      <Pressable onPress={() => router.push({ pathname: '/practice/setup', params: { mode: 'dictation' } })} style={({ pressed }) => [styles.game, pressed && styles.pressed]}>
        <View style={[styles.gameIcon, { backgroundColor: colors.mossSoft }]}><Ionicons name="ear-outline" size={30} color={colors.moss} /></View>
        <View style={{ flex: 1 }}><Pill>Mendengar</Pill><Text style={styles.gameTitle}>Dikte</Text><Text style={styles.description}>Dengar lalu tulis, atau lihat arti lalu tulis teks yang dipelajari.</Text></View>
        <Ionicons name="arrow-forward" size={22} color={colors.ink} />
      </Pressable>

      <View style={styles.note}>
        <Ionicons name="analytics-outline" size={22} color={colors.moss} />
        <Text style={styles.noteText}>Permainan mencatat bukti kemampuan. Kamu tetap memegang kendali untuk menandai sebuah entri sebagai dikuasai.</Text>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper }, content: { paddingTop: 62, paddingHorizontal: 20, paddingBottom: 32 },
  summary: { flexDirection: 'row', padding: 20, marginBottom: 28, borderRadius: radius.lg, backgroundColor: colors.moss, justifyContent: 'space-around' },
  summaryValue: { color: colors.white, fontSize: 25, fontWeight: '900' }, summaryLabel: { color: '#DCE8DF', fontSize: 12, marginTop: 3 }, divider: { width: 1, backgroundColor: '#668170' },
  game: { flexDirection: 'row', alignItems: 'center', gap: 15, padding: 18, marginBottom: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.lg },
  pressed: { transform: [{ scale: 0.985 }], opacity: 0.8 }, gameIcon: { width: 58, height: 72, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  gameTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginTop: 10 }, description: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 4 },
  note: { flexDirection: 'row', gap: 12, marginTop: 12, padding: 17, borderRadius: radius.md, backgroundColor: colors.mossSoft }, noteText: { flex: 1, color: colors.moss, fontSize: 13, lineHeight: 19, fontWeight: '600' },
});
