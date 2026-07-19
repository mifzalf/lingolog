# Kandidat internal Lingolog 1.0.0 (build 1)

Dokumen ini adalah lembar hasil Tahap 20. Jangan menandai kandidat lulus sebelum binary bertanda tangan diuji pada perangkat fisik.

## Status kandidat

```text
Marketing version: 1.0.0
Android package/versionCode: com.lingolog.app / 1
iOS bundle/buildNumber: com.lingolog.app / 1
Katalog: 11 deck Jerman / 1.083 materi
Commit/build URL: belum tersedia
Android APK URL: belum tersedia
Android AAB URL: belum tersedia
iOS internal/TestFlight URL: belum tersedia
Pemilik pengujian: belum ditetapkan
Tanggal mulai: belum ditetapkan
Gate otomatis lokal: LULUS
Dependency audit: 0 high/critical; 14 moderate pada rantai tool Expo/transitif
Keputusan: DIBLOKIR — akun EAS, signing, dan perangkat fisik belum tersedia
```

Build number `1` hanya boleh digunakan untuk binary kandidat pertama. Naikkan `android.versionCode` dan `ios.buildNumber` sebelum membuat binary berikutnya, termasuk rebuild dengan source yang sama.

## Konfigurasi EAS

`eas.json` menyediakan dua profil:

- `preview`: internal distribution; Android menghasilkan APK yang dapat dipasang langsung. iOS memakai ad hoc distribution dan memerlukan UDID perangkat tester.
- `production`: format toko standar; Android menghasilkan AAB, sedangkan iOS menghasilkan archive App Store.

Versi native memakai source lokal (`cli.appVersionSource = local`) agar nomor yang tercatat di Git dan binary tetap mudah diaudit. Jangan menyimpan keystore, certificate, provisioning profile, token, atau `credentials.json` di repository.

## Gate sebelum build

```bash
npm run release:check
npx eas-cli whoami
npx eas-cli config --platform android --profile preview
npx eas-cli config --platform android --profile production
npx eas-cli config --platform ios --profile preview
npx eas-cli config --platform ios --profile production
```

Semua perintah config harus mempertahankan `com.lingolog.app`, versi `1.0.0`, dan build number yang sedang dirilis.

## Membuat binary

Jalankan login dan tautkan proyek hanya menggunakan akun Expo pemilik aplikasi:

```bash
npx eas-cli login
npx eas-cli init
```

`eas init` akan menambahkan `expo.extra.eas.projectId` ke konfigurasi. Tinjau perubahan tersebut dan jangan menerima perubahan package/bundle identifier.

### Android internal APK

```bash
npx eas-cli build --platform android --profile preview
```

Unduh APK dari build URL, catat URL di atas, pasang pada sedikitnya satu perangkat Android fisik, lalu jalankan seluruh checklist kandidat.

### Android production AAB

```bash
npx eas-cli build --platform android --profile production
```

AAB tidak dapat dipasang langsung. Unggah ke track Internal testing Google Play setelah identitas legal, privacy policy HTTPS, support URL, dan kontak dukungan tersedia. Pasang kembali melalui Play Store untuk memvalidasi binary yang benar-benar didistribusikan.

### iOS internal

Daftarkan setiap perangkat tester lebih dahulu:

```bash
npx eas-cli device:create
npx eas-cli build --platform ios --profile preview
```

Build ad hoc hanya dapat dipasang pada UDID yang tercantum saat provisioning profile dibuat. Alternatif distribusi adalah production build melalui TestFlight:

```bash
npx eas-cli build --platform ios --profile production
```

Pembuatan iOS memerlukan Apple Developer membership, distribution certificate, dan provisioning profile. Submission ke TestFlight/App Store tetap diblokir sampai metadata legal dan support lengkap.

## Smoke test wajib pada setiap binary

- [ ] Identitas aplikasi, ikon adaptive, splash light/dark, dan nomor versi benar.
- [ ] Instalasi bersih membuka onboarding; restart tidak mengulang onboarding yang selesai.
- [ ] Upgrade dari data schema lama mempertahankan deck, entri, aktivitas, dan preferensi.
- [ ] Buat deck Jerman → Indonesia, buka Deck siap pakai, multi-select materi, pilih tujuan setelah menekan Tambahkan, dan pastikan duplikat dilewati.
- [ ] Pasang satu deck siap pakai penuh dan pastikan instalasi transaksional serta marker tetap ada setelah restart.
- [ ] Kartu flash dan Dikte selesai tanpa jawaban ganda; hasil, mastery, kalender, dan statistik bertambah tepat.
- [ ] TTS mode pesawat memakai voice offline yang sesuai; interupsi audio/background tidak menyebabkan crash.
- [ ] Ekspor/impor deck dan backup/restore berhasil melalui document picker/share sheet nyata.
- [ ] Light/dark/system, Dynamic Type terbesar, Reduce Motion, TalkBack/VoiceOver, Android back, keyboard, dan safe area tetap dapat digunakan.
- [ ] Force close dan storage hampir penuh tidak menghasilkan data parsial.
- [ ] Tidak ada permission sensitif yang tidak diperlukan dan tidak ada materi pengguna di log crash.

Gunakan matriks lengkap di `docs/TESTING.md`; checklist di atas bukan pengganti pengujian regresi penuh.

## Pencatatan bug

Setiap bug kandidat harus mencatat:

```text
ID:
Platform/perangkat/OS:
Binary dan build URL:
Severity: blocker | critical | major | minor
Route terakhir (tanpa isi materi pengguna):
Langkah reproduksi:
Hasil aktual:
Hasil yang diharapkan:
Kondisi jaringan/storage/audio/lifecycle:
Status dan test regresi:
```

Kandidat ditolak bila ada crash reproducible, kehilangan/korupsi data, restore tidak atomik, aksi utama tidak dapat dijangkau dengan accessibility, atau identitas/signing binary salah.

## Kriteria selesai Tahap 20

Tahap 20 baru selesai bila seluruh kondisi berikut terpenuhi:

- APK internal Android bertanda tangan berhasil dibuat dan lulus pada perangkat fisik.
- AAB production Android berhasil dibuat dan, bila console tersedia, divalidasi melalui track internal.
- Build iOS internal atau TestFlight berhasil dibuat dan lulus pada perangkat fisik.
- Checklist Android/iOS di `docs/TESTING.md` memiliki hasil nyata, bukan asumsi dari Expo export.
- Semua blocker/critical/major ditutup dan pemeriksaan otomatis tetap lulus.
- Build URL, tester, tanggal, hasil, dan keputusan kandidat dicatat di dokumen ini.
- Identitas legal, kontak dukungan, support URL, dan privacy policy HTTPS tersedia sebelum submission publik.
