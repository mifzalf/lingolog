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
- [ ] **7. Game kartu flash**
  - Balik kartu, TTS, rating Lupa/Sulit/Ingat/Kuat, dan histori hasil.
- [ ] **8. Game dikte**
  - TTS, input jawaban, normalisasi tanda baca, pemeriksaan, dan koreksi manual.
- [ ] **9. Sistem mastery**
  - Grade Baru/Dipelajari/Familiar/Dikuasai dari pilihan manual dan bukti statistik.
- [ ] **10. Kalender dan histori**
  - Tanggal entri dibuat, aktivitas game, akurasi, durasi, dan perubahan mastery.
- [ ] **11. Katalog lokal**
  - Kelola, arsipkan, duplikasi, dan gabungkan deck yang kompatibel.
- [ ] **12. Impor dan ekspor deck**
  - Berbagi materi melalui format berversi tanpa statistik pribadi.
- [ ] **13. Backup dan restore**
  - Cadangkan dan pulihkan seluruh data pengguna secara aman.
- [ ] **14. Pengaturan aplikasi**
  - Tema, TTS, voice, haptic, dan pengaturan data.
- [ ] **15. Statistik**
  - Statistik global, per deck, dan per entri.
- [ ] **16. Onboarding dan empty states**
  - Pengenalan offline-first dan panduan membuat deck pertama.
- [ ] **17. Accessibility dan edge cases**
  - Screen reader, ukuran teks, kontras, reduce motion, serta kondisi gagal/kosong.
- [ ] **18. Testing dan optimasi**
  - Unit, integration, perangkat nyata, performa SQLite, dan penanganan crash.
- [ ] **19. Identitas rilis**
  - Ikon, splash, privacy policy, materi toko aplikasi, dan versi.
- [ ] **20. Build dan internal testing**
  - APK/AAB, distribusi internal, perbaikan bug, dan kandidat rilis pertama.

## Catatan progres

### Tahap 1, selesai
- Database: `lingolog.db`.
- Schema version awal: `1`; versi aktif kini `2`, disimpan melalui `PRAGMA user_version`.
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
