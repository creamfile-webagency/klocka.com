# klocka.com – status för devplan 2026-10-23

*Kontrollerat 2026-10-23 kväll: livesajten (Chrome) och Bens lokala mapp. "Lokalt" betyder att ändringen finns i mappen men inte är live. Antingen är den inte pushad, eller så har deployen inte gått igenom.*

## Viktigast just nu
1. **Mycket är klart lokalt men inte deployat.** /kontakt/, /klockor/billiga-klockor/, /klockor/klocka-present/, /klockor/klockarmband/, `img/klocka-og.png`, den nya integritetspolicyn och den nya redaktionella policyn ger 404 eller gammal version live. → `git status`, committa, pusha och kontrollera att GitHub Actions blir grön.
2. **Platshållare måste fyllas i före deploy:** `[ORG.NR]` och `[ADRESS]` i `src/pages/kontakt/index.astro` (rad 27–28) och i `src/pages/integritetspolicy/index.astro` (rad 15–16). **Ben anger.**
3. **Ingen samtyckesdialog live.** Den egna bannern är borttagen och consent-default är `denied`, men Googles CMP laddas inte (inget anrop till fundingchoices efter att `adsbygoogle.js` laddats). Ingen kan alltså ge samtycke, och GA4 samlar bara in cookielösa pingar. → **Ben:** kontrollera att meddelandet är *publicerat* för klocka.com under AdSense → Sekretess och meddelanden (KLC-5).

## Per punkt

| # | Punkt | Status | Kommentar |
|---|---|---|---|
| KLC-0 | Synka repot | ✅ | stoppur, `[country].astro` och TidCountryLayout är återställda. xlsx och `GSC/` borta. `.claude/` och `*.xlsx` ignoreras |
| KLC-1 | ads.txt | ✅ live | |
| KLC-2 | adsense-meta | ✅ live | |
| KLC-3 | Platshållar-`<ins>` | ✅ live | 0 `<ins>` på /schackklocka/ |
| KLC-4 | Policy, Om, Kontakt | 🟡 | Om är live (290 ord, Creamfile). Integritetspolicy, redaktionell policy och /kontakt/ finns bara lokalt, med platshållare för org.nr och adress |
| KLC-5 | Googles CMP publicerad | ❌ | Se ovan. **Ben** |
| KLC-6 | Egen banner bort, consent v2 | ✅ live | Alla fyra signaler `denied`. Knappen "Cookieinställningar" i footern finns |
| KLC-7 | klocka-og.png, favicon | 🟡 | Finns lokalt, 404 live. `favicon.ico` 404 live. Kontrollera att `<link rel="alternate icon">` är borttagen |
| KLC-8 | OG/hero per märke | ✅ live | `og/<märke>.jpg` och WebP-hero på alla märken |
| KLC-9 | Tid-mall | ✅ live | 20 länder har 400–540 ord, /tid/ har 435. UTC-offset dynamisk. indonesia → indonesien |
| KLC-10 | Sitemap/noindex för tid | ⚠️ | Länderna är klara och indexerbara men **saknas i sitemap**: `MIGRATED_TID_SLUGS` i `astro.config.mjs` innehåller bara `kina`. Lägg till alla 20 slugs (eller ta bort filtret) |
| KLC-11 | Startsida | ✅ live | Ny H1, SearchAction borta, Organization tillagd |
| KLC-12 | Årtal i titlar | ✅ live | 2026 |
| KLC-13 | Klockrummet + officiella länkar | 🟡 | Märkessidor: 0 Klockrummet-länkar ✅. Damur: länk till damklockor ✅. Nya guider finns lokalt. **Kvar att göra:** se nedan |
| KLC-14 | GA4-events, `sponsored` | ❓ | Inte verifierat. Chrono24/WoS har fortfarande `sponsored` live |
| KLC-15 | Språk, Senast uppdaterad | 🟡 | Stöd för `dateModified` finns i layouten, men ingen märkessida visar det live |
| KLC-16 | Omega utökad | ✅ live | 866 ord. Axcent 593 |
| KLC-17 | James & Son, Philippe Banks, 301 | ✅ live | Sidorna finns. `_redirects` har 301 |
| KLC-18 | lastmod | ✅ live | |
| KLC-19 | Skript efter interaktion | ✅ live | Inga preconnect. gtag och adsbygoogle laddas först efter interaktion |
| KLC-20 | astro:assets | ✅ live | WebP-hero |
| KLC-21 | Cache-headers | ✅ live | `/_astro/*` immutable |
| KLC-22 | Wake Lock | ❓ | Inte verifierat |
| KLC-23 | PSI-mätning | ❌ | Kör manuellt |
| KLC-26 | Städning | 🟡 | yoast-skript, pulse-skript och GSC borta. wrangler-datum höjt. **Kvar:** `pnpm-lock.yaml` och `pnpm-workspace.yaml` finns fortfarande trots att CI kör `npm ci` |

## KLC-13: kvar att rätta
- `src/components/KlockrummetCTA.astro` rad 26–27 och 40: **"från 149 kr" och "fri frakt" står kvar**, i strid med beslutet om inga belopp eller fraktvillkor. Byt till tidlösa texter, t.ex. heading "Prisvärda klockor hos Klockrummet" och body "Klockor för dam och herr i flera stilar – handla hos Klockrummet.". Default-texten för märken (`Hitta ${brand} hos Klockrummet`) ska tas bort helt.
- `klockor/billiga-klockor/index.astro`: `priceRange="149 – 1 000 kr"` och "Klockrummet har modeller från 149 kr" ska bort. Prisklasstabellen för marknaden kan stå kvar.
- `klockor/klocka-present/index.astro`: `priceRange="149 – 10 000 kr"` och "Klockrummet har alternativ från 149 kr" ska bort. Länkarna går till Klockrummets **startsida**. Länka i stället till `/present/` och relevanta undersidor (`/present/julklapp/`, `/present/fars-dag/`, `/present/mors-dag/`, `/present/student/`, `/present/parklockor/`).
- `klockor/klockarmband/index.astro`: `/tillbehor/klockarmband/` redirectar till `/guide/klockarmband/`. Länka direkt till `/guide/klockarmband/` och till kategorierna `/klockor/mesharmband/`, `/klockor/nato-band/` och `/klockor/laderarmband/`.
- **Officiella märkeslänkar saknas helt.** `src/data/brands.ts` har inget fält `officialUrl`, och inga märkessidor länkar till märkets egen sajt. Inget `Brand`-schema heller.
- `BuyingGuideLayout`: variant A/B och `klockrummetCta`-propen finns kvar (casio har `variant="B"`). Det är ofarligt nu, men städa bort det enligt KLC-13.

## Därefter
När punkt 1–3 ovan och KLC-10 och KLC-13 är rättade och live → **Ben begär ny AdSense-granskning.**
