# klocka.com

**URL:** https://klocka.com/
**Type:** Swedish clock and watch resource
**Language:** Swedish
**TLD:** .com

## Site Purpose

Klocka.com is a Swedish clock and watch resource. "Klocka" means clock/watch in Swedish. The site covers watch/clock information, time-related tools, and watch market content for Swedish users interested in timepieces.

## Three parts

- **Klockappar** (`/app/*`) — Swedish clock tools: stoppur, schackklocka, pomodoro, interval, nedräkning, presentation, and äggklocka.
- **Tid i världen** (`/tid/*`) — World time pages, one per country.
- **Köpguider** (`/klockmarken/*`) — Watch buying guides by brand.

## Deploy

Push `main` to trigger GitHub Actions, which deploys to the Cloudflare Pages project `klocka-com`. No manual steps are required.

## Config

- Ads configuration: `src/lib/ads.ts` (created in Epic 1/2).
- Brand CTAs and affiliate links: `src/data/brands.ts` (created in later epics).
