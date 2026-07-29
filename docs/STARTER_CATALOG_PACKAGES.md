# Paket Deck siap pakai

Lingolog dapat menambah atau memperbarui katalog tanpa membuat APK baru melalui file:

```text
*.lingolog-catalog.json
```

Impor dilakukan dari halaman **Deck siap pakai → Impor paket katalog**. Paket disimpan lokal dan tetap tersedia tanpa internet. Impor mengubah katalog, bukan deck lokal yang sudah dipasang, sehingga edit dan progres latihan pengguna tetap aman.

## Format versi 1

```json
{
  "format": "lingolog.catalog",
  "version": 1,
  "packageId": "com.lingolog.german.core",
  "packageVersion": 2,
  "name": "Katalog Jerman Inti",
  "publisher": "Lingolog",
  "createdAt": "2026-07-27T00:00:00.000Z",
  "decks": [
    {
      "id": "de-id-a1-contoh-kata",
      "version": 2,
      "level": "pemula",
      "category": "sehari-hari",
      "featured": false,
      "summary": "Kosakata contoh A1.",
      "file": {
        "format": "lingolog.deck",
        "version": 1,
        "exportedAt": "2026-07-27T00:00:00.000Z",
        "deck": {
          "name": "Jerman A1 · Kata Contoh",
          "description": "Deck contoh.",
          "sourceLanguage": "de-DE",
          "targetLanguage": "id-ID",
          "color": "#355A46",
          "contentType": "word",
          "entries": [
            {
              "type": "word",
              "sourceText": "das Beispiel, die Beispiele",
              "translatedText": "contoh",
              "notes": null,
              "exampleText": "Das ist ein Beispiel.",
              "exampleTranslation": "Itu adalah sebuah contoh.",
              "tags": ["a1"]
            }
          ]
        }
      }
    }
  ]
}
```

## Aturan versi

- `packageId` stabil untuk satu jalur paket.
- `packageVersion` wajib naik setiap file paket diterbitkan ulang.
- `deck.id` stabil selama deck masih merupakan deck yang sama.
- `deck.version` dinaikkan hanya ketika isi atau metadata deck tersebut berubah.
- Deck paket menggantikan representasi katalog dengan ID yang sama hanya jika `deck.version` lebih tinggi.
- Deck yang telah disalin ke Pustaka tidak ditimpa otomatis.

## Batas dan validasi

- Maksimal 20 MB per file.
- Maksimal 250 deck dan 50.000 materi per paket.
- ID hanya memakai huruf kecil ASCII, angka, titik, garis bawah, dan tanda hubung.
- Setiap deck wajib hanya berisi satu kategori: `word`, `phrase`, atau `sentence`.
- Pasangan bahasa sumber dan target harus berbeda.
- Field asing ditolak agar kesalahan editorial tidak diabaikan diam-diam.
- Paket dengan versi sama atau lebih lama ditolak.

## Keamanan tahap pertama

Versi pertama adalah impor lokal manual. Nilai `publisher` merupakan metadata dan belum membuktikan identitas penerbit. Jangan mengimpor file dari sumber yang tidak dipercaya. Tanda tangan digital paket resmi direncanakan sebelum distribusi katalog otomatis melalui internet.
