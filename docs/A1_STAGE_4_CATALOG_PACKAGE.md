# Tahap 4 — Restrukturisasi dan Paket Katalog Jerman A1

Tanggal: 27 Juli 2026

Tahap ini mengimplementasikan keputusan yang sudah aman dari Tahap 2–3: deck payung `Jerman A1 · Kata Inti` dipensiunkan, seluruh 96 materinya didistribusikan ke deck tematik, dan katalog A1 diekspor sebagai paket yang dapat diimpor.

## Hasil katalog A1

```text
19 deck
974 materi
15 deck lama menjadi 19 deck tematik
jumlah materi A1 tetap 974
```

Tidak ada materi Kata Inti yang hilang dan tidak ada materi baru dari 419 antrean `VERIFY_BEFORE_ADD` yang dimasukkan sebelum verifikasi per entri selesai.

## Redistribusi 96 materi Kata Inti

### Deck baru

| ID | Nama | Materi |
|---|---|---:|
| `de-id-a1-kata-identitas-keluarga` | Kata Identitas & Keluarga | 16 |
| `de-id-a1-kata-rutinitas-waktu-belajar` | Kata Rutinitas, Waktu & Belajar | 19 |
| `de-id-a1-kata-layanan-transaksi` | Kata Layanan & Transaksi | 10 |
| `de-id-a1-kata-tubuh-kesehatan` | Kata Tubuh & Kesehatan | 5 |
| `de-id-a1-kata-sifat-keadaan` | Kata Sifat & Keadaan | 12 |

### Deck lama yang diperluas

| ID | Sebelum | Sesudah | Tambahan |
|---|---:|---:|---:|
| `de-id-a1-kata-rumah-diri` | 60 | 68 | 8 |
| `de-id-a1-kata-profesi` | 60 | 63 | 3 |
| `de-id-a1-kata-makanan-minuman` | 60 | 69 | 9 |
| `de-id-a1-kata-transportasi-layanan` | 60 | 74 | 14 |

Total:

```text
62 materi → lima deck baru
34 materi → empat deck lama
96 materi → seluruh isi Kata Inti
```

Deck lama pengguna tidak dihapus atau diubah. Restrukturisasi hanya mengubah representasi katalog siap pakai. Pengguna yang pernah menyalin Kata Inti tetap memiliki deck lokal, mastery, histori, dan progresnya.

## Paket katalog

File yang dihasilkan:

```text
dist/catalogs/com.lingolog.german.a1-v1.lingolog-catalog.json
```

Metadata:

```text
format: lingolog.catalog
version: 1
packageId: com.lingolog.german.a1
packageVersion: 1
publisher: Lingolog
deck: 19
materi: 974
ukuran: 377852 byte
SHA-256: b93ae807748be3b4d70d5c7c42d51271033e35b0bbf52de8ff271f528bf0552e
```

Regenerasi:

```bash
npm run content:a1:package
```

Script:

```text
scripts/build-german-a1-catalog-package.ts
```

Paket melewati parser produksi `parseCatalogPackage()`, termasuk validasi format, kategori tunggal, batas deck, dan batas materi.

## Cakupan buku pada paket versi 1

Paket versi 1 adalah baseline katalog A1 yang telah direstrukturisasi. Paket ini **belum mengklaim memasukkan seluruh 960 rekaman buku**. Cakupan tahap pemetaan tetap tercatat sebagai berikut:

```text
41 KEEP_EXISTING
4 REVIEW_EXISTING_VARIANT
83 MERGE_BOOK_DUPLICATE
68 KEEP_AS_PATTERN_ONLY
5 NOT_STANDALONE_CARD
334 RECLASSIFY_AS_WORD
419 VERIFY_BEFORE_ADD
6 koreksi khusus
```

Kandidat buku yang belum lulus gate editorial tidak dimasukkan secara spekulatif. Setelah batch kandidat diverifikasi dan diterjemahkan, pembaruan diterbitkan dengan:

```text
packageVersion: 2 atau lebih tinggi
deck.version: naik hanya pada deck yang berubah
```

## Keputusan kategori final

- Nomina berartikel seperti `das Haus` tetap `word`.
- Artikel dan bentuk jamak merupakan informasi leksikal, bukan alasan menjadikannya frasa.
- Verba infinitif, adjektiva, adverbia, angka, dan kata tanya mandiri adalah `word`.
- Ekspresi multi-kata yang berfungsi sebagai unit komunikasi adalah `phrase`.
- Ujaran lengkap adalah `sentence`.
- Pola dengan `…` tidak dimasukkan mentah sebagai kartu final.

## Gate kualitas

Implementasi dianggap valid hanya jika:

- `de-id-a1-kata-inti` tidak lagi terdapat di katalog aktif;
- total materi seluruh katalog tetap 2.941;
- total materi A1 tetap 974;
- seluruh deck berkategori tunggal;
- pasangan Jerman–Indonesia unik lintas katalog;
- paket dapat diparse kembali;
- TypeScript, automated tests, migrasi, dan diff check lulus.
