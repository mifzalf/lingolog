import type { LingologDeckFile } from '../transfer/deck-transfer';
import type { StarterDeck, StarterDeckCategory, StarterDeckLevel } from './catalog';

type Noun = [english: string, indonesian: string];
type Verb = [english: string, indonesian: string];
type Entry = LingologDeckFile['deck']['entries'][number];
const exportedAt = '2026-01-01T00:00:00.000Z';
function entry(type: Entry['type'], sourceText: string, translatedText: string, tags: string[], notes: string | null = null): Entry { return { type, sourceText, translatedText, notes, exampleText: null, exampleTranslation: null, tags }; }
function nounEntries([noun, meaning]: Noun, tag: string): Entry[] { const article = /^[aeiou]/i.test(noun) ? 'an' : 'a'; return [
  entry('word', noun, meaning, [tag, 'nomina']), entry('phrase', `the ${noun}`, `${meaning} itu`, [tag, 'artikel']),
  entry('sentence', `This is ${article} ${noun}.`, `Ini adalah ${meaning}.`, [tag, 'pola-dasar']), entry('sentence', `The ${noun} is here.`, `${meaning[0].toUpperCase()}${meaning.slice(1)} itu ada di sini.`, [tag, 'lokasi']),
  entry('sentence', `Where is the ${noun}?`, `Di mana ${meaning} itu?`, [tag, 'pertanyaan']), entry('sentence', `I am looking for the ${noun}.`, `Saya mencari ${meaning} itu.`, [tag, 'kebutuhan']),
  entry('sentence', `We are talking about the ${noun}.`, `Kami sedang membicarakan ${meaning} itu.`, [tag, 'percakapan']), entry('sentence', `The ${noun} is important.`, `${meaning[0].toUpperCase()}${meaning.slice(1)} itu penting.`, [tag, 'pendapat']),
  entry('sentence', `I know the ${noun}.`, `Saya mengetahui ${meaning} itu.`, [tag, 'pengalaman']), entry('sentence', `Do we need the ${noun}?`, `Apakah kita membutuhkan ${meaning} itu?`, [tag, 'pertanyaan']),
]; }
function verbEntries([verb, meaning]: Verb, tag: string): Entry[] { return [
  entry('word', `to ${verb}`, meaning, [tag, 'verba']), entry('phrase', `${verb}, please`, `tolong ${meaning}`, [tag, 'permintaan']),
  entry('sentence', `We can ${verb}.`, `Kita bisa ${meaning}.`, [tag, 'kemampuan']), entry('sentence', `I want to ${verb}.`, `Saya ingin ${meaning}.`, [tag, 'keinginan']),
  entry('sentence', `We have to ${verb}.`, `Kita harus ${meaning}.`, [tag, 'keharusan']), entry('sentence', `Can you ${verb}?`, `Bisakah Anda ${meaning}?`, [tag, 'pertanyaan']),
  entry('sentence', `May I ${verb}?`, `Bolehkah saya ${meaning}?`, [tag, 'izin']), entry('sentence', `Let's ${verb}.`, `Mari kita ${meaning}.`, [tag, 'ajakan']),
  entry('sentence', `I am trying to ${verb}.`, `Saya sedang mencoba ${meaning}.`, [tag, 'usaha']), entry('sentence', `It is important to ${verb}.`, `Penting untuk ${meaning}.`, [tag, 'nasihat']),
]; }
export function englishDeck(config: { id: string; name: string; summary: string; description: string; level: StarterDeckLevel; category: StarterDeckCategory; color: string; featured?: boolean; tag: string; nouns: Noun[]; verbs: Verb[] }): StarterDeck {
  const entries = [...config.nouns.flatMap((item) => nounEntries(item, config.tag)), ...config.verbs.flatMap((item) => verbEntries(item, config.tag))];
  if (config.nouns.length < 20 || config.verbs.length < 10 || entries.length < 300) throw new Error(`Deck ${config.id} harus memiliki minimal 300 entri.`);
  return { id: config.id, version: 1, level: config.level, category: config.category, featured: config.featured, summary: config.summary, file: { format: 'lingolog.deck', version: 1, exportedAt, deck: { name: config.name, description: config.description, sourceLanguage: 'en-US', targetLanguage: 'id-ID', color: config.color, entries } } };
}
