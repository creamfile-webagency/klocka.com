# GOALS — klocka.com

> **Tier:** Decide
>
> **Decision needed:** No GSC baseline established in the weekly pulse pipeline. GSC performance data export exists (2026-06-05 xlsx). One quarterly decision: invest (watch/clock queries), maintain, or retire. Next decision: 2026-Q4 board review.
>
> **Positioning (from README):** Swedish clock and watch resource — timepiece information and tools.
>
> Baseline source: pull via `weekly_report.py --group brand-apps` or `fetch_gsc.py`.
> Horizon: 2026-Q4 board review.

---

## GSC snapshot (first baseline — 2026-W44, week ending 2026-11-01)

| Metric | Value |
|--------|-------|
| Clicks/week | 6 |
| Impressions/week | 1,539 |
| Avg position | 25.0 |
| CTR | 0.39% |
| Sessions (GA4) | 16 |
| Top page | /interval/ (6 clicks, pos 5.0) |
| Biggest impression page | /tid/spanien/ (749 impr, pos 10, 0 clicks) |
| Baseline established | 2026-11-02, CRE-8305 pulse |

---

## Baslinje per sidtyp — CRE-8511 (2026-10-19 → 2026-11-01, 13 dagar, pre-deploy 6/11)

> Källa: GSC-exportfiler `/home/ben/Websites/tools/data/klocka-com_2026-10-19_*.csv` +
> `klocka-com_2026-10-26_*.csv`. Kombinerat 13 dagars data.
> Uppföljning: 4 veckor efter deploy → **~2026-12-04**.

| Sidtyp | Sidor | Klick (13 d) | Visningar (13 d) | Vägd avg pos | CTR |
|--------|-------|-------------|-----------------|-------------|-----|
| Verktyg (`/stoppur/`, `/nedrakning/`, `/pomodoro/`, `/presentation/`, `/aggklocka/`, `/interval/`, `/schackklocka/`) | 7 | 14 | 401 | 16.7 | 3.5% |
| Tid (`/tid/<land>/`) | ~15 | 1 | 1 812 | 10.2 | 0.1% |
| Märken (`/klockmarken/<märke>/`) | ~19 | 10 | 1 376 | 34.2 | 0.7% |
| Guider (`/klockor/<guide>/`) | 5 | 0 | 384 | 50.9 | 0% |

### Verktyg — detaljvy per sida (kombinerat 13 dagar)

| Sida | Klick | Visningar | Avg pos |
|------|-------|-----------|---------|
| /aggklocka/ | 11 | 118 | 15.3 |
| /interval/ | 9 | 49 | 7.0 |
| /schackklocka/ | 2 | 111 | 14.4 |
| /presentation/ | 1 | 17 | 7.9 |
| /stoppur/ | 0 | 60 | 15.3 |
| /nedrakning/ | 0 | 39 | 44.0 |
| /pomodoro/ | 0 | 7 | 7.1 |

### Tid — topp 5 sidor per visningar (kombinerat)

| Sida | Visningar | Avg pos |
|------|-----------|---------|
| /tid/spanien/ | 1 169 | 10.1 |
| /tid/usa/ | 212 | 10.9 |
| /tid/kina/ | 171 | 9.0 |
| /tid/australien/ | 102 | 10.5 |
| /tid/sydkorea/ | 50 | 7.0 |

### Märken — topp 5 per visningar (kombinerat)

| Sida | Visningar | Avg pos |
|------|-----------|---------|
| /klockmarken/axcent/ | 171 | 9.5 |
| /klockmarken/omega/ | 134 | 52.4 |
| /klockmarken/longines/ | 93 | 59.4 |
| /klockmarken/rolex/ | 115 | 39.8 |
| /klockmarken/marc-jacobs/ | 100 | 16.1 |

### Uppföljningsinstruktioner (2026-12-04)

Hämta ny GSC-export med `fetch_gsc.py --site klocka.com --days 28` och jämför:
- Klick och visningar per sidtyp vs ovanstående baslinje
- Positionsförbättring för verktygsidorna (mål: alla under pos 15)
- Klick på /tid/spanien/ och /tid/usa/ (nuläge: 0 — avsiktsoptimering behövs)

---

## Epic 6 — Page Speed (CRE-7693)

**Target:** 95+ Performance (mobile) on all pages.  
**Tool:** Lighthouse 13.4.0, live site `https://klocka.com/`, measured 2026-10-23.

### Before Epic 6 — Mobile (Moto G Power emulation)

| Page | Perf | LCP | CLS | FCP | TBT | Speed Index |
|------|------|-----|-----|-----|-----|-------------|
| `/` | 64 | 4.3 s | 0 | 3.7 s | 530 ms | 3.7 s |
| `/stoppur/` | 66 | 4.3 s | 0 | 3.8 s | 440 ms | 3.8 s |
| `/klockmarken/rolex/` | 76 | 3.7 s | 0 | 1.5 s | 500 ms | 3.0 s |
| `/tid/usa/` | 72 | 3.5 s | 0.057 | 3.1 s | 480 ms | 3.1 s |

### Before Epic 6 — Desktop

| Page | Perf | LCP | CLS | FCP | TBT | Speed Index |
|------|------|-----|-----|-----|-----|-------------|
| `/` | 93 | 1.4 s | 0 | 1.2 s | 30 ms | 1.3 s |
| `/stoppur/` | 95 | 1.2 s | 0 | 1.0 s | 30 ms | 1.2 s |
| `/klockmarken/rolex/` | 94 | 1.5 s | 0 | 0.8 s | 30 ms | 1.2 s |
| `/tid/usa/` | 97 | 1.1 s | 0.007 | 0.8 s | 20 ms | 1.1 s |

### After Epic 6 — Mobile (fill in after Epic 6 is complete)

| Page | Perf | LCP | CLS | FCP | TBT | Speed Index |
|------|------|-----|-----|-----|-----|-------------|
| `/` | — | — | — | — | — | — |
| `/stoppur/` | — | — | — | — | — | — |
| `/klockmarken/rolex/` | — | — | — | — | — | — |
| `/tid/usa/` | — | — | — | — | — | — |

### After Epic 6 — Desktop (fill in after Epic 6 is complete)

| Page | Perf | LCP | CLS | FCP | TBT | Speed Index |
|------|------|-----|-----|-----|-----|-------------|
| `/` | — | — | — | — | — | — |
| `/stoppur/` | — | — | — | — | — | — |
| `/klockmarken/rolex/` | — | — | — | — | — | — |
| `/tid/usa/` | — | — | — | — | — | — |
