import { curatedGermanDeck, germanEntries } from './german-builder';

const words = (tag: string, rows: string) => germanEntries('word', tag, rows);
const phrases = (tag: string, rows: string) => germanEntries('phrase', tag, rows);

export const germanExtraStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-a1-waktu-cuaca-angka', name: 'Jerman A1 · Waktu, Cuaca & Angka', summary: 'Jam, tanggal, jumlah, musim, dan percakapan sederhana tentang cuaca.', description: 'Kosakata dan frasa praktis untuk menyebut waktu, membuat jadwal, menghitung, dan memahami cuaca sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#557B86', featured: true,
    entries: [
      ...words('a1-waktu-cuaca', `
die Uhr, die Uhren\tjam
die Minute, die Minuten\tmenit
die Stunde, die Stunden\tjam sebagai durasi
der Morgen, die Morgen\tpagi
der Mittag, die Mittage\ttengah hari
der Nachmittag, die Nachmittage\tsore
der Abend, die Abende\tmalam
die Nacht, die Nächte\tmalam hari
der Montag, die Montage\tSenin
der Dienstag, die Dienstage\tSelasa
der Mittwoch, die Mittwoche\tRabu
der Donnerstag, die Donnerstage\tKamis
der Freitag, die Freitage\tJumat
der Samstag, die Samstage\tSabtu
der Sonntag, die Sonntage\tMinggu
der Januar\tJanuari
der Februar\tFebruari
der März\tMaret
der April\tApril
der Mai\tMei
der Juni\tJuni
der Juli\tJuli
der August\tAgustus
der September\tSeptember
der Oktober\tOktober
der November\tNovember
der Dezember\tDesember
das Datum, die Daten\ttanggal
das Wetter\tcuaca
die Sonne\tmatahari
der Regen\thujan
der Schnee\tsalju
der Wind\tangin
die Wolke, die Wolken\tawan
der Grad, die Grade\tderajat suhu
sonnig\tcerah
bewölkt\tberawan
windig\tberangin
kühl\tsejuk
warm\thangat`),
      ...phrases('a1-waktu-cuaca', `
Es ist ein Uhr.\tSekarang pukul satu.
Es ist Viertel nach zwei.\tSekarang pukul dua lewat seperempat.
Es ist halb vier.\tSekarang pukul setengah empat.
Es ist Viertel vor fünf.\tSekarang pukul lima kurang seperempat.
Kurz nach acht.\tBeberapa menit setelah pukul delapan.
Gegen zehn Uhr.\tSekitar pukul sepuluh.
Von neun bis zwölf.\tDari pukul sembilan sampai dua belas.
Jeden Montag.\tSetiap hari Senin.
Einmal pro Woche.\tSekali seminggu.
Zweimal im Monat.\tDua kali sebulan.
Am ersten Mai.\tPada tanggal satu Mei.
Welches Datum haben wir heute?\tTanggal berapa hari ini?
Heute ist der dritte Juni.\tHari ini tanggal tiga Juni.
Wann hast du Geburtstag?\tKapan ulang tahunmu?
Nächsten Mittwoch.\tRabu depan.
Letzte Woche.\tMinggu lalu.
Vor drei Tagen.\tTiga hari yang lalu.
In zwei Stunden.\tDua jam lagi.
Seit gestern.\tSejak kemarin.
Den ganzen Morgen.\tSepanjang pagi.
Wie ist das Wetter heute?\tBagaimana cuaca hari ini?
Heute scheint die Sonne.\tHari ini matahari bersinar.
Es ist ziemlich kalt.\tCuacanya cukup dingin.
Draußen ist es windig.\tDi luar sedang berangin.
Es sind zwanzig Grad.\tSuhunya dua puluh derajat.
Morgen soll es regnen.\tBesok diperkirakan hujan.
Nimm einen Regenschirm mit.\tBawalah payung.
Im Winter wird es früh dunkel.\tPada musim dingin hari cepat gelap.
Der Frühling beginnt bald.\tMusim semi segera dimulai.
Im Sommer ist es lange hell.\tPada musim panas hari terang lebih lama.
Wie viele brauchen wir?\tBerapa banyak yang kita butuhkan?
Etwa zwanzig Stück.\tSekitar dua puluh buah.
Das ist die Hälfte.\tItu setengahnya.
Noch ein Viertel.\tSeperempat lagi.
Mehr als hundert.\tLebih dari seratus.
Weniger als zehn.\tKurang dari sepuluh.
Ungefähr dreißig Euro.\tSekitar tiga puluh euro.
Der zweite Versuch.\tPercobaan kedua.
Zum dritten Mal.\tUntuk ketiga kalinya.
Fast eine Stunde.\tHampir satu jam.`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-a2-reise-unterkunft', name: 'Jerman A2 · Perjalanan & Akomodasi', summary: 'Transportasi, tiket, hotel, orientasi kota, dan masalah umum selama perjalanan.', description: 'Materi praktis untuk merencanakan perjalanan, menggunakan transportasi umum, menginap, dan meminta bantuan.', level: 'pemula', category: 'perjalanan', color: '#8A6947', featured: true,
    entries: [
      ...words('a2-perjalanan', `
die Abfahrt, die Abfahrten\tkeberangkatan
die Ankunft, die Ankünfte\tkedatangan
der Fahrplan, die Fahrpläne\tjadwal perjalanan
der Bahnsteig, die Bahnsteige\tperon
das Gleis, die Gleise\tjalur kereta
der Anschluss, die Anschlüsse\tsambungan perjalanan
die Durchsage, die Durchsagen\tpengumuman suara
die Verspätungsanzeige, die Verspätungsanzeigen\tpapan keterlambatan
der Fahrkartenautomat, die Fahrkartenautomaten\tmesin tiket
die Monatskarte, die Monatskarten\ttiket bulanan
der Koffer, die Koffer\tkoper
das Gepäck\tbagasi
der Reisepass, die Reisepässe\tpaspor
die Grenze, die Grenzen\tperbatasan
die Rezeption, die Rezeptionen\tresepsionis
das Einzelzimmer, die Einzelzimmer\tkamar tunggal
das Doppelzimmer, die Doppelzimmer\tkamar ganda
die Übernachtung, die Übernachtungen\tmenginap satu malam
die Buchungsbestätigung, die Buchungsbestätigungen\tkonfirmasi pemesanan
die Zimmerkarte, die Zimmerkarten\tkartu kamar
die Klimaanlage, die Klimaanlagen\tpenyejuk udara
die Handtücher\thanduk
die Jugendherberge, die Jugendherbergen\thostel pemuda
der Stadtplan, die Stadtpläne\tpeta kota
die Altstadt, die Altstädte\tkota tua
das Museum, die Museen\tmuseum
der Eintritt\tbiaya masuk
die Öffnungszeit, die Öffnungszeiten\tjam buka
der Ausflug, die Ausflüge\tperjalanan wisata singkat
die Aussicht\tpemandangan
abfahren\tberangkat
ankommen\ttiba
verpassen\tketinggalan
sich verirren\ttersesat
übernachten\tmenginap
buchen\tmemesan
stornieren\tmembatalkan pesanan
sich erkundigen\tmencari informasi
besichtigen\tmengunjungi tempat wisata
mitbringen\tmembawa serta`),
      ...phrases('a2-perjalanan', `
Wann ist die Abfahrt?\tKapan keberangkatannya?
Auf welchem Gleis fährt der Zug ab?\tKereta berangkat dari jalur berapa?
Muss ich unterwegs umsteigen?\tApakah saya harus berganti kendaraan di perjalanan?
Wie lange ist die Umsteigezeit?\tBerapa lama waktu untuk transit?
Der Zug endet hier.\tPerjalanan kereta berakhir di sini.
Dieser Wagen fährt nicht weiter.\tGerbong ini tidak melanjutkan perjalanan.
Ist der Platz reserviert?\tApakah tempat duduk ini sudah dipesan?
Wo kann ich eine Fahrkarte lösen?\tDi mana saya dapat membeli tiket?
Gilt das Ticket auch für den Bus?\tApakah tiket ini juga berlaku untuk bus?
Ich brauche eine Tageskarte.\tSaya membutuhkan tiket harian.
Die Durchsage war schwer zu verstehen.\tPengumumannya sulit dipahami.
Mein Koffer ist nicht angekommen.\tKoper saya tidak tiba.
Wo ist die Gepäckausgabe?\tDi mana tempat pengambilan bagasi?
Ich habe nur Handgepäck.\tSaya hanya membawa bagasi kabin.
Mein Flug wurde verschoben.\tPenerbangan saya ditunda.
Ich möchte für zwei Nächte buchen.\tSaya ingin memesan untuk dua malam.
Ist noch ein Einzelzimmer frei?\tApakah masih ada kamar tunggal kosong?
Ich habe eine Buchungsbestätigung.\tSaya memiliki konfirmasi pemesanan.
Wann muss ich auschecken?\tKapan saya harus keluar dari hotel?
Kann ich mein Gepäck hier lassen?\tBisakah saya menitipkan bagasi di sini?
Im Zimmer fehlen Handtücher.\tTidak ada handuk di kamar.
Die Klimaanlage lässt sich nicht einschalten.\tPenyejuk udaranya tidak dapat dinyalakan.
Könnte ich ein ruhigeres Zimmer bekommen?\tBisakah saya mendapatkan kamar yang lebih tenang?
Das Zimmer entspricht nicht der Beschreibung.\tKamarnya tidak sesuai deskripsi.
Ist die Kurtaxe im Preis enthalten?\tApakah pajak wisata termasuk dalam harga?
Wo bekomme ich einen Stadtplan?\tDi mana saya bisa mendapatkan peta kota?
Welche Sehenswürdigkeit lohnt sich?\tTempat wisata mana yang layak dikunjungi?
Das Museum ist montags geschlossen.\tMuseum tutup pada hari Senin.
Gibt es eine Führung auf Deutsch?\tApakah ada tur berpemandu dalam bahasa Jerman?
Wo beginnt die Stadtführung?\tDi mana tur kota dimulai?
Der Eintritt ist heute kostenlos.\tHari ini tiket masuk gratis.
Wir möchten Fahrräder ausleihen.\tKami ingin menyewa sepeda.
Ist der Weg gut ausgeschildert?\tApakah jalannya memiliki petunjuk yang jelas?
Wie weit ist es bis zum See?\tBerapa jauh jaraknya sampai danau?
Wir sind in die falsche Richtung gefahren.\tKami pergi ke arah yang salah.
Können Sie uns auf der Karte zeigen, wo wir sind?\tBisakah Anda menunjukkan posisi kami di peta?
Fährt heute noch eine Fähre?\tApakah masih ada kapal feri hari ini?
Die letzte Verbindung ist schon weg.\tSambungan terakhir sudah berangkat.
Wir müssen eine andere Strecke nehmen.\tKami harus mengambil rute lain.
Danke für die Auskunft.\tTerima kasih atas informasinya.`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-b1-beruf-buero', name: 'Jerman B1 · Profesi & Kantor', summary: 'Pekerjaan sehari-hari, rapat, email, tenggat, koordinasi, dan pengembangan karier.', description: 'Kosakata dan frasa untuk berkomunikasi mandiri di tempat kerja dan menangani tugas kantor.', level: 'menengah', category: 'kerja', color: '#50617E', featured: true,
    entries: [
      ...words('b1-kerja', `
der Arbeitsplatz, die Arbeitsplätze\ttempat kerja
der Arbeitgeber, die Arbeitgeber\tpemberi kerja
der Arbeitnehmer, die Arbeitnehmer\tpekerja laki-laki
die Arbeitnehmerin, die Arbeitnehmerinnen\tpekerja perempuan
der Arbeitsvertrag, die Arbeitsverträge\tkontrak kerja
die Probezeit, die Probezeiten\tmasa percobaan
das Gehalt, die Gehälter\tgaji
der Urlaubstag, die Urlaubstage\thari cuti
die Überstunde, die Überstunden\tjam lembur
die Vertretung, die Vertretungen\tpengganti kerja
die Geschäftsreise, die Geschäftsreisen\tperjalanan dinas
die Fortbildung, die Fortbildungen\tpelatihan lanjutan
die Beförderung, die Beförderungen\tpromosi jabatan
die Kündigung, die Kündigungen\tpengunduran diri atau pemutusan kerja
die Tagesordnung, die Tagesordnungen\tagenda rapat
das Protokoll, die Protokolle\tnotulen
die Videokonferenz, die Videokonferenzen\tkonferensi video
die Präsentation, die Präsentationen\tpresentasi
die Anlage, die Anlagen\tlampiran
der Zugriff\takses
die Berechtigung, die Berechtigungen\tizin akses
die Störung, die Störungen\tgangguan
die Lieferung, die Lieferungen\tpengiriman
der Auftrag, die Aufträge\tpesanan atau penugasan
die Nachfrage, die Nachfragen\tpermintaan atau pertanyaan lanjutan
einarbeiten\tmelatih pegawai baru
weiterleiten\tmeneruskan pesan
nachfragen\tmenanyakan kembali
bestätigen\tmengonfirmasi
abspeichern\tmenyimpan berkas
hochladen\tmengunggah
herunterladen\tmengunduh
genehmigen\tmenyetujui secara resmi
vertreten\tmenggantikan seseorang
kündigen\tmengundurkan diri atau memutus kontrak
verhandeln\tbernegosiasi
erledigen\tmenyelesaikan tugas
rechtzeitig\ttepat pada waktunya
vertraulich\trahasia
verbindlich\tmengikat`),
      ...phrases('b1-kerja', `
Ich bin für die Kundenbetreuung zuständig.\tSaya bertanggung jawab atas layanan pelanggan.
Meine Probezeit endet nächsten Monat.\tMasa percobaan saya berakhir bulan depan.
Der Vertrag ist zunächst auf ein Jahr befristet.\tKontraknya pada awalnya terbatas satu tahun.
Wie viele Urlaubstage stehen mir zu?\tBerapa hari cuti yang menjadi hak saya?
Ich möchte nächste Woche Urlaub beantragen.\tSaya ingin mengajukan cuti minggu depan.
Wer übernimmt meine Vertretung?\tSiapa yang akan menggantikan saya?
Die Überstunden werden ausgeglichen.\tJam lembur akan dikompensasi.
Ich arbeite heute im Homeoffice.\tHari ini saya bekerja dari rumah.
Wir haben flexible Arbeitszeiten.\tKami memiliki jam kerja fleksibel.
Ich nehme morgen an einer Fortbildung teil.\tBesok saya mengikuti pelatihan lanjutan.
Was steht auf der Tagesordnung?\tApa yang ada dalam agenda?
Wer schreibt heute das Protokoll?\tSiapa yang menulis notulen hari ini?
Können wir den Punkt vertagen?\tBisakah kita menunda poin ini?
Dazu brauche ich noch weitere Informationen.\tUntuk itu saya masih membutuhkan informasi tambahan.
Wir sind noch nicht zu einer Entscheidung gekommen.\tKami belum mencapai keputusan.
Bitte fassen Sie die Ergebnisse kurz zusammen.\tMohon rangkum hasilnya secara singkat.
Ich teile gleich meinen Bildschirm.\tSaya akan segera membagikan layar saya.
Ihre Verbindung ist gerade instabil.\tKoneksi Anda sedang tidak stabil.
Das Mikrofon ist noch ausgeschaltet.\tMikrofonnya masih dimatikan.
Die Präsentation ist im gemeinsamen Ordner.\tPresentasinya berada di folder bersama.
Anbei sende ich Ihnen die gewünschten Unterlagen.\tBersama ini saya kirimkan dokumen yang diminta.
Könnten Sie die Nachricht weiterleiten?\tBisakah Anda meneruskan pesan ini?
Bitte behandeln Sie die Informationen vertraulich.\tMohon perlakukan informasi tersebut sebagai rahasia.
Ich habe keinen Zugriff auf die Datei.\tSaya tidak memiliki akses ke berkas itu.
Die Anlage lässt sich nicht öffnen.\tLampirannya tidak dapat dibuka.
Bitte verwenden Sie die aktuelle Version.\tMohon gunakan versi terbaru.
Der Auftrag muss bis morgen erledigt sein.\tPenugasan tersebut harus selesai besok.
Wir liegen gut im Zeitplan.\tKami berjalan sesuai jadwal.
Bei diesem Projekt gibt es Verzögerungen.\tAda keterlambatan dalam proyek ini.
Die Lieferung wurde für Montag angekündigt.\tPengirimannya dijadwalkan untuk Senin.
Der Kunde hat kurzfristig Änderungen verlangt.\tPelanggan meminta perubahan secara mendadak.
Ich kläre das mit meiner Vorgesetzten.\tSaya akan mengklarifikasinya dengan atasan saya.
Dafür brauche ich eine Genehmigung.\tUntuk itu saya membutuhkan persetujuan.
Können Sie die Kosten kurz aufschlüsseln?\tBisakah Anda merinci biayanya secara singkat?
Das Angebot ist bis Monatsende gültig.\tPenawaran tersebut berlaku sampai akhir bulan.
Über den Preis müssen wir noch verhandeln.\tKami masih harus bernegosiasi mengenai harga.
Wann können Sie mit der Arbeit beginnen?\tKapan Anda dapat mulai bekerja?
Ich brauche etwas Zeit für die Einarbeitung.\tSaya membutuhkan waktu untuk mempelajari pekerjaan baru.
Meine Kollegin zeigt mir die wichtigsten Abläufe.\tRekan kerja saya menunjukkan alur utama kepada saya.
Ich möchte mich beruflich weiterentwickeln.\tSaya ingin berkembang secara profesional.`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-c1-gesellschaft-debatte', name: 'Jerman C1 · Masyarakat & Debat', summary: 'Kebijakan publik, kesetaraan, demokrasi, perubahan sosial, dan argumentasi bernuansa.', description: 'Materi tingkat lanjut untuk memahami diskusi publik dan menyampaikan posisi secara tepat serta kritis.', level: 'lanjutan', category: 'lainnya', color: '#75556C', featured: true,
    entries: [
      ...words('c1-masyarakat', `
die Teilhabe\tpartisipasi sosial
die Chancengleichheit\tkesetaraan peluang
die Daseinsvorsorge\tlayanan dasar publik
die Meinungsfreiheit\tkebebasan berpendapat
die Rechtsstaatlichkeit\tsupremasi hukum
die Gewaltenteilung\tpemisahan kekuasaan
die Zivilgesellschaft\tmasyarakat sipil
das Gemeinwohl\tkepentingan umum
der gesellschaftliche Zusammenhalt\tkohesi sosial
die Polarisierung\tpolarisasi
die Ausgrenzung\tpengucilan
die Benachteiligung\tketidakberuntungan struktural
die Diskriminierung\tdiskriminasi
die Vielfalt\tkeberagaman
die Zuwanderung\timigrasi masuk
die Integration\tintegrasi
der demografische Wandel\tperubahan demografis
die Wohnungsnot\tkekurangan perumahan
die Lebenshaltungskosten\tbiaya hidup
die Umverteilung\tredistribusi
die Steuerbelastung\tbeban pajak
die Verschuldung\tutang
die Regulierung\tregulasi
die Versorgungssicherheit\tkeamanan pasokan
die Infrastruktur\tinfrastruktur
die Energiewende\ttransisi energi
die Klimaanpassung\tadaptasi iklim
die Interessengruppe, die Interessengruppen\tkelompok kepentingan
der Handlungsspielraum\truang gerak kebijakan
die Rechenschaftspflicht\tkewajiban pertanggungjawaban
abwägen\tmenimbang dengan cermat
einschränken\tmembatasi
aushandeln\tmerundingkan
befürworten\tmendukung suatu gagasan
beanstanden\tmengkritik secara resmi
entkräften\tmembantah argumen
zuspitzen\tmempertajam konflik
überbrücken\tmenjembatani
vermitteln\tmenengahi
verankern\tmenetapkan secara kokoh`),
      ...phrases('c1-masyarakat', `
Die Debatte ist stark polarisiert.\tPerdebatan tersebut sangat terpolarisasi.
Ein breiter gesellschaftlicher Konsens fehlt.\tBelum ada konsensus sosial yang luas.
Die Positionen liegen weit auseinander.\tPosisi kedua pihak sangat berjauhan.
Beide Seiten erheben berechtigte Einwände.\tKedua pihak menyampaikan keberatan yang beralasan.
Der Konflikt lässt sich nicht auf einen einzigen Faktor reduzieren.\tKonflik tersebut tidak dapat direduksi menjadi satu faktor.
Die Ursachen sind struktureller Natur.\tPenyebabnya bersifat struktural.
Die Entwicklung verschärft bestehende Ungleichheiten.\tPerkembangan tersebut memperburuk ketimpangan yang ada.
Davon profitieren nicht alle Bevölkerungsgruppen gleichermaßen.\tTidak semua kelompok penduduk mendapat manfaat yang sama.
Besonders gefährdete Gruppen brauchen gezielte Unterstützung.\tKelompok yang sangat rentan membutuhkan dukungan khusus.
Soziale Teilhabe darf nicht vom Einkommen abhängen.\tPartisipasi sosial tidak boleh bergantung pada pendapatan.
Der Staat muss die Grundversorgung sicherstellen.\tNegara harus menjamin layanan dasar.
Gleichzeitig sind die finanziellen Spielräume begrenzt.\tPada saat yang sama ruang fiskalnya terbatas.
Die Kosten müssen fair verteilt werden.\tBiayanya harus dibagi secara adil.
Kurzfristige Entlastungen reichen nicht aus.\tKeringanan jangka pendek tidaklah cukup.
Gefragt ist eine langfristige Strategie.\tYang dibutuhkan adalah strategi jangka panjang.
Die Reform sollte wissenschaftlich begleitet werden.\tReformasi tersebut sebaiknya didampingi secara ilmiah.
Ihre Folgen müssen transparent ausgewertet werden.\tDampaknya harus dievaluasi secara transparan.
Politische Entscheidungen brauchen demokratische Legitimation.\tKeputusan politik membutuhkan legitimasi demokratis.
Die Öffentlichkeit hat ein Recht auf Information.\tMasyarakat memiliki hak atas informasi.
Unabhängige Medien erfüllen eine Kontrollfunktion.\tMedia independen menjalankan fungsi pengawasan.
Die Meinungsfreiheit hat jedoch rechtliche Grenzen.\tNamun kebebasan berpendapat memiliki batas hukum.
Kritik darf nicht mit Ausgrenzung verwechselt werden.\tKritik tidak boleh disamakan dengan pengucilan.
Die unterschiedlichen Interessen müssen ausgehandelt werden.\tBerbagai kepentingan harus dirundingkan.
Ein Kompromiss setzt gegenseitiges Entgegenkommen voraus.\tKompromi mensyaratkan konsesi timbal balik.
Der Vorschlag schafft keinen angemessenen Ausgleich.\tUsulan tersebut tidak menciptakan keseimbangan yang memadai.
Diese Regelung könnte unbeabsichtigte Anreize setzen.\tAturan ini dapat menciptakan insentif yang tidak disengaja.
Der Nutzen steht in keinem Verhältnis zum Aufwand.\tManfaatnya tidak sebanding dengan upayanya.
Die Gegenargumente sind damit nicht vollständig entkräftet.\tArgumen tandingan belum sepenuhnya terbantahkan.
Das Beispiel ist nicht ohne Weiteres übertragbar.\tContoh tersebut tidak dapat diterapkan begitu saja.
Einzelfälle erlauben keine allgemeine Schlussfolgerung.\tKasus individual tidak memungkinkan kesimpulan umum.
Die Datenlage bleibt lückenhaft.\tKetersediaan datanya masih belum lengkap.
Die Aussage sollte daher vorsichtig interpretiert werden.\tPernyataan itu karenanya harus ditafsirkan dengan hati-hati.
Es bedarf klarer und überprüfbarer Kriterien.\tDiperlukan kriteria yang jelas dan dapat diperiksa.
Die Betroffenen sollten frühzeitig einbezogen werden.\tPihak terdampak sebaiknya dilibatkan sejak awal.
Die Zuständigkeit darf nicht ungeklärt bleiben.\tWewenangnya tidak boleh dibiarkan tidak jelas.
Institutionen müssen Rechenschaft ablegen.\tInstitusi harus memberikan pertanggungjawaban.
Vertrauen entsteht durch nachvollziehbare Verfahren.\tKepercayaan muncul melalui prosedur yang dapat dipahami.
Die Maßnahme stößt auf breite Ablehnung.\tLangkah tersebut mendapat penolakan luas.
Inzwischen zeichnet sich ein Kurswechsel ab.\tKini mulai terlihat perubahan arah kebijakan.
Eine abschließende Bewertung wäre verfrüht.\tPenilaian akhir masih terlalu dini.`),
    ],
  }),
];
