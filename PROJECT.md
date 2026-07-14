# Town Studios / Monsterville — Project Handbook

> Single source of truth for anyone (dev, designer, PM) picking up this codebase.
> Last updated: 2026-07-14 (post first implementation pass — see IMPROVEMENTS.md for ✅ status).

---

## 1. What this is

A **luxury single-page marketing site** for a high-end creative production company. The
brand shows up under three names in the current code — **Town Studios** (the public-facing
name in copy), **Monsterville** (the parent company / `package.json` name), and **Bobino
Beats** (the producer sub-brand whose logo/assets are used). Unifying this is an open
decision (see §8).

The site is an immersive, scroll-driven "digital experience": a preloader, a custom cursor,
a flashlight-reveal hero, and stacked full-height sections framed by corner navigation. It sells four things:

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
| Extras | **lucide-react** (icons) | gsap & canvas-confetti were removed (unused / replaced by REC animation) |
| Fonts | `next/font/google` — **Syne** (display) + **Outfit** (body) + **Bodoni Moda** (editorial serif accent) | Loaded in `layout.tsx` |

Node 25 / npm 11 on the dev machine. Target is any Node 18+ environment (Vercel-ready).

---

## 3. Getting started

```bash
cd MONSTERVILLE-WEB-main
npm install          # node_modules is NOT committed
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint (next core-web-vitals + TS)
```

The folder **is now a git repository** (baseline + implementation commits). Next step:
add a remote (GitHub) and CI (lint + build). `brand-archive/` is untracked by design.

---

## 4. Architecture

```
src/
├── app/
│   ├── layout.tsx      Root HTML, fonts, <body> theme, grain overlay, metadata
│   ├── page.tsx        Client page: preloader gate + Lenis + section composition
│   ├── globals.css     Tailwind import, CSS variables, .glass utilities, keyframes
│   └── favicon.ico
├── data/
│   └── pricing.ts      Single source of truth for service pricing (Services + BookSession)
├── lib/
│   └── motion.ts       Shared framer-motion easing
└── components/         One component per section (all client components)
    ├── Preloader.tsx        Fake 2.8s loader, then reveals the page
    ├── CustomCursor.tsx     Spring-follow custom cursor (desktop only, JS-gated)
    ├── CornerNav.tsx        Corner-word nav (desktop) / bottom bar (mobile)
    ├── Hero.tsx             Flashlight-reveal hero, dust beam, spinning sticker CTA
    ├── About.tsx            01 · Editorial copy + stats + image composition
    ├── Services.tsx         02 · Interactive hover/tap list of 7 capabilities
    ├── Portfolio.tsx        03 · Full-bleed editorial rows + "artifact" mode, shared-context synth
    ├── Artists.tsx          04 · Horizontal-scroll roster of resident creatives
    ├── BookSession.tsx      05 · Session configurator, live quote (src/data/pricing.ts), REC confirm
    ├── Shop.tsx             Product grid + slide-in cart drawer
    ├── News.tsx             Editorial article grid
    ├── JoinTown.tsx         3-step talent application
    └── Footer.tsx           Brand, directory links, newsletter, socials
```

### How the page assembles (`page.tsx`)
1. `loading` state shows `<Preloader>` until its fake progress hits 100%.
2. After load, everything renders inside `<ReactLenis root>` for smooth scroll.
3. `CustomCursor` (fixed overlay) and `CornerNav` (fixed corner words / mobile bottom
   bar) render above the sections. Sections carry ids (`#about`, `#work`, `#book`,
   `#shop`, `#join`) that the nav scrolls to.

### Data model
Pricing now lives in `src/data/pricing.ts` (shared by Services + BookSession). The other
content arrays (projects, artists, products, articles, roles) are still hardcoded in
components — extracting them (or adopting a CMS) remains a near-term goal (E2/F8).

### Design system (in `globals.css`)
- **Palette:** background `#080808`, foreground `#F5F5F5`, accent orange `#FF5A1F`,
  steel blue `#3A6073`.
- **Surfaces:** `.glass` and `.glass-premium` (backdrop-blur cards), `.noise-overlay`
  (film grain), `.ambient-glow` (pulsing blur).
- **Type:** `Syne` for `h1–h4`/`.font-display`, `Outfit` for body. Heavy use of
  uppercase mono-style micro-labels with wide tracking.
- **Motif:** numbered section badges (`01 /`, `02 /` … now matching visual order),
  orange dot markers, images that brighten/colorize on hover.
- **Accent voice:** `.font-editorial` (Bodoni Moda italic) for one word per headline,
  project titles, and the hero tagline — the FKJ-style editorial counterpoint.

---

## 5. Section-by-section reference

| # | Component | Purpose | State / logic | Backend needed to go live |
|---|---|---|---|---|
| — | Preloader | Brand intro | Fake timed progress | none (optionally gate on real asset load) |
| — | CustomCursor | Cursor flair | Tracks hover targets, JS-gated `cursor:none` | none |
| — | CornerNav | Navigation | Corner words (desktop) / bottom bar (mobile) | none |
| — | Hero | First impression + CTA | Flashlight mask, dust canvas, sticker CTA | none |
| 1 | About | Story + stats | Scroll reveal | none (stats should be real) |
| 2 | Services | Show capabilities | Hover/tap selects active service | none |
| 3 | Portfolio | Prove the work | Filter + cover/artifact rows + shared synth | real media/audio assets, links |
| 4 | Artists | Roster | Horizontal scroll (native + arrows) | profile pages / links |
| 5 | BookSession | Convert to booking | Price calc from pricing.ts, calendar, REC confirm | **calendar API + booking store + email** |
| 6 | Shop | Sell products | Cart CRUD, subtotal | **product catalog + payments + fulfillment** |
| 7 | News | Editorial/SEO | Static grid | CMS + article routes |
| 8 | JoinTown | Recruit talent | 3-step wizard (fixed) | **form store + email/notification** |
| — | Footer | Nav + capture | Newsletter mock | **newsletter provider (Mailchimp/Resend)** |

---

## 6. Assets

`public/images/` holds the brand logos and mockups actually used by the site
(`WALL PAPER.jpg`, `PORTE.jpg`, `BOOK.jpg`, `Bobino*` logos, `MONSTERVILLE*`, `NETFLIX.jpg`,
`SHIRT.jpg`, `TAMPON.jpg`, etc.).

The unrelated production material (LUTs, PSDs, fonts, contracts) has been **moved to
`brand-archive/`** at the repo root (untracked in git) — it no longer ships with the site.
The LUTs there remain useful for F7 (grading the future photo shoot).

⚠️ **Content flag:** `Bobino Beats.jpg` is actually a **Berklee College of Music
certificate** (Bobino Vonyoh, Composing & Orchestrating for Film and TV) currently used
as an artist portrait / service visual / news thumbnail. `NETFLIX.jpg` and
`WALL PAPER.jpg` are white-ground logo cards. The only true photograph in the repo is
`PORTE.jpg` (the entrance mockup used by the flashlight hero). A real photo shoot is the
single highest-leverage content task — see DESIGN-DIRECTION.md Move 5.

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
7. **The Berklee certificate** — keep it as a credibility asset (About section, framed) or
   remove it from the public site? It's currently woven into three sections as decoration.

---

## 9. Known issues (short list — full audit in IMPROVEMENTS.md)

- **Mobile design is off** (confirmed by owner) — layout/scale/nav problems on small screens.
- On-screen section numbers render out of order (Portfolio "05" appears before Artists "04").
- Everything is a client component — no SSR/SEO benefit; page is one big JS bundle.
- `<img>` used everywhere instead of `next/image` (no optimization/lazy-load).
- No git history, no tests, no error boundaries, no loading/empty states beyond mocks.
- Unused dependency (`gsap`) and unused imports in a few components.
