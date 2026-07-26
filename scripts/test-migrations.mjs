import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const source = readFileSync(new URL('../src/db/migrations.ts', import.meta.url), 'utf8');
const body = (name) => {
  const match = source.match(new RegExp('const ' + name + ' = `([\\s\\S]*?)`;'));
  assert.ok(match, `SQL ${name} tidak ditemukan`); return match[1];
};
const migrations = [body('migrationV1'), body('migrationV2'), body('migrationV3'), body('migrationV4'), body('migrationV5'), body('migrationV6'), body('migrationV7'), body('migrationV8')];
const applicationId = 0x4c4c4f47;
const dir = mkdtempSync(join(tmpdir(), 'lingolog-migrations-'));
const sql = (db, statement) => execFileSync('sqlite3', [db, statement], { encoding: 'utf8' }).trim();
try {
  for (let from = 0; from <= 7; from += 1) {
    const db = join(dir, `from-v${from}.db`);
    if (from > 0) {
      const setup = `${migrations.slice(0, from).join('\n')}\nPRAGMA user_version=${from}; PRAGMA application_id=${applicationId};`;
      writeFileSync(join(dir, 'setup.sql'), setup); execFileSync('sh', ['-c', `sqlite3 "$1" < "$2"`, 'sh', db, join(dir, 'setup.sql')]);
      sql(db, "INSERT INTO decks(name,source_language,target_language,created_at,updated_at) VALUES('Tetap ada','de-DE','id-ID',1,1);");
    }
    const migrate = `PRAGMA foreign_keys=OFF;\n${migrations.slice(from).join('\n')}\nPRAGMA user_version=8; PRAGMA application_id=${applicationId}; PRAGMA foreign_keys=ON;`;
    writeFileSync(join(dir, 'migrate.sql'), migrate); execFileSync('sh', ['-c', `sqlite3 "$1" < "$2"`, 'sh', db, join(dir, 'migrate.sql')]);
    assert.equal(Number(sql(db, 'PRAGMA user_version;')), 8);
    assert.equal(Number(sql(db, 'PRAGMA application_id;')), applicationId);
    assert.equal(sql(db, 'PRAGMA integrity_check;'), 'ok');
    assert.equal(sql(db, 'PRAGMA foreign_key_check;'), '');
    if (from > 0) assert.equal(Number(sql(db, "SELECT count(*) FROM decks WHERE name='Tetap ada';")), 1);
    const columns = sql(db, "SELECT group_concat(name, ',') FROM pragma_table_info('mastery_states');");
    assert.match(columns, /manual_grade/); assert.match(columns, /failure_streak/);
    sql(db, "INSERT INTO practice_sessions(mode,started_at,total_items) VALUES('word_wheel',1,5);");
  }
  console.log('Migrasi fresh dan v1–v7 → v8 lulus, integritas serta data lama terjaga.');
} finally { rmSync(dir, { recursive: true, force: true }); }
