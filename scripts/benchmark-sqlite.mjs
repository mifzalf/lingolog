import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';

const source = readFileSync(new URL('../src/db/migrations.ts', import.meta.url), 'utf8');
const v1 = source.match(/const migrationV1 = `([\s\S]*?)`;/)?.[1]; assert.ok(v1);
const dir = mkdtempSync(join(tmpdir(), 'lingolog-benchmark-')); const db = join(dir, 'benchmark.db'); const fixture = join(dir, 'fixture.sql');
const decks = 100; const entriesPerDeck = 200; const total = decks * entriesPerDeck;
let setup = `${v1}\nPRAGMA journal_mode=WAL; BEGIN;\n`;
for (let deck = 1; deck <= decks; deck += 1) {
  setup += `INSERT INTO decks(id,name,description,source_language,target_language,color,created_at,updated_at) VALUES(${deck},'Deck ${deck}','Materi benchmark','de-DE','id-ID','#355A46',${deck},${deck});\n`;
  for (let item = 1; item <= entriesPerDeck; item += 1) { const id = (deck - 1) * entriesPerDeck + item; setup += `INSERT INTO entries(id,deck_id,type,source_text,translated_text,is_favorite,created_at,updated_at) VALUES(${id},${deck},'word','wort ${id}','kata ${id}',${id % 11 === 0},${id},${id});\nINSERT INTO mastery_states(entry_id,grade,correct_count,incorrect_count,correct_streak,mastery_score,updated_at) VALUES(${id},${id % 4},${id % 9},${id % 3},${id % 6},75,${id});\n`; }
}
setup += 'COMMIT;'; writeFileSync(fixture, setup); execFileSync('sh', ['-c', `sqlite3 "$1" < "$2"`, 'sh', db, fixture], { stdio: 'ignore' });
const query = `SELECT d.id,d.name,count(e.id),coalesce(sum(case when m.grade=3 then 1 else 0 end),0) FROM decks d LEFT JOIN entries e ON e.deck_id=d.id LEFT JOIN mastery_states m ON m.entry_id=e.id GROUP BY d.id ORDER BY d.name; SELECT e.id,e.source_text,e.translated_text FROM entries e LEFT JOIN mastery_states m ON m.entry_id=e.id WHERE e.deck_id IN (1,2,3,4,5) AND lower(e.source_text) LIKE '%wort%' AND coalesce(m.grade,0) IN (0,1,2,3) ORDER BY e.source_text LIMIT 50;`;
const samples = [];
for (let index = 0; index < 9; index += 1) { const start = performance.now(); execFileSync('sqlite3', [db, query], { stdio: 'ignore' }); samples.push(performance.now() - start); }
samples.sort((a, b) => a - b); const median = samples[Math.floor(samples.length / 2)];
console.log(`SQLite benchmark: ${total.toLocaleString('id-ID')} entri, median ${median.toFixed(1)} ms (9 proses cold-ish).`);
if (median > 500) throw new Error(`Benchmark melewati anggaran 500 ms: ${median.toFixed(1)} ms`);
rmSync(dir, { recursive: true, force: true });
