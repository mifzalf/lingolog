# Testing Lingolog

## Otomatis

Jalankan pemeriksaan lokal lengkap:

```bash
npm run verify
```

Perintah tersebut mencakup:

- TypeScript tanpa emit.
- Unit test normalisasi Dikte, tanggal sesi, mastery, parser/format deck, dan nama file.
- Integration contract katalog bawaan: 11 deck Jerman/1.083 entri, cakupan A1–C1, parser, batas tag, keunikan pasangan dalam dan lintas deck, pemisahan deck kalimat, larangan pola generator lama, serta identitas pasangan ter-normalisasi untuk deteksi materi satuan yang sudah tersalin.
- Migrasi SQLite fresh serta v1/v2/v3/v4 ke v5, termasuk `application_id`, `integrity_check`, `foreign_key_check`, dan retensi data lama.
- Benchmark query SQLite dengan fixture 20.000 entri. Anggaran median pada mesin pengembangan adalah 500 ms.

Sebelum kandidat build, jalankan gate gabungan:

```bash
npm run release:check
npm audit --omit=dev
```

`release:check` menjalankan verifikasi inti, pemeriksaan dependency Expo, Expo Doctor, public config, production export Android, dan `git diff --check`. Setelah login EAS, validasi juga keempat kombinasi profile/platform seperti yang dicatat di `docs/INTERNAL_TESTING.md`.

Temuan audit dependency transitive harus dicatat dan diperbaiki melalui versi Expo yang kompatibel, bukan `npm audit fix --force` yang dapat melompati SDK.

## Matriks perangkat nyata

Checklist ini wajib dijalankan pada APK/archive internal yang sudah ditandatangani di Android dan iOS fisik. Lingkungan agent dan Expo export tidak dapat menggantikan validasi hardware. Hasil kandidat, build URL, tester, bug, dan keputusan dicatat di `docs/INTERNAL_TESTING.md`.

### Instalasi dan first run

- [ ] Instalasi bersih membuka onboarding tanpa kilatan Pustaka.
- [ ] Lewati dan selesai sama-sama mencegah onboarding muncul lagi.
- [ ] Upgrade dengan deck lama tidak memaksa onboarding.
- [ ] Menutup aplikasi di tengah onboarding tidak mengubah data lain.

### Data lokal

- [ ] Buat, ubah, arsipkan, pulihkan, duplikasi, gabungkan, dan hapus deck.
- [ ] Buat entri panjang dengan 12 tag, contoh, catatan, Unicode, dan favorit.
- [ ] Pasangan bahasa terkunci setelah deck berisi entri.
- [ ] Force close lalu buka kembali mempertahankan seluruh perubahan.
- [ ] Penyimpanan hampir penuh menghasilkan error bertema dan tidak membuat data parsial.

### Latihan dan audio

- [ ] Kartu flash dapat dijeda, dilanjutkan, dan tidak merekam jawaban ganda saat tombol diketuk cepat.
- [ ] Dikte audio dan arti-ke-tulisan menyimpan hasil final setelah koreksi manual.
- [ ] TTS memakai bahasa deck; voice yang tidak tersedia tidak berganti bahasa diam-diam.
- [ ] TTS diuji dalam mode pesawat dengan paket voice offline terpasang.
- [ ] Haptic mati benar-benar menonaktifkan feedback kedua game.
- [ ] Interupsi telepon/audio dan background/foreground tidak membuat game crash.

### File dan pemulihan

- [ ] Ekspor deck dapat dibagikan dan diimpor kembali sebagai deck baru.
- [ ] File rusak, versi baru, >5 MB, dan pasangan bahasa sama ditolak.
- [ ] Backup penuh dapat dibuka dalam preview dan direstore setelah konfirmasi danger.
- [ ] Backup lama tanpa key onboarding dapat direstore.
- [ ] Batalkan document picker/share sheet kembali ke aplikasi tanpa error.
- [ ] Restore gagal tidak mengubah database aktif.

### Tampilan dan aksesibilitas

- [ ] Light, dark, dan system diuji setelah restart.
- [ ] Pada dark mode, buka Deck siap pakai lalu kembali ke Pustaka berulang kali. Seluruh frame transisi, termasuk background navigator, loading font, dan Suspense, harus tetap memakai kertas arang tanpa kilatan putih.
- [ ] Font sistem terbesar tetap memungkinkan aksi utama dijangkau.
- [ ] TalkBack/VoiceOver membaca progress, pilihan, error, dan hasil game dengan urutan masuk akal.
- [ ] Reduce Motion menghapus transisi dan transform yang tidak perlu.
- [ ] Keyboard, native date picker, bottom sheet, Android back, dan navbar diuji pada layar kecil.
- [ ] Buka layar anak melalui deep link/reload tanpa histori, lalu tekan tombol Kembali. Aplikasi harus menuju layar induk yang aman tanpa warning `GO_BACK was not handled by any navigator`.

## Profil performa perangkat

Gunakan data nyata atau deck bawaan, lalu catat pada perangkat kelas rendah:

- Cold start sampai Pustaka dapat disentuh.
- Waktu membuka Pustaka dengan 100 deck.
- Waktu pencarian/filter pada 20.000 entri.
- Waktu membuat sesi 50 materi dengan shuffle.
- Waktu memasang deck siap pakai terbesar.
- Buka setiap deck siap pakai, cari/filter jenis materi, pilih beberapa baris hingga semuanya bercetang, lalu tekan Tambahkan dan pilih deck tujuan. Pastikan entri, mastery Baru, tag, dan aktivitas kalender dibuat pada tanggal tindakan.
- Batalkan pilihan dengan menekan baris bercetang, buka/tutup pemilih tujuan, dan pastikan pilihan tidak hilang sebelum penyimpanan berhasil.
- Coba menambahkan kumpulan yang sebagian sudah ada. Materi duplikat harus dilewati, materi baru tetap masuk, dan hasil menampilkan jumlah keduanya.
- Pastikan deck arsip dan deck dengan pasangan bahasa berbeda tidak muncul sebagai tujuan. Jika belum ada tujuan, aksi Buat deck harus mengisi pasangan bahasa yang benar.
- Waktu backup dan restore database besar.
- Penggunaan memori saat berpindah Pustaka, Kalender, Statistik, dan game berulang kali.

Target awal: interaksi pencarian/filter terasa selesai dalam 300 ms, query utama di bawah 500 ms, tidak ada frame freeze berkepanjangan, dan tidak ada pertumbuhan memori terus-menerus setelah layar ditutup.

## Crash dan regresi

Karena Lingolog tidak memakai backend atau akun, laporan crash tidak boleh mengirim materi pengguna. Untuk MVP, catat secara manual:

- Versi aplikasi dan OS.
- Route terakhir tanpa isi kosakata/jawaban.
- Langkah reproduksi.
- Kondisi jaringan, storage, audio, dan lifecycle.
- Stack trace dari log perangkat yang sudah diperiksa agar tidak memuat data pribadi.

Setiap bug rilis harus memiliki langkah reproduksi dan, bila logikanya dapat diisolasi, test regresi otomatis sebelum ditutup.
