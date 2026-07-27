import { curatedGermanDeck, germanEntries } from './german-builder';

const words = (tag: string, rows: string) => germanEntries('word', tag, rows);
const phrases = (tag: string, rows: string) => germanEntries('phrase', tag, rows);

/**
 * Kurasi tambahan berbasis fungsi komunikasi dan lingkup kosakata resmi Goethe-Zertifikat
 * A1/A2/B1. Terjemahan Indonesia ditulis khusus untuk Lingolog; daftar ini bukan salinan
 * mentah dokumen sumber. Lihat docs/CONTENT_SOURCES.md.
 */
export const germanCefrExpansionStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-a1-kata-rumah-diri', name: 'Jerman A1 · Kata Rumah & Diri', summary: 'Benda pribadi, pakaian, rumah, kelas, dan kegiatan dasar yang belum ada di koleksi inti.', description: 'Kosakata konkret A1 untuk mengenali dan menyebut benda serta tindakan paling dekat dengan kehidupan sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#486B58', featured: true,
    entries: words('a1-kata-tambahan', `
der Geburtsort, die Geburtsorte\ttempat lahir
der Familienname, die Familiennamen\tnama keluarga
die E-Mail-Adresse, die E-Mail-Adressen\talamat surel
die Hausnummer, die Hausnummern\tnomor rumah
das Alter\tusia
das Heimatland, die Heimatländer\tnegara asal
die Muttersprache, die Muttersprachen\tbahasa ibu
das Hobby, die Hobbys\thobi
das Foto, die Fotos\tfoto
die Brille, die Brillen\tkacamata
die Tasche, die Taschen\ttas
der Rucksack, die Rucksäcke\transel
der Regenschirm, die Regenschirme\tpayung
die Geldbörse, die Geldbörsen\tdompet
das Handy, die Handys\ttelepon genggam
das Ladegerät, die Ladegeräte\tpengisi daya
das Hemd, die Hemden\tkemeja
die Hose, die Hosen\tcelana
der Rock, die Röcke\trok
das Kleid, die Kleider\tgaun
die Jacke, die Jacken\tjaket
der Schuh, die Schuhe\tsepatu
die Socke, die Socken\tkaus kaki
die Mütze, die Mützen\ttopi kupluk
der Gürtel, die Gürtel\tikat pinggang
das Wohnzimmer, die Wohnzimmer\truang keluarga
das Schlafzimmer, die Schlafzimmer\tkamar tidur
der Flur, die Flure\tlorong
die Toilette, die Toiletten\tkamar mandi
der Balkon, die Balkone\tbalkon
die Treppe, die Treppen\ttangga
die Wand, die Wände\tdinding
der Boden, die Böden\tlantai
die Decke, die Decken\tlangit-langit
das Fenster, die Fenster\tjendela
die Tür, die Türen\tpintu
der Tisch, die Tische\tmeja
der Stuhl, die Stühle\tkursi
das Bett, die Betten\ttempat tidur
der Schrank, die Schränke\tlemari
das Regal, die Regale\trak
die Lampe, die Lampen\tlampu
der Spiegel, die Spiegel\tcermin
der Kühlschrank, die Kühlschränke\tlemari es
der Herd, die Herde\tkompor
die Waschmaschine, die Waschmaschinen\tmesin cuci
der Bleistift, die Bleistifte\tpensil
der Kugelschreiber, die Kugelschreiber\tpena bolpoin
das Heft, die Hefte\tbuku tulis
das Wörterbuch, die Wörterbücher\tkamus
die Tafel, die Tafeln\tpapan tulis
der Radiergummi, die Radiergummis\tpenghapus
die Schere, die Scheren\tgunting
das Blatt, die Blätter\tlembar kertas
anziehen\tmengenakan pakaian
ausziehen\tmelepas pakaian
einschalten\tmenyalakan
ausschalten\tmematikan
putzen\tmembersihkan
aufräumen\tmerapikan`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-kebutuhan', name: 'Jerman A1 · Frasa Kebutuhan Dasar', summary: 'Ungkapan pendek untuk identitas, rumah, kelas, belanja, dan kebutuhan langsung.', description: 'Frasa A1 yang dapat langsung dipakai untuk bertanya, menjawab, meminta, dan mengklarifikasi.', level: 'pemula', category: 'sehari-hari', color: '#6D7D45', featured: true,
    entries: phrases('a1-frasa-tambahan', `
Wie ist dein Vorname?\tSiapa nama depanmu?
Mein Familienname ist Hartmann.\tNama keluarga saya Hartmann.
Woher kommst du genau?\tKamu tepatnya berasal dari mana?
Ich bin in Indonesien geboren.\tSaya lahir di Indonesia.
Welche Sprachen sprichst du?\tBahasa apa saja yang kamu gunakan?
Ich lerne erst seit Kurzem Deutsch.\tSaya baru belajar bahasa Jerman belum lama ini.
Kannst du das bitte buchstabieren?\tBisakah kamu mengejanya?
Meine Telefonnummer hat sich geändert.\tNomor telepon saya telah berubah.
Hier ist meine neue Adresse.\tIni alamat baru saya.
Ich bin dreiundzwanzig Jahre alt.\tSaya berusia dua puluh tiga tahun.
Was machst du gern?\tApa yang suka kamu lakukan?
Ich höre gern Musik.\tSaya suka mendengarkan musik.
Das ist ein Foto von meiner Familie.\tIni foto keluarga saya.
Wer ist die Frau dort?\tSiapa perempuan di sana?
Das ist meine ältere Schwester.\tItu kakak perempuan saya.
Ich wohne im zweiten Stock.\tSaya tinggal di lantai dua.
Die Wohnung hat einen Balkon.\tApartemennya memiliki balkon.
Mein Zimmer ist ziemlich klein.\tKamar saya cukup kecil.
Die Küche ist neben dem Bad.\tDapur berada di sebelah kamar mandi.
Mach bitte das Fenster auf.\tTolong buka jendelanya.
Mach bitte die Tür zu.\tTolong tutup pintunya.
Wo liegt mein Schlüssel?\tDi mana letak kunci saya?
Er liegt auf dem Tisch.\tKuncinya terletak di atas meja.
Die Jacke hängt im Schrank.\tJaketnya tergantung di lemari.
Räum bitte dein Zimmer auf.\tTolong rapikan kamarmu.
Ich muss noch die Küche putzen.\tSaya masih harus membersihkan dapur.
Die Waschmaschine ist kaputt.\tMesin cucinya rusak.
Das Licht funktioniert nicht.\tLampunya tidak berfungsi.
Darf ich die Lampe einschalten?\tBolehkah saya menyalakan lampunya?
Bitte lass das Licht aus.\tTolong biarkan lampunya mati.
Welches Hemd möchtest du?\tKemeja mana yang kamu inginkan?
Ich nehme das blaue Hemd.\tSaya memilih kemeja biru itu.
Die Hose ist mir zu lang.\tCelana itu terlalu panjang untuk saya.
Haben Sie das eine Nummer kleiner?\tApakah ada yang satu ukuran lebih kecil?
Wo kann ich das anprobieren?\tDi mana saya dapat mencobanya?
Die Schuhe passen gut.\tSepatunya pas.
Ich suche eine warme Jacke.\tSaya mencari jaket hangat.
Diese Farbe gefällt mir.\tSaya menyukai warna ini.
Was kostet die Tasche?\tBerapa harga tas itu?
Ich bezahle mit Bargeld.\tSaya membayar dengan uang tunai.
Ich habe meinen Stift vergessen.\tSaya lupa membawa pena.
Kann ich einen Bleistift haben?\tBolehkah saya meminta sebuah pensil?
Schlagt bitte das Buch auf.\tTolong buka bukunya.
Auf welcher Seite sind wir?\tKita berada di halaman berapa?
Schreib das Wort ins Heft.\tTuliskan kata itu di buku tulis.
Was steht an der Tafel?\tApa yang tertulis di papan?
Ich verstehe diese Aufgabe nicht.\tSaya tidak memahami tugas ini.
Können Sie ein Beispiel geben?\tBisakah Anda memberikan contoh?
Wie sagt man das auf Deutsch?\tBagaimana mengatakannya dalam bahasa Jerman?
Was bedeutet dieses Wort?\tApa arti kata ini?
Bitte sprechen Sie etwas langsamer.\tMohon berbicara sedikit lebih lambat.
Können Sie den Satz wiederholen?\tBisakah Anda mengulangi kalimatnya?
Ist meine Antwort richtig?\tApakah jawaban saya benar?
Ich bin mit der Übung fertig.\tSaya sudah selesai dengan latihan ini.
Darf ich kurz rausgehen?\tBolehkah saya keluar sebentar?
Ich brauche eine kurze Pause.\tSaya membutuhkan istirahat sebentar.
Mir ist ein bisschen kalt.\tSaya merasa sedikit kedinginan.
Ich habe großen Durst.\tSaya sangat haus.
Ich bin noch nicht müde.\tSaya belum lelah.
Bis morgen im Kurs!\tSampai besok di kelas!`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-kata-kota-layanan', name: 'Jerman A2 · Kata Kota & Layanan', summary: 'Lingkungan tempat tinggal, layanan publik, komunikasi, kesehatan, dan urusan harian.', description: 'Kosakata A2 untuk mengurus kebutuhan rutin secara lebih mandiri di lingkungan berbahasa Jerman.', level: 'pemula', category: 'sehari-hari', color: '#756287', featured: true,
    entries: words('a2-kata-tambahan', `
die Nachbarschaft, die Nachbarschaften\tlingkungan tempat tinggal
der Nachbar, die Nachbarn\ttetangga laki-laki
die Nachbarin, die Nachbarinnen\ttetangga perempuan
der Hausmeister, die Hausmeister\tpengelola gedung laki-laki
die Hausmeisterin, die Hausmeisterinnen\tpengelola gedung perempuan
die Miete, die Mieten\tsewa tempat tinggal
die Nebenkosten\tbiaya tambahan sewa
der Mietvertrag, die Mietverträge\tkontrak sewa
der Umzug, die Umzüge\tpindahan rumah
der Haushalt, die Haushalte\trumah tangga
der Müll\tsampah
die Mülltonne, die Mülltonnen\ttong sampah
der Briefkasten, die Briefkästen\tkotak surat
das Paket, die Pakete\tpaket
die Postleitzahl, die Postleitzahlen\tkode pos
das Bürgeramt, die Bürgerämter\tkantor administrasi warga
die Anmeldung, die Anmeldungen\tpendaftaran
das Formular, die Formulare\tformulir
die Unterschrift, die Unterschriften\ttanda tangan
die Gebühr, die Gebühren\tbiaya layanan
der Termin, die Termine\tjanji temu
die Warteschlange, die Warteschlangen\tantrean
die Sprechstunde, die Sprechstunden\tjam konsultasi
das Rezept, die Rezepte\tresep dokter
die Tropfen\tobat tetes
die Salbe, die Salben\tsalep
die Erkältung, die Erkältungen\tflu ringan
die Kopfschmerzen\tsakit kepala
das Fieber\tdemam
die Verletzung, die Verletzungen\tcedera
die Versicherungsleistung, die Versicherungsleistungen\tmanfaat asuransi
die Krankenkasse, die Krankenkassen\tasuransi kesehatan wajib
das Konto, die Konten\trekening
die Überweisung, die Überweisungen\ttransfer bank
der Geldautomat, die Geldautomaten\tmesin ATM
die Mahnung, die Mahnungen\tperingatan pembayaran
die Quittung, die Quittungen\tstruk pembayaran
die Rückgabe, die Rückgaben\tpengembalian barang
der Umtausch, die Umtausche\tpenukaran barang
der Kundenservice\tlayanan pelanggan
die Nachricht, die Nachrichten\tpesan
der Anruf, die Anrufe\tpanggilan telepon
die Mailbox, die Mailboxen\tkotak pesan suara
das Passwort, die Passwörter\tkata sandi
die Webseite, die Webseiten\tsitus web
die Verbindung, die Verbindungen\tkoneksi
der Bildschirm, die Bildschirme\tlayar
die Tastatur, die Tastaturen\tpapan ketik
der Drucker, die Drucker\tmesin cetak
umziehen\tpindah rumah
abholen\tmenjemput atau mengambil
zurückgeben\tmengembalikan
einen Antrag einreichen\tmenyerahkan permohonan resmi
abbuchen\tmendebit rekening
online bestellen\tmemesan secara daring
eine Ware beanstanden\tmengajukan keberatan atas barang
verschieben\tmenjadwal ulang
reparieren\tmemperbaiki
installieren\tmemasang perangkat lunak
eintragen\tmemasukkan data`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-frasa-mandiri', name: 'Jerman A2 · Frasa Hidup Mandiri', summary: 'Ungkapan untuk tempat tinggal, janji temu, kesehatan, pembayaran, dan komunikasi digital.', description: 'Frasa A2 untuk menangani urusan harian, menjelaskan kendala, serta meminta solusi dengan sopan.', level: 'pemula', category: 'sehari-hari', color: '#9A6E53', featured: true,
    entries: phrases('a2-frasa-tambahan', `
Ich bin vor zwei Wochen umgezogen.\tSaya pindah rumah dua minggu lalu.
Die neue Wohnung liegt zentral.\tApartemen baru itu terletak di pusat kota.
Die Miete ist ohne Nebenkosten.\tHarga sewanya belum termasuk biaya tambahan.
Wann wird die Heizung repariert?\tKapan pemanasnya akan diperbaiki?
Im Flur ist eine Lampe ausgefallen.\tSebuah lampu di lorong mati.
Der Wasserhahn tropft seit gestern.\tKeran air menetes sejak kemarin.
Könnten Sie den Hausmeister informieren?\tBisakah Anda memberi tahu pengelola gedung?
Wo darf ich mein Fahrrad abstellen?\tDi mana saya boleh memarkir sepeda?
Der Müll wird dienstags abgeholt.\tSampah diangkut setiap hari Selasa.
Für mich ist ein Paket angekommen.\tAda paket yang tiba untuk saya.
Ich hole es später bei Ihnen ab.\tSaya akan mengambilnya dari Anda nanti.
Könnten Sie meine Pflanzen gießen?\tBisakah Anda menyiram tanaman saya?
Wir möchten die Nachbarn kennenlernen.\tKami ingin berkenalan dengan para tetangga.
Am Samstag feiern wir unseren Einzug.\tPada hari Sabtu kami merayakan kepindahan kami.
Bitte sagen Sie Bescheid, wenn es zu laut ist.\tTolong beri tahu jika terlalu bising.
Ich brauche einen Termin beim Bürgeramt.\tSaya membutuhkan janji temu di kantor administrasi warga.
Welche Unterlagen muss ich mitbringen?\tDokumen apa yang harus saya bawa?
Füllen Sie bitte dieses Formular aus.\tSilakan isi formulir ini.
Hier fehlt noch Ihre Unterschrift.\tTanda tangan Anda masih belum ada di sini.
Wie hoch ist die Gebühr?\tBerapa biaya layanannya?
Kann ich den Termin online verschieben?\tBisakah saya menjadwal ulang janji secara daring?
Leider muss ich den Termin absagen.\tSayangnya saya harus membatalkan janji.
Ich warte schon seit einer halben Stunde.\tSaya sudah menunggu selama setengah jam.
Wann bin ich ungefähr dran?\tKira-kira kapan giliran saya?
Ich habe seit Tagen starken Husten.\tSaya mengalami batuk parah selama beberapa hari.
Tut es weh, wenn Sie sich bewegen?\tApakah terasa sakit ketika Anda bergerak?
Ich vertrage dieses Medikament nicht.\tSaya tidak cocok dengan obat ini.
Wie oft soll ich die Tabletten nehmen?\tSeberapa sering saya harus meminum tablet ini?
Nehmen Sie das Medikament nach dem Essen.\tMinumlah obat itu setelah makan.
Dafür brauchen Sie ein Rezept.\tUntuk itu Anda membutuhkan resep dokter.
Meine Versichertenkarte ist abgelaufen.\tKartu asuransi saya telah kedaluwarsa.
Übernimmt die Krankenkasse die Kosten?\tApakah asuransi kesehatan menanggung biayanya?
Ich möchte ein Konto eröffnen.\tSaya ingin membuka rekening.
Die Überweisung ist noch nicht angekommen.\tTransfernya belum masuk.
An welchem Automaten kann ich Geld abheben?\tDi ATM mana saya dapat menarik uang?
Bitte schicken Sie mir die Rechnung per E-Mail.\tTolong kirimkan tagihannya melalui surel.
Ich habe den Betrag bereits bezahlt.\tSaya sudah membayar jumlah tersebut.
Könnte ich eine Quittung bekommen?\tBisakah saya mendapatkan struk?
Ich möchte diesen Artikel zurückgeben.\tSaya ingin mengembalikan barang ini.
Das Gerät ist noch unter Garantie.\tPerangkat itu masih dalam masa garansi.
Der Kundenservice war nicht erreichbar.\tLayanan pelanggan tidak dapat dihubungi.
Ich hinterlasse Ihnen eine Nachricht.\tSaya meninggalkan pesan untuk Anda.
Rufen Sie mich bitte später zurück.\tTolong hubungi saya kembali nanti.
Ich habe Ihren Anruf verpasst.\tSaya melewatkan panggilan Anda.
Mein Akku ist fast leer.\tBaterai saya hampir habis.
Ich habe das Passwort vergessen.\tSaya lupa kata sandinya.
Die Internetverbindung bricht ständig ab.\tKoneksi internet terus terputus.
Die Webseite wird nicht richtig angezeigt.\tSitus webnya tidak ditampilkan dengan benar.
Klicken Sie oben rechts auf das Symbol.\tKlik simbol di kanan atas.
Speichern Sie zuerst Ihre Änderungen.\tSimpan perubahan Anda terlebih dahulu.
Der Drucker hat kein Papier mehr.\tKertas di mesin cetak sudah habis.
Kannst du mir die Datei schicken?\tBisakah kamu mengirimkan berkasnya kepada saya?
Ich melde mich heute Abend wieder.\tSaya akan menghubungi kembali malam ini.
Wir können uns auch online treffen.\tKita juga dapat bertemu secara daring.
Der Kurs findet zweimal wöchentlich statt.\tKursusnya berlangsung dua kali seminggu.
Ich habe mich bereits angemeldet.\tSaya sudah mendaftar.
Gibt es noch freie Plätze?\tApakah masih ada tempat kosong?
Ich kann diesmal nicht teilnehmen.\tKali ini saya tidak dapat berpartisipasi.
Wie war dein Wochenende?\tBagaimana akhir pekanmu?
Es war anders als geplant.\tAkhir pekannya berbeda dari rencana.`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-masyarakat', name: 'Jerman B1 · Kata Masyarakat & Kehidupan', summary: 'Pendidikan, lingkungan, hubungan sosial, konsumsi, media, dan kehidupan warga.', description: 'Kosakata B1 untuk membicarakan pengalaman, sebab-akibat, perubahan, dan persoalan masyarakat secara mandiri.', level: 'menengah', category: 'lainnya', color: '#4D6877', featured: true,
    entries: words('b1-kata-tambahan', `
die Bildungsmaßnahme, die Bildungsmaßnahmen\tprogram pendidikan
der Abschluss, die Abschlüsse\tijazah atau kelulusan
das Zeugnis, die Zeugnisse\traport atau sertifikat
die Bewerbung, die Bewerbungen\tlamaran
der Lebenslauf, die Lebensläufe\tdaftar riwayat hidup
das Stellenportal, die Stellenportale\tportal lowongan kerja
die Qualifikation, die Qualifikationen\tkualifikasi
die Fähigkeit, die Fähigkeiten\tkemampuan
die Erwartung, die Erwartungen\tharapan
die Verantwortung, die Verantwortungen\ttanggung jawab
der Kontakt, die Kontakte\thubungan
die Freundschaft, die Freundschaften\tpersahabatan
das Vertrauen\tkepercayaan
der Streit, die Streite\tpertengkaran
das Missverständnis, die Missverständnisse\tkesalahpahaman
die Unterstützung, die Unterstützungen\tdukungan
die Rücksicht\ttenggang rasa
der Alltag\tkehidupan sehari-hari
die Entscheidung, die Entscheidungen\tkeputusan
die Veränderung, die Veränderungen\tperubahan
die Umwelt\tlingkungan hidup
der Klimawandel\tperubahan iklim
die Energie, die Energien\tenergi
der Stromverbrauch\tkonsumsi listrik
die Verschwendung, die Verschwendungen\tpemborosan
die Verpackung, die Verpackungen\tkemasan
das Mehrwegsystem, die Mehrwegsysteme\tsistem wadah pakai ulang
die Lebensmittelversorgung\tpasokan bahan makanan
die Landwirtschaft\tpertanian
die Herkunft\tasal-usul
der Verbraucher, die Verbraucher\tkonsumen laki-laki
die Verbraucherin, die Verbraucherinnen\tkonsumen perempuan
der Rabatt, die Rabatte\tdiskon
die Qualität, die Qualitäten\tkualitas
der Vergleich, die Vergleiche\tperbandingan
die Auswahl\tpilihan yang tersedia
die Beschwerde, die Beschwerden\tkeluhan
die Öffentlichkeit\truang publik
die Gemeinde, die Gemeinden\tpemerintah daerah atau komunitas lokal
die Vorschrift, die Vorschriften\tperaturan
die Erlaubnis, die Erlaubnisse\tizin
das Ehrenamt, die Ehrenämter\tkerja sukarela sosial
die Initiative, die Initiativen\tinisiatif
die Mitgliedschaft, die Mitgliedschaften\tkeanggotaan
die Versammlung, die Versammlungen\tpertemuan resmi
der Beitrag, die Beiträge\tiuran atau kontribusi
die Meldung, die Meldungen\tberita singkat
die Schlagzeile, die Schlagzeilen\tjudul berita
die Quelle, die Quellen\tsumber informasi
die Medienkritik\tkritik media
Kompetenzen erwerben\tmemperoleh kompetensi
abwägen\tmempertimbangkan dengan cermat
sich beschweren\tmengajukan keluhan
einsparen\tmenghemat
reduzieren\tmengurangi
verbrauchen\tmengonsumsi
sich engagieren\tterlibat secara aktif
belegen\tmemberikan bukti
verantwortungsbewusst\tbertanggung jawab
umweltfreundlich\tramah lingkungan`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-berpendapat', name: 'Jerman B1 · Frasa Berpendapat & Bertindak', summary: 'Ungkapan untuk menjelaskan pandangan, menyelesaikan konflik, melamar, mengeluh, dan berpartisipasi.', description: 'Frasa B1 yang membantu pengguna membangun argumen sederhana, menanggapi orang lain, dan mengambil tindakan praktis.', level: 'menengah', category: 'lainnya', color: '#735B72', featured: true,
    entries: phrases('b1-frasa-tambahan', `
Meiner Erfahrung nach funktioniert das gut.\tMenurut pengalaman saya, hal itu berjalan baik.
Ich bin der Ansicht, dass wir handeln müssen.\tSaya berpendapat bahwa kita harus bertindak.
Aus meiner Sicht gibt es zwei Möglichkeiten.\tDari sudut pandang saya ada dua kemungkinan.
Einerseits spart das Zeit, andererseits kostet es Geld.\tDi satu sisi itu menghemat waktu, di sisi lain membutuhkan biaya.
Dafür spricht vor allem der geringe Aufwand.\tHal yang terutama mendukungnya adalah upaya yang kecil.
Dagegen spricht, dass nicht alle teilnehmen können.\tHal yang menentangnya adalah tidak semua orang dapat berpartisipasi.
Ich kann deinen Einwand gut verstehen.\tSaya dapat memahami keberatanmu dengan baik.
Da bin ich anderer Meinung.\tDalam hal itu pendapat saya berbeda.
In diesem Punkt stimme ich dir zu.\tDalam poin ini saya setuju denganmu.
Darüber sollten wir noch einmal nachdenken.\tKita sebaiknya memikirkan hal itu sekali lagi.
Können wir uns auf einen Kompromiss einigen?\tBisakah kita menyepakati suatu kompromi?
Lass uns zuerst die Ursachen klären.\tMari kita perjelas penyebabnya terlebih dahulu.
Das Problem hängt mit den Kosten zusammen.\tMasalah itu berkaitan dengan biaya.
Dadurch ist eine neue Schwierigkeit entstanden.\tKarena itu muncul kesulitan baru.
Deshalb brauchen wir eine andere Lösung.\tOleh sebab itu kita memerlukan solusi lain.
Falls das nicht klappt, ändern wir den Plan.\tJika itu tidak berhasil, kita mengubah rencana.
Unter diesen Umständen sage ich lieber ab.\tDalam keadaan ini saya lebih baik membatalkannya.
Trotz der Schwierigkeiten machen wir weiter.\tMeskipun ada kesulitan, kami melanjutkan.
Das Ergebnis war besser als erwartet.\tHasilnya lebih baik daripada yang diperkirakan.
Im Nachhinein würde ich anders entscheiden.\tJika melihat ke belakang, saya akan mengambil keputusan berbeda.
Ich interessiere mich für die ausgeschriebene Stelle.\tSaya tertarik pada posisi yang diiklankan.
Welche Voraussetzungen werden erwartet?\tPrasyarat apa yang diharapkan?
Ich verfüge über Erfahrung im Kundenkontakt.\tSaya memiliki pengalaman dalam berhubungan dengan pelanggan.
Zu meinen Stärken gehört zuverlässiges Arbeiten.\tSalah satu kelebihan saya adalah bekerja dengan dapat diandalkan.
Wann könnte ich die Stelle antreten?\tKapan saya dapat mulai bekerja di posisi itu?
Vielen Dank für die Einladung zum Gespräch.\tTerima kasih atas undangan wawancaranya.
Im Anhang finden Sie meinen Lebenslauf.\tDaftar riwayat hidup saya dapat ditemukan pada lampiran.
Über eine Rückmeldung würde ich mich freuen.\tSaya akan senang menerima tanggapan.
Ich möchte mich über die Lieferung beschweren.\tSaya ingin mengajukan keluhan mengenai pengiriman.
Die Ware kam beschädigt bei mir an.\tBarangnya tiba dalam keadaan rusak.
Das entspricht nicht unserer Vereinbarung.\tHal itu tidak sesuai dengan kesepakatan kami.
Ich bitte Sie um eine schnelle Klärung.\tSaya meminta Anda segera mengklarifikasinya.
Welche Lösung können Sie mir anbieten?\tSolusi apa yang dapat Anda tawarkan kepada saya?
Sollte ich nichts hören, frage ich erneut nach.\tJika tidak mendapat kabar, saya akan bertanya kembali.
Wir möchten unseren Stromverbrauch senken.\tKami ingin mengurangi konsumsi listrik.
Kurze Wege kann man zu Fuß zurücklegen.\tJarak pendek dapat ditempuh dengan berjalan kaki.
Mehrwegverpackungen verursachen weniger Abfall.\tKemasan pakai ulang menghasilkan lebih sedikit sampah.
Beim Einkaufen achte ich auf die Herkunft.\tSaat berbelanja saya memperhatikan asal produknya.
Lebensmittel sollten nicht weggeworfen werden.\tBahan makanan seharusnya tidak dibuang.
Jeder kann einen kleinen Beitrag leisten.\tSetiap orang dapat memberikan kontribusi kecil.
Der Verein sucht freiwillige Helfer.\tPerkumpulan itu mencari relawan.
Ich engagiere mich ehrenamtlich im Stadtteil.\tSaya menjadi sukarelawan di lingkungan tempat tinggal.
Die Veranstaltung richtet sich an junge Familien.\tAcara itu ditujukan kepada keluarga muda.
Für Mitglieder ist der Eintritt ermäßigt.\tUntuk anggota, harga tiket masuk lebih murah.
Wir sammeln Spenden für ein soziales Projekt.\tKami mengumpulkan donasi untuk proyek sosial.
Bei Interesse melden Sie sich bitte bei uns.\tJika berminat, silakan hubungi kami.
Das Gerücht hat sich schnell verbreitet.\tRumor itu menyebar dengan cepat.
Ich überprüfe zuerst die Quelle.\tSaya memeriksa sumbernya terlebih dahulu.
Die Schlagzeile gibt den Inhalt kaum wieder.\tJudul beritanya hampir tidak mencerminkan isinya.
Nicht jede Meldung im Internet stimmt.\tTidak setiap berita di internet benar.
Man sollte verschiedene Berichte vergleichen.\tKita sebaiknya membandingkan berbagai laporan.
Der Artikel enthält wichtige Hintergrundinformationen.\tArtikel itu memuat informasi latar belakang penting.
Wir haben uns wegen eines Missverständnisses gestritten.\tKami bertengkar karena kesalahpahaman.
Ich hätte ruhiger reagieren sollen.\tSeharusnya saya bereaksi dengan lebih tenang.
Es tut mir leid, dass ich dich unterbrochen habe.\tMaaf karena saya menyelamu.
Wir sollten mehr Rücksicht aufeinander nehmen.\tKita sebaiknya lebih saling bertenggang rasa.
Seitdem verstehen wir uns wieder besser.\tSejak itu kami kembali lebih memahami satu sama lain.
Diese Erfahrung hat meine Meinung verändert.\tPengalaman ini telah mengubah pendapat saya.
Es kommt darauf an, was man erreichen möchte.\tItu bergantung pada apa yang ingin dicapai.
Zusammenfassend überwiegen für mich die Vorteile.\tSebagai kesimpulan, bagi saya kelebihannya lebih dominan.`),
  }),
];
