# Identitas dan versi rilis Lingolog

## Sumber versi

Versi publik disimpan sinkron pada:

- `app.json` → `expo.version`
- `package.json` → `version`

Build pertama memakai:

```text
Marketing version: 1.0.0
Android versionCode: 1
iOS buildNumber: 1
Database schema: 5
Deck transfer format: 1
```

Keempat jenis versi memiliki tujuan berbeda. Menaikkan versi aplikasi tidak otomatis menaikkan schema database atau format file.

## Aturan peningkatan

- Naikkan `versionCode` dan `buildNumber` untuk **setiap binary** yang dikirim ke toko/internal testing, termasuk rebuild dengan marketing version yang sama.
- Naikkan patch `1.0.x` untuk bugfix kompatibel.
- Naikkan minor `1.x.0` untuk fitur kompatibel.
- Naikkan major hanya untuk perubahan produk atau kompatibilitas besar.
- Jangan pernah menurunkan build number yang pernah dikirim ke console.
- Jika schema berubah, tambahkan migrasi dan jalankan seluruh jalur migrasi dari versi yang masih didukung.

## Identitas tetap

```text
Nama: Lingolog
Slug: lingolog
Scheme: lingolog
Android package: com.lingolog.app
iOS bundle identifier: com.lingolog.app
Orientation: portrait
```

Perubahan package/bundle identifier setelah publikasi dianggap aplikasi berbeda oleh toko.

## Aset

- `assets/icon.png`: ikon utama 1024×1024.
- `assets/android-icon-foreground.png`: foreground adaptive icon.
- `assets/android-icon-background.png`: layer background adaptive icon.
- `assets/android-icon-monochrome.png`: themed icon Android.
- `assets/splash-icon.png`: splash tema terang.
- `assets/splash-icon-dark.png`: splash tema gelap.
- `assets/favicon.png`: web/favicon.

Splash dikonfigurasi melalui plugin `expo-splash-screen`, metode yang direkomendasikan Expo. Splash final wajib diuji pada release build karena Expo Go tidak mereplikasi hasil standalone sepenuhnya.

## Gate identitas sebelum Tahap 20

```bash
npm run verify
npx expo install --check
CI=1 npx expo-doctor@latest
npx expo config --type public
npx expo export --platform android --clear
```

Periksa hasil config:

- Nama, package, bundle identifier, version, versionCode, dan buildNumber benar.
- Semua aset ditemukan.
- Splash light/dark dan adaptive icon tidak terpotong.
- Tidak ada permission sensitif yang masuk tanpa alasan produk.
- Privacy policy dan store listing sesuai binary aktual.

## Tahap 20: EAS Build

Konfigurasi build berada di `eas.json`:

- `preview`: internal distribution dan APK Android yang dapat dipasang langsung.
- `production`: AAB Android dan archive iOS untuk jalur toko.
- Versi native bersumber dari `app.json` (`appVersionSource: local`), sehingga setiap rebuild wajib didahului kenaikan `versionCode` dan `buildNumber` yang dicatat di Git.

Gate kandidat lokal dapat dijalankan dengan:

```bash
npm run release:check
```

Prosedur build, distribusi, smoke test, bug ledger, dan kriteria kelulusan ada di `docs/INTERNAL_TESTING.md`. Credential signing, token EAS, certificate, provisioning profile, dan keystore tidak boleh dimasukkan ke Git.

## Batas otomatisasi

Konfigurasi dan gate lokal dapat disiapkan tanpa akun. Pembuatan APK/AAB/archive bertanda tangan memerlukan login EAS dan signing credentials; pengujian audio, lifecycle, storage, accessibility, dan distribusi tetap memerlukan perangkat fisik. Tahap 20 tidak boleh ditandai selesai hanya berdasarkan Expo export.
