# Analytics Access — klocka.com

## GSC (Google Search Console)

- **Property URL:** https://klocka.com/
- **Access type:** Service account
- **Service account email:** investviwer@investviewer.iam.gserviceaccount.com
- **Credential file:** `~/Websites/investviewer.com/secrets/investviewer-google-key.json`
  (override with `$GOOGLE_APPLICATION_CREDENTIALS`)
- **Permission owner:** Board (info@creamfile.com)

### How to pull GSC data

```bash
python3 ~/Websites/tools/weekly_report.py --group brand-apps --week [YYYY-WNN]
# or for this site only:
python3 ~/Websites/investviewer.com/GSC/fetch_gsc.py \
    --site https://klocka.com/ --start 2026-08-18 --end 2026-08-24 --dimensions query page
```

### Where CSVs land

`~/Websites/tools/data/brand-apps/[YYYY-WNN]/`

---

## GA4 (Google Analytics 4)

- **Property ID:** [Not yet assigned — board to provide]
- **Access type:** Service account (same credential as GSC)
- **Permission owner:** Board (info@creamfile.com)

### How to pull GA4 data

```bash
python3 ~/Websites/investviewer.com/GSC/fetch_ga4.py \
    --property-id [Not yet assigned — board to provide] --start 2026-08-18 --end 2026-08-24
```

---

## Notes

- If you get a 403, the service account has not been granted access to this property.
  File a Paperclip issue asking the board to grant access (they do it in the GSC/GA4 UI).
- The weekly report also loads data into `~/Websites/seo_metrics.duckdb` (fact_search_weekly table).
- See `~/Websites/tools/METRICS_STORE.md` for how to query historical data.
