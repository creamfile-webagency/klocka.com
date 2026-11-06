import type { Product } from './types';

const GOOGLE_NAMESPACE = 'http://base.google.com/ns/1.0';

function decodeXml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function field(item: string, name: string): string {
  const match = item.match(new RegExp(`<g:${name}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/g:${name}>`, 'i'));
  return match ? decodeXml(match[1].trim()) : '';
}

function parsePrice(value: string): number {
  const normalized = value.replace(/SEK/gi, '').replace(/\s/g, '').replace(',', '.');
  const price = Number.parseFloat(normalized);
  if (!Number.isFinite(price)) throw new Error(`Ogiltigt g:price: ${value}`);
  return price;
}

function productUrl(value: string, placement: string): string {
  const url = new URL(value);
  // Feedens länkar har Google Shopping-parametrar, ibland dubbelkodade ("amp;utm_…").
  // Klockrummets produkt-URL:er behöver inga parametrar, så vi börjar om från en ren query.
  url.search = '';
  url.searchParams.set('utm_source', 'klocka.com');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'produktfeed');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

function gender(value: string): Product['gender'] {
  const normalized = value.toLowerCase();
  if (/female|woman|dam/.test(normalized)) return 'dam';
  if (/male|man|herr/.test(normalized)) return 'herr';
  return 'unisex';
}

function strap(title: string, material: string): Product['strap'] | undefined {
  const value = `${title} ${material}`.toLowerCase();
  if (value.includes('mesh')) return 'mesh';
  if (value.includes('nato')) return 'nato';
  if (/läder|leather/.test(value)) return 'läder';
  if (/stål|steel/.test(value)) return 'stål';
  if (/silikon|silicone/.test(value)) return 'silikon';
  return undefined;
}

export function parseKlockrummetFeed(xml: string, updatedAt = new Date().toISOString(), placement = 'produkt'): Product[] {
  if (!xml.includes(GOOGLE_NAMESPACE)) throw new Error('Klockrummet-feeden saknar Google Shopping-namnrymden');

  const groups = new Map<string, { item: string; silver: boolean; inStock: boolean }>();
  const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) ?? [];

  for (const item of items) {
    const id = field(item, 'id');
    const groupId = field(item, 'item_group_id') || id;
    if (!groupId) continue;
    const isSilver = /silver/i.test(`${field(item, 'image_link')} ${field(item, 'color')}`);
    const inStock = field(item, 'availability').toLowerCase() === 'in_stock';
    const current = groups.get(groupId);
    if (!current) {
      groups.set(groupId, { item, silver: isSilver, inStock });
    } else {
      current.inStock ||= inStock;
      if (isSilver && !current.silver) {
        current.item = item;
        current.silver = true;
      }
    }
  }

  return [...groups.entries()].filter(([, selected]) => selected.inStock).map(([groupId, selected]) => {
    const item = selected.item;
    const title = field(item, 'title');
    const product: Product = {
      id: `klockrummet:${groupId}`,
      source: 'klockrummet',
      merchant: 'Klockrummet',
      brand: 'Deevotion of Sweden',
      title,
      price: parsePrice(field(item, 'price')),
      currency: 'SEK',
      inStock: true,
      image: field(item, 'image_link'),
      url: productUrl(field(item, 'link'), placement),
      gender: gender(field(item, 'gender')),
      strap: strap(title, field(item, 'material')),
      affiliate: false,
      updatedAt,
    };
    const color = field(item, 'color');
    const caseSize = field(item, 'size');
    if (color) product.color = color;
    if (caseSize) product.caseSize = caseSize;
    return product;
  });
}

export async function fetchKlockrummetProducts(feedUrl: string, placement = 'produkt'): Promise<Product[]> {
  const response = await fetch(feedUrl, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Klockrummet svarade HTTP ${response.status}`);
  return parseKlockrummetFeed(await response.text(), new Date().toISOString(), placement);
}
