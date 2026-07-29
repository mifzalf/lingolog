import type { StarterDeck } from './catalog';

type Entry = StarterDeck['file']['deck']['entries'][number];

type NewDeck = {
  id: string;
  name: string;
  summary: string;
  description: string;
  category: StarterDeck['category'];
  color: string;
  sources: readonly string[];
};

const plans: readonly NewDeck[] = [
  {
    id: 'de-id-a1-kata-identitas-keluarga',
    name: 'Jerman A1 · Kata Identitas & Keluarga',
    summary: 'Data diri, negara, bahasa, keluarga, dan hubungan terdekat.',
    description: 'Kosakata A1 untuk memperkenalkan diri dan berbicara tentang keluarga. Kata benda menyertakan artikel serta bentuk jamak bila relevan.',
    category: 'sehari-hari', color: '#356552',
    sources: ['der Name, die Namen','der Vorname, die Vornamen','der Nachname, die Nachnamen','die Adresse, die Adressen','die Telefonnummer, die Telefonnummern','das Land, die Länder','die Sprache, die Sprachen','die Familie, die Familien','der Freund, die Freunde','die Freundin, die Freundinnen','die Eltern','der Vater, die Väter','die Mutter, die Mütter','der Bruder, die Brüder','die Schwester, die Schwestern','das Kind, die Kinder'],
  },
  {
    id: 'de-id-a1-kata-rutinitas-waktu-belajar',
    name: 'Jerman A1 · Kata Rutinitas, Waktu & Belajar',
    summary: 'Sekolah, kursus, waktu, jadwal, pertanyaan, dan kegiatan belajar dasar.',
    description: 'Kosakata A1 untuk menjalani rutinitas, mengikuti pelajaran, memahami waktu, dan membuat jadwal sederhana.',
    category: 'sekolah', color: '#536E8A',
    sources: ['die Schule, die Schulen','der Kurs, die Kurse','die Frage, die Fragen','die Antwort, die Antworten','die Zeit','der Termin, die Termine','der Tag, die Tage','die Woche, die Wochen','das Wochenende, die Wochenenden','heute','morgen','jetzt','später','hier','lernen','sprechen','verstehen','fragen','antworten'],
  },
  {
    id: 'de-id-a1-kata-layanan-transaksi',
    name: 'Jerman A1 · Kata Layanan & Transaksi',
    summary: 'Bantuan, masalah, uang, harga, pembayaran, dan belanja dasar.',
    description: 'Kosakata A1 untuk meminta bantuan, menjelaskan masalah, berbelanja, dan menangani pembayaran sederhana.',
    category: 'sehari-hari', color: '#8A6845',
    sources: ['das Problem, die Probleme','die Hilfe','das Geld','der Preis, die Preise','die Rechnung, die Rechnungen','der Supermarkt, die Supermärkte','brauchen','kaufen','bezahlen','helfen'],
  },
  {
    id: 'de-id-a1-kata-tubuh-kesehatan',
    name: 'Jerman A1 · Kata Tubuh & Kesehatan',
    summary: 'Dokter, apotek, kondisi tubuh, dan kebutuhan kesehatan paling dasar.',
    description: 'Kosakata A1 untuk mengenali layanan kesehatan dan menyebut kondisi tubuh sederhana.',
    category: 'sehari-hari', color: '#8A5555',
    sources: ['die Apotheke, die Apotheken','der Arzt, die Ärzte','die Ärztin, die Ärztinnen','krank','müde'],
  },
  {
    id: 'de-id-a1-kata-sifat-keadaan',
    name: 'Jerman A1 · Kata Sifat & Keadaan',
    summary: 'Ukuran, kualitas, harga, kondisi, dan penilaian sederhana.',
    description: 'Adjektiva A1 untuk mendeskripsikan orang, benda, keadaan, harga, dan ketepatan informasi.',
    category: 'sehari-hari', color: '#766187',
    sources: ['gut','schlecht','klein','groß','neu','alt','teuer','billig','frei','wichtig','richtig','falsch'],
  },
];

const existingDestinations: Record<string, string> = {
  'die Wohnung, die Wohnungen': 'de-id-a1-kata-rumah-diri', 'das Zimmer, die Zimmer': 'de-id-a1-kata-rumah-diri', 'die Küche, die Küchen': 'de-id-a1-kata-rumah-diri', 'das Bad, die Bäder': 'de-id-a1-kata-rumah-diri', 'der Schlüssel, die Schlüssel': 'de-id-a1-kata-rumah-diri', wohnen: 'de-id-a1-kata-rumah-diri', öffnen: 'de-id-a1-kata-rumah-diri', schließen: 'de-id-a1-kata-rumah-diri',
  'die Stadt, die Städte': 'de-id-a1-kata-transportasi-layanan', 'der Bahnhof, die Bahnhöfe': 'de-id-a1-kata-transportasi-layanan', 'die Haltestelle, die Haltestellen': 'de-id-a1-kata-transportasi-layanan', 'die Straße, die Straßen': 'de-id-a1-kata-transportasi-layanan', dort: 'de-id-a1-kata-transportasi-layanan', links: 'de-id-a1-kata-transportasi-layanan', rechts: 'de-id-a1-kata-transportasi-layanan', geradeaus: 'de-id-a1-kata-transportasi-layanan', kommen: 'de-id-a1-kata-transportasi-layanan', gehen: 'de-id-a1-kata-transportasi-layanan', fahren: 'de-id-a1-kata-transportasi-layanan', suchen: 'de-id-a1-kata-transportasi-layanan', finden: 'de-id-a1-kata-transportasi-layanan', warten: 'de-id-a1-kata-transportasi-layanan',
  'die Arbeit': 'de-id-a1-kata-profesi', 'der Beruf, die Berufe': 'de-id-a1-kata-profesi', arbeiten: 'de-id-a1-kata-profesi',
  'das Wasser': 'de-id-a1-kata-makanan-minuman', 'das Brot, die Brote': 'de-id-a1-kata-makanan-minuman', 'das Gemüse': 'de-id-a1-kata-makanan-minuman', 'das Obst': 'de-id-a1-kata-makanan-minuman', 'der Kaffee': 'de-id-a1-kata-makanan-minuman', essen: 'de-id-a1-kata-makanan-minuman', trinken: 'de-id-a1-kata-makanan-minuman', hungrig: 'de-id-a1-kata-makanan-minuman', durstig: 'de-id-a1-kata-makanan-minuman',
};

const pairKey = (entry: Entry) => `${entry.sourceText.normalize('NFKC').trim().toLocaleLowerCase('de-DE')}\0${entry.translatedText.normalize('NFKC').trim().toLocaleLowerCase('id-ID')}`;

/** Retires the mixed-theme A1 word umbrella while preserving every one of its entries. */
export function restructureGermanA1Decks(decks: StarterDeck[]): StarterDeck[] {
  const core = decks.find((deck) => deck.id === 'de-id-a1-kata-inti');
  if (!core) return decks;
  const entries = new Map(core.file.deck.entries.map((entry) => [entry.sourceText, entry]));
  const allocated = new Set<string>();
  const take = (sources: readonly string[]) => sources.map((source) => {
    const entry = entries.get(source);
    if (!entry) throw new Error(`Materi Kata Inti tidak ditemukan: ${source}`);
    if (allocated.has(source)) throw new Error(`Materi Kata Inti dialokasikan dua kali: ${source}`);
    allocated.add(source); return entry;
  });

  const additions = new Map<string, Entry[]>();
  for (const [source, destination] of Object.entries(existingDestinations)) additions.set(destination, [...(additions.get(destination) ?? []), ...take([source])]);
  const updated = decks.filter((deck) => deck.id !== core.id).map((deck) => {
    const added = additions.get(deck.id);
    if (!added) return deck;
    const seen = new Set(deck.file.deck.entries.map(pairKey));
    const unique = added.filter((entry) => !seen.has(pairKey(entry)) && seen.add(pairKey(entry)));
    return { ...deck, version: Math.max(deck.version + 1, 3), file: { ...deck.file, deck: { ...deck.file.deck, entries: [...deck.file.deck.entries, ...unique] } } };
  });
  const created: StarterDeck[] = plans.map((plan) => ({
    id: plan.id, version: 1, level: 'pemula', category: plan.category, featured: true, summary: plan.summary,
    file: { format: 'lingolog.deck', version: 1, exportedAt: '2026-07-27T00:00:00.000Z', deck: { name: plan.name, description: plan.description, sourceLanguage: 'de-DE', targetLanguage: 'id-ID', color: plan.color, contentType: 'word', entries: take(plan.sources) } },
  }));
  if (allocated.size !== entries.size) throw new Error(`Redistribusi Kata Inti tidak lengkap: ${allocated.size}/${entries.size}.`);
  return [...updated, ...created];
}
