# Lingolog design system

## Scene
Lingolog dipakai ketika pengguna menemukan kata baru di perjalanan, kelas, atau saat membaca. Antarmuka harus terasa seperti membuka halaman catatan pribadi yang rapi, bukan scrapbook dekoratif.

## Prinsip
1. **Catatan, bukan ornamen.** Garis buku dan coretan membantu orientasi, tidak mengganggu isi.
2. **Tinta yang jelas.** Materi lintas bahasa selalu memakai sans-serif sistem dengan kontras tinggi.
3. **Tulisan tangan sebagai suara kecil.** Caveat hanya untuk anotasi seperti “Pustaka pribadi”.
4. **Satu tinta utama.** Hijau tinta menandai aksi dan pilihan; oker berfungsi seperti stabilo.
5. **Dark mode adalah kertas arang.** Bukan inversi hitam-putih murni.

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
- `ThemeProvider`: resolusi tema sistem dan persistensi preferensi.
- `PaperScreen`: latar halaman dengan garis horizontal samar.
- `ScreenHeader`: anotasi tulisan tangan, judul, dan coretan stabilo.
- `ThemeButton`: berputar `system → light → dark`, bukan toggle biner yang ambigu.
- `IconButton`: target sentuh 44×44 dan accessibility label.
- `Pill`: label kecil seperti potongan anotasi, tidak digunakan sebagai dekorasi massal.

## Aturan penggunaan
- Semua komponen baru mengambil warna dari `useTheme()`.
- Jangan hardcode warna halaman pada feature screen.
- Jangan memakai font tulisan tangan pada jawaban dikte, kosakata, tombol, atau body text.
- Tekstur kertas harus tetap sangat samar pada kedua tema.
- Aksi tidak boleh dibedakan dengan warna saja; gunakan ikon, label, atau bentuk juga.
