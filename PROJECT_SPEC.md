# PROJECT_SPEC — eirikfalk.de

Website for Eirik Falk, tenor, Darmstadt. Discovery completed 2026-09-28.
Status: **awaiting approval**. No design or build work starts until this spec is approved.

---

## 1. Goals and audience

**Goal.** A bilingual (DE/EN) booking portfolio that ranks first for Eirik's name and for tenor-related searches in Darmstadt and the Rhein-Main region, that Eirik can update himself, and that later absorbs the singing-lessons site (gesangsunterrichtbessungen.de).

**Audience, in priority order.**
1. Conductors, choir directors, ensembles and concert organisers looking to book a soloist or ensemble singer.
2. Audience members looking for upcoming concerts.
3. Prospective singing students (served by a link to the Wix site until the lessons page is integrated).

**Primary action.** Contact by email or phone. A contact call-to-action is visible on every page.

**Ownership.** Eirik owns and maintains all content. Tilman Beck builds and maintains the site and code. Until Eirik delivers content, the site uses clearly marked placeholders written in his voice, leaning toward Wagner and the oratorio repertoire.

---

## 2. Sitemap and page contents

URL scheme: every page exists under `/de/...` and `/en/...`. The root `/` redirects to `/de/`. Norwegian (`/no/`) is structurally prepared but has no content in v1.

| DE path | EN path | Page |
|---|---|---|
| `/de/` | `/en/` | Home |
| `/de/ueber` | `/en/about` | About |
| `/de/leistungen` | `/en/services` | Services (Solist, Chorist, Gesangsunterricht) |
| `/de/konzerte` | `/en/concerts` | Concerts (upcoming + past) |
| `/de/referenzen` | `/en/references` | References (past engagements) + Repertoire |
| `/de/medien` | `/en/media` | Media (photos, audio, video) — hidden from nav until content exists |
| `/de/kontakt` | `/en/contact` | Contact + press kit |
| `/de/impressum` | `/en/imprint` | Impressum (footer only) |
| `/de/datenschutz` | `/en/privacy` | Datenschutzerklärung (footer only) |
| `/konzerte.ics`, `/concerts.ics` | | Subscribable calendar feed |
| `/de/konzerte.xml`, `/en/concerts.xml` | | RSS feed of concerts |
| `/keystatic` | | Content editor (Eirik, GitHub login) |

**Navigation.** Top bar: Home, About, Services, Concerts, References, Contact, DE/EN toggle. Media appears once it has content. Footer: Impressum, Datenschutz, Instagram, Operabase, Muvac, calendar subscribe link.

### Home
1. Hero: split layout, portrait at column width on one side, name, "Tenor" and a one-line intro on the other.
2. Social row under the hero button: Instagram, Operabase, Muvac (decided 2026-09-29).
3. Two-sentence introduction with link to About.
4. Next three concerts, or the empty state "Aktuell keine Konzerte" / "No upcoming shows".
5. Three service teasers: Solist, Chorist, Gesangsunterricht.
6. One testimonial (from the teaching reviews, labelled as such).
7. Contact block with email and phone.

### About
- Two-column layout: concert photo (from Eirik's Instagram, 2730×1820, credit pending) beside the bio (DE and EN); portrait in the CV block.
- Structured CV list: education (Akademie für Tonkunst Darmstadt, Hochschule für Kirchenmusik Bayreuth — details as placeholders), teachers, masterclasses, awards. Empty groups are hidden.
- Facts: based in Darmstadt, active as soloist and ensemble singer in opera, oratorio, cantata and Lied, in Germany and abroad.

### Services
Three sections with anchors, each with a short text and a contact call-to-action:
- **Solist** — opera, oratorio, cantata, Lied.
- **Chorist** — ensemble and choir engagements for larger and smaller projects.
- **Gesangsunterricht** — short teaser linking to gesangsunterrichtbessungen.de in v1; becomes a full page with pricing and the three student reviews when the Wix site is folded in (phase 2).

### Concerts
- **Upcoming**: list sorted by date ascending, each entry showing date, title, venue/place, optional time, optional role/programme line, optional link (tickets or venue), optional flyer thumbnail (fixed portrait ratio, full image in a lightbox on click), "add to calendar" download per entry.
- Empty state when nothing is upcoming.
- **Past**: visually separated (different section heading, muted styling), grouped by year, most recent year open, older years collapsed. Entries move from upcoming to past automatically by date; nothing is deleted.
- Calendar subscribe link (ICS feed) and RSS link at the top of the page.

### References and Repertoire
- **Referenzen / Past engagements**: grouped by genre (Oper, Oratorium, Kantate, Lied), each entry with work, role, ensemble or conductor, venue, year.
- **Repertoire**: works Eirik can sing, grouped by genre, with composer, work, role/part.
- Horizontal-rule list styling with a narrow text column (Cargo M069 trait).
- Operabase blocks automated access and Muvac lists no works, so both lists are seeded with clearly marked placeholders (`placeholder: true`) for Eirik to replace.

### Media
- Photo grid with lightbox and photographer credit (credit hidden when empty).
- Audio and video as two-click embeds (YouTube, SoundCloud or similar): thumbnail plus a notice, the player loads only after the click.
- Placeholders until content exists; page is hidden from navigation while empty.

### Contact
- Email and phone, obfuscated against bots (rendered by script / encoded, mailto link on click).
- Instagram, Operabase, Muvac links.
- **Press kit**: one or two high-resolution portraits for download, short bio as text (DE/EN), credit line.

### Impressum and Datenschutz
- Impressum: name, postal address (placeholder), email, phone, responsible for content.
- Datenschutzerklärung: hosting on Vercel, Vercel Web Analytics (cookieless), self-hosted fonts, two-click embeds, calendar/RSS feeds, no cookies requiring consent. Drafted from a standard German template, marked for review, not legal advice.
- No cookie banner.

---

## 3. Content data model

All content lives as files in the repository (`content/`), one file per entry, validated at build time. Shared fields are language-neutral; free-text fields exist per language with English falling back to German when missing.

### Concert (`content/concerts/YYYY-MM-DD-slug.md`)
| Field | Type | Required |
|---|---|---|
| title | text (per language, EN optional) | yes |
| date | date | yes |
| time | time | no |
| place | text (venue and city) | yes |
| role | text per language, e.g. "Evangelist, Johannes-Passion" | no |
| link | URL (tickets or venue) | no |
| image | file (flyer, any size, resized at build) | no |
| imageAlt | text per language, falls back to title | no |
| note | short text per language | no |

Derived: upcoming/past by comparing `date` to build date; calendar and RSS entries.

### Reference (`content/references/*.md`)
| Field | Type | Required |
|---|---|---|
| work | text | yes |
| composer | text | no |
| role | text | no |
| genre | one of: Oper, Oratorium, Kantate, Lied, Sonstiges | yes |
| ensemble | text (ensemble or conductor) | no |
| venue | text | no |
| year | number | yes |

### Repertoire entry (`content/repertoire/*.md`)
| Field | Type | Required |
|---|---|---|
| composer | text | yes |
| work | text | yes |
| role | text (part or role) | no |
| genre | as above | yes |

### Testimonial (`content/testimonials/*.md`)
| Field | Type | Required |
|---|---|---|
| quote | text per language | yes |
| author | text (initials or first name, may be empty) | no |
| context | one of: teaching, singing | yes |
| source | text (e.g. press outlet) | no |
| date | date | no |

### Media item (`content/media/*.md`)
| Field | Type | Required |
|---|---|---|
| kind | one of: photo, audio, video | yes |
| title | text per language | yes |
| image | file (photo, or thumbnail for audio/video) | yes for photo |
| credit | text (photographer) | no |
| embedUrl | URL (YouTube, SoundCloud, …) | yes for audio/video |
| alt | text per language | no |

### Page texts (`content/pages/<page>.<lang>.md`)
Bio, CV groups, service descriptions, contact details, imprint, privacy text. One file per page and language.

### Site settings (`content/settings.yaml`)
Name, tagline per language, email, phone, Instagram/Operabase/Muvac URLs, default portrait, press-kit files.

Validation: missing required field or malformed date fails the build; the previous deployment stays live.

---

## 4. Visual direction

**Mood.** Artistic and elegant, classical without cliché, editorial rather than flashy. Light, warm, with green as the identity colour.

**Palette** (web approximations of the requested Pantone TCX colours; final values tuned during the home-page round):

| Role | Colour | Value | Use |
|---|---|---|---|
| Page background | warm off-white with a faint sage tint | ~#F4F2EC | default canvas |
| Section colour | Basil 16-6216 TCX | ~#879F84 | full-bleed sections, image backdrops, hero side |
| Text | Potting Soil 19-1218 TCX | ~#54301A | all body and heading text |
| Accent | Cherry Tomato 17-1563 TCX | ~#E2462C | links, buttons, small labels, occasional large heading on light background |

Rules: Cherry Tomato is never used for body text and never on Basil. Potting Soil on Basil only at heading sizes (contrast ~4.1:1). One fixed theme, no dark-mode toggle.

**Typography.** Decided 2026-09-29 on the home-page preview: Instrument Serif for headings, pull quotes and display numbers; Instrument Sans (variable) for body, lists and metadata. All fonts self-hosted (GDPR). Fraunces + Manrope was the rejected alternative.

**Traits taken from the inspiration sites.**
- Hero portrait as the first impression (jeanphilippchey.de, joachim-hoechbauer.com) — adapted to a split layout because the available portraits are ~1100 px wide.
- Two-column About with portrait beside text (joachim-hoechbauer.com).
- Horizontal-rule lists with a narrow text column for Concerts, References, Repertoire and CV (Cargo template M069).
- Small photo grid with lightbox (davidkrahl.com).
- DE/EN toggle in the top navigation (jeanphilippchey.de, joachim-hoechbauer.com).
- Calendar and media as first-class sections (all three singer sites).

**Traits deliberately not taken.** Press-quote carousel (Chey), dense chronological project grid (arthursimonini.com), all-sans typography, pure white backgrounds.

**Layout.** Multi-page, generous whitespace, asymmetric where it helps (hero, About), otherwise calm single column with a narrow reading measure. Mobile-first.

**Motion.** Subtle: gentle fade-up on scroll via IntersectionObserver, hover states on links and images, smooth lightbox. CSS only, no animation library. Disabled under `prefers-reduced-motion`.

**Images.** Colour photos with a consistent warm grade applied in CSS to tie them to the palette. Not every portrait has to appear. Hero candidate: `portrait_1.jpeg` (direct indoor gaze). Lessons section: the piano-and-guitar room photo from the Wix site (1200×1600, pale sage wall matching Basil). Flyers cropped to a fixed portrait ratio in lists, full in lightbox. No generated imagery: favicon is a typographic SVG monogram, share images are composed from a real portrait plus name at build time.

---

## 5. Tech stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro** | Zero JavaScript by default, built-in content collections with schema validation, built-in image optimisation (AVIF/WebP, responsive widths), built-in i18n routing, official Vercel adapter. Only the editor routes render on the server; everything else is prerendered. |
| Content editing | **Keystatic via Keystatic Cloud**, or GitHub web editing as fallback | Form-based editor on top of the Git repository. Keystatic's GitHub login needs a server, which Pages lacks; Keystatic Cloud provides it. Files stay the source of truth, so GitHub web editing, a translation action and a future bot all keep working. |
| Styling | **Plain CSS with custom properties** | Few components, strong typographic design, hand-tunable, no build-tool coupling. Tokens for colour, type scale, spacing. |
| Motion | CSS transitions + a small IntersectionObserver script | Matches the subtle-motion decision; no library. |
| Fonts | Self-hosted woff2 | GDPR (no requests to Google Fonts). |
| Hosting | **GitHub Pages** (decided 2026-09-29) | Push to main → GitHub Action builds with Astro → Pages deploys. Free, custom domain with HTTPS, portfolio use allowed by the terms. Requires a public repository on a free account. No per-branch preview URLs; review on the github.io address or locally. Vercel was the earlier plan; rejected because of the missing GitHub login connection and the Hobby-tier grey zone. |
| Analytics | Cookieless third-party tool, e.g. GoatCounter or Cloudflare Web Analytics (to be chosen) | No consent banner; GitHub Pages has no built-in analytics. |
| Translation | GitHub Action + Claude API | When a German content file is pushed without an English counterpart, generate the English file marked `translated: auto`. Hand-edited files are never regenerated. Same mechanism for Norwegian later. Needs one API key as a repository secret. Manual writing remains possible. |
| Repository | GitHub, Tilman's account, Eirik as collaborator | Eirik needs a GitHub account (does not have one yet). Transfer to Eirik possible later. |

Rejected: Next.js (ships a React runtime for a site with no app state; i18n needs middleware), Eleventy/Hugo + Decap (Keystatic unsupported; Decap needs an auth backend; more manual image and i18n work), hosted CMS such as Sanity (content leaves the repo, harder bot integration, cost).

Publishing flow: Eirik saves in the editor → commit to `main` → Vercel builds and deploys within minutes. No review step for content. Code and design changes go through Tilman with preview deployments.

---

## 6. Features

**In scope (v1)**
- Bilingual DE/EN with prefixed URLs, root redirect to DE, language toggle to the same page, remembered choice, hreflang tags, no automatic browser-language redirect.
- Norwegian prepared structurally (locale config, fallback), no content.
- Self-service editing via Keystatic for concerts, references, repertoire, testimonials, media, page texts and settings.
- Concert list with upcoming/past split, empty state, automatic archiving by date, year grouping, flyers with lightbox.
- Per-concert calendar download, subscribable ICS feed, RSS feed for concerts.
- Media page with photo lightbox and two-click audio/video embeds, hidden while empty.
- Press kit on the Contact page.
- Obfuscated email and phone.
- Instagram, Operabase, Muvac links.
- Vercel Web Analytics.
- Technical SEO: titles and descriptions per page and language, sitemap, hreflang, canonical URLs, Open Graph / share images, structured data (Person, MusicEvent per concert, Organization-free), clean URLs.
- Keyword targets — German: "Eirik Falk", "Eirik Falk Tenor", "Tenor Darmstadt", "Tenor Rhein-Main", "Sänger Darmstadt", "Tenor Oratorium", "Evangelist Tenor", "Chorsänger Darmstadt", later "Gesangsunterricht Darmstadt". English: "tenor Darmstadt", "tenor Frankfurt area", "oratorio tenor Germany". Each maps to a page or section.
- Google Search Console and Google Business Profile set up on Eirik's Google account with Tilman delegated.
- Impressum and Datenschutzerklärung, no cookie banner.
- Automatic EN translation of new German content via GitHub Action.
- Accessibility WCAG 2.2 AA: contrast ≥ 4.5:1 for text, keyboard-operable lightbox and toggle, visible focus, alt text per language, reduced-motion support.
- Performance targets on a simulated mid-range phone: Lighthouse ≥ 95 in all categories, LCP < 2 s, CLS ≈ 0, JavaScript < 50 KB, home page < 1 MB including images. Lighthouse and an automated accessibility scan run on every preview before review.
- Browser support: last two versions of Chrome, Firefox, Safari, Edge; iOS Safari 16+.

**Phase 2 (designed for, not built in v1)**
- Lessons page integrated into eirikfalk.de with pricing and reviews; redirect from the Wix site.
- Telegram bot that writes concert files through the GitHub API (optionally with Claude in the loop).
- Norwegian content.
- Map link per venue.

**Out of scope**
- Contact form, newsletter, shop, online booking of lessons, blog, dark mode, cookie banner, generated imagery (Nano Banana), Stitch mockups, GSAP or other animation libraries, hosted CMS.

---

## 7. Design workflow

- **Build directly in code**, no Stitch pass. Stitch and Nano Banana MCP servers are configured but expose no tools in the current session; not needed for this plan.
- **Primary skill: `design-taste-frontend`** (brief-first, contextual dials, editorial/portfolio preset, respects existing brand assets, anti-default discipline). Secondary reference: Anthropic's `frontend-design`.
- Not used: `high-end-visual-design` (SaaS glass/bento/spring look), `minimalist-ui` (forces monochrome, bans coloured sections), `gpt-taste` (forces GSAP and randomised layouts), `industrial-brutalist-ui`, `brandkit`, `stitch-design-taste`, `image-to-code`, `imagegen-*`.
- **Review loop:** build the home page first as the style anchor with both font pairings shown, approve on a Vercel preview URL, then build the remaining pages in that language. Lighthouse and accessibility scan before every review request.

---

## 8. Content still missing

| Item | Provider | Interim |
|---|---|---|
| Bio DE/EN (~150 words) | Eirik | Placeholder by Tilman/Claude, Wagner/oratorio flavour |
| CV details: teachers, masterclasses, awards, dates | Eirik | Placeholder groups; empty groups hidden |
| Past engagements (References) | Eirik | Placeholders (Operabase not accessible, Muvac has no list) |
| Repertoire | Eirik | Placeholders |
| Upcoming concerts | Eirik | Empty state |
| Photographer credits for the four portraits | Eirik | Credit field hidden when empty |
| High-resolution originals of the portraits (≥ 3000 px) for press kit and hero | Eirik | Current 1100 px files, split-layout hero |
| Piano-room photo from the Wix site | Tilman (download during build) | — |
| Audio and video recordings, or links to them | Eirik | Media page hidden |
| Singing testimonials or press quotes | Eirik, if any exist | Block empty |
| Teaching testimonials (3 reviews from the Wix site) | Reuse; Eirik confirms permission | Anonymous or initials |
| Postal address for the Impressum | Eirik | Placeholder |
| Service texts for Solist and Chorist | Eirik | Placeholder |
| Domain registration eirikfalk.de (currently free at DENIC), optionally eirikfalk.com as redirect | Tilman registers in Eirik's name | — |
| GitHub account for Eirik | Eirik | Tilman edits on his behalf |
| Google account access for Search Console and Business Profile | Eirik | — |
| Claude API key for the translation action | Tilman | Manual translation |

Contact details to use: eirikefalk@gmail.com, 01522 3963739 (from the Wix site). Instagram: instagram.com/eirikefalk. Operabase: operabase.com/eirik-falk-a2151202. Muvac: muvac.com/de/profile/eirik-falk.

Existing assets: `media/images/performance_1.jpg` and `performance_2_bw.jpg` (concert photos from Instagram, added 2026-09-29; the saved-webpage byproducts next to them are git-ignored), `media/images/portrait_1..4.jpeg` (1058–1280 × 1448–1600 px, 115–308 KB, all portrait orientation; portrait_4 is identical to a Wix site image). Wix site images: piano/guitar room (1200×1600), bead-art rabbit (not used).

---

## 9. Open questions

1. Is Eirik comfortable with the reassigned palette (off-white page, Basil sections, brown text, tomato accent) rather than Basil as the page background? Decided by Tilman for now; to be confirmed with Eirik on the home-page preview.
2. Does Eirik have singing testimonials or press quotes anywhere? If yes, the References page gets a quotes block.
3. Where do his recordings live (YouTube, SoundCloud, private files)? Determines the Media page embeds.
4. Register eirikfalk.com as well?
5. Will Vercel's Hobby tier be acceptable long-term, or plan for Pro once lessons pricing moves onto the site?
6. Restart of Claude Code needed to expose Stitch/Nano Banana tools — irrelevant for this plan unless the workflow changes.
7. Norwegian: does Eirik want to write it himself later, or rely on the translation action?
