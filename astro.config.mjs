import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Countries with full editorial content — include in sitemap.
// Add a slug here when KLC-9 completes that country's page.
const MIGRATED_TID_SLUGS = new Set(['kina']);

export default defineConfig({
  site: 'https://klocka.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const m = page.match(/\/tid\/([^/]+)\//);
        if (m) return MIGRATED_TID_SLUGS.has(m[1]);
        return true;
      },
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
