import type { SQLiteDatabase } from 'expo-sqlite';

const DATABASE_VERSION = 1;

const migrationV1 = `
CREATE TABLE IF NOT EXISTS decks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  color TEXT,
  is_archived INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('word', 'phrase', 'sentence')),
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  notes TEXT,
  example_text TEXT,
  example_translation TEXT,
  is_favorite INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS entries_deck_idx ON entries(deck_id);
CREATE INDEX IF NOT EXISTS entries_created_idx ON entries(created_at);

CREATE TABLE IF NOT EXISTS mastery_states (
  entry_id INTEGER PRIMARY KEY REFERENCES entries(id) ON DELETE CASCADE,
  grade INTEGER NOT NULL DEFAULT 0 CHECK(grade BETWEEN 0 AND 3),
  manually_mastered INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0,
  correct_streak INTEGER NOT NULL DEFAULT 0,
  mastery_score REAL NOT NULL DEFAULT 0,
  last_practiced_at INTEGER,
  mastered_at INTEGER,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS practice_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id INTEGER REFERENCES decks(id) ON DELETE SET NULL,
  mode TEXT NOT NULL CHECK(mode IN ('flashcard', 'dictation')),
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  total_items INTEGER NOT NULL DEFAULT 0,
  correct_items INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS sessions_started_idx ON practice_sessions(started_at);

CREATE TABLE IF NOT EXISTS practice_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK(mode IN ('flashcard', 'dictation')),
  rating TEXT CHECK(rating IS NULL OR rating IN ('again', 'hard', 'good', 'easy')),
  user_answer TEXT,
  is_correct INTEGER NOT NULL,
  response_time_ms INTEGER NOT NULL DEFAULT 0,
  answered_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS answers_entry_idx ON practice_answers(entry_id);
CREATE INDEX IF NOT EXISTS answers_date_idx ON practice_answers(answered_at);

CREATE TABLE IF NOT EXISTS activity_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK(type IN ('entry_created', 'entry_mastered', 'entry_unmastered', 'deck_imported')),
  entry_id INTEGER REFERENCES entries(id) ON DELETE SET NULL,
  deck_id INTEGER REFERENCES decks(id) ON DELETE SET NULL,
  occurred_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS activity_date_idx ON activity_events(occurred_at);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS tags_name_unique ON tags(name);

CREATE TABLE IF NOT EXISTS entry_tags (
  entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS entry_tags_unique ON entry_tags(entry_id, tag_id);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
`;

export async function migrateDatabase(database: SQLiteDatabase) {
  await database.execAsync('PRAGMA foreign_keys = ON;');
  const row = await database.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion > DATABASE_VERSION) {
    throw new Error(`Database Lingolog versi ${currentVersion} lebih baru dari aplikasi ini.`);
  }
  if (currentVersion === DATABASE_VERSION) return;

  await database.withTransactionAsync(async () => {
    if (currentVersion < 1) await database.execAsync(migrationV1);
    await database.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
  });
}
