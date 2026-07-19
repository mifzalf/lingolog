import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDialog } from '../../../../../src/components/AppDialog';
import { useDatabase } from '../../../../../src/db/DatabaseProvider';
import { getDeck } from '../../../../../src/features/decks/deck.repository';
import { getLanguage } from '../../../../../src/features/decks/languages';
import { EntryForm } from '../../../../../src/features/entries/EntryForm';
import { deleteEntry, EntryInput, findDuplicate, getEntry, updateEntry } from '../../../../../src/features/entries/entry.repository';
import { useTheme } from '../../../../../src/theme/ThemeProvider';

export default function EditEntryScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const { showDialog } = useAppDialog();
  const params = useLocalSearchParams<{ id: string; entryId: string }>(); const deckId = Number(params.id); const entryId = Number(params.entryId);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>();
  const [entry, setEntry] = useState<Awaited<ReturnType<typeof getEntry>>>();
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  useEffect(() => { Promise.all([getDeck(database, deckId), getEntry(database, entryId)]).then(([d, e]) => { setDeck(d); setEntry(e); }).catch(console.error).finally(() => setLoading(false)); }, [database, deckId, entryId]);

  async function persist(input: EntryInput) { try { setSaving(true); await updateEntry(database, entryId, input); router.back(); } catch (error) { console.error(error); showDialog({ title: 'Perubahan belum tersimpan', message: 'Coba simpan kembali. Data yang kamu isi tetap ada.', icon: 'cloud-offline-outline' }); setSaving(false); } }
  async function save(input: EntryInput) { if (await findDuplicate(database, input, entryId)) return showDialog({ title: 'Entri serupa sudah ada', message: 'Teks dan terjemahan yang sama sudah tersimpan.', icon: 'copy-outline', actions: [{ label: 'Tetap simpan', tone: 'primary', onPress: () => persist(input) }, { label: 'Periksa lagi', tone: 'neutral' }] }); await persist(input); }
  function remove() { showDialog({ title: 'Hapus entri?', message: `“${entry?.sourceText}” akan dihapus beserta statistiknya.`, icon: 'trash-outline', dismissible: false, actions: [{ label: 'Hapus entri', tone: 'danger', onPress: async () => { await deleteEntry(database, entryId); router.back(); } }, { label: 'Pertahankan entri', tone: 'neutral' }] }); }

  if (loading) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  if (!deck || !entry) return <View style={[styles.center, { backgroundColor: colors.paper }]}><Text style={{ color: colors.ink }}>Entri tidak ditemukan.</Text></View>;
  return <EntryForm title="Ubah entri" deckId={deckId} sourceName={getLanguage(deck.sourceLanguage).name} targetName={getLanguage(deck.targetLanguage).name} initial={{ type: entry.type, sourceText: entry.sourceText, translatedText: entry.translatedText, notes: entry.notes ?? '', exampleText: entry.exampleText ?? '', exampleTranslation: entry.exampleTranslation ?? '', isFavorite: entry.isFavorite, tags: entry.tags }} saving={saving} onCancel={() => router.back()} onMore={remove} onSave={save} />;
}
const styles = StyleSheet.create({ center: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
