import { useState } from 'react';
import { router } from 'expo-router';
import { useAppDialog } from '../../src/components/AppDialog';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { createDeck, DeckInput } from '../../src/features/decks/deck.repository';
import { DeckForm } from '../../src/features/decks/DeckForm';

export default function NewDeckScreen() {
  const database = useDatabase(); const { showDialog } = useAppDialog();
  const [saving, setSaving] = useState(false);

  async function save(input: DeckInput) {
    try {
      setSaving(true);
      await createDeck(database, input);
      router.back();
    } catch (error) {
      console.error(error);
      showDialog({ title: 'Deck belum tersimpan', message: 'Coba simpan kembali. Data yang kamu isi masih ada di layar ini.', icon: 'cloud-offline-outline' });
    } finally {
      setSaving(false);
    }
  }

  return <DeckForm title="Deck baru" note="Satu halaman untuk satu pasangan bahasa." saving={saving} onCancel={() => router.back()} onSave={save} />;
}
