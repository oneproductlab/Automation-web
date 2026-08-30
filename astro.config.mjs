// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://flowzora.com',
  // Astro emits directory-style output, so URLs genuinely end in a slash.
  // Declaring it keeps canonical tags identical to the URLs that actually serve,
  // instead of pointing one redirect away from the real page.
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
      serialize(item) {
        const isHome = item.url === 'https://flowzora.com/';
        // Cast through the integration's own enum: it types `changefreq` as an
        // enum rather than a plain string union.
        item.changefreq = /** @type {any} */ (isHome ? 'weekly' : 'monthly');
        item.priority = isHome ? 1.0 : 0.7;
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});