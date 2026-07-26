export type WheelPrompt = { target: string; letters: string[]; answerLength: number };
const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'];
function hash(seed: number, value: number) { let result = (seed ^ Math.imul(value + 1, 0x45d9f3b)) >>> 0; result = Math.imul(result ^ (result >>> 16), 0x45d9f3b) >>> 0; return (result ^ (result >>> 16)) >>> 0; }
export function wheelCharacters(value: string) { return [...value.normalize('NFC').toLocaleUpperCase()].filter((character) => /\p{L}/u.test(character)); }
export function createWordWheel(target: string, seed: number): WheelPrompt {
  const characters = wheelCharacters(target); const unique = [...new Set(characters)]; const count = 2 + (hash(seed, characters.length) % 2); const available = alphabet.filter((letter) => !unique.includes(letter));
  const traps = [...available].sort((a, b) => hash(seed + 17, a.codePointAt(0)!) - hash(seed + 17, b.codePointAt(0)!)).slice(0, count);
  const letters = [...unique, ...traps].sort((a, b) => hash(seed + 31, a.codePointAt(0)!) - hash(seed + 31, b.codePointAt(0)!) || a.localeCompare(b));
  return { target: characters.join(''), letters, answerLength: characters.length };
}
export function isWordWheelCorrect(answer: string, target: string) { return wheelCharacters(answer).join('') === wheelCharacters(target).join(''); }
