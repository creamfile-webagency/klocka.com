/**
 * Generate per-brand OG images at public/img/og/<slug>.jpg
 * Template matches the existing og-omega.jpg visual style:
 *   - 1200×630, dark navy gradient background
 *   - KLOCKA.COM · KÖPGUIDE badge top-left
 *   - Brand name (large), tagline, pill badges
 *   - Decorative watch illustration (right side)
 *
 * Run: node scripts/og-images.mjs
 */

import { createRequire } from 'module';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'img', 'og');

mkdirSync(OUT_DIR, { recursive: true });

// Import brand data — we read the TS file as a plain JS object by re-exporting
// the data in a sibling .mjs. To avoid a transpile step, we duplicate just the
// data inline here. If brands.ts changes, keep this in sync.
const brands = [
  { slug: 'axcent',            name: 'Axcent',           country: 'Danmark',      founded: 2000, priceRange: '300 – 1 500 kr',       segment: 'Budget',     tagline: 'Dansk ungdomsdesign med stil' },
  { slug: 'black-oak',         name: 'Black Oak',        country: 'Norden',       founded: 2010, priceRange: '500 – 2 000 kr',       segment: 'Mid-range',  tagline: 'Nordisk design med sportslig karaktär' },
  { slug: 'breitling',         name: 'Breitling',        country: 'Schweiz',      founded: 1884, priceRange: '25 000 – 150 000 kr',  segment: 'Luxury',     tagline: 'Precision för pilot och äventyrare' },
  { slug: 'calvin-klein',      name: 'Calvin Klein',     country: 'USA',          founded: 1968, priceRange: '800 – 3 000 kr',       segment: 'Fashion',    tagline: 'New York-minimalism med clean design' },
  { slug: 'carl-edmond',       name: 'Carl-Edmond',      country: 'Danmark',      founded: 2014, priceRange: '800 – 2 500 kr',       segment: 'Mid-range',  tagline: 'Skandinavisk minimalism från Köpenhamn' },
  { slug: 'casio',             name: 'Casio',            country: 'Japan',        founded: 1946, priceRange: '500 – 15 000 kr',      segment: 'Sport',      tagline: 'G-Shock, Edifice och Pro Trek' },
  { slug: 'certina',           name: 'Certina',          country: 'Schweiz',      founded: 1888, priceRange: '3 000 – 15 000 kr',    segment: 'Mid-range',  tagline: 'Schweizisk precision med sportsjäl' },
  { slug: 'daniel-wellington', name: 'Daniel Wellington',country: 'Sverige',      founded: 2009, priceRange: '800 – 3 000 kr',       segment: 'Fashion',    tagline: 'Skandinavisk minimalism från Stockholm' },
  { slug: 'diesel',            name: 'Diesel',           country: 'Italien',      founded: 1978, priceRange: '1 000 – 4 000 kr',     segment: 'Fashion',    tagline: 'Industriellt formspråk med edge' },
  { slug: 'hugo-boss',         name: 'Hugo Boss',        country: 'Tyskland',     founded: 1924, priceRange: '2 000 – 6 000 kr',     segment: 'Fashion',    tagline: 'Tysk affärsstil med modern design' },
  { slug: 'james-son',         name: 'James-Son',        country: 'Skandinavien', founded: 2015, priceRange: '200 – 800 kr',         segment: 'Budget',     tagline: 'Prisvärda klockor för vardagsbruk' },
  { slug: 'longines',          name: 'Longines',         country: 'Schweiz',      founded: 1832, priceRange: '8 000 – 40 000 kr',    segment: 'Mid-luxury', tagline: 'Elegans och tradition sedan 1832' },
  { slug: 'marc-jacobs',       name: 'Marc Jacobs',      country: 'USA',          founded: 1984, priceRange: '1 000 – 4 000 kr',     segment: 'Fashion',    tagline: 'New York-mode med lekfull design' },
  { slug: 'michael-kors',      name: 'Michael Kors',     country: 'USA',          founded: 1981, priceRange: '1 500 – 5 000 kr',     segment: 'Fashion',    tagline: 'Glamour och stil från New York' },
  { slug: 'omega',             name: 'Omega',            country: 'Schweiz',      founded: 1848, priceRange: '15 000 – 200 000 kr',  segment: 'Luxury',     tagline: 'Schweizisk prestige — Seamaster, Speedmaster, De Ville' },
  { slug: 'philippe-banks',    name: 'Philippe Banks',   country: 'Europa',       founded: 2000, priceRange: '500 – 2 000 kr',       segment: 'Mid-range',  tagline: 'Europeisk klassisk klockdesign' },
  { slug: 'rolex',             name: 'Rolex',            country: 'Schweiz',      founded: 1905, priceRange: '60 000 – 500 000+ kr', segment: 'Luxury',     tagline: 'Submariner, Datejust och Daytona' },
  { slug: 'seiko',             name: 'Seiko',            country: 'Japan',        founded: 1881, priceRange: '2 000 – 80 000 kr',    segment: 'Mid-range',  tagline: 'Japansk precision och havsäventyr' },
  { slug: 'tag-heuer',         name: 'TAG Heuer',        country: 'Schweiz',      founded: 1860, priceRange: '10 000 – 60 000 kr',   segment: 'Luxury',     tagline: 'Kronografer med motorsportarv' },
  { slug: 'tory-burch',        name: 'Tory Burch',       country: 'USA',          founded: 2004, priceRange: '1 500 – 5 000 kr',     segment: 'Fashion',    tagline: 'Amerikansk bohemisk lyxestetik' },
  { slug: 'triwa',             name: 'Triwa',            country: 'Sverige',      founded: 2007, priceRange: '1 000 – 4 000 kr',     segment: 'Mid-range',  tagline: 'Stockholmsdesign med hållbarhetsprofil' },
];

/** Escape special XML/SVG characters in text */
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Build a pill badge SVG group.
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {number} approxWidth — rough width in px for the rect; auto-pad 24px each side
 */
function pill(text, x, y, approxWidth) {
  const rx = 6;
  const h = 32;
  const w = approxWidth;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <text x="${x + w / 2}" y="${y + 21}" text-anchor="middle" font-family="system-ui,-apple-system,Helvetica Neue,Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.85)">${esc(text)}</text>`;
}

/** Estimate pill width from text length */
function pillWidth(text) {
  return Math.max(80, text.length * 8 + 32);
}

/** Generate the SVG string for a brand */
function buildSvg(brand) {
  const W = 1200;
  const H = 630;

  const countryBadge = `${brand.country} ${brand.founded}`;
  const priceBadge = brand.priceRange;
  const segBadge = brand.segment;

  const cW = pillWidth(countryBadge);
  const pW = pillWidth(priceBadge);
  const sW = pillWidth(segBadge);

  const badgeY = 410;
  const badgeX1 = 80;
  const badgeX2 = badgeX1 + cW + 12;
  const badgeX3 = badgeX2 + pW + 12;

  // Watch face (simplified clock illustration, right side)
  const cx = 870;
  const cy = 315;
  const r = 180;

  // Determine name font-size based on length
  const nameFontSize = brand.name.length > 12 ? 72 : brand.name.length > 8 ? 88 : 108;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#091525"/>
      <stop offset="100%" stop-color="#0e2240"/>
    </linearGradient>
    <linearGradient id="watchGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#152a42"/>
      <stop offset="100%" stop-color="#0a1a2e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Subtle grid corners -->
  <path d="M 40 40 L 40 80 M 40 40 L 80 40" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none"/>
  <path d="M ${W-40} 40 L ${W-40} 80 M ${W-40} 40 L ${W-80} 40" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none"/>
  <path d="M 40 ${H-40} L 40 ${H-80} M 40 ${H-40} L 80 ${H-40}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none"/>
  <path d="M ${W-40} ${H-40} L ${W-40} ${H-80} M ${W-40} ${H-40} L ${W-80} ${H-40}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none"/>

  <!-- Decorative text cards (top-right, bottom-right — background detail) -->
  <rect x="775" y="60" width="120" height="12" rx="2" fill="rgba(255,255,255,0.06)"/>
  <rect x="775" y="80" width="90"  height="8"  rx="2" fill="rgba(255,255,255,0.04)"/>
  <rect x="775" y="95" width="105" height="8"  rx="2" fill="rgba(255,255,255,0.04)"/>
  <rect x="775" y="${H-100}" width="120" height="12" rx="2" fill="rgba(255,255,255,0.06)"/>
  <rect x="775" y="${H-82}"  width="90"  height="8"  rx="2" fill="rgba(255,255,255,0.04)"/>
  <rect x="775" y="${H-67}"  width="105" height="8"  rx="2" fill="rgba(255,255,255,0.04)"/>

  <!-- Watch case outer glow -->
  <circle cx="${cx}" cy="${cy}" r="${r + 20}" fill="rgba(30,60,100,0.25)"/>

  <!-- Watch case -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#watchGrad)" stroke="rgba(80,120,180,0.3)" stroke-width="2"/>

  <!-- Watch bezel ring -->
  <circle cx="${cx}" cy="${cy}" r="${r - 8}" fill="none" stroke="rgba(80,120,180,0.2)" stroke-width="8"/>

  <!-- Hour markers -->
  ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const inner = i % 3 === 0 ? r - 30 : r - 22;
    const outer = r - 14;
    const x1 = cx + Math.cos(angle) * inner;
    const y1 = cy + Math.sin(angle) * inner;
    const x2 = cx + Math.cos(angle) * outer;
    const y2 = cy + Math.sin(angle) * outer;
    const w = i % 3 === 0 ? 3 : 1.5;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(180,210,255,0.7)" stroke-width="${w}" stroke-linecap="round"/>`;
  }).join('\n  ')}

  <!-- Center dot -->
  <circle cx="${cx}" cy="${cy}" r="6" fill="rgba(100,160,255,0.9)"/>

  <!-- Hour hand (~10 o'clock) -->
  <line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(-150 * Math.PI / 180) * (r * 0.55)).toFixed(1)}" y2="${(cy + Math.sin(-150 * Math.PI / 180) * (r * 0.55)).toFixed(1)}" stroke="white" stroke-width="5" stroke-linecap="round"/>

  <!-- Minute hand (~2 o'clock) -->
  <line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(-60 * Math.PI / 180) * (r * 0.75)).toFixed(1)}" y2="${(cy + Math.sin(-60 * Math.PI / 180) * (r * 0.75)).toFixed(1)}" stroke="white" stroke-width="3" stroke-linecap="round"/>

  <!-- Seconds hand -->
  <line x1="${(cx + Math.cos(120 * Math.PI / 180) * (r * 0.2)).toFixed(1)}" y1="${(cy + Math.sin(120 * Math.PI / 180) * (r * 0.2)).toFixed(1)}" x2="${(cx + Math.cos(-60 * Math.PI / 180) * (r * 0.82)).toFixed(1)}" y2="${(cy + Math.sin(-60 * Math.PI / 180) * (r * 0.82)).toFixed(1)}" stroke="rgba(100,160,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Brand label on watch face -->
  <text x="${cx}" y="${cy + r * 0.22}" text-anchor="middle" font-family="system-ui,-apple-system,Helvetica Neue,Arial,sans-serif" font-size="14" font-weight="600" letter-spacing="3" fill="rgba(200,220,255,0.7)">${esc(brand.name.toUpperCase())}</text>

  <!-- KLOCKA.COM · KÖPGUIDE badge -->
  <rect x="80" y="72" width="200" height="28" rx="14" fill="rgba(40,100,200,0.35)" stroke="rgba(80,140,240,0.4)" stroke-width="1"/>
  <circle cx="100" cy="86" r="4" fill="#4a90e2"/>
  <text x="112" y="91" font-family="system-ui,-apple-system,Helvetica Neue,Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="rgba(255,255,255,0.9)">KLOCKA.COM · KÖPGUIDE</text>

  <!-- Brand name -->
  <text x="80" y="${210 + (108 - nameFontSize) * 0.5}" font-family="system-ui,-apple-system,Helvetica Neue,Arial,sans-serif" font-size="${nameFontSize}" font-weight="800" fill="white" letter-spacing="-1">${esc(brand.name)}</text>

  <!-- Tagline -->
  <text x="80" y="280" font-family="system-ui,-apple-system,Helvetica Neue,Arial,sans-serif" font-size="20" fill="rgba(255,255,255,0.65)" font-weight="400">${esc(brand.tagline)}</text>

  <!-- Pill badges -->
  ${pill(countryBadge, badgeX1, badgeY, cW)}
  ${pill(priceBadge,   badgeX2, badgeY, pW)}
  ${pill(segBadge,     badgeX3, badgeY, sW)}
</svg>`;
}

async function generateAll() {
  let ok = 0;
  let fail = 0;

  for (const brand of brands) {
    const outPath = join(OUT_DIR, `${brand.slug}.jpg`);
    try {
      const svg = buildSvg(brand);
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outPath);
      console.log(`✓ ${brand.slug}`);
      ok++;
    } catch (err) {
      console.error(`✗ ${brand.slug}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n${ok} generated, ${fail} failed → ${OUT_DIR}`);
  if (fail > 0) process.exit(1);
}

generateAll();
