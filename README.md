# Ira · Small Business Digital Solutions

Bilingual React/Vite/TypeScript portfolio for an independent Toronto specialist. Five illustrative service cases, supplied images, independent expandable details, image lightboxes, and an existing Google Form for inquiries. No database, analytics, payment changes or added runtime dependencies.

## Run and check

Use Node 22.12+ or Node 24.

```sh
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

Routes: `/ru/` and `/en/`. The production build prerenders both languages, including localized titles, descriptions, Open Graph, canonical URLs and hreflang. `scripts/prerender.mjs` also creates sitemap.xml and robots.txt.

## Content and images

- Translations and SEO: `src/locales/ru.ts`, `src/locales/en.ts`.
- Page layout: `src/App.tsx`; service cards and disclosures: `src/Services.tsx`; design: `src/style.css`.
- Supplied service images: `public/images/services/booking.png`, `furniture.png`, `coffee-content.jpg`, `ai-automation.png`, `customer-acquisition.jpg`. References and localized alt text are in the translations. Images are shown with their full aspect ratio and can be enlarged.
- Owner portrait: `public/portrait.jpg`, rendered only in About Me.
- Social preview images: `public/og-ru.png`, `public/og-en.png`.
- The CAD 300 starting price is for a simple website. Exact included scope must be agreed before work starts. Advanced calculators, complex forms and custom functionality are charged separately; no invented page counts, delivery times or free support are advertised.
- All service examples remain explicitly illustrative. No fictional client outcomes are claimed.

## Inquiry links

`src/contact.ts` centralizes the existing Google Form. Header, Hero and contact-section buttons open it directly; every service inquiry link opens the same form with the localized service title prefilled in the request-description field. The visitor can edit or append their request.

The prefill parameter `entry.1091074207` was observed from the public form's save-progress link and verified in the rendered request field. If the owner replaces that question, update the parameter and recheck all five service links. The site does not process or store submissions itself and has no email API keys.

A clearly marked technical test was submitted on 25 October 2026. Google Forms confirmed acceptance. The owner also confirmed receipt of the test on 25 October 2026. No Google settings were changed.

Public settings:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Final HTTPS origin without a path, e.g. the approved Pages URL or domain |
| `VITE_CONTACT_EMAIL` | Optional confirmed public email. If unset, no email or placeholder is rendered. |

The confirmed origin is `https://small-business-digital-solutions.pages.dev` (without `/ru/`). It is the build default and is recorded in `.env.example`. Canonical URLs use `/ru/` and `/en/`. Override `VITE_SITE_URL` only if the approved domain changes. Explicit `example.com` builds remain noindex.

## Cloudflare Pages — only after approval

The existing `wrangler.toml`, redirect rules and security headers are retained. Build: `npm run build`; output: `dist`; Node: 24; root: repository root. Connect this repository through Cloudflare Pages or run `npm run deploy` only after explicit publication approval. Do not change Google Form, payment or other integration settings as part of deployment.

Before publishing, confirm the technical test reached the owner's Responses/notifications, and agree the website package scope. Check both languages, mobile layout, five disclosures, image lightboxes, inquiry links and production metadata. Google Forms processes the inquiry data; the privacy dialog reflects the current form rather than the retired email endpoint.

Dependency audit on 25 October 2026 reported three existing findings in the Wrangler/Miniflare/undici development-tool chain (one high, two moderate). These packages are not included in the static browser bundle. Dependency versions and the lockfile were not changed as part of these landing-page edits; review tooling updates separately before running local Pages emulation on untrusted input.
