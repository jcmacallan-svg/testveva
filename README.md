# Military Vocabulary Quiz - GitHub Pages

Dit is een **statische GitHub Pages-versie** van de quiz.

## Wat werkt op GitHub Pages
- student voert naam/klas in
- meerkeuzequiz in de browser
- automatisch nakijken
- screenshot uploaden
- lokale opslag in de browser
- JSON-inzending downloaden om bij de docent in te leveren

## Wat niet werkt op gewone GitHub Pages
GitHub Pages heeft **geen backend**. Daardoor werkt dit niet centraal online:
- echte login met accounts
- server-side opslag van alle leerlingen
- docentdashboard met alle uploads van alle studenten

Voor die functies heb je Render, Railway, Supabase, Firebase of een eigen server nodig.

## Publiceren op GitHub Pages
1. Maak een nieuwe repository aan op GitHub.
2. Upload alle bestanden uit deze map.
3. Ga naar **Settings > Pages**.
4. Kies **Deploy from a branch**.
5. Selecteer branch **main** en map **/(root)**.
6. Sla op.
7. Wacht tot GitHub de site publiceert.

Je site staat daarna op ongeveer:
`https://jouwgebruikersnaam.github.io/jouw-repository/`

## Docentgebruik
Laat studenten na het maken van de toets:
1. een screenshot uploaden in de pagina
2. het automatisch gedownloade JSON-bestand inleveren

De docent kan die JSON-bestanden later verzamelen en controleren.
