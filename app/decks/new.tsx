import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDialog } from '../../src/components/AppDialog';
import { useDatabase } from '../../src/db/DatabaseProvider';
import { createDeck, DeckInput } from '../../src/features/decks/deck.repository';
import { DeckForm } from '../../src/features/decks/DeckForm';
import { backOrReplace } from '../../src/navigation/back';

export default function NewDeckScreen() {
  const database = useDatabase(); const { showDialog } = useAppDialog();
  const params = useLocalSearchParams<{ sourceLanguage?: string; targetLanguage?: string }>();
  const initial = params.sourceLanguage && params.targetLanguage ? { name: '', description: '', sourceLanguage: params.sourceLanguage, targetLanguage: params.targetLanguage, color: '#355A46' } : undefined;
  const [saving, setSaving] = useState(false);

  async function save(input: DeckInput) {
    try {
      setSaving(true);
      await createDeck(database, input);
      backOrReplace('/');
    } catch (error) {
      console.error(error);
      showDialog({ title: 'Deck belum tersimpan', message: 'Coba simpan kembali. Data yang kamu isi masih ada di layar ini.', icon: 'cloud-offline-outline' });
    } finally {
      setSaving(false);
    }
  }

  return <DeckForm title="Deck baru" note="Satu halaman untuk satu pasangan bahasa." initial={initial} saving={saving} onCancel={() => backOrReplace('/')} onSave={save} />;
}
