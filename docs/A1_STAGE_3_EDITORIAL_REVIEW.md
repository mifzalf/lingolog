# Tahap 3 — Verifikasi Editorial Buku A1

Tanggal: 27 Juli 2026

Tahap ini mengubah matriks pemetaan menjadi antrean editorial yang dapat diaudit. Semua 960 rekaman mendapat keputusan editorial awal, bentuk kanonis sementara, tujuan deck, dan rujukan verifikasi.

## Artefak

```text
docs/content/a1-lern-deutsch-jetzt-editorial-review.tsv
scripts/review-a1-course-editorial.ts
```

Regenerasi:

```bash
npm run content:a1:review
```

## Referensi yang digunakan

- Goethe-Zertifikat A1: Start Deutsch 1 — Wortliste, 29 halaman:  
  https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf
- Duden Online untuk artikel, bentuk jamak, dan bentuk baku:  
  https://www.duden.de/
- DWDS untuk makna, valensi, register, dan contoh korpus:  
  https://www.dwds.de/
- Deutsche Welle, Nicos Weg A1 untuk fungsi komunikasi dan kenaturalan konteks pemula:  
  https://learngerman.dw.com/de/nicos-weg/c-36519687

Goethe Wortliste dipakai sebagai bukti lingkup, bukan daftar yang harus disalin mentah. Duden/DWDS dipakai untuk keputusan leksikal. Materi buku tetap memiliki provenance bab dan halaman.

## Hasil keputusan editorial awal

| Keputusan | Jumlah | Perlakuan |
|---|---:|---|
| `KEEP_EXISTING` | 41 | Sudah ada dalam kategori yang sama; jangan tambah kartu baru. |
| `REVIEW_EXISTING_VARIANT` | 4 | Bandingkan varian dengan entri katalog sebelum digabung. |
| `MERGE_BOOK_DUPLICATE` | 83 | Kemunculan berikutnya digabung ke rekaman pertama, provenance tetap dapat dikumpulkan. |
| `KEEP_AS_PATTERN_ONLY` | 68 | Redemittel dengan `…`; tidak boleh langsung menjadi kartu final. |
| `NOT_STANDALONE_CARD` | 5 | Fragmen kata tanya satu kata yang salah diklasifikasi sebagai kalimat. |
| `RECLASSIFY_AS_WORD` | 334 | Nomina berartikel salah dianggap frasa oleh heuristik tahap 1. |
| `VERIFY_BEFORE_ADD` | 419 | Kandidat layak dilanjutkan, tetapi artikel/jamak/arti/register belum final. |
| Keputusan koreksi khusus | 6 | Koreksi atau relokasi eksplisit dijelaskan di bawah. |
| **Total** | **960** | Seluruh rekaman memperoleh keputusan. |

Enam keputusan khusus terdiri dari dua `CORRECT_AND_ADD`, satu `ADD_FROM_CONTEXT`, satu `RELOCATE_AND_ADD`, satu `REVIEW_MEANING`, dan satu `REVIEW_USAGE`.

## Koreksi sumber yang dikonfirmasi

### `die Stecknadel, die Stecknadeln`

Sumber/hasil ekstraksi memuat `das Stecknadel`. Duden mengonfirmasi artikel feminin dan jamak `die Stecknadeln`. Kandidat dikoreksi, bukan disalin apa adanya.

### `die Zucchini, die Zucchini`

Bentuk baku umum adalah feminin. Duden mencatat `der Zucchini` sebagai varian Austria informal. Untuk katalog Jerman umum digunakan `die Zucchini`.

### `die Schokolade, die Schokoladen`

Materi dipertahankan sebagai makanan/manisan. Penempatannya pada kolom minuman diperlakukan sebagai artefak layout halaman, bukan klasifikasi semantik.

### `der Rock, die Röcke`

Kemunculan di kelompok Oberteile tidak digunakan. Satu entri kanonis dipertahankan pada pakaian bagian bawah dan kemunculan kedua digabung.

### `acht`

Dipertahankan untuk melengkapi 0–20. Goethe A1 Wortliste secara eksplisit mencantumkan `8 = acht`; hilangnya bentuk pada hasil ekstraksi halaman buku tidak boleh menghasilkan lubang materi.

### `hängen`

Label sumber `hängen (Bewegung)` tidak dijadikan teks kartu. Tahap implementasi harus membedakan penggunaan transitif “menggantungkan” dari keadaan “tergantung” melalui arti dan contoh yang tepat.

### `die Paprika`

Masih berstatus `REVIEW_MEANING`: arti sayuran dapat memakai `die Paprika`/`die Paprikaschote`, sedangkan Paprika juga dapat menunjuk rempah. Terjemahan final harus menghilangkan ambiguitas.

## Perbaikan klasifikasi penting

Heuristik tahap 1 menganggap teks yang mengandung spasi sebagai frasa. Itu membuat nomina berartikel seperti `das Haus`, `die Salbe`, dan `der Bahnhof` salah masuk kategori frasa. Tahap 3 menandai **334 rekaman** sebagai `RECLASSIFY_AS_WORD`.

Aturan final:

```text
artikel + lemma (+ bentuk jamak) → word
verba infinitif → word
adjektiva/adverbia mandiri → word
unit komunikasi pendek → phrase
klausa/ujaran lengkap → sentence
pola dengan … → pola editorial, bukan kartu final
```

## Placeholder dan pola tata bahasa

Sebanyak 68 pola seperti berikut tidak akan dimasukkan mentah:

```text
Ich heiße …
Ich arbeite von … bis … Uhr.
Ich hätte gern …
Wie komme ich zu …?
Herzliche Grüße aus …
```

Pola tersebut boleh menjadi dasar penulisan contoh natural, tetapi kartu final harus berupa ujaran konkret atau frasa yang berguna tanpa menebak isi placeholder. Hal ini mencegah ekspansi template massal.

## Status verifikasi

Tahap ini menyelesaikan verifikasi struktural dan koreksi berisiko tinggi, tetapi **419 kandidat masih sengaja berstatus `VERIFY_BEFORE_ADD`**. Status tersebut berarti kandidat belum boleh dimasukkan ke paket rilis sampai hal berikut diperiksa:

1. artikel dan bentuk jamak kata benda;
2. infinitif dan bentuk Perfekt yang tepat;
3. arti Indonesia sesuai konteks buku;
4. register Jerman umum, bukan bentuk regional tanpa label;
5. kelayakan A1 dan kegunaan sebagai kartu;
6. keunikan makna terhadap katalog lama;
7. contoh komunikasi yang natural.

Tidak aman mengklaim 419 kandidat tersebut telah diverifikasi satu per satu hanya dari pencocokan otomatis. Matriks TSV menyediakan antrean eksplisit agar pekerjaan editorial berikutnya tidak kehilangan provenance atau mengulang audit.

## Gate menuju implementasi katalog

Materi dapat masuk Tahap 4 hanya jika:

- keputusan bukan `KEEP_AS_PATTERN_ONLY` atau `NOT_STANDALONE_CARD`;
- duplikat buku telah digabung;
- kategori final sudah benar;
- bentuk Jerman kanonis dan terjemahan Indonesia telah disetujui;
- tujuan deck tidak lagi berupa deck payung;
- tidak menghasilkan pasangan identik lintas deck;
- sumber verifikasi tercatat.

Deck `Jerman A1 · Kata Inti` tetap belum dihapus pada tahap ini. Penghapusan dilakukan bersamaan dengan penulisan semua deck tujuan agar tidak ada penurunan cakupan katalog.
