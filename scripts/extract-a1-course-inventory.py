#!/usr/bin/env python3
"""Build the editorial inventory for the licensed A1 course book.

The source PDF is intentionally not copied into the repository. This script records the
manually checked Lernwortschatz and Redemittel found on the cited PDF pages so later
catalog work has stable, reviewable source coverage.
"""
from csv import DictWriter
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "docs/content/a1-lern-deutsch-jetzt-inventory.tsv"
rows: list[dict[str, str]] = []

def kind(text: str) -> str:
    sentence_marks = ("?", "!", ".")
    if text.endswith(sentence_marks) or text.lower().startswith(("ich ", "wir ", "sie ", "du ", "er ", "es ", "man ", "das ist", "wie ", "was ", "wo ", "wer ", "wann ", "welche ", "haben sie", "kann ich", "möchten sie", "guten appetit", "vielen dank", "herzliche grüße")):
        return "sentence"
    if " " in text.replace(" / ", "/") or "…" in text:
        return "phrase"
    return "word"

def add(chapter: int, pages: str, section: str, source: str, items: str, note: str = "") -> None:
    for item in (value.strip() for value in items.split("|") if value.strip()):
        rows.append({"chapter": str(chapter), "pdf_pages": pages, "section": section, "source_kind": source, "material_type": kind(item), "german": item, "note": note})

# Lernwortschatz: wording is normalized only for extraction noise (umlauts, capitalization,
# obvious spacing). Linguistic corrections from the source are flagged, not silently applied.
add(1,"17","Begrüßung und Verabschiedung","Lernwortschatz","Hallo|Moin|Guten Morgen|Guten Tag|Guten Abend|Gute Nacht|Tschüss|Ciao|Auf Wiedersehen|Auf Wiederhören")
add(1,"17","Persönliche Angaben","Lernwortschatz","der Name|der Vorname|der Nachname / der Familienname|die Adresse|die Telefonnummer / die Handynummer|die E-Mail-Adresse|das Geburtsdatum|der Wohnort|die Herkunft / das Herkunftsland|die Sprache|die Nationalität")
add(1,"17","Fragewörter und Fragen","Lernwortschatz","Wie?|Wer?|Wo?|Woher?|Was?|Wohnst du in …?|Kommst du aus …?")
add(1,"17","Zahlen 0–20","Lernwortschatz","null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig", "acht tidak tercetak pada daftar hasil ekstraksi; dicatat karena urutan 0–20 dan materi bab memuatnya")
add(1,"17","Sprachen","Lernwortschatz","Deutsch|Englisch|Indonesisch|Arabisch|Italienisch|Chinesisch|Türkisch")
add(1,"18","Grüßen und sich vorstellen","Redemittel","Hallo!|Guten Tag!|Guten Morgen!|Guten Abend!|Tschüss!|Auf Wiedersehen!|Gute Nacht!|Wer bist du?|Ich bin …|Wie heißt du?|Ich heiße …")
add(1,"18","Herkunft und Angaben","Redemittel","Wo wohnen Sie?|Wo wohnst du?|Ich wohne in …|Woher kommen Sie?|Woher kommst du?|Ich komme aus …|Welche Sprachen sprechen Sie?|Welche Sprachen sprichst du?|Ich spreche …|Wie ist Ihre Telefonnummer?|Wie ist deine Telefonnummer?|Wie ist Ihre E-Mail-Adresse?|Wie ist deine E-Mail-Adresse?|Wer ist das?|Das ist …")
add(1,"18","Befinden","Redemittel","Wie geht es Ihnen?|Wie geht's dir?|Wie geht's?|Danke, sehr gut.|Danke, gut.|Ganz gut.|Und Ihnen?|Und dir?")

add(2,"38","Aktivitäten","Lernwortschatz","aufstehen|duschen|frühstücken|essen|trinken|lernen|lesen|schlafen|spielen|joggen|telefonieren|besuchen|einkaufen|feiern|arbeiten")
add(2,"38","Zeitangaben","Lernwortschatz","morgens|abends|am Montag|am Dienstag|am Wochenende|von … bis …|heute|morgen|jeden Tag")
add(2,"38","Andere wichtige Wörter","Lernwortschatz","die Schule|das Buch|der Freund / die Freundin|das Bett|das Mittagessen / das Abendessen|die Arbeit|der Supermarkt|der Kaffee|die Zeit|die Musik")
add(2,"39","Aktivitäten und Zeit","Redemittel","Ich lerne Deutsch.|Ich lese ein Buch.|Ich spiele Fußball.|Ich schlafe gut.|Am Montag lerne ich.|Heute lese ich.|Morgen treffe ich Freunde.|Ich spiele am Nachmittag.|Ich schlafe am Abend.")
add(2,"39","Termin vereinbaren","Redemittel","Gehen wir am …?|Passt das?|Geht das?|Ja, gern!|Super!|Nein, das geht leider nicht.")
add(2,"39","Meinung und Reaktion","Redemittel","Das ist interessant.|Das ist langweilig.|Das macht Spaß!|Ich weiß nicht.|Ja.|Nein.|Doch!")
add(2,"39","Datum","Redemittel","der erste|der fünfte|der zwanzigste|Heute ist der dritte Mai.|Am dritten Mai lese ich.")

add(3,"61","Zu Hause","Lernwortschatz","das Haus|die Wohnung|das Zimmer|das Wohnzimmer|das Schlafzimmer|das Arbeitszimmer|die Küche|das Bad|der Flur|der Balkon|der Garten|das Dach|der Keller")
add(3,"61","Möbel und Geräte","Lernwortschatz","das Sofa|der Tisch|der Schreibtisch|der Stuhl|der Schrank|das Regal|der Nachttisch|der Spiegel|der Herd|der Kühlschrank|die Mikrowelle|der Fernseher|die Lampe|der Kamin")
add(3,"61","Wohnformen","Lernwortschatz","das Reihenhaus|das Bauernhaus|das Loft|das Hochhaus|das Mehrfamilienhaus|das Studentenwohnheim")
add(3,"61","Präpositionen","Lernwortschatz","in|auf|hinter|durch|über")
add(3,"61","Umgebung","Lernwortschatz","der Park|der Spielplatz|die Straße|die Ecke|das Café|der Supermarkt|die Bäckerei|die Post|der Fluss|der Markt|das Gebäude|die Nachbarschaft|das Viertel")
add(3,"61","Sonstige Verben","Lernwortschatz","sehen|lesen|treffen|finden|kennen|bringen|sein|haben|hängen (Bewegung)", "Sumber menulis hängen (Bewegung); bentuk transitif/posisi perlu diverifikasi pada tahap editorial")

add(4,"95","Familie","Lernwortschatz","die Familie|die Eltern|der Vater|die Mutter|der Sohn|die Tochter|der Bruder|die Schwester|der Onkel|die Tante|der Cousin|die Cousine|der Opa|die Oma|das Baby|die Zwillinge|das Kind|die Geschwister")
add(4,"95","Aktivitäten","Lernwortschatz","spielen|Musik hören|tanzen|singen|Filme sehen|Fotos machen|telefonieren|spazieren gehen|Picknick machen|wandern|klettern|feiern|kochen|grillen|Ski fahren|Schlittschuh laufen|Fahrrad fahren|helfen|lernen|reisen|essen|treffen|reden|lächeln|posten|besuchen")
add(4,"95","Freunde","Lernwortschatz","der Freund|die Freundin|die beste Freundin|der beste Freund|die Gruppe|der Klassenkamerad|der Besuch")
add(4,"95","Zeitangaben","Lernwortschatz","am Wochenende|jeden Tag|morgens|mittags|abends|früh|spät|manchmal|oft|immer")
add(4,"95","Trennbare Verben","Lernwortschatz","anfangen|anrufen|mitmachen|abholen|einladen|mitbringen|mitkommen|vorstellen|einsammeln|einkaufen")
add(4,"96","Adjektive","Lernwortschatz","freundlich|sportlich|lustig|laut|leise|cool|gemütlich|warm|kalt|müde|glücklich|schlank|stark|süß|fleißig|faul|entspannt|jung|neu")
add(4,"97","Familie beschreiben","Redemittel","In meiner Familie gibt es … Personen.|Ich habe … Geschwister.|Ich habe einen Bruder.|Ich habe eine Schwester.|Mein Vater heißt …|Meine Mutter heißt …|Mein Bruder heißt …|Meine Schwester heißt …|Er ist freundlich.|Sie ist nicht müde.|Er spielt gern …|Sie macht gern …|Wir machen zusammen …")

add(5,"116","Berufe und Arbeitsplatz","Lernwortschatz","der Beruf, die Berufe|der Chef, die Chefs|der Kunde, die Kunden|der Kollege, die Kollegen|die Kollegin, die Kolleginnen|die Autowerkstatt, die Autowerkstätten|die Arbeit, die Arbeiten|die Arbeitszeit, die Arbeitszeiten|die Aufgabe, die Aufgaben|der Bericht, die Berichte|die Besprechung, die Besprechungen|das Büro, die Büros|der Computer, die Computer|der Drucker, die Drucker|die E-Mail, die E-Mails|der Termin, die Termine|die Geschäftsreise")
add(5,"116","Arbeitstätigkeiten","Lernwortschatz","arbeiten|drucken|erledigen|erklären|sagen|schreiben|starten|treffen|vorbereiten|ausschalten|gefallen|geben|können|müssen|sollen|anbieten|annehmen|ablehnen|danken|helfen|zuhören")
add(5,"116","Arbeit beschreiben","Lernwortschatz","anstrengend|flexibel|frei|gut|modern|müde|stressig|zufrieden|pünktlich|draußen|freundlich|streng|unfreundlich")
add(5,"117","Beruf und Arbeitszeit","Redemittel","Was sind Sie von Beruf?|Was bist du von Beruf?|Ich arbeite als …|Ich bin …|Ich studiere …|Wie viele Stunden arbeitest du?|Wann fängt deine Arbeit an?|Wann hast du frei?|Wann haben Sie frei?|Gefällt dir die Arbeit?|Ich arbeite von … bis … Uhr.|Ich habe eine Stunde Mittagspause.|Meine Arbeit beginnt um … Uhr.")
add(5,"117","Hilfe und Pflichten","Redemittel","Kann ich Ihnen helfen?|Brauchen Sie Hilfe?|Kann ich dir helfen?|Kann ich Ihnen mit … helfen?|Ja, das ist sehr nett von Ihnen.|Helfen Sie mir bitte mit …|Nein, danke.|Das ist nicht nötig.|Ich brauche Ihre Hilfe.|Können Sie bitte …?|Was sind deine Aufgaben?|Was sind Ihre Aufgaben?|Meine Aufgaben sind …")
add(5,"117","Uhrzeit","Redemittel","Wie spät ist es?|Wie viel Uhr ist es?|Es ist halb drei.|Es ist kurz nach vier.|Um … Uhr.|von … bis …")

add(6,"137","Obst","Lernwortschatz","die Banane|der Apfel|die Birne|die Melone|die Kirsche|die Orange|die Mango|der Pfirsich|die Traube")
add(6,"137","Gemüse","Lernwortschatz","die Zucchini|die Gurke|die Karotte|die Kartoffel|die Tomate|der Mais|der Spinat|die Paprika|der Brokkoli")
add(6,"137","Andere Lebensmittel","Lernwortschatz","das Hähnchen|der Schinken|der Reis|der Kuchen|der Zucker|der Käse|das Fleisch|die Nudeln|der Fisch|das Brot|die Wurst|die Marmelade")
add(6,"137","Getränke","Lernwortschatz","der Tee|die Milch|das Bier|der Kaffee|der Saft|der Wein|die Cola|die Limonade|die Schokolade|der Kakao", "die Schokolade berada di kolom Getränke pada sumber; klasifikasi perlu diperiksa")
add(6,"137","Beim Essen","Lernwortschatz","frühstücken|trinken|essen|kochen|das Frühstück|das Mittagessen|das Abendessen|cremig|süß|schmecken|lecker|empfehlen|die Speisekarte|mögen")
add(6,"137-138","Beim Einkaufen","Lernwortschatz","möchten|bezahlen|nehmen|brauchen|billig|teuer|helfen|kosten|das Angebot")
add(6,"138","Tageszeiten","Lernwortschatz","jeden Morgen|morgens|am Mittag|mittags|abends|am Abend")
add(6,"138","Gerichte","Lernwortschatz","der Döner|die Spaghetti|der Apfelkuchen|der Käsekuchen|der Kartoffelsalat|die Apfelsaftschorle|die Currywurst|der Salat|das Hähnchen|das Schnitzel|die Tomatensuppe|das Spiegelei")
add(6,"138","Im Restaurant","Lernwortschatz","bestellen|die Rechnung|die Empfehlung|empfehlen|der Nachtisch|die Speisekarte|das Restaurant|Guten Appetit!|der Gast|die Gästin")
add(6,"138","Andere wichtige Wörter","Lernwortschatz","frisch|in der Mensa|zusammen|oft|manchmal|im Supermarkt|die Spezialität")
add(6,"139","Vorlieben und Essen","Redemittel","Essen Sie gern …?|Trinken Sie gern …?|Isst du gern …?|Trinkst du gern …?|Was essen Sie gern?|Was isst du nicht gern?|Was trinken Sie gern?|Was trinkst du nicht gern?|Ja, sehr gern.|Nein, nicht so gern.|Ich esse gern …|Ich trinke nicht gern …|Ich mag … sehr gern.|Ich mag keinen …|Zum Frühstück esse ich …|Mittags mag ich …|Ich bin satt.")
add(6,"139","Restaurant und Einkauf","Redemittel","Was möchten Sie bestellen?|Was möchten Sie essen?|Was möchten Sie trinken?|Ich hätte gern …|Ich möchte …|Können Sie mir etwas empfehlen?|Wir möchten bezahlen.|Zusammen oder getrennt?|Was darf es sein?|Sonst noch etwas?|Ist das alles?|Das macht … Euro.|Ich brauche …|Ich nehme …|Haben Sie …?|Wie viel kostet …?|Was kostet …?")

add(7,"171","Oberteile","Lernwortschatz","das T-Shirt|das Hemd|die Bluse|der Blazer|der Cardigan|der Pullover / der Pulli|der Hoodie|das Sweatshirt|die Jacke|der Mantel|das Kleid|das Wildlederkleid|der Rock|das Dirndl|das Top|die Weste|das Langarmshirt|das Poloshirt|die Strickjacke", "Sumber mencantumkan der Rock juga pada Oberteile; klasifikasi perlu diperiksa")
add(7,"171","Unterteile","Lernwortschatz","die Hose|die Jeans|der Rock|die kurze Hose|die Jogginghose|die Leggings|die Stoffhose|die Cargohose|die Caprihose|die Strumpfhose|die Lederhose")
add(7,"171","Accessoires und Schuhe","Lernwortschatz","das Kopftuch|die Stecknadel|die Brosche|die Mütze|der Gürtel|der Hut|der Schal|die Handschuhe|die Krawatte|die Brille|die Sonnenbrille|die Armbanduhr|der Schmuck|die Kette|der Ring|das Armband|die Ohrringe|die Schuhe|die Sandalen|die Stiefel|die Schnürstiefel|die Stiefeletten|die Turnschuhe|die Hausschuhe|der Rucksack|die Tasche|das Tuch|der Reißverschluss", "Sumber mencetak das Stecknadel; bentuk die Stecknadel dicatat sebagai koreksi ekstraksi yang perlu diverifikasi")
add(7,"171","Unterwäsche und Schlafkleidung","Lernwortschatz","die Unterhose|die Boxershorts|das Unterhemd|der Pyjama / der Schlafanzug|der BH / der Büstenhalter|das Nachthemd|die Schlafhose|die Haussocken")
add(7,"172","Farben","Lernwortschatz","rot|rosarot|dunkelrot|blau|hellblau|gelb|grün|dunkelgrün|orange|lila|rosa|braun|schwarz|weiß|grau|hellgrau|beige|bunt")
add(7,"172","Saison und Festzeiten","Lernwortschatz","der Winter|der Herbst|der Frühling|der Sommer|die Regenzeit|die Trockenzeit|das Oktoberfest")
add(7,"172","Adjektive","Lernwortschatz","nützlich|nutzlos|dünn|dick|gut|schlecht|bequem|unbequem|schön|hässlich|kurz|lang|warm|kalt|traditionell|modern|speziell|allgemein|neu|alt|groß|klein|teuer|billig|bunt|einfarbig|schick|unschick|nass|trocken")
add(7,"173","Kleiderkauf","Redemittel","Kann ich Ihnen helfen?|Ich suche ein Paar Schuhe.|Ich hätte gern einen Schal.|Wo finde ich …?|Wo gibt es …?|Welche Größe tragen Sie?|Welche Farbe möchten Sie?|Haben Sie das in Größe …?|Haben Sie das in Blau?|Wollen Sie das anprobieren?|Kann ich das anprobieren?|Wie steht mir das?|Das steht mir nicht.|Das passt nicht.|Das ist mir zu klein.|Das ist mir zu eng.|Das ist mir zu groß.|Wie viel kostet …?|Das ist zu teuer!|Ich nehme das Hemd.|Tut mir leid, das haben wir nicht.")

add(8,"189","Adjektive","Lernwortschatz","warm|kalt|gut|schlecht|kurz")
add(8,"189","Medikamente und Hausmittel","Lernwortschatz","die Salbe|der Hustensaft|das Pflaster|die Tropfen|die Tablette|die Nelke|der Honig")
add(8,"189","Körperteile","Lernwortschatz","der Mund|die Nase|der Arm|der Bauch|die Brust|der Ellbogen|der Fuß|der Hals|das Herz|die Hand|der Kopf")
add(8,"189","Beim Arzt","Lernwortschatz","der Unfall|der Husten|der Schnupfen|der Zahnarzt|der Apotheker|der Arzthelfer|das Krankenhaus|der Notarzt|die Apotheke|das Medikament|die Bauchschmerzen|die Rückenschmerzen|der Schmerz|die Kopfschmerzen|der Tipp|die Krankenschwester|der Physiotherapeut|Aua!|wehtun|das Halsweh|das Mittel")
add(8,"190","Arzt und Apotheke","Redemittel","Was fehlt Ihnen?|Wo haben Sie Schmerzen?|Tut das weh?|Haben Sie Kopfschmerzen?|Ich schreibe Ihnen ein Rezept.|Ich fühle mich nicht gut.|Mir geht es nicht gut.|Ich habe Bauchschmerzen.|Mein Arm tut weh.|Wie oft soll ich die Medikamente nehmen?|Wann soll ich die Medikamente nehmen?|Darf ich rauchen?|Wann darf ich wieder Sport machen?|Wie lange muss ich im Bett bleiben?|Ich brauche eine Krankenschreibung.|Trinken Sie viel Wasser!|Nehmen Sie die Tablette nach dem Essen!|Schlafen Sie viel!")

add(9,"204","Freizeitverben und Perfekt","Lernwortschatz","schwimmen – ist geschwommen|Fußball spielen – hat Fußball gespielt|kochen – hat gekocht|Musik hören – hat Musik gehört|tanzen – hat getanzt|Fahrrad fahren – ist Fahrrad gefahren|lesen – hat gelesen|fotografieren – hat fotografiert|singen – hat gesungen|malen – hat gemalt|reisen – ist gereist|machen – hat gemacht|joggen – hat gejoggt|backen – hat gebacken|reden – hat geredet|sprechen – hat gesprochen|schmecken – hat geschmeckt|anrufen – hat angerufen|antworten – hat geantwortet|lernen – hat gelernt|bekommen – hat bekommen|ansehen – hat angesehen|aussehen – hat ausgesehen|empfehlen – hat empfohlen|erzählen – hat erzählt|entdecken – hat entdeckt|verstehen – hat verstanden|aufstehen – ist aufgestanden|mitkommen – ist mitgekommen|ankommen – ist angekommen|lachen – hat gelacht|genießen – hat genossen|umtauschen – hat umgetauscht")
add(9,"204","Nomen","Lernwortschatz","die Freizeit|das Hobby|der Freund|die Freundin|die Familie|die Stadt|die Schule|das Wochenende|das Stadion|der Vater|die Mutter|der Freitag|die Kirche|der Bahnhof|die Schwester|die Großeltern|die Katze|die Nachbarn|der Chef|der Hund|das Restaurant|der Samstag")
add(9,"205","Orte und Erlebnisse","Lernwortschatz","das Museum|das Bild|das Foto|die Altstadt|der Ausflug|das Schloss|die Brücke|die Sehenswürdigkeiten|ins Stadion gehen|im Stadion|zum Yoga gehen|ins Café gehen|nach Hause|im Stadtmuseum|ins Bett gehen|zu Hause|unterwegs")
add(9,"205","Adjektive und Angaben","Lernwortschatz","super|neu|sehr gut|spät|müde|toll|aktiv|außerhalb|sauber|günstig|lustig|oft|manchmal|gemeinsam")
add(9,"205","Zeitangaben","Lernwortschatz","jeden Tag|gestern|letztes Wochenende|vor zwei Tagen|vorgestern|letzten Monat")
add(9,"206","Freizeit und Erlebnisse","Redemittel","Was machen Sie gern?|Was machst du gern?|Was machen Sie in Ihrer Freizeit?|Was machst du in deiner Freizeit?|Hast du ein Hobby?|Mein Hobby ist …|Meine Hobbys sind …|Ich lese gern Bücher.|Ich gehe gern spazieren.|Gehst du gern ins Kino?|Ja, gern.|Nein, nicht so gern.|Es geht so.|Was hast du letztes Wochenende gemacht?|Ich habe Freunde besucht.|Erzähl mir von deinem letzten Urlaub!|Was machst du heute mit deinen Freunden?|Wir treffen uns um … Uhr.")

add(10,"225","Reisevorbereitungen","Lernwortschatz","der Koffer|packen|der Schlafanzug|der Badeanzug|die Regenhose|die Turnschuhe|die Handtasche|die Sonnenbrille|der Regenschirm|die Snacks|buchen|eine Reise machen|den Koffer packen|sich vorbereiten")
add(10,"225","Reiseziele und Verkehrsmittel","Lernwortschatz","nach Wien fahren|campen|das Wohnmobil|das Zelt|die Rückfahrt|die U-Bahn|die Haltestelle|der Hauptbahnhof|das Lagerfeuer|die Fahrradtour|der See|die Berge|mit dem Zug fahren|mit dem Auto fahren|mit dem Bus fahren|zu Fuß gehen|aussteigen|der Gasthof|die Spezialität|die Berliner Mauer|der Kölner Dom|der Tourist|der Rhein|der Fluss|das Eis|das Bier|die Currywurst|die Kunst")
add(10,"225","Wetter","Lernwortschatz","das Wetter|sonnig|regnen|heiß|Es hat plötzlich geregnet.")
add(10,"225","Städtereise und Aktivitäten","Lernwortschatz","das Schloss besuchen|die Altstadt besichtigen|ein Museum besuchen|eine Stadtführung machen|ins Theater gehen|Souvenirs kaufen|Spezialitäten probieren|einen Apfelstrudel essen|Riesenrad fahren|einen Spaziergang machen|Sehenswürdigkeiten sehen|Musik hören|grillen|kochen|sich verfahren")
add(10,"225-226","Orientierung in der Stadt","Lernwortschatz","der Stadtplan|die Straße|die Kreuzung|die Ampel|die Ecke|der Platz|das Hotel|die Bank|die Bäckerei|das Café|die Post|der Bahnhof|der Kiosk|fragen|zeigen|suchen")
add(10,"226","Reiseberichte und Postkarte","Lernwortschatz","Ich war letzten Sommer in …|Die Stadt hat mir sehr gut gefallen.|Ich bin viel zu Fuß gegangen.|Ich habe mich verfahren.|Eine nette Frau hat mir geholfen.|Das Wetter war meistens sonnig.|Ich habe Brezen gegessen.|das Lagerfeuer|die Aussicht|Herzliche Grüße aus …|Es ist sehr schön hier.|Ich habe … besucht.|Ich habe viel erlebt.|Ich möchte … wieder besuchen.")
add(10,"227","Urlaub planen und Orientierung","Redemittel","Entschuldigung, könnten Sie mir helfen?|Ich suche den Bahnhof.|Wo ist bitte …?|Wie komme ich zu …?|Gehen Sie rechts.|Gehen Sie links.|Gehen Sie geradeaus.|An der Haltestelle steigt man ein.|Man steigt an der Haltestelle um.|Man steigt am … Platz aus.|Nehmen Sie die erste Straße rechts.|Nehmen Sie die zweite Straße links.|Ja, genau.|Vielen Dank.|Bitte, gern.")
add(10,"227","Postkarte schreiben","Redemittel","Hallo …|Liebe …|Lieber …|Herzliche Grüße aus …|Hier gibt es viele Sehenswürdigkeiten.|Gestern habe ich … besucht.|Man kann hier viel machen.|Morgen besuche ich …|Bis bald!|Viele Grüße!")

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", encoding="utf-8", newline="") as handle:
    writer = DictWriter(handle, fieldnames=["chapter", "pdf_pages", "section", "source_kind", "material_type", "german", "note"], delimiter="\t", lineterminator="\n")
    writer.writeheader(); writer.writerows(rows)
print(f"{len(rows)} source records written to {OUT}")
