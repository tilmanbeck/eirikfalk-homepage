import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Free-text fields exist per language. English falls back to German at render time.
const localized = z.object({ de: z.string(), en: z.string().optional() });

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
  }),
});

// One file per page and language: de/home.md, en/home.md, ...
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    page: z.string(),
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    intro: z.string().optional(),
  }),
});

export const collections = { concerts, testimonials, pages };
