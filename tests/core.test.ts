import assert from 'node:assert/strict';
import test from 'node:test';
import { applyFillAnswer, completeFillAnswer, createFillPrompt, isDictationCorrect, isFillAnswerCorrect, normalizeDictationAnswer } from '../src/features/practice/answer';
import { calculateMastery, evidenceGrade } from '../src/features/practice/mastery';
import { resolveDelayedRecallSeconds } from '../src/features/practice/session.repository';
import { createMatchupRounds, stableShuffle } from '../src/features/practice/matchup';
import { createDelayedRecallRounds } from '../src/features/practice/delayed-recall';
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

test('fill dikte menyembunyikan huruf secara stabil dan merekonstruksi jawaban utuh', () => {
  const first = createFillPrompt('Deutschkurse', 42, 'medium');
  const second = createFillPrompt('Deutschkurse', 42, 'medium');
  assert.deepEqual(first, second);
  assert.equal(first.hiddenCount, 5);
  assert.equal(first.template[0], 'D');
  assert.equal((first.template.match(/_/g) ?? []).length, first.hiddenCount);
  const expected = Array.from('Deutschkurse');
  const missing = first.hiddenIndexes.map((index) => expected[index]).join('');
  assert.equal(applyFillAnswer('Deutschkurse', first, missing), 'Deutschkurse');
  assert.equal(completeFillAnswer('Deutschkurse', first, missing), 'Deutschkurse');
  assert.equal(isFillAnswerCorrect(missing, 'Deutschkurse', first, 'de-DE'), true);
  assert.equal(isFillAnswerCorrect(missing.slice(0, -1), 'Deutschkurse', first, 'de-DE'), false);
});

test('tingkat fill menambah kekosongan tanpa menghilangkan seluruh kata pendek', () => {
  const easy = createFillPrompt('Deutschkurse Haus ab I', 7, 'easy');
  const medium = createFillPrompt('Deutschkurse Haus ab I', 7, 'medium');
  const hard = createFillPrompt('Deutschkurse Haus ab I', 7, 'hard');
  assert.ok(easy.hiddenCount < medium.hiddenCount);
  assert.ok(medium.hiddenCount < hard.hiddenCount);
  for (const word of hard.template.split(' ')) {
    assert.notEqual(word[0], '_');
    assert.match(word, /[^_]/);
  }
  assert.equal(hard.template.endsWith('I'), true);
});

test('fill dikte mempertahankan spasi, tanda baca, Unicode, dan awal kata sebagai petunjuk', () => {
  const prompt = createFillPrompt('Grüße, schöne Welt!', 7, 'hard');
  assert.equal(prompt.template.includes(', '), true);
  assert.equal(prompt.template.endsWith('!'), true);
  assert.equal(prompt.template[0], 'G');
  assert.equal(prompt.template[prompt.template.indexOf(' ') + 1], 's');
  assert.equal(prompt.template[prompt.template.lastIndexOf(' ') + 1], 'W');
});

test('ronde Jodohkan kata stabil, berisi maksimal lima pasangan, dan kedua sisi diacak terpisah', () => {
  const items = Array.from({ length: 12 }, (_, index) => ({ id: index + 1, deckId: 1, deckName: 'Dasar', sourceLanguage: 'de-DE', position: index, sourceText: `Kata ${index}`, translatedText: `Arti ${index}` }));
  const rounds = createMatchupRounds(items, 91);
  assert.deepEqual(rounds.map((round) => round.items.length), [5, 5, 2]);
  assert.deepEqual(rounds, createMatchupRounds(items, 91));
  for (const round of rounds) {
    assert.deepEqual([...round.sourceOrder].sort((a, b) => a - b), round.items.map((item) => item.id).sort((a, b) => a - b));
    assert.deepEqual([...round.targetOrder].sort((a, b) => a - b), round.items.map((item) => item.id).sort((a, b) => a - b));
  }
  assert.notDeepEqual(stableShuffle([1, 2, 3, 4, 5], 1), stableShuffle([1, 2, 3, 4, 5], 18));
  const ambiguous = [...items.slice(0, 3), { ...items[3], id: 20, sourceText: items[0].sourceText }, { ...items[4], id: 21, translatedText: items[1].translatedText }];
  for (const round of createMatchupRounds(ambiguous, 91)) {
    assert.equal(new Set(round.items.map((item) => item.sourceText)).size, round.items.length);
    assert.equal(new Set(round.items.map((item) => item.translatedText)).size, round.items.length);
  }
});

test('opsi waktu Ingat Lagi menerima 3/5/8/10 detik dan sesi lama tetap 5 detik', () => {
  assert.equal(resolveDelayedRecallSeconds(), 5);
  assert.equal(resolveDelayedRecallSeconds({ delayedRecallSeconds: 3 }), 3);
  assert.equal(resolveDelayedRecallSeconds({ delayedRecallSeconds: 8 }), 8);
  assert.equal(resolveDelayedRecallSeconds({ delayedRecallSeconds: 10 }), 10);
});

test('Ingat Lagi membentuk tiga kata, menanyakan kata kedua atau ketiga, dan stabil saat resume', () => {
  const items = Array.from({ length: 9 }, (_, index) => ({ id: index + 1, sourceText: `Kata ${index + 1}`, translatedText: `Arti ${index + 1}` }));
  const rounds = createDelayedRecallRounds(items, 77);
  assert.equal(rounds.length, 3);
  assert.deepEqual(rounds, createDelayedRecallRounds(items, 77));
  for (const round of rounds) {
    assert.equal(round.items.length, 3);
    assert.ok(round.target.id === round.items[1].id || round.target.id === round.items[2].id);
    assert.ok(round.options.some((option) => option.id === round.target.id));
    assert.equal(new Set(round.options.map((option) => option.translatedText)).size, round.options.length);
  }
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
