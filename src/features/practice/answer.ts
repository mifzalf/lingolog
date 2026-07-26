import type { FillDifficulty } from './session.repository';

export type QuizMode = 'flashcard' | 'dictation';
export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';

/**
 * Makes dictation forgiving about typography, not vocabulary.
 * Removes whitespace, punctuation, and symbols while retaining letters,
 * numbers, and meaningful diacritics from every writing system.
 */
export function normalizeDictationAnswer(value: string, locale?: string) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase(locale)
    .replace(/[\p{P}\p{S}\s]/gu, '');
}

export function isDictationCorrect(actual: string, expected: string, locale?: string) {
  return normalizeDictationAnswer(actual, locale) === normalizeDictationAnswer(expected, locale);
}

export type FillPrompt = { template: string; hiddenCount: number; hiddenIndexes: number[] };

const fillableCharacter = /[\p{L}\p{N}]/u;

function fillScore(seed: number, index: number) {
  let value = (seed ^ Math.imul(index + 1, 0x45d9f3b)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

const fillRatios: Record<FillDifficulty, number> = { easy: 0.25, medium: 0.42, hard: 0.6 };

/**
 * Creates stable gaps per word. Even on Hard, every word with more than one
 * character keeps at least one clue and its first character is never hidden.
 */
export function createFillPrompt(text: string, seed = 0, difficulty: FillDifficulty = 'medium'): FillPrompt {
  const characters = Array.from(text.normalize('NFKC'));
  const words: number[][] = [];
  let current: number[] = [];
  characters.forEach((character, index) => {
    if (fillableCharacter.test(character)) current.push(index);
    else if (current.length) { words.push(current); current = []; }
  });
  if (current.length) words.push(current);
  const hiddenIndexes = words.flatMap((word, wordIndex) => {
    if (word.length <= 1) return [];
    const maximum = Math.max(1, word.length - 1);
    const target = Math.max(1, Math.min(maximum, Math.round(word.length * fillRatios[difficulty])));
    return word.slice(1).sort((a, b) => fillScore(seed + wordIndex * 97, a) - fillScore(seed + wordIndex * 97, b)).slice(0, target);
  }).sort((a, b) => a - b);
  const hidden = new Set(hiddenIndexes);
  return { template: characters.map((character, index) => hidden.has(index) ? '_' : character).join(''), hiddenCount: hiddenIndexes.length, hiddenIndexes };
}

export function fillAnswerCharacters(value: string) {
  return Array.from(value.normalize('NFKC')).filter((character) => fillableCharacter.test(character));
}

/** Reconstructs the complete answer while keeping unanswered slots visible. */
export function applyFillAnswer(expected: string, prompt: FillPrompt, value: string) {
  const characters = Array.from(expected.normalize('NFKC'));
  const supplied = fillAnswerCharacters(value);
  prompt.hiddenIndexes.forEach((index, position) => { characters[index] = supplied[position] ?? '_'; });
  return characters.join('');
}

export function completeFillAnswer(expected: string, prompt: FillPrompt, value: string) {
  const characters = Array.from(expected.normalize('NFKC'));
  const supplied = fillAnswerCharacters(value);
  prompt.hiddenIndexes.forEach((index, position) => { characters[index] = supplied[position] ?? ''; });
  return characters.join('');
}

export function isFillAnswerCorrect(value: string, expected: string, prompt: FillPrompt, locale?: string) {
  const supplied = fillAnswerCharacters(value);
  if (supplied.length !== prompt.hiddenCount) return false;
  return isDictationCorrect(completeFillAnswer(expected, prompt, value), expected, locale);
}
