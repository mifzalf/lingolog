import { useEffect, useState } from 'react';
import { useDatabase } from '../../db/DatabaseProvider';
import { getPracticeSession } from './session.repository';

export function usePracticeSession(id: number) {
  const database = useDatabase();
  const [data, setData] = useState<Awaited<ReturnType<typeof getPracticeSession>>>();
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { if (!Number.isFinite(id)) { setError('Sesi tidak valid.'); setLoading(false); return; } getPracticeSession(database, id).then((value) => { if (!value) setError('Sesi tidak ditemukan.'); else setData(value); }).catch((cause) => { console.error(cause); setError('Sesi belum dapat dibuka.'); }).finally(() => setLoading(false)); }, [database, id]);
  return { data, loading, error };
}
