import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://eirikfalk.de',
  output: 'static',
  adapter: vercel({ imageService: true }),
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
