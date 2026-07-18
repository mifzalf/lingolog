import type { SQLiteDatabase } from 'expo-sqlite';

/** Opt-in development data. It never runs unless explicitly enabled. */
export async function seedDevelopmentDatabase(database: SQLiteDatabase) {
  if (process.env.EXPO_PUBLIC_SEED_DATABASE !== 'true') return;

  const row = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) AS count FROM decks;');
  if ((row?.count ?? 0) > 0) return;

  const now = Date.now();
  await database.withTransactionAsync(async () => {
    const deck = await database.runAsync(
      `INSERT INTO decks (name, description, source_language, target_language, color, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      'Deutsch Alltag', 'Catatan bahasa Jerman sehari-hari', 'de-DE', 'id-ID', '#C58A2A', now, now,
    );

    const samples = [
      ['word', 'Feierabend', 'waktu setelah selesai bekerja'],
      ['sentence', 'Es kommt darauf an.', 'Itu tergantung.'],
    ] as const;

    for (const [type, source, translated] of samples) {
      const entry = await database.runAsync(
        `INSERT INTO entries (deck_id, type, source_text, translated_text, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?);`,
        deck.lastInsertRowId, type, source, translated, now, now,
      );
      await database.runAsync(
        'INSERT INTO mastery_states (entry_id, updated_at) VALUES (?, ?);',
        entry.lastInsertRowId, now,
      );
      await database.runAsync(
        `INSERT INTO activity_events (type, entry_id, deck_id, occurred_at)
         VALUES ('entry_created', ?, ?, ?);`,
        entry.lastInsertRowId, deck.lastInsertRowId, now,
      );
    }
  });
}
