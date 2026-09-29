import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eirikfalk.de',
  output: 'static',
  adapter: vercel({ imageService: true }),
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
      filter: (page) => !page.includes('/ics/'),
    }),
  ],
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  image: {
    // Portraits are ~1100px; never upscale.
    responsiveStyles: true,
    layout: 'constrained',
  },
});
