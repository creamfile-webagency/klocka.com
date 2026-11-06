// scripts/check-tz.mjs
// Verifies that dst.observes in countries.ts is consistent with IANA timezone data.
// A country with observes:false must have the same UTC offset on June 21 and Dec 21.
// A country with observes:true must have different offsets (or close ones for Ramadan-based DST).
// Usage: node --experimental-strip-types scripts/check-tz.mjs

import { countries } from '../src/data/countries.ts';

const summerRef = new Date('2026-06-21T10:00:00Z'); // 12:00 Stockholm CEST
const winterRef = new Date('2026-12-21T11:00:00Z'); // 12:00 Stockholm CET

function getOffset(iana, date) {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: iana,
    timeZoneName: 'shortOffset',
  }).formatToParts(date);
  return parts.find(p => p.type === 'timeZoneName')?.value ?? 'UTC';
}

function fmtTime(iana, date) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: iana,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

let failures = 0;

for (const country of countries) {
  const zone = country.primaryZone;
  const summerOff = getOffset(zone, summerRef);
  const winterOff = getOffset(zone, winterRef);
  const ianaHasDst = summerOff !== winterOff;

  if (country.dst.observes && !ianaHasDst) {
    // Morocco is a special case: DST is Ramadan-based (not June/Dec), so June and Dec
    // are both UTC+1 — IANA has no June/Dec difference. Skip this check for Ramadan DST.
    // We detect this by checking for mid-year transitions instead.
    const midYear = new Date('2026-03-01T12:00:00Z');
    const midYearOff = getOffset(zone, midYear);
    if (midYearOff !== summerOff) {
      const sumTime = fmtTime(zone, summerRef);
      const winTime = fmtTime(zone, winterRef);
      console.log(
        `OK  [${country.slug}]: observes=true  (Ramadan-based DST, mid-year=${midYearOff}) ` +
        `summer=${summerOff} (${sumTime})  winter=${winterOff} (${winTime})`
      );
    } else {
      console.error(
        `FAIL [${country.slug}]: dst.observes=true but IANA shows no June/Dec difference ` +
        `(summer=${summerOff}, winter=${winterOff}). Check if IANA tzdata is up-to-date.`
      );
      failures++;
    }
  } else if (!country.dst.observes && ianaHasDst) {
    console.error(
      `FAIL [${country.slug}]: dst.observes=false but IANA shows ` +
      `summer=${summerOff} vs winter=${winterOff} (hasDst=true). ` +
      `Update dst.observes and dst.rule in countries.ts.`
    );
    failures++;
  } else {
    const sumTime = fmtTime(zone, summerRef);
    const winTime = fmtTime(zone, winterRef);
    console.log(
      `OK  [${country.slug}]: observes=${String(country.dst.observes).padEnd(5)} ` +
      `summer=${summerOff} (${sumTime})  winter=${winterOff} (${winTime})`
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} DST consistency check(s) failed.`);
  process.exit(1);
}
console.log('\nAll DST consistency checks passed.');
