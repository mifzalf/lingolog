import assert from 'node:assert/strict';
import test from 'node:test';
import { starterDecks } from '../src/features/starter-decks/catalog';
import { parseDeckFile } from '../src/features/transfer/deck-transfer';
import { starterEntryKey } from '../src/features/starter-decks/starter-deck.repository';

const normalized = (value: string, locale: string) => value.normalize('NFKC').trim().toLocaleLowerCase(locale).replace(/[\p{P}\p{S}\s]+/gu, '');

test('katalog bawaan khusus Jerman lolos format, batas tag, dan keunikan', () => {
  assert.equal(starterDecks.length, 11);
  let totalEntries = 0;
  const coverage = new Set<string>();
  const allPairs = new Set<string>();
  for (const starter of starterDecks) {
    const { deck } = parseDeckFile(JSON.stringify(starter.file)); totalEntries += deck.entries.length;
    assert.ok(deck.entries.length >= 60, `${deck.name} kurang dari 60 materi`);
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
  assert.equal(totalEntries, 1_083);
  assert.deepEqual([...coverage].sort(), ['A1', 'A2', 'B1', 'C1']);
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
