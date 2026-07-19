import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { migrateDatabase } from './migrations';
import { seedDevelopmentDatabase } from './seed';
import * as schema from './schema';

export const DATABASE_NAME = 'lingolog.db';
type Database = ExpoSQLiteDatabase<typeof schema>;
const DatabaseContext = createContext<Database | null>(null);
const SQLiteContext = createContext<SQLiteDatabase | null>(null);
const DatabaseLifecycleContext = createContext<(() => void) | null>(null);

async function initializeDatabase(database: SQLiteDatabase) {
  await migrateDatabase(database);
  await seedDevelopmentDatabase(database);
}

function DrizzleProvider({ children }: PropsWithChildren) {
  const sqlite = useSQLiteContext();
  const database = useMemo(() => drizzle(sqlite, { schema }), [sqlite]);
  return <SQLiteContext.Provider value={sqlite}><DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider></SQLiteContext.Provider>;
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [generation, setGeneration] = useState(0); const reopen = useCallback(() => setGeneration((value) => value + 1), []);
  return <DatabaseLifecycleContext.Provider value={reopen}><SQLiteProvider key={generation} databaseName={DATABASE_NAME} onInit={initializeDatabase} useSuspense><DrizzleProvider>{children}</DrizzleProvider></SQLiteProvider></DatabaseLifecycleContext.Provider>;
}

export function useDatabase() {
  const database = useContext(DatabaseContext);
  if (!database) throw new Error('useDatabase must be used inside DatabaseProvider');
  return database;
}

export function useSQLiteDatabase() {
  const database = useContext(SQLiteContext);
  if (!database) throw new Error('useSQLiteDatabase must be used inside DatabaseProvider');
  return database;
}

export function useReopenDatabase() {
  const reopen = useContext(DatabaseLifecycleContext);
  if (!reopen) throw new Error('useReopenDatabase must be used inside DatabaseProvider');
  return reopen;
}
