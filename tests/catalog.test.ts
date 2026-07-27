import assert from 'node:assert/strict';
import test from 'node:test';
import { starterDecks } from '../src/features/starter-decks/catalog';
import { parseDeckFile } from '../src/features/transfer/deck-transfer';
import { starterEntryKey } from '../src/features/starter-decks/starter-deck.repository';

const normalized = (value: string, locale: string) => value.normalize('NFKC').trim().toLocaleLowerCase(locale).replace(/[\p{P}\p{S}\s]+/gu, '');

test('katalog bawaan khusus Jerman lolos format, batas tag, dan keunikan', () => {
  assert.equal(starterDecks.length, 43);
  let totalEntries = 0;
  const coverage = new Set<string>();
  const allPairs = new Set<string>();
  for (const starter of starterDecks) {
    const { deck } = parseDeckFile(JSON.stringify(starter.file)); totalEntries += deck.entries.length;
    assert.equal(deck.sourceLanguage, 'de-DE'); assert.equal(deck.targetLanguage, 'id-ID');
    for (const cefr of deck.name.match(/\b(A1|A2|B1|C1)\b/g) ?? []) coverage.add(cefr);
    const pairs = new Set<string>();
    for (const entry of deck.entries) {
      const pair: string = `${normalized(entry.sourceText, deck.sourceLanguage)}\u0000${normalized(entry.translatedText, deck.targetLanguage)}`;
      assert.equal(pairs.has(pair), false, `Duplikat dalam ${deck.name}: ${entry.sourceText}`); pairs.add(pair);
      assert.equal(allPairs.has(pair), false, `Duplikat lintas deck Jerman: ${entry.sourceText}`); allPairs.add(pair);
      assert.ok(entry.tags.length <= 12);
    }
  }
  assert.equal(totalEntries, 2_941);
  assert.deepEqual([...coverage].sort(), ['A1', 'A2', 'B1', 'C1']);
});

test('segmen Goethe A1 memisahkan delapan deck kata dan frasa', () => {
  const segment = starterDecks.filter((starter) => ['de-id-a1-kata-makanan-minuman', 'de-id-a1-frasa-restoran-belanja', 'de-id-a1-kata-profesi', 'de-id-a1-frasa-pekerjaan', 'de-id-a1-kata-hobi', 'de-id-a1-frasa-hobi', 'de-id-a1-kata-transportasi-layanan', 'de-id-a1-frasa-perjalanan-bantuan'].includes(starter.id));
  assert.equal(segment.length, 8);
  assert.equal(segment.reduce((total, starter) => total + starter.file.deck.entries.length, 0), 480);
  for (const starter of segment) {
    const expected = starter.id.includes('-kata-') ? 'word' : 'phrase';
    assert.ok(starter.file.deck.entries.every((entry) => entry.type === expected), `${starter.id} harus hanya berisi ${expected}`);
  }
});

test('segmen Goethe A2 memisahkan delapan deck kata dan frasa', () => {
  const ids = ['de-id-a2-kata-sekolah-kursus', 'de-id-a2-frasa-belajar-ujian', 'de-id-a2-kata-keluarga-perayaan', 'de-id-a2-frasa-undangan-plan', 'de-id-a2-kata-profesi-pekerjaan', 'de-id-a2-frasa-dunia-kerja', 'de-id-a2-kata-makanan-gaya-hidup', 'de-id-a2-frasa-restoran-keluhan'];
  const segment = starterDecks.filter((starter) => ids.includes(starter.id));
  assert.equal(segment.length, 8);
  assert.equal(segment.reduce((total, starter) => total + starter.file.deck.entries.length, 0), 480);
  for (const starter of segment) {
    const expected = starter.id.includes('-kata-') ? 'word' : 'phrase';
    assert.ok(starter.file.deck.entries.every((entry) => entry.type === expected), `${starter.id} harus hanya berisi ${expected}`);
  }
});

test('segmen Goethe B1 praktis memakai jumlah materi sesuai kebutuhan tema', () => {
  const ids = ['de-id-b1-kata-pendidikan-karier', 'de-id-b1-frasa-pendidikan-karier', 'de-id-b1-kata-kesehatan-gaya-hidup', 'de-id-b1-frasa-kesehatan-keseimbangan', 'de-id-b1-kata-wohnen-konsum', 'de-id-b1-frasa-miete-vertrag-beschwerde', 'de-id-b1-kata-mobilitaet-reise', 'de-id-b1-frasa-reise-problemloesung', 'de-id-b1-kata-medien-digital', 'de-id-b1-frasa-information-internet'];
  const segment = starterDecks.filter((starter) => ids.includes(starter.id));
  assert.equal(segment.length, 10);
  assert.equal(segment.reduce((total, starter) => total + starter.file.deck.entries.length, 0), 538);
  assert.ok(new Set(segment.map((starter) => starter.file.deck.entries.length)).size > 1, 'jumlah materi tidak perlu dipaksa seragam');
  for (const starter of segment) {
    const expected = starter.id.includes('-kata-') ? 'word' : 'phrase';
    assert.ok(starter.file.deck.entries.every((entry) => entry.type === expected), `${starter.id} harus hanya berisi ${expected}`);
  }
});

test('deck kalimat Jerman tetap terpisah dari kata dan frasa', () => {
  const sentenceDecks = starterDecks.filter((starter) => starter.id.includes('kalimat-nyata'));
  assert.equal(sentenceDecks.length, 2);
  for (const starter of sentenceDecks) assert.ok(starter.file.deck.entries.every((entry) => entry.type === 'sentence'), `${starter.id} harus hanya berisi kalimat`);
  for (const starter of starterDecks.filter((item) => !item.id.includes('kalimat-nyata'))) assert.ok(starter.file.deck.entries.every((entry) => entry.type !== 'sentence'), `${starter.id} tidak boleh mencampur kalimat`);
});

test('identitas materi katalog stabil terhadap spasi, kapitalisasi, dan bentuk Unicode kompatibel', () => {
  assert.equal(starterEntryKey({ sourceText: '  ＨＡＬＬＯ ', translatedText: ' Halo ' }), starterEntryKey({ sourceText: 'hallo', translatedText: 'halo' }));
  assert.notEqual(starterEntryKey({ sourceText: 'schon', translatedText: 'sudah' }), starterEntryKey({ sourceText: 'schön', translatedText: 'indah' }));
});

test('katalog Jerman tidak lagi memakai pola kalimat substitusi massal', () => {
  const germanEntries = starterDecks.flatMap((starter) => starter.file.deck.entries);
  const forbiddenTemplates = [/^Hier ist (ein|eine) /, /^(Der|Die|Das) .+ ist hier\.$/, /^Wir sprechen über (den|die|das) /, /^Ich kenne (den|die|das) /, /^Brauchen wir (den|die|das) /, /^Lass uns [a-zäöüß ]+\.$/, /^Ich versuche, [a-zäöüß ]+\.$/, /^Es ist wichtig, [a-zäöüß ]+\.$/];
  for (const entry of germanEntries) for (const pattern of forbiddenTemplates) assert.doesNotMatch(entry.sourceText, pattern, `Pola lama ditemukan: ${entry.sourceText}`);
});
