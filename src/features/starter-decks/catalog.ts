import type { LingologDeckFile } from '../transfer/deck-transfer';
import { germanStarterDecks } from './german';
import { germanExtraStarterDecks } from './german-extra';

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
export const starterDecks: StarterDeck[] = [...germanStarterDecks, ...germanExtraStarterDecks];

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
