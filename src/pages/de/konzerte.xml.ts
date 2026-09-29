import type { APIRoute } from 'astro';
import { concertsRss } from '../../lib/rss';
export const GET: APIRoute = async ({ site }) =>
  new Response(await concertsRss('de', site ?? new URL('https://eirikfalk.de')), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
