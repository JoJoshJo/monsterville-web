# Town Studios / Monsterville — Project Handbook

> Single source of truth for anyone (dev, designer, PM) picking up this codebase.
> Last updated: 2026-07-13.

---

## 1. What this is

A **luxury single-page marketing site** for a high-end creative production company. The
brand shows up under three names in the current code — **Town Studios** (the public-facing
name in copy), **Monsterville** (the parent company / `package.json` name), and **Bobino
Beats** (the producer sub-brand whose logo/assets are used). Unifying this is an open
decision (see §8).

The site is an immersive, scroll-driven "digital experience": a preloader, a custom cursor,
an animated particle background, and ten stacked full-height sections. It sells four things:

1. **Studio services** — recording, mixing, mastering, photo, video, creative direction.
2. **Session bookings** — an interactive configurator + calendar with live price quotes.
3. **A boutique** — beats, drum kits, merch, and plugins with a working cart.
4. **A talent network** — a multi-step "join as a resident creative" application.

It originated from a hand-drawn wireframe (header / hero / services / bookings / shop /
portfolio / join / footer) that was analyzed and expanded into this build.

**Important:** everything is **front-end only today.** There is no backend, no database, no
payments, and no email. Every form, booking, and checkout is a mock that resolves in local
React state. Making these real is the core of "taking it to the next level" (see §7).

---

## 2. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2** (App Router) | `src/app` structure |
| UI runtime | **React 19.2** | All components are `"use client"` |
| Language | **TypeScript 5** (strict) | Path alias `@/* → src/*` |
| Styling | **Tailwind CSS v4** | Config lives in `globals.css` via `@theme`, not a JS config |
| Animation | **framer-motion 12** | Scroll, reveal, layout animations |
| Smooth scroll | **lenis 1.3** | Wrapped at the page root |
| Extras | **gsap 3**, **canvas-confetti**, **lucide-react** (icons) | gsap is installed but not yet used |
| Fonts | `next/font/google` — **Syne** (display) + **Outfit** (body) | Loaded in `layout.tsx` |

Node 25 / npm 11 on the dev machine. Target is any Node 18+ environment (Vercel-ready).

---

## 3. Getting started

```bash
cd MONSTERVILLE-WEB-main
npm install          # node_modules is NOT committed and not yet installed
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint (next core-web-vitals + TS)
```

**This folder is not a git repository yet.** First housekeeping step for the team is
`git init`, add a remote, and commit. `.gitignore` is already in place and correct.

---

## 4. Architecture

```
src/
├── app/
│   ├── layout.tsx      Root HTML, fonts, <body> theme, grain overlay, metadata
│   ├── page.tsx        Client page: preloader gate + Lenis + section composition
│   ├── globals.css     Tailwind import, CSS variables, .glass utilities, keyframes
│   └── favicon.ico
└── components/         One component per section (all client components)
    ├── Preloader.tsx        Fake 2.8s loader, then reveals the page
    ├── CustomCursor.tsx     Spring-follow custom cursor (desktop only)
    ├── AliveBackground.tsx  <canvas> particle + light-orb field, mouse-reactive
    ├── Hero.tsx             01 · Title, parallax, Book/Explore CTAs
    ├── About.tsx            02 · Editorial copy + stats + image composition
    ├── Services.tsx         Interactive hover list of 7 capabilities
    ├── Portfolio.tsx        Filterable project grid + Web Audio "chord" player
    ├── Artists.tsx          Horizontal-scroll roster of resident creatives
    ├── BookSession.tsx      Session configurator, live quote, calendar, confetti
    ├── Shop.tsx             Product grid + slide-in cart drawer
    ├── News.tsx             Editorial article grid
    ├── JoinTown.tsx         3-step talent application
    └── Footer.tsx           Brand, directory links, newsletter, socials
```

### How the page assembles (`page.tsx`)
1. `loading` state shows `<Preloader>` until its fake progress hits 100%.
2. After load, everything renders inside `<ReactLenis root>` for smooth scroll.
3. `CustomCursor` and `AliveBackground` are fixed overlays behind/above the content.
4. Two `useRef`s (`aboutRef`, `bookRef`) power the Hero's "Explore" and "Book" buttons,
   which `scrollIntoView`. **This is the only navigation** — there is no nav bar or menu.

### Data model
There is **no data layer.** Every section hardcodes its own arrays inline:
services, projects, artists, products, articles, roles. Content changes today = editing
component source. Extracting this into `src/data/*` (or a CMS) is a near-term goal.

### Design system (in `globals.css`)
- **Palette:** background `#080808`, foreground `#F5F5F5`, accent orange `#FF5A1F`,
  steel blue `#3A6073`.
- **Surfaces:** `.glass` and `.glass-premium` (backdrop-blur cards), `.noise-overlay`
  (film grain), `.ambient-glow` (pulsing blur).
- **Type:** `Syne` for `h1–h4`/`.font-display`, `Outfit` for body. Heavy use of
  uppercase mono-style micro-labels with wide tracking.
- **Motif:** numbered section badges (`01 /`, `02 /` …), orange dot markers, grayscale
  images that colorize on hover.

---

## 5. Section-by-section reference

| # | Component | Purpose | State / logic | Backend needed to go live |
|---|---|---|---|---|
| — | Preloader | Brand intro | Fake timed progress | none (optionally gate on real asset load) |
| — | CustomCursor | Cursor flair | Tracks hover targets | none |
| — | AliveBackground | Ambient canvas | rAF particle loop | none |
| 1 | Hero | First impression + CTAs | Scroll parallax, mouse tilt | none |
| 2 | About | Story + stats | Scroll reveal | none (stats should be real) |
| 3 | Services | Show capabilities | Hover selects active service | none |
| 4 | Portfolio | Prove the work | Category filter + Web Audio synth | real media/audio assets, links |
| 5 | Artists | Roster | Horizontal scroll + wheel hijack | profile pages / links |
| 6 | BookSession | Convert to booking | Price calc, calendar, confetti | **calendar API + booking store + email** |
| 7 | Shop | Sell products | Cart CRUD, subtotal | **product catalog + payments + fulfillment** |
| 8 | News | Editorial/SEO | Static grid | CMS + article routes |
| 9 | JoinTown | Recruit talent | 3-step wizard | **form store + email/notification** |
| — | Footer | Nav + capture | Newsletter mock | **newsletter provider (Mailchimp/Resend)** |

---

## 6. Assets

`public/images/` holds the brand logos and photography actually used by the site
(`WALL PAPER.jpg`, `PORTE.jpg`, `BOOK.jpg`, `Bobino*` logos, `MONSTERVILLE*`, `NETFLIX.jpg`,
`SHIRT.jpg`, `TAMPON.jpg`, etc.).

⚠️ It **also** contains a large `Fine Arts Cadres /` directory of unrelated production
material — LUTs (`.cube`), Photoshop templates (`.psd`), custom fonts (`.otf`), motion
graphics (`.mov`/`.mp4`/`.gif`), and legal contracts (`.docx`/`.pdf`). **None of this is
referenced by the site.** It bloats the repo and would ship to production. It should be
moved out of `public/` (into a separate asset store) before launch — see IMPROVEMENTS.md.

Naming is also messy: spaces, trailing spaces in folder names, `@2x`, and inconsistent
casing make asset paths fragile. Normalizing filenames is recommended.

---

## 7. Product goals — "the next level"

Ordered roughly by impact. Detailed, actionable breakdown lives in **IMPROVEMENTS.md**.

**Tier 0 — foundations**
- `git init` + repo + CI.
- Extract hardcoded content into a data layer or CMS.
- Decide the single brand name and apply it everywhere.

**Tier 1 — make it real (turn mocks into product)**
- **Bookings:** persist requests, real availability calendar, confirmation email, admin view.
- **Shop:** real catalog, Stripe checkout, order + fulfillment (digital downloads for
  beats/kits/plugins, shipping for merch).
- **Forms:** wire JoinTown + newsletter to a backend/provider; add validation + spam
  protection.

**Tier 2 — experience & reach**
- **Mobile design pass** (known issue — see IMPROVEMENTS.md §Mobile).
- Real navigation (persistent header / menu), not just two hero buttons.
- SEO: per-section metadata, Open Graph images, sitemap, structured data.
- Accessibility pass (alt text, focus states, reduced-motion, cursor fallback).
- Performance: `next/image`, asset diet, lazy-load below-the-fold sections.

**Tier 3 — polish**
- Real portfolio media (video/audio) instead of the synth placeholder.
- Artist detail pages, article pages (CMS-backed).
- Analytics + conversion tracking on the booking/checkout funnels.

---

## 8. Open decisions (need product owner input)

1. **Brand name** — Town Studios vs Monsterville vs Bobino Beats. Pick one primary.
2. **Payments** — Stripe? What's the split of digital vs physical goods?
3. **Bookings** — self-serve instant booking, or request-and-confirm? Which calendar backend?
4. **CMS** — headless (Sanity/Contentful/Payload) vs hardcoded vs a lightweight DB?
5. **Hosting** — Vercel is the natural fit; confirm before building backend routes.
6. **Content authority** — are the stats ("72+ Platinum Records", client names like Netflix)
   real and cleared for use, or placeholder?

---

## 9. Known issues (short list — full audit in IMPROVEMENTS.md)

- **Mobile design is off** (confirmed by owner) — layout/scale/nav problems on small screens.
- On-screen section numbers render out of order (Portfolio "05" appears before Artists "04").
- Everything is a client component — no SSR/SEO benefit; page is one big JS bundle.
- `<img>` used everywhere instead of `next/image` (no optimization/lazy-load).
- No git history, no tests, no error boundaries, no loading/empty states beyond mocks.
- Unused dependency (`gsap`) and unused imports in a few components.
