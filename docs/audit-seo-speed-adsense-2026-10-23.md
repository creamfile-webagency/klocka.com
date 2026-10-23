# klocka.com – SEO-audit, page speed och AdSense-plan

*2026-10-23. Underlag: lokala mappen `Websites/klocka.com` (src, public, dist, GOALS.md, README.md, docs/analytics.md, url-preservation-map.csv, scripts, pulse-skript, CI) och livesajten (HTML, statuskoder, headers, sitemap och resurser mätta i Chrome på desktop 1536 px). PageSpeed Insights-API:t hade slut på dagskvot, så prestandasiffrorna är egna mätningar. Ingen färsk GSC-data hämtades. Klickdata kommer från url-preservation-map.csv (WP-tiden, juni 2026).*

## Läget i korthet

Tekniken är bra. Sajten är statisk Astro på Cloudflare Pages med TTFB 80–90 ms, HTML på 4,7–8,3 KB (brotli), en CSS-fil, inga webbfonter och CLS 0,003. Hastighet är inte det som hindrar AdSense-godkännandet.

De stora problemen gäller innehåll och regelefterlevnad:

1. **Ingen ads.txt** (404). Det måste finnas innan sajten kan godkännas och tjäna pengar.
2. **Integritetspolicyn, Om-sidan och cookiebannern säger "inga annonscookies" och "inga cookies"**, samtidigt som `adsbygoogle.js` laddas på alla sidor. Det bryter mot AdSense-policyn. Det finns heller ingen certifierad CMP (TCF), vilket krävs för annonser i EES.
3. **Tunt innehåll.** 20 `/tid/<land>/`-sidor har ca 30 ord statisk text, hubben `/tid/` har 19 ord och Om-sidan 66 ord. Det är den vanligaste orsaken till avslag med motiveringen "Innehåll med lågt värde".
4. **Fel bild på 19 märkessidor.** Alla klockmärkessidor (Rolex, Casio, Axcent …) har `og-omega.jpg` som hero- och delningsbild. Bilden visar texten "Omega · 15 000–200 000 kr".
5. **Platshållarannonser i DOM:en.** /schackklocka/ har två `<ins>` med `data-ad-slot="REPLACE_WITH_SLOT_ID_1/2"`.
6. **Klockrummet-länken renderas aldrig på 12 märkessidor (variant B).** Ingen sida skickar in `klockrummetCta`, så de märken som Klockrummet säljer har noll länkar dit.
7. **Den lokala mappen är äldre än produktion.** Live finns 58 URL:er (bl.a. /stoppur/ och 20 /tid/-länder). Lokalt finns 38, och `src/pages/stoppur/` är tom. **Kör `git pull` innan något ändras**, annars kan en deploy från den lokala kopian radera /stoppur/ (26 klick/period på WP-tiden) och alla tid-sidor.

---

## 0. Strategi (GOALS: "Decide" inför Q4-genomgången)

Sajten består av tre delar som tjänar pengar på olika sätt:

| Del | Sidor | Intäkt | Bedömning |
|---|---|---|---|
| Tidappar (stoppur, timer, schackklocka, pomodoro, intervall, presentation, äggklocka) | 7 | AdSense. Lång tid på sidan (pomodoro 25 min, presentation) | Sajtens trafikbas. Bästa annonsytan |
| Tid i världen | 21 | AdSense | Stora sökvolymer ("vad är klockan i …"), men sidorna är för tunna i dag |
| Köpguider (klockmärken + klockor) | 24 | Klockrummet-korsförsäljning + affiliate | Störst intäkt per besök, eftersom Ben äger Klockrummet |

**Rekommendation: satsa måttligt** (ca 3–4 dagar till i Q4), i ordningen policyfixar → godkännande → tid-sidor → Klockrummet-flöde. Sajten kostar nästan inget att drifta, och köpguiderna matar Klockrummet. Att lägga ner den vore att slänga trafik som redan finns.

---

## 1. SEO-audit

### Kritiskt

**1.1 Synka den lokala mappen med produktion.** Live CSS heter `index.TH6Lsi7N.css`, lokal `dist` har `index.DyucTKxo.css`. Live sitemap har /stoppur/ och /tid/{australien … usa}, men det har inte lokal src. Deploy sker via GitHub Actions vid push till `main`.
→ `git status` och `git pull` i mappen. Kontrollera att `src/pages/stoppur/index.astro` finns i `main`. Om den bara saknas lokalt, återställ den med `git checkout -- src/pages/stoppur`.

**1.2 Tid-sidorna är för tunna (20 sidor).** /tid/usa/ har i statisk HTML bara H1, klocka, "Sverige 15:08 · USA 09:08" och en länk tillbaka. Undantaget är /tid/kina/, som har ca 600 ord och är mallen att följa.
→ Bygg en gemensam `CountryTime`-mall med datadriven text per land, så att varje sida får ca 400–600 unika ord:
- tidsskillnad mot Sverige på sommar- och vintertid, i en tabell
- datum för sommartidsbyte (eller "ingen sommartid")
- alla tidszoner i landet (USA har sex, Kanada sex, Australien tre, Mexiko fyra, Indonesien tre)
- "bästa tid att ringa", tabell med kontorstider och vilken svensk tid de motsvarar
- största städer och deras zoner, FAQ
- länkar till grannländer och till /tid/

Gör hubben /tid/ till en riktig sida: tabell över alla länder med aktuell tid och skillnad, plus kort text om tidszoner och sommartid.
**Bugg:** /tid/usa/ visar "New York · UTC-5" i oktober, men just nu är det UTC-4 (EDT). Räkna offset dynamiskt med `Intl.DateTimeFormat` och `timeZoneName: 'shortOffset'`.
**Slug:** `/tid/indonesia/` är engelska. Byt till `/tid/indonesien/` med en 301 i `_redirects`.

**1.3 Fel bild på alla 19 märkessidor.** `heroImage="/img/og-omega.jpg"` är hårdkodat i varje fil under `klockmarken/*`. Rolex-sidan visar alltså en hero med "Omega" och fel prisintervall, och samma bild delas i sociala medier. Det ser vårdslöst ut för en AdSense-granskare och för Google.
→ Generera en OG-bild per märke med samma mall (namn, land/år, prisintervall). Ett byggskript med satori eller sharp räcker. Använd `astro:assets` och `<Image>` så att hero serveras som AVIF/WebP med srcset. I dag skickas 1200×630 JPEG (58 KB) för att visas i 420×221 px. Rätta också `width="600" height="400"`, som har fel proportioner jämfört med bilden.

**1.4 Standardbilden finns inte.** `Layout.astro` har `ogImage = '/img/klocka-og.png'`, men filen ger 404. Den används på startsidan, alla appar och alla tid-sidor. `/favicon.ico` ger också 404 (`<link rel="alternate icon" href="/favicon.ico">`).
→ Lägg in `public/img/klocka-og.png` (1200×630) och en `favicon.ico`, eller ta bort ico-länken.

### Hög prioritet

**1.5 Språket i köpguiderna.** Rolex-texten innehåller fel som avslöjar maskinöversättning, till exempel "igenkändbara", "Från Submariner djupvattendykningar", "det roterande dykarskaftet" (= vridbar dykarring), "Paul Newman bars av ett … Daytona-exemplar", "exotisk urskilj", "Cyclops-luppen som förstoras", "skruvad kron" och "handrörrelser". Samma typ av fel finns troligen på de andra 18 sidorna.
→ Låt en svensk språkgranskning gå igenom alla 24 guider. Prioritera Rolex, Omega, Certina, Michael Kors och Triwa (flest visningar i GSC-kartan). Sätt "Senast uppdaterad" och priser "per oktober 2026" på varje guide. Redaktionell policy lovar redan detta.

**1.6 Tunna märkessidor.** Omega (359 ord) är sajtens största märke i GSC (4 589 visningar, 0 klick på WP-tiden) men har en av de tunnaste sidorna. Black Oak, Carl-Edmond och Axcent ligger under 370 ord.
→ Ge Omega samma djup som Rolex (928 ord): modelltabell, prisguide, "Omega vs Rolex" och FAQ.

**1.7 Märkessidor för legacy-URL:er med trafik.** `_redirects` skickar `/marke/james-son/` (21 klick, position 11), `/marke/philippe-banks/` (4 klick, position 11,6), `/marke/anne-klein/`, `/marke/thomas-sabo/` och `/marke/tommy-hilfiger/` med 302 till /klockmarken/. Det tappar rankingen.
→ Skapa sidor för James & Son och Philippe Banks först. Det är svenska märken och sannolikt Klockrummet-sortiment, alltså variant B. Ändra sedan till 301 till den nya sidan. Märken som inte ska få en egen sida får 301 i stället för 302.

**1.8 Startsidan är tunn och har ogiltigt schema.** Den har 169 ord, och `WebSite` har en `SearchAction` till `/?q=` trots att sajten inte har någon sökfunktion.
→ Ta bort `potentialAction`. Lägg till ett kort textstycke (150–250 ord) om apparna, tid i världen och köpguiderna. Lägg en länkrad till de 6–8 största tid-länderna och märkena. H1 "Allt om tid och klockor — på ett ställe" kan bli "Klocka online – stoppur, timer och tid i världen", som matchar sökningar.

**1.9 Gamla årtal i titlar.** "Sportwatch — Köpguide … 2024" och "Smartwatch — Köpguide … 2024" ska bli 2026, eller årtalet tas bort och sidan får `dateModified` i schemat.

### Medel

**1.10 Schema.**
- Lägg `Organization` med `name`, `logo` och `sameAs` på startsidan.
- Märkesguiderna har `Article` utan `datePublished`, `dateModified`, `author` och `image`. Lägg till dessa fält, och `BreadcrumbList`, som redan finns visuellt.
- Verktygssidorna har `HowTo`. Det är ofarligt men ger inte längre rich results.

**1.11 Mindre saker.**
- Footern länkar till `/sitemap.xml`, som 301:as. Länka direkt till `/sitemap-index.xml` eller ta bort länken.
- Sitemap saknar `lastmod`. Aktivera `serialize`/`lastmod` i `@astrojs/sitemap`.
- `hreflang sv-SE` och `x-default` pekar på sig själva. Det är ofarligt men behövs inte för en sajt på ett enda språk.
- Om-sidans titel "… för svenska webbläsaren" ska bli "Om Klocka.com – gratis tidverktyg och klockguider".

---

## 2. Page speed

**Mätt i dag (live, desktop):**

| Sida | TTFB | DCL | Load | HTML (brotli/okompr.) | CLS |
|---|---|---|---|---|---|
| / | 89 ms | 484 ms | 490 ms | 4,7 / 20,7 KB | – |
| /klockmarken/rolex/ | 81 ms | 115 ms | 252 ms | 8,3 / 28,1 KB | 0,003 |

Det är en enda CSS-fil (22 KB okomprimerad), inga webbfonter och ingen JS utöver gtag och adsbygoogle. Grunden är redan bra. Det som återstår:

**2.1 Ladda tredjepartsskript efter interaktion** (samma princip som i Webgames-gruppen). `gtag.js` laddas i head och `adsbygoogle.js` i slutet av body vid varje sidvisning. Ladda båda vid första `scroll`, `pointerdown` eller `keydown`, eller efter 4 s. Ta bort de sex preconnect/dns-prefetch-raderna mot googletagmanager, googlesyndication och doubleclick. De konkurrerar med LCP på mobil utan att göra nytta förrän annonserna laddas.
*Undantag under granskningen:* se till att AdSense-koden eller `<meta name="google-adsense-account" content="ca-pub-8364820223873979">` finns i `<head>` statiskt, så att Google kan verifiera sajten. Lägg in meta-taggen nu.

**2.2 Bilder.** Hero-bilden på 24 guidesidor är en JPEG på 1200×630 och 58 KB som visas i 420 px, med `loading="eager"`. Använd `<Image>` från astro:assets (AVIF/WebP, `widths=[420,840]`) och `fetchpriority="high"`. Det sparar ca 40 KB per sida på mobil.

**2.3 Cachning.** `/_astro/*` serveras med `max-age=14400, must-revalidate` trots att filnamnen har hash. Lägg till i `public/_headers`:
```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=2592000
```
HTML har `max-age=0, must-revalidate`, vilket är bra och gör att bfcache fungerar.

**2.4 Verktygen på mobil.** /stoppur/ saknar Screen Wake Lock, så skärmen släcks under tidtagning, medan intervall har det. Lägg till `navigator.wakeLock` på stoppur, nedräkning, pomodoro och presentation. Det påverkar inte poängen men gör att fler stannar kvar, och det ger fler annonsvisningar.

**Mobil:** PSI-kvoten var slut i dag. Kör PageSpeed Insights mobil manuellt på `/`, `/stoppur/`, `/klockmarken/rolex/` och `/tid/usa/` före och efter 2.1 och 2.2. Förväntat resultat efter åtgärderna är 95+ för Performance.

---

## 3. AdSense (ej godkänd)

### 3.1 Sannolika avslagsorsaker, i den ordning de bör åtgärdas

| # | Problem | Åtgärd |
|---|---|---|
| 1 | **ads.txt saknas** (404) | `public/ads.txt`: `google.com, pub-8364820223873979, DIRECT, f08c47fec0942fa0` |
| 2 | **Integritetspolicyn säger "Inga tredjepartsannonscookies används"**, Om säger "Inga cookies" och bannern säger "inga annonscookies". AdSense kräver att policyn beskriver Google och tredjepartsleverantörers cookies för annonser | Skriv om integritetspolicyn med ett avsnitt om annonser: Google AdSense, tredjepartsleverantörer, personanpassade och icke-personanpassade annonser, länk till Googles "Så använder Google data" och adssettings.google.com. Ange personuppgiftsansvarig (Creamfile AB, org.nr, adress). Ta bort "Inga cookies" från Om |
| 3 | **Ingen certifierad CMP.** Den egna bannern sätter bara `analytics_storage`. Consent default saknar `ad_user_data` och `ad_personalization`, och ingen TC-sträng skapas | Publicera Googles CMP (Sekretess och meddelanden) för klocka.com: svenska, tre val (Godkänn / Avvisa / Hantera). Ta bort `CookieConsent.astro`. Låt CMP:n styra Consent Mode v2 för både GA4 och annonser. Footer-länken "Cookieinställningar" öppnar `googlefc.showRevocationMessage()` |
| 4 | **Tunt innehåll** på 20 tid-sidor, /tid/, /om/ och startsidan | 1.2 och 1.8. Om antalet sidor gör det för stort: sätt `noindex` på de tid-sidor som inte hunnit få ny mall och ta bort dem ur sitemap tills de är klara. Ansök inte igen förrän tid-mallen är live |
| 5 | **Platshållar-`<ins>`** (`REPLACE_WITH_SLOT_ID_1/2`) på /schackklocka/, med `aria-hidden="true"` | Ta bort helt tills sajten är godkänd och riktiga enheter finns. Använd aldrig `aria-hidden` på annonscontainrar |
| 6 | **Fel bilder och språkfel** i guiderna (1.3, 1.5) | Ser ut som massproducerat innehåll. Rätta före ny ansökan |
| 7 | **Avsändare och kontakt** | Om-sidan: vem som står bakom (Creamfile AB), varför sajten finns, kontaktadress. Skapa en `/kontakt/`-sida och länka den i footern. "Vårt redaktionella team" i redaktionell policy bör stämma med verkligheten |

**Ordning:** punkt 1, 2, 3, 5 och 7 tar ca en halv dag. Sedan kommer tid-mallen (1.2) och bildfixen (1.3). Efter det begär du en ny granskning i AdSense, under Webbplatser → klocka.com.

### 3.2 Annonslayout efter godkännande (`klocka-<sidtyp>-<placering>`)

Skapa enheterna först när sajten är godkänd, och lägg bara riktiga ID:n i koden.

| Enhet | Format | Var | Not |
|---|---|---|---|
| klocka-tool-rail-right | 300×600 sticky | Höger kolumn ≥1200 px på alla verktygssidor | Värdefullast: pomodoro, presentation och intervall är öppna i flera minuter |
| klocka-tool-below-fold | Responsiv rektangel | Under verktyget och kontrollerna, före förklaringstexten | ≥ 24 px från Start/Stopp och etiketten "Annons". Inte i helskärmsläge |
| klocka-guide-in-article | In-article (fluid) | Efter 2:a H2 i köpguider och efter 5:e H2 i långa guider | Aldrig mellan affiliateknapparna |
| klocka-time-below-clock | Responsiv | Under klockan och tidsskillnadstabellen på /tid/<land>/ | |
| klocka-time-in-article | In-article | I texten på tid-sidorna | |

Samla allt i en `AdSlot.astro` med prop `placement` som gör sin egen `push()`. Inga annonser på /om/, /integritetspolicy/, /redaktionell-policy/, /kontakt/ och 404. Auto ads av, enligt samma linje som Webgames.

### 3.3 Den större intäkten: Klockrummet
- **12 variant B-sidor skickar inte `klockrummetCta`.** Därför renderar `BuyingGuideLayout` ingen CTA alls. Bara /klockor/herrur/ länkar till Klockrummet i dag. Lägg till `klockrummetCta={{ href: 'https://klockrummet.se/marken/<märke>/', label: 'Se <Märke> hos Klockrummet' }}` på Casio, Triwa, Daniel Wellington, Michael Kors, Hugo Boss, Diesel, Calvin Klein, Marc Jacobs, Tory Burch, Black Oak, Carl-Edmond och Axcent, och på damur, smartwatch och sportwatch där sortimentet passar. Gör hellre layouten strikt: variant B utan `klockrummetCta` ska ge byggfel.
- Chrono24- och WoS-länkarna har inget affiliate-ID och är bara vanliga länkar, märkta `sponsored`. Gå med i Chrono24:s partnerprogram eller ta bort `sponsored` och provisionstexten där ingen provision finns.
- GA4 har cross-domain linker mot klockrummet.se. Skapa en GA4-händelse `klockrummet_click` med märke som parameter, så att intäkten per guide syns.

---

## 4. Mappen: hygien och dokumentation

- **Stale kopia** (1.1). Det är det viktigaste i mappen.
- `.klocka.env` och `scripts/yoast-meta-update.sh` gäller WordPress, som inte finns längre (/wp-admin/ och /wp-json/ ger 404). **Återkalla WP-applikationslösenordet** om WP-instansen finns kvar någonstans. Radera skriptet och ta bort WP-nycklarna ur env-filen.
- `pulse_w29.py` … `pulse_w36.py` är sex nästan identiska kopior i repo-roten. De använder Klockrummets servicekonto, medan `docs/analytics.md` anger Investviewer-nyckeln. Ersätt dem med `weekly_report.py --group brand-apps` och ta bort filerna. Mappen `GSC/` är tom.
- **GOALS.md** står fortfarande på "GSC baseline TBD", och analytics.md säger att GA4-ID:t inte är tilldelat, trots att `G-FXEJ5M904P` är live. Uppdatera båda med siffror för de senaste 28 dagarna inför Q4-beslutet.
- Både `package-lock.json` och `pnpm-lock.yaml` och `pnpm-workspace.yaml` finns, men CI kör `npm ci`. Behåll en pakethanterare.
- `url-preservation-map.csv` är inaktuell. Black Oak, Tory Burch m.fl. står som 302, men sidorna finns nu, och `/appar/` pekar på `/verktyg/`. Uppdatera eller arkivera filen.
- `wrangler.toml`: `compatibility_date = "2024-10-22"` kan höjas.
- README är tre rader. Lägg till sajtens tre delar, deploy (push till main → Actions → Pages) och var annonser och CTA:er konfigureras.

---

## 5. Prioriterad åtgärdslista

| # | Åtgärd | Effekt | Insats |
|---|---|---|---|
| 1 | `git pull`, verifiera /stoppur/ och tid-sidor lokalt (1.1) | Undviker att sidor raderas | 10 min |
| 2 | `ads.txt` + `google-adsense-account`-meta (3.1, 2.1) | AdSense | 10 min |
| 3 | Ta bort platshållar-`<ins>` på /schackklocka/ (3.1 #5) | Policy | 10 min |
| 4 | Ny integritetspolicy, Om-sida med avsändare, /kontakt/ (3.1 #2, #7) | Policy, E-E-A-T | 1–2 h |
| 5 | Googles CMP i stället för egen banner (3.1 #3) | Policy, krävs i EES | 1–2 h |
| 6 | `klocka-og.png`, favicon, OG/hero per märke (1.3, 1.4) | Kvalitet, delningar | 2–3 h |
| 7 | Klockrummet-CTA på 12+ variant B-sidor (3.3) | Intäkt direkt | 1 h |
| 8 | Tid-mall med zoner, DST, tabeller, FAQ + riktig /tid/-hubb, dynamisk UTC-offset, indonesia → indonesien (1.2) | SEO, AdSense | 1 dag |
| 9 | **Begär ny AdSense-granskning** | – | – |
| 10 | Språkgranskning av 24 guider, Omega utökad (1.5, 1.6) | SEO, kvalitet | 1 dag |
| 11 | Sidor för James & Son och Philippe Banks, 302 → 301 (1.7) | Återvunnen trafik | 2–3 h |
| 12 | Startsida: text, H1, ta bort SearchAction (1.8), årtal (1.9), schema (1.10) | CTR | 1–2 h |
| 13 | gtag och adsbygoogle efter interaktion, astro:assets, immutable cache (2.1–2.3) | CWV mobil | 1–2 h |
| 14 | Annonsenheter och AdSlot.astro (3.2) | Intäkt | 3–4 h, efter godkännande |
| 15 | Städa mappen (4) | Hygien | 30 min |

**Uppföljning:** Kör PSI mobil och desktop på /, /stoppur/, /klockmarken/rolex/ och /tid/usa/ före och efter punkt 13. I GSC, följ "Sidor" och visningar för /tid/ fyra veckor efter punkt 8, och klick för /klockmarken/omega/ efter punkt 10. Följ `klockrummet_click` per guide i GA4 30 dagar efter punkt 7. Uppdatera GOALS.md med baseline före Q4-genomgången.
