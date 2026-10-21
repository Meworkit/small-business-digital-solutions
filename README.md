# Ira · Small Business Digital Solutions

Bilingual independent-consultant portfolio for Toronto. React, Vite and TypeScript with two runtime dependencies (React and React DOM). No database, CMS, client tracking, fictional testimonials or client outcomes. All portfolio visuals are original CSS/HTML/SVG demonstrations. The five cases cover booking, furniture websites, coffee-shop content, procurement automation, and customer acquisition. The budget slider is illustrative; booking is not persisted.

## Local development

Use Node 22.12+ (or current Node 24 LTS).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Visit `/ru/` or `/en/`. Russian is the default. The Vite server previews the front end; it does **not** run the Pages Function. To test the built site and endpoint together:

```sh
npm run build
npm run pages:dev
```

Put local server secrets in an ignored `.dev.vars` file. Test email delivery only to a recipient you control. Never use production secrets in browser variables.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The build prerenders both languages to complete HTML for indexing and no-JavaScript reading, then hydrates interactive controls. Metadata, sitemap and robots.txt are generated using `VITE_SITE_URL`. The root redirects to `/ru/`; `/ru` and `/en` redirect to trailing-slash routes on Pages. `example.com` builds intentionally have `noindex` and disallow crawling; set the real HTTPS origin before public launch.

## Edit content and images

- `src/locales/ru.ts` and `src/locales/en.ts` contain translated copy, service lists, labels, demo strings and SEO text. Keep both structures in sync (TypeScript checks this).
- `src/App.tsx` contains the page layout; `src/Services.tsx` contains the five service cases, independent disclosure buttons, and original interactive demos; `src/style.css` controls design and responsive breakpoints.
- The RU hero headline follows the supplied text; EN uses an editorial headline. Edit their markup in `App.tsx` when changing headline layout.
- Add a real photograph to `public/portrait.jpg`, then set `VITE_PORTRAIT_URL=/portrait.jpg` and rebuild. The portrait appears only in About Me. The neutral `public/portrait-placeholder.svg` is the default until a real photo is supplied; it is not a fictional person.
- Add verified case studies only when supplied. No project examples on this page are claimed as completed work.
- Original 1200×630 PNG social cards are in `public/og-ru.png` and `public/og-en.png`. Replace these when branding changes; metadata references them automatically.
- Fonts use Google Fonts with local system fallbacks; self-host fonts and remove the CSS import if you want to avoid the external font request.

## Contact configuration — disabled by default

**Ask Ira for the real recipient email before enabling production submissions.** The form displays a setup notice until a public Turnstile key is supplied. The endpoint independently rejects submissions until every server setting exists and `CONTACT_ENABLED=true`.

Build-time public variables (Cloudflare Pages environment settings, then rebuild):

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Final HTTPS origin, no trailing slash or path |
| `VITE_TURNSTILE_SITE_KEY` | Public widget sitekey, restricted to the intended hostname |
| `VITE_CONTACT_EMAIL` | Confirmed public contact email, optional; blank shows a placeholder |
| `VITE_PORTRAIT_URL` | Optional local portrait URL |

Server-only secrets/settings (Cloudflare Pages → Settings → Variables and Secrets):

| Variable | Purpose |
| --- | --- |
| `CONTACT_ENABLED` | Set `true` only after confirming recipient and testing |
| `CONTACT_TO` | Real confirmed recipient email |
| `CONTACT_FROM` | Verified Resend sender, e.g. `Ira Website <website@yourdomain.ca>` |
| `RESEND_API_KEY` | Resend API key, stored as a secret |
| `TURNSTILE_SECRET_KEY` | Secret paired with the public sitekey |
| `SITE_ORIGIN` | Exact permitted browser origin, e.g. `https://yourdomain.ca` |

Use separate preview and production configuration. Turnstile uses the `contact` action; the endpoint verifies success, hostname and action. It also checks origin, JSON type, email/message lengths, payload size and a honeypot, and uses timeouts. The plain-text email preserves user content without HTML injection. No submission or credentials are logged. The UI reports acceptance only after Resend returns a successful response containing an email ID; this means accepted for delivery, not guaranteed inbox arrival. Errors reset the challenge and keep the input for retry. Turnstile is loaded only when configured. Configure Cloudflare rate limiting if traffic volume warrants it.

Provider references: [Cloudflare server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) and [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).

## Cloudflare Pages deployment

Do not deploy or connect a domain until Ira confirms.

After approval, connect `Meworkit/small-business-digital-solutions` through Cloudflare Pages Git integration:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node: 24
- Root: repository root

`wrangler.toml`, `functions/api/contact.ts`, security headers, redirect rules and Function route scoping are included. The Functions directory must remain at repository root. Alternatively, an authorized maintainer can run `npm run deploy` after configuring Cloudflare authentication and environment settings. This command publishes and must only be run with approval.

Before launch: confirm recipient, public email, domain, real portrait and privacy wording; configure Turnstile/Resend; rebuild with the final URL; test both locales, keyboard navigation, mobile layout, invalid and valid form submissions with real test configuration. Confirm mail arrival and sender verification. Privacy text identifies processors and sensitive-document safeguards; agree retention and deletion practices before accepting inquiries.
