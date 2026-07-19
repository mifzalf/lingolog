import type { LingologDeckFile } from '../transfer/deck-transfer';
import type { StarterDeck, StarterDeckCategory, StarterDeckLevel } from './catalog';

type Gender = 'm' | 'f' | 'n' | 'pl';
type Noun = [german: string, indonesian: string, gender: Gender];
type Verb = [infinitive: string, zuInfinitive: string, indonesian: string];
type Entry = LingologDeckFile['deck']['entries'][number];
const exportedAt = '2026-01-01T00:00:00.000Z';
const articles: Record<Gender, { definite: string; accusative: string; indefinite: string }> = {
  m: { definite: 'der', accusative: 'den', indefinite: 'ein' }, f: { definite: 'die', accusative: 'die', indefinite: 'eine' }, n: { definite: 'das', accusative: 'das', indefinite: 'ein' }, pl: { definite: 'die', accusative: 'die', indefinite: '' },
};
function entry(type: Entry['type'], sourceText: string, translatedText: string, tags: string[], notes: string | null = null): Entry { return { type, sourceText, translatedText, notes, exampleText: null, exampleTranslation: null, tags }; }
function nounEntries([noun, meaning, gender]: Noun, tag: string): Entry[] { const a = articles[gender]; const definite = `${a.definite} ${noun}`; const accusative = `${a.accusative} ${noun}`; const indefinite = gender === 'pl' ? noun : `${a.indefinite} ${noun}`; return [
  entry('word', noun, meaning, [tag, 'nomina'], `Artikel: ${a.definite}`), entry('phrase', definite, meaning, [tag, 'artikel']),
  entry('sentence', `Hier ist ${indefinite}.`, `Di sini ada ${meaning}.`, [tag, 'pola-dasar']), entry('sentence', `${definite[0].toUpperCase()}${definite.slice(1)} ist hier.`, `${meaning[0].toUpperCase()}${meaning.slice(1)} ada di sini.`, [tag, 'lokasi']),
  entry('sentence', `Wo ist ${definite}?`, `Di mana ${meaning} itu?`, [tag, 'pertanyaan']), entry('sentence', `Ich suche ${accusative}.`, `Saya mencari ${meaning} itu.`, [tag, 'kebutuhan']),
  entry('sentence', `Wir sprechen über ${accusative}.`, `Kami membicarakan ${meaning} itu.`, [tag, 'percakapan']), entry('sentence', `${definite[0].toUpperCase()}${definite.slice(1)} ist wichtig.`, `${meaning[0].toUpperCase()}${meaning.slice(1)} itu penting.`, [tag, 'pendapat']),
  entry('sentence', `Ich kenne ${accusative}.`, `Saya mengenal ${meaning} itu.`, [tag, 'pengalaman']), entry('sentence', `Brauchen wir ${accusative}?`, `Apakah kita membutuhkan ${meaning} itu?`, [tag, 'pertanyaan']),
]; }
function verbEntries([verb, zuVerb, meaning]: Verb, tag: string): Entry[] { return [
  entry('word', verb, meaning, [tag, 'verba']), entry('phrase', `${verb}, bitte`, `tolong ${meaning}`, [tag, 'permintaan']),
  entry('sentence', `Wir können ${verb}.`, `Kita bisa ${meaning}.`, [tag, 'kemampuan']), entry('sentence', `Ich möchte ${verb}.`, `Saya ingin ${meaning}.`, [tag, 'keinginan']),
  entry('sentence', `Wir müssen ${verb}.`, `Kita harus ${meaning}.`, [tag, 'keharusan']), entry('sentence', `Können Sie ${verb}?`, `Bisakah Anda ${meaning}?`, [tag, 'pertanyaan']),
  entry('sentence', `Kann ich ${verb}?`, `Bolehkah saya ${meaning}?`, [tag, 'izin']), entry('sentence', `Lass uns ${verb}.`, `Mari kita ${meaning}.`, [tag, 'ajakan']),
  entry('sentence', `Ich versuche, ${zuVerb}.`, `Saya mencoba ${meaning}.`, [tag, 'usaha']), entry('sentence', `Es ist wichtig, ${zuVerb}.`, `Penting untuk ${meaning}.`, [tag, 'nasihat']),
]; }
export function germanDeck(config: { id: string; name: string; summary: string; description: string; level: StarterDeckLevel; category: StarterDeckCategory; color: string; featured?: boolean; tag: string; nouns: Noun[]; verbs: Verb[] }): StarterDeck {
  const entries = [...config.nouns.flatMap((item) => nounEntries(item, config.tag)), ...config.verbs.flatMap((item) => verbEntries(item, config.tag))];
  if (config.nouns.length < 20 || config.verbs.length < 10 || entries.length < 300) throw new Error(`Deck ${config.id} harus memiliki minimal 20 nomina, 10 verba, dan 300 entri.`);
  return { id: config.id, version: 1, level: config.level, category: config.category, featured: config.featured, summary: config.summary, file: { format: 'lingolog.deck', version: 1, exportedAt, deck: { name: config.name, description: config.description, sourceLanguage: 'de-DE', targetLanguage: 'id-ID', color: config.color, entries } } };
}
