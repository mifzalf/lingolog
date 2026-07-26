export type MatchupItem = { id: number; deckId: number; deckName: string; position: number; sourceText: string; translatedText: string; sourceLanguage: string };
export type MatchupRound = { index: number; items: MatchupItem[]; sourceOrder: number[]; targetOrder: number[] };

function score(seed: number, value: number) {
  let result = (seed ^ Math.imul(value + 1, 0x45d9f3b)) >>> 0;
  result = Math.imul(result ^ (result >>> 16), 0x45d9f3b) >>> 0;
  return (result ^ (result >>> 16)) >>> 0;
}

export function stableShuffle(ids: number[], seed: number) {
  return [...ids].sort((a, b) => score(seed, a) - score(seed, b) || a - b);
}

function matchLabel(value: string) {
  return value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
}

export function createMatchupRounds(items: MatchupItem[], sessionId: number, size = 5): MatchupRound[] {
  const rounds: MatchupRound[] = [];
  const remaining = [...items];
  while (remaining.length) {
    const roundItems: MatchupItem[] = [];
    const sources = new Set<string>(); const targets = new Set<string>();
    for (let index = 0; index < remaining.length && roundItems.length < size;) {
      const item = remaining[index]; const source = matchLabel(item.sourceText); const target = matchLabel(item.translatedText);
      if (!sources.has(source) && !targets.has(target)) { roundItems.push(item); sources.add(source); targets.add(target); remaining.splice(index, 1); } else index += 1;
    }
    // An ambiguous label is deferred to another round; if no unique companion
    // exists, it receives a one-pair round rather than showing two identical choices.
    if (!roundItems.length) roundItems.push(remaining.shift()!);
    const index = rounds.length; const ids = roundItems.map((item) => item.id);
    rounds.push({ index, items: roundItems, sourceOrder: stableShuffle(ids, sessionId + index * 31), targetOrder: stableShuffle(ids, sessionId + index * 31 + 17) });
  }
  return rounds;
}
