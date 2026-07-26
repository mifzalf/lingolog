export type RecallItem = { id: number; sourceText: string; translatedText: string };
export type RecallRound<T extends RecallItem = RecallItem> = { index: number; items: T[]; target: T; options: T[] };

function hash(seed: number, value: number) {
  let result = (seed ^ Math.imul(value + 1, 0x45d9f3b)) >>> 0;
  result = Math.imul(result ^ (result >>> 16), 0x45d9f3b) >>> 0;
  return (result ^ (result >>> 16)) >>> 0;
}
function shuffle<T extends RecallItem>(items: T[], seed: number) {
  return [...items].sort((a, b) => hash(seed, a.id) - hash(seed, b.id) || a.id - b.id);
}
function normalized(value: string) { return value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim(); }

export function createDelayedRecallRounds<T extends RecallItem>(items: T[], sessionId: number): RecallRound<T>[] {
  const rounds: RecallRound<T>[] = [];
  for (let offset = 0; offset + 2 < items.length; offset += 3) {
    const roundItems = items.slice(offset, offset + 3); const index = rounds.length;
    // Pertanyaan selalu kata kedua atau ketiga, stabil untuk resume sesi.
    const target = roundItems[1 + (hash(sessionId + index * 29, roundItems[0].id) % 2)];
    const distractors = shuffle(items.filter((item) => item.id !== target.id && normalized(item.translatedText) !== normalized(target.translatedText)), sessionId + index * 41 + 7).slice(0, 3);
    rounds.push({ index, items: roundItems, target, options: shuffle([target, ...distractors], sessionId + index * 41 + 19) });
  }
  return rounds;
}
