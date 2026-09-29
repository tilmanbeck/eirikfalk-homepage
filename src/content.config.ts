import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Free-text fields exist per language. English falls back to German at render time.
const localized = z.object({ de: z.string(), en: z.string().optional() });
const genre = z.enum(['Oper', 'Oratorium', 'Kantate', 'Lied', 'Sonstiges']);

const concerts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/concerts' }),
  schema: ({ image }) =>
    z.object({
      title: localized,
      date: z.coerce.date(),
      time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      place: z.string(),
      role: localized.optional(),
      link: z.string().url().optional(),
      image: image().optional(),
      imageAlt: localized.optional(),
      note: localized.optional(),
      placeholder: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/testimonials' }),
  schema: z.object({
    quote: localized,
    author: z.string().optional(),
    context: z.enum(['teaching', 'singing']),
    source: z.string().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

// Past engagements
const references = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/references' }),
  schema: z.object({
    work: z.string(),
    composer: z.string().optional(),
    role: z.string().optional(),
    genre,
    ensemble: z.string().optional(),
    venue: z.string().optional(),
    year: z.number().int(),
    placeholder: z.boolean().default(false),
  }),
});

// Works Eirik can sing
const repertoire = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/repertoire' }),
  schema: z.object({
    composer: z.string(),
    work: z.string(),
    role: z.string().optional(),
    genre,
    placeholder: z.boolean().default(false),
  }),
});

const media = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/media' }),
  schema: ({ image }) =>
    z
      .object({
        kind: z.enum(['photo', 'audio', 'video']),
        title: localized,
        image: image().optional(),
        credit: z.string().optional(),
        embedUrl: z.string().url().optional(),
        alt: localized.optional(),
        order: z.number().default(100),
        placeholder: z.boolean().default(false),
      })
      .refine((m) => (m.kind === 'photo' ? !!m.image : !!m.embedUrl), {
        message: 'Photos need an image, audio and video need an embedUrl',
      }),
});

// One file per page and language: de/home.md, en/home.md, de/about.md, ...
// Long texts live in the markdown body; short fields in the frontmatter.
const cvItem = z.object({ title: z.string(), detail: z.string().optional(), year: z.string().optional() });
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    page: z.string(),
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    intro: z.string().optional(),
    // about
    education: z.array(cvItem).optional(),
    teachers: z.array(cvItem).optional(),
    masterclasses: z.array(cvItem).optional(),
    awards: z.array(cvItem).optional(),
    // services
    solo: z.string().optional(),
    choir: z.string().optional(),
    lessons: z.string().optional(),
    // contact / press kit
    pressBio: z.string().optional(),
  }),
});

export const collections = { concerts, testimonials, references, repertoire, media, pages };
