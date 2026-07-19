import assert from 'node:assert/strict';
import test from 'node:test';
import { isDictationCorrect, normalizeDictationAnswer } from '../src/features/practice/answer';
import { calculateMastery, evidenceGrade } from '../src/features/practice/mastery';
import { isValidPracticeDate } from '../src/features/practice/session.repository';
import { DeckTransferError, parseDeckFile, safeDeckFileName } from '../src/features/transfer/deck-transfer';

const baseDeck = () => ({
  format: 'lingolog.deck', version: 1, exportedAt: '2026-01-01T00:00:00.000Z',
  deck: { name: 'Dasar', description: null, sourceLanguage: 'de-DE', targetLanguage: 'id-ID', color: '#355A46', entries: [{ type: 'word', sourceText: 'Hallo', translatedText: 'Halo', notes: null, exampleText: null, exampleTranslation: null, tags: ['sapaan'] }] },
});

test('normalisasi Dikte mengabaikan tipografi tetapi mempertahankan huruf bermakna', () => {
  assert.equal(normalizeDictationAnswer(' Hallo,   Welt! '), 'hallowelt');
  assert.equal(normalizeDictationAnswer("don't"), 'dont');
  assert.equal(normalizeDictationAnswer('ＡＢＣ'), 'abc');
  assert.equal(isDictationCorrect('schon', 'schön'), false);
  assert.equal(isDictationCorrect('Masse', 'Maße'), false);
  assert.equal(isDictationCorrect('  HALLO! ', 'hallo'), true);
});

test('tanggal latihan menolak tanggal palsu dan menerima leap day nyata', () => {
  assert.equal(isValidPracticeDate('2024-02-29'), true);
  assert.equal(isValidPracticeDate('2023-02-29'), false);
  assert.equal(isValidPracticeDate('2026-13-01'), false);
  assert.equal(isValidPracticeDate('01-01-2026'), false);
});

test('ambang mastery mengikuti bukti dan kegagalan beruntun', () => {
  assert.equal(evidenceGrade(0, 0, 0), 0);
  assert.equal(evidenceGrade(3, 1, 2), 2);
  assert.equal(evidenceGrade(7, 1, 5), 3);
  assert.equal(evidenceGrade(9, 1, 0, 5), 1);
});

test('tiga kegagalan melepas grade manual tanpa menghapus statistik', () => {
  let state = { correctCount: 8, incorrectCount: 0, correctStreak: 5, failureStreak: 0, currentGrade: 3 as 0 | 1 | 2 | 3, manualGrade: 3 as 0 | 1 | 2 | 3 | null };
  for (let index = 0; index < 2; index += 1) { const next = calculateMastery(state, false); state = { ...state, ...next, currentGrade: next.grade }; }
  const result = calculateMastery(state, false);
  assert.equal(result.manualGrade, null);
  assert.equal(result.failureStreak, 3);
  assert.equal(result.grade, 2);
  assert.equal(result.correctCount, 8);
  assert.equal(result.incorrectCount, 3);
});

test('parser deck menerima format valid dan menolak field asing atau versi baru', () => {
  assert.equal(parseDeckFile(JSON.stringify(baseDeck())).deck.entries.length, 1);
  assert.throws(() => parseDeckFile(JSON.stringify({ ...baseDeck(), unknown: true })), (error) => error instanceof DeckTransferError && error.code === 'INVALID_FORMAT');
  assert.throws(() => parseDeckFile(JSON.stringify({ ...baseDeck(), version: 2 })), (error) => error instanceof DeckTransferError && error.code === 'UNSUPPORTED_VERSION');
  const sameLanguage = baseDeck(); sameLanguage.deck.targetLanguage = 'de-DE';
  assert.throws(() => parseDeckFile(JSON.stringify(sameLanguage)), (error) => error instanceof DeckTransferError && error.code === 'INVALID_FORMAT');
});

test('nama file ekspor aman dan stabil', () => {
  assert.equal(safeDeckFileName(' Grüße & Alltag '), 'Gru-e-Alltag.lingolog.json');
  assert.equal(safeDeckFileName('***'), 'deck.lingolog.json');
});
