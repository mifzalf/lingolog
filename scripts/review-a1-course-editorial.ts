import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
type Row = Record<string, string>;
const parse = (path: string): Row[] => {
  const [header, ...lines] = readFileSync(resolve(root, path), 'utf8').trim().split(/\r?\n/).map((line) => line.split('\t'));
  return lines.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])));
};
const serialize = (rows: Row[], columns: string[]) => [columns.join('\t'), ...rows.map((row) => columns.map((column) => (row[column] ?? '').replace(/[\t\r\n]+/g, ' ')).join('\t'))].join('\n') + '\n';
const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase('de-DE').replace(/[\p{P}\p{S}\s]+/gu, '');

const mapping = parse('docs/content/a1-lern-deutsch-jetzt-mapping.tsv');
const first = new Map<string, number>();

const corrections: Record<string, { text: string; decision: string; note: string; reference: string }> = {
  'hängen (Bewegung)': { text: 'hängen', decision: 'REVIEW_USAGE', note: 'Jangan jadikan label “(Bewegung)” sebagai kartu. Bedakan hängen sebagai verba transitif “menggantungkan” dan hängen sebagai keadaan “tergantung” melalui contoh.', reference: 'Duden/DWDS' },
  'die Stecknadel': { text: 'die Stecknadel, die Stecknadeln', decision: 'CORRECT_AND_ADD', note: 'Artikel baku feminin; sumber tercetak/OCR memberi bentuk das. Tambahkan bentuk jamak.', reference: 'Duden: Stecknadel' },
  'die Zucchini': { text: 'die Zucchini, die Zucchini', decision: 'CORRECT_AND_ADD', note: 'Bentuk baku umum feminin; der Zucchini hanya varian Austria informal menurut Duden.', reference: 'Duden: Zucchini' },
  'die Paprika': { text: 'die Paprika, die Paprikas', decision: 'REVIEW_MEANING', note: 'Untuk sayuran konkret, “die Paprika/Paprikaschote” dapat dipakai; bedakan dari rempah Paprika tanpa jamak.', reference: 'Duden: Paprikaschote; DWDS: Paprika' },
  'die Schokolade': { text: 'die Schokolade, die Schokoladen', decision: 'RELOCATE_AND_ADD', note: 'Pertahankan sebagai makanan/manisan, bukan minuman. Posisi kolom sumber merupakan artefak layout.', reference: 'Duden/DWDS: Schokolade' },
  'der Rock': { text: 'der Rock, die Röcke', decision: 'MERGE_BOOK_DUPLICATE', note: 'Pertahankan satu kali pada pakaian bagian bawah; kemunculan di Oberteile merupakan salah klasifikasi sumber.', reference: 'Duden/DWDS: Rock' },
  'acht': { text: 'acht', decision: 'ADD_FROM_CONTEXT', note: 'Pertahankan untuk melengkapi urutan 0–20; tidak tampak pada ekstraksi daftar tetapi jelas termasuk lingkup angka A1.', reference: 'Goethe A1 Wortliste: Zahlen' },
  'der Zucchini': { text: 'die Zucchini, die Zucchini', decision: 'CORRECT_AND_ADD', note: 'Koreksi artikel dari bentuk sumber menjadi bentuk baku umum feminin.', reference: 'Duden: Zucchini' },
};

const reviewed = mapping.map((row, index) => {
  const occurrenceKey = `${row.material_type}\0${normalize(row.german)}`;
  const original = first.get(occurrenceKey);
  if (original === undefined) first.set(occurrenceKey, index + 1);
  const correction = corrections[row.german];
  let editorialDecision = '';
  let canonicalGerman = correction?.text ?? row.german;
  let editorialNote = correction?.note ?? '';
  let references = correction?.reference ?? '';
  if (correction) editorialDecision = correction.decision;
  else if (/…/.test(row.german)) { editorialDecision = 'KEEP_AS_PATTERN_ONLY'; editorialNote = 'Berguna sebagai pola Redemittel, tetapi jangan dimasukkan sebagai kartu final sebelum placeholder diisi dengan contoh natural.'; }
  else if (/^(Wie|Wer|Wo|Woher|Was)\?$/.test(row.german)) { editorialDecision = 'NOT_STANDALONE_CARD'; editorialNote = 'Kata tanya tanpa konteks tidak layak menjadi kartu kalimat; dapat dipertahankan sebagai kosakata bila deck kata membutuhkannya.'; }
  else if (original !== undefined) { editorialDecision = 'MERGE_BOOK_DUPLICATE'; editorialNote = `Gabungkan dengan rekaman sumber pertama baris data ${original}.`; }
  else if (/^(der|die|das)\s/.test(row.german) && row.material_type === 'phrase') { editorialDecision = 'RECLASSIFY_AS_WORD'; editorialNote = 'Nomina berartikel salah terklasifikasi sebagai frasa akibat heuristik inventaris; perlakukan sebagai kata dan tambahkan jamak jika relevan.'; }
  else if (row.decision === 'EXACT_SOURCE_MATCH') { editorialDecision = 'KEEP_EXISTING'; editorialNote = 'Bentuk Jerman dan kategori telah tersedia; bandingkan arti Indonesia saat implementasi, jangan menambah kartu baru.'; }
  else if (row.decision === 'HEADWORD_OR_VARIANT_MATCH') { editorialDecision = 'REVIEW_EXISTING_VARIANT'; editorialNote = 'Bandingkan bentuk dan fungsi dengan materi katalog yang ditemukan; gabungkan jika maknanya sama.'; }
  else editorialDecision = 'VERIFY_BEFORE_ADD';
  if (!references) references = row.material_type === 'word' ? 'Goethe A1 Wortliste; Duden/DWDS' : 'Goethe A1 Wortliste; Deutsche Welle Nicos Weg A1';
  return { ...row, canonical_german: canonicalGerman, editorial_decision: editorialDecision, editorial_note: editorialNote, editorial_references: references };
});

const columns = ['chapter','pdf_pages','section','source_kind','material_type','german','canonical_german','editorial_decision','editorial_note','editorial_references','decision','existing_deck_ids','existing_source_texts','proposed_target_deck_id','review_flags','source_note'];
writeFileSync(resolve(root, 'docs/content/a1-lern-deutsch-jetzt-editorial-review.tsv'), serialize(reviewed, columns));
const counts = reviewed.reduce<Record<string, number>>((result, row) => ({ ...result, [row.editorial_decision]: (result[row.editorial_decision] ?? 0) + 1 }), {});
console.log(JSON.stringify({ records: reviewed.length, decisions: Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))) }, null, 2));
