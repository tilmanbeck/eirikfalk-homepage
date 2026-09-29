import type { APIRoute } from 'astro';
import { allConcerts, calendar, concertToVevent } from '../lib/concerts';

export const GET: APIRoute = async ({ site }) => {
  const s = site ?? new URL('https://eirikfalk.de');
  const events = (await allConcerts()).map((c) => concertToVevent(c, 'en', s));
  return new Response(calendar(events, 'Eirik Falk, concerts'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
