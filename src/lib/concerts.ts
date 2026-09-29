import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import { pick } from '../i18n/ui';

export type Concert = CollectionEntry<'concerts'>;

export function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function allConcerts() {
  return getCollection('concerts');
}

export async function upcomingConcerts(limit?: number) {
  const t = today();
  const list = (await allConcerts())
    .filter((c) => c.data.date >= t)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  return limit ? list.slice(0, limit) : list;
}

export async function pastConcertsByYear() {
  const t = today();
  const list = (await allConcerts())
    .filter((c) => c.data.date < t)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const years = new Map<number, Concert[]>();
  for (const c of list) {
    const y = c.data.date.getFullYear();
    if (!years.has(y)) years.set(y, []);
    years.get(y)!.push(c);
  }
  return [...years.entries()];
}

export function formatters(locale: Locale) {
  const tag = locale === 'de' ? 'de-DE' : 'en-GB';
  return {
    day: new Intl.DateTimeFormat(tag, { day: '2-digit' }),
    month: new Intl.DateTimeFormat(tag, { month: 'short', year: 'numeric' }),
    weekday: new Intl.DateTimeFormat(tag, { weekday: 'long' }),
    full: new Intl.DateTimeFormat(tag, { dateStyle: 'long' }),
  };
}

/** Local Berlin wall-clock date-time as ICS floating time with TZID. */
function icsDateTime(date: Date, time?: string) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (!time) return { value: `${y}${m}${d}`, allDay: true };
  const [hh, mm] = time.split(':');
  return { value: `${y}${m}${d}T${hh}${mm}00`, allDay: false };
}

function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function foldLine(line: string) {
  // RFC 5545: lines longer than 75 octets are folded with CRLF + space
  const out: string[] = [];
  let cur = line;
  while (cur.length > 74) {
    out.push(cur.slice(0, 74));
    cur = ' ' + cur.slice(74);
  }
  out.push(cur);
  return out.join('\r\n');
}

export function concertToVevent(c: Concert, locale: Locale, site: URL) {
  const start = icsDateTime(c.data.date, c.data.time);
  const title = pick(c.data.title, locale);
  const role = c.data.role ? pick(c.data.role, locale) : '';
  const desc = [role, c.data.link ?? ''].filter(Boolean).join('\n');
  const lines = [
    'BEGIN:VEVENT',
    `UID:${c.id}@eirikfalk.de`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    start.allDay ? `DTSTART;VALUE=DATE:${start.value}` : `DTSTART;TZID=Europe/Berlin:${start.value}`,
    `SUMMARY:${icsEscape(`Eirik Falk: ${title}`)}`,
    `LOCATION:${icsEscape(c.data.place)}`,
    desc ? `DESCRIPTION:${icsEscape(desc)}` : '',
    `URL:${new URL(locale === 'de' ? '/de/konzerte' : '/en/concerts', site)}`,
    'END:VEVENT',
  ].filter(Boolean);
  return lines.map(foldLine).join('\r\n');
}

export function calendar(events: string[], name: string) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//eirikfalk.de//Konzerte//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${icsEscape(name)}`,
    'X-WR-TIMEZONE:Europe/Berlin',
    ...events,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
