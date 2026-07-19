# Lingolog — keputusan produk MVP

## Tujuan
Aplikasi mobile offline untuk mencatat, mendengar, mengelola, dan melatih kata/frasa/kalimat milik pengguna.

## Identitas visual
- Nama aplikasi: **Lingolog**.
- Tema: sistem, terang, atau gelap; preferensi disimpan lokal dan dipilih secara eksplisit dari layar Pengaturan.
- Metafora visual: lembar catatan bahasa, garis buku samar, tinta, stabilo, dan anotasi pena.
- Font tulisan tangan hanya menjadi aksen. Teks materi belajar tetap memakai sans-serif yang jelas agar mendukung berbagai aksara.

## Keputusan
- React Native + Expo + TypeScript.
- Seluruh katalog lokal; tanpa akun, cloud, atau repositori publik.
- `Deck siap pakai` adalah koleksi materi gratis yang dibundel bersama aplikasi, bukan toko daring. Pengguna dapat mencari/filter lalu menyalin deck ke Pustaka untuk diedit dan dilatih sepenuhnya offline.
- Koleksi awal berfokus pada Bahasa Jerman → Bahasa Indonesia: 5 deck A1, 5 deck A2, 3 deck menengah/B1, dan 2 deck lanjutan/C1. Deck A1/B1/C1 memiliki 300 entri unik; deck A2 diperluas menjadi 320 entri per deck. Konteks nyata dipisahkan agar mudah dipilih, termasuk perkenalan, rumah, taman/kota, rutinitas, pergaulan, pakaian/layanan, kesehatan, dan sekolah/pekerjaan.
- Koleksi Bahasa Inggris → Bahasa Indonesia lebih ringkas tetapi mengisi seluruh tingkat: masing-masing satu deck A1, A2, B1, dan C1 dengan 300 entri per deck.
- Deck siap pakai dapat difilter berdasarkan bahasa dan CEFR. Pustaka serta Katalog lokal selalu menampilkan search bar berdampingan dengan tombol filter yang membuka bahasa sumber/target, status isi/arsip, dan pengurutan.
- Katalog mengelola deck aktif maupun arsip. Duplikasi menyalin materi dan tag tanpa statistik pribadi; penggabungan hanya diizinkan untuk pasangan bahasa yang sama serta mempertahankan entri, mastery, dan histori.
- Deck dapat dibagikan sebagai JSON `lingolog.deck` berversi. File hanya berisi metadata deck, materi, contoh, catatan, dan tag; ID lokal, favorit, mastery, jawaban, sesi, serta histori pribadi tidak diekspor atau diimpor.
- Backup penuh adalah file privat yang berbeda dari ekspor deck: backup mencakup seluruh database, statistik, histori, favorit, arsip, serta preferensi tema/TTS dan hanya dipindahkan melalui penyimpanan/share sheet perangkat.
- Satu deck memiliki tepat satu pasangan bahasa.
- Game MVP hanya **Kartu flash** dan **Dikte**.
- Tidak ada pilihan ganda. Materi game selalu berasal dari entri pengguna.
- Dikte toleran terhadap kapitalisasi, spasi, simbol, tanda baca, dan bentuk Unicode ekuivalen, tetapi tidak menghapus diakritik/huruf bermakna (mis. ä, ö, ü, ß).
- Hasil otomatis dikte dapat dikoreksi pengguna sebelum disimpan; hasil final pengguna menjadi bukti statistik dan mastery.
- Game adalah bahan belajar dan sumber statistik, bukan jadwal belajar wajib.
- Mastery dapat dipilih manual pada grade mana pun atau dicapai dari bukti statistik yang kuat. Pilihan manual tidak menghapus statistik dan dilepas setelah 3 kegagalan beruntun agar status tidak menyesatkan.
- Kalender menampilkan entri yang dibuat, histori latihan/game selesai atau dijeda, akurasi, durasi, waktu, deck, arah/varian game, koreksi Dikte, dan perubahan mastery pada tanggal terpilih. Kalender adalah jurnal, bukan jadwal review wajib.
- Pengaturan aplikasi menyatukan tema, kecepatan/voice TTS, serta haptic latihan. Semua preferensi tersimpan lokal; haptic dapat dimatikan tanpa mengubah fungsi game.
- Statistik tersedia global, per deck, dan per entri. Akurasi selalu memakai hasil final yang tersimpan; koreksi manual Dikte ikut dihitung, sedangkan mastery manual tidak mengubah hasil latihan historis.
- Onboarding pertama kali menjelaskan penyimpanan lokal/offline, deck pertama, materi/TTS, latihan/mastery, serta perbedaan ekspor deck dan backup penuh. Pengguna dapat melewati, kembali, memilih jalur deck siap pakai atau deck sendiri, dan mengulang pengenalan dari Pengaturan.
- Pengguna lama yang sudah memiliki deck tidak dipaksa melewati onboarding baru setelah pembaruan aplikasi. Status penyelesaian onboarding disimpan lokal dan ikut dalam backup penuh.
- Empty state utama selalu menawarkan tindakan berikutnya yang relevan, bukan hanya menyatakan bahwa data kosong.
- Aksesibilitas adalah fungsi inti: alur utama dapat digunakan dengan TalkBack/VoiceOver, Dynamic Type, dan Reduce Motion. Teks, ikon, atau bentuk selalu melengkapi warna untuk menyampaikan status.
- Kualitas rilis dijaga dengan test logika inti, kontrak katalog bawaan, migrasi seluruh versi database, benchmark SQLite, pemeriksaan dependency, production export, dan checklist perangkat fisik yang tidak mengirim materi pengguna.

## Status mastery
- 0: Baru
- 1: Dipelajari
- 2: Familiar
- 3: Dikuasai

Ambang awal statistik (dapat dikalibrasi setelah pengujian):
- Familiar: minimal 4 percobaan dan akurasi >= 70%.
- Dikuasai: minimal 8 percobaan, streak benar >= 5, akurasi >= 85%.
- Satu atau dua kegagalan tidak langsung menurunkan grade. Setelah 3 kegagalan beruntun, override manual dilepas dan grade maksimal Familiar; setelah 5 kegagalan beruntun grade menjadi Dipelajari.
- Keberhasilan berikutnya mereset streak gagal; bukti kuat dapat menaikkan grade kembali.

## Batas MVP berikutnya
- CRUD deck dan entri.
- SQLite dan migrasi.
- Pemilihan satu atau beberapa deck sebelum sesi game.
- Filter materi sesi dapat menggabungkan deck, rentang tanggal entri dibuat, dan satu atau beberapa status mastery.
- Dikte memiliki dua varian: audio bahasa yang dipelajari lalu menulis, atau melihat arti lalu menulis teks bahasa yang dipelajari.
- Persistensi konfigurasi sesi, urutan materi, jawaban, dan mastery.
- Kalender berasal dari query data nyata.
- Impor/ekspor deck lokal melalui document picker dan share sheet perangkat.
- Backup/restore penuh dengan validasi identitas serta integritas SQLite sebelum seluruh data lokal diganti.
