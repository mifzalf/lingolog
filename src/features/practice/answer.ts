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
