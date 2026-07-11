# AutóSzerviz — Bosch Car Service

Light-theme, Hungarian, cinematic-professional service website. Content (texts,
photos, prices, hours) is editable through a CMS; the contact form is fully
self-hosted (no third-party form service).

## Stack (as per technical scope)

- **Next.js** (App Router, TypeScript) — statically rendered pages + one API route
- **Tailwind CSS** — design tokens in `tailwind.config.ts`; bespoke cinematic
  pieces in the component layer of `app/globals.css`
- **shadcn/ui** primitives (`components/ui/*`) — Button, Input, Textarea, Label, Select
- **Framer Motion** — hero Ken Burns + scroll reveals (respects reduced-motion)
- **Decap CMS** — Git-based admin at `/admin`
- **Nodemailer** — our own contact endpoint at `app/api/contact/route.ts`

> Note: Next.js was pinned to the latest release (16.x) rather than 15.1.6, which
> has a published security advisory (CVE-2025-66478). Same App Router APIs.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Contact form — self-hosted, no third party

The form posts to **`/api/contact`** (a Next.js route handler) which sends email
via **Nodemailer/SMTP**. Nothing leaves through a hosted form product.

Set SMTP credentials as environment variables (copy `.env.example` → `.env.local`):

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your@login
SMTP_PASS=••••••
CONTACT_TO=info@autoszerviz.hu
```

Until these are set, submissions are accepted and logged to the server console
(so dev works), but no mail is sent. Includes a honeypot field for spam.

This route runs anywhere Node runs — including **Render**. If you prefer a
separate service (the way you host questionnaires), the same handler logic can be
lifted into a standalone Render web service and the form's `fetch("/api/contact")`
pointed at its URL.

## Edit content (Decap CMS)

Local editing — two terminals:

```bash
npm run cms          # local CMS proxy
npm run dev
# open http://localhost:3000/admin/
```

Content lives in `/content` as Markdown:

| File / folder            | Controls                                       |
| ------------------------ | ---------------------------------------------- |
| `content/settings.md`    | Company name, phone, email, address, hours, socials |
| `content/hero.md`        | Home hero texts                                |
| `content/about.md`       | Rólunk: intro, stats, **group photo**, certs   |
| `content/services/*.md`  | Each service: title, category, price, icon     |
| `content/testimonials/*` | Customer quotes                                |
| `content/gallery/*.md`   | Gallery images + category                      |

Background images (hero, headers, CTA, 404) are CSS variables at the top of
`app/globals.css`.

For the client to edit the **live** site at `/admin`, connect Decap to GitHub via
Netlify Identity + Git Gateway, or a small OAuth proxy on Vercel/Render (see the
comment block at the top of `public/admin/config.yml`).

## Deploy

Push to a private GitHub repo and deploy on **Render**, Vercel, or Netlify —
all build with `npm run build`. Add the SMTP env vars in the host's dashboard.
Point the `.hu` domain at the host.

## Still open / decide

- **English (EN)** — HU-only for launch (per brief). Add with `next-intl` when confirmed.
- Real photos: team **group photo** (`about.md`), gallery, hero variants.
- Before/After gallery slider — supported via a `before_image` field; wire when there are pairs.
- GDPR privacy / cookie pages — placeholders for now.

## Rebrand + GDPR (added)

- Branded as **Euro Car Service** (Tatabánya); business details live in `content/settings.md`.
- **Google Analytics** (`G-2767D9YLJ1`) loads **only after cookie consent** — see `components/CookieConsent.tsx`. Visitors reopen choices via "Cookie beállítások" in the footer.
- Legal pages: `/adatvedelem` (privacy) and `/cookie-szabalyzat` (cookies), Hungarian — templates with the real contact data; fill the bracketed company/legal fields and have them reviewed.
- Contact form delivers to `eurocarservicekft@gmail.com`; set SMTP in `.env.local` (see `.env.example`, Gmail app-password path).

## Sanity + bilingual (HU / EN) — wired

- Every page exists at `/hu/...` and `/en/...`; `/` redirects to `/hu`.
- Language switcher in the header keeps you on the same page.
- All content comes from **Sanity** (`lib/queries.ts`); UI labels live in `lib/i18n.ts`.
- **Background images are editable in the Studio** ("Háttérképek"): hero, mobile hero,
  CTA band, page headers and 404. Empty fields fall back to the current defaults.
- If Sanity is unreachable the site still builds and renders with fallbacks.

### Content model (Studio)
Általános beállítások · Háttérképek · Főoldal–Hero · Rólunk · Szolgáltatások ·
Vélemények · Galéria

### After changing the schema
```bash
cd studio && npm run dev      # http://localhost:3333
```
