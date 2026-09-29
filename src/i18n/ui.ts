export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export const ui = {
  de: {
    'site.name': 'Eirik Falk',
    'site.role': 'Tenor',
    'nav.home': 'Start',
    'nav.about': 'Über mich',
    'nav.services': 'Leistungen',
    'nav.concerts': 'Konzerte',
    'nav.references': 'Referenzen',
    'nav.contact': 'Kontakt',
    'nav.switch': 'English',
    'nav.switchShort': 'EN',
    'nav.menu': 'Menü',
    'cta.contact': 'Kontakt aufnehmen',
    'social.label': 'Profile',
    'social.opens': 'öffnet in neuem Fenster',
    'intro.more': 'Mehr über mich',
    'concerts.heading': 'Nächste Konzerte',
    'concerts.all': 'Alle Konzerte',
    'concerts.empty': 'Aktuell keine Konzerte',
    'concerts.emptyHint': 'Neue Termine erscheinen hier, sobald sie feststehen.',
    'concerts.tickets': 'Details',
    'services.heading': 'Leistungen',
    'services.solo': 'Solist',
    'services.soloText': 'Oper, Oratorium, Kantate und Lied. Als Solist für Konzerte, Passionen und Bühnenprojekte in Deutschland und im Ausland.',
    'services.choir': 'Chorist',
    'services.choirText': 'Ensemble- und Chorprojekte, vom Kammerchor bis zur großen Besetzung. Zuverlässig vom Blatt, sicher in der Stimmgruppe.',
    'services.lessons': 'Gesangsunterricht',
    'services.lessonsText': 'Einzelunterricht in Darmstadt-Bessungen für alle Altersstufen, Klassik und Pop.',
    'services.lessonsLink': 'Zum Gesangsunterricht',
    'services.more': 'Mehr erfahren',
    'testimonial.heading': 'Über den Unterricht',
    'testimonial.note': 'Stimmen von Schülerinnen und Schülern',
    'contact.heading': 'Anfragen für Konzerte, Projekte und Unterricht',
    'contact.text': 'Ich antworte in der Regel innerhalb von zwei Tagen.',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.calendar': 'Kalender abonnieren',
    'footer.rights': 'Alle Rechte vorbehalten.',
  },
  en: {
    'site.name': 'Eirik Falk',
    'site.role': 'Tenor',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.concerts': 'Concerts',
    'nav.references': 'References',
    'nav.contact': 'Contact',
    'nav.switch': 'Deutsch',
    'nav.switchShort': 'DE',
    'nav.menu': 'Menu',
    'cta.contact': 'Get in touch',
    'social.label': 'Profiles',
    'social.opens': 'opens in a new window',
    'intro.more': 'More about me',
    'concerts.heading': 'Upcoming concerts',
    'concerts.all': 'All concerts',
    'concerts.empty': 'No upcoming shows',
    'concerts.emptyHint': 'New dates appear here as soon as they are confirmed.',
    'concerts.tickets': 'Details',
    'services.heading': 'Services',
    'services.solo': 'Soloist',
    'services.soloText': 'Opera, oratorio, cantata and Lied. As a soloist for concerts, passions and staged projects in Germany and abroad.',
    'services.choir': 'Ensemble singer',
    'services.choirText': 'Ensemble and choir projects, from chamber choir to large forces. A reliable sight-reader, secure within the section.',
    'services.lessons': 'Voice lessons',
    'services.lessonsText': 'One-to-one lessons in Darmstadt-Bessungen for all ages, classical and pop.',
    'services.lessonsLink': 'About the lessons',
    'services.more': 'Learn more',
    'testimonial.heading': 'On teaching',
    'testimonial.note': 'Words from students',
    'contact.heading': 'Enquiries for concerts, projects and lessons',
    'contact.text': 'I usually reply within two days.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.calendar': 'Subscribe to calendar',
    'footer.rights': 'All rights reserved.',
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui[defaultLocale][key];
}

export const routes: Record<string, Record<Locale, string>> = {
  home: { de: '/de', en: '/en' },
  about: { de: '/de/ueber', en: '/en/about' },
  services: { de: '/de/leistungen', en: '/en/services' },
  concerts: { de: '/de/konzerte', en: '/en/concerts' },
  references: { de: '/de/referenzen', en: '/en/references' },
  media: { de: '/de/medien', en: '/en/media' },
  contact: { de: '/de/kontakt', en: '/en/contact' },
  imprint: { de: '/de/impressum', en: '/en/imprint' },
  privacy: { de: '/de/datenschutz', en: '/en/privacy' },
};

export function route(key: keyof typeof routes, locale: Locale) {
  return routes[key][locale];
}

/** Pick the localized string, falling back to German. */
export function pick(field: { de: string; en?: string } | undefined, locale: Locale): string {
  if (!field) return '';
  return (locale === 'en' && field.en) || field.de;
}

/** Map a path to its counterpart in the other locale. */
export function alternatePath(path: string, from: Locale, to: Locale): string {
  for (const r of Object.values(routes)) {
    if (r[from] === path) return r[to];
  }
  return routes.home[to];
}

export const site = {
  email: 'eirikefalk@gmail.com',
  phone: '+49 1522 3963739',
  phoneDisplay: '01522 3963739',
  instagram: 'https://www.instagram.com/eirikefalk/',
  operabase: 'https://www.operabase.com/eirik-falk-a2151202/en',
  muvac: 'https://www.muvac.com/de/profile/eirik-falk',
  lessons: 'https://www.gesangsunterrichtbessungen.de/',
};
