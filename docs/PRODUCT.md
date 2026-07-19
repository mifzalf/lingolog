# Lingolog — keputusan produk MVP

## Tujuan
Aplikasi mobile offline untuk mencatat, mendengar, mengelola, dan melatih kata/frasa/kalimat milik pengguna.

## Identitas visual
- Nama aplikasi: **Lingolog**.
- Identitas rilis pertama memakai marketing version `1.0.0`, Android `versionCode` 1, iOS `buildNumber` 1, package/bundle identifier `com.lingolog.app`, ikon bunglon garis, dan splash light/dark bertema.
- Tema: sistem, terang, atau gelap; preferensi disimpan lokal dan dipilih secara eksplisit dari layar Pengaturan.
- Metafora visual: lembar catatan bahasa, garis buku samar, tinta, stabilo, dan anotasi pena.
- Font tulisan tangan hanya menjadi aksen. Teks materi belajar tetap memakai sans-serif yang jelas agar mendukung berbagai aksara.

## Keputusan
- React Native + Expo + TypeScript.
- Seluruh katalog lokal; tanpa akun, cloud, atau repositori publik.
- `Deck siap pakai` adalah koleksi materi gratis yang dibundel bersama aplikasi, bukan toko daring. Pengguna dapat membuka isi katalog, mencari/filter kata, frasa, atau kalimat, memilih satu atau banyak materi, lalu menentukan deck lokal tujuan yang pasangan bahasanya sama. Pilihan ini menjaga jumlah entri harian sesuai ritme belajar; penambahan seluruh deck tetap tersedia bagi pengguna yang menginginkannya.
- Katalog bawaan berfokus khusus pada Bahasa Jerman → Bahasa Indonesia dan berisi sebelas deck kurasi A1–C1 dengan total 1.083 materi. Koleksi mencakup kata inti, frasa sehari-hari, waktu/cuaca/angka, perjalanan/akomodasi, profesi/kantor, masyarakat/debat, akademik, serta dua deck kalimat nyata yang terpisah. Materi ditulis satu per satu; tidak ada ekspansi template dengan mengganti nomina/verba.
- Deck Bahasa Inggris dihapus dari katalog bawaan agar kurasi, pencarian, dan pengembangan materi tetap fokus pada jalur belajar Jerman. Dukungan membuat deck bahasa Inggris milik pengguna tetap tersedia.
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
- Kebijakan privasi dan metadata toko harus mencerminkan binary aktual: tanpa akun/backend/iklan/pelacakan, data inti lokal, TTS melalui layanan perangkat, dan perpindahan file hanya atas tindakan eksplisit pengguna.

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
