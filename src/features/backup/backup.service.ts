import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { deserializeDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { DATABASE_APPLICATION_ID, DATABASE_VERSION } from '../../db/migrations';

const MAX_BACKUP_BYTES = 250 * 1024 * 1024;
const SQLITE_HEADER = 'SQLite format 3\0';

export type BackupPreview = {
  file: File;
  originalName: string;
  size: number;
  schemaVersion: number;
  decks: number;
  entries: number;
  sessions: number;
  answers: number;
  themePreference: string | null;
  speechPreferences: string | null;
  hapticsPreference: string | null;
  onboardingPreference: string | null;
};

export class BackupError extends Error {
  constructor(public code: 'EMPTY' | 'TOO_LARGE' | 'INVALID_SQLITE' | 'NOT_LINGOLOG' | 'UNSUPPORTED_VERSION' | 'CORRUPT' | 'SHARING_UNAVAILABLE') { super(code); }
}

function dateStamp(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`; }
export function backupFileName(date = new Date()) { return `Lingolog-backup-${dateStamp(date)}.lingolog-backup`; }

export async function shareFullBackup(database: SQLiteDatabase) {
  if (!(await Sharing.isAvailableAsync())) throw new BackupError('SHARING_UNAVAILABLE');
  const [theme, speech, haptics, onboarding] = await AsyncStorage.multiGet(['lingolog.theme-mode', 'lingolog.speech-preferences.v1', 'lingolog.haptics-enabled', 'lingolog.onboarding-completed.v1']);
  await database.withTransactionAsync(async () => { for (const [key, value] of [theme, speech, haptics, onboarding]) { if (value === null) await database.runAsync('DELETE FROM settings WHERE key = ?', `backup:${key}`); else await database.runAsync('INSERT OR REPLACE INTO settings(key,value,updated_at) VALUES(?,?,?)', `backup:${key}`, value, Date.now()); } });
  await database.execAsync('PRAGMA wal_checkpoint(FULL);');
  const bytes = await database.serializeAsync();
  const file = new File(Paths.cache, backupFileName()); if (file.exists) file.delete(); file.create(); file.write(bytes);
  await Sharing.shareAsync(file.uri, { mimeType: 'application/vnd.sqlite3', UTI: 'public.database', dialogTitle: 'Simpan backup Lingolog' });
}

async function inspectBackup(file: File, originalName: string, knownSize?: number): Promise<BackupPreview> {
  const info = file.info(); const size = knownSize ?? info.size ?? 0;
  if (!size) throw new BackupError('EMPTY'); if (size > MAX_BACKUP_BYTES) throw new BackupError('TOO_LARGE');
  const bytes = await file.bytes();
  if (bytes.length < 100 || String.fromCharCode(...bytes.slice(0, 16)) !== SQLITE_HEADER) throw new BackupError('INVALID_SQLITE');
  let candidate: SQLiteDatabase | undefined;
  try {
    candidate = await deserializeDatabaseAsync(bytes);
    const integrity = await candidate.getFirstAsync<{ integrity_check: string }>('PRAGMA integrity_check;'); if (integrity?.integrity_check !== 'ok') throw new BackupError('CORRUPT');
    const application = await candidate.getFirstAsync<{ application_id: number }>('PRAGMA application_id;'); if (application?.application_id !== DATABASE_APPLICATION_ID) throw new BackupError('NOT_LINGOLOG');
    const version = await candidate.getFirstAsync<{ user_version: number }>('PRAGMA user_version;'); const schemaVersion = version?.user_version ?? 0;
    if (schemaVersion < 1 || schemaVersion > DATABASE_VERSION) throw new BackupError('UNSUPPORTED_VERSION');
    const required = ['decks', 'entries', 'mastery_states', 'practice_sessions', 'practice_answers', 'activity_events', 'tags', 'entry_tags', 'settings'];
    const tables = await candidate.getAllAsync<{ name: string }>(`SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (${required.map(() => '?').join(',')})`, required);
    if (tables.length !== required.length) throw new BackupError('NOT_LINGOLOG');
    const count = async (table: string) => (await candidate!.getFirstAsync<{ count: number }>(`SELECT count(*) AS count FROM ${table}`))?.count ?? 0;
    const preferences = await candidate.getAllAsync<{ key: string; value: string }>("SELECT key,value FROM settings WHERE key IN ('backup:lingolog.theme-mode','backup:lingolog.speech-preferences.v1','backup:lingolog.haptics-enabled','backup:lingolog.onboarding-completed.v1')"); const preference = (key: string) => preferences.find((row) => row.key === `backup:${key}`)?.value ?? null;
    return { file, originalName, size, schemaVersion, decks: await count('decks'), entries: await count('entries'), sessions: await count('practice_sessions'), answers: await count('practice_answers'), themePreference: preference('lingolog.theme-mode'), speechPreferences: preference('lingolog.speech-preferences.v1'), hapticsPreference: preference('lingolog.haptics-enabled'), onboardingPreference: preference('lingolog.onboarding-completed.v1') };
  } catch (cause) { if (cause instanceof BackupError) throw cause; throw new BackupError('CORRUPT'); } finally { await candidate?.closeAsync(); }
}

export async function pickBackupForRestore() {
  const result = await DocumentPicker.getDocumentAsync({ type: ['application/vnd.sqlite3', 'application/x-sqlite3', 'application/octet-stream', '*/*'], copyToCacheDirectory: true, multiple: false });
  if (result.canceled) return undefined; const asset = result.assets[0]; if (asset.size && asset.size > MAX_BACKUP_BYTES) throw new BackupError('TOO_LARGE');
  return inspectBackup(new File(asset.uri), asset.name, asset.size);
}

export async function restoreFullBackup(database: SQLiteDatabase, preview: BackupPreview, reopen: () => void) {
  // Keep an automatic rollback copy until the replacement has been written successfully.
  const bytes = await preview.file.bytes(); const databaseUri = database.databasePath.startsWith('/') ? `file://${database.databasePath}` : database.databasePath; const destination = new File(databaseUri); const replacement = new File(destination.parentDirectory, 'lingolog-restore.db'); const rollback = new File(Paths.cache, 'lingolog-before-restore.db');
  const preferences: [string, string | null][] = [['lingolog.theme-mode', preview.themePreference], ['lingolog.speech-preferences.v1', preview.speechPreferences], ['lingolog.haptics-enabled', preview.hapticsPreference], ['lingolog.onboarding-completed.v1', preview.onboardingPreference]];
  if (replacement.exists) replacement.delete(); replacement.create(); replacement.write(bytes);
  if (rollback.exists) rollback.delete(); destination.copy(rollback); await database.closeAsync();
  try { destination.delete(); replacement.move(destination); for (const [key, value] of preferences) { if (value === null) await AsyncStorage.removeItem(key); else await AsyncStorage.setItem(key, value); } rollback.delete(); reopen(); } catch (cause) { if (destination.exists) destination.delete(); rollback.copy(destination); reopen(); throw cause; }
}

export function backupErrorMessage(cause: unknown) {
  if (!(cause instanceof BackupError)) return 'Backup tidak dapat diproses. Data saat ini tidak diubah.';
  return ({ EMPTY: 'File backup kosong.', TOO_LARGE: 'File backup lebih besar dari batas 250 MB.', INVALID_SQLITE: 'File bukan database SQLite yang dapat dibaca.', NOT_LINGOLOG: 'File bukan backup penuh Lingolog.', UNSUPPORTED_VERSION: 'Versi backup lebih baru atau tidak didukung aplikasi ini.', CORRUPT: 'Pemeriksaan integritas backup gagal. Data saat ini tidak diubah.', SHARING_UNAVAILABLE: 'Perangkat ini tidak menyediakan lembar berbagi untuk menyimpan backup.' } as const)[cause.code];
}
