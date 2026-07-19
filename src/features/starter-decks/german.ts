import { curatedGermanDeck, germanEntries } from './german-builder';

const words = (tag: string, rows: string) => germanEntries('word', tag, rows);
const phrases = (tag: string, rows: string) => germanEntries('phrase', tag, rows);
const sentences = (tag: string, rows: string) => germanEntries('sentence', tag, rows);

export const germanStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-a1-kata-inti', name: 'Jerman A1 · Kata Inti', summary: 'Kata benda, kerja, sifat, waktu, tempat, dan kebutuhan dasar.', description: 'Kosakata inti A1 yang dipilih satu per satu untuk percakapan sehari-hari. Kata benda menyertakan artikel dan bentuk jamak bila relevan.', level: 'pemula', category: 'sehari-hari', color: '#315C49', featured: true,
    entries: words('a1-kata', `
der Name, die Namen\tnama
der Vorname, die Vornamen\tnama depan
der Nachname, die Nachnamen\tnama belakang
die Adresse, die Adressen\talamat
die Telefonnummer, die Telefonnummern\tnomor telepon
das Land, die Länder\tnegara
die Stadt, die Städte\tkota
die Sprache, die Sprachen\tbahasa
die Familie, die Familien\tkeluarga
der Freund, die Freunde\tteman laki-laki
die Freundin, die Freundinnen\tteman perempuan
die Eltern\torang tua
der Vater, die Väter\tayah
die Mutter, die Mütter\tibu
der Bruder, die Brüder\tsaudara laki-laki
die Schwester, die Schwestern\tsaudara perempuan
das Kind, die Kinder\tanak
die Wohnung, die Wohnungen\tapartemen
das Zimmer, die Zimmer\tkamar
die Küche, die Küchen\tdapur
das Bad, die Bäder\tkamar mandi
der Schlüssel, die Schlüssel\tkunci
der Bahnhof, die Bahnhöfe\tstasiun kereta
die Haltestelle, die Haltestellen\thalte
die Straße, die Straßen\tjalan
der Supermarkt, die Supermärkte\tsupermarket
die Apotheke, die Apotheken\tapotek
der Arzt, die Ärzte\tdokter laki-laki
die Ärztin, die Ärztinnen\tdokter perempuan
die Arbeit\tpekerjaan
der Beruf, die Berufe\tprofesi
die Schule, die Schulen\tsekolah
der Kurs, die Kurse\tkursus
die Frage, die Fragen\tpertanyaan
die Antwort, die Antworten\tjawaban
das Problem, die Probleme\tmasalah
die Hilfe\tbantuan
das Geld\tuang
der Preis, die Preise\tharga
die Rechnung, die Rechnungen\ttagihan
das Wasser\tair
das Brot, die Brote\troti
das Gemüse\tsayuran
das Obst\tbuah-buahan
der Kaffee\tkopi
die Zeit\twaktu
der Termin, die Termine\tjanji
der Tag, die Tage\thari
die Woche, die Wochen\tminggu
das Wochenende, die Wochenenden\takhir pekan
heute\thari ini
morgen\tbesok
jetzt\tsekarang
später\tnanti
hier\tdi sini
dort\tdi sana
links\tkiri
rechts\tkanan
geradeaus\tlurus
kommen\tdatang
gehen\tpergi berjalan kaki
fahren\tpergi dengan kendaraan
wohnen\ttinggal
arbeiten\tbekerja
lernen\tbelajar
sprechen\tberbicara
verstehen\tmengerti
fragen\tbertanya
antworten\tmenjawab
brauchen\tmembutuhkan
suchen\tmencari
finden\tmenemukan
kaufen\tmembeli
bezahlen\tmembayar
essen\tmakan
trinken\tminum
helfen\tmembantu
warten\tmenunggu
öffnen\tmembuka
schließen\tmenutup
gut\tbaik
schlecht\tburuk
klein\tkecil
groß\tbesar
neu\tbaru
alt\ttua atau lama
teuer\tmahal
billig\tmurah
frei\tluang atau kosong
krank\tsakit
müde\tlelah
hungrig\tlapar
durstig\thaus
wichtig\tpenting
richtig\tbenar
falsch\tsalah`),
  }),
  curatedGermanDeck({
    id: 'de-id-a1-frasa-sehari-hari', name: 'Jerman A1 · Frasa Sehari-hari', summary: 'Sapaan, perkenalan, meminta bantuan, belanja, arah, dan interaksi sopan.', description: 'Frasa pendek A1 yang benar-benar dapat diucapkan sebagai satu unit dalam situasi sehari-hari.', level: 'pemula', category: 'sehari-hari', color: '#58764C', featured: true,
    entries: phrases('a1-frasa', `
Guten Morgen!\tSelamat pagi!
Guten Tag!\tSelamat siang!
Guten Abend!\tSelamat malam!
Gute Nacht!\tSelamat tidur!
Hallo!\tHalo!
Tschüss!\tDadah!
Auf Wiedersehen!\tSampai jumpa!
Bis bald!\tSampai segera!
Bis morgen!\tSampai besok!
Wie geht's?\tApa kabar?
Sehr gut, danke.\tSangat baik, terima kasih.
Nicht so gut.\tTidak begitu baik.
Und dir?\tKalau kamu?
Und Ihnen?\tKalau Anda?
Danke schön!\tTerima kasih banyak!
Vielen Dank!\tTerima kasih banyak!
Bitte schön!\tSama-sama!
Keine Ursache.\tTidak masalah.
Entschuldigung!\tPermisi atau maaf!
Es tut mir leid.\tSaya minta maaf.
Kein Problem.\tTidak masalah.
Alles klar.\tBaik, sudah jelas.
Natürlich.\tTentu saja.
Vielleicht später.\tMungkin nanti.
Einen Moment, bitte.\tTunggu sebentar.
Noch einmal, bitte.\tSekali lagi, tolong.
Langsamer, bitte.\tLebih pelan, tolong.
Lauter, bitte.\tLebih keras, tolong.
Was bedeutet das?\tApa artinya itu?
Wie sagt man das auf Deutsch?\tBagaimana mengatakan itu dalam bahasa Jerman?
Wie schreibt man das?\tBagaimana menulisnya?
Ich weiß nicht.\tSaya tidak tahu.
Ich verstehe.\tSaya mengerti.
Ich verstehe nicht.\tSaya tidak mengerti.
Ich bin dran.\tGiliran saya.
Wie bitte?\tMaaf, apa?
Ach so!\tOh, begitu!
Achtung!\tHati-hati!
Viel Spaß!\tSelamat bersenang-senang!
Viel Glück!\tSemoga beruntung!
Alles Gute!\tSemoga sukses!
Gute Besserung!\tSemoga lekas sembuh!
Herzlichen Glückwunsch!\tSelamat!
Willkommen!\tSelamat datang!
Ich heiße …\tNama saya …
Mein Name ist …\tNama saya …
Freut mich.\tSenang berkenalan.
Woher kommst du?\tKamu berasal dari mana?
Aus Indonesien.\tDari Indonesia.
Ich wohne in …\tSaya tinggal di …
Ich spreche ein bisschen Deutsch.\tSaya berbicara sedikit bahasa Jerman.
Was machst du beruflich?\tApa pekerjaanmu?
Ich bin Student.\tSaya mahasiswa.
Ich bin Studentin.\tSaya mahasiswi.
Keine Ahnung.\tTidak tahu.
Was ist los?\tAda apa?
Was brauchst du?\tApa yang kamu butuhkan?
Kannst du mir helfen?\tBisakah kamu membantu saya?
Können Sie mir helfen?\tBisakah Anda membantu saya?
Mit Karte, bitte.\tDengan kartu, tolong.
Bar, bitte.\tTunai, tolong.
Die Rechnung, bitte.\tTagihannya, tolong.
Zum Mitnehmen, bitte.\tUntuk dibawa pulang.
Für hier, bitte.\tUntuk makan di sini.
Ohne Zucker, bitte.\tTanpa gula, tolong.
Ein Wasser, bitte.\tSatu air, tolong.
Wie viel kostet das?\tBerapa harganya?
Das ist zu teuer.\tItu terlalu mahal.
Ich nehme das.\tSaya ambil itu.
Sonst noch etwas?\tAda lagi?
Das war's.\tItu saja.
Wo ist die Toilette?\tDi mana toiletnya?
Wo ist der Bahnhof?\tDi mana stasiunnya?
Immer geradeaus.\tTerus lurus.
Nach links.\tKe kiri.
Nach rechts.\tKe kanan.
An der Ecke.\tDi sudut.
In der Nähe.\tDi dekat sini.
Wie spät ist es?\tJam berapa sekarang?
Um acht Uhr.\tPukul delapan.
Heute Abend.\tMalam ini.
Morgen früh.\tBesok pagi.
Am Wochenende.\tPada akhir pekan.
Bis später.\tSampai nanti.
Ich habe Zeit.\tSaya punya waktu.
Ich habe keine Zeit.\tSaya tidak punya waktu.
Einen schönen Tag noch!\tSemoga harimu menyenangkan!
Schönes Wochenende!\tSelamat berakhir pekan!
Mach's gut!\tJaga diri!
Keine Sorge.\tJangan khawatir.
Gern geschehen.\tDengan senang hati.
Das stimmt.\tItu benar.
Das stimmt nicht.\tItu tidak benar.
Ich auch.\tSaya juga.
Ich nicht.\tSaya tidak.
Warum nicht?\tKenapa tidak?
Sehr gern.\tDengan senang hati.
Lieber nicht.\tSebaiknya tidak.`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-kata-dan-frasa', name: 'Jerman A2 · Kata & Frasa Praktis', summary: 'Rutinitas, layanan, kesehatan, perjalanan, sekolah, dan pergaulan.', description: 'Kosakata dan frasa A2 yang berguna untuk menangani situasi nyata dan menceritakan pengalaman sederhana.', level: 'pemula', category: 'sehari-hari', color: '#775C8A', featured: true,
    entries: [
      ...words('a2-kata', `
der Alltag\tkeseharian
die Gewohnheit, die Gewohnheiten\tkebiasaan
der Wecker, die Wecker\tjam alarm
die Verabredung, die Verabredungen\tjanji bertemu
die Verspätung, die Verspätungen\tketerlambatan
die Änderung, die Änderungen\tperubahan
die Freizeit\twaktu luang
die Einladung, die Einladungen\tundangan
die Veranstaltung, die Veranstaltungen\tacara
der Verein, die Vereine\tperkumpulan
die Kleidung\tpakaian
die Größe, die Größen\tukuran
die Umkleidekabine, die Umkleidekabinen\tkamar pas
der Kassenbon, die Kassenbons\tstruk belanja
der Umtausch\tpenukaran barang
die Garantie, die Garantien\tgaransi
der Kundendienst\tlayanan pelanggan
das Konto, die Konten\trekening bank
die Erkältung, die Erkältungen\tpilek
der Husten\tbatuk
die Tablette, die Tabletten\ttablet obat
die Krankmeldung, die Krankmeldungen\tsurat sakit
die Ernährung\tpola makan
die Ausbildung, die Ausbildungen\tpendidikan kejuruan
das Praktikum, die Praktika\tmagang
die Abteilung, die Abteilungen\tdepartemen
die Schicht, die Schichten\tgiliran kerja
die Datei, die Dateien\tberkas digital
die Erfahrung, die Erfahrungen\tpengalaman
die Fahrkarte, die Fahrkarten\ttiket perjalanan
die Unterkunft, die Unterkünfte\takomodasi
die Reservierung, die Reservierungen\treservasi
die Sehenswürdigkeit, die Sehenswürdigkeiten\ttempat wisata
die Verbindung, die Verbindungen\tsambungan transportasi
sich beeilen\tbergegas
verschieben\tmenunda
absagen\tmembatalkan
sich ausruhen\tberistirahat
sich erinnern\tmengingat
anprobieren\tmencoba pakaian
umtauschen\tmenukar barang
zurückgeben\tmengembalikan barang
abholen\tmengambil
überweisen\tmentransfer uang
einnehmen\tmengonsumsi obat
sich erholen\tpulih
vermeiden\tmenghindari
sich anmelden\tmendaftar
sich bewerben\tmelamar
bestehen\tlulus
speichern\tmenyimpan
umsteigen\tberganti kendaraan
reservieren\tmemesan tempat
aussteigen\tturun dari kendaraan
pünktlich\ttepat waktu
bequem\tnyaman
kaputt\trusak
verfügbar\ttersedia
besetzt\tterisi atau sibuk
zufrieden\tpuas
enttäuscht\tkecewa
plötzlich\ttiba-tiba
normalerweise\tbiasanya
wahrscheinlich\tkemungkinan besar
leider\tsayangnya`),
      ...phrases('a2-frasa', `
Das passt gut.\tItu pas.
Das ist mir zu groß.\tItu terlalu besar untuk saya.
Haben Sie das in Größe M?\tApakah ada ukuran M?
Kann ich das anprobieren?\tBolehkah saya mencobanya?
Ich möchte das umtauschen.\tSaya ingin menukar ini.
Der Reißverschluss ist kaputt.\tRitsletingnya rusak.
Ich habe den Kassenbon dabei.\tSaya membawa struknya.
Wann kann ich es abholen?\tKapan saya bisa mengambilnya?
Mein Paket ist noch nicht da.\tPaket saya belum tiba.
Ich möchte Geld überweisen.\tSaya ingin mentransfer uang.
Mein Rücken tut weh.\tPunggung saya sakit.
Ich habe seit gestern Fieber.\tSaya demam sejak kemarin.
Ich brauche einen Termin.\tSaya perlu membuat janji.
Wie oft soll ich das einnehmen?\tSeberapa sering saya harus meminumnya?
Ich bin gegen Penicillin allergisch.\tSaya alergi terhadap penisilin.
Ich brauche eine Krankmeldung.\tSaya membutuhkan surat sakit.
Die Schmerzen sind schon schwächer.\tRasa sakitnya sudah berkurang.
Der Termin passt mir nicht.\tWaktu janjinya tidak cocok bagi saya.
Können wir den Termin verschieben?\tBisakah kita memindahkan jadwal?
Ich komme etwas später.\tSaya akan datang sedikit terlambat.
Es dauert ungefähr eine Stunde.\tItu memakan waktu sekitar satu jam.
Ich habe es vergessen.\tSaya melupakannya.
Denk bitte daran.\tTolong ingat itu.
Was hast du am Wochenende vor?\tApa rencanamu akhir pekan ini?
Hast du Lust mitzukommen?\tMau ikut?
Danke für die Einladung.\tTerima kasih atas undangannya.
Ich bin leider schon verabredet.\tSayangnya saya sudah punya janji.
Das klingt interessant.\tKedengarannya menarik.
Mir hat der Film gut gefallen.\tSaya sangat menyukai filmnya.
Ich interessiere mich für Musik.\tSaya tertarik pada musik.
Ich mache gerade ein Praktikum.\tSaya sedang magang.
Ich arbeite in der Frühschicht.\tSaya bekerja pada sif pagi.
An wen soll ich mich wenden?\tSaya harus menghubungi siapa?
Können Sie mir das erklären?\tBisakah Anda menjelaskannya kepada saya?
Ich schicke Ihnen die Datei.\tSaya akan mengirimkan berkasnya kepada Anda.
Die Prüfung ist gut gelaufen.\tUjiannya berjalan lancar.
Ich habe die Prüfung bestanden.\tSaya lulus ujian.
Wo muss ich umsteigen?\tDi mana saya harus berganti kendaraan?
Hat der Zug Verspätung?\tApakah keretanya terlambat?
Eine Hin- und Rückfahrt, bitte.\tSatu tiket pulang-pergi, tolong.
Ist Frühstück inklusive?\tApakah sarapan sudah termasuk?
Ich habe auf den Namen … reserviert.\tSaya memesan atas nama …
Können Sie ein Taxi rufen?\tBisakah Anda memanggil taksi?
Gibt es WLAN?\tApakah ada Wi-Fi?
Das funktioniert leider nicht.\tSayangnya ini tidak berfungsi.
Könnten Sie das überprüfen?\tBisakah Anda memeriksanya?
Ich bin damit zufrieden.\tSaya puas dengan itu.
Das habe ich anders verstanden.\tSaya memahaminya secara berbeda.
Wie lange dauert das?\tBerapa lama itu berlangsung?
Was würden Sie empfehlen?\tApa yang Anda rekomendasikan?
Es kommt darauf an.\tItu tergantung.
Im Moment geht es nicht.\tSaat ini tidak bisa.
Kein Stress.\tTidak perlu terburu-buru.
Das ist eine gute Idee.\tItu ide yang bagus.
Ich melde mich später.\tSaya akan menghubungi nanti.
Vielen Dank im Voraus.\tTerima kasih sebelumnya.
Mit freundlichen Grüßen\tHormat saya
Liebe Grüße\tSalam hangat
Bis nächste Woche.\tSampai minggu depan.
Gute Fahrt!\tSelamat jalan!`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-dan-frasa', name: 'Jerman B1 · Kata & Frasa Praktis', summary: 'Kerja, studi, layanan, media, opini, dan pemecahan masalah.', description: 'Kosakata dan frasa B1 untuk menjelaskan masalah, menyampaikan pendapat, dan berkomunikasi lebih mandiri.', level: 'menengah', category: 'kerja', color: '#3E5F74',
    entries: [
      ...words('b1-kata', `
die Bewerbung, die Bewerbungen\tlamaran kerja
der Lebenslauf, die Lebensläufe\triwayat hidup
das Vorstellungsgespräch, die Vorstellungsgespräche\twawancara kerja
die Frist, die Fristen\ttenggat
die Besprechung, die Besprechungen\trapat
die Aufgabe, die Aufgaben\ttugas
die Voraussetzung, die Voraussetzungen\tprasyarat
die Rückmeldung, die Rückmeldungen\tumpan balik
die Lösung, die Lösungen\tsolusi
die Beschwerde, die Beschwerden\tkeluhan resmi
der Antrag, die Anträge\tpermohonan resmi
die Behörde, die Behörden\tinstansi pemerintah
die Versicherung, die Versicherungen\tasuransi
die Untersuchung, die Untersuchungen\tpemeriksaan
die Behandlung, die Behandlungen\tperawatan
die Beziehung, die Beziehungen\thubungan
die Gemeinschaft, die Gemeinschaften\tkomunitas
die Meinung, die Meinungen\tpendapat
das Argument, die Argumente\targumen
der Beitrag, die Beiträge\tkontribusi atau unggahan
die Nachricht, die Nachrichten\tberita atau pesan
die Quelle, die Quellen\tsumber
das Gerücht, die Gerüchte\trumor
der Datenschutz\tperlindungan data
die Umwelt\tlingkungan
die Verantwortung\ttanggung jawab
einstellen\tmerekrut
vereinbaren\tmenyepakati
teilnehmen\tberpartisipasi
vorbereiten\tmempersiapkan
beantragen\tmengajukan permohonan
ausfüllen\tmengisi formulir
unterschreiben\tmenandatangani
reklamieren\tmengajukan keluhan
behandeln\tmengobati
sich kümmern um\tmengurus
zustimmen\tmenyetujui
widersprechen\tmenyangkal
begründen\tmemberi alasan
berichten\tmelaporkan
veröffentlichen\tmenerbitkan
vergleichen\tmembandingkan
vorbeugen\tmencegah secara dini
verbessern\tmeningkatkan
unterstützen\tmendukung
sich entscheiden\tmemutuskan
zuverlässig\tdapat diandalkan
selbstständig\tmandiri
verantwortlich\tbertanggung jawab
überzeugend\tmeyakinkan
unterschiedlich\tberbeda
notwendig\tdiperlukan
möglich\tmungkin
tatsächlich\tsebenarnya
trotzdem\tmeskipun demikian
allerdings\tnamun
außerdem\tselain itu
während\tsementara
sobald\tsegera setelah`),
      ...phrases('b1-frasa', `
Ich bewerbe mich um die Stelle.\tSaya melamar posisi tersebut.
Im Anhang finden Sie meinen Lebenslauf.\tTerlampir Anda dapat menemukan riwayat hidup saya.
Wann wäre ein Gespräch möglich?\tKapan wawancara dapat dilakukan?
Ich habe bereits Erfahrung in diesem Bereich.\tSaya sudah memiliki pengalaman di bidang ini.
Dafür bin ich verantwortlich.\tSaya bertanggung jawab untuk itu.
Die Frist endet am Freitag.\tTenggatnya berakhir hari Jumat.
Wir sollten die Aufgaben verteilen.\tKita sebaiknya membagi tugas.
Ich gebe Ihnen morgen Bescheid.\tSaya akan memberi kabar besok.
Könnten Sie mir eine Rückmeldung geben?\tBisakah Anda memberi saya umpan balik?
Ich bin mit dem Vorschlag einverstanden.\tSaya setuju dengan usulan itu.
Ich sehe das etwas anders.\tSaya melihatnya sedikit berbeda.
Meiner Meinung nach …\tMenurut pendapat saya …
Das hängt davon ab, ob …\tItu bergantung pada apakah …
Dafür spricht, dass …\tHal yang mendukungnya adalah …
Dagegen spricht, dass …\tHal yang menentangnya adalah …
Einerseits …, andererseits …\tDi satu sisi …, di sisi lain …
Das kann ich gut nachvollziehen.\tSaya bisa memahami itu dengan baik.
Da bin ich mir nicht sicher.\tSaya tidak yakin tentang itu.
Können Sie das genauer erklären?\tBisakah Anda menjelaskannya lebih rinci?
Wenn ich Sie richtig verstanden habe, …\tJika saya memahami Anda dengan benar, …
Was genau meinen Sie damit?\tApa tepatnya yang Anda maksud?
Das Problem besteht darin, dass …\tMasalahnya adalah bahwa …
Wir müssen eine Lösung finden.\tKita harus menemukan solusi.
Es wäre besser, wenn …\tAkan lebih baik jika …
Ich schlage vor, dass …\tSaya mengusulkan agar …
Das lässt sich organisieren.\tItu bisa diatur.
Leider ist dabei ein Fehler passiert.\tSayangnya terjadi kesalahan.
Ich möchte mich darüber beschweren.\tSaya ingin mengajukan keluhan tentang itu.
Könnten Sie den Betrag erstatten?\tBisakah Anda mengembalikan dananya?
Bitte bestätigen Sie den Eingang.\tMohon konfirmasi penerimaannya.
Welche Unterlagen brauche ich?\tDokumen apa yang saya perlukan?
Wo kann ich den Antrag stellen?\tDi mana saya dapat mengajukan permohonan?
Das Formular muss unterschrieben werden.\tFormulir itu harus ditandatangani.
Ich kümmere mich darum.\tSaya akan mengurusnya.
Ich habe seit mehreren Tagen Beschwerden.\tSaya mengalami keluhan selama beberapa hari.
Die Schmerzen werden stärker.\tRasa sakitnya semakin kuat.
Gibt es mögliche Nebenwirkungen?\tApakah ada efek samping yang mungkin?
Ich bin gesetzlich versichert.\tSaya memiliki asuransi kesehatan publik.
Könnten Sie mir eine Überweisung ausstellen?\tBisakah Anda membuatkan surat rujukan?
Die Behandlung hat gut geholfen.\tPerawatannya sangat membantu.
Hast du davon gehört?\tApakah kamu sudah mendengarnya?
Woher stammt diese Information?\tDari mana informasi ini berasal?
Ich halte die Quelle für zuverlässig.\tSaya menganggap sumber itu dapat dipercaya.
Das ist nur ein Gerücht.\tItu hanya rumor.
Der Artikel berichtet über …\tArtikel itu melaporkan tentang …
Der Beitrag wurde gestern veröffentlicht.\tUnggahan itu diterbitkan kemarin.
Man sollte persönliche Daten schützen.\tOrang sebaiknya melindungi data pribadi.
Das Thema betrifft uns alle.\tTopik itu menyangkut kita semua.
Ich habe mich dafür entschieden.\tSaya sudah memutuskan memilih itu.
Trotzdem möchte ich es versuchen.\tMeskipun begitu saya ingin mencobanya.
Außerdem spart das Zeit.\tSelain itu, hal tersebut menghemat waktu.
Im Vergleich dazu …\tSebagai perbandingan …
Der Vorteil besteht darin, dass …\tKeuntungannya adalah bahwa …
Der Nachteil ist, dass …\tKerugiannya adalah bahwa …
Unter diesen Umständen …\tDalam keadaan ini …
Soweit ich weiß, …\tSejauh yang saya tahu …
Im Großen und Ganzen …\tSecara keseluruhan …
Das kommt für mich nicht infrage.\tItu bukan pilihan bagi saya.
Ich würde gern darauf zurückkommen.\tSaya ingin kembali membahas hal itu.
Vielen Dank für Ihr Verständnis.\tTerima kasih atas pengertian Anda.`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-c1-kata-dan-frasa', name: 'Jerman C1 · Kata & Frasa Akademik', summary: 'Argumen bernuansa, analisis, riset, negosiasi, dan komunikasi formal.', description: 'Leksikon dan frasa C1 yang dapat digunakan dalam tulisan akademik, presentasi, rapat, dan diskusi kebijakan.', level: 'lanjutan', category: 'kerja', color: '#44526F',
    entries: [
      ...words('c1-kata', `
die Annahme, die Annahmen\tasumsi
die Erkenntnis, die Erkenntnisse\ttemuan atau wawasan
der Nachweis, die Nachweise\tbukti
der Datensatz, die Datensätze\tkumpulan data
die Auswertung, die Auswertungen\tevaluasi data
die Methodik, die Methodiken\tmetodologi
die Fragestellung, die Fragestellungen\trumusan masalah
der Forschungsstand\tkeadaan penelitian terkini
die Einschränkung, die Einschränkungen\tketerbatasan
die Schlussfolgerung, die Schlussfolgerungen\tkesimpulan
die Auswirkung, die Auswirkungen\tdampak
der Zusammenhang, die Zusammenhänge\tketerkaitan
der Standpunkt, die Standpunkte\tsudut pandang
die Maßnahme, die Maßnahmen\tlangkah kebijakan
die Rahmenbedingung, die Rahmenbedingungen\tkondisi kerangka
die Umsetzung, die Umsetzungen\timplementasi
die Anforderung, die Anforderungen\tpersyaratan
die Zuständigkeit, die Zuständigkeiten\twewenang
die Vereinbarung, die Vereinbarungen\tkesepakatan
die Verhandlung, die Verhandlungen\tnegosiasi
die Ungleichheit, die Ungleichheiten\tketimpangan
die Gerechtigkeit\tkeadilan
die Nachhaltigkeit\tkeberlanjutan
die Wechselwirkung, die Wechselwirkungen\tinteraksi timbal balik
die Tragweite\tcakupan dampak
analysieren\tmenganalisis
auswerten\tmengevaluasi data
nachweisen\tmembuktikan
ableiten\tmenurunkan kesimpulan
berücksichtigen\tmempertimbangkan
hinterfragen\tmempertanyakan secara kritis
einordnen\tmenempatkan dalam konteks
hervorheben\tmenyoroti
widerlegen\tmembantah
veranschaulichen\tmengilustrasikan
voraussetzen\tmensyaratkan
gewährleisten\tmenjamin
beeinträchtigen\tmengganggu
abstimmen\tmenyelaraskan
umsetzen\tmengimplementasikan
priorisieren\tmemprioritaskan
nachvollziehbar\tdapat dipahami
maßgeblich\tsangat menentukan
umstritten\tkontroversial
weitreichend\tberdampak luas
unerlässlich\tsangat diperlukan
verhältnismäßig\tproporsional
widersprüchlich\tkontradiktif
aussagekräftig\tinformatif dan bermakna
differenziert\tbernuansa
insofern\tdalam hal itu
folglich\takibatnya
gleichwohl\tnamun demikian
hingegen\tsebaliknya
wenngleich\tmeskipun
hinsichtlich\tberkenaan dengan
angesichts\tmengingat atau menghadapi
unterdessen\tsementara itu
weitgehend\tsebagian besar
grundsätzlich\tpada prinsipnya
gegebenenfalls\tjika diperlukan
zweifellos\ttanpa diragukan
keineswegs\tsama sekali tidak`),
      ...phrases('c1-frasa', `
Aus meiner Sicht greift diese Erklärung zu kurz.\tMenurut saya penjelasan ini terlalu menyederhanakan masalah.
Dabei ist zu berücksichtigen, dass …\tDalam hal ini perlu dipertimbangkan bahwa …
Es lässt sich nicht ausschließen, dass …\tTidak dapat dikesampingkan bahwa …
Daraus lässt sich ableiten, dass …\tDari situ dapat disimpulkan bahwa …
Die Ergebnisse deuten darauf hin, dass …\tHasilnya menunjukkan bahwa …
Diese Annahme bedarf einer genaueren Prüfung.\tAsumsi ini memerlukan pemeriksaan lebih rinci.
Die Daten sind nur bedingt aussagekräftig.\tData tersebut hanya informatif secara terbatas.
Ein unmittelbarer Zusammenhang ist nicht nachweisbar.\tKeterkaitan langsung tidak dapat dibuktikan.
Die Studie weist mehrere Einschränkungen auf.\tStudi tersebut memiliki beberapa keterbatasan.
Der aktuelle Forschungsstand legt nahe, dass …\tKeadaan penelitian terkini mengindikasikan bahwa …
Im Rahmen dieser Untersuchung …\tDalam lingkup penelitian ini …
Unter Berücksichtigung der genannten Faktoren …\tDengan mempertimbangkan faktor-faktor yang disebutkan …
Im Gegensatz zu früheren Untersuchungen …\tBerbeda dengan penelitian sebelumnya …
Dies steht im Einklang mit …\tHal ini sejalan dengan …
Dies widerspricht der Annahme, dass …\tHal ini bertentangan dengan asumsi bahwa …
Eine mögliche Erklärung hierfür wäre …\tSalah satu penjelasan yang mungkin adalah …
Diese Frage kann nicht abschließend beantwortet werden.\tPertanyaan ini belum dapat dijawab secara tuntas.
Weitere Forschung ist erforderlich.\tPenelitian lebih lanjut diperlukan.
Zusammenfassend lässt sich festhalten, dass …\tSebagai rangkuman dapat dinyatakan bahwa …
Daraus ergeben sich weitreichende Folgen.\tDari situ timbul konsekuensi yang luas.
Die Maßnahme ist grundsätzlich zu begrüßen.\tLangkah tersebut pada prinsipnya patut disambut baik.
Entscheidend ist jedoch, wie sie umgesetzt wird.\tNamun yang menentukan adalah bagaimana hal itu diterapkan.
Die langfristigen Auswirkungen bleiben abzuwarten.\tDampak jangka panjangnya masih harus ditunggu.
Es besteht dringender Handlungsbedarf.\tAda kebutuhan mendesak untuk bertindak.
Die vorgeschlagene Lösung ist nicht verhältnismäßig.\tSolusi yang diusulkan tidak proporsional.
Die Verantwortung lässt sich nicht einseitig zuweisen.\tTanggung jawab tidak dapat dibebankan secara sepihak.
Hier treffen unterschiedliche Interessen aufeinander.\tDi sini berbagai kepentingan saling berhadapan.
Der Einwand ist durchaus berechtigt.\tKeberatan tersebut cukup beralasan.
Dieses Argument überzeugt nur teilweise.\tArgumen ini hanya meyakinkan sebagian.
Das Beispiel veranschaulicht die Problematik.\tContoh itu menggambarkan permasalahannya.
Ich möchte diesen Punkt besonders hervorheben.\tSaya ingin menyoroti poin ini secara khusus.
Lassen Sie mich kurz darauf eingehen.\tIzinkan saya membahasnya secara singkat.
Darauf komme ich später zurück.\tSaya akan kembali ke poin itu nanti.
Damit komme ich zum nächsten Punkt.\tDengan itu saya beralih ke poin berikutnya.
Wie bereits erwähnt, …\tSeperti yang telah disebutkan …
Anders formuliert, …\tDengan kata lain …
Das heißt jedoch nicht zwangsläufig, dass …\tNamun itu tidak serta-merta berarti bahwa …
In dieser Hinsicht stimme ich Ihnen zu.\tDalam hal ini saya setuju dengan Anda.
In einem Punkt möchte ich widersprechen.\tDalam satu hal saya ingin menyanggah.
Könnten Sie Ihre Position näher erläutern?\tBisakah Anda menjelaskan posisi Anda lebih rinci?
Wie begründen Sie diese Einschätzung?\tBagaimana Anda mendasari penilaian ini?
Welche Konsequenzen hätte das konkret?\tKonsekuensi konkretnya apa?
Wir sollten die Rahmenbedingungen präzisieren.\tKita perlu memperjelas kondisi kerangkanya.
Die Zuständigkeiten müssen eindeutig geregelt sein.\tWewenangnya harus diatur dengan jelas.
Dafür stehen derzeit keine Ressourcen zur Verfügung.\tSaat ini tidak tersedia sumber daya untuk itu.
Wir müssen unsere Prioritäten neu setzen.\tKita harus menetapkan ulang prioritas.
Der Zeitplan erscheint mir unrealistisch.\tJadwal tersebut tampak tidak realistis bagi saya.
Unter diesen Voraussetzungen ist das machbar.\tDengan prasyarat tersebut hal itu dapat dilakukan.
Wir sollten einen tragfähigen Kompromiss anstreben.\tKita perlu mengupayakan kompromi yang dapat bertahan.
Dieser Vorschlag findet breite Zustimmung.\tUsulan ini mendapat dukungan luas.
Es wurden erhebliche Bedenken geäußert.\tKeberatan serius telah disampaikan.
Die Verhandlungen sind ins Stocken geraten.\tNegosiasinya mengalami kebuntuan.
Eine Einigung zeichnet sich ab.\tKesepakatan mulai terlihat.
Die Vereinbarung tritt sofort in Kraft.\tKesepakatan itu berlaku segera.
Die Umsetzung erfolgt schrittweise.\tImplementasinya dilakukan secara bertahap.
Die Wirksamkeit muss regelmäßig überprüft werden.\tEfektivitasnya harus diperiksa secara berkala.
Transparenz muss gewährleistet sein.\tTransparansi harus dijamin.
Davon sind insbesondere benachteiligte Gruppen betroffen.\tHal itu terutama berdampak pada kelompok yang kurang beruntung.
Die Debatte wird zunehmend differenziert geführt.\tPerdebatan semakin dilakukan secara bernuansa.
Eine pauschale Bewertung wäre unangemessen.\tPenilaian secara menyeluruh tanpa nuansa tidaklah tepat.`),
    ],
  }),
  curatedGermanDeck({
    id: 'de-id-a1-kalimat-nyata', name: 'Jerman A1 · Kalimat Nyata', summary: 'Kalimat utuh untuk perkenalan, rumah, makan, belanja, kota, waktu, dan kebutuhan dasar.', description: 'Deck kalimat terpisah. Setiap kalimat ditulis sebagai ujaran utuh yang masuk akal, bukan pola yang diulang untuk mengganti satu kata.', level: 'pemula', category: 'sehari-hari', color: '#A46F24', featured: true,
    entries: sentences('a1-kalimat', `
Ich heiße Rina.\tNama saya Rina.
Mein Name ist Budi Santoso.\tNama saya Budi Santoso.
Ich komme aus Indonesien.\tSaya berasal dari Indonesia.
Ich wohne seit einem Monat in Berlin.\tSaya tinggal di Berlin sejak sebulan lalu.
Ich spreche Indonesisch und ein bisschen Deutsch.\tSaya berbicara bahasa Indonesia dan sedikit bahasa Jerman.
Wie heißen Sie?\tSiapa nama Anda?
Wo sind Sie geboren?\tDi mana Anda lahir?
Welche Sprachen sprichst du?\tBahasa apa saja yang kamu kuasai?
Das ist meine Schwester.\tIni saudara perempuan saya.
Meine Eltern wohnen in Jakarta.\tOrang tua saya tinggal di Jakarta.
Ich bin verheiratet und habe ein Kind.\tSaya sudah menikah dan memiliki seorang anak.
Wir sind heute zu viert.\tHari ini kami berempat.
Ich arbeite in einem Hotel.\tSaya bekerja di sebuah hotel.
Mein Bruder studiert Informatik.\tSaudara laki-laki saya kuliah informatika.
Am Montag habe ich Deutschkurs.\tHari Senin saya mengikuti kursus bahasa Jerman.
Der Kurs beginnt um neun Uhr.\tKursusnya dimulai pukul sembilan.
Ich bin heute etwas müde.\tHari ini saya agak lelah.
Mir geht es gut, danke.\tKabar saya baik, terima kasih.
Entschuldigung, ich habe Ihren Namen vergessen.\tMaaf, saya lupa nama Anda.
Können Sie Ihren Namen bitte buchstabieren?\tBisakah Anda mengeja nama Anda?
Unsere Wohnung ist im dritten Stock.\tApartemen kami berada di lantai tiga.
Die Küche ist klein, aber hell.\tDapurnya kecil tetapi terang.
Mein Schlüssel liegt auf dem Tisch.\tKunci saya terletak di atas meja.
Im Schlafzimmer steht noch kein Schrank.\tBelum ada lemari di kamar tidur.
Bitte mach das Fenster zu.\tTolong tutup jendelanya.
Kannst du die Tür öffnen?\tBisakah kamu membuka pintunya?
Ich räume nach dem Essen die Küche auf.\tSaya merapikan dapur setelah makan.
Heute muss ich die Wäsche waschen.\tHari ini saya harus mencuci pakaian.
Der Aufzug funktioniert nicht.\tLiftnya tidak berfungsi.
Unsere Nachbarn sind sehr freundlich.\tTetangga kami sangat ramah.
Ich suche eine Wohnung in der Nähe vom Bahnhof.\tSaya mencari apartemen di dekat stasiun.
Wie hoch ist die Miete?\tBerapa biaya sewanya?
Das Bad ist gleich links.\tKamar mandinya tepat di sebelah kiri.
Im Kühlschrank ist noch Milch.\tMasih ada susu di kulkas.
Wir brauchen Brot und Gemüse.\tKita membutuhkan roti dan sayuran.
Zum Frühstück trinke ich Kaffee.\tSaat sarapan saya minum kopi.
Ich esse kein Schweinefleisch.\tSaya tidak makan daging babi.
Haben Sie auch vegetarische Gerichte?\tApakah Anda juga memiliki hidangan vegetarian?
Ich hätte gern eine Gemüsesuppe.\tSaya ingin sup sayur.
Für mich bitte ohne Zwiebeln.\tUntuk saya tanpa bawang bombai.
Das Essen schmeckt sehr gut.\tMakanannya terasa sangat enak.
Können wir bitte bezahlen?\tBisakah kami membayar?
Kann ich mit Karte bezahlen?\tBisakah saya membayar dengan kartu?
Ich nehme ein Kilo Äpfel.\tSaya mengambil satu kilogram apel.
Wo finde ich den Reis?\tDi mana saya dapat menemukan beras?
Heute ist das Brot im Angebot.\tHari ini rotinya sedang diskon.
Das kostet zusammen zwölf Euro.\tTotalnya dua belas euro.
Ich brauche keine Tüte.\tSaya tidak membutuhkan kantong.
Der Bus fährt in zehn Minuten.\tBusnya berangkat dalam sepuluh menit.
Welche Bahn fährt zum Hauptbahnhof?\tKereta mana yang menuju stasiun utama?
Sie müssen an der nächsten Haltestelle aussteigen.\tAnda harus turun di halte berikutnya.
Der Bahnhof ist zu Fuß fünf Minuten entfernt.\tStasiunnya berjarak lima menit berjalan kaki.
Gehen Sie hier geradeaus.\tJalanlah lurus dari sini.
Biegen Sie an der Ampel links ab.\tBelok kiri di lampu lalu lintas.
Die Apotheke ist neben dem Supermarkt.\tApoteknya berada di sebelah supermarket.
Ich warte vor dem Eingang.\tSaya menunggu di depan pintu masuk.
Mein Zug kommt auf Gleis vier an.\tKereta saya tiba di peron empat.
Ich möchte eine Fahrkarte nach Hamburg.\tSaya ingin tiket ke Hamburg.
Wann fährt der letzte Bus?\tKapan bus terakhir berangkat?
Heute regnet es den ganzen Tag.\tHari ini hujan sepanjang hari.
Morgen wird das Wetter besser.\tBesok cuacanya akan lebih baik.
Hast du heute Abend Zeit?\tApakah kamu punya waktu malam ini?
Wir treffen uns um halb sieben.\tKita bertemu pukul setengah tujuh.
Ich komme fünf Minuten später.\tSaya akan datang terlambat lima menit.
Am Wochenende besuche ich Freunde.\tPada akhir pekan saya mengunjungi teman-teman.
Heute bleibe ich zu Hause.\tHari ini saya tetap di rumah.
Der Termin ist am Dienstagmorgen.\tJanjinya pada Selasa pagi.
Bitte rufen Sie morgen noch einmal an.\tSilakan telepon lagi besok.
Ich habe jetzt keine Zeit.\tSekarang saya tidak punya waktu.
Wir können später darüber sprechen.\tKita dapat membicarakannya nanti.
Ich habe eine Frage.\tSaya punya pertanyaan.
Können Sie mir bitte helfen?\tBisakah Anda membantu saya?
Ich verstehe die Aufgabe nicht.\tSaya tidak memahami tugasnya.
Bitte sprechen Sie etwas langsamer.\tTolong bicara sedikit lebih pelan.
Können Sie das noch einmal sagen?\tBisakah Anda mengatakannya sekali lagi?
Wie schreibt man dieses Wort?\tBagaimana menulis kata ini?
Ich habe mein Handy verloren.\tSaya kehilangan ponsel saya.
Mein Internet funktioniert nicht.\tInternet saya tidak berfungsi.
Wo kann ich hier telefonieren?\tDi mana saya dapat menelepon di sini?
Ich brauche einen Arzt.\tSaya membutuhkan dokter.
Meine Tochter hat Fieber.\tAnak perempuan saya demam.
Seit gestern tut mein Hals weh.\tTenggorokan saya sakit sejak kemarin.
Nehmen Sie diese Tablette nach dem Essen.\tMinumlah tablet ini setelah makan.
Heute kann ich nicht arbeiten.\tHari ini saya tidak dapat bekerja.
Bitte warten Sie im Wartezimmer.\tSilakan menunggu di ruang tunggu.
Ich habe um elf Uhr einen Termin.\tSaya memiliki janji pukul sebelas.
Wo ist die nächste Apotheke?\tDi mana apotek terdekat?
Ich fühle mich schon besser.\tSaya sudah merasa lebih baik.
Machen Sie bitte das Licht an.\tTolong nyalakan lampunya.
Das Handy gehört mir.\tPonsel itu milik saya.
Dieser Platz ist noch frei.\tTempat ini masih kosong.
Darf ich mich hier setzen?\tBolehkah saya duduk di sini?
Kommst du morgen mit?\tApakah kamu ikut besok?
Ich muss leider gehen.\tSayangnya saya harus pergi.
Wir sehen uns nächste Woche.\tKita bertemu minggu depan.
Vielen Dank für Ihre Hilfe.\tTerima kasih banyak atas bantuan Anda.
Ich wünsche Ihnen einen schönen Tag.\tSaya berharap hari Anda menyenangkan.
Bitte schicken Sie mir die Adresse.\tTolong kirimkan alamatnya kepada saya.
Ich bin gleich wieder da.\tSaya akan segera kembali.
Heute passt es mir gut.\tHari ini waktunya cocok bagi saya.`),
  }),
  curatedGermanDeck({
    id: 'de-id-a2-b1-kalimat-nyata', name: 'Jerman A2–B1 · Kalimat Nyata', summary: 'Kalimat mandiri untuk rutinitas, perjalanan, layanan, kesehatan, kerja, dan opini.', description: 'Deck kalimat terpisah untuk pembelajar A2–B1. Kalimat dipilih berdasarkan use case nyata dan tidak dibentuk lewat substitusi massal.', level: 'menengah', category: 'sehari-hari', color: '#397065', featured: true,
    entries: sentences('a2-b1-kalimat', `
Normalerweise stehe ich um halb sieben auf.\tBiasanya saya bangun pukul setengah tujuh.
Bevor ich zur Arbeit fahre, bringe ich mein Kind zur Schule.\tSebelum berangkat kerja, saya mengantar anak saya ke sekolah.
Unter der Woche habe ich kaum Freizeit.\tPada hari kerja saya hampir tidak memiliki waktu luang.
Am Wochenende schlafe ich gern etwas länger.\tPada akhir pekan saya suka tidur sedikit lebih lama.
Ich versuche, regelmäßig Sport zu machen.\tSaya berusaha berolahraga secara rutin.
Seit ich umgezogen bin, fahre ich mit dem Fahrrad zur Arbeit.\tSejak pindah rumah, saya bersepeda ke tempat kerja.
Heute muss ich noch einige Dinge erledigen.\tHari ini saya masih harus menyelesaikan beberapa urusan.
Wir haben den Termin auf nächste Woche verschoben.\tKami memindahkan jadwal ke minggu depan.
Sag mir bitte Bescheid, wenn du später kommst.\tTolong beri tahu saya jika kamu datang terlambat.
Ich habe völlig vergessen, dich anzurufen.\tSaya benar-benar lupa meneleponmu.
Nachdem ich eingekauft hatte, habe ich das Abendessen gekocht.\tSetelah berbelanja, saya memasak makan malam.
Wenn das Wetter gut ist, gehen wir im Park spazieren.\tJika cuacanya bagus, kami berjalan-jalan di taman.
Obwohl ich müde war, bin ich noch mitgekommen.\tMeskipun lelah, saya tetap ikut.
Wir kennen uns seit dem Sprachkurs.\tKami saling mengenal sejak kursus bahasa.
Ich würde gern öfter etwas mit Freunden unternehmen.\tSaya ingin lebih sering melakukan sesuatu bersama teman.
Vielen Dank für die Einladung, ich komme sehr gern.\tTerima kasih atas undangannya, saya akan datang dengan senang hati.
Leider kann ich an diesem Abend nicht.\tSayangnya saya tidak bisa pada malam itu.
Der Film war spannender, als ich erwartet hatte.\tFilmnya lebih menarik daripada yang saya harapkan.
Ich interessiere mich besonders für Fotografie.\tSaya terutama tertarik pada fotografi.
Wir haben uns lange über unsere Reise unterhalten.\tKami lama mengobrol tentang perjalanan kami.
Ich suche eine Jacke, die auch bei Regen warm hält.\tSaya mencari jaket yang tetap hangat saat hujan.
Diese Hose sitzt gut, aber die Farbe gefällt mir nicht.\tCelana ini pas, tetapi saya tidak menyukai warnanya.
Ich möchte den Pullover zurückgeben, weil er einen Fleck hat.\tSaya ingin mengembalikan sweter ini karena ada nodanya.
Die Verkäuferin hat mir eine andere Größe gebracht.\tPramuniaganya membawakan ukuran lain untuk saya.
Für die Reparatur brauche ich einen Kostenvoranschlag.\tUntuk perbaikan saya membutuhkan perkiraan biaya.
Das Paket sollte eigentlich gestern ankommen.\tPaketnya seharusnya tiba kemarin.
Ich habe versehentlich den falschen Betrag überwiesen.\tSaya tidak sengaja mentransfer jumlah yang salah.
Könnten Sie bitte prüfen, ob die Zahlung eingegangen ist?\tBisakah Anda memeriksa apakah pembayarannya sudah masuk?
Seit drei Tagen habe ich starke Kopfschmerzen.\tSaya mengalami sakit kepala berat selama tiga hari.
Der Arzt hat mir empfohlen, mehr Wasser zu trinken.\tDokter menyarankan saya minum lebih banyak air.
Nehmen Sie das Medikament zweimal täglich ein.\tMinumlah obat itu dua kali sehari.
Wenn es nicht besser wird, kommen Sie bitte wieder.\tJika tidak membaik, silakan datang kembali.
Wegen meiner Erkältung bleibe ich heute zu Hause.\tKarena pilek, hari ini saya tetap di rumah.
Ich muss mich noch ein paar Tage schonen.\tSaya masih harus beristirahat selama beberapa hari.
Die Praxis ist telefonisch schwer zu erreichen.\tTempat praktik itu sulit dihubungi melalui telepon.
Meine Versicherung übernimmt die Kosten nicht vollständig.\tAsuransi saya tidak menanggung seluruh biayanya.
Ich mache gerade eine Ausbildung zur Pflegefachkraft.\tSaya sedang menjalani pendidikan kejuruan sebagai tenaga perawat.
Während meines Praktikums habe ich viel gelernt.\tSelama magang saya belajar banyak.
Meine Arbeitszeit beginnt jeden Tag um acht Uhr.\tJam kerja saya dimulai pukul delapan setiap hari.
Morgen übernehme ich die Spätschicht.\tBesok saya mengambil sif sore.
Könnten Sie mir zeigen, wie das Programm funktioniert?\tBisakah Anda menunjukkan cara kerja program ini?
Ich habe die Datei im falschen Ordner gespeichert.\tSaya menyimpan berkas di folder yang salah.
Die Besprechung dauert voraussichtlich eine Stunde.\tRapatnya diperkirakan berlangsung satu jam.
Bitte schicken Sie mir die Unterlagen bis Freitag.\tTolong kirimkan dokumennya paling lambat Jumat.
Ich habe mich auf eine Stelle im Kundenservice beworben.\tSaya melamar posisi di layanan pelanggan.
Im Vorstellungsgespräch wurde ich nach meiner Erfahrung gefragt.\tDalam wawancara saya ditanya tentang pengalaman saya.
Für diese Stelle sind gute Deutschkenntnisse erforderlich.\tKemampuan bahasa Jerman yang baik diperlukan untuk posisi ini.
Die Prüfung war schwieriger als die Übungen.\tUjiannya lebih sulit daripada latihan-latihannya.
Ich bin froh, dass ich den Kurs bestanden habe.\tSaya senang telah lulus kursus.
Die Dozentin hat meinen Text ausführlich korrigiert.\tDosennya mengoreksi teks saya secara rinci.
Wegen einer Signalstörung fällt der Zug heute aus.\tKarena gangguan sinyal, keretanya dibatalkan hari ini.
Wir haben den Anschluss in Köln verpasst.\tKami ketinggalan kereta sambungan di Köln.
Der nächste Zug fährt von einem anderen Gleis ab.\tKereta berikutnya berangkat dari peron lain.
Ich möchte meine Reservierung um eine Nacht verlängern.\tSaya ingin memperpanjang reservasi satu malam.
Das Zimmer war sauber, aber nachts sehr laut.\tKamarnya bersih, tetapi sangat bising pada malam hari.
An der Rezeption hat man uns sofort geholfen.\tPetugas resepsionis langsung membantu kami.
Die Führung findet auch bei schlechtem Wetter statt.\tTur tetap berlangsung saat cuaca buruk.
Wir haben uns in der Altstadt verlaufen.\tKami tersesat di kota tua.
Könnten Sie mir sagen, wie ich zum Rathaus komme?\tBisakah Anda memberi tahu cara menuju balai kota?
Ich muss meinen Ausweis persönlich abholen.\tSaya harus mengambil kartu identitas secara langsung.
Für den Antrag fehlen noch zwei Unterlagen.\tMasih ada dua dokumen yang kurang untuk permohonan itu.
Das Formular kann auch online ausgefüllt werden.\tFormulirnya juga dapat diisi secara daring.
Die Bearbeitung dauert ungefähr vier Wochen.\tPemrosesannya memakan waktu sekitar empat minggu.
Ich habe noch keine Antwort von der Behörde erhalten.\tSaya belum menerima jawaban dari instansi tersebut.
Wegen eines Fehlers wurde mir die Gebühr zweimal berechnet.\tKarena kesalahan, saya dikenai biaya dua kali.
Der Kundenservice hat meine Beschwerde schnell bearbeitet.\tLayanan pelanggan memproses keluhan saya dengan cepat.
Ich erwarte, dass der Schaden ersetzt wird.\tSaya berharap kerugiannya diganti.
Meiner Meinung nach sollte der Nahverkehr günstiger sein.\tMenurut saya transportasi umum seharusnya lebih murah.
Viele Menschen arbeiten inzwischen von zu Hause aus.\tBanyak orang kini bekerja dari rumah.
Das spart Zeit, kann aber auch anstrengend sein.\tHal itu menghemat waktu, tetapi juga bisa melelahkan.
Einerseits ist das praktisch, andererseits fehlt der persönliche Kontakt.\tDi satu sisi hal itu praktis, di sisi lain kontak langsung menjadi kurang.
Ich finde es wichtig, verschiedene Meinungen zu hören.\tSaya menganggap penting untuk mendengar berbagai pendapat.
Nicht alle Informationen im Internet sind zuverlässig.\tTidak semua informasi di internet dapat dipercaya.
Bevor ich einen Beitrag teile, prüfe ich die Quelle.\tSebelum membagikan unggahan, saya memeriksa sumbernya.
Der Artikel erklärt das Thema verständlich.\tArtikel itu menjelaskan topiknya dengan mudah dipahami.
In der Diskussion wurden mehrere Lösungen vorgeschlagen.\tDalam diskusi beberapa solusi diusulkan.
Am Ende konnten wir uns auf einen Kompromiss einigen.\tPada akhirnya kami dapat menyepakati kompromi.
Das Problem betrifft vor allem Familien mit wenig Einkommen.\tMasalah itu terutama berdampak pada keluarga berpenghasilan rendah.
Die Stadt plant mehr sichere Fahrradwege.\tKota merencanakan lebih banyak jalur sepeda yang aman.
Dadurch soll der Verkehr im Zentrum reduziert werden.\tDengan itu lalu lintas di pusat kota diharapkan berkurang.
Viele Anwohner unterstützen den Vorschlag.\tBanyak warga setempat mendukung usulan tersebut.
Andere befürchten, dass Parkplätze verloren gehen.\tYang lain khawatir tempat parkir akan berkurang.
Wir sollten zuerst prüfen, welche Folgen die Maßnahme hat.\tKita sebaiknya memeriksa terlebih dahulu dampak langkah tersebut.
Es ist noch unklar, wann das Projekt beginnt.\tMasih belum jelas kapan proyek itu dimulai.
Sobald ich eine Rückmeldung bekomme, melde ich mich.\tSegera setelah mendapat jawaban, saya akan menghubungi.
Falls Sie weitere Fragen haben, können Sie mich gern anrufen.\tJika Anda memiliki pertanyaan lain, silakan menelepon saya.
Ich wäre Ihnen dankbar, wenn Sie den Termin bestätigen könnten.\tSaya akan berterima kasih jika Anda dapat mengonfirmasi jadwalnya.
Leider muss ich Ihnen mitteilen, dass ich nicht teilnehmen kann.\tSayangnya saya harus memberi tahu bahwa saya tidak dapat berpartisipasi.
Vielen Dank, dass Sie sich so schnell darum gekümmert haben.\tTerima kasih telah mengurusnya begitu cepat.
Entschuldigen Sie bitte die verspätete Antwort.\tMohon maaf atas jawaban yang terlambat.
Ich freue mich darauf, von Ihnen zu hören.\tSaya menantikan kabar dari Anda.
Können wir die Einzelheiten morgen besprechen?\tBisakah kita membahas rinciannya besok?
Wir sollten eine Entscheidung treffen, bevor es zu spät ist.\tKita sebaiknya mengambil keputusan sebelum terlambat.
Ich bin überzeugt, dass wir eine Lösung finden werden.\tSaya yakin kita akan menemukan solusi.
Das Ergebnis hängt davon ab, wie gut wir zusammenarbeiten.\tHasilnya bergantung pada seberapa baik kita bekerja sama.
Obwohl nicht alles geklappt hat, war das Projekt erfolgreich.\tMeskipun tidak semuanya berjalan lancar, proyeknya berhasil.
Aus dieser Erfahrung habe ich viel gelernt.\tSaya banyak belajar dari pengalaman ini.
Beim nächsten Mal würde ich früher mit der Planung beginnen.\tLain kali saya akan mulai merencanakan lebih awal.
Es lohnt sich, verschiedene Angebote zu vergleichen.\tAda baiknya membandingkan berbagai penawaran.
Manchmal ist die günstigste Lösung nicht die beste.\tKadang solusi termurah bukanlah yang terbaik.
Ich brauche noch etwas Zeit, um darüber nachzudenken.\tSaya masih membutuhkan waktu untuk memikirkannya.
Unter diesen Bedingungen kann ich dem Vorschlag zustimmen.\tDalam kondisi ini saya dapat menyetujui usulan tersebut.`),
  }),
];
