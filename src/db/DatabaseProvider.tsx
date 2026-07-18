import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { migrateDatabase } from './migrations';
import { seedDevelopmentDatabase } from './seed';
import * as schema from './schema';

const DATABASE_NAME = 'lingolog.db';
type Database = ExpoSQLiteDatabase<typeof schema>;
const DatabaseContext = createContext<Database | null>(null);

async function initializeDatabase(database: SQLiteDatabase) {
  await migrateDatabase(database);
  await seedDevelopmentDatabase(database);
}

function DrizzleProvider({ children }: PropsWithChildren) {
  const sqlite = useSQLiteContext();
  const database = useMemo(() => drizzle(sqlite, { schema }), [sqlite]);
  return <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>;
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={initializeDatabase} useSuspense>
      <DrizzleProvider>{children}</DrizzleProvider>
    </SQLiteProvider>
  );
}

export function useDatabase() {
  const database = useContext(DatabaseContext);
  if (!database) throw new Error('useDatabase must be used inside DatabaseProvider');
  return database;
}
