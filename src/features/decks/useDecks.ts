import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useDatabase } from '../../db/DatabaseProvider';
import { DeckSummary, listDecks } from './deck.repository';

export function useDecks(archived = false) {
  const database = useDatabase();
  const [decks, setDecks] = useState<DeckSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setError(null);
      setDecks(await listDecks(database, archived));
    } catch (cause) {
      console.error(cause);
      setError('Deck belum dapat dibuka. Coba muat ulang.');
    } finally {
      setLoading(false);
    }
  }, [archived, database]);

  useEffect(() => { void reload(); }, [reload]);
  useFocusEffect(useCallback(() => { void reload(); }, [reload]));

  return { decks, loading, error, reload };
}
