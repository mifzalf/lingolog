import type { LingologDeckFile } from '../transfer/deck-transfer';
import type { StarterDeck, StarterDeckCategory, StarterDeckLevel } from './catalog';

type Entry = LingologDeckFile['deck']['entries'][number];
type EntryType = Entry['type'];
export type CuratedGermanEntry = readonly [sourceText: string, translatedText: string, type: EntryType, tags?: readonly string[]];

const exportedAt = '2026-01-01T00:00:00.000Z';

export function germanEntries(type: EntryType, tag: string, rows: string): CuratedGermanEntry[] {
  return rows.trim().split('\n').map((row, index) => {
    const [sourceText, translatedText] = row.split('\t').map((value) => value?.trim());
    if (!sourceText || !translatedText) throw new Error(`Materi ${tag} baris ${index + 1} harus memakai format Jerman<TAB>Indonesia.`);
    return [sourceText, translatedText, type, [tag, type === 'word' ? 'kosakata' : type === 'phrase' ? 'frasa' : 'kalimat']];
  });
}

export function curatedGermanDeck(config: {
  id: string;
  name: string;
  summary: string;
  description: string;
  level: StarterDeckLevel;
  category: StarterDeckCategory;
  color: string;
  featured?: boolean;
  entries: CuratedGermanEntry[];
}): StarterDeck {
  if (config.entries.length < 60) throw new Error(`Deck ${config.id} harus memiliki minimal 60 materi kurasi.`);
  const seen = new Set<string>();
  const entries = config.entries.map(([sourceText, translatedText, type, tags]) => {
    const key = `${sourceText.normalize('NFKC').trim().toLocaleLowerCase('de-DE')}\u0000${translatedText.normalize('NFKC').trim().toLocaleLowerCase('id-ID')}`;
    if (seen.has(key)) throw new Error(`Duplikat dalam ${config.id}: ${sourceText}`);
    seen.add(key);
    return { type, sourceText, translatedText, notes: null, exampleText: null, exampleTranslation: null, tags: [...new Set(tags ?? [])].slice(0, 12) } satisfies Entry;
  });
  return {
    id: config.id,
    version: 2,
    level: config.level,
    category: config.category,
    featured: config.featured,
    summary: config.summary,
    file: {
      format: 'lingolog.deck',
      version: 1,
      exportedAt,
      deck: {
        name: config.name,
        description: config.description,
        sourceLanguage: 'de-DE',
        targetLanguage: 'id-ID',
        color: config.color,
        entries,
      },
    },
  };
}
