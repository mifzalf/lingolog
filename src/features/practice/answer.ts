export type QuizMode = 'flashcard' | 'dictation';
export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';

/**
 * Makes dictation forgiving about typography, not vocabulary.
 * Keeps letters and numbers from every language, including German umlauts.
 */
export function normalizeDictationAnswer(value: string, locale?: string) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase(locale)
    .replace(/[\p{P}\p{S}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isDictationCorrect(actual: string, expected: string, locale?: string) {
  return normalizeDictationAnswer(actual, locale) === normalizeDictationAnswer(expected, locale);
}
