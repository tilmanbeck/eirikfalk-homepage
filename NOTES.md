# Project notes — eirikfalk.de

Status and open to-dos. Last updated 2026-09-29.
The full specification lives in [PROJECT_SPEC.md](PROJECT_SPEC.md).

## Where things stand

- **Live preview:** https://tilmanbeck.github.io/eirikfalk-homepage/
- **Hosting:** GitHub Pages. Every push to `main` builds and deploys through `.github/workflows/deploy.yml` in about three minutes.
- **Repository:** public, made so for testing and feedback with Eirik. GitHub Pages on a free account cannot serve from a private repository.
- **Pages built:** Home, Über mich, Leistungen, Konzerte, Referenzen, Medien, Kontakt, Impressum, Datenschutz, each in German and English. Calendar feed, RSS feed, per-concert calendar downloads, sitemap and structured data are in place.
- **Quality checks:** Lighthouse mobile 98 to 100 in all categories on the sampled pages. Automated accessibility scan clean on all German pages at desktop and mobile width.

## Decisions taken

| Topic | Decision |
|---|---|
| Typography | Instrument Serif for display, Instrument Sans for text, both self-hosted |
| Palette | Off-white page, Basil sections, Potting Soil text, Cherry Tomato as accent. Links and buttons use a deeper tomato (`#b8371f`) and full-bleed sections a slightly lighter Basil (`#93aa90`) so text meets WCAG AA |
| Hero | Split layout, portrait on a Basil block, profile links (Instagram, Operabase, Muvac) as mark-plus-name row under the button |
| About page | Concert photo from Eirik's Instagram beside the bio |
| Hosting | GitHub Pages. Vercel was dropped because the account had no GitHub login connection and the free tier is worded as non-commercial |
| Editing | Content is one file per item under `content/`. Form-based editing via Keystatic Cloud is planned; GitHub's web editor works meanwhile |
| Bot | Possible later, either a Telegram bot or an issue-driven agent writing files through the GitHub API. Phase 2 |

## Domain registrar research (2026-09-29)

Goal: register `eirikfalk.de` with a provider that is stable in price, reliable, GDPR-compliant and ideally German. The domain was unregistered when checked on 2026-09-28.

Prices are per year including VAT unless noted.

| Provider | Seat | .de renewal | Notes |
|---|---|---|---|
| **INWX** (recommended) | Berlin | about 4.30 (3.60 net); registration 4.71 net | Specialist registrar, DENIC member, one flat price list, no introductory pricing, free DNS, easy transfer out |
| netcup | Karlsruhe | 5.04 | Same price every year, DNS included, 12-month term |
| Domain-Offensive (do.de) | Alfeld | 8.28 | Flat price, no setup or transfer fees, DENIC member |
| united-domains | Starnberg | 19 (5 in the first year) | Polished interface and phone support, triple the price after year one, part of the IONOS group |
| IONOS, Strato | Montabaur, Berlin | about 15.60 after the introductory period | Introductory price followed by an increase |
| Hetzner | Gunzenhausen | about 12 | Domains are a side product for hosting customers |

All are German companies. DENIC has not published holder data in its public lookup since 2018.

**Not needed at the registrar:** the "Trust Provider DV SSL" certificate that INWX offers. GitHub Pages issues and renews its own HTTPS certificate for free. Hosting packages are not needed either.

**DNS records for GitHub Pages**

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | tilmanbeck.github.io |

Sources: [INWX price list](https://www.inwx.com/en/domain/pricelist), [netcup .de domain](https://www.netcup.com/de/domain/zusaetzliche-domain-de), [Domain-Offensive .de](https://www.do.de/domains/de-domain/), [united-domains test 2026](https://www.stark.marketing/blog/united-domains-test/), [EXPERTE.de comparison](https://www.experte.de/domains/de), [it-daily overview 2026](https://www.it-daily.net/it-management/digitalisierung/de-domains-2026).

## Hosting alternatives that keep the repository private

Recorded in case the public repository becomes a concern. The build workflow stays the same; only the upload step changes.

| Option | Cost | Notes |
|---|---|---|
| Cloudflare Pages (recommended alternative) | free | Upload from the GitHub Action with an API token, commercial use allowed, free cookieless analytics. The bare domain must use Cloudflare DNS |
| Netlify | free tier | Private repos fine, 100 GB bandwidth a month, analytics is paid |
| GitHub Pro | 4 USD a month | No code change, Pages from a private repo |
| German web hosting via SFTP | a few euros a month | Data stays in Germany, no previews, more to administer |

## Open to-dos

### Tilman
- [ ] Register `eirikfalk.de` in Eirik's name (recommended: INWX), optionally `eirikfalk.com` as a redirect
- [ ] Set the DNS records above, then tell Claude so `public/CNAME` can be added and the site moves to the domain
- [ ] Decide whether the repository stays public or moves to a private setup (see alternatives above)
- [ ] Choose analytics: GoatCounter or Cloudflare Web Analytics, both free and cookieless
- [ ] Create a Keystatic Cloud account (or let Eirik create it) for the form-based editor
- [ ] Create a Claude API key for the automatic translation action, stored as a repository secret
- [ ] Collect Eirik's feedback on the live preview

### Eirik
- [ ] Review the design on the live preview, including the reassigned colour palette
- [ ] Replace the placeholder bio (About) and the short press bio (Contact), German and English
- [ ] CV details: degrees, years, teachers, masterclasses, awards
- [ ] Real list of past engagements and repertoire (current entries are placeholders marked `placeholder: true`)
- [ ] Upcoming concerts (current three are placeholders)
- [ ] Postal address for the Impressum
- [ ] Photographer credits for the four portraits and the two concert photos, and confirmation that they may be published
- [ ] High-resolution originals of the portraits for the press kit
- [ ] Links to recordings (YouTube, SoundCloud or similar) for the Media page
- [ ] Testimonials or press quotes about his singing, if any, with permission to publish
- [ ] Confirm permission to reuse the three student reviews from the lessons site
- [ ] Create a GitHub account so he can be added as collaborator
- [ ] Google account access for Search Console and a Google Business Profile
- [ ] Decide whether he wants an address like `mail@eirikfalk.de` instead of the Gmail address

### Build work remaining (Claude)
- [ ] Add `public/CNAME` and verify HTTPS once DNS is set
- [ ] Install and configure Keystatic with Keystatic Cloud, including upload limits and field hints
- [ ] GitHub Action for automatic English translation of new German content
- [ ] Add the chosen analytics snippet and name the service in the privacy policy
- [ ] Remove placeholder entries and the placeholder notices once real content arrives
- [ ] Lighthouse and accessibility run against the final domain
- [ ] Submit the sitemap in Google Search Console

### Phase 2, not started
- [ ] Integrate the singing-lessons site into eirikfalk.de and redirect the Wix site
- [ ] Bot-based updates (Telegram or issue-driven agent)
- [ ] Norwegian content
