import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, Pill, ScreenHeader, SectionTitle } from '../../src/components/ui';
import { radius, ThemeColors } from '../../src/theme/tokens';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function RepositoryScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader eyebrow="Katalog lokal" title="Semua koleksi, tetap milikmu." action={<IconButton name="add" />} />
      <View style={styles.offline}>
        <Ionicons name="phone-portrait-outline" size={24} color={colors.moss} />
        <View style={{ flex: 1 }}><Text style={styles.offlineTitle}>Tersimpan di perangkat</Text><Text style={styles.meta}>Tidak ada akun, cloud, atau katalog daring.</Text></View>
        <Pill>Offline</Pill>
      </View>
      <SectionTitle aside="2 koleksi">Katalog</SectionTitle>
      {[
        ['Deutsch Alltag', 'Bahasa Jerman', 'Bahasa Indonesia', '48'],
        ['English Notes', 'Bahasa Inggris', 'Bahasa Indonesia', '31'],
      ].map(([name, from, to, count]) => (
        <View style={styles.catalog} key={name}>
          <View style={styles.book}><Ionicons name="book-outline" size={25} color={colors.ink} /></View>
          <View style={{ flex: 1 }}><Text style={styles.name}>{name}</Text><Text style={styles.meta}>{from} → {to}</Text><Text style={styles.count}>{count} kata & kalimat</Text></View>
          <Ionicons name="ellipsis-horizontal" size={21} color={colors.muted} />
        </View>
      ))}
      <View style={styles.actionRow}>
        <View style={styles.action}><Ionicons name="download-outline" size={22} color={colors.moss} /><Text style={styles.actionText}>Impor deck</Text></View>
        <View style={styles.action}><Ionicons name="share-outline" size={22} color={colors.moss} /><Text style={styles.actionText}>Bagikan deck</Text></View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper }, content: { paddingTop: 62, paddingHorizontal: 20, paddingBottom: 32 },
  offline: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 17, borderRadius: radius.md, backgroundColor: colors.mossSoft, marginBottom: 28 }, offlineTitle: { color: colors.moss, fontWeight: '900', fontSize: 15 },
  meta: { color: colors.muted, fontSize: 12, marginTop: 3 }, catalog: { flexDirection: 'row', gap: 14, alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  book: { width: 52, height: 62, borderRadius: 8, backgroundColor: colors.amberSoft, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: colors.amber }, name: { fontSize: 17, color: colors.ink, fontWeight: '900' }, count: { color: colors.moss, fontSize: 12, fontWeight: '800', marginTop: 7 },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 26 }, action: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 15, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }, actionText: { color: colors.moss, fontWeight: '800' },
});
