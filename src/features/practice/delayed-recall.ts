export type RecallItem = { id: number; sourceText: string; translatedText: string };
export type RecallDisplay = 'source' | 'meaning';
export type RecallRound<T extends RecallItem = RecallItem> = { index: number; items: T[]; target: T; targetPosition: number; display: RecallDisplay; options: T[] };

function hash(seed: number, value: number) {
  let result = (seed ^ Math.imul(value + 1, 0x45d9f3b)) >>> 0;
  result = Math.imul(result ^ (result >>> 16), 0x45d9f3b) >>> 0;
  return (result ^ (result >>> 16)) >>> 0;
}
function shuffle<T extends RecallItem>(items: T[], seed: number) {
  return [...items].sort((a, b) => hash(seed, a.id) - hash(seed, b.id) || a.id - b.id);
}
function normalized(value: string) { return value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim(); }

export function createDelayedRecallRounds<T extends RecallItem>(items: T[], sessionId: number, displayMode: RecallDisplay | 'mixed' = 'source'): RecallRound<T>[] {
  const rounds: RecallRound<T>[] = [];
  for (let offset = 0; offset + 2 < items.length; offset += 3) {
    const roundItems = items.slice(offset, offset + 3); const index = rounds.length;
    const targetPosition = hash(sessionId + index * 29, roundItems[0].id) % 3;
    const target = roundItems[targetPosition];
    const display: RecallDisplay = displayMode === 'mixed' ? (hash(sessionId + index * 53, target.id) % 2 ? 'meaning' : 'source') : displayMode;
    const answer = (item: T) => display === 'source' ? item.translatedText : item.sourceText;
    const distractors = shuffle(items.filter((item) => item.id !== target.id && normalized(answer(item)) !== normalized(answer(target))), sessionId + index * 41 + 7).slice(0, 3);
    rounds.push({ index, items: roundItems, target, targetPosition, display, options: shuffle([target, ...distractors], sessionId + index * 41 + 19) });
  }
  return rounds;
}
