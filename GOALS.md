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
