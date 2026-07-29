# Inventarisasi A1 — Lern Deutsch jetzt!

Tanggal inventarisasi: 27 Juli 2026  
Sumber lokal berizin: `/home/mifzal/Data/ausbildung/[A1] Lern Deutsch jetzt!.pdf`

> PDF sumber tidak disalin ke repository. Dokumen ini dan TSV turunannya hanya menjadi peta editorial internal berdasarkan izin yang dinyatakan pemilik proyek. Penggunaan kembali tetap harus mengikuti ruang lingkup izin pemegang hak cipta.

## Hasil tahap 1

Buku memiliki 300 halaman dan sepuluh bab. Setiap bab memiliki halaman `Lernwortschatz`; materi komunikasi utama terdapat pada halaman `Redemittel und Grammatik`. Inventaris pertama menghasilkan **960 rekaman sumber**:

```text
738 rekaman Lernwortschatz
222 rekaman Redemittel

262 kandidat kata
472 kandidat frasa
226 kandidat kalimat
```

Jumlah tersebut adalah **rekaman sumber**, bukan jumlah final materi katalog. Terdapat 85 kemunculan ulang secara identik antarbab/antara Lernwortschatz dan Redemittel. Bentuk alternatif yang dipisahkan garis miring, pasangan Perfekt, serta pola dengan elipsis masih dipertahankan sebagai satu rekaman sampai tahap pemetaan dan verifikasi editorial.

File inventaris lengkap:

```text
docs/content/a1-lern-deutsch-jetzt-inventory.tsv
```

Kolom TSV:

```text
chapter
pdf_pages
section
source_kind
material_type
german
note
```

Inventaris dapat diregenerasi secara deterministik dari daftar yang telah diperiksa dengan:

```bash
python3 scripts/extract-a1-course-inventory.py
```

## Cakupan per bab

| Bab | Tema | Halaman daftar yang diperiksa | Rekaman |
|---:|---|---:|---:|
| 1 | Perkenalan, identitas, bahasa, angka, sapaan | 17–18 | 90 |
| 2 | Aktivitas harian, waktu, janji, tanggal | 38–39 | 61 |
| 3 | Rumah, perabot, lingkungan, preposisi | 61–62 | 60 |
| 4 | Keluarga, teman, aktivitas, sifat | 95–97 | 103 |
| 5 | Profesi, tempat kerja, tugas, bantuan, waktu kerja | 116–117 | 83 |
| 6 | Makanan, minuman, restoran, belanja | 137–139 | 132 |
| 7 | Pakaian, warna, musim, pembelian pakaian | 171–173 | 142 |
| 8 | Tubuh, kesehatan, obat, dokter | 189–190 | 62 |
| 9 | Hobi, Perfekt, tempat, pengalaman | 204–206 | 110 |
| 10 | Perjalanan, cuaca, orientasi, kartu pos | 225–227 | 117 |

## Metode pemindaian

1. Metadata dan teks seluruh PDF diekstrak dengan Poppler.
2. Posisi seluruh halaman `Lernwortschatz` dan `Redemittel und Grammatik` dipetakan.
3. Halaman daftar dengan layout dua kolom diperiksa ulang melalui render halaman dan OCR Jerman/Inggris.
4. Artefak ekstraksi seperti karakter zero-width, umlaut yang rusak, dan pemisahan kolom dibersihkan.
5. Materi dicatat bersama bab, halaman, subtema, dan asal `Lernwortschatz` atau `Redemittel`.
6. Kesalahan atau klasifikasi meragukan dari buku tidak langsung dianggap benar; kandidat ditandai untuk tahap editorial.

## Temuan sumber yang harus diverifikasi pada tahap berikutnya

Beberapa bentuk dalam sumber memerlukan koreksi atau keputusan editorial, antara lain:

- Angka `acht` tidak terbaca/tercetak pada daftar 0–20, tetapi jelas menjadi bagian rentang materi.
- `hängen (Bewegung)` perlu dibedakan dari penggunaan posisi dan bentuk transitif yang tepat.
- `die Schokolade` berada di kolom minuman, padahal secara leksikal merupakan makanan; kemungkinan layout kolom.
- `der Rock` juga muncul pada kelompok Oberteile, kemungkinan salah klasifikasi.
- Sumber mencetak `das Stecknadel`; bentuk baku adalah `die Stecknadel`.
- `die Termin` harus diperiksa dan dikoreksi menjadi `der Termin`.
- `der Zucchini`, `der Paprika`, dan beberapa artikel lain perlu diperiksa terhadap penggunaan baku/varian regional.
- Bentuk jamak kata benda tidak konsisten: sebagian dicantumkan, sebagian tidak.
- Daftar pakaian sangat rinci dan beberapa item mungkin berada di atas kebutuhan inti A1 meskipun tetap termasuk inventaris buku.
- Contoh Perfekt memuat bentuk tanpa objek atau artikel, misalnya `sie hat Buch gelesen`; contoh final tidak boleh disalin tanpa koreksi.
- Beberapa Redemittel memuat placeholder `…`; tahap pemetaan harus menentukan apakah dijadikan pola frasa atau contoh kalimat konkret.

## Batas tahap 1

Tahap ini memastikan halaman daftar utama telah dipetakan dan setiap itemnya memiliki rekaman kerja. Tahap ini **belum**:

- menerjemahkan materi ke Bahasa Indonesia;
- membandingkan kandidat dengan 2.941 materi katalog Lingolog;
- menggabungkan sinonim atau varian;
- menambahkan artikel/bentuk jamak yang hilang;
- memutuskan deck tujuan;
- melakukan verifikasi kamus eksternal per entri;
- mengubah source katalog aplikasi.

## Tahap berikutnya

Tahap 2 akan menghasilkan matriks pemetaan:

```text
sudah ada di katalog
perlu koreksi pada materi lama
tambahkan ke deck yang ada
buat deck baru
kemunculan ulang/duplikat
bukan kartu mandiri
perlu verifikasi editorial
```

Pemetaan harus memakai bentuk ternormalisasi dan makna, bukan hanya kesamaan string, serta tetap menjaga kategori deck Kata/Frasa/Kalimat.
