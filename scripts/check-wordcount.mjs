#!/usr/bin/env node
/**
 * scripts/check-wordcount.mjs
 * Post-build check: every /tid/ page in dist/ must have 400+ words in static HTML
 * (inside <main>), unless the page has a noindex meta tag.
 *
 * Usage: node scripts/check-wordcount.mjs [dist-dir]
 * Exits 1 if any page is below the threshold.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const THRESHOLD = 400;
const DIST_DIR = process.argv[2] ?? 'dist';

function extractMainText(html) {
  // Extract <main> contents
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const content = mainMatch ? mainMatch[1] : html;

  // Remove script and style blocks
  let text = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // Remove all remaining tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, ' ');
  // Collapse whitespace
  return text.replace(/\s+/g, ' ').trim();
}

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function isNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
         /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

function walkDir(dir, fileList = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkDir(full, fileList);
    } else if (entry.endsWith('.html')) {
      fileList.push(full);
    }
  }
  return fileList;
}

// Collect all HTML files under dist/tid/
const tidDir = join(DIST_DIR, 'tid');
let files;
try {
  files = walkDir(tidDir);
} catch {
  console.error(`[check-wordcount] Could not read ${tidDir} — run astro build first.`);
  process.exit(1);
}

let failures = 0;
const results = [];

for (const file of files) {
  const html = readFileSync(file, 'utf8');

  if (isNoindex(html)) {
    results.push({ file: relative(DIST_DIR, file), words: null, status: 'noindex (skipped)' });
    continue;
  }

  const text = extractMainText(html);
  const words = countWords(text);
  const pass = words >= THRESHOLD;

  results.push({
    file: relative(DIST_DIR, file),
    words,
    status: pass ? 'OK' : `FAIL (${words} < ${THRESHOLD})`,
  });

  if (!pass) failures++;
}

// Print results
const pad = (s, n) => s.toString().padEnd(n);
console.log('\n── Word-count check (' + tidDir + ') ──────────────────');
for (const r of results) {
  const words = r.words !== null ? String(r.words).padStart(5) : '    —';
  const flag = r.status.startsWith('FAIL') ? ' ❌' : r.status.startsWith('OK') ? ' ✓' : '  ';
  console.log(`${words}  ${pad(r.status, 28)} ${r.file}${flag}`);
}

console.log('\n' + (failures === 0
  ? `✓ All ${results.length} pages pass the ${THRESHOLD}-word threshold.`
  : `✗ ${failures}/${results.length} pages below the ${THRESHOLD}-word threshold.`
));

process.exit(failures > 0 ? 1 : 0);
