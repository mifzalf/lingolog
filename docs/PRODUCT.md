# Lingolog — keputusan produk MVP

## Tujuan
Aplikasi mobile offline untuk mencatat, mendengar, mengelola, dan melatih kata/frasa/kalimat milik pengguna.

## Identitas visual
- Nama aplikasi: **Lingolog**.
- Tema: sistem, terang, atau gelap; preferensi disimpan lokal.
- Metafora visual: lembar catatan bahasa, garis buku samar, tinta, stabilo, dan anotasi pena.
- Font tulisan tangan hanya menjadi aksen. Teks materi belajar tetap memakai sans-serif yang jelas agar mendukung berbagai aksara.

## Keputusan
- React Native + Expo + TypeScript.
- Seluruh katalog lokal; tanpa akun, cloud, atau repositori publik.
- Satu deck memiliki tepat satu pasangan bahasa.
- Game MVP hanya **Kartu flash** dan **Dikte**.
- Tidak ada pilihan ganda. Materi game selalu berasal dari entri pengguna.
- Dikte toleran terhadap kapitalisasi, spasi, simbol, dan tanda baca, tetapi tidak menghapus diakritik/huruf bermakna (mis. ä, ö, ü, ß).
- Game adalah bahan belajar dan sumber statistik, bukan jadwal belajar wajib.
- Mastery dapat ditandai manual atau dicapai dari bukti statistik yang kuat. Grade dapat turun setelah kegagalan berulang.
- Kalender menampilkan (1) entri yang dibuat pada tanggal itu dan (2) histori latihan/game.

## Status mastery
- 0: Baru
- 1: Dipelajari
- 2: Familiar
- 3: Dikuasai

Ambang awal statistik (dapat dikalibrasi setelah pengujian):
- Familiar: minimal 4 percobaan dan akurasi >= 70%.
- Dikuasai: minimal 8 percobaan, streak benar >= 5, akurasi >= 85%.
- Grade dikuasai turun setelah kegagalan berulang; penanda manual juga dilepas agar status tidak menyesatkan.

## Batas MVP berikutnya
- CRUD deck dan entri.
- SQLite dan migrasi.
- Pemilihan satu atau beberapa deck sebelum sesi game.
- Filter materi sesi dapat menggabungkan deck, rentang tanggal entri dibuat, dan satu atau beberapa status mastery.
- Dikte memiliki dua varian: audio bahasa yang dipelajari lalu menulis, atau melihat arti lalu menulis teks bahasa yang dipelajari.
- Persistensi konfigurasi sesi, urutan materi, jawaban, dan mastery.
- Kalender berasal dari query data nyata.
- Impor/ekspor deck lokal.
