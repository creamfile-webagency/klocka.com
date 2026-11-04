# Analytics Access — klocka.com

## GSC (Google Search Console)

- **Property URL:** https://klocka.com/
- **Access type:** Service account
- **Service account email:** klockrummet@klockrummet-495806.iam.gserviceaccount.com
- **Credential file:** `~/Websites/Klockrummet.se/secrets/key-google-klockrummet.json`
  (override with `$GOOGLE_APPLICATION_CREDENTIALS`)
- **Permission owner:** Board (info@creamfile.com)
- **Access confirmed:** 2026-11-02 (board comment CRE-8305)

### How to pull GSC data

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/ben/Websites/Klockrummet.se/secrets/key-google-klockrummet.json"
python3 ~/Websites/tools/weekly_report.py --group brand-apps --week [YYYY-WNN]
# or for this site only:
python3 ~/Websites/tools/fetch_gsc.py \
    --site https://klocka.com/ --start 2026-10-26 --end 2026-11-01 --dimensions query page
```

### Where CSVs land

`~/Websites/tools/data/klocka-com_[dates]_[dimension].csv`

---

## GA4 (Google Analytics 4)

- **Measurement ID:** G-FXEJ5M904P
- **Property ID:** 357931740
- **GA4 Account:** accounts/201661240 (E-Com)
- **Access type:** Service account (same credential as GSC)
- **Service account email:** klockrummet@klockrummet-495806.iam.gserviceaccount.com
- **Credential file:** `~/Websites/Klockrummet.se/secrets/key-google-klockrummet.json`
- **Permission owner:** Board (info@creamfile.com)
- **Access confirmed:** 2026-11-02 (board comment CRE-8305)

### How to pull GA4 data

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/ben/Websites/Klockrummet.se/secrets/key-google-klockrummet.json"
python3 ~/Websites/tools/fetch_ga4.py \
    --property-id 357931740 --start 2026-10-26 --end 2026-11-01
```

---

## Notes

- If you get a 403, the service account has not been granted access to this property.
  File a Paperclip issue asking the board to grant access (they do it in the GSC/GA4 UI).
- The weekly report also loads data into `~/Websites/seo_metrics.duckdb` (fact_search_weekly table).
- See `~/Websites/tools/METRICS_STORE.md` for how to query historical data.
