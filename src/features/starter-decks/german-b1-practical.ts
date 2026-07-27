import { curatedGermanDeck, germanEntries } from './german-builder';

const rows = (type: 'word' | 'phrase', tag: string, data: string) => germanEntries(type, tag, data);

/** Segmen B1 tema praktis untuk persiapan Goethe; lihat docs/CONTENT_SOURCES.md. */
export const germanB1PracticalStarterDecks = [
  curatedGermanDeck({
    id: 'de-id-b1-kata-pendidikan-karier', name: 'Jerman B1 · Kata Pendidikan & Karier', summary: 'Jalur pendidikan, kualifikasi, pengakuan ijazah, pelatihan, magang, dan pengembangan karier.', description: 'Kosakata B1 untuk mencari informasi pendidikan, menilai persyaratan, dan merencanakan perkembangan profesional.', level: 'menengah', category: 'sekolah', color: '#4F6685', featured: true,
    entries: rows('word', 'b1-pendidikan', `
der Bildungsweg, die Bildungswege	jalur pendidikan
die Schulbildung	pendidikan sekolah
der Schulabschluss, die Schulabschlüsse	ijazah sekolah
der Berufsabschluss, die Berufsabschlüsse	kualifikasi profesi
der Hochschulabschluss, die Hochschulabschlüsse	gelar pendidikan tinggi
die Anerkennung	pengakuan resmi
das Anerkennungsverfahren, die Anerkennungsverfahren	prosedur pengakuan kualifikasi
die Weiterbildung, die Weiterbildungen	pendidikan lanjutan
die Umschulung, die Umschulungen	pelatihan ulang profesi
die Berufsschule, die Berufsschulen	sekolah kejuruan
die Hochschule, die Hochschulen	perguruan tinggi
die Fachrichtung, die Fachrichtungen	bidang studi
der Schwerpunkt, die Schwerpunkte	bidang fokus
die Zulassung, die Zulassungen	penerimaan resmi
die Zugangsvoraussetzung, die Zugangsvoraussetzungen	persyaratan masuk
die Bewerbungsfrist, die Bewerbungsfristen	batas waktu pendaftaran
das Auswahlverfahren, die Auswahlverfahren	prosedur seleksi
die Studienberatung, die Studienberatungen	konsultasi studi
die Berufsberatung, die Berufsberatungen	konsultasi karier
das Ausbildungsunternehmen, die Ausbildungsunternehmen	perusahaan penyelenggara pelatihan kejuruan
der Ausbildungsberuf, die Ausbildungsberufe	profesi melalui pendidikan kejuruan
die Ausbildungsdauer	durasi pendidikan kejuruan
die Ausbildungsvergütung, die Ausbildungsvergütungen	upah peserta pendidikan kejuruan
der Praktikumsbetrieb, die Praktikumsbetriebe	tempat usaha penyelenggara magang
der Praktikumsbericht, die Praktikumsberichte	laporan magang
die Lernerfahrung, die Lernerfahrungen	pengalaman belajar
die Lernmethode, die Lernmethoden	metode belajar
die Lernplattform, die Lernplattformen	platform pembelajaran
das Lernziel, die Lernziele	tujuan belajar
der Leistungsnachweis, die Leistungsnachweise	bukti pencapaian akademik
die Abschlussprüfung, die Abschlussprüfungen	ujian akhir
die Teilnahmebescheinigung, die Teilnahmebescheinigungen	sertifikat keikutsertaan
das Abschlusszeugnis, die Abschlusszeugnisse	sertifikat kelulusan
die Qualifizierungsmaßnahme, die Qualifizierungsmaßnahmen	program peningkatan kualifikasi
die Fördermöglichkeit, die Fördermöglichkeiten	pilihan bantuan pendanaan
das Stipendium, die Stipendien	beasiswa
die Studiengebühr, die Studiengebühren	biaya studi
die Karriereplanung	perencanaan karier
das Berufsziel, die Berufsziele	tujuan karier
die Aufstiegschance, die Aufstiegschancen	peluang kenaikan karier
die Schlüsselkompetenz, die Schlüsselkompetenzen	kompetensi utama
die Teamfähigkeit	kemampuan bekerja dalam tim
die Selbstständigkeit	kemandirian
die Belastbarkeit	ketahanan menghadapi tekanan
die Lernbereitschaft	kemauan untuk belajar
die Beratungserfahrung, die Beratungserfahrungen	pengalaman memberikan konsultasi
sich weiterbilden	mengikuti pendidikan lanjutan
sich spezialisieren	mengambil spesialisasi
sich qualifizieren	meningkatkan kualifikasi
anerkennen	mengakui secara resmi
fördern	mendukung melalui bantuan
nachholen	mengejar sesuatu yang tertinggal
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-pendidikan-karier', name: 'Jerman B1 · Frasa Pendidikan & Karier', summary: 'Ungkapan untuk meminta informasi, menjelaskan riwayat pendidikan, mengurus pengakuan, dan merencanakan karier.', description: 'Frasa B1 untuk surel informasi, konsultasi pendidikan, wawancara, dan pembicaraan rencana profesional.', level: 'menengah', category: 'sekolah', color: '#60789A', featured: true,
    entries: rows('phrase', 'b1-karier', `
Ich interessiere mich für Ihre berufliche Weiterbildung.	Saya tertarik pada pendidikan lanjutan profesional Anda.
Auf Ihrer Webseite habe ich den Kurs entdeckt.	Saya menemukan kursus tersebut di situs web Anda.
Könnten Sie mir nähere Informationen zusenden?	Bisakah Anda mengirimkan informasi lebih lengkap kepada saya?
Welche Zugangsvoraussetzungen muss ich erfüllen?	Persyaratan masuk apa yang harus saya penuhi?
Bis wann kann ich mich für den Kurs bewerben?	Sampai kapan saya dapat mendaftar kursus tersebut?
Das Auswahlverfahren besteht aus zwei Teilen.	Prosedur seleksinya terdiri atas dua bagian.
Für die Anmeldung benötige ich mein Abschlusszeugnis.	Untuk pendaftaran saya membutuhkan sertifikat kelulusan.
Muss ich die Unterlagen übersetzen lassen?	Apakah saya harus meminta dokumen-dokumen tersebut diterjemahkan?
Mein Abschluss wurde noch nicht anerkannt.	Kualifikasi saya belum diakui secara resmi.
Wo kann ich die Anerkennung beantragen?	Di mana saya dapat mengajukan pengakuan resmi?
Wie lange dauert das Anerkennungsverfahren?	Berapa lama prosedur pengakuannya berlangsung?
Entstehen dafür zusätzliche Gebühren?	Apakah ada biaya tambahan untuk itu?
Der Unterricht lässt sich mit meiner Arbeit verbinden.	Pelajarannya dapat disesuaikan dengan pekerjaan saya.
Der Kurs wird sowohl online als auch vor Ort angeboten.	Kursus ditawarkan secara daring maupun tatap muka.
Ich würde gern an einem Beratungsgespräch teilnehmen.	Saya ingin mengikuti sesi konsultasi.
Welche Fördermöglichkeiten gibt es für Berufstätige?	Pilihan bantuan pendanaan apa yang tersedia bagi pekerja?
Unter bestimmten Bedingungen kann man ein Stipendium erhalten.	Dalam kondisi tertentu seseorang dapat memperoleh beasiswa.
Ich möchte meinen Schulabschluss nachholen.	Saya ingin mengejar ijazah sekolah yang belum saya peroleh.
Nach der Schule habe ich eine Ausbildung abgeschlossen.	Setelah sekolah saya menyelesaikan pendidikan kejuruan.
Anschließend war ich drei Jahre in diesem Beruf tätig.	Setelah itu saya bekerja selama tiga tahun dalam profesi ini.
Während des Praktikums konnte ich viel Erfahrung sammeln.	Selama magang saya dapat mengumpulkan banyak pengalaman.
Zu meinen Aufgaben gehörte die Betreuung von Kunden.	Pendampingan pelanggan termasuk dalam tugas saya.
Besonders interessiert mich der technische Bereich.	Saya terutama tertarik pada bidang teknis.
Langfristig möchte ich mehr Verantwortung übernehmen.	Dalam jangka panjang saya ingin mengambil tanggung jawab lebih besar.
Dafür brauche ich zusätzliche Qualifikationen.	Untuk itu saya membutuhkan kualifikasi tambahan.
Die Weiterbildung verbessert meine beruflichen Chancen.	Pendidikan lanjutan meningkatkan peluang profesional saya.
Ich möchte mich auf digitale Kommunikation spezialisieren.	Saya ingin mengambil spesialisasi komunikasi digital.
Welche Fachrichtung würden Sie mir empfehlen?	Bidang studi apa yang akan Anda rekomendasikan kepada saya?
Meine Stärken liegen in der Organisation und Teamarbeit.	Kekuatan saya terletak pada pengorganisasian dan kerja tim.
Ich arbeite selbstständig und lerne schnell.	Saya bekerja secara mandiri dan belajar dengan cepat.
In stressigen Situationen bleibe ich meistens ruhig.	Dalam situasi penuh tekanan saya biasanya tetap tenang.
An meinen Sprachkenntnissen arbeite ich noch.	Saya masih meningkatkan kemampuan bahasa saya.
Ich habe mir klare Lernziele gesetzt.	Saya telah menetapkan tujuan belajar yang jelas.
Mit dieser Lernmethode komme ich gut zurecht.	Saya dapat menggunakan metode belajar ini dengan baik.
Der Austausch in der Gruppe hilft mir besonders.	Pertukaran dalam kelompok sangat membantu saya.
Ich kann das Gelernte direkt im Beruf anwenden.	Saya dapat langsung menerapkan hal yang dipelajari dalam pekerjaan.
Für den Abschluss muss ich eine Prüfung ablegen.	Untuk kelulusan saya harus mengikuti ujian.
Wie wird die Abschlussprüfung bewertet?	Bagaimana ujian akhir dinilai?
Nach erfolgreicher Teilnahme erhält man ein Zertifikat.	Setelah keikutsertaan yang berhasil seseorang memperoleh sertifikat.
Leider kann ich den Kurs nicht wie geplant beginnen.	Sayangnya saya tidak dapat memulai kursus sesuai rencana.
Wäre ein Wechsel in den nächsten Kurs möglich?	Apakah perpindahan ke kursus berikutnya memungkinkan?
Ich bitte um eine schriftliche Bestätigung.	Saya meminta konfirmasi tertulis.
Die Berufsberatung hat mir neue Möglichkeiten gezeigt.	Konsultasi karier menunjukkan pilihan baru kepada saya.
Ich informiere mich gerade über verschiedene Berufsfelder.	Saya sedang mencari informasi mengenai berbagai bidang profesi.
Bei meiner Entscheidung spielen die Aufstiegschancen eine Rolle.	Peluang kenaikan karier berperan dalam keputusan saya.
Ein sicherer Arbeitsplatz ist mir ebenfalls wichtig.	Tempat kerja yang aman juga penting bagi saya.
Ich möchte Beruf und Familie besser miteinander vereinbaren.	Saya ingin menyeimbangkan pekerjaan dan keluarga dengan lebih baik.
Deshalb suche ich nach einem flexiblen Bildungsangebot.	Oleh karena itu saya mencari program pendidikan yang fleksibel.
Mein nächstes Berufsziel ist eine leitende Position.	Tujuan karier saya berikutnya adalah posisi kepemimpinan.
Dazu möchte ich zunächst praktische Erfahrung sammeln.	Untuk itu saya ingin terlebih dahulu mengumpulkan pengalaman praktik.
Vielen Dank für das informative Beratungsgespräch.	Terima kasih atas sesi konsultasi yang informatif.
Über weitere Hinweise würde ich mich sehr freuen.	Saya akan sangat senang menerima petunjuk lebih lanjut.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-kesehatan-gaya-hidup', name: 'Jerman B1 · Kata Kesehatan & Gaya Hidup', summary: 'Pemeriksaan, perawatan, pemulihan, kesehatan mental ringan, pencegahan, gerak, dan keseimbangan hidup.', description: 'Kosakata B1 untuk menjelaskan kondisi kesehatan secara lebih tepat dan membahas kebiasaan yang menunjang kesejahteraan.', level: 'menengah', category: 'sehari-hari', color: '#4F776D', featured: true,
    entries: rows('word', 'b1-kesehatan', `
die Untersuchung, die Untersuchungen	pemeriksaan medis
die Vorsorgeuntersuchung, die Vorsorgeuntersuchungen	pemeriksaan pencegahan
die Diagnose, die Diagnosen	diagnosis
die Behandlung, die Behandlungen	perawatan medis
die Therapie, die Therapien	terapi
die Operation, die Operationen	operasi
die Genesung	pemulihan
die Besserung	perbaikan kondisi
die Nebenwirkung, die Nebenwirkungen	efek samping
die Dosierung, die Dosierungen	dosis
die Überweisung, die Überweisungen	surat rujukan medis
der Facharzt, die Fachärzte	dokter spesialis laki-laki
die Fachärztin, die Fachärztinnen	dokter spesialis perempuan
die Notaufnahme, die Notaufnahmen	unit gawat darurat
die Krankenakte, die Krankenakten	rekam medis
die Krankenversicherung, die Krankenversicherungen	asuransi kesehatan
die Arbeitsunfähigkeitsbescheinigung, die Arbeitsunfähigkeitsbescheinigungen	surat keterangan tidak mampu bekerja
die Beschwerde, die Beschwerden	keluhan kesehatan
das Symptom, die Symptome	gejala
der Schwindel	pusing berputar
die Übelkeit	rasa mual
die Atemnot	sesak napas
die Entzündung, die Entzündungen	peradangan
die Wunde, die Wunden	luka
die Schwellung, die Schwellungen	pembengkakan
der Blutdruck	tekanan darah
der Puls	denyut nadi
das Immunsystem	sistem kekebalan tubuh
die Ansteckung, die Ansteckungen	penularan
die Vorbeugung	pencegahan
die Belastung, die Belastungen	beban fisik atau mental
die Überlastung	beban berlebihan
die Erschöpfung	kelelahan berat
die Anspannung	ketegangan
die Ausgeglichenheit	keseimbangan batin
die Lebensqualität	kualitas hidup
der Bewegungsmangel	kekurangan aktivitas fisik
die Ausdauer	daya tahan tubuh
die Körperhaltung	postur tubuh
die Entspannungsübung, die Entspannungsübungen	latihan relaksasi
die Atemübung, die Atemübungen	latihan pernapasan
der Schlafrhythmus	ritme tidur
die Schlafstörung, die Schlafstörungen	gangguan tidur
die Sucht, die Süchte	kecanduan
die Beratung, die Beratungen	konsultasi
die Selbsthilfegruppe, die Selbsthilfegruppen	kelompok dukungan mandiri
sich erholen	memulihkan diri
sich entspannen	merilekskan diri
sich schonen	mengurangi aktivitas demi pemulihan
untersuchen	memeriksa secara medis
behandeln	merawat secara medis
verschreiben	meresepkan
vorbeugen	mencegah
ansteckend	menular
regelmäßig	teratur
ausgewogen	seimbang
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-kesehatan-keseimbangan', name: 'Jerman B1 · Frasa Kesehatan & Keseimbangan', summary: 'Ungkapan untuk menjelaskan gejala, memahami perawatan, mengurus surat sakit, serta memberi saran gaya hidup.', description: 'Frasa B1 untuk percakapan medis, pesan pekerjaan, dan diskusi mengenai kesehatan fisik serta keseimbangan hidup.', level: 'menengah', category: 'sehari-hari', color: '#609083', featured: true,
    entries: rows('phrase', 'b1-sehat', `
Die Beschwerden sind seit gestern stärker geworden.	Keluhannya menjadi lebih parah sejak kemarin.
Mir wird häufig schwindelig, wenn ich aufstehe.	Saya sering merasa pusing ketika berdiri.
Außerdem fühle ich mich ungewöhnlich müde.	Selain itu saya merasa sangat lelah secara tidak biasa.
Seit wann haben Sie diese Symptome?	Sejak kapan Anda mengalami gejala ini?
Treten die Schmerzen nur bei Bewegung auf?	Apakah rasa sakit hanya muncul ketika bergerak?
Die Stelle ist leicht geschwollen.	Bagian itu sedikit membengkak.
Ich habe mich beim Sport am Fuß verletzt.	Saya mencederai kaki ketika berolahraga.
Die Wunde sollte regelmäßig gereinigt werden.	Lukanya harus dibersihkan secara teratur.
Wir messen zuerst Ihren Blutdruck.	Kami mengukur tekanan darah Anda terlebih dahulu.
Für eine genaue Diagnose sind weitere Untersuchungen nötig.	Untuk diagnosis yang tepat diperlukan pemeriksaan lebih lanjut.
Mein Hausarzt hat mir eine Überweisung gegeben.	Dokter keluarga saya memberi saya surat rujukan.
Ich soll einen Termin beim Facharzt vereinbaren.	Saya harus membuat janji dengan dokter spesialis.
Wann ist der nächste Termin verfügbar?	Kapan jadwal berikutnya tersedia?
Ist die Untersuchung für mich kostenlos?	Apakah pemeriksaan tersebut gratis bagi saya?
Übernimmt meine Versicherung die Behandlungskosten?	Apakah asuransi saya menanggung biaya perawatan?
Dieses Medikament ist nur auf Rezept erhältlich.	Obat ini hanya tersedia dengan resep.
Wie hoch ist die tägliche Dosierung?	Berapa dosis hariannya?
Nehmen Sie die Tropfen dreimal täglich ein.	Minumlah obat tetes tiga kali sehari.
Welche Nebenwirkungen können auftreten?	Efek samping apa yang dapat terjadi?
Setzen Sie das Medikament nicht plötzlich ab.	Jangan hentikan obat secara tiba-tiba.
Falls es nicht besser wird, kommen Sie wieder.	Jika tidak membaik, datanglah kembali.
Nach der Operation müssen Sie sich schonen.	Setelah operasi Anda harus mengurangi aktivitas.
Die Genesung kann einige Wochen dauern.	Pemulihannya dapat berlangsung beberapa minggu.
Inzwischen geht es mir deutlich besser.	Sementara itu kondisi saya jauh lebih baik.
Ich brauche eine Bescheinigung für meinen Arbeitgeber.	Saya membutuhkan surat keterangan untuk pemberi kerja.
Voraussichtlich bin ich bis Freitag arbeitsunfähig.	Kemungkinan saya tidak mampu bekerja sampai hari Jumat.
Ich informiere mein Team über meine Abwesenheit.	Saya memberi tahu tim mengenai ketidakhadiran saya.
Die Arbeit belastet mich im Moment sehr.	Pekerjaan sangat membebani saya saat ini.
Nachts kann ich oft nicht abschalten.	Pada malam hari saya sering tidak dapat menenangkan pikiran.
Deshalb schlafe ich seit Wochen schlecht.	Karena itu saya tidur buruk selama berminggu-minggu.
Ich fühle mich körperlich und mental erschöpft.	Saya merasa lelah secara fisik dan mental.
Eine kurze Pause reicht inzwischen nicht mehr aus.	Istirahat singkat kini tidak lagi cukup.
Darüber sollten Sie mit Ihrer Ärztin sprechen.	Anda sebaiknya membicarakannya dengan dokter perempuan Anda.
Regelmäßige Pausen können die Belastung reduzieren.	Istirahat teratur dapat mengurangi beban.
An Ihrer Stelle würde ich früher Feierabend machen.	Jika saya berada di posisi Anda, saya akan selesai bekerja lebih awal.
Versuchen Sie, feste Schlafzeiten einzuhalten.	Usahakan untuk mempertahankan jadwal tidur tetap.
Eine Atemübung hilft mir beim Entspannen.	Latihan pernapasan membantu saya untuk rileks.
Seitdem bewege ich mich im Alltag mehr.	Sejak itu saya lebih aktif bergerak dalam keseharian.
Ich nehme öfter die Treppe statt des Aufzugs.	Saya lebih sering menggunakan tangga daripada lift.
Ausdauertraining stärkt das Herz-Kreislauf-System.	Latihan daya tahan memperkuat sistem kardiovaskular.
Man sollte das Training langsam steigern.	Seseorang sebaiknya meningkatkan latihan secara perlahan.
Eine ausgewogene Ernährung unterstützt das Immunsystem.	Pola makan seimbang mendukung sistem kekebalan tubuh.
Vorsorgeuntersuchungen helfen, Krankheiten früh zu erkennen.	Pemeriksaan pencegahan membantu mendeteksi penyakit lebih awal.
Bei einer ansteckenden Krankheit bleibe ich zu Hause.	Saat mengalami penyakit menular saya tinggal di rumah.
So schütze ich auch meine Kolleginnen und Kollegen.	Dengan demikian saya juga melindungi rekan kerja saya.
Manchmal ist professionelle Beratung sinnvoll.	Terkadang konsultasi profesional bermanfaat.
Eine Selbsthilfegruppe kann zusätzliche Unterstützung bieten.	Kelompok dukungan mandiri dapat menawarkan dukungan tambahan.
Es fällt mir schwer, um Hilfe zu bitten.	Sulit bagi saya untuk meminta bantuan.
Gesundheit ist wichtiger als ständige Leistung.	Kesehatan lebih penting daripada selalu berprestasi.
Ich möchte Beruf und Erholung besser ausgleichen.	Saya ingin menyeimbangkan pekerjaan dan pemulihan dengan lebih baik.
Dafür ändere ich Schritt für Schritt meine Gewohnheiten.	Untuk itu saya mengubah kebiasaan secara bertahap.
Schon kleine Veränderungen verbessern meine Lebensqualität.	Perubahan kecil saja meningkatkan kualitas hidup saya.
Wichtig ist, langfristig dranzubleiben.	Hal yang penting adalah terus melakukannya dalam jangka panjang.
Ich achte heute bewusster auf die Signale meines Körpers.	Sekarang saya lebih sadar memperhatikan sinyal tubuh saya.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-wohnen-konsum', name: 'Jerman B1 · Kata Tempat Tinggal & Konsumen', summary: 'Sewa, pengelolaan gedung, kerusakan, kontrak, pengiriman, garansi, pembatalan, dan hak konsumen.', description: 'Kosakata B1 untuk menangani hubungan sewa dan transaksi konsumen secara tertulis maupun lisan.', level: 'menengah', category: 'sehari-hari', color: '#76654F', featured: true,
    entries: rows('word', 'b1-wohnen-konsum', `
die Hausverwaltung, die Hausverwaltungen	pengelola properti
der Vermieter, die Vermieter	pemilik sewa laki-laki
die Vermieterin, die Vermieterinnen	pemilik sewa perempuan
der Mieter, die Mieter	penyewa laki-laki
die Mieterin, die Mieterinnen	penyewa perempuan
die Kaution, die Kautionen	deposit sewa
die Warmmiete, die Warmmieten	sewa termasuk biaya tambahan
die Kaltmiete, die Kaltmieten	sewa dasar tanpa biaya tambahan
die Betriebskosten	biaya operasional tempat tinggal
die Nebenkostenabrechnung, die Nebenkostenabrechnungen	perhitungan biaya tambahan sewa
die Mieterhöhung, die Mieterhöhungen	kenaikan harga sewa
die Kündigungsfrist, die Kündigungsfristen	batas waktu pemberitahuan pembatalan
die Hausordnung, die Hausordnungen	peraturan gedung
die Wohnungsübergabe, die Wohnungsübergaben	serah terima tempat tinggal
das Übergabeprotokoll, die Übergabeprotokolle	berita acara serah terima
die Wohnungsbesichtigung, die Wohnungsbesichtigungen	kunjungan pemeriksaan tempat tinggal
die Instandhaltung	pemeliharaan properti
die Reparatur, die Reparaturen	perbaikan
der Schaden, die Schäden	kerusakan
der Mangel, die Mängel	cacat atau kekurangan
die Feuchtigkeit	kelembapan
der Schimmel	jamur pada bangunan
die Lärmbelästigung, die Lärmbelästigungen	gangguan kebisingan
die Ruhestörung, die Ruhestörungen	gangguan ketenangan
der Hausflur, die Hausflure	lorong gedung hunian
der Gemeinschaftsraum, die Gemeinschaftsräume	ruang bersama
der Vertrag, die Verträge	kontrak
die Vertragslaufzeit, die Vertragslaufzeiten	masa berlaku kontrak
die Vertragsverlängerung, die Vertragsverlängerungen	perpanjangan kontrak
das Abonnement, die Abonnements	langganan
der Bestellvorgang, die Bestellvorgänge	proses pemesanan
der Liefertermin, die Liefertermine	jadwal pengiriman
die Lieferfrist, die Lieferfristen	batas waktu pengiriman
die Lieferadresse, die Lieferadressen	alamat pengiriman
die Zahlungsart, die Zahlungsarten	metode pembayaran
die Ratenzahlung, die Ratenzahlungen	pembayaran cicilan
die Zahlungsbestätigung, die Zahlungsbestätigungen	konfirmasi pembayaran
die Mahngebühr, die Mahngebühren	biaya pengingat pembayaran
die Reklamation, die Reklamationen	komplain barang
die Rücksendung, die Rücksendungen	pengiriman kembali barang
die Rückerstattung, die Rückerstattungen	pengembalian uang
die Umtauschfrist, die Umtauschfristen	batas waktu penukaran barang
die Gewährleistung	jaminan hukum produk
das Widerrufsrecht	hak pembatalan transaksi
der Kaufbeleg, die Kaufbelege	bukti pembelian
die Gebrauchsanweisung, die Gebrauchsanweisungen	petunjuk penggunaan
der Defekt, die Defekte	kerusakan fungsi
der Ersatzartikel, die Ersatzartikel	barang pengganti
die Verbraucherberatung, die Verbraucherberatungen	konsultasi konsumen
das Preis-Leistungs-Verhältnis	rasio harga dan kualitas
beanstanden	mengajukan keberatan atas kekurangan
widerrufen	membatalkan transaksi secara hukum
zurücksenden	mengirim kembali
fristgerecht	sesuai tenggat
kostenpflichtig	berbayar
mangelhaft	memiliki kekurangan
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-miete-vertrag-beschwerde', name: 'Jerman B1 · Frasa Sewa, Kontrak & Keluhan', summary: 'Ungkapan untuk melaporkan kerusakan, membahas sewa, membatalkan kontrak, dan menuntaskan masalah pembelian.', description: 'Frasa B1 untuk surel semi-formal dan formal kepada pengelola, penyedia layanan, atau penjual.', level: 'menengah', category: 'sehari-hari', color: '#8A755B', featured: true,
    entries: rows('phrase', 'b1-keluhan', `
Seit Anfang des Monats funktioniert die Heizung nicht richtig.	Sejak awal bulan pemanas tidak berfungsi dengan benar.
Im Schlafzimmer hat sich Schimmel gebildet.	Jamur telah terbentuk di kamar tidur.
Die Feuchtigkeit kommt vermutlich durch das Fenster.	Kelembapan kemungkinan masuk melalui jendela.
Ich habe den Schaden bereits telefonisch gemeldet.	Saya telah melaporkan kerusakan melalui telepon.
Leider wurde bisher kein Termin vereinbart.	Sayangnya sampai saat ini belum ada jadwal yang dibuat.
Ich bitte Sie, die Reparatur zeitnah zu veranlassen.	Saya meminta Anda mengatur perbaikan secepatnya.
Wann kann ein Handwerker vorbeikommen?	Kapan seorang pekerja terampil dapat datang?
Am Donnerstag wäre ich den ganzen Tag erreichbar.	Pada hari Kamis saya dapat ditemui sepanjang hari.
Bitte bestätigen Sie mir den Termin schriftlich.	Tolong konfirmasikan jadwal tersebut secara tertulis.
Die Haustür lässt sich nicht mehr abschließen.	Pintu utama gedung tidak lagi dapat dikunci.
Dadurch fühlen sich mehrere Mieter unsicher.	Karena itu beberapa penyewa merasa tidak aman.
Seit Wochen gibt es nachts starke Lärmbelästigung.	Selama berminggu-minggu terdapat gangguan kebisingan berat pada malam hari.
Die vereinbarten Ruhezeiten werden nicht eingehalten.	Waktu tenang yang disepakati tidak dipatuhi.
Ich möchte das Problem zunächst persönlich klären.	Saya ingin menyelesaikan masalah terlebih dahulu secara langsung.
Falls sich nichts ändert, informiere ich die Hausverwaltung.	Jika tidak ada perubahan, saya akan memberi tahu pengelola properti.
Die Nebenkostenabrechnung ist für mich nicht nachvollziehbar.	Perhitungan biaya tambahan sewa tidak dapat saya pahami.
Könnten Sie mir die einzelnen Kosten erklären?	Bisakah Anda menjelaskan setiap biayanya kepada saya?
Der berechnete Wasserverbrauch erscheint mir zu hoch.	Konsumsi air yang dihitung tampak terlalu tinggi bagi saya.
Gegen die angekündigte Mieterhöhung habe ich Fragen.	Saya memiliki pertanyaan mengenai kenaikan sewa yang diumumkan.
Ab welchem Datum gilt die neue Miete?	Mulai tanggal berapa harga sewa baru berlaku?
Beim Einzug habe ich eine Kaution bezahlt.	Saat masuk saya membayar deposit sewa.
Wann wird mir die Kaution zurückgezahlt?	Kapan deposit sewa dikembalikan kepada saya?
Wir möchten den Mietvertrag fristgerecht kündigen.	Kami ingin mengakhiri kontrak sewa sesuai tenggat.
Die Wohnungsübergabe kann Ende Juni stattfinden.	Serah terima tempat tinggal dapat berlangsung akhir Juni.
Bitte teilen Sie uns mit, was wir vorbereiten müssen.	Tolong beri tahu kami apa yang harus dipersiapkan.
Hiermit widerrufe ich den abgeschlossenen Vertrag.	Dengan ini saya membatalkan kontrak yang telah dibuat.
Die Widerrufsfrist ist noch nicht abgelaufen.	Batas waktu pembatalannya belum berakhir.
Ich möchte mein Abonnement zum Monatsende beenden.	Saya ingin mengakhiri langganan pada akhir bulan.
Bitte senden Sie mir eine Kündigungsbestätigung.	Tolong kirimkan konfirmasi pembatalan kepada saya.
Ohne meine Zustimmung wurde der Vertrag verlängert.	Kontrak diperpanjang tanpa persetujuan saya.
Bei meiner letzten Bestellung gab es mehrere Probleme.	Ada beberapa masalah pada pesanan terakhir saya.
Das Paket kam deutlich später als angekündigt.	Paket tiba jauh lebih lambat daripada yang diumumkan.
Außerdem war die Verpackung stark beschädigt.	Selain itu kemasannya rusak berat.
Ein Teil der Bestellung hat gefehlt.	Sebagian pesanan tidak ada.
Der gelieferte Artikel entspricht nicht der Beschreibung.	Barang yang dikirim tidak sesuai dengan deskripsi.
Das Gerät weist bereits nach wenigen Tagen einen Defekt auf.	Perangkat mengalami kerusakan setelah baru beberapa hari.
Ich habe die Gebrauchsanweisung genau befolgt.	Saya mengikuti petunjuk penggunaan dengan tepat.
Trotzdem lässt sich das Gerät nicht einschalten.	Meskipun demikian perangkat tidak dapat dinyalakan.
Anbei sende ich Ihnen Fotos des Schadens.	Bersama ini saya mengirimkan foto kerusakannya.
Der Kaufbeleg befindet sich ebenfalls im Anhang.	Bukti pembelian juga terdapat pada lampiran.
Ich möchte den Artikel kostenlos zurücksenden.	Saya ingin mengirim kembali barang tersebut tanpa biaya.
Bitte stellen Sie mir ein Rücksendeetikett zur Verfügung.	Tolong sediakan label pengiriman kembali untuk saya.
Ich wünsche entweder einen Ersatz oder eine Rückerstattung.	Saya menginginkan barang pengganti atau pengembalian uang.
Eine Reparatur kommt für mich nicht infrage.	Perbaikan bukan pilihan bagi saya.
Wann kann ich mit der Rückzahlung rechnen?	Kapan saya dapat mengharapkan pengembalian uang?
Trotz meiner Zahlung wurde eine Mahngebühr berechnet.	Meskipun saya sudah membayar, biaya pengingat tetap dikenakan.
Als Nachweis sende ich die Zahlungsbestätigung mit.	Sebagai bukti saya menyertakan konfirmasi pembayaran.
Bitte korrigieren Sie die Rechnung entsprechend.	Tolong perbaiki tagihan tersebut sebagaimana mestinya.
Ihre bisherige Antwort löst das Problem leider nicht.	Jawaban Anda sejauh ini sayangnya tidak menyelesaikan masalah.
Ich bitte daher um eine erneute Prüfung.	Oleh karena itu saya meminta pemeriksaan ulang.
Sollte ich keine Antwort erhalten, wende ich mich an die Verbraucherberatung.	Jika tidak menerima jawaban, saya akan menghubungi layanan konsultasi konsumen.
Ich hoffe weiterhin auf eine faire Lösung.	Saya tetap berharap pada solusi yang adil.
Bitte melden Sie sich innerhalb der nächsten sieben Tage.	Tolong hubungi saya dalam tujuh hari ke depan.
Vielen Dank für die Bearbeitung meiner Beschwerde.	Terima kasih atas penanganan keluhan saya.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-mobilitaet-reise', name: 'Jerman B1 · Kata Mobilitas & Perjalanan', summary: 'Gangguan transportasi, rute alternatif, perjalanan terencana, perlindungan perjalanan, dan mobilitas berkelanjutan.', description: 'Kosakata B1 untuk memahami pengumuman, membandingkan pilihan perjalanan, dan menangani gangguan.', level: 'menengah', category: 'perjalanan', color: '#496F7C', featured: true,
    entries: rows('word', 'b1-mobilitaet', `
die Mobilität	mobilitas
die Verkehrslage	kondisi lalu lintas
die Verkehrsmeldung, die Verkehrsmeldungen	laporan lalu lintas
die Verkehrsverbindung, die Verkehrsverbindungen	koneksi transportasi
das Verkehrsmittel, die Verkehrsmittel	alat transportasi
der Berufsverkehr	lalu lintas jam kerja
der Stau, die Staus	kemacetan
die Baustelle, die Baustellen	lokasi konstruksi
die Straßensperrung, die Straßensperrungen	penutupan jalan
die Umleitung, die Umleitungen	rute pengalihan
der Schienenersatzverkehr	transportasi pengganti kereta
der Ersatzbus, die Ersatzbusse	bus pengganti
der Zugausfall, die Zugausfälle	pembatalan kereta
die Betriebsstörung, die Betriebsstörungen	gangguan operasional
die Anschlussverbindung, die Anschlussverbindungen	koneksi perjalanan lanjutan
die Wartezeit, die Wartezeiten	waktu tunggu
die Erstattung, die Erstattungen	penggantian biaya
das Fahrgastrechteformular, die Fahrgastrechteformulare	formulir hak penumpang
die Sitzplatzreservierung, die Sitzplatzreservierungen	reservasi tempat duduk
die Fahrgemeinschaft, die Fahrgemeinschaften	berbagi kendaraan
die Mitfahrgelegenheit, die Mitfahrgelegenheiten	kesempatan ikut kendaraan
das Carsharing	layanan berbagi mobil
der Radweg, die Radwege	jalur sepeda
die Fußgängerzone, die Fußgängerzonen	zona pejalan kaki
die Umweltzone, die Umweltzonen	zona rendah emisi
die Reiseplanung	perencanaan perjalanan
die Reiseroute, die Reiserouten	rute perjalanan
das Reiseziel, die Reiseziele	tujuan perjalanan
die Zwischenstation, die Zwischenstationen	persinggahan
der Zwischenstopp, die Zwischenstopps	pemberhentian sementara
der Aufenthalt, die Aufenthalte	masa tinggal
die Reisezeit, die Reisezeiten	waktu perjalanan
die Hauptsaison, die Hauptsaisons	musim ramai
die Nebensaison, die Nebensaisons	musim sepi
die Pauschalreise, die Pauschalreisen	paket wisata
die Individualreise, die Individualreisen	perjalanan mandiri
die Reiseversicherung, die Reiseversicherungen	asuransi perjalanan
der Versicherungsschutz	perlindungan asuransi
die Gepäckversicherung, die Gepäckversicherungen	asuransi bagasi
der Gepäckverlust	kehilangan bagasi
die Beschädigung, die Beschädigungen	kerusakan
die Reisebeschwerde, die Reisebeschwerden	keluhan perjalanan
die Unterkunftsbewertung, die Unterkunftsbewertungen	ulasan akomodasi
die Stornierungsbedingung, die Stornierungsbedingungen	ketentuan pembatalan
die Buchungsgebühr, die Buchungsgebühren	biaya pemesanan
umleiten	mengalihkan rute
ausfallen	dibatalkan atau tidak beroperasi
erstatten	mengganti biaya
umbuchen	mengubah pemesanan
sich verspäten	mengalami keterlambatan
verkehrsgünstig	mudah dijangkau dengan transportasi
barrierefrei	mudah diakses penyandang disabilitas
klimafreundlich	ramah iklim
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-reise-problemloesung', name: 'Jerman B1 · Frasa Perjalanan & Penyelesaian Masalah', summary: 'Ungkapan untuk membandingkan transportasi, merencanakan perjalanan, memahami gangguan, dan meminta penyelesaian.', description: 'Frasa B1 untuk pengumuman perjalanan, diskusi perencanaan, dan keluhan kepada operator atau akomodasi.', level: 'menengah', category: 'perjalanan', color: '#578391', featured: true,
    entries: rows('phrase', 'b1-reise', `
Welche Verbindung ist am schnellsten?	Koneksi perjalanan mana yang paling cepat?
Die günstigste Verbindung dauert allerdings länger.	Namun koneksi yang paling murah memerlukan waktu lebih lama.
Wir sollten Reisezeit und Kosten miteinander vergleichen.	Kita sebaiknya membandingkan waktu perjalanan dan biaya.
Mit der Bahn können wir unterwegs arbeiten.	Dengan kereta kita dapat bekerja selama perjalanan.
Das Auto bietet mehr Flexibilität vor Ort.	Mobil menawarkan lebih banyak fleksibilitas di tempat tujuan.
Andererseits müssen wir mit Stau rechnen.	Di sisi lain kita harus memperhitungkan kemacetan.
Eine Fahrgemeinschaft wäre günstiger und klimafreundlicher.	Berbagi kendaraan akan lebih murah dan ramah iklim.
Für kurze Strecken nehme ich möglichst das Fahrrad.	Untuk jarak pendek saya sebisa mungkin menggunakan sepeda.
Der neue Radweg macht den Arbeitsweg sicherer.	Jalur sepeda baru membuat perjalanan kerja lebih aman.
Die Unterkunft ist mit öffentlichen Verkehrsmitteln gut erreichbar.	Akomodasinya mudah dijangkau dengan transportasi umum.
Wir reisen lieber in der Nebensaison.	Kami lebih suka bepergian pada musim sepi.
Dann sind die Preise niedriger und die Orte ruhiger.	Pada saat itu harga lebih rendah dan tempat-tempat lebih tenang.
Ich plane die Reiseroute im Voraus.	Saya merencanakan rute perjalanan sebelumnya.
Unterwegs möchten wir zwei Zwischenstopps einlegen.	Dalam perjalanan kami ingin melakukan dua pemberhentian.
Für den Aufenthalt sind fünf Tage vorgesehen.	Lima hari direncanakan untuk masa tinggal.
Sollten wir eine Reiseversicherung abschließen?	Apakah kita sebaiknya mengambil asuransi perjalanan?
Prüfen Sie vorher, welche Leistungen versichert sind.	Periksa terlebih dahulu layanan apa yang diasuransikan.
Die Buchung kann bis eine Woche vorher kostenlos storniert werden.	Pemesanan dapat dibatalkan gratis sampai satu minggu sebelumnya.
Bei einer Umbuchung fällt eine Gebühr an.	Perubahan pemesanan dikenai biaya.
Bitte lesen Sie die Stornierungsbedingungen sorgfältig.	Tolong baca ketentuan pembatalan dengan teliti.
Wegen einer technischen Störung fällt der Zug aus.	Karena gangguan teknis kereta dibatalkan.
Zwischen den Bahnhöfen fahren Ersatzbusse.	Bus pengganti beroperasi di antara stasiun.
Dadurch verlängert sich die Reisezeit um etwa eine Stunde.	Karena itu waktu perjalanan bertambah sekitar satu jam.
Bitte beachten Sie die geänderten Abfahrtszeiten.	Harap perhatikan perubahan waktu keberangkatan.
Aufgrund einer Baustelle wird die Linie umgeleitet.	Karena lokasi konstruksi, jalur dialihkan.
Die Haltestelle am Rathaus wird heute nicht bedient.	Halte di balai kota tidak dilayani hari ini.
Fahrgäste müssen am Hauptbahnhof umsteigen.	Penumpang harus berganti kendaraan di stasiun utama.
Mein Anschlusszug ist inzwischen abgefahren.	Kereta lanjutan saya sementara itu sudah berangkat.
Welche alternative Verbindung kann ich nehmen?	Koneksi alternatif mana yang dapat saya gunakan?
Kann meine Sitzplatzreservierung übertragen werden?	Bisakah reservasi tempat duduk saya dipindahkan?
Wegen der Verspätung habe ich meinen Termin verpasst.	Karena keterlambatan saya melewatkan janji.
Ab sechzig Minuten besteht Anspruch auf eine Erstattung.	Mulai keterlambatan enam puluh menit terdapat hak atas penggantian biaya.
Wo erhalte ich das Fahrgastrechteformular?	Di mana saya memperoleh formulir hak penumpang?
Bitte bestätigen Sie mir die Verspätung.	Tolong konfirmasikan keterlambatan tersebut kepada saya.
Mein Gepäck wurde während der Fahrt beschädigt.	Bagasi saya rusak selama perjalanan.
Einer meiner Koffer ist nicht angekommen.	Salah satu koper saya tidak tiba.
Wo kann ich den Gepäckverlust melden?	Di mana saya dapat melaporkan kehilangan bagasi?
Hier ist die Nummer meines Gepäckscheins.	Ini nomor tanda terima bagasi saya.
Wann wird der Koffer voraussichtlich geliefert?	Kapan koper tersebut kemungkinan dikirimkan?
Die Reiseversicherung benötigt eine schriftliche Bestätigung.	Asuransi perjalanan memerlukan konfirmasi tertulis.
Das gebuchte Zimmer war bei unserer Ankunft nicht verfügbar.	Kamar yang dipesan tidak tersedia saat kami tiba.
Uns wurde eine andere Unterkunft angeboten.	Kami ditawari akomodasi lain.
Diese lag jedoch weit außerhalb des Zentrums.	Namun akomodasi tersebut terletak jauh di luar pusat kota.
Außerdem entsprach die Ausstattung nicht der Buchung.	Selain itu fasilitasnya tidak sesuai dengan pemesanan.
Wir mussten deshalb zusätzliche Fahrtkosten bezahlen.	Oleh sebab itu kami harus membayar biaya perjalanan tambahan.
Ich bitte um Erstattung dieser zusätzlichen Kosten.	Saya meminta penggantian biaya tambahan tersebut.
Anbei finden Sie die entsprechenden Belege.	Pada lampiran Anda menemukan bukti terkait.
Die Unterkunft hat auf meine Beschwerde nicht reagiert.	Pihak akomodasi tidak menanggapi keluhan saya.
Könnten Sie den Fall bitte überprüfen?	Bisakah Anda memeriksa kasus tersebut?
Wir erwarten eine angemessene Lösung.	Kami mengharapkan penyelesaian yang wajar.
Trotz der Probleme war das Reiseziel sehr sehenswert.	Meskipun ada masalah, tujuan perjalanannya sangat layak dikunjungi.
Beim nächsten Mal werde ich flexibler planen.	Lain kali saya akan merencanakan dengan lebih fleksibel.
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-kata-medien-digital', name: 'Jerman B1 · Kata Media & Dunia Digital', summary: 'Berita, sumber, jejaring sosial, privasi, keamanan akun, iklan, komentar, dan layanan daring.', description: 'Kosakata B1 untuk menggunakan media secara sadar dan menilai informasi digital dalam kehidupan sehari-hari.', level: 'menengah', category: 'lainnya', color: '#665F82', featured: true,
    entries: rows('word', 'b1-medien', `
die Berichterstattung	pemberitaan
der Nachrichtenbeitrag, die Nachrichtenbeiträge	segmen berita
die Pressemitteilung, die Pressemitteilungen	siaran pers
die Überschrift, die Überschriften	judul tulisan
die Bildunterschrift, die Bildunterschriften	keterangan gambar
der Hintergrundbericht, die Hintergrundberichte	laporan latar belakang
die Informationsquelle, die Informationsquellen	sumber informasi
die Quellenangabe, die Quellenangaben	keterangan sumber
die Glaubwürdigkeit	kredibilitas
die Behauptung, die Behauptungen	klaim
die Tatsache, die Tatsachen	fakta
die Falschmeldung, die Falschmeldungen	berita palsu
die Fehlinformation, die Fehlinformationen	informasi keliru
die Kommentarregeln	aturan berkomentar
die Veröffentlichung, die Veröffentlichungen	publikasi
die Reichweite	jangkauan audiens
die Zielgruppe, die Zielgruppen	target audiens
die Werbung, die Werbungen	iklan
die Werbeanzeige, die Werbeanzeigen	tampilan iklan
der Werbeblocker, die Werbeblocker	pemblokir iklan
das soziale Netzwerk, die sozialen Netzwerke	jejaring sosial
der Nutzer, die Nutzer	pengguna laki-laki
die Nutzerin, die Nutzerinnen	pengguna perempuan
das Nutzerkonto, die Nutzerkonten	akun pengguna
das Benutzerprofil, die Benutzerprofile	profil pengguna
der Beitrag, die Beiträge	unggahan atau kontribusi
der Kommentar, die Kommentare	komentar
die Bewertung, die Bewertungen	ulasan atau penilaian
die Empfehlung, die Empfehlungen	rekomendasi
die Benachrichtigung, die Benachrichtigungen	notifikasi
die Bildschirmzeit	waktu penggunaan layar
die Mediennutzung	penggunaan media
die Privatsphäre	privasi
die Datenschutzrichtlinie, die Datenschutzrichtlinien	kebijakan perlindungan data
die Datensicherheit	keamanan data
die Einwilligung, die Einwilligungen	persetujuan
die Datenschutzeinstellung, die Datenschutzeinstellungen	pengaturan privasi
die Zugriffsberechtigung, die Zugriffsberechtigungen	izin akses
die Sicherheitslücke, die Sicherheitslücken	celah keamanan
der Datenmissbrauch	penyalahgunaan data
der Identitätsdiebstahl	pencurian identitas
die Betrugsmasche, die Betrugsmaschen	modus penipuan
die Phishing-Mail, die Phishing-Mails	surel phishing
die Zwei-Faktor-Authentifizierung	autentikasi dua faktor
die Sicherungskopie, die Sicherungskopien	salinan cadangan
die Nutzungsbedingung, die Nutzungsbedingungen	ketentuan penggunaan
die Störungsmeldung, die Störungsmeldungen	laporan gangguan
die Internetstörung, die Internetstörungen	gangguan internet
die Aktualisierung, die Aktualisierungen	pembaruan
recherchieren	melakukan riset informasi
weitergeben	meneruskan atau membagikan
überprüfen	memeriksa kebenaran
löschen	menghapus
sperren	memblokir
missbrauchen	menyalahgunakan
`),
  }),
  curatedGermanDeck({
    id: 'de-id-b1-frasa-information-internet', name: 'Jerman B1 · Frasa Informasi & Internet', summary: 'Ungkapan untuk mengevaluasi berita, membahas penggunaan media, melindungi data, dan menangani masalah layanan digital.', description: 'Frasa B1 untuk membaca kritis, diskusi media, keamanan akun, dan komunikasi dengan penyedia layanan.', level: 'menengah', category: 'lainnya', color: '#796F96', featured: true,
    entries: rows('phrase', 'b1-internet', `
Ich informiere mich täglich über verschiedene Medien.	Saya mencari informasi setiap hari melalui berbagai media.
Dabei vergleiche ich mehrere Nachrichtenquellen.	Dalam prosesnya saya membandingkan beberapa sumber berita.
Die Überschrift gibt den Inhalt nur teilweise wieder.	Judulnya hanya mencerminkan sebagian isi.
Der Artikel nennt keine überprüfbare Quelle.	Artikel tersebut tidak menyebutkan sumber yang dapat diperiksa.
Diese Behauptung wird nicht ausreichend belegt.	Klaim ini tidak didukung dengan cukup bukti.
Man sollte zwischen Meinung und Tatsache unterscheiden.	Kita sebaiknya membedakan antara pendapat dan fakta.
Die Bilder stammen offenbar aus einem anderen Zusammenhang.	Gambar-gambar tersebut tampaknya berasal dari konteks lain.
Das Veröffentlichungsdatum ist bereits mehrere Jahre alt.	Tanggal publikasinya sudah berusia beberapa tahun.
Bevor ich etwas teile, prüfe ich die Informationen.	Sebelum membagikan sesuatu, saya memeriksa informasinya.
Eine Falschmeldung kann sich sehr schnell verbreiten.	Berita palsu dapat menyebar dengan sangat cepat.
Korrekturen erreichen oft weniger Menschen als die ursprüngliche Meldung.	Koreksi sering menjangkau lebih sedikit orang daripada berita aslinya.
Vertrauenswürdige Berichte nennen ihre Quellen deutlich.	Laporan terpercaya menyebutkan sumbernya dengan jelas.
In diesem Beitrag kommen mehrere Seiten zu Wort.	Dalam laporan ini beberapa pihak mendapat kesempatan berbicara.
Die Berichterstattung wirkt insgesamt ausgewogen.	Pemberitaannya secara keseluruhan tampak seimbang.
In den Kommentaren werden sehr unterschiedliche Ansichten vertreten.	Pendapat yang sangat berbeda disampaikan dalam komentar.
Manche Diskussionen werden schnell unsachlich.	Beberapa diskusi dengan cepat menjadi tidak objektif.
Kritik sollte respektvoll formuliert werden.	Kritik sebaiknya dirumuskan secara hormat.
Meinungsfreiheit bedeutet nicht, andere beleidigen zu dürfen.	Kebebasan berpendapat tidak berarti boleh menghina orang lain.
Soziale Netzwerke nutze ich hauptsächlich für private Kontakte.	Saya menggunakan jejaring sosial terutama untuk kontak pribadi.
Berufliche Informationen teile ich nur eingeschränkt.	Saya hanya membagikan informasi profesional secara terbatas.
Zu viele Benachrichtigungen lenken mich bei der Arbeit ab.	Terlalu banyak notifikasi mengalihkan perhatian saya saat bekerja.
Deshalb habe ich die meisten Hinweise ausgeschaltet.	Oleh karena itu saya mematikan sebagian besar pemberitahuan.
Ich versuche, meine tägliche Bildschirmzeit zu begrenzen.	Saya berusaha membatasi waktu layar harian.
Abends lege ich das Handy bewusst zur Seite.	Pada malam hari saya sengaja meletakkan telepon genggam.
Gezielte Werbung basiert häufig auf gesammelten Nutzerdaten.	Iklan tertarget sering didasarkan pada data pengguna yang dikumpulkan.
Nicht jede Empfehlung ist unabhängig.	Tidak setiap rekomendasi bersifat independen.
Bezahlte Inhalte sollten deutlich gekennzeichnet sein.	Konten berbayar seharusnya ditandai dengan jelas.
Vor der Registrierung lese ich die Datenschutzeinstellungen.	Sebelum mendaftar saya membaca pengaturan privasi.
Die App verlangt mehr Zugriffsrechte als nötig.	Aplikasi meminta lebih banyak izin akses daripada yang diperlukan.
Ich erlaube nur den Zugriff auf notwendige Daten.	Saya hanya mengizinkan akses ke data yang diperlukan.
Persönliche Informationen gehören nicht in ein öffentliches Profil.	Informasi pribadi tidak seharusnya berada di profil publik.
Für jedes Nutzerkonto verwende ich ein eigenes Passwort.	Untuk setiap akun pengguna saya memakai kata sandi tersendiri.
Ein sicheres Passwort sollte nicht leicht zu erraten sein.	Kata sandi yang aman seharusnya tidak mudah ditebak.
Zusätzlich habe ich die Zwei-Faktor-Authentifizierung aktiviert.	Selain itu saya telah mengaktifkan autentikasi dua faktor.
Diese Nachricht fordert mich zur Eingabe meiner Zugangsdaten auf.	Pesan ini meminta saya memasukkan data akses.
Der Absender der E-Mail kommt mir verdächtig vor.	Pengirim surel itu tampak mencurigakan bagi saya.
Ich öffne keine Anhänge von unbekannten Personen.	Saya tidak membuka lampiran dari orang yang tidak dikenal.
Vermutlich handelt es sich um einen Betrugsversuch.	Kemungkinan ini merupakan percobaan penipuan.
Das betroffene Konto wurde vorsorglich gesperrt.	Akun yang terdampak telah diblokir sebagai tindakan pencegahan.
Ich habe den Datenmissbrauch sofort gemeldet.	Saya segera melaporkan penyalahgunaan data.
Regelmäßige Sicherungskopien schützen vor Datenverlust.	Salinan cadangan teratur melindungi dari kehilangan data.
Wichtige Aktualisierungen sollte man zeitnah installieren.	Pembaruan penting sebaiknya dipasang secepatnya.
Seit dem Update startet die Anwendung nicht mehr.	Sejak pembaruan aplikasi tidak lagi dapat dimulai.
Die Internetverbindung ist seit dem Morgen instabil.	Koneksi internet tidak stabil sejak pagi.
Ich habe den Router bereits neu gestartet.	Saya telah memulai ulang router.
Die Störung betrifft offenbar die ganze Nachbarschaft.	Gangguan tampaknya berdampak pada seluruh lingkungan.
Wann wird der Dienst voraussichtlich wieder verfügbar sein?	Kapan layanan tersebut kemungkinan tersedia kembali?
Bitte informieren Sie mich über den aktuellen Stand.	Tolong beri tahu saya mengenai status terkini.
Für den Ausfall bitte ich um eine Gutschrift.	Saya meminta kredit tagihan atas gangguan layanan.
Der Kundenservice hat mein Problem nachvollziehbar erklärt.	Layanan pelanggan menjelaskan masalah saya dengan dapat dipahami.
Digitale Angebote erleichtern viele Aufgaben im Alltag.	Layanan digital mempermudah banyak tugas sehari-hari.
Gleichzeitig müssen Nutzer ihre Daten bewusst schützen.	Pada saat yang sama pengguna harus melindungi data dengan sadar.
Medienkompetenz wird deshalb immer wichtiger.	Oleh sebab itu literasi media menjadi semakin penting.
Ein kritischer Umgang mit Informationen schützt vor Täuschung.	Sikap kritis terhadap informasi melindungi dari penipuan.
`),
  }),
];
