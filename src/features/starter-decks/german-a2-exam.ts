import { curatedGermanDeck, germanEntries } from './german-builder';

const rows = (type: 'word' | 'phrase', tag: string, data: string) => germanEntries(type, tag, data);

/** Segmen A2 prioritas ujian Goethe; lihat docs/CONTENT_SOURCES.md. */
export const germanA2ExamStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-a2-kata-sekolah-kursus', name: 'Jerman A2 · Kata Sekolah & Kursus', summary: 'Sekolah, mata pelajaran, kursus, ujian, tugas, hasil, dan kegiatan belajar.', description: 'Kosakata A2 untuk memahami informasi pendidikan serta membicarakan proses dan kendala belajar.', level: 'pemula', category: 'sekolah', color: '#596E8A', featured: true,
    entries: rows('word', 'a2-pendidikan', `
der Unterricht	pelajaran atau kegiatan belajar
der Stundenplan, die Stundenpläne	jadwal pelajaran
das Schuljahr, die Schuljahre	tahun ajaran
das Semester, die Semester	semester
die Klasse, die Klassen	kelas
der Klassenraum, die Klassenräume	ruang kelas
das Fach, die Fächer	mata pelajaran
Deutsch	bahasa Jerman
Mathematik	matematika
Biologie	biologi
Geschichte	sejarah
Geografie	geografi
die Hausaufgabe, die Hausaufgaben	pekerjaan rumah
die Übung, die Übungen	latihan
die Aufgabe, die Aufgaben	soal atau tugas
die Prüfung, die Prüfungen	ujian
der Test, die Tests	tes
die Note, die Noten	nilai
das Ergebnis, die Ergebnisse	hasil
der Fehler, die Fehler	kesalahan
die Lösung, die Lösungen	jawaban atau solusi
der Antwortbogen, die Antwortbögen	lembar jawaban
die Prüfungsfrage, die Prüfungsfragen	pertanyaan ujian
das Beispiel, die Beispiele	contoh
die Erklärung, die Erklärungen	penjelasan
die Grammatik	tata bahasa
die Aussprache	pelafalan
der Wortschatz	kosakata
der Text, die Texte	teks
der Satz, die Sätze	kalimat
das Kapitel, die Kapitel	bab
die Seite, die Seiten	halaman
die Prüfungsvorbereitung	persiapan ujian
der Sprachkurs, die Sprachkurse	kursus bahasa
der Intensivkurs, die Intensivkurse	kursus intensif
der Abendkurs, die Abendkurse	kursus malam
die Kursgebühr, die Kursgebühren	biaya kursus
die Kursanmeldung, die Kursanmeldungen	pendaftaran kursus
die Teilnahme	partisipasi
die Anwesenheit	kehadiran
die Abwesenheit	ketidakhadiran
die Bescheinigung, die Bescheinigungen	surat keterangan
das Zertifikat, die Zertifikate	sertifikat
das Niveau, die Niveaus	tingkatan
der Anfänger, die Anfänger	pemula laki-laki
die Anfängerin, die Anfängerinnen	pemula perempuan
der Mitschüler, die Mitschüler	teman sekolah laki-laki
die Mitschülerin, die Mitschülerinnen	teman sekolah perempuan
der Kursteilnehmer, die Kursteilnehmer	peserta kursus laki-laki
die Kursteilnehmerin, die Kursteilnehmerinnen	peserta kursus perempuan
nachschlagen	mencari arti atau informasi
üben	berlatih
erklären	menjelaskan
wiederholen	mengulang
verbessern	memperbaiki
durchfallen	tidak lulus ujian
anmelden	mendaftarkan
fehlen	tidak hadir
markieren	menandai
korrigieren	mengoreksi
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-frasa-belajar-ujian', name: 'Jerman A2 · Frasa Belajar & Ujian', summary: 'Ungkapan untuk mengikuti kursus, meminta penjelasan, membahas tugas, ujian, hasil, dan ketidakhadiran.', description: 'Frasa A2 untuk menangani komunikasi di sekolah dan kursus secara lebih mandiri.', level: 'pemula', category: 'sekolah', color: '#687D9A', featured: true,
    entries: rows('phrase', 'a2-belajar', `
Ich besuche seit April einen Deutschkurs.	Saya mengikuti kursus bahasa Jerman sejak April.
Der Kurs findet dreimal pro Woche statt.	Kursus berlangsung tiga kali seminggu.
Der Unterricht beginnt um halb neun.	Pelajaran dimulai pukul setengah sembilan.
In welchem Raum haben wir heute Unterricht?	Di ruang mana kita belajar hari ini?
Unser Stundenplan hat sich geändert.	Jadwal pelajaran kami telah berubah.
Morgen fällt der Unterricht aus.	Besok pelajaran ditiadakan.
Wann beginnt das neue Semester?	Kapan semester baru dimulai?
Ich möchte mich für den Abendkurs anmelden.	Saya ingin mendaftar kursus malam.
Wie hoch ist die Kursgebühr?	Berapa biaya kursusnya?
Sind die Bücher im Preis enthalten?	Apakah buku-bukunya termasuk dalam harga?
Welches Sprachniveau haben Sie?	Tingkat bahasa apa yang Anda miliki?
Ich bin noch auf Niveau A2.	Saya masih berada pada tingkat A2.
Der Kurs ist für Anfänger geeignet.	Kursus ini cocok untuk pemula.
Kann ich eine Probestunde besuchen?	Bisakah saya mengikuti kelas percobaan?
Wo bekomme ich das Anmeldeformular?	Di mana saya mendapatkan formulir pendaftaran?
Bitte geben Sie das Formular im Sekretariat ab.	Silakan serahkan formulirnya di sekretariat.
Ich brauche eine Teilnahmebescheinigung.	Saya membutuhkan surat keterangan keikutsertaan.
Wie oft darf man fehlen?	Seberapa sering seseorang boleh tidak hadir?
Ich konnte gestern nicht zum Unterricht kommen.	Kemarin saya tidak dapat mengikuti pelajaran.
Ich war wegen einer Erkältung zu Hause.	Saya berada di rumah karena flu ringan.
Was haben Sie gestern gemacht?	Apa yang Anda kerjakan kemarin?
Welche Hausaufgaben haben wir auf?	Pekerjaan rumah apa yang harus kami kerjakan?
Bis wann müssen wir die Aufgabe abgeben?	Sampai kapan kami harus menyerahkan tugas?
Ich bin mit der Hausaufgabe noch nicht fertig.	Saya belum selesai mengerjakan pekerjaan rumah.
Könnte ich sie morgen abgeben?	Bisakah saya menyerahkannya besok?
Ich habe die Aufgabe leider vergessen.	Sayangnya saya lupa tugasnya.
Können wir diese Übung zusammen machen?	Bisakah kita mengerjakan latihan ini bersama?
Ich brauche Hilfe bei der Grammatik.	Saya membutuhkan bantuan untuk tata bahasa.
Kannst du mir diese Regel erklären?	Bisakah kamu menjelaskan aturan ini kepada saya?
Ich verstehe den Unterschied noch nicht.	Saya belum memahami perbedaannya.
Könnten Sie ein anderes Beispiel nennen?	Bisakah Anda memberikan contoh lain?
Wie spricht man dieses Wort aus?	Bagaimana kata ini dilafalkan?
Bitte korrigieren Sie meine Aussprache.	Tolong koreksi pelafalan saya.
Ich muss meinen Wortschatz verbessern.	Saya harus meningkatkan kosakata saya.
Ich wiederhole jeden Abend die neuen Wörter.	Saya mengulang kata-kata baru setiap malam.
Mit dieser App kann ich gut üben.	Dengan aplikasi ini saya dapat berlatih dengan baik.
Wir sollen den Text zu Hause lesen.	Kami harus membaca teks itu di rumah.
Fassen Sie den Text kurz zusammen.	Rangkumlah teks itu secara singkat.
Welche Antwort ist richtig?	Jawaban mana yang benar?
Ich habe bei Nummer drei einen Fehler gemacht.	Saya membuat kesalahan pada nomor tiga.
Wann schreiben wir den nächsten Test?	Kapan kami mengikuti tes berikutnya?
Die Prüfung ist am Ende des Monats.	Ujiannya berlangsung pada akhir bulan.
Wie bereiten Sie sich auf die Prüfung vor?	Bagaimana Anda mempersiapkan diri untuk ujian?
Ich lerne jeden Tag eine Stunde.	Saya belajar satu jam setiap hari.
Wir üben gemeinsam für die mündliche Prüfung.	Kami berlatih bersama untuk ujian lisan.
Welche Teile hat die Prüfung?	Ujian itu memiliki bagian apa saja?
Wie viel Zeit haben wir für diese Aufgabe?	Berapa banyak waktu yang kami miliki untuk tugas ini?
Darf ich ein Wörterbuch benutzen?	Bolehkah saya menggunakan kamus?
Schreiben Sie die Antworten auf den Antwortbogen.	Tuliskan jawabannya pada lembar jawaban.
Vergessen Sie nicht, Ihren Namen einzutragen.	Jangan lupa menuliskan nama Anda.
Ich war vor der Prüfung sehr nervös.	Saya sangat gugup sebelum ujian.
Die Hörübung war ziemlich schwierig.	Latihan menyimaknya cukup sulit.
Der Lesetext war leichter als erwartet.	Teks bacaannya lebih mudah daripada yang diperkirakan.
Wann bekommen wir die Ergebnisse?	Kapan kami mendapatkan hasilnya?
Meine Prüfung war erfolgreich.	Ujian saya berhasil.
Leider muss ich den Test wiederholen.	Sayangnya saya harus mengulang tes.
Mit meiner Note bin ich zufrieden.	Saya puas dengan nilai saya.
Nächstes Mal möchte ich besser vorbereitet sein.	Lain kali saya ingin lebih siap.
Vielen Dank für Ihre Erklärung.	Terima kasih atas penjelasan Anda.
Das Lernen macht mir jetzt mehr Spaß.	Sekarang belajar terasa lebih menyenangkan bagi saya.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-kata-keluarga-perayaan', name: 'Jerman A2 · Kata Keluarga & Perayaan', summary: 'Keluarga besar, hubungan, tahap kehidupan, undangan, hadiah, pesta, dan acara keluarga.', description: 'Kosakata A2 untuk menceritakan keluarga serta memahami undangan dan perayaan sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#8C665F', featured: true,
    entries: rows('word', 'a2-keluarga', `
die Kleinfamilie, die Kleinfamilien	keluarga inti
das Elternteil, die Elternteile	salah satu orang tua
die Geschwister	saudara kandung
der Halbbruder, die Halbbrüder	saudara tiri laki-laki
die Halbschwester, die Halbschwestern	saudara tiri perempuan
der Sohn, die Söhne	anak laki-laki
die Tochter, die Töchter	anak perempuan
das Enkelkind, die Enkelkinder	cucu
die Großmutter, die Großmütter	nenek
der Großvater, die Großväter	kakek
die Tante, die Tanten	bibi
der Onkel, die Onkel	paman
die Cousine, die Cousinen	sepupu perempuan
der Cousin, die Cousins	sepupu laki-laki
die Verwandten	para kerabat
das Ehepaar, die Ehepaare	pasangan suami istri
der Ehemann, die Ehemänner	suami
die Ehefrau, die Ehefrauen	istri
der Partner, die Partner	pasangan laki-laki
die Partnerin, die Partnerinnen	pasangan perempuan
ledig	lajang
verheiratet	menikah
geschieden	bercerai
getrennt	berpisah
verwandt	berkerabat
die Kindheit	masa kanak-kanak
die Geburt, die Geburten	kelahiran
die Hochzeit, die Hochzeiten	pernikahan
der Hochzeitstag, die Hochzeitstage	hari ulang tahun pernikahan
die Feier, die Feiern	perayaan
das Fest, die Feste	pesta atau perayaan
der Partygast, die Partygäste	tamu pesta
der Gastgeber, die Gastgeber	tuan rumah laki-laki
die Gastgeberin, die Gastgeberinnen	tuan rumah perempuan
das Geschenk, die Geschenke	hadiah
die Überraschung, die Überraschungen	kejutan
der Blumenstrauß, die Blumensträuße	buket bunga
die Kerze, die Kerzen	lilin
die Dekoration, die Dekorationen	dekorasi
die Glückwunschkarte, die Glückwunschkarten	kartu ucapan selamat
die Einladungskarte, die Einladungskarten	kartu undangan
der Termin, die Termine	waktu janji atau acara
die Zusage, die Zusagen	konfirmasi penerimaan
die Absage, die Absagen	pembatalan atau penolakan
der Besuch, die Besuche	kunjungan
die Tradition, die Traditionen	tradisi
der Feiertag, die Feiertage	hari libur perayaan
Weihnachten	Natal
Ostern	Paskah
der Jahreswechsel	pergantian tahun
schenken	memberikan hadiah
feiern	merayakan
einladen	mengundang
gratulieren	mengucapkan selamat
heiraten	menikah
kennenlernen	berkenalan
sich verstehen	akur atau saling memahami
sich treffen	bertemu
aufbauen	menyiapkan atau memasang
dekorieren	menghias
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-frasa-undangan-plan', name: 'Jerman A2 · Frasa Undangan & Membuat Rencana', summary: 'Ungkapan untuk mengundang, menentukan waktu, membagi persiapan, menerima, menolak, dan mengubah rencana.', description: 'Frasa A2 untuk pesan pribadi dan percakapan perencanaan yang relevan bagi Schreiben dan Sprechen Goethe.', level: 'pemula', category: 'sehari-hari', color: '#A4786E', featured: true,
    entries: rows('phrase', 'a2-rencana', `
Ich feiere nächsten Samstag meinen Geburtstag.	Saya merayakan ulang tahun saya Sabtu depan.
Dazu möchte ich dich herzlich einladen.	Saya ingin mengundangmu dengan hangat untuk itu.
Die Feier beginnt um siebzehn Uhr.	Perayaannya dimulai pukul tujuh belas.
Wir feiern bei mir zu Hause.	Kami merayakannya di rumah saya.
Kannst du zu meiner Feier kommen?	Bisakah kamu datang ke perayaan saya?
Bitte gib mir bis Mittwoch Bescheid.	Tolong beri kabar kepada saya paling lambat Rabu.
Vielen Dank für deine nette Einladung.	Terima kasih atas undanganmu yang baik.
Ich komme sehr gern zu deiner Party.	Saya dengan senang hati datang ke pestamu.
Soll ich etwas mitbringen?	Apakah saya perlu membawa sesuatu?
Ich kann einen Salat vorbereiten.	Saya dapat menyiapkan salad.
Bring bitte etwas zu trinken mit.	Tolong bawa sesuatu untuk diminum.
Wir brauchen noch Musik für die Feier.	Kami masih membutuhkan musik untuk perayaan.
Wer kümmert sich um die Dekoration?	Siapa yang mengurus dekorasinya?
Ich kann den Raum dekorieren.	Saya dapat menghias ruangannya.
Kaufen wir gemeinsam ein Geschenk?	Apakah kita membeli hadiah bersama?
Was können wir ihr schenken?	Apa yang dapat kita hadiahkan kepadanya?
Sie freut sich bestimmt über Blumen.	Dia pasti senang menerima bunga.
Leider kann ich nicht kommen.	Sayangnya saya tidak dapat datang.
An diesem Tag muss ich arbeiten.	Pada hari itu saya harus bekerja.
Ich bin am Wochenende nicht in der Stadt.	Saya tidak berada di kota pada akhir pekan.
Es tut mir wirklich leid.	Saya benar-benar minta maaf.
Vielleicht können wir uns nächste Woche treffen.	Mungkin kita dapat bertemu minggu depan.
Ich wünsche euch eine schöne Feier.	Saya mendoakan kalian menikmati perayaan yang menyenangkan.
Hast du am Freitag schon etwas vor?	Apakah kamu sudah memiliki rencana hari Jumat?
Wollen wir zusammen ins Konzert gehen?	Apakah kita ingin pergi ke konser bersama?
Wie wäre es mit Sonntagvormittag?	Bagaimana kalau Minggu pagi?
Sonntag passt mir besser.	Hari Minggu lebih cocok untuk saya.
Um wie viel Uhr wollen wir uns treffen?	Pukul berapa kita ingin bertemu?
Treffen wir uns um halb elf.	Mari kita bertemu pukul setengah sebelas.
Wo sollen wir uns treffen?	Di mana kita sebaiknya bertemu?
Am besten vor dem Haupteingang.	Sebaiknya di depan pintu masuk utama.
Ich reserviere einen Tisch für uns.	Saya memesan meja untuk kita.
Kannst du die Fahrkarten besorgen?	Bisakah kamu mendapatkan tiket perjalanan?
Ich schaue nach einer passenden Verbindung.	Saya mencari koneksi perjalanan yang cocok.
Fahren wir mit dem Zug oder mit dem Auto?	Apakah kita pergi dengan kereta atau mobil?
Mit dem Zug ist es bequemer.	Dengan kereta lebih nyaman.
Die Fahrt dauert ungefähr zwei Stunden.	Perjalanannya berlangsung sekitar dua jam.
Wann wollen wir losfahren?	Kapan kita ingin mulai berangkat?
Wir sollten früh genug starten.	Kita sebaiknya berangkat cukup awal.
Ich hole dich um acht Uhr ab.	Saya menjemputmu pukul delapan.
Ruf mich an, wenn du da bist.	Telepon saya ketika kamu sudah tiba.
Unser Plan hat sich leider geändert.	Sayangnya rencana kami berubah.
Können wir das Treffen verschieben?	Bisakah kita menjadwal ulang pertemuan?
Würde dir Montagabend passen?	Apakah Senin malam cocok untukmu?
Am Montag bin ich leider beschäftigt.	Sayangnya saya sibuk pada hari Senin.
Dienstag wäre für mich möglich.	Hari Selasa memungkinkan bagi saya.
Dann einigen wir uns auf Dienstag.	Kalau begitu kita sepakati hari Selasa.
Das Treffen findet doch nicht statt.	Pertemuannya ternyata tidak jadi berlangsung.
Warum wurde die Veranstaltung abgesagt?	Mengapa acaranya dibatalkan?
Wegen des schlechten Wetters.	Karena cuaca buruk.
Wir machen stattdessen einen Spieleabend.	Sebagai gantinya kami mengadakan malam permainan.
Das klingt nach einem guten Plan.	Itu terdengar seperti rencana yang baik.
Wer kann noch teilnehmen?	Siapa lagi yang dapat berpartisipasi?
Ich frage auch meine Cousine.	Saya juga akan bertanya kepada sepupu perempuan saya.
Für wie viele Personen sollen wir planen?	Untuk berapa orang kita harus membuat rencana?
Wir erwarten ungefähr zwölf Gäste.	Kami memperkirakan sekitar dua belas tamu.
Alles ist schon vorbereitet.	Semuanya sudah dipersiapkan.
Ich freue mich schon auf das Treffen.	Saya sudah menantikan pertemuannya.
Hoffentlich klappt diesmal alles.	Semoga kali ini semuanya berjalan lancar.
Bis dann, ich freue mich!	Sampai nanti, saya menantikannya!
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-kata-profesi-pekerjaan', name: 'Jerman A2 · Kata Profesi & Pekerjaan', summary: 'Pencarian kerja, lowongan, lamaran, pengalaman, kondisi kerja, tugas, dan jadwal.', description: 'Kosakata A2 sebagai jembatan dari perkenalan profesi A1 menuju komunikasi kerja mandiri B1.', level: 'pemula', category: 'kerja', color: '#556C67', featured: true,
    entries: rows('word', 'a2-pekerjaan', `
die Stelle, die Stellen	posisi pekerjaan
das Stellenangebot, die Stellenangebote	penawaran kerja
die Stellenanzeige, die Stellenanzeigen	iklan lowongan kerja
die Arbeitssuche	pencarian kerja
die Bewerbungsmappe, die Bewerbungsmappen	berkas lamaran
das Bewerbungsschreiben, die Bewerbungsschreiben	surat lamaran
die Berufsinformation, die Berufsinformationen	informasi profesi
das Bewerbungsfoto, die Bewerbungsfotos	foto lamaran kerja
der Gesprächstermin, die Gesprächstermine	jadwal wawancara
die Berufserfahrung	pengalaman kerja
der Ausbildungsplatz, die Ausbildungsplätze	posisi pendidikan kejuruan
der Praktikumsplatz, die Praktikumsplätze	posisi magang
der Praktikant, die Praktikanten	peserta magang laki-laki
die Praktikantin, die Praktikantinnen	peserta magang perempuan
der Auszubildende, die Auszubildenden	peserta pendidikan kejuruan laki-laki
die Auszubildende, die Auszubildenden	peserta pendidikan kejuruan perempuan
die Computerkenntnisse	kemampuan komputer
die Sprachkenntnisse	kemampuan bahasa
die Tätigkeit, die Tätigkeiten	aktivitas pekerjaan
der Aufgabenbereich, die Aufgabenbereiche	lingkup tugas
die Personalabteilung, die Personalabteilungen	departemen sumber daya manusia
das Team, die Teams	tim
der Betrieb, die Betriebe	perusahaan atau tempat usaha
die Arbeitsstelle, die Arbeitsstellen	tempat atau posisi kerja
die Arbeitsbedingungen	kondisi kerja
der Arbeitstag, die Arbeitstage	hari kerja
die Arbeitswoche, die Arbeitswochen	pekan kerja
der Schichtwechsel, die Schichtwechsel	pergantian giliran kerja
die Frühschicht, die Frühschichten	giliran pagi
die Spätschicht, die Spätschichten	giliran sore
die Nachtschicht, die Nachtschichten	giliran malam
der Dienstplan, die Dienstpläne	jadwal giliran kerja
die Aushilfe, die Aushilfen	pekerja bantuan sementara
der Minijob, die Minijobs	pekerjaan berpenghasilan kecil
die Teilzeitstelle, die Teilzeitstellen	posisi paruh waktu
die Vollzeitstelle, die Vollzeitstellen	posisi purnawaktu
der Stundenlohn, die Stundenlöhne	upah per jam
die Gehaltsvorstellung, die Gehaltsvorstellungen	harapan gaji
die Bezahlung	pembayaran atau upah
der Lohn, die Löhne	upah
die Praxiserfahrung, die Praxiserfahrungen	pengalaman praktik
der Arbeitsbeginn	waktu mulai kerja
der Arbeitsweg, die Arbeitswege	perjalanan ke tempat kerja
die Urlaubsvertretung, die Urlaubsvertretungen	pengganti selama cuti
die Krankmeldung, die Krankmeldungen	pemberitahuan sakit
der freie Tag, die freien Tage	hari libur
der Überstundenausgleich	kompensasi jam lembur
die Mitarbeiterschulung, die Mitarbeiterschulungen	pelatihan pegawai
der Computerarbeitsplatz, die Computerarbeitsplätze	meja kerja komputer
die Uniform, die Uniformen	seragam
sich bewerben	melamar pekerjaan
anstellen	mempekerjakan
sich vorstellen	memperkenalkan diri dalam wawancara
organisieren	mengatur
kontrollieren	memeriksa
liefern	mengirimkan barang
beraten	memberi konsultasi
betreuen	mendampingi atau melayani
planen	merencanakan
telefonieren	menelepon
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-frasa-dunia-kerja', name: 'Jerman A2 · Frasa Dunia Kerja', summary: 'Ungkapan untuk mencari pekerjaan, melamar, mengikuti wawancara, membahas tugas, jadwal, cuti, dan kendala.', description: 'Frasa A2 untuk memahami lowongan dan menangani komunikasi rutin di tempat kerja.', level: 'pemula', category: 'kerja', color: '#667E77', featured: true,
    entries: rows('phrase', 'a2-kerja', `
Ich suche eine Stelle als Koch.	Saya mencari posisi sebagai juru masak.
Wo haben Sie die Stellenanzeige gefunden?	Di mana Anda menemukan iklan lowongan itu?
Die Firma sucht eine Aushilfe.	Perusahaan itu mencari pekerja bantuan sementara.
Es handelt sich um eine Teilzeitstelle.	Posisi itu merupakan pekerjaan paruh waktu.
Die Arbeitszeit beträgt zwanzig Stunden pro Woche.	Jam kerjanya dua puluh jam per minggu.
Man arbeitet auch am Wochenende.	Karyawan juga bekerja pada akhir pekan.
Der Stundenlohn liegt bei zwölf Euro.	Upah per jamnya dua belas euro.
Wann ist der früheste Arbeitsbeginn?	Kapan waktu mulai kerja paling awal?
Welche Aufgaben gehören zu der Stelle?	Tugas apa saja yang termasuk dalam posisi itu?
Für diese Arbeit braucht man gute Deutschkenntnisse.	Untuk pekerjaan ini seseorang membutuhkan kemampuan bahasa Jerman yang baik.
Berufserfahrung ist von Vorteil.	Pengalaman kerja merupakan keuntungan.
Ich interessiere mich für die freie Stelle.	Saya tertarik pada posisi yang tersedia.
Ich möchte mich gern bei Ihnen bewerben.	Saya ingin melamar di tempat Anda.
Welche Unterlagen soll ich schicken?	Dokumen apa yang harus saya kirimkan?
Mein Lebenslauf ist im Anhang.	Daftar riwayat hidup saya ada di lampiran.
Brauchen Sie auch ein Bewerbungsfoto?	Apakah Anda juga membutuhkan foto lamaran?
Ich habe bereits in einem Hotel gearbeitet.	Saya pernah bekerja di sebuah hotel.
Dort war ich für das Frühstück zuständig.	Di sana saya bertanggung jawab atas sarapan.
Ich kann gut mit Kunden umgehen.	Saya dapat berinteraksi dengan pelanggan dengan baik.
Außerdem spreche ich Englisch und Indonesisch.	Selain itu saya dapat berbahasa Inggris dan Indonesia.
Wann könnte ich mit der Arbeit anfangen?	Kapan saya dapat mulai bekerja?
Vielen Dank für Ihre Bewerbung.	Terima kasih atas lamaran Anda.
Wir möchten Sie zu einem Gespräch einladen.	Kami ingin mengundang Anda untuk wawancara.
Passt Ihnen Donnerstag um zehn Uhr?	Apakah Kamis pukul sepuluh cocok untuk Anda?
Ja, den Termin kann ich wahrnehmen.	Ya, saya dapat menghadiri janji itu.
Wo soll ich mich melden?	Di mana saya harus melapor?
Bitte fragen Sie am Empfang nach Frau Klein.	Silakan tanyakan Ibu Klein di resepsionis.
Wie war das Vorstellungsgespräch?	Bagaimana wawancara kerjanya?
Ich war am Anfang ziemlich nervös.	Pada awalnya saya cukup gugup.
Die Fragen konnte ich gut beantworten.	Saya dapat menjawab pertanyaannya dengan baik.
Ich arbeite seit drei Monaten hier.	Saya sudah bekerja di sini selama tiga bulan.
Meine Aufgaben sind sehr abwechslungsreich.	Tugas-tugas saya sangat beragam.
Heute arbeite ich in der Frühschicht.	Hari ini saya bekerja pada giliran pagi.
Nächste Woche habe ich Spätschicht.	Minggu depan saya mendapat giliran sore.
Wo hängt der neue Dienstplan?	Di mana jadwal giliran kerja yang baru ditempel?
Kannst du am Freitag meine Schicht übernehmen?	Bisakah kamu menggantikan giliran saya hari Jumat?
Dafür übernehme ich deine Schicht am Montag.	Sebagai gantinya saya mengambil giliranmu hari Senin.
Ich brauche nächsten Dienstag frei.	Saya membutuhkan libur Selasa depan.
Mit wem muss ich das besprechen?	Dengan siapa saya harus membicarakannya?
Bitte tragen Sie den Urlaub in den Kalender ein.	Silakan masukkan cuti ke kalender.
Heute gibt es besonders viel zu tun.	Hari ini ada sangat banyak pekerjaan.
Welche Aufgabe soll ich zuerst erledigen?	Tugas mana yang harus saya selesaikan terlebih dahulu?
Bitte kontrolliere diese Bestellung.	Tolong periksa pesanan ini.
Die Lieferung muss heute noch raus.	Pengiriman harus keluar hari ini.
Ich telefoniere gerade mit einem Kunden.	Saya sedang menelepon seorang pelanggan.
Kannst du die Nachricht notieren?	Bisakah kamu mencatat pesannya?
Wir besprechen das nach der Pause.	Kami membicarakannya setelah istirahat.
Das Team trifft sich jeden Montag.	Tim bertemu setiap hari Senin.
Die neue Kollegin arbeitet sich schnell ein.	Rekan kerja perempuan baru itu cepat beradaptasi.
Wer zeigt mir den Computerarbeitsplatz?	Siapa yang menunjukkan meja kerja komputer kepada saya?
Ich habe mein Passwort noch nicht bekommen.	Saya belum mendapatkan kata sandi saya.
Der Drucker funktioniert wieder nicht.	Mesin cetak kembali tidak berfungsi.
Ich melde das Problem sofort.	Saya segera melaporkan masalah itu.
Mir geht es heute nicht gut.	Hari ini saya merasa tidak sehat.
Ich muss mich für morgen krankmelden.	Saya harus melaporkan sakit untuk besok.
Wann können Sie wieder arbeiten?	Kapan Anda dapat kembali bekerja?
Voraussichtlich bin ich am Montag zurück.	Kemungkinan saya kembali pada hari Senin.
Diese Woche habe ich zwei Überstunden gemacht.	Minggu ini saya melakukan dua jam lembur.
Die Arbeit ist manchmal anstrengend.	Pekerjaan itu terkadang melelahkan.
Trotzdem arbeite ich gern in diesem Team.	Meskipun demikian saya senang bekerja dalam tim ini.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-kata-makanan-gaya-hidup', name: 'Jerman A2 · Kata Makanan & Gaya Hidup', summary: 'Pola makan, memasak, kandungan makanan, kesehatan ringan, kebiasaan, dan aktivitas fisik.', description: 'Kosakata A2 untuk membahas pilihan makanan, resep sederhana, alergi, dan kebiasaan hidup sehat.', level: 'pemula', category: 'sehari-hari', color: '#78845A', featured: true,
    entries: rows('word', 'a2-gaya-hidup', `
der Ernährungsplan, die Ernährungspläne	rencana pola makan
die Mahlzeit, die Mahlzeiten	waktu makan
das Lebensmittel, die Lebensmittel	bahan makanan
die Zutat, die Zutaten	bahan masakan
das Rezept, die Rezepte	resep masakan
die Vorspeise, die Vorspeisen	hidangan pembuka
die Hauptspeise, die Hauptspeisen	hidangan utama
die Nachspeise, die Nachspeisen	hidangan penutup
die Beilage, die Beilagen	hidangan pendamping
das Buffet, die Buffets	prasmanan
die Speisenauswahl	pilihan hidangan
die Bestellung, die Bestellungen	pesanan
die Bedienung, die Bedienungen	pelayan atau pelayanan
das Trinkgeld	uang tip
die Tischreservierung, die Tischreservierungen	reservasi meja
die Spezialität, die Spezialitäten	hidangan khas
das Rind, die Rinder	sapi
das Schwein, die Schweine	babi
das Lamm, die Lämmer	domba
die Meeresfrüchte	makanan laut
die Nuss, die Nüsse	kacang
das Getreide, die Getreide	biji-bijian
das Vollkornprodukt, die Vollkornprodukte	produk gandum utuh
das Milchprodukt, die Milchprodukte	produk susu
die Süßigkeit, die Süßigkeiten	makanan manis
das Fett, die Fette	lemak
das Eiweiß	protein
das Vitamin, die Vitamine	vitamin
die Kalorie, die Kalorien	kalori
die Allergie, die Allergien	alergi
die Unverträglichkeit, die Unverträglichkeiten	intoleransi makanan
der Vegetarier, die Vegetarier	vegetarian laki-laki
die Vegetarierin, die Vegetarierinnen	vegetarian perempuan
vegan	vegan
fettarm	rendah lemak
zuckerfrei	bebas gula
gesund	sehat
ungesund	tidak sehat
reif	matang
roh	mentah
gekocht	dimasak
das Gewicht, die Gewichte	berat badan
der Appetit	napsu makan
die Bewegung	aktivitas fisik
die Fitness	kebugaran
die Entspannung	relaksasi
der Schlaf	tidur
die Essgewohnheit, die Essgewohnheiten	kebiasaan makan
würzen	membumbui
backen	memanggang
braten	menggoreng atau memanggang
schneiden	memotong
mischen	mencampur
probieren	mencicipi
bestellen	memesan
verzichten	tidak mengonsumsi atau melepaskan
abnehmen	menurunkan berat badan
zunehmen	menambah berat badan
sich ernähren	mengatur pola makan
sich bewegen	bergerak aktif
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-frasa-restoran-keluhan', name: 'Jerman A2 · Frasa Restoran, Alergi & Keluhan', summary: 'Ungkapan untuk reservasi, pilihan makanan, alergi, resep, kebiasaan sehat, dan penyelesaian masalah restoran.', description: 'Frasa A2 untuk berkomunikasi lebih rinci tentang makanan serta menyampaikan keluhan dengan sopan.', level: 'pemula', category: 'sehari-hari', color: '#8D9665', featured: true,
    entries: rows('phrase', 'a2-makanan', `
Ich möchte einen Tisch für vier Personen reservieren.	Saya ingin memesan meja untuk empat orang.
Haben Sie am Samstagabend noch etwas frei?	Apakah masih ada meja kosong pada Sabtu malam?
Wir würden gern am Fenster sitzen.	Kami ingin duduk di dekat jendela.
Die Reservierung läuft auf den Namen Wagner.	Reservasinya menggunakan nama Wagner.
Wir sind eine Viertelstunde früher da.	Kami tiba lima belas menit lebih awal.
Leider müssen wir die Reservierung ändern.	Sayangnya kami harus mengubah reservasi.
Statt vier kommen nur drei Personen.	Alih-alih empat, hanya tiga orang yang datang.
Könnten Sie uns die Tageskarte bringen?	Bisakah Anda membawakan menu hari ini kepada kami?
Welche Spezialität empfehlen Sie?	Hidangan khas mana yang Anda rekomendasikan?
Was gehört zu diesem Gericht?	Apa saja yang termasuk dalam hidangan ini?
Welche Beilage kann ich wählen?	Hidangan pendamping apa yang dapat saya pilih?
Ich nehme zuerst die Tomatensuppe.	Saya memilih sup tomat sebagai pembuka.
Als Hauptgericht hätte ich gern den Fisch.	Sebagai hidangan utama saya ingin ikan.
Kann ich statt Reis Kartoffeln bekommen?	Bisakah saya mendapatkan kentang sebagai pengganti nasi?
Bitte bringen Sie die Soße extra.	Tolong sajikan sausnya secara terpisah.
Ich möchte nur eine halbe Portion.	Saya hanya menginginkan setengah porsi.
Ist dieses Gericht vegetarisch?	Apakah hidangan ini vegetarian?
Gibt es bei Ihnen auch vegane Gerichte?	Apakah tersedia juga hidangan vegan di sini?
Ich darf keine Nüsse essen.	Saya tidak boleh makan kacang.
Ich habe eine Allergie gegen Erdnüsse.	Saya memiliki alergi terhadap kacang tanah.
Enthält die Soße Milchprodukte?	Apakah sausnya mengandung produk susu?
Ich vertrage leider keine Laktose.	Sayangnya saya tidak tahan laktosa.
Können Sie das Gericht ohne Käse zubereiten?	Bisakah Anda menyiapkan hidangan tanpa keju?
Bitte benutzen Sie kein scharfes Gewürz.	Tolong jangan gunakan bumbu pedas.
Mein Kind kann keine Eier essen.	Anak saya tidak dapat makan telur.
Könnten Sie in der Küche nachfragen?	Bisakah Anda menanyakannya di dapur?
Entschuldigung, wir warten schon sehr lange.	Maaf, kami sudah menunggu sangat lama.
Wann kommt unsere Bestellung?	Kapan pesanan kami datang?
Wir haben vor vierzig Minuten bestellt.	Kami memesan empat puluh menit yang lalu.
Mein Getränk fehlt noch.	Minuman saya masih belum datang.
Ich habe eine andere Suppe bestellt.	Saya memesan sup yang berbeda.
Das Fleisch ist innen noch roh.	Dagingnya masih mentah di bagian dalam.
Die Nudeln sind leider schon kalt.	Sayangnya pastanya sudah dingin.
Der Salat ist nicht mehr frisch.	Saladnya sudah tidak segar.
Könnten Sie das bitte zurücknehmen?	Bisakah Anda mengambilnya kembali?
Bitte bringen Sie mir ein neues Gericht.	Tolong bawakan hidangan baru untuk saya.
Wir möchten mit der Bedienung sprechen.	Kami ingin berbicara dengan pelayannya.
Dieses Gericht möchten wir nicht bezahlen.	Kami tidak ingin membayar hidangan ini.
Auf der Rechnung steht ein Getränk zu viel.	Ada satu minuman berlebih pada tagihan.
Könnten Sie die Rechnung bitte korrigieren?	Bisakah Anda memperbaiki tagihannya?
Der Service war sonst sehr freundlich.	Selain masalah itu, pelayanannya sangat ramah.
Vielen Dank für die schnelle Lösung.	Terima kasih atas penyelesaian yang cepat.
Wie wird diese Suppe zubereitet?	Bagaimana sup ini dibuat?
Zuerst schneidet man das Gemüse klein.	Pertama-tama sayurannya dipotong kecil.
Danach gibt man etwas Öl in den Topf.	Setelah itu masukkan sedikit minyak ke panci.
Alles muss zwanzig Minuten kochen.	Semuanya harus dimasak selama dua puluh menit.
Zum Schluss kommt Salz dazu.	Pada akhirnya garam ditambahkan.
Dieses Rezept ist einfach nachzukochen.	Resep ini mudah dimasak kembali.
Seit Kurzem achte ich auf eine gesündere Ernährung.	Saya berusaha menjalani pola makan lebih sehat.
Zum Frühstück esse ich meistens Müsli.	Untuk sarapan saya biasanya makan müsli.
Ich trinke täglich genug Wasser.	Saya minum cukup air setiap hari.
Ich möchte weniger Süßigkeiten essen.	Saya ingin makan lebih sedikit makanan manis.
Unter der Woche koche ich selbst.	Pada hari kerja saya memasak sendiri.
Am Wochenende gehen wir manchmal essen.	Pada akhir pekan kami terkadang makan di luar.
Seit einem Monat esse ich kein Fleisch mehr.	Sejak satu bulan saya tidak lagi makan daging.
Regelmäßige Bewegung ist mir wichtig.	Aktivitas fisik teratur penting bagi saya.
Ich gehe jeden Abend eine Runde spazieren.	Saya berjalan-jalan setiap malam.
Nach dem Sport habe ich großen Appetit.	Setelah olahraga saya sangat lapar.
Ausreichend Schlaf gehört auch dazu.	Tidur yang cukup juga termasuk di dalamnya.
So fühle ich mich viel besser.	Dengan begitu saya merasa jauh lebih baik.
`),
  }),
];
