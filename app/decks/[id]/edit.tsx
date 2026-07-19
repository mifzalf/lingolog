import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDialog } from '../../../src/components/AppDialog';
import { useDatabase } from '../../../src/db/DatabaseProvider';
import { DeckForm } from '../../../src/features/decks/DeckForm';
import { DeckInput, deleteDeck, getDeck, hasEntries, setDeckArchived, updateDeck } from '../../../src/features/decks/deck.repository';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { backOrReplace } from '../../../src/navigation/back';

export default function EditDeckScreen() {
  const database = useDatabase();
  const { colors } = useTheme(); const { showDialog } = useAppDialog();
  const { id } = useLocalSearchParams<{ id: string }>();
  const deckId = Number(id);
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof getDeck>>>(undefined);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [languageLocked, setLanguageLocked] = useState(false);

  useEffect(() => {
    Promise.all([getDeck(database, deckId), hasEntries(database, deckId)])
      .then(([value, locked]) => { setDeck(value); setLanguageLocked(locked); })
      .catch(console.error).finally(() => setLoading(false));
  }, [database, deckId]);

  async function save(input: DeckInput) {
    try {
      setSaving(true);
      await updateDeck(database, deckId, input);
      backOrReplace(`/decks/${deckId}`);
    } catch (error) {
      console.error(error);
      showDialog({ title: 'Perubahan belum tersimpan', message: 'Coba simpan kembali. Data yang kamu isi tetap ada.', icon: 'cloud-offline-outline' });
    } finally {
      setSaving(false);
    }
  }

  function showActions() { showDialog({ title: deck?.name ?? 'Kelola deck', message: 'Pilih tindakan untuk deck ini.', icon: 'settings-outline', actions: [
    { label: deck?.isArchived ? 'Pulihkan dari arsip' : 'Arsipkan deck', tone: 'primary', onPress: async () => { await setDeckArchived(database, deckId, !deck?.isArchived); router.dismissTo('/'); } },
    { label: 'Hapus permanen', tone: 'danger', onPress: confirmDelete }, { label: 'Batal', tone: 'neutral' },
  ] }); }
  function confirmDelete() { showDialog({ title: 'Hapus deck?', message: 'Semua entri dan histori yang terhubung akan ikut dihapus. Tindakan ini tidak dapat dibatalkan.', icon: 'trash-outline', dismissible: false, actions: [
    { label: 'Hapus deck', tone: 'danger', onPress: async () => { await deleteDeck(database, deckId); router.dismissTo('/'); } }, { label: 'Pertahankan deck', tone: 'neutral' },
  ] }); }

  if (loading) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  if (!deck) return <View style={[styles.center, { backgroundColor: colors.paper }]}><Text style={{ color: colors.ink }}>Deck tidak ditemukan.</Text></View>;

  return <DeckForm title="Ubah deck" note="Catatan yang rapi lebih mudah dikunjungi lagi." initial={{ name: deck.name, description: deck.description ?? '', sourceLanguage: deck.sourceLanguage, targetLanguage: deck.targetLanguage, color: deck.color ?? undefined }} saving={saving} languageLocked={languageLocked} onCancel={() => backOrReplace(`/decks/${deckId}`)} onMore={showActions} onSave={save} />;
}

const styles = StyleSheet.create({ center: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
