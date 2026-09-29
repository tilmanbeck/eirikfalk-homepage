import type { Locale } from '../i18n/ui';
import { pick } from '../i18n/ui';
import { allConcerts, formatters } from './concerts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function concertsRss(locale: Locale, site: URL) {
  const f = formatters(locale);
  const link = new URL(locale === 'de' ? '/de/konzerte' : '/en/concerts', site).toString();
  const items = (await allConcerts())
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((c) => {
      const title = `${f.full.format(c.data.date)}: ${pick(c.data.title, locale)}`;
      const desc = [c.data.role ? pick(c.data.role, locale) : '', c.data.place].filter(Boolean).join(' · ');
      return `<item><title>${esc(title)}</title><link>${esc(c.data.link ?? link)}</link><guid isPermaLink="false">${c.id}</guid><pubDate>${c.data.date.toUTCString()}</pubDate><description>${esc(desc)}</description></item>`;
    })
    .join('');
  const name = locale === 'de' ? 'Eirik Falk, Konzerte' : 'Eirik Falk, concerts';
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(name)}</title><link>${esc(link)}</link><description>${esc(name)}</description><language>${locale}</language>${items}</channel></rss>`;
}
