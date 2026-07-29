# Tahap 2 — Pemetaan Buku A1 dan Restrukturisasi Katalog

Tanggal: 27 Juli 2026

Tahap ini memetakan seluruh 960 rekaman sumber dari `Lern Deutsch jetzt!` terhadap katalog A1 Lingolog dan menyiapkan pembongkaran deck payung `Jerman A1 · Kata Inti`.

## Artefak

```text
docs/content/a1-lern-deutsch-jetzt-mapping.tsv
docs/content/a1-kata-inti-redistribution.tsv
scripts/map-a1-course-catalog.ts
```

Regenerasi:

```bash
npx tsx scripts/map-a1-course-catalog.ts
```

## Hasil pemetaan awal

| Keputusan otomatis | Jumlah | Arti |
|---|---:|---|
| `EXACT_SOURCE_MATCH` | 66 | Bentuk sumber Jerman dan kategori sama persis dengan materi katalog A1. Terjemahan tetap perlu dibandingkan secara editorial. |
| `HEADWORD_OR_VARIANT_MATCH` | 5 | Headword/varian ditemukan, tetapi bentuk lengkap berbeda. |
| `ADD_TO_EXISTING_DECK` | 491 | Belum ditemukan dan tema tujuan sudah memiliki deck katalog. |
| `ADD_TO_NEW_DECK` | 398 | Belum ditemukan dan membutuhkan deck tematik baru yang direncanakan. |
| **Total** | **960** | Semua rekaman tahap 1 memiliki status dan tujuan. |

Flag lintas keputusan:

```text
158 rekaman merupakan pengulangan identik di dalam buku
87 rekaman memerlukan pemeriksaan editorial karena catatan sumber,
   beberapa kandidat cocok ke lebih dari satu materi katalog,
   atau memakai pola/placeholder
```

Pencocokan ini sengaja konservatif. Tanda baca dan kapitalisasi dinormalisasi untuk pencarian, tetapi padanan makna tidak dinyatakan otomatis sebagai kecocokan. Karena itu, angka “akan ditambahkan” adalah antrean editorial, bukan jumlah kartu final.

## Deck tujuan

### Deck yang sudah ada

- `de-id-a1-kata-rumah-diri`
- `de-id-a1-kata-profesi`
- `de-id-a1-kata-makanan-minuman`
- `de-id-a1-kata-hobi`
- `de-id-a1-kata-transportasi-layanan`
- `de-id-a1-frasa-pekerjaan`
- `de-id-a1-frasa-restoran-belanja`
- `de-id-a1-frasa-hobi`
- `de-id-a1-frasa-perjalanan-bantuan`
- `de-id-a1-kalimat-nyata`

### Deck baru yang direncanakan

- Kata Identitas & Keluarga
- Kata Rutinitas, Waktu & Belajar
- Kata Layanan & Transaksi
- Kata Pakaian & Warna
- Kata Tubuh & Kesehatan
- Kata Sifat & Keadaan
- Frasa Perkenalan & Identitas
- Frasa Rutinitas & Janji
- Frasa Rumah & Lingkungan
- Frasa Keluarga & Mendeskripsikan Orang
- Frasa Pakaian & Belanja
- Frasa Dokter & Apotek
- Kalimat Pengalaman & Perjalanan

Daftar tersebut merupakan rancangan editorial. Deck hanya dibuat jika hasil deduplikasi menyisakan cakupan yang cukup dan natural. Deck kecil dapat digabung tanpa mengubah provenance pemetaan.

## Pembongkaran “Kata Inti”

Seluruh **96 materi** telah memiliki satu tujuan utama:

| Tujuan | Jumlah | Tindakan |
|---|---:|---|
| Identitas & Keluarga | 16 | Deck baru |
| Rumah & Diri | 8 | Gabung deck lama |
| Transportasi & Layanan Kota | 14 | Gabung deck lama |
| Tubuh & Kesehatan | 5 | Deck baru |
| Profesi & Tempat Kerja | 3 | Gabung deck lama |
| Rutinitas, Waktu & Belajar | 19 | Deck baru |
| Layanan & Transaksi | 10 | Deck baru |
| Makanan & Minuman | 9 | Gabung deck lama |
| Sifat & Keadaan | 12 | Deck baru |

Peta baris demi baris tersedia di `a1-kata-inti-redistribution.tsv`. Tidak ada materi yang dibiarkan tanpa tujuan.

## Kebijakan implementasi

Deck `de-id-a1-kata-inti` **belum dihapus dari source katalog pada tahap pemetaan**. Penghapusan sebelum entri tujuan ditulis akan mengurangi 96 materi dan dapat menimbulkan kehilangan cakupan. Implementasi dilakukan setelah pemeriksaan editorial, dengan aturan:

1. materi dipindahkan atau digabung ke deck tujuan;
2. pasangan duplikat lintas deck diselesaikan;
3. deck lama dikeluarkan dari katalog aktif;
4. salinan lokal pengguna tidak diubah;
5. seluruh katalog lolos kontrak kategori tunggal dan keunikan pasangan.

## Arti kolom matriks utama

```text
chapter, pdf_pages, section, source_kind
material_type, german, normalized_source
decision
existing_deck_ids, existing_source_texts
proposed_target_deck_id
review_flags, source_note
```

`existing_deck_ids` menunjukkan lokasi kandidat katalog yang ditemukan. `proposed_target_deck_id` menunjukkan tempat tematik ideal dan tidak otomatis berarti entri akan ditambahkan. Entri berulang, pola tata bahasa, fragment, dan materi di atas lingkup A1 dapat ditolak pada kurasi akhir.

## Kelanjutan editorial

Urutan aman berikutnya:

1. tinjau 71 kecocokan exact/varian dan tandai `KEEP`, `CORRECT`, atau `RELOCATE`;
2. gabungkan 158 pengulangan buku;
3. verifikasi 87 rekaman ber-flag;
4. deduplikasi semantik 889 kandidat yang belum cocok;
5. verifikasi artikel, jamak, infinitif, register, dan terjemahan;
6. tulis deck tujuan dan pensiunkan Kata Inti;
7. hasilkan laporan cakupan per bab serta paket `com.lingolog.german.a1`.
