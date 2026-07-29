import type { LingologDeckFile } from '../transfer/deck-transfer';
import { germanStarterDecks } from './german';
import { germanExtraStarterDecks } from './german-extra';
import { germanCefrExpansionStarterDecks } from './german-cefr-expansion';
import { germanA1ExamStarterDecks } from './german-a1-exam';
import { germanA2ExamStarterDecks } from './german-a2-exam';
import { germanB1PracticalStarterDecks } from './german-b1-practical';
import { restructureGermanA1Decks } from './german-a1-restructured';

export type StarterDeckLevel = 'pemula' | 'menengah' | 'lanjutan';
export type StarterDeckCategory = 'sehari-hari' | 'perjalanan' | 'sekolah' | 'kerja' | 'lainnya';
export type StarterDeck = {
  id: string;
  version: number;
  level: StarterDeckLevel;
  category: StarterDeckCategory;
  featured?: boolean;
  summary: string;
  file: LingologDeckFile;
};

/**
 * Katalog ini dibundel bersama aplikasi dan selalu tersedia offline.
 * Tambahkan deck siap pakai di sini pada tahap penyusunan konten.
 * `id` harus stabil; naikkan `version` ketika isi deck diperbarui.
 */
const contentTypeLabel = { word: 'Kata', phrase: 'Frasa', sentence: 'Kalimat' } as const;
function splitByContentType(starter: StarterDeck): StarterDeck[] {
  const types = [...new Set(starter.file.deck.entries.map((entry) => entry.type))];
  if (types.length === 1) return [{ ...starter, file: { ...starter.file, deck: { ...starter.file.deck, contentType: types[0] } } }];
  return types.map((type) => ({
    ...starter,
    id: `${starter.id}-${type}`,
    summary: `${contentTypeLabel[type]}: ${starter.summary}`,
    file: { ...starter.file, deck: { ...starter.file.deck, name: `${starter.file.deck.name} · ${contentTypeLabel[type]}`, contentType: type, entries: starter.file.deck.entries.filter((entry) => entry.type === type) } },
  }));
}

const categorizedStarterDecks = [...germanStarterDecks, ...germanExtraStarterDecks, ...germanCefrExpansionStarterDecks, ...germanA1ExamStarterDecks, ...germanA2ExamStarterDecks, ...germanB1PracticalStarterDecks].flatMap(splitByContentType);
export const starterDecks: StarterDeck[] = restructureGermanA1Decks(categorizedStarterDecks);

export const starterDeckLevels: { value: StarterDeckLevel; label: string }[] = [
  { value: 'pemula', label: 'Pemula' },
  { value: 'menengah', label: 'Menengah' },
  { value: 'lanjutan', label: 'Lanjutan' },
];
export const starterDeckCategories: { value: StarterDeckCategory; label: string }[] = [
  { value: 'sehari-hari', label: 'Sehari-hari' },
  { value: 'perjalanan', label: 'Perjalanan' },
  { value: 'sekolah', label: 'Sekolah' },
  { value: 'kerja', label: 'Kerja' },
  { value: 'lainnya', label: 'Lainnya' },
];
