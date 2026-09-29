import type { APIRoute, GetStaticPaths } from 'astro';
import { allConcerts, calendar, concertToVevent } from '../../lib/concerts';

export const getStaticPaths: GetStaticPaths = async () => {
  return (await allConcerts()).map((c) => ({ params: { id: c.id }, props: { concert: c } }));
};

export const GET: APIRoute = async ({ props, site }) => {
  const s = site ?? new URL('https://eirikfalk.de');
  const ev = concertToVevent(props.concert, 'de', s);
  return new Response(calendar([ev], 'Eirik Falk'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
