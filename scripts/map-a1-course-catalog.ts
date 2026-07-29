import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { starterDecks } from '../src/features/starter-decks/catalog';

const root = resolve(import.meta.dirname, '..');
const inventoryPath = resolve(root, 'docs/content/a1-lern-deutsch-jetzt-inventory.tsv');
const outputPath = resolve(root, 'docs/content/a1-lern-deutsch-jetzt-mapping.tsv');
const corePath = resolve(root, 'docs/content/a1-kata-inti-redistribution.tsv');

type Row = Record<string, string>;
const parseTsv = (text: string): Row[] => {
  const [header, ...lines] = text.trim().split(/\r?\n/).map((line) => line.split('\t'));
  return lines.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])));
};
const tsv = (rows: Row[], columns: string[]) => [columns.join('\t'), ...rows.map((row) => columns.map((column) => (row[column] ?? '').replace(/[\t\r\n]+/g, ' ')).join('\t'))].join('\n') + '\n';
const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase('de-DE').replace(/[…]/g, '…').replace(/[\p{P}\p{S}\s]+/gu, '');
const headwords = (value: string) => {
  const values = new Set([value, ...value.split(/\s+\/\s+|\s+[–—-]\s+|,\s+(?=(?:die|der|das)\b)/i)]);
  for (const part of [...values]) {
    values.add(part.replace(/,.*$/, '').trim());
    values.add(part.replace(/^(der|die|das)\s+/i, '').trim());
  }
  return new Set([...values].map(normalize).filter(Boolean));
};

const targets: Record<string, { word: string; phrase: string; sentence: string }> = {
  '1': { word: 'de-id-a1-kata-identitaet-familie', phrase: 'de-id-a1-frasa-perkenalan-identitaet', sentence: 'de-id-a1-kalimat-nyata' },
  '2': { word: 'de-id-a1-kata-rutinitas-waktu-belajar', phrase: 'de-id-a1-frasa-rutinitas-janji', sentence: 'de-id-a1-kalimat-nyata' },
  '3': { word: 'de-id-a1-kata-rumah-diri', phrase: 'de-id-a1-frasa-rumah-lingkungan', sentence: 'de-id-a1-kalimat-nyata' },
  '4': { word: 'de-id-a1-kata-identitaet-familie', phrase: 'de-id-a1-frasa-keluarga-orang', sentence: 'de-id-a1-kalimat-nyata' },
  '5': { word: 'de-id-a1-kata-profesi', phrase: 'de-id-a1-frasa-pekerjaan', sentence: 'de-id-a1-kalimat-nyata' },
  '6': { word: 'de-id-a1-kata-makanan-minuman', phrase: 'de-id-a1-frasa-restoran-belanja', sentence: 'de-id-a1-kalimat-nyata' },
  '7': { word: 'de-id-a1-kata-pakaian-warna', phrase: 'de-id-a1-frasa-pakaian-belanja', sentence: 'de-id-a1-kalimat-nyata' },
  '8': { word: 'de-id-a1-kata-tubuh-kesehatan', phrase: 'de-id-a1-frasa-dokter-apotek', sentence: 'de-id-a1-kalimat-nyata' },
  '9': { word: 'de-id-a1-kata-hobi', phrase: 'de-id-a1-frasa-hobi', sentence: 'de-id-a1-kalimat-pengalaman-perjalanan' },
  '10': { word: 'de-id-a1-kata-transportasi-layanan', phrase: 'de-id-a1-frasa-perjalanan-bantuan', sentence: 'de-id-a1-kalimat-pengalaman-perjalanan' },
};

const inventory = parseTsv(readFileSync(inventoryPath, 'utf8'));
const a1Decks = starterDecks.filter((starter) => /\bA1\b/.test(starter.file.deck.name));
const installedIds = new Set(a1Decks.map((deck) => deck.id));
const catalogEntries = a1Decks.flatMap((starter) => starter.file.deck.entries.map((entry) => ({ deckId: starter.id, deckName: starter.file.deck.name, ...entry, normalized: normalize(entry.sourceText), heads: headwords(entry.sourceText) })));
const occurrences = new Map<string, number>();
for (const row of inventory) occurrences.set(`${row.material_type}\0${normalize(row.german)}`, (occurrences.get(`${row.material_type}\0${normalize(row.german)}`) ?? 0) + 1);

const mapping = inventory.map((row) => {
  const type = row.material_type as 'word' | 'phrase' | 'sentence';
  const normalizedSource = normalize(row.german);
  const sourceHeads = headwords(row.german);
  const exact = catalogEntries.filter((entry) => entry.type === type && entry.normalized === normalizedSource);
  const related = exact.length ? exact : catalogEntries.filter((entry) => entry.type === type && [...sourceHeads].some((head) => entry.heads.has(head)));
  const targetDeckId = targets[row.chapter][type];
  let decision = exact.length ? 'EXACT_SOURCE_MATCH' : related.length ? 'HEADWORD_OR_VARIANT_MATCH' : installedIds.has(targetDeckId) ? 'ADD_TO_EXISTING_DECK' : 'ADD_TO_NEW_DECK';
  const flags: string[] = [];
  if ((occurrences.get(`${type}\0${normalizedSource}`) ?? 0) > 1) flags.push('REPEATED_IN_BOOK');
  if (related.length > 1) flags.push('MULTIPLE_CATALOG_MATCHES');
  if (row.note) flags.push('NEEDS_EDITORIAL_REVIEW');
  if (/…|\?$/.test(row.german) && type !== 'word') flags.push('PATTERN_OR_PLACEHOLDER');
  return {
    chapter: row.chapter, pdf_pages: row.pdf_pages, section: row.section, source_kind: row.source_kind,
    material_type: type, german: row.german, normalized_source: normalizedSource, decision,
    existing_deck_ids: [...new Set(related.map((entry) => entry.deckId))].join('|'),
    existing_source_texts: [...new Set(related.map((entry) => entry.sourceText))].join(' | '),
    proposed_target_deck_id: targetDeckId, review_flags: flags.join('|'), source_note: row.note,
  };
});

const core = starterDecks.find((starter) => starter.id === 'de-id-a1-kata-inti');
if (!core) throw new Error('Deck de-id-a1-kata-inti tidak ditemukan.');
const coreGroups: { id: string; name: string; entries: string[] }[] = [
  { id: 'de-id-a1-kata-identitaet-familie', name: 'Identitas & Keluarga', entries: ['der Name','der Vorname','der Nachname','die Adresse','die Telefonnummer','das Land','die Sprache','die Familie','der Freund','die Freundin','die Eltern','der Vater','die Mutter','der Bruder','die Schwester','das Kind'] },
  { id: 'de-id-a1-kata-rumah-diri', name: 'Rumah & Diri', entries: ['die Wohnung','das Zimmer','die Küche','das Bad','der Schlüssel','wohnen','öffnen','schließen'] },
  { id: 'de-id-a1-kata-transportasi-layanan', name: 'Transportasi & Layanan Kota', entries: ['die Stadt','der Bahnhof','die Haltestelle','die Straße','dort','links','rechts','geradeaus','kommen','gehen','fahren','suchen','finden','warten'] },
  { id: 'de-id-a1-kata-tubuh-kesehatan', name: 'Tubuh & Kesehatan', entries: ['die Apotheke','der Arzt','die Ärztin','krank','müde'] },
  { id: 'de-id-a1-kata-profesi', name: 'Profesi & Tempat Kerja', entries: ['die Arbeit','der Beruf','arbeiten'] },
  { id: 'de-id-a1-kata-rutinitas-waktu-belajar', name: 'Rutinitas, Waktu & Belajar', entries: ['die Schule','der Kurs','die Frage','die Antwort','die Zeit','der Termin','der Tag','die Woche','das Wochenende','heute','morgen','jetzt','später','hier','lernen','sprechen','verstehen','fragen','antworten'] },
  { id: 'de-id-a1-kata-layanan-transaksi', name: 'Layanan & Transaksi', entries: ['das Problem','die Hilfe','das Geld','der Preis','die Rechnung','der Supermarkt','brauchen','kaufen','bezahlen','helfen'] },
  { id: 'de-id-a1-kata-makanan-minuman', name: 'Makanan & Minuman', entries: ['das Wasser','das Brot','das Gemüse','das Obst','der Kaffee','essen','trinken','hungrig','durstig'] },
  { id: 'de-id-a1-kata-sifat-keadaan', name: 'Sifat & Keadaan', entries: ['gut','schlecht','klein','groß','neu','alt','teuer','billig','frei','wichtig','richtig','falsch'] },
];
const redistribution = core.file.deck.entries.map((entry) => {
  const source = entry.sourceText.replace(/,.*$/, '');
  const target = coreGroups.find((group) => group.entries.includes(source));
  if (!target) throw new Error(`Tujuan materi inti tidak ditemukan: ${entry.sourceText}`);
  return { old_deck_id: core.id, source_text: entry.sourceText, translated_text: entry.translatedText, material_type: entry.type, proposed_target_deck_id: target.id, proposed_target_name: target.name, action: installedIds.has(target.id) ? 'MERGE_INTO_EXISTING' : 'MOVE_TO_NEW_DECK' };
});

mkdirSync(resolve(root, 'docs/content'), { recursive: true });
writeFileSync(outputPath, tsv(mapping, ['chapter','pdf_pages','section','source_kind','material_type','german','normalized_source','decision','existing_deck_ids','existing_source_texts','proposed_target_deck_id','review_flags','source_note']));
writeFileSync(corePath, tsv(redistribution, ['old_deck_id','source_text','translated_text','material_type','proposed_target_deck_id','proposed_target_name','action']));

const count = (key: string) => mapping.filter((row) => row.decision === key).length;
const targetCounts = Object.entries(mapping.reduce<Record<string, number>>((result, row) => ({ ...result, [row.proposed_target_deck_id]: (result[row.proposed_target_deck_id] ?? 0) + 1 }), {})).sort(([a], [b]) => a.localeCompare(b));
console.log(JSON.stringify({ inventory: mapping.length, exactSource: count('EXACT_SOURCE_MATCH'), variant: count('HEADWORD_OR_VARIANT_MATCH'), addExisting: count('ADD_TO_EXISTING_DECK'), addNew: count('ADD_TO_NEW_DECK'), repeated: mapping.filter((row) => row.review_flags.includes('REPEATED_IN_BOOK')).length, editorialReview: mapping.filter((row) => row.review_flags.includes('NEEDS_EDITORIAL_REVIEW')).length, coreEntries: redistribution.length, targets: targetCounts }, null, 2));
