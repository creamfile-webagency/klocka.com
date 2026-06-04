#!/usr/bin/env bash
# klocka.com — Yoast meta description update for 15 brand/category pages
# Usage: WP_USER=<admin> WP_APP_PASS=<app-password> bash scripts/yoast-meta-update.sh
#
# Alternatively, source the env file first:
#   source .klocka.env && bash scripts/yoast-meta-update.sh
#
# Requires: curl, jq
# Auth: WordPress Application Password
#   → WP Admin → Users → Your Profile → Application Passwords → Add New
#   → Set WP_USER and WP_APP_PASS in .klocka.env
#
# Taxonomy note:
#   - Brand pages (/marke/*) are product_tag terms → /wp/v2/product_tag/{id}
#   - Category pages (/k/*) are product_cat terms  → /wp/v2/product_cat/{id}
#
# All 15 term IDs verified 2026-06-04 via WP REST API Link headers.
# Meta descriptions sourced from CRE-1496#document-meta-descriptions.

set -euo pipefail

: "${WP_USER:?Set WP_USER (WordPress admin username)}"
: "${WP_APP_PASS:?Set WP_APP_PASS (WordPress Application Password)}"

WP_BASE="https://klocka.com/wp-json/wp/v2"
AUTH="${WP_USER}:${WP_APP_PASS}"
PASS_COUNT=0
FAIL_COUNT=0

update_term() {
  local endpoint="$1"
  local term_id="$2"
  local meta_desc="$3"
  local url="${WP_BASE}/${endpoint}/${term_id}"

  printf "→ %-20s (id=%s) ... " "$endpoint/$term_id" "$term_id"

  # Encode the meta description safely using jq
  local body
  body=$(jq -n --arg v "$meta_desc" '{"meta":{"_yoast_wpseo_metadesc":$v}}')

  response=$(curl -s -X POST "$url" \
    -u "$AUTH" \
    -H "Content-Type: application/json" \
    -d "$body")

  if echo "$response" | jq -e '.id' > /dev/null 2>&1; then
    echo "✓"
    ((PASS_COUNT++))
  else
    local err
    err=$(echo "$response" | jq -r '.message // .code // "unknown error"' 2>/dev/null || echo "parse error")
    echo "✗  $err"
    ((FAIL_COUNT++))
  fi
}

echo "=== Klocka.com Yoast meta description update — $(date '+%Y-%m-%d %H:%M') ==="
echo "WP user: ${WP_USER}"
echo ""
echo "--- Brand pages (product_tag taxonomy) ---"

update_term "product_tag" 129 "Köp Omega-klockor hos Klocka.com – utforska Seamaster, Speedmaster och De Ville. Schweizisk precision sedan 1848 för den som kräver det bästa."
update_term "product_tag" 133 "Utforska Rolex-klockor på Klocka.com – Submariner, Datejust och GMT-Master. Tidlös lyx och schweizisk precision för den krävande klocksamlaren."
update_term "product_tag" 92  "Hitta Longines-klockor på Klocka.com – Conquest, Master Collection och HydroConquest. Schweizisk elegans med historia sedan 1832."
update_term "product_tag" 128 "Köp Breitling-klockor på Klocka.com – Navitimer, Superocean och Chronomat. Ikoniska flygurklockor med schweizisk kronometerprecision och stil."
update_term "product_tag" 71  "Handla Hugo Boss-klockor på Klocka.com – stilrena designklockor för herrar och damer. Modern lyx och tyskt mode möter schweizisk urmakarkonst."
update_term "product_tag" 48  "Utforska Certina-klockor på Klocka.com – DS Podium, DS-8 och Aqua. Robusta och exakta schweiziska klockor med Double Security-teknologi."
update_term "product_tag" 22  "Köp Casio-klockor hos Klocka.com – G-Shock, Edifice och A168W. Tåliga och stiliga klockor för vardag och äventyr i alla prisklasser."
update_term "product_tag" 95  "Hitta Tissot-klockor hos Klocka.com – T-Classic, PRX och T-Touch Expert. Schweizisk kvalitet till prisvärd lyx – din nästa klocka från Tissot."
update_term "product_tag" 55  "Köp Seiko-klockor på Klocka.com – Prospex, Presage och 5 Sports. Japansk urmakarkonst med enastående pålitlighet och precision i alla prislägen."
update_term "product_tag" 182 "Utforska TAG Heuer-klockor hos Klocka.com – Carrera, Aquaracer och Monaco. Schweizisk sportlyx med stark racinghistoria och modern precision."
update_term "product_tag" 26  "Köp Citizen-klockor på Klocka.com – Eco-Drive, Promaster och Attesa. Solcellsdrivna klockor med japansk precision och miljövänlig teknik."
update_term "product_tag" 115 "Hitta Bulova-klockor hos Klocka.com – Precisionist, Accutron och Curv. Amerikanskt klockmode med extrem precision och ikonisk designhistoria."

echo ""
echo "--- Category pages (product_cat taxonomy) ---"

update_term "product_cat" 16  "Utforska damklockor på Klocka.com – eleganta och moderna klockor för kvinnor från världens ledande märken. Hitta din perfekta damklocka idag."
update_term "product_cat" 18  "Köp herrklockor på Klocka.com – stort urval av sport-, dress- och smartklockor för herrar. Toppvarumärken inom schweizisk och japansk urmakeri."
update_term "product_cat" 137 "Hitta de bästa smartklockorna på Klocka.com – Apple Watch, Garmin och Samsung Galaxy. Jämför funktioner, hälsospårning och design i ett."

echo ""
echo "=== Result: ${PASS_COUNT}/15 updated, ${FAIL_COUNT} failed ==="
if [[ $FAIL_COUNT -gt 0 ]]; then
  echo "NOTE: If meta writes failed, Yoast may not expose _yoast_wpseo_metadesc"
  echo "      via REST API for terms. Fallback: WP Admin → Appearance → Taxonomies"
  echo "      or use WP-CLI: wp term meta update <id> _yoast_wpseo_metadesc '...' --taxonomy=product_tag"
fi
