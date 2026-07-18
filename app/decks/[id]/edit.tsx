import { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useDatabase } from '../../../src/db/DatabaseProvider';
import { DeckForm } from '../../../src/features/decks/DeckForm';
import { DeckInput, deleteDeck, getDeck, hasEntries, setDeckArchived, updateDeck } from '../../../src/features/decks/deck.repository';
import { useTheme } from '../../../src/theme/ThemeProvider';

export default function EditDeckScreen() {
  const database = useDatabase();
  const { colors } = useTheme();
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
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Perubahan belum tersimpan', 'Coba simpan kembali.');
    } finally {
      setSaving(false);
    }
  }

  function showActions() {
    Alert.alert(deck?.name ?? 'Kelola deck', undefined, [
      { text: deck?.isArchived ? 'Pulihkan dari arsip' : 'Arsipkan deck', onPress: async () => { await setDeckArchived(database, deckId, !deck?.isArchived); router.dismissTo('/'); } },
      { text: 'Hapus permanen', style: 'destructive', onPress: confirmDelete },
      { text: 'Batal', style: 'cancel' },
    ]);
  }

  function confirmDelete() {
    Alert.alert('Hapus deck?', 'Semua entri dan histori yang terhubung akan ikut dihapus. Tindakan ini tidak dapat dibatalkan.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus deck', style: 'destructive', onPress: async () => { await deleteDeck(database, deckId); router.dismissTo('/'); } },
    ]);
  }

  if (loading) return <View style={[styles.center, { backgroundColor: colors.paper }]}><ActivityIndicator color={colors.primary} /></View>;
  if (!deck) return <View style={[styles.center, { backgroundColor: colors.paper }]}><Text style={{ color: colors.ink }}>Deck tidak ditemukan.</Text></View>;

  return <DeckForm title="Ubah deck" note="Catatan yang rapi lebih mudah dikunjungi lagi." initial={{ name: deck.name, description: deck.description ?? '', sourceLanguage: deck.sourceLanguage, targetLanguage: deck.targetLanguage, color: deck.color ?? undefined }} saving={saving} languageLocked={languageLocked} onCancel={() => router.back()} onMore={showActions} onSave={save} />;
}

const styles = StyleSheet.create({ center: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
