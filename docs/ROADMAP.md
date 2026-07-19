# Roadmap development Lingolog

Dokumen ini adalah checklist utama development. Sebuah tahap hanya diberi tanda **selesai** setelah implementasi, pemeriksaan TypeScript, dan pengujian teknis tahap tersebut berhasil.

- [x] **1. Database lokal**
  - SQLite dibuka saat aplikasi dimulai.
  - Foreign key diaktifkan.
  - Migrasi schema berversi tersedia dan tidak menghapus data saat aplikasi dibuka ulang.
  - Drizzle client tersedia melalui context aplikasi.
  - Seed development tersedia dan hanya berjalan jika diaktifkan secara eksplisit.
- [x] **2. Manajemen deck**
  - Buat, ubah, arsipkan, pulihkan, dan hapus deck.
  - Satu deck memiliki satu pasangan bahasa; pasangan dikunci setelah deck berisi entri.
- [x] **3. Manajemen kosakata**
  - CRUD kata, frasa, dan kalimat; terjemahan, catatan, contoh, favorit, dan tag.
- [x] **4. Pustaka**
  - Data nyata, pencarian, filter, pengurutan, serta detail entri.
- [x] **5. Text-to-speech**
  - Pemutaran teks, bahasa/voice, kecepatan, stop, dan penanganan voice offline.
- [x] **6. Fondasi sesi latihan**
  - Pemilihan multi-deck, rentang tanggal entri, status mastery, jumlah materi, arah/mode game, pengacakan, serta penyimpanan sesi.
- [x] **7. Game kartu flash**
  - Balik kartu, TTS, rating Lupa/Sulit/Ingat/Kuat, resume sesi, dan histori hasil.
- [x] **8. Game dikte**
  - TTS, dua varian soal, input jawaban, normalisasi, pemeriksaan, koreksi manual, resume, dan ringkasan hasil.
- [x] **9. Sistem mastery**
  - Grade Baru/Dipelajari/Familiar/Dikuasai dari pilihan manual, bukti statistik, dan penurunan setelah kegagalan beruntun.
- [x] **10. Kalender dan histori**
  - Tanggal entri dibuat, aktivitas game, akurasi, durasi, dan perubahan mastery.
- [x] **11. Katalog lokal**
  - Kelola, arsipkan, duplikasi, dan gabungkan deck yang kompatibel.
- [x] **12. Impor dan ekspor deck**
  - Berbagi materi melalui format berversi tanpa statistik pribadi.
- [x] **13. Backup dan restore**
  - Cadangkan dan pulihkan seluruh data pengguna secara aman.
- [x] **14. Pengaturan aplikasi**
  - Tema, TTS, voice, haptic, dan pengaturan data.
- [x] **15. Statistik**
  - Statistik global, per deck, dan per entri.
- [x] **15A. Deck siap pakai**
  - Katalog materi bawaan offline yang dapat dicari dan ditambahkan ke Pustaka.
- [x] **16. Onboarding dan empty states**
  - Pengenalan offline-first dan panduan membuat deck pertama.
- [x] **17. Accessibility dan edge cases**
  - Screen reader, ukuran teks, kontras, reduce motion, serta kondisi gagal/kosong.
- [x] **18. Testing dan optimasi**
  - Unit, integration, perangkat nyata, performa SQLite, dan penanganan crash.
- [x] **19. Identitas rilis**
  - Ikon, splash, privacy policy, materi toko aplikasi, dan versi.
- [ ] **20. Build dan internal testing** *(konfigurasi/gate lokal selesai; binary dan perangkat fisik diblokir credential)*
  - APK/AAB, distribusi internal, perbaikan bug, dan kandidat rilis pertama.

## Catatan progres

### Tahap 20, konfigurasi selesai; build internal diblokir
- `eas.json` menyediakan profile `preview` untuk internal distribution/APK Android dan `production` untuk AAB Android serta archive iOS. Build version tetap bersumber dari `app.json` agar setiap kenaikan tercatat di Git.
- `npm run release:check` menjadi gate kandidat yang menjalankan verifikasi inti, Expo dependency check, Expo Doctor, public config, Android production export, dan diff check.
- `docs/INTERNAL_TESTING.md` mendokumentasikan perintah build, aturan signing, registrasi UDID iOS, smoke test binary, format bug, dan kriteria kandidat lulus.
- Environment belum login ke EAS dan tidak memiliki signing credentials, akun toko, Apple Developer membership, atau perangkat fisik. Karena itu APK/AAB/archive bertanda tangan serta hasil internal testing belum dapat dibuat; Tahap 20 tetap terbuka dan tidak ditandai selesai secara prematur.

### Pemilihan materi satuan dari Deck siap pakai, selesai
- Kartu katalog sekarang dapat dibuka untuk melihat seluruh kata, frasa, dan kalimat sebelum materi masuk ke database pengguna.
- Pengguna mencari/filter materi lalu memilih satu atau banyak item dengan menekan barisnya. Centang dan bilah jumlah pilihan muncul; deck lokal aktif dengan pasangan bahasa sama baru dipilih setelah menekan `Tambahkan`.
- Seluruh pilihan disalin dalam satu transaksi. Setiap entri memakai waktu aktual dan event `entry_created`, sehingga Kalender mencerminkan ritme belajar harian dan bukan waktu pemasangan massal.
- Duplikat pada deck tujuan dideteksi melalui pasangan teks-terjemahan yang dinormalisasi; materi yang sudah ada ditandai centang dan tidak ditambahkan kembali.
- Jika deck tujuan belum ada, layar menawarkan pembuatan deck dengan pasangan bahasa katalog yang sudah terisi. Instalasi seluruh deck tetap tersedia sebagai jalur sekunder.
- Tidak ada migrasi database: materi satuan menjadi entri lokal biasa dengan mastery awal Baru, tag bawaan, serta seluruh kemampuan edit/latihan/statistik yang sama.

### Revisi editorial Deck siap pakai Jerman, selesai
- Koleksi Jerman generator lama diganti total dengan materi eksplisit yang dikurasi berdasarkan penggunaan nyata. Referensi domain: halaman belajar dan ringkasan kosakata Deutsche Welle yang diberikan pengguna.
- Sebelas deck Jerman versi 2 memuat 1.083 materi: 881 kata/frasa dan 202 kalimat dalam dua deck terpisah. Tidak ada pasangan yang sama di seluruh koleksi Jerman.
- Empat deck baru menambah domain Waktu/Cuaca/Angka A1, Perjalanan/Akomodasi A2, Profesi/Kantor B1, dan Masyarakat/Debat C1. Deck Inggris dikeluarkan dari katalog bawaan agar produk berfokus pada kurasi Jerman.
- Test regresi memastikan deck kalimat tidak bercampur kata/frasa dan pola substitusi massal lama tidak kembali.
- Perubahan hanya memengaruhi katalog bundle. Deck bawaan yang sudah pernah ditambahkan pengguna tetap menjadi deck lokal dan tidak ditimpa atau dihapus.

### Tahap 1, selesai
- Database: `lingolog.db`.
- Schema version awal: `1`; versi aktif kini `5`, disimpan melalui `PRAGMA user_version`.
- Tabel: `decks`, `entries`, `mastery_states`, `practice_sessions`, `practice_answers`, `activity_events`, `tags`, `entry_tags`, dan `settings`.
- Migrasi menggunakan transaksi; data lama tidak di-reset.
- Seed contoh bersifat opt-in melalui `EXPO_PUBLIC_SEED_DATABASE=true` dan hanya mengisi database kosong.

### Tahap 2, selesai
- Pustaka membaca daftar dan statistik ringkas deck langsung dari SQLite.
- Form deck memvalidasi nama dan mencegah pasangan bahasa yang sama.
- Deck dapat dibuat, diubah, diarsipkan, dipulihkan, dan dihapus dengan konfirmasi permanen.
- Pasangan bahasa tidak dapat diubah setelah deck memiliki entri agar konsistensi materi terjaga.
- Tersedia state loading, kosong, error, retry, serta halaman arsip.
- Daftar deck dimuat ulang ketika pengguna kembali ke Pustaka.

### Tahap 3, selesai
- Menekan deck membuka daftar entri; pengaturan deck dipindahkan ke route khusus.
- Entri mendukung tipe kata, frasa, dan kalimat; teks, terjemahan, contoh, terjemahan contoh, catatan, favorit, dan tag.
- Pembuatan entri, mastery awal, event kalender, dan relasi tag disimpan dalam satu transaksi.
- Form mendeteksi kombinasi teks dan terjemahan yang duplikat tetapi tetap menyediakan pilihan simpan.
- Entri dapat diubah, difavoritkan langsung dari daftar, dan dihapus dengan konfirmasi.
- Tanggal pembuatan serta event `entry_created` disimpan untuk kalender.

### Tahap 4, selesai
- Pustaka deck menggunakan query SQLite nyata dengan pencarian pada teks, terjemahan, contoh, catatan, dan tag.
- Filter tersedia untuk jenis entri, favorit, status mastery, dan tag; filter aktif dapat dibersihkan tanpa mengubah data.
- Entri dapat diurutkan A–Z, terbaru, terlama, atau berdasarkan waktu terakhir diubah.
- Jumlah hasil dan empty state dibedakan antara deck kosong dengan pencarian/filter tanpa hasil.
- Menekan entri membuka halaman detail baca yang menampilkan pasangan bahasa, contoh, catatan, tag, favorit, dan tanggal dibuat.
- Aksi edit dipisahkan dari detail agar penelusuran Pustaka tidak langsung membuka form.

### Tahap 5, selesai
- Satu `SpeechProvider` mengelola voice perangkat, pemutaran tunggal, stop, error, dan preferensi TTS bersama.
- Bahasa speech mengikuti bahasa sumber atau terjemahan deck; pengguna dapat mendengarkan teks utama dan contoh.
- Daftar Pustaka memiliki tombol dengarkan cepat tanpa membuka detail entri.
- Pengaturan voice menampilkan suara lokal yang kompatibel per bahasa dan memprioritaskan locale serta kualitas Enhanced.
- Kecepatan Pelan/Santai/Normal/Cepat dan pilihan voice per bahasa disimpan secara lokal.
- Voice yang belum terpasang, kegagalan audio, teks terlalu panjang, serta pemeriksaan voice yang masih berjalan memiliki pesan khusus.
- Audio dihentikan saat layar ditinggalkan dan tombol putar berubah menjadi stop selama speech aktif.
- Prototype kartu flash dan dikte menggunakan layanan TTS bersama agar tidak lagi memanggil `expo-speech` secara langsung.

### Tahap 6, selesai
- Layar persiapan sesi bersama mendukung satu atau beberapa deck, rentang tanggal entri dibuat, serta kombinasi keduanya.
- Status mastery dapat dipilih jamak: Baru/masih asing, Dipelajari, Familiar, dan Dikuasai.
- Jumlah materi 5/10/20/50, pengacakan, dan arah kartu flash disediakan sebelum sesi dimulai.
- Dikte menyimpan pilihan `audio_to_source` (dengar lalu tulis) atau `meaning_to_source` (lihat arti lalu tulis teks yang dipelajari).
- Jumlah kandidat dihitung langsung dari SQLite sebelum tombol mulai diaktifkan; tanggal kalender yang tidak nyata ditolak.
- Schema versi 2 menambahkan konfigurasi JSON, relasi multi-deck, dan snapshot urutan entri untuk setiap sesi tanpa menghapus data lama.
- Pembuatan sesi, relasi deck, dan urutan materi berjalan dalam satu transaksi.
- Kartu flash dan dikte membaca materi nyata dari snapshot sesi serta menandai waktu selesai dan durasi sesi.

### Tahap 7, selesai
- Kartu flash menggunakan materi nyata, arah sesi, TTS sesuai sisi kartu, animasi tekan ringan, dan haptic saat balik/rating.
- Setiap rating Lupa/Sulit/Ingat/Kuat disimpan satu kali per entri dengan waktu respons; indeks unik mencegah rating ganda akibat ketukan berulang.
- Lupa dan Sulit menjadi bukti belum berhasil; Ingat dan Kuat menjadi bukti berhasil untuk statistik mastery.
- Rating, statistik sesi, mastery, serta event naik/turun Dikuasai diperbarui dalam satu transaksi.
- Keluar menampilkan konfirmasi jeda; sesi yang belum selesai dapat dilanjutkan dari kartu pertama yang belum dinilai.
- Tab Latihan menampilkan sesi kartu flash terbuka beserta progresnya.
- Sesi lengkap membuka ringkasan persentase diingat, distribusi rating, durasi, dan rata-rata waktu respons.
- Schema versi 3 menambahkan keunikan `(session_id, entry_id)` pada jawaban tanpa menghapus histori lama.

### Tahap 8, selesai
- Dikte mendukung mode dengar lalu tulis dengan autoplay TTS dan mode lihat arti lalu tulis teks yang dipelajari.
- Pemeriksaan mengabaikan kapitalisasi, seluruh whitespace, simbol, tanda baca, dan Unicode kompatibel, tetapi mempertahankan diakritik bermakna seperti `ö` dan huruf `ß`.
- Setelah diperiksa, jawaban pengguna dan acuan ditampilkan; pengguna dapat menandai hasil sebagai seharusnya benar atau salah sebelum menyimpan.
- Hasil otomatis, hasil final, indikator koreksi manual, teks jawaban, dan waktu respons disimpan untuk setiap soal.
- Jawaban, statistik sesi, mastery, dan event naik/turun Dikuasai diperbarui atomik memakai hasil final pengguna.
- Keluar menampilkan konfirmasi jeda; sesi dapat dilanjutkan dari soal pertama yang belum memiliki jawaban tersimpan.
- Tab Latihan menampilkan sesi dikte terbuka beserta progres jawaban.
- Ringkasan akhir menampilkan akurasi final, jumlah tepat/belum tepat, jumlah koreksi manual, durasi, dan rata-rata waktu respons.
- Schema versi 4 menambahkan `auto_is_correct` dan `manually_corrected` tanpa menghapus jawaban lama.

### Tahap 9, selesai
- Detail entri menampilkan status mastery, sumber status (manual atau bukti game), alasan, akurasi, percobaan, streak benar, dan streak gagal.
- Pengguna dapat memilih grade Baru/Dipelajari/Familiar/Dikuasai secara manual dari detail maupun langsung dari chip mastery pada kartu entri, atau kembali ke perhitungan bukti game tanpa menghapus statistik.
- Familiar memerlukan minimal 4 percobaan dan akurasi 70%; Dikuasai memerlukan minimal 8 percobaan, streak benar 5, dan akurasi 85%.
- Satu atau dua kegagalan tidak langsung menurunkan grade; 3 kegagalan beruntun melepas override manual dan membatasi grade maksimal Familiar, sedangkan 5 menurunkannya ke Dipelajari.
- Keberhasilan mereset streak gagal dan bukti kuat berikutnya dapat menaikkan status kembali.
- Perubahan manual dan perubahan statistik sama-sama mencatat event masuk/keluar Dikuasai secara transaksional.
- Lembar mastery menampilkan delapan bukti game terbaru, termasuk jenis game, rating/hasil, waktu, dan tanda koreksi manual dikte.
- Schema versi 5 menambahkan `manual_grade` dan `failure_streak`; status manual Dikuasai lama dimigrasikan tanpa kehilangan data.
- Filter tanggal persiapan game memakai date picker native dengan batas awal/akhir dan pilihan menghapus tanggal, bukan input string.
- Semua dialog aksi, error, duplikat, hapus, pengelolaan deck, dan jeda game memakai komponen bertema Lingolog; tidak ada lagi `Alert.alert` native putih.

### Tahap 10, selesai
- Kalender membaca aktivitas SQLite nyata per bulan dan memberi intensitas pada tanggal berdasarkan entri, sesi, jawaban, serta perubahan mastery.
- Pengguna dapat berpindah bulan dan memilih tanggal; tanggal hari ini, tanggal aktif, serta tanggal terpilih dibedakan secara visual dan memiliki label accessibility.
- Detail harian menampilkan entri yang dibuat lengkap dengan deck dan waktu, serta dapat membuka detail entri.
- Histori permainan menampilkan Kartu flash/Dikte, varian atau arah, daftar deck, progres materi, akurasi final, durasi, waktu mulai-selesai, koreksi Dikte, serta status Selesai/Dijeda.
- Sesi yang selesai membuka halaman hasil; sesi yang dijeda membuka game untuk dilanjutkan.
- Perubahan masuk/keluar grade Dikuasai ditampilkan sebagai event dan dapat membuka entri terkait jika masih tersedia.
- Ringkasan harian menampilkan jumlah jawaban dan akurasi, sedangkan tab Latihan kini memakai jumlah jawaban hari ini dan akurasi pekan berjalan dari database.
- Kalender mendukung loading, pull-to-refresh, error/retry, dan empty state; kalender tetap dijelaskan sebagai jurnal, bukan jadwal review wajib.
- Tahap ini tidak mengubah schema karena `entries`, `practice_sessions`, `practice_answers`, `practice_session_decks`, dan `activity_events` versi 5 sudah mencukupi.

### Tahap 11, selesai
- Tab Katalog membaca seluruh deck aktif dan arsip dari SQLite, lengkap dengan pasangan bahasa, jumlah entri, jumlah Dikuasai, warna sampul, loading, error/retry, pull-to-refresh, dan empty state.
- Setiap deck memiliki lembar aksi bertema untuk membuka isi, mengubah informasi, menduplikasi, menggabungkan, serta mengarsipkan atau memulihkan.
- Duplikasi menyalin metadata deck, entri, contoh, catatan, favorit, dan tag dalam satu transaksi; mastery dan statistik latihan sengaja dimulai dari awal dan deck hasil diberi nama `(salinan)`.
- Penggabungan hanya menawarkan deck tujuan dengan pasangan bahasa sumber/target yang sama, termasuk tujuan yang sedang diarsipkan.
- Penggabungan memindahkan entri beserta mastery/tag, memperbarui referensi sesi satu-deck, relasi sesi multi-deck, dan event aktivitas sebelum menghapus deck sumber; relasi tujuan yang sudah ada dideduplikasi.
- Konfirmasi penggabungan menjelaskan bahwa tindakan menghapus deck sumber, sedangkan statistik, mastery, tag, dan histori dipertahankan.
- Impor dan berbagi tidak diimplementasikan pada tahap ini karena menjadi cakupan Tahap 12.
- Tidak ada perubahan schema; tabel dan foreign key versi 5 sudah mendukung seluruh operasi katalog.

### Tahap 12, selesai
- Katalog dapat memilih file melalui document picker perangkat, membaca salinan cache, memvalidasi isi, dan mengimpor deck secara atomik.
- Format `lingolog.deck` versi 1 memakai JSON dan memuat metadata deck, entri, contoh, catatan, serta tag; format menolak field tak dikenal, versi tak didukung, pasangan bahasa sama, entri kosong/tidak valid, lebih dari 20.000 entri, dan file di atas 5 MB.
- Impor membuat deck dan entri baru tanpa menimpa deck lama, menormalisasi/deduplikasi tag, memberi mastery awal Baru, tidak mengimpor favorit/statistik/histori, dan mencatat satu event `deck_imported`.
- Ekspor membangun file `.lingolog.json` dengan nama aman dan menyimpannya sementara di cache sebelum membuka share sheet native Android/iOS.
- File ekspor sengaja tidak memuat ID database, favorit, mastery, jawaban, sesi latihan, atau histori pribadi.
- Lembar aksi deck menyediakan `Ekspor dan bagikan deck`; header Katalog menyediakan `Impor deck dari file`.
- Keberhasilan impor menampilkan jumlah entri dan navigasi menuju deck baru; pembatalan picker tidak dianggap error, sementara JSON rusak, format asing, versi tidak didukung, file kosong/besar, dan sharing tidak tersedia memiliki pesan khusus.
- Kalender menampilkan event deck yang berhasil diimpor dan dapat membuka deck tersebut.
- Expo Document Picker, FileSystem, dan Sharing dipasang pada versi yang sesuai SDK 54; tidak ada perubahan schema database.

### Tahap 13, selesai
- Katalog menyediakan lembar `Backup & restore` terpisah dari impor/ekspor deck agar perbedaan cakupan dan risiko keduanya jelas.
- Backup penuh menjalankan checkpoint WAL, menyimpan preferensi tema/TTS ke tabel settings, men-serialize database SQLite aktif, lalu membuka share sheet native dengan nama bertanggal `.lingolog-backup`.
- Backup mencakup deck aktif/arsip, seluruh entri dan favorit, tag, mastery manual/statistik, sesi, snapshot sesi, jawaban dan koreksi Dikte, histori aktivitas, pengaturan database, tema, serta preferensi TTS.
- Restore memilih satu file melalui document picker dan memvalidasinya pada koneksi SQLite in-memory terpisah sebelum menyentuh data aktif.
- Validasi restore mencakup ukuran maksimal 250 MB, header SQLite, `PRAGMA integrity_check`, application ID Lingolog, versi schema yang didukung, tabel wajib, dan ringkasan jumlah deck/entri/sesi/jawaban.
- Konfirmasi restore menyebut nama file, ringkasan isi, dan bahwa seluruh data saat ini akan diganti; pembatalan picker tidak dianggap error.
- Penggantian database dilakukan setelah koneksi aktif ditutup, menggunakan file pengganti dan salinan rollback sementara; SQLiteProvider kemudian di-remount dan migrasi aman berjalan untuk backup versi lama.
- Database sekarang menulis `PRAGMA application_id = 0x4c4c4f47` (`LLOG`) saat inisialisasi sehingga file SQLite lain tidak dapat dipulihkan sebagai backup Lingolog.
- Backup lebih baru/tidak didukung, kosong, terlalu besar, rusak, bukan SQLite, bukan Lingolog, atau sharing tidak tersedia memiliki pesan khusus.
- Tidak ada tabel/migrasi schema baru; versi database tetap 5.

### Tahap 14, selesai
- Layar global `Pengaturan` dapat dibuka dari header Pustaka; kontrol tema cepat diganti dengan pintu masuk yang jelas agar preferensi tidak berubah karena ketukan tidak sengaja.
- Tema menyediakan pilihan eksplisit Sistem/Terang/Gelap, menampilkan tema resolusi saat ini, dan tetap persisten melalui `lingolog.theme-mode`.
- Pengaturan text-to-speech global menampilkan kecepatan Pelan/Santai/Normal/Cepat serta seluruh bahasa yang didukung Lingolog, voice perangkat kompatibel, pilihan otomatis/manual, status voice belum tersedia, dan refresh daftar voice.
- Ringkasan pengaturan suara menunjukkan kecepatan aktif dan jumlah voice yang dipilih manual; kebijakan voice offline dan larangan fallback bahasa diam-diam dijelaskan.
- `HapticsProvider` baru menyimpan sakelar getaran latihan melalui `lingolog.haptics-enabled`; default aktif dan aktivasi memberi preview getaran ringan.
- Kartu flash dan Dikte sekarang memakai provider haptic bersama sehingga flip, rating, serta hasil pemeriksaan benar-benar mengikuti preferensi pengguna.
- Layar menjelaskan bahwa tema, voice, kecepatan, serta haptic tersimpan lokal dan ikut dalam backup penuh.
- Backup/restore Tahap 13 diperluas untuk membawa preferensi haptic selain tema dan TTS.
- Pengaturan data tetap tersedia melalui lembar Backup & restore di Katalog, menghindari duplikasi aksi berisiko di beberapa layar.
- Tidak ada perubahan schema database atau dependency baru.

### Tahap 15, selesai
- Tab Latihan menyediakan pintu masuk ke layar statistik global; setiap Pustaka deck menyediakan pintu masuk ke statistik deck.
- Statistik global membaca SQLite nyata dan menampilkan akurasi seluruh latihan, streak hari aktif saat ini, jawaban, sesi selesai, durasi sesi, entri, deck aktif/arsip, favorit, serta jumlah Dikuasai.
- Aktivitas 14 hari ditampilkan sebagai grafik batang yang tetap memiliki accessibility label per tanggal; hari tanpa latihan tetap terlihat dan tidak dibuat dari data contoh.
- Perbandingan Kartu flash dan Dikte menampilkan jumlah jawaban serta persentase berhasil berdasarkan hasil final tersimpan.
- Distribusi mastery menampilkan Baru/Dipelajari/Familiar/Dikuasai sebagai jumlah dan persentase, termasuk kondisi seluruh koleksi masih kosong.
- Daftar deck paling sering dilatih dihitung dari jumlah jawaban dan membuka statistik deck terkait.
- Statistik deck menampilkan akurasi, jumlah percobaan, entri/favorit, aktivitas 14 hari, perbandingan game, distribusi mastery, serta maksimal lima entri yang perlu lebih banyak latihan.
- Kandidat entri sulit memerlukan minimal dua percobaan dan diurutkan dari akurasi terendah lalu jumlah bukti terbanyak; menekan entri membuka detailnya.
- Detail entri menampilkan statistik latihan nyata: akurasi, percobaan, rata-rata waktu respons, jumlah koreksi Dikte, dan rincian per game.
- Empty/loading/error/retry tersedia; statistik menjelaskan bahwa koreksi final Dikte dihitung sedangkan pilihan mastery manual tidak mengubah akurasi.
- Semua agregasi dilakukan di SQLite atau dari hasil query terbatas 14 hari; tidak ada dependency grafik atau perubahan schema database.

### Tahap 15A, fondasi Deck siap pakai selesai
- Fitur diberi nama `Deck siap pakai`, bukan Store, karena koleksi dibundel bersama aplikasi, gratis, tanpa akun, tanpa transaksi, dan tanpa unduhan internet.
- Pustaka memiliki pintu masuk jelas menuju rak materi bawaan; aksi utama memakai label `Tambahkan ke Pustaka`.
- Layar rak menyediakan pencarian nama/bahasa/topik, filter level Pemula/Menengah/Lanjutan, filter kategori, jumlah hasil, loading, empty state katalog, serta empty state hasil pencarian.
- Manifest lokal `starterDecks` memisahkan metadata katalog dari database pengguna; ID katalog stabil dan versi deck disiapkan untuk pembaruan konten mendatang.
- Instalasi deck berjalan dalam satu transaksi dan menyalin metadata, materi, contoh, catatan, serta tag; favorit/statistik/mastery/histori pribadi dimulai dari awal.
- Tabel `settings` menyimpan penanda `starter-deck:<id>` berisi versi, ID deck lokal, dan waktu pemasangan agar deck yang sama tidak terpasang dua kali.
- Penanda instalasi yang deck-nya sudah dihapus diperbaiki otomatis sehingga pengguna dapat memasang ulang deck tersebut.
- Setelah pemasangan berhasil, pengguna dapat langsung membuka deck baru; deck menjadi salinan lokal biasa yang bebas diubah, diarsipkan, digabungkan, diekspor, atau dihapus.
- Koleksi Bahasa Jerman direvisi setelah audit penggunaan menemukan materi generator lama terlalu repetitif dan banyak kalimat tidak bernilai praktis. Katalog kini berisi sebelas deck kurasi A1–C1, termasuk domain waktu/cuaca/angka, perjalanan/akomodasi, profesi/kantor, masyarakat/debat, serta dua deck kalimat nyata.
- Kata/frasa dan kalimat kini dipisahkan secara tegas. Dua deck kalimat hanya memuat kalimat utuh; lima deck lain tidak mencampur kalimat.
- Materi Jerman berjumlah 1.083 entri yang ditulis satu per satu: 100 kalimat A1, 102 kalimat A2–B1, dan 881 kata/frasa A1–C1. Jumlah sengaja lebih kecil daripada katalog generator lama agar setiap entri relevan, natural, dan dapat digunakan.
- Kosakata benda A1/A2/B1/C1 menyertakan artikel dan bentuk jamak bila relevan; frasa mencakup sapaan, layanan, kesehatan, perjalanan, komunikasi kerja, opini, dan register akademik.
- Deutsche Welle Learn German dan ringkasan kosakatanya dipakai sebagai referensi domain/use case—termasuk model `Deutschtrainer` yang berfokus pada kosakata dan kalimat pendek—tanpa menyalin koleksi secara massal. Materi Lingolog tetap merupakan kurasi sendiri.
- Builder lama yang menghasilkan sepuluh variasi untuk setiap nomina/verba dihapus. Builder baru hanya menerima baris eksplisit Jerman–Indonesia, minimal 60 materi, memvalidasi duplikat, dan menandai katalog Jerman sebagai versi 2.
- Koleksi Inggris dikeluarkan dari katalog bawaan. Aplikasi tetap mendukung deck bahasa Inggris buatan atau impor pengguna, tetapi rak siap pakai difokuskan pada materi Jerman.
- Karena katalog hanya memiliki satu bahasa sumber, filter bahasa pada Deck siap pakai dihapus. Filter CEFR, level produk, kategori, dan pencarian tetap tersedia.
- Pustaka dan Katalog lokal memakai komponen kontrol bersama: search bar di samping ikon filter, badge jumlah filter aktif, serta bottom sheet bahasa sumber, bahasa arti, isi deck, pengurutan, dan—khusus Katalog—status aktif/arsip.
- Hasil pencarian membedakan jumlah tampil dari total deck dan menyediakan reset ketika kombinasi pencarian/filter kosong.
- Tidak ada perubahan schema database atau dependency baru.

### Tahap 19, selesai
- Identitas binary dikunci sebagai Lingolog `1.0.0`, Android package `com.lingolog.app`/`versionCode` 1, iOS bundle identifier `com.lingolog.app`/`buildNumber` 1, scheme `lingolog`, dan orientation portrait.
- Ikon bunglon yang telah disetujui dipertahankan untuk launcher, adaptive foreground/background, monochrome themed icon, dan favicon; bunglon tetap tidak dipakai sebagai ornamen halaman.
- Splash berpindah ke config plugin `expo-splash-screen` yang direkomendasikan dokumentasi Expo versi 57, dengan image width 180, contain, kertas terang `#F4F3EF`, serta aset transparan tinta terang khusus dark mode pada `#171A17`.
- `docs/PRIVACY.md` menjelaskan data lokal, retensi, TTS perangkat, share sheet, ekspor deck, backup privat, restore, keamanan, kendali penghapusan, anak-anak, dan perubahan kebijakan. Dokumen menandai kontak dukungan/URL publik sebagai gate pemilik rilis, bukan mengarang identitas legal.
- `docs/STORE_LISTING.md` menyediakan nama, subtitle, deskripsi pendek/panjang, promotional text, keyword, What's New, delapan konsep screenshot, arahan feature graphic, deklarasi awal Data safety/App Privacy, content rating, dan checklist field console.
- `docs/RELEASE.md` membedakan marketing version, native build numbers, schema database, serta versi format deck; setiap binary berikutnya wajib menaikkan build number.
- `scripts/validate-release.mjs` dan `npm run validate:release` memeriksa sinkronisasi versi, identifier, native build numbers, konfigurasi splash, dan keberadaan tujuh aset rilis. Pemeriksaan ini menjadi bagian `npm run verify`.
- Metadata toko tidak mengklaim cloud, akun, mikrofon, atau analytics. Screenshot final dan feature graphic harus diambil/diekspor dari release build pada Tahap 20 karena memerlukan binary/perangkat serta akun console.
- Tidak ada perubahan schema database. Dependency native `expo-splash-screen` dipasang pada versi yang kompatibel dengan SDK 54.

### Tahap 18, selesai
- Test runner ringan memakai Node test melalui `tsx`, tanpa memasukkan framework test ke bundle produksi. `npm test` mencakup normalisasi Dikte, tanggal sesi, ambang/penurunan mastery, parser deck strict, versi format, pasangan bahasa, dan nama file aman.
- Test kontrak katalog memuat seluruh materi bawaan dan kini memverifikasi 11 deck Jerman/1.083 entri, cakupan A1/A2/B1/C1, batas tag, parser, keunikan dalam dan lintas deck, pemisahan deck kalimat, serta tidak munculnya pola generator lama.
- Test tersebut menemukan satu pasangan `husten → batuk` ganda pada deck Jerman A2 Kesehatan; sumber verba diperbaiki menjadi `abhusten → mengeluarkan batuk` dan test regresi mempertahankan keunikannya.
- `scripts/test-migrations.mjs` menguji fresh serta database v1/v2/v3/v4 ke v5 melalui SQLite nyata, termasuk retensi baris lama, `user_version`, `application_id`, kolom mastery terbaru, integrity check, dan foreign-key check.
- `scripts/benchmark-sqlite.mjs` membangun fixture 100 deck/20.000 entri dan mengukur query ringkasan deck serta pencarian/filter. Median lokal 9 proses cold-ish sekitar 5–6 ms, di bawah anggaran 500 ms.
- Script `npm run verify` menyatukan typecheck, unit/integration test, migrasi, dan benchmark. `docs/TESTING.md` mendokumentasikan production checks, matriks Android/iOS fisik, lifecycle/audio/storage/file edge cases, profil performa, serta prosedur crash yang menjaga privasi materi pengguna.
- Audit dependency produksi tidak menemukan high/critical; temuan moderate berasal dari rantai tool Expo/transitif dan tidak dipaksa diperbarui di luar versi SDK yang kompatibel.
- Production export Android, Expo dependency check, Expo Doctor, dan diff check berhasil. Uji hardware tetap menjadi gate manual kandidat internal karena lingkungan agent tidak memiliki perangkat Android/iOS fisik.
- Tidak ada perubahan schema database. Dependency development `tsx` ditambahkan hanya untuk menjalankan test TypeScript.

### Tahap 17, selesai
- `AccessibilityProvider` membaca preferensi Reduce Motion perangkat dan menghapus animasi route, dialog, bottom sheet, serta transform feedback game yang tidak diperlukan.
- Onboarding, Kartu flash, dan Dikte mengekspos progress semantik; perubahan langkah, jawaban kartu, hasil Dikte, serta koreksi hasil diumumkan ke TalkBack/VoiceOver.
- Kontrol pilihan utama memakai role radio/checkbox/switch beserta checked, disabled, dan busy state; judul bersama memakai heading semantik dan modal menandai dirinya sebagai modal aksesibilitas.
- Kartu flash dapat digulir dan tombol rating membungkus saat Dynamic Type besar; layout game tidak lagi mengandalkan tinggi layar tetap untuk menjangkau aksi utama.
- Kontras `inkFaint` tema terang dinaikkan agar placeholder dan ikon sekunder tidak berada di bawah ambang teks normal WCAG AA; status tetap memiliki ikon/label/bentuk selain warna.
- Setup sesi memberi label semantik untuk arah, jumlah materi, tanggal, dan tombol mulai; progress game sekarang menghitung materi aktif, bukan berhenti pada nol untuk materi pertama.
- Jalur gagal membuka sesi Kartu flash dan Dikte memiliki retry untuk error sementara serta jalan kembali yang jelas untuk sesi hilang/tidak valid.
- `PaperScreen` mempertahankan tap saat keyboard terbuka; aksi game memakai guard disabled/busy sehingga ketukan ganda tidak menggandakan jawaban.
- Tidak ada perubahan schema database atau dependency baru.

### Tahap 16, selesai
- Pengguna baru melihat onboarding lima langkah yang menjelaskan offline-first dan data lokal, deck pertama, pengelolaan materi/TTS, dua game dan mastery, serta perbedaan ekspor deck dengan backup penuh.
- Onboarding menyediakan indikator langkah, tombol Lewati, navigasi Kembali termasuk tombol back Android, serta dua jalur akhir: memilih Deck siap pakai atau membuat deck sendiri.
- Penyelesaian disimpan melalui `lingolog.onboarding-completed.v1`; Pengaturan menyediakan `Ulangi pengenalan` tanpa mengubah deck, progres, atau preferensi lain.
- Pengguna lama yang sudah memiliki deck otomatis dianggap selesai agar pembaruan aplikasi tidak memblokir alur kerja mereka.
- Preferensi onboarding disalin ke tabel settings saat backup dan dipulihkan bersama tema, TTS, dan haptic.
- Pustaka kosong dan Katalog kosong menawarkan Deck siap pakai sebagai aksi utama serta pembuatan deck sebagai alternatif.
- Latihan tanpa materi menjelaskan prasyarat dan membuka Deck siap pakai; Kalender tanpa aktivitas memiliki aksi membuka Pustaka.
- Empty state pencarian/filter Pustaka, Katalog, dan Deck siap pakai mempertahankan reset yang tidak mengubah data pengguna.
- Seluruh elemen onboarding dan aksi empty state memakai token tema, target sentuh, accessibility role/label, dan copy yang berlaku di light/dark mode.
- Tidak ada perubahan schema database atau dependency baru.
