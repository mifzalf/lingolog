# Lingolog design system

## Scene
Lingolog dipakai ketika pengguna menemukan kata baru di perjalanan, kelas, atau saat membaca. Antarmuka harus terasa seperti membuka halaman catatan pribadi yang rapi, bukan scrapbook dekoratif.

## Prinsip
1. **Catatan, bukan ornamen.** Garis buku dan coretan membantu orientasi, tidak mengganggu isi.
2. **Tinta yang jelas.** Materi lintas bahasa selalu memakai sans-serif sistem dengan kontras tinggi.
3. **Tulisan tangan sebagai suara kecil.** Caveat hanya untuk anotasi seperti “Pustaka pribadi”.
4. **Satu tinta utama.** Hijau tinta menandai aksi dan pilihan; oker berfungsi seperti stabilo.
5. **Dark mode adalah kertas arang.** Bukan inversi hitam-putih murni.
6. **Bunglon sebagai ikon aplikasi.** Siluet garis satu tinta dipertahankan pada aset launcher dan splash, tetapi tidak digunakan sebagai ornamen di dalam halaman agar antarmuka tetap fokus.
7. **Materi toko adalah janji produk.** Screenshot dan feature graphic memakai UI release build, data demonstrasi nonpribadi, ruang napas luas, serta copy faktual tanpa badge, harga, atau klaim berlebihan.

## Tema
Tema memiliki tiga preferensi: `system`, `light`, `dark`. Pilihan disimpan pada AsyncStorage dengan key `lingolog.theme-mode`.

### Light
- Paper `#F4F3EF`
- Raised paper `#FCFBF7`
- Ink `#20231F`
- Muted ink `#62675F`
- Green ink `#355A46`
- Highlighter `#C58A2A`

### Dark
- Paper `#171A17`
- Raised paper `#222620`
- Ink `#ECEDE7`
- Muted ink `#B4B8AF`
- Green ink `#9BC5A7`
- Highlighter `#E1B45F`

## Komponen
- `ThemeProvider`: resolusi tema sistem dan persistensi preferensi; layar Pengaturan memakai tiga pilihan radio Sistem/Terang/Gelap, bukan siklus ikon.
- `PaperScreen`: latar halaman dengan garis horizontal samar.
- `ScreenHeader`: anotasi tulisan tangan, judul, dan coretan stabilo.
- `ThemeButton`: berputar `system → light → dark`, bukan toggle biner yang ambigu.
- `IconButton`: target sentuh 44×44 dan accessibility label.
- Bottom tab bar memakai bentuk native penuh agar konsisten dengan safe area perangkat. Halaman aktif ditandai melalui warna ikon dan label tanpa latar hover atau segmen tambahan.
- `Pill`: label kecil seperti potongan anotasi, tidak digunakan sebagai dekorasi massal.
- `AppDialog`: dialog konfirmasi/error global yang mengikuti token light/dark; dialog native tanpa tema tidak digunakan.
- `MasteryPicker`: pemilih grade ringkas dari kartu entri dengan target sentuh dan label yang jelas.
- Layar `Pengaturan`: daftar preferensi global yang tenang, dengan pilihan tema langsung, ringkasan mode TTS yang membuka `SpeechSettings`, sakelar haptic, dan penjelasan penyimpanan lokal.
- `SpeechSettings` memakai istilah Jelas/Natural/Pelan lalu natural alih-alih angka kecepatan sebagai hierarki utama. Setiap voice memiliki aksi Preview terpisah yang tidak mengubah radio pilihan; voice locale persis dan kualitas tinggi ditandai sebagai rekomendasi. Android menyediakan pintasan ke pengaturan TTS perangkat agar paket voice dapat dipasang tanpa membebani bundle Lingolog.
- `HapticsProvider`: satu gerbang feedback getaran agar semua game menghormati sakelar pengguna.
- Statistik memakai komponen tanpa dependency grafik: `Metric`, `ActivityBars`, `MasteryBars`, dan `ModeBreakdown`. Grafik batang 14 hari sederhana, berlabel accessibility, dan tetap selaras dengan metafora catatan.
- Hierarki statistik bergerak dari global → deck → detail entri. Angka utama selalu disertai label/basis data agar persentase tanpa jumlah sampel tidak menyesatkan.
- Date picker sesi memakai kontrol kalender native agar format dan validasi tanggal tidak dibebankan kepada pengguna.
- `CatalogDeckSheet`: lembar aksi deck dengan konteks pasangan bahasa, status arsip, pilihan tujuan gabung, serta ekspor; tindakan destruktif selalu melalui konfirmasi kedua.
- Impor berada sebagai aksi ikon pada header Katalog, sedangkan ekspor berada dalam konteks deck agar pengguna tidak perlu memilih deck dua kali. Privasi isi file dijelaskan sebelum fitur digunakan.
- `BackupSheet`: lembar data global dari ikon server pada header Katalog. Aksi backup dan restore dipisahkan secara visual dari file deck; peringatan menjelaskan bahwa backup bersifat privat dan restore mengganti seluruh data.
- `Deck siap pakai`: rak materi bawaan yang dibuka dari Pustaka. Nama ini dipilih alih-alih Store karena tidak ada pembelian, akun, atau unduhan internet. Menekan kartu membuka daftar materinya; pengguna menekan satu atau banyak kata/frasa/kalimat hingga muncul centang, lalu memilih deck tujuan yang kompatibel ketika menekan `Tambahkan`. Aksi sekunder `Tambahkan` pada kartu tetap menyalin seluruh deck. Daftar isi memberi badge yang langsung berisi nama setiap deck lokasi berdasarkan pasangan kata–arti ternormalisasi di seluruh deck lokal dengan arah bahasa yang sama; kartu katalog juga menampilkan jumlah materi yang telah dimiliki.
- Kartu deck bawaan memakai bentuk sampul yang sama dengan katalog lokal, menampilkan pasangan bahasa, ringkasan, level, jumlah entri, status Terpasang, serta aksi `Lihat isi`. Filter bahasa dan CEFR tampil sebagai chip sebelum daftar agar koleksi lintas bahasa cepat dipindai.
- Detail deck bawaan memakai alur progresif: penjelasan hubungan tanggal, pencarian, filter jenis, daftar materi multi-select dengan target 44×44, lalu bilah pilihan persisten. Pemilih deck tujuan baru muncul sebagai bottom sheet setelah pengguna menekan `Tambahkan`; duplikat pada tujuan dilewati secara atomik.
- Pustaka dan Katalog memakai pola kontrol yang sama: search bar permanen di kiri dan tombol filter 48×48 di kanan. Filter lengkap dibuka sebagai bottom sheet, badge menunjukkan jumlah filter aktif, dan chip aktif dapat dilepas langsung tanpa membuka sheet lagi.
- Restore selalu memiliki dua langkah: preview ringkasan file lalu dialog konfirmasi danger yang tidak dapat ditutup tanpa memilih tindakan.
- Onboarding memakai lima halaman catatan ringkas dengan satu fokus per halaman, indikator progres, ilustrasi kertas sederhana, tombol Lewati, Kembali, dan aksi akhir bercabang ke Deck siap pakai atau Buat deck sendiri. Tidak ada carousel otomatis atau animasi dekoratif.
- Empty state mengikuti pola `ikon → judul → alasan → aksi utama`; aksi sekunder hanya muncul jika benar-benar memberi jalur alternatif. Kalender mengarah ke Pustaka, Latihan tanpa materi mengarah ke Deck siap pakai, sedangkan Pustaka/Katalog kosong menawarkan materi bawaan dan deck sendiri.
- `AccessibilityProvider` mengikuti Reduce Motion perangkat, menonaktifkan transisi route/modal dan transform feedback yang tidak diperlukan, serta menyediakan announcement untuk perubahan penting dalam game.
- Dynamic Type diakomodasi dengan layar yang dapat digulir, kontrol yang memakai `minHeight`, dan susunan aksi yang dapat membungkus. Elemen dekoratif tidak masuk urutan fokus.
- Progress game dan onboarding memakai role/value semantik; radio, checkbox, switch, status disabled/busy, dialog modal, dan error memakai state/role aksesibilitas yang sesuai.
- Pengaturan Dikte memisahkan `Petunjuk soal` dari `Cara menjawab`, bukan mencampur empat kombinasi dalam satu daftar. Tingkat kekosongan Mudah/Sedang/Sulit hanya muncul secara progresif saat Fill dipilih.
- Varian `Isi bagian kosong` tidak memiliki input kedua. Setiap huruf yang hilang menjadi kotak input langsung di dalam kata atau kalimat; fokus maju setelah satu huruf dan pengguna tetap dapat mengetuk kotak mana pun. Hitungan progres melengkapi kotak visual, sementara screen reader membaca nomor setiap slot.
- `Jodohkan kata` memakai dua kolom familiar, kata di kiri dan arti di kanan, dengan maksimal lima baris per ronde. Pilihan aktif memakai outline tinta dan instruksi berubah untuk meminta sisi lawan; pasangan salah diberi feedback singkat tanpa menggeser layout, sedangkan pasangan benar meredup pada posisi yang sama agar pengguna tidak kehilangan orientasi. Ketuk menjadi interaksi utama, bukan drag-and-drop, agar TalkBack dan target sentuh tetap andal.
- Tab Latihan memakai grid ringkas 2×2 untuk empat game agar pilihan dapat dipindai tanpa kartu layar penuh. Latihan campuran menjadi satu aksi lebar setelah grid karena memiliki alur setup dua tahap: pilih game beserta filter bahan lengkap (deck, tanggal, dan mastery), lalu atur jumlah, urutan materi, serta seluruh filter khusus game. Coordinator mengganti game setelah setiap satu pengerjaan; Jodohkan kata dianggap satu bagian maksimal lima pasangan dan Ingat Lagi satu bagian tiga kata. Setup terakhir ditawarkan kembali melalui `AppDialog`, bukan langsung diterapkan tanpa persetujuan.
- `Ingat Lagi` memisahkan dua fase dengan tegas: tiga kartu bernomor berisi kata atau arti dan countdown lingkaran saat mengingat, lalu ikon mata tertutup, pertanyaan berdasarkan nomor tanpa membocorkan teks sebelumnya, dan pilihan pasangannya saat recall. Tidak ada kontrol yang dapat memperpanjang lima detik. Ronde aktif dimulai ulang setelah resume agar lifecycle aplikasi tidak mengurangi waktu belajar secara tersembunyi.
- Target ikon minimum 44×44 atau memperoleh `hitSlop`; status tidak pernah disampaikan hanya melalui warna.

## Aturan penggunaan
- Semua komponen baru mengambil warna dari `useTheme()`.
- Jangan hardcode warna halaman pada feature screen.
- Jangan memakai font tulisan tangan pada jawaban dikte, kosakata, tombol, atau body text.
- Tekstur kertas harus tetap sangat samar pada kedua tema.
- Aksi tidak boleh dibedakan dengan warna saja; gunakan ikon, label, atau bentuk juga.
- Teks normal dan placeholder menargetkan kontras WCAG AA 4.5:1; teks besar dan komponen nonteks menargetkan 3:1. `inkFaint` hanya boleh dipakai jika memenuhi fungsi dan kontras tersebut.
- Checklist visual dan perangkat fisik berada di `docs/TESTING.md`; perubahan UI kritis harus diperiksa pada tema terang/gelap, font terbesar, layar kecil, keyboard, dan screen reader sebelum kandidat rilis.
- Splash memakai bunglon tinta gelap di kertas `#F4F3EF` dan varian tinta terang transparan pada kertas arang `#171A17`; hasil standalone harus diperiksa karena Expo Go tidak mereplikasi splash final.
- Sumber caption, urutan screenshot, dan arahan feature graphic berada di `docs/STORE_LISTING.md`.
