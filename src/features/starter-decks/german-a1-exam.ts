import { curatedGermanDeck, germanEntries } from './german-builder';

const rows = (type: 'word' | 'phrase', tag: string, data: string) => germanEntries(type, tag, data);

/** Segmen A1 prioritas ujian Goethe; lihat docs/CONTENT_SOURCES.md. */
export const germanA1ExamStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-a1-kata-makanan-minuman', name: 'Jerman A1 · Kata Makanan & Minuman', summary: 'Bahan makanan, hidangan, minuman, rasa, kemasan, dan perlengkapan makan dasar.', description: 'Kosakata A1 untuk memahami menu, berbelanja bahan makanan, dan menyebut kebutuhan makan sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#A05F3C', featured: true,
    entries: rows('word', 'a1-makanan', `
das Brötchen, die Brötchen	roti bulat kecil
das Toastbrot	roti tawar panggang
das Vollkornbrot	roti gandum utuh
das Mehl	tepung
der Reis	beras atau nasi
die Nudel, die Nudeln	mi atau pasta
die Kartoffel, die Kartoffeln	kentang
das Ei, die Eier	telur
die Milch	susu
der Joghurt, die Joghurts	yoghurt
die Sahne	krim susu
die Butter	mentega
der Käse	keju
das Rindfleisch	daging sapi
das Hähnchen, die Hähnchen	ayam
der Fisch, die Fische	ikan
die Wurst, die Würste	sosis
der Apfel, die Äpfel	apel
die Banane, die Bananen	pisang
die Orange, die Orangen	jeruk
die Traube, die Trauben	anggur
die Erdbeere, die Erdbeeren	stroberi
die Zitrone, die Zitronen	lemon
die Tomate, die Tomaten	tomat
die Gurke, die Gurken	mentimun
die Karotte, die Karotten	wortel
die Zwiebel, die Zwiebeln	bawang bombai
der Salat, die Salate	salad atau selada
die Bohne, die Bohnen	kacang buncis
die Erbse, die Erbsen	kacang polong
das Frühstück	sarapan
das Mittagessen	makan siang
das Abendessen	makan malam
die Suppe, die Suppen	sup
das Sandwich, die Sandwiches	sandwich
der Kuchen, die Kuchen	kue bolu
der Keks, die Kekse	biskuit
die Schokolade	cokelat
das Eis	es krim
der Zucker	gula
das Salz	garam
der Pfeffer	lada
das Öl	minyak
das Mineralwasser	air mineral
der Saft, die Säfte	jus
der Kakao	kakao
der Tee	teh
die Speisekarte, die Speisekarten	menu makanan
das Gericht, die Gerichte	hidangan
die Portion, die Portionen	porsi
die Tasse, die Tassen	cangkir
der Teller, die Teller	piring
die Gabel, die Gabeln	garpu
das Messer, die Messer	pisau
der Löffel, die Löffel	sendok
die Packung, die Packungen	kemasan
die Dose, die Dosen	kaleng
die Scheibe, die Scheiben	irisan
lecker	enak
frisch	segar
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-restoran-belanja', name: 'Jerman A1 · Frasa Restoran & Belanja Makanan', summary: 'Ungkapan untuk membeli bahan makanan, memesan hidangan, menyebut pilihan, dan membayar.', description: 'Frasa komunikasi A1 untuk pasar, toko roti, restoran, kafe, dan percakapan makan sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#B77942', featured: true,
    entries: rows('phrase', 'a1-restoran', `
Ich hätte gern zwei Brötchen.	Saya ingin dua roti kecil.
Ein Kilo Kartoffeln, bitte.	Satu kilogram kentang, tolong.
Haben Sie frisches Brot?	Apakah Anda memiliki roti segar?
Was kostet ein Kilo Äpfel?	Berapa harga satu kilogram apel?
Ich nehme ein halbes Kilo.	Saya ambil setengah kilogram.
Sonst noch etwas?	Ada lagi yang lain?
Das ist alles, danke.	Itu saja, terima kasih.
Kann ich bar bezahlen?	Bisakah saya membayar tunai?
Ich brauche eine Tüte, bitte.	Saya membutuhkan kantong, tolong.
Wo finde ich Milch?	Di mana saya dapat menemukan susu?
Die Tomaten sind heute günstig.	Tomat hari ini murah.
Diese Bananen sind noch grün.	Pisang-pisang ini masih hijau.
Ich möchte etwas Käse kaufen.	Saya ingin membeli keju.
Welche Sorte möchten Sie?	Jenis mana yang Anda inginkan?
Bitte schneiden Sie ihn dünn.	Tolong iris tipis keju itu.
Ich brauche sechs Eier.	Saya membutuhkan enam butir telur.
Ist das Hähnchen frisch?	Apakah ayam itu segar?
Gibt es auch Vollkornbrot?	Apakah tersedia juga roti gandum utuh?
Die Packung ist zu groß.	Kemasannya terlalu besar.
Ich suche Kaffee ohne Koffein.	Saya mencari kopi tanpa kafein.
Haben Sie einen Tisch für zwei?	Apakah ada meja untuk dua orang?
Wir möchten draußen sitzen.	Kami ingin duduk di luar.
Können wir die Speisekarte haben?	Bisakah kami meminta menu?
Was können Sie empfehlen?	Apa yang dapat Anda rekomendasikan?
Was ist das Tagesgericht?	Apa hidangan hari ini?
Ich nehme die Gemüsesuppe.	Saya memilih sup sayuran.
Für mich bitte den Salat.	Untuk saya saladnya, tolong.
Ich möchte nur eine kleine Portion.	Saya hanya ingin porsi kecil.
Ohne Zwiebeln, bitte.	Tanpa bawang bombai, tolong.
Bitte nicht zu scharf.	Tolong jangan terlalu pedas.
Für mich bitte ohne Fleisch.	Untuk saya tanpa daging, tolong.
Ich bin Vegetarierin.	Saya seorang vegetarian perempuan.
Ist in der Suppe Fleisch?	Apakah ada daging di dalam sup?
Enthält der Kuchen Nüsse?	Apakah kue ini mengandung kacang?
Ich trinke keinen Alkohol.	Saya tidak minum alkohol.
Ein Mineralwasser ohne Kohlensäure, bitte.	Air mineral tanpa soda, tolong.
Möchten Sie noch etwas trinken?	Apakah Anda ingin minum lagi?
Für mich einen Tee mit Zitrone.	Untuk saya teh dengan lemon.
Den Kaffee bitte ohne Zucker.	Kopinya tanpa gula, tolong.
Das Essen kommt gleich.	Makanannya segera datang.
Guten Appetit!	Selamat makan!
Das schmeckt sehr gut.	Rasanya sangat enak.
Die Suppe ist zu salzig.	Supnya terlalu asin.
Das Essen ist noch kalt.	Makanannya masih dingin.
Entschuldigung, das habe ich nicht bestellt.	Maaf, saya tidak memesan ini.
Mir fehlt noch eine Gabel.	Saya masih belum mendapat garpu.
Könnte ich ein Glas Wasser bekommen?	Bisakah saya mendapatkan segelas air?
Bringen Sie bitte noch einen Teller.	Tolong bawakan satu piring lagi.
Möchten Sie einen Nachtisch?	Apakah Anda menginginkan hidangan penutup?
Wir teilen uns ein Stück Kuchen.	Kami berbagi sepotong kue.
Ich bin satt, danke.	Saya sudah kenyang, terima kasih.
Es war sehr lecker.	Makanannya sangat enak.
Wir möchten gern bezahlen.	Kami ingin membayar.
Zusammen oder getrennt?	Bersama atau terpisah?
Wir zahlen getrennt.	Kami membayar secara terpisah.
Stimmt so.	Kembaliannya untuk Anda.
Kann ich die Rechnung bekommen?	Bisakah saya meminta tagihannya?
Das Frühstück ist im Preis enthalten.	Sarapan termasuk dalam harga.
Wann gibt es Abendessen?	Kapan makan malam tersedia?
Zum Mitnehmen, bitte.	Untuk dibawa pulang, tolong.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-kata-profesi', name: 'Jerman A1 · Kata Profesi Dasar', summary: 'Profesi umum, tempat kerja, orang di tempat kerja, jadwal, dan aktivitas pekerjaan sederhana.', description: 'Kosakata A1 untuk memperkenalkan pekerjaan sendiri serta memahami informasi dasar tentang profesi dan tempat kerja.', level: 'pemula', category: 'kerja', color: '#526E78', featured: true,
    entries: rows('word', 'a1-profesi', `
der Apotheker, die Apotheker	apoteker laki-laki
der Bäcker, die Bäcker	pembuat roti laki-laki
die Bäckerin, die Bäckerinnen	pembuat roti perempuan
der Verkäufer, die Verkäufer	pramuniaga laki-laki
die Verkäuferin, die Verkäuferinnen	pramuniaga perempuan
der Kellner, die Kellner	pelayan restoran laki-laki
die Kellnerin, die Kellnerinnen	pelayan restoran perempuan
der Koch, die Köche	juru masak laki-laki
die Köchin, die Köchinnen	juru masak perempuan
die Apothekerin, die Apothekerinnen	apoteker perempuan
der Sänger, die Sänger	penyanyi laki-laki
der Lehrer, die Lehrer	guru laki-laki
die Lehrerin, die Lehrerinnen	guru perempuan
der Fahrer, die Fahrer	pengemudi laki-laki
die Fahrerin, die Fahrerinnen	pengemudi perempuan
der Friseur, die Friseure	penata rambut laki-laki
die Friseurin, die Friseurinnen	penata rambut perempuan
der Mechaniker, die Mechaniker	mekanik laki-laki
die Mechanikerin, die Mechanikerinnen	mekanik perempuan
der Polizist, die Polizisten	polisi laki-laki
die Polizistin, die Polizistinnen	polisi perempuan
der Handwerker, die Handwerker	pekerja terampil laki-laki
die Handwerkerin, die Handwerkerinnen	pekerja terampil perempuan
der Krankenpfleger, die Krankenpfleger	perawat laki-laki
die Krankenschwester, die Krankenschwestern	perawat perempuan
der Hausmann, die Hausmänner	bapak rumah tangga
die Hausfrau, die Hausfrauen	ibu rumah tangga
der Rentner, die Rentner	pensiunan laki-laki
die Rentnerin, die Rentnerinnen	pensiunan perempuan
der Student, die Studenten	mahasiswa laki-laki
die Studentin, die Studentinnen	mahasiswa perempuan
der Chef, die Chefs	atasan laki-laki
die Chefin, die Chefinnen	atasan perempuan
der Kollege, die Kollegen	rekan kerja laki-laki
die Kollegin, die Kolleginnen	rekan kerja perempuan
der Kunde, die Kunden	pelanggan laki-laki
die Kundin, die Kundinnen	pelanggan perempuan
die Firma, die Firmen	perusahaan
das Büro, die Büros	kantor
die Werkstatt, die Werkstätten	bengkel
die Bäckerei, die Bäckereien	toko roti
das Krankenhaus, die Krankenhäuser	rumah sakit
die Sängerin, die Sängerinnen	penyanyi perempuan
das Geschäft, die Geschäfte	toko
das Restaurant, die Restaurants	restoran
die Arbeit	tempat kerja atau pekerjaan
die Arbeitszeit, die Arbeitszeiten	jam kerja
die Pause, die Pausen	waktu istirahat
der Feierabend	waktu selesai kerja
der Urlaub	cuti
Vollzeit	purnawaktu
Teilzeit	paruh waktu
arbeitslos	menganggur
beschäftigt	sibuk atau bekerja
verdienen	memperoleh penghasilan
bedienen	melayani
verkaufen	menjual
kochen	memasak
unterrichten	mengajar
fahren	mengemudi
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-pekerjaan', name: 'Jerman A1 · Frasa Pekerjaan Sehari-hari', summary: 'Ungkapan untuk memperkenalkan profesi, menyebut tempat dan jadwal kerja, serta menangani percakapan kerja dasar.', description: 'Frasa A1 untuk pertanyaan pekerjaan dalam perkenalan, formulir, percakapan, dan pesan singkat.', level: 'pemula', category: 'kerja', color: '#627F87', featured: true,
    entries: rows('phrase', 'a1-kerja', `
Was sind Sie von Beruf?	Apa profesi Anda?
Ich bin Bäcker von Beruf.	Saya berprofesi sebagai pembuat roti.
Ich arbeite als Verkäuferin.	Saya bekerja sebagai pramuniaga.
Zurzeit bin ich Student.	Saat ini saya seorang mahasiswa.
Ich bin noch in der Ausbildung.	Saya masih menjalani pendidikan kejuruan.
Ich arbeite im Krankenhaus.	Saya bekerja di rumah sakit.
Meine Schwester arbeitet in einer Schule.	Saudara perempuan saya bekerja di sekolah.
Er arbeitet bei einer kleinen Firma.	Dia bekerja di sebuah perusahaan kecil.
Wo ist dein Arbeitsplatz?	Di mana tempat kerjamu?
Mein Büro ist im Stadtzentrum.	Kantor saya berada di pusat kota.
Wie heißt Ihre Firma?	Apa nama perusahaan Anda?
Was machen Sie bei der Arbeit?	Apa yang Anda lakukan di tempat kerja?
Ich bediene die Kunden.	Saya melayani pelanggan.
Sie verkauft Kleidung.	Dia menjual pakaian.
Er repariert Autos.	Dia memperbaiki mobil.
Meine Mutter unterrichtet Deutsch.	Ibu saya mengajar bahasa Jerman.
Der Koch bereitet das Mittagessen vor.	Juru masak menyiapkan makan siang.
Der Fahrer bringt die Gäste zum Hotel.	Pengemudi membawa tamu ke hotel.
Wann fangen Sie an zu arbeiten?	Kapan Anda mulai bekerja?
Ich fange um acht Uhr an.	Saya mulai pukul delapan.
Wann haben Sie Feierabend?	Kapan Anda selesai bekerja?
Um fünf Uhr bin ich fertig.	Pukul lima saya selesai.
Wie lange arbeiten Sie heute?	Berapa lama Anda bekerja hari ini?
Ich arbeite heute sechs Stunden.	Hari ini saya bekerja enam jam.
Arbeiten Sie am Wochenende?	Apakah Anda bekerja pada akhir pekan?
Samstags muss ich manchmal arbeiten.	Pada hari Sabtu terkadang saya harus bekerja.
Sonntags habe ich immer frei.	Setiap hari Minggu saya selalu libur.
Ich arbeite von Montag bis Freitag.	Saya bekerja dari Senin sampai Jumat.
Wann machen wir Pause?	Kapan kita beristirahat?
Die Pause dauert dreißig Minuten.	Waktu istirahat berlangsung tiga puluh menit.
Ich esse in der Kantine zu Mittag.	Saya makan siang di kantin.
Heute komme ich etwas später.	Hari ini saya datang sedikit terlambat.
Der Bus hatte Verspätung.	Busnya mengalami keterlambatan.
Ich kann morgen nicht arbeiten.	Besok saya tidak dapat bekerja.
Ich bin leider krank.	Sayangnya saya sedang sakit.
Bitte rufen Sie im Büro an.	Tolong telepon kantor.
Kannst du heute länger bleiben?	Bisakah kamu tinggal lebih lama hari ini?
Ja, das ist kein Problem.	Ya, itu tidak masalah.
Nein, heute geht es leider nicht.	Tidak, sayangnya hari ini tidak bisa.
Ich tausche die Schicht mit Anna.	Saya bertukar giliran kerja dengan Anna.
Meine Chefin ist heute nicht da.	Atasan perempuan saya tidak berada di sini hari ini.
Der neue Kollege heißt Karim.	Rekan kerja baru itu bernama Karim.
Kannst du mir kurz helfen?	Bisakah kamu membantu saya sebentar?
Zeig mir bitte, wie das geht.	Tolong tunjukkan kepada saya caranya.
Wo finde ich die Unterlagen?	Di mana saya dapat menemukan dokumennya?
Die Unterlagen liegen auf dem Schreibtisch.	Dokumennya terletak di atas meja kerja.
Bitte schicken Sie mir eine E-Mail.	Tolong kirimkan saya surel.
Ich schreibe die Adresse auf.	Saya menuliskan alamatnya.
Der Kunde wartet schon.	Pelanggan sudah menunggu.
Ich bin gleich für Sie da.	Saya segera melayani Anda.
Entschuldigung für die Wartezeit.	Maaf atas waktu tunggunya.
Das Geschäft öffnet um neun.	Toko buka pukul sembilan.
Die Praxis schließt um achtzehn Uhr.	Tempat praktik tutup pukul delapan belas.
Im August habe ich Urlaub.	Pada bulan Agustus saya mengambil cuti.
Wie viele Tage Urlaub hast du?	Berapa hari cuti yang kamu miliki?
Ich suche eine neue Arbeit.	Saya sedang mencari pekerjaan baru.
Die Stelle ist nur in Teilzeit.	Posisi itu hanya paruh waktu.
Wie viel verdient man dort?	Berapa penghasilan seseorang di sana?
Die Arbeit macht mir Spaß.	Saya menikmati pekerjaan itu.
Bis morgen bei der Arbeit!	Sampai besok di tempat kerja!
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-kata-hobi', name: 'Jerman A1 · Kata Hobi & Waktu Luang', summary: 'Olahraga, musik, media, kegiatan akhir pekan, tempat rekreasi, dan perlengkapan hobi.', description: 'Kosakata A1 untuk berbicara tentang kesukaan, aktivitas bebas, ajakan, dan rencana akhir pekan.', level: 'pemula', category: 'sehari-hari', color: '#657748', featured: true,
    entries: rows('word', 'a1-hobi', `
die Erholung	rekreasi atau pemulihan
der Feierabend, die Feierabende	waktu senggang setelah kerja
der Sport	olahraga
der Fußball	sepak bola
der Basketball	bola basket
der Volleyball	bola voli
das Tennis	tenis
das Schwimmen	renang
das Fahrrad, die Fahrräder	sepeda
der Spaziergang, die Spaziergänge	jalan santai
die Wanderung, die Wanderungen	pendakian santai
das Spiel, die Spiele	permainan
die Mannschaft, die Mannschaften	tim olahraga
der Ball, die Bälle	bola
das Training, die Trainings	latihan olahraga
das Fitnessstudio, die Fitnessstudios	pusat kebugaran
das Schwimmbad, die Schwimmbäder	kolam renang
der Park, die Parks	taman
der See, die Seen	danau
das Kino, die Kinos	bioskop
der Film, die Filme	film
das Theater, die Theater	teater
das Konzert, die Konzerte	konser
die Musik	musik
das Lied, die Lieder	lagu
die Gitarre, die Gitarren	gitar
das Klavier, die Klaviere	piano
das Radio, die Radios	radio
der Fernseher, die Fernseher	televisi
die Sendung, die Sendungen	acara siaran
die Zeitung, die Zeitungen	koran
die Zeitschrift, die Zeitschriften	majalah
der Roman, die Romane	novel
die Geschichte, die Geschichten	cerita
die Bibliothek, die Bibliotheken	perpustakaan
das Internet	internet
das Computerspiel, die Computerspiele	permainan komputer
das Brettspiel, die Brettspiele	permainan papan
die Kamera, die Kameras	kamera
das Bild, die Bilder	gambar
die Party, die Partys	pesta
der Geburtstag, die Geburtstage	ulang tahun
das Freizeitangebot, die Freizeitangebote	pilihan kegiatan rekreasi
der Eintrittspreis, die Eintrittspreise	harga tiket masuk
die Karte, die Karten	tiket atau kartu
das Picknick, die Picknicks	piknik
der Ausflug, die Ausflüge	tamasya singkat
spielen	bermain
trainieren	berlatih olahraga
schwimmen	berenang
laufen	berlari
wandern	mendaki santai
tanzen	menari
singen	bernyanyi
zeichnen	menggambar
fotografieren	memotret
lesen	membaca
fernsehen	menonton televisi
sammeln	mengoleksi
besuchen	mengunjungi
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-hobi', name: 'Jerman A1 · Frasa Hobi, Akhir Pekan & Ajakan', summary: 'Ungkapan untuk membicarakan kesukaan, mengajak, mengatur waktu, menerima, dan menolak secara sederhana.', description: 'Frasa A1 untuk percakapan tentang waktu luang serta fungsi berbicara yang sering dipakai dalam tugas Goethe.', level: 'pemula', category: 'sehari-hari', color: '#778A4B', featured: true,
    entries: rows('phrase', 'a1-ajakan', `
Was machst du in deiner Freizeit?	Apa yang kamu lakukan pada waktu luang?
Was ist dein Lieblingshobby?	Apa hobi favoritmu?
Ich lese sehr gern.	Saya sangat suka membaca.
Ich spiele gern Fußball.	Saya suka bermain sepak bola.
Ich höre jeden Tag Musik.	Saya mendengarkan musik setiap hari.
Am Abend sehe ich oft fern.	Pada malam hari saya sering menonton televisi.
Mein Bruder spielt Gitarre.	Saudara laki-laki saya bermain gitar.
Ich lerne gerade Klavier.	Saya sedang belajar piano.
Wir tanzen einmal pro Woche.	Kami menari sekali seminggu.
Sie fotografiert gern in der Natur.	Dia suka memotret di alam.
Welchen Sport machst du?	Olahraga apa yang kamu lakukan?
Ich gehe zweimal pro Woche schwimmen.	Saya berenang dua kali seminggu.
Am Sonntag fahren wir Fahrrad.	Pada hari Minggu kami bersepeda.
Er trainiert im Fitnessstudio.	Dia berlatih di pusat kebugaran.
Unsere Mannschaft spielt heute.	Tim kami bermain hari ini.
Wer hat das Spiel gewonnen?	Siapa yang memenangkan pertandingan?
Gehen wir im Park spazieren?	Apakah kita berjalan-jalan di taman?
Bei gutem Wetter machen wir ein Picknick.	Saat cuaca baik kami berpiknik.
Am Wochenende wandern wir am See.	Pada akhir pekan kami mendaki santai di dekat danau.
Ich bleibe heute lieber zu Hause.	Hari ini saya lebih suka tinggal di rumah.
Bist du heute Abend frei?	Apakah kamu senggang malam ini?
Möchtest du mit ins Kino kommen?	Apakah kamu ingin ikut ke bioskop?
Kommst du zu meiner Party?	Apakah kamu datang ke pesta saya?
Ich lade dich zu meinem Geburtstag ein.	Saya mengundangmu ke ulang tahun saya.
Wollen wir zusammen etwas machen?	Apakah kita ingin melakukan sesuatu bersama?
Wie wäre es mit einem Spaziergang?	Bagaimana jika kita berjalan santai?
Lass uns ins Schwimmbad gehen.	Mari kita pergi ke kolam renang.
Treffen wir uns vor dem Kino.	Mari bertemu di depan bioskop.
Wann passt es dir?	Kapan waktunya cocok untukmu?
Passt dir Samstag um drei?	Apakah Sabtu pukul tiga cocok untukmu?
Ja, sehr gern.	Ya, dengan senang hati.
Das klingt gut.	Itu terdengar bagus.
Gern, ich komme mit.	Dengan senang hati, saya ikut.
Leider habe ich keine Zeit.	Sayangnya saya tidak punya waktu.
Am Samstag kann ich nicht.	Pada hari Sabtu saya tidak bisa.
Vielleicht klappt es am Sonntag.	Mungkin hari Minggu bisa.
Können wir uns später treffen?	Bisakah kita bertemu lebih lambat?
Ich komme eine halbe Stunde später.	Saya datang setengah jam lebih lambat.
Ruf mich bitte vorher an.	Tolong telepon saya sebelumnya.
Ich schicke dir die Adresse.	Saya mengirimkan alamatnya kepadamu.
Wo findet das Konzert statt?	Di mana konsernya berlangsung?
Wann beginnt die Vorstellung?	Kapan pertunjukannya dimulai?
Wie lange dauert der Film?	Berapa lama filmnya berlangsung?
Was kostet der Eintritt?	Berapa harga tiket masuk?
Ich kaufe die Karten online.	Saya membeli tiketnya secara daring.
Sind noch Plätze frei?	Apakah masih ada tempat kosong?
Der Film gefällt mir sehr.	Saya sangat menyukai filmnya.
Die Musik ist mir zu laut.	Musiknya terlalu keras bagi saya.
Welche Sendung siehst du gern?	Acara apa yang suka kamu tonton?
Ich lese gerade einen Roman.	Saya sedang membaca sebuah novel.
Kann ich das Buch ausleihen?	Bisakah saya meminjam buku itu?
Wann öffnet die Bibliothek?	Kapan perpustakaan buka?
Spielst du gern Computerspiele?	Apakah kamu suka bermain permainan komputer?
Wir spielen heute ein Brettspiel.	Hari ini kami bermain permainan papan.
Bring bitte deine Kamera mit.	Tolong bawa kameramu.
Ich zeige dir später die Fotos.	Saya menunjukkan foto-fotonya nanti kepadamu.
Vielen Dank, dass du mich einlädst.	Terima kasih banyak karena kamu mengundang saya.
Es war ein schöner Abend.	Itu malam yang menyenangkan.
Wir hatten viel Spaß.	Kami sangat bersenang-senang.
Bis zum nächsten Wochenende!	Sampai akhir pekan berikutnya!
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-kata-transportasi-layanan', name: 'Jerman A1 · Kata Transportasi & Layanan Kota', summary: 'Kendaraan, stasiun, arah, penginapan, pos, bank, polisi, dan bantuan umum.', description: 'Kosakata A1 untuk bergerak di kota, melakukan perjalanan sederhana, dan memakai layanan publik dasar.', level: 'pemula', category: 'perjalanan', color: '#477485', featured: true,
    entries: rows('word', 'a1-kota', `
der Bus, die Busse	bus
die Straßenbahn, die Straßenbahnen	trem
die U-Bahn, die U-Bahnen	kereta bawah tanah
die S-Bahn, die S-Bahnen	kereta komuter
der Zug, die Züge	kereta api
das Taxi, die Taxis	taksi
das Auto, die Autos	mobil
das Motorrad, die Motorräder	sepeda motor
das Flugzeug, die Flugzeuge	pesawat
das Schiff, die Schiffe	kapal
der Busbahnhof, die Busbahnhöfe	terminal bus
der Taxistand, die Taxistände	pangkalan taksi
der Flughafen, die Flughäfen	bandara
der Hafen, die Häfen	pelabuhan
die Wochenkarte, die Wochenkarten	tiket mingguan
der Fahrschein, die Fahrscheine	karcis perjalanan
der Schalter, die Schalter	loket
die Information, die Informationen	pusat informasi
der Abfahrtsort, die Abfahrtsorte	tempat keberangkatan
die Ankunftszeit, die Ankunftszeiten	waktu kedatangan
die Reise, die Reisen	perjalanan
das Ziel, die Ziele	tujuan
der Weg, die Wege	jalan atau rute
die Richtung, die Richtungen	arah
die Kreuzung, die Kreuzungen	persimpangan
die Ampel, die Ampeln	lampu lalu lintas
die Brücke, die Brücken	jembatan
die Straße, die Straßen	jalan raya
der Platz, die Plätze	lapangan atau tempat
die Ecke, die Ecken	sudut jalan
nördlich	sebelah utara
südlich	sebelah selatan
gegenüber	berseberangan
nah	dekat
weit	jauh
das Hotel, die Hotels	hotel
die Pension, die Pensionen	penginapan kecil
der Zeltplatz, die Zeltplätze	tempat berkemah
der Gast, die Gäste	tamu
der Zimmerschlüssel, die Zimmerschlüssel	kunci kamar
die Post	kantor pos
der Brief, die Briefe	surat
die Postkarte, die Postkarten	kartu pos
die Briefmarke, die Briefmarken	perangko
das Päckchen, die Päckchen	paket kecil
die Bank, die Banken	bank
das Kleingeld	uang receh
die Polizei	polisi
der Notruf, die Notrufe	panggilan darurat
das Fundbüro, die Fundbüros	kantor barang hilang
einsteigen	naik kendaraan
losfahren	mulai berangkat
weiterfahren	melanjutkan perjalanan
zurückfahren	melakukan perjalanan pulang
überqueren	menyeberangi
folgen	mengikuti
mitfahren	ikut naik kendaraan
schicken	mengirim
verlieren	kehilangan
abgeben	menyerahkan
`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-perjalanan-bantuan', name: 'Jerman A1 · Frasa Perjalanan & Meminta Bantuan', summary: 'Ungkapan untuk membeli tiket, bertanya arah, naik kendaraan, menginap, mengirim surat, dan mencari bantuan.', description: 'Frasa A1 untuk perjalanan dan layanan kota yang konkret, singkat, dan sesuai kebutuhan komunikasi dasar.', level: 'pemula', category: 'perjalanan', color: '#548699', featured: true,
    entries: rows('phrase', 'a1-perjalanan', `
Wo ist der Bahnhof?	Di mana stasiun kereta?
Wie komme ich zum Flughafen?	Bagaimana saya pergi ke bandara?
Ist die Haltestelle weit von hier?	Apakah haltenya jauh dari sini?
Gehen Sie immer geradeaus.	Berjalanlah terus lurus.
Dann biegen Sie links ab.	Kemudian belok ke kiri.
Die Bank ist an der nächsten Ecke.	Bank berada di sudut berikutnya.
Gehen Sie über die Brücke.	Berjalanlah melewati jembatan.
Das Hotel liegt gegenüber der Post.	Hotel terletak di seberang kantor pos.
Können Sie mir den Weg zeigen?	Bisakah Anda menunjukkan jalannya kepada saya?
Ich habe mich verlaufen.	Saya tersesat saat berjalan kaki.
Eine Fahrkarte nach Köln, bitte.	Satu tiket ke Köln, tolong.
Hin und zurück, bitte.	Pergi-pulang, tolong.
Nur eine einfache Fahrt.	Hanya satu kali perjalanan.
Was kostet die Fahrkarte?	Berapa harga tiket perjalanannya?
Wann fährt der nächste Zug?	Kapan kereta berikutnya berangkat?
Von welchem Bahnsteig fährt er ab?	Kereta itu berangkat dari peron mana?
Fährt dieser Bus zum Zentrum?	Apakah bus ini menuju pusat kota?
Muss ich einmal umsteigen?	Apakah saya harus berganti kendaraan satu kali?
Wo muss ich aussteigen?	Di mana saya harus turun?
Sagen Sie mir bitte Bescheid.	Tolong beri tahu saya nanti.
Der Zug kommt um zehn Uhr an.	Kereta tiba pukul sepuluh.
Der Bus fährt alle zwanzig Minuten.	Bus berangkat setiap dua puluh menit.
Der Zug hat zehn Minuten Verspätung.	Kereta terlambat sepuluh menit.
Heute fährt keine Straßenbahn.	Hari ini tidak ada trem yang beroperasi.
Nehmen wir lieber ein Taxi.	Lebih baik kita naik taksi.
Bitte fahren Sie zu dieser Adresse.	Tolong antar saya ke alamat ini.
Wie lange dauert die Fahrt?	Berapa lama perjalanannya?
Halten Sie bitte hier.	Tolong berhenti di sini.
Ich hole dich am Bahnhof ab.	Saya menjemputmu di stasiun.
Wir treffen uns am Eingang.	Kita bertemu di pintu masuk.
Ich möchte ein Zimmer reservieren.	Saya ingin memesan sebuah kamar.
Haben Sie ein Zimmer frei?	Apakah Anda memiliki kamar kosong?
Ein Einzelzimmer für eine Nacht, bitte.	Satu kamar tunggal untuk satu malam, tolong.
Was kostet das Zimmer pro Nacht?	Berapa harga kamarnya per malam?
Ist das Frühstück dabei?	Apakah sarapan sudah termasuk?
Kann ich das Zimmer sehen?	Bisakah saya melihat kamarnya?
Wo ist mein Zimmer?	Di mana kamar saya?
Der Schlüssel passt nicht.	Kuncinya tidak cocok.
Im Bad gibt es kein warmes Wasser.	Tidak ada air hangat di kamar mandi.
Ich reise morgen früh ab.	Saya berangkat besok pagi.
Wo kann ich Briefmarken kaufen?	Di mana saya dapat membeli perangko?
Ich möchte diese Postkarte schicken.	Saya ingin mengirim kartu pos ini.
Wie lange braucht der Brief?	Berapa lama suratnya sampai?
Dieses Päckchen geht nach Indonesien.	Paket kecil ini dikirim ke Indonesia.
Bitte schreiben Sie die Adresse hier.	Tolong tuliskan alamatnya di sini.
Wo ist der nächste Geldautomat?	Di mana ATM terdekat?
Kann ich hier Geld wechseln?	Bisakah saya menukar uang di sini?
Ich habe meine Geldbörse verloren.	Saya kehilangan dompet saya.
Meine Tasche ist weg.	Tas saya hilang.
Rufen Sie bitte die Polizei.	Tolong hubungi polisi.
Ich brauche dringend Hilfe.	Saya sangat membutuhkan bantuan.
Was ist passiert?	Apa yang terjadi?
Ich hatte einen kleinen Unfall.	Saya mengalami kecelakaan kecil.
Mir geht es gut.	Saya baik-baik saja.
Wo ist das nächste Krankenhaus?	Di mana rumah sakit terdekat?
Können Sie bitte langsamer sprechen?	Bisakah Anda berbicara lebih lambat?
Ich spreche nur ein wenig Deutsch.	Saya hanya bisa sedikit bahasa Jerman.
Können Sie das für mich aufschreiben?	Bisakah Anda menuliskannya untuk saya?
Das ist sehr freundlich von Ihnen.	Anda sangat baik hati.
Jetzt finde ich den Weg.	Sekarang saya dapat menemukan jalannya.
`),
  }),
];
