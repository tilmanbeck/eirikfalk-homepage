import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed as a static site on GitHub Pages.
// Until the custom domain is live the site is served under https://tilmanbeck.github.io/eirikfalk-homepage/,
// so the workflow passes SITE_URL and SITE_BASE; locally the defaults are the production values.
const SITE_URL = process.env.SITE_URL ?? 'https://eirikfalk.de';
const SITE_BASE = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  output: 'static',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
      filter: (page) => !page.includes('/ics/'),
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
});
