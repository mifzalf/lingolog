# Kebijakan Privasi Lingolog

**Berlaku sejak: 1 Januari 2026**  
**Versi kebijakan: 1.0**

Lingolog adalah aplikasi belajar bahasa yang dirancang untuk digunakan secara offline. Kebijakan ini menjelaskan data apa yang diproses aplikasi dan kendali yang dimiliki pengguna.

## Ringkasan

- Lingolog tidak memerlukan akun.
- Lingolog tidak memiliki backend atau sinkronisasi cloud.
- Materi belajar dan progres disimpan lokal pada perangkat.
- Lingolog tidak menjual data, tidak menampilkan iklan, dan tidak memakai pelacak pihak ketiga.
- Data hanya meninggalkan aplikasi ketika pengguna secara eksplisit memilih fitur berbagi, ekspor, backup, atau restore melalui antarmuka sistem perangkat.

## Data yang diproses

Lingolog memproses data yang pengguna buat atau pilih, antara lain:

- Deck, kata, frasa, kalimat, terjemahan, contoh, catatan, tag, dan favorit.
- Status mastery, konfigurasi sesi, jawaban latihan, koreksi Dikte, statistik, serta histori aktivitas.
- Preferensi tema, text-to-speech, voice, kecepatan suara, haptic, dan status onboarding.
- File deck atau backup yang pengguna pilih untuk diimpor atau dipulihkan.

Data tersebut diperlukan untuk menjalankan fungsi aplikasi dan disimpan pada perangkat pengguna.

## Penyimpanan dan retensi

Data inti disimpan dalam database SQLite lokal. Preferensi tertentu juga disimpan dalam penyimpanan lokal aplikasi. Lingolog tidak mengirim salinan otomatis ke pengembang atau layanan cloud.

Data tetap berada di perangkat sampai pengguna mengubah atau menghapusnya, menghapus data aplikasi, mencopot aplikasi, atau mengganti seluruh data melalui restore. Perilaku penghapusan saat uninstall dapat bergantung pada sistem operasi dan mekanisme backup perangkat yang pengguna aktifkan sendiri.

## Text-to-speech

Lingolog memakai layanan text-to-speech yang tersedia pada perangkat. Pemrosesan suara dapat dilakukan oleh mesin TTS atau paket voice yang dipilih di sistem operasi. Ketersediaan offline dan praktik data mesin TTS pihak ketiga bergantung pada penyedia voice serta pengaturan perangkat. Lingolog tidak mengganti bahasa secara diam-diam dan tidak mengirim materi ke server milik Lingolog.

## Ekspor, berbagi, backup, dan restore

Tindakan berikut hanya berjalan setelah pengguna memulainya:

- **Ekspor deck** membuat file yang dapat dibagikan tanpa ID lokal, favorit, mastery, statistik, jawaban, sesi, atau histori pribadi.
- **Backup penuh** dapat memuat seluruh data pengguna dan preferensi lokal. File ini bersifat privat.
- **Berbagi file** menggunakan share sheet atau penyimpanan yang disediakan sistem operasi. Tujuan yang dipilih pengguna—misalnya aplikasi pesan, penyimpanan perangkat, atau penyedia cloud—memiliki kebijakan privasinya sendiri.
- **Impor dan restore** membaca file yang dipilih pengguna. Restore divalidasi sebelum mengganti database aktif.

Pengguna bertanggung jawab menjaga dan menghapus salinan file yang telah dibagikan atau disimpan di luar Lingolog.

## Izin dan akses perangkat

Lingolog dapat menggunakan kemampuan perangkat berikut ketika diperlukan:

- Audio/speaker untuk text-to-speech.
- Haptic/getaran untuk feedback latihan jika diaktifkan.
- Document picker, penyimpanan, dan share sheet sistem untuk impor, ekspor, backup, dan restore.

Lingolog tidak meminta akses akun, lokasi, kontak, kamera, mikrofon, atau iklan untuk fungsi MVP. Dikte memakai audio TTS dan input teks, bukan perekaman mikrofon.

## Anak-anak

Lingolog tidak mengumpulkan data pribadi melalui server dan tidak menyediakan akun atau interaksi publik. Orang tua atau wali tetap perlu mengawasi penggunaan perangkat, mesin TTS pihak ketiga, serta tujuan berbagi file oleh anak.

## Keamanan

Lingolog memvalidasi format file impor dan integritas backup sebelum restore, menggunakan transaksi database untuk operasi penting, dan menyimpan data di sandbox aplikasi. Namun, tidak ada penyimpanan perangkat yang sepenuhnya bebas risiko. Pengguna disarankan mengaktifkan kunci layar dan enkripsi perangkat serta memperlakukan file backup penuh sebagai data privat.

## Hak dan kendali pengguna

Karena data tidak disimpan pada server Lingolog, pengguna mengendalikan data langsung di aplikasi dan perangkat. Pengguna dapat:

- Mengubah atau menghapus deck dan entri.
- Mengarsipkan atau memulihkan deck.
- Membuat backup penuh atau ekspor deck.
- Menghapus seluruh data melalui pengaturan sistem aplikasi atau uninstall.

Tidak ada profil server yang perlu diminta untuk diakses atau dihapus.

## Perubahan kebijakan

Jika kemampuan aplikasi berubah—misalnya penambahan akun, sinkronisasi, analytics, crash reporting jarak jauh, iklan, atau layanan cloud—kebijakan ini harus diperbarui sebelum kemampuan tersebut dirilis. Tanggal berlaku dan versi kebijakan akan ikut diperbarui.

## Kontak

Sebelum publikasi toko aplikasi, pengelola rilis wajib mengganti bagian ini dengan alamat email dukungan yang aktif dan URL publik permanen untuk kebijakan ini.

**Kontak dukungan: belum ditetapkan**
