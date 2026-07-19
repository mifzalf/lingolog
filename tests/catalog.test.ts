import assert from 'node:assert/strict';
import test from 'node:test';
import { starterDecks } from '../src/features/starter-decks/catalog';
import { parseDeckFile } from '../src/features/transfer/deck-transfer';

test('katalog bawaan memenuhi jumlah deck, bahasa, tingkat, dan keunikan', () => {
  assert.equal(starterDecks.length, 19);
  let totalEntries = 0; let german = 0; let english = 0;
  const coverage = new Map<string, Set<string>>();
  for (const starter of starterDecks) {
    const file = parseDeckFile(JSON.stringify(starter.file));
    const { deck } = file; totalEntries += deck.entries.length;
    assert.ok(deck.entries.length >= 300, `${deck.name} kurang dari 300 entri`);
    assert.notEqual(deck.sourceLanguage, deck.targetLanguage);
    assert.equal(deck.targetLanguage, 'id-ID');
    if (deck.sourceLanguage === 'de-DE') german += 1;
    if (deck.sourceLanguage === 'en-US') english += 1;
    const cefr = deck.name.match(/\b(A1|A2|B1|C1)\b/)?.[1];
    assert.ok(cefr, `${deck.name} tidak memiliki CEFR`);
    const levels = coverage.get(deck.sourceLanguage) ?? new Set<string>(); levels.add(cefr!); coverage.set(deck.sourceLanguage, levels);
    const pairs = new Set<string>();
    for (const entry of deck.entries) {
      const pair = `${entry.sourceText.normalize('NFKC').trim().toLocaleLowerCase()}\u0000${entry.translatedText.normalize('NFKC').trim().toLocaleLowerCase()}`;
      assert.equal(pairs.has(pair), false, `Duplikat dalam ${deck.name}: ${entry.sourceText}`); pairs.add(pair);
      assert.ok(entry.tags.length <= 12);
    }
  }
  assert.equal(totalEntries, 5_800);
  assert.equal(german, 15);
  assert.equal(english, 4);
  assert.deepEqual([...coverage.get('de-DE')!].sort(), ['A1', 'A2', 'B1', 'C1']);
  assert.deepEqual([...coverage.get('en-US')!].sort(), ['A1', 'A2', 'B1', 'C1']);
});
