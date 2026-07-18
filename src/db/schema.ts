import { index, integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const decks = sqliteTable('decks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  sourceLanguage: text('source_language').notNull(),
  targetLanguage: text('target_language').notNull(),
  color: text('color'),
  isArchived: integer('is_archived', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const entries = sqliteTable('entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deckId: integer('deck_id').notNull().references(() => decks.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['word', 'phrase', 'sentence'] }).notNull(),
  sourceText: text('source_text').notNull(),
  translatedText: text('translated_text').notNull(),
  notes: text('notes'),
  exampleText: text('example_text'),
  exampleTranslation: text('example_translation'),
  isFavorite: integer('is_favorite', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => [index('entries_deck_idx').on(table.deckId), index('entries_created_idx').on(table.createdAt)]);

// Mastery is independent from games: users may set it manually; evidence can raise/lower it.
export const masteryStates = sqliteTable('mastery_states', {
  entryId: integer('entry_id').primaryKey().references(() => entries.id, { onDelete: 'cascade' }),
  grade: integer('grade').notNull().default(0), // 0 new, 1 learning, 2 familiar, 3 mastered
  manuallyMastered: integer('manually_mastered', { mode: 'boolean' }).notNull().default(false),
  correctCount: integer('correct_count').notNull().default(0),
  incorrectCount: integer('incorrect_count').notNull().default(0),
  correctStreak: integer('correct_streak').notNull().default(0),
  masteryScore: real('mastery_score').notNull().default(0),
  lastPracticedAt: integer('last_practiced_at', { mode: 'timestamp' }),
  masteredAt: integer('mastered_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const practiceSessions = sqliteTable('practice_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deckId: integer('deck_id').references(() => decks.id, { onDelete: 'set null' }),
  mode: text('mode', { enum: ['flashcard', 'dictation'] }).notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  totalItems: integer('total_items').notNull().default(0),
  correctItems: integer('correct_items').notNull().default(0),
  durationMs: integer('duration_ms').notNull().default(0),
  configJson: text('config_json'),
}, (table) => [index('sessions_started_idx').on(table.startedAt)]);

export const practiceSessionDecks = sqliteTable('practice_session_decks', {
  sessionId: integer('session_id').notNull().references(() => practiceSessions.id, { onDelete: 'cascade' }),
  deckId: integer('deck_id').notNull().references(() => decks.id, { onDelete: 'cascade' }),
}, (table) => [uniqueIndex('session_decks_unique').on(table.sessionId, table.deckId), index('session_decks_deck_idx').on(table.deckId)]);

export const practiceSessionEntries = sqliteTable('practice_session_entries', {
  sessionId: integer('session_id').notNull().references(() => practiceSessions.id, { onDelete: 'cascade' }),
  entryId: integer('entry_id').notNull().references(() => entries.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
}, (table) => [uniqueIndex('session_entries_unique').on(table.sessionId, table.entryId), uniqueIndex('session_entries_position_unique').on(table.sessionId, table.position)]);

export const practiceAnswers = sqliteTable('practice_answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id').notNull().references(() => practiceSessions.id, { onDelete: 'cascade' }),
  entryId: integer('entry_id').notNull().references(() => entries.id, { onDelete: 'cascade' }),
  mode: text('mode', { enum: ['flashcard', 'dictation'] }).notNull(),
  rating: text('rating', { enum: ['again', 'hard', 'good', 'easy'] }),
  userAnswer: text('user_answer'),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  responseTimeMs: integer('response_time_ms').notNull().default(0),
  answeredAt: integer('answered_at', { mode: 'timestamp' }).notNull(),
}, (table) => [index('answers_entry_idx').on(table.entryId), index('answers_date_idx').on(table.answeredAt)]);

export const activityEvents = sqliteTable('activity_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: ['entry_created', 'entry_mastered', 'entry_unmastered', 'deck_imported'] }).notNull(),
  entryId: integer('entry_id').references(() => entries.id, { onDelete: 'set null' }),
  deckId: integer('deck_id').references(() => decks.id, { onDelete: 'set null' }),
  occurredAt: integer('occurred_at', { mode: 'timestamp' }).notNull(),
}, (table) => [index('activity_date_idx').on(table.occurredAt)]);

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
}, (table) => [uniqueIndex('tags_name_unique').on(table.name)]);

export const entryTags = sqliteTable('entry_tags', {
  entryId: integer('entry_id').notNull().references(() => entries.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => [uniqueIndex('entry_tags_unique').on(table.entryId, table.tagId)]);

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
