import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDialog } from '../../../../src/components/AppDialog';
import { useDatabase } from '../../../../src/db/DatabaseProvider';
import { getDeck } from '../../../../src/features/decks/deck.repository';
import { getLanguage } from '../../../../src/features/decks/languages';
import { EntryForm } from '../../../../src/features/entries/EntryForm';
import { createEntry, EntryInput, findDuplicate } from '../../../../src/features/entries/entry.repository';
import { useTheme } from '../../../../src/theme/ThemeProvider';
import { backOrReplace } from '../../../../src/navigation/back';

export default function NewEntryScreen() {
  const database = useDatabase(); const { colors } = useTheme(); const { showDialog } = useAppDialog();
  const { id } = useLocalSearchParams<{ id: string }>(); const deckId = Number(id);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>();
  const [saving, setSaving] = useState(false);
  useEffect(() => { getDeck(database, deckId).then(setDeck).catch(console.error); }, [database, deckId]);

  async function persist(input: EntryInput) {
    try { setSaving(true); await createEntry(database, input); backOrReplace(`/decks/${deckId}`); }
    catch (error) { console.error(error); showDialog({ title: 'Entri belum tersimpan', message: 'Coba simpan kembali. Data yang kamu isi tetap ada.', icon: 'cloud-offline-outline' }); setSaving(false); }
  }
  async function save(input: EntryInput) {
    if (await findDuplicate(database, input)) {
      setSaving(false);
      showDialog({ title: 'Entri serupa sudah ada', message: 'Teks dan terjemahan yang sama sudah tersimpan di deck ini.', icon: 'copy-outline', actions: [{ label: 'Simpan duplikat', tone: 'primary', onPress: () => persist(input) }, { label: 'Periksa lagi', tone: 'neutral' }] });
      return;
    }
    await persist(input);
  }

  if (!deck) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  return <EntryForm title="Entri baru" deckId={deckId} sourceName={getLanguage(deck.sourceLanguage).name} targetName={getLanguage(deck.targetLanguage).name} saving={saving} onCancel={() => backOrReplace(`/decks/${deckId}`)} onSave={save} />;
}
const styles = StyleSheet.create({ center: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
