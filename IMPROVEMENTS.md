# Improvement Check — Town Studios / Monsterville

> Audit of the current build with concrete, file-referenced fixes, prioritized.
> Companion to PROJECT.md. Last updated: 2026-07-13.
>
> Severity: 🔴 broken/blocking · 🟠 important · 🟡 polish/nice-to-have.

---

## A. Functional bugs (fix first — these are broken today)

### 🔴 A1. "Join the Network" wizard is stuck on step 1
`src/components/JoinTown.tsx:22` — `handleNext()` advances to step 3 only when
`step === 2`, and never calls `setStep(2)` for step 1. So after selecting a role and
clicking **Next Step**, nothing happens — the application can never be completed.
**Fix:** advance per current step, e.g.
```ts
const handleNext = () => {
  if (step === 1 && !role) return;
  if (step === 2 && !portfolio) return;
  setStep((s) => Math.min(s + 1, 3));
};
```

### 🔴 A2. Literal `**asterisks**` show in success messages
`src/components/BookSession.tsx:323` and `src/components/JoinTown.tsx:205` embed
`**{email}**` / `**{role}**` / `**{portfolio}**` in JSX. Markdown bold does **not** render
in JSX — users literally see the asterisks. **Fix:** replace with `<strong>{email}</strong>`.

### 🟠 A3. Web Audio contexts leak in Portfolio
`src/components/Portfolio.tsx:33` creates a **new** `AudioContext` on every play and never
closes the previous one. Browsers cap concurrent contexts (~6), so after a few "Play Chord"
clicks audio silently stops. **Fix:** create one `AudioContext` lazily, reuse it (resume on
gesture), and only recreate oscillators.

### 🟠 A4. Pricing contradicts itself between sections
`Services.tsx` advertises photography "From $800/session" and videography "Custom Quote",
but `BookSession.tsx:19` bills photography at `$200` and videography at `$250`. Pick one
source of truth (ideally a shared `src/data/pricing.ts`) so quotes match the marketing.

### 🟡 A5. On-screen section numbers are out of order
Render order in `page.tsx` is Hero → About → Services → **Portfolio** → **Artists** →
BookSession … but the badge labels read 01, 02, (Services has no number), **05**, **04**,
**03** … So the eye sees 05 before 04 before 03. Either reorder the sections or renumber the
badges to match visual order.

---

## B. Mobile (owner-confirmed problem area)

### 🔴 B1. No navigation once you leave the hero
The only nav is two buttons inside `Hero.tsx`. After scrolling, there is no header, menu, or
way to jump to Book/Shop/Contact. On mobile this is the biggest UX gap. **Fix:** add a
sticky, condensed top bar or a hamburger menu + a persistent "Book" CTA.

### 🟠 B2. `h-screen` / `min-h-screen` fight the mobile browser chrome
`Hero.tsx:51` uses `h-screen` and sections use `min-h-screen`. On iOS/Android the URL bar
resize makes `100vh` jump and can clip the hero (header + big title + subtitle grid + two
stacked buttons + bottom bar all in `justify-between`). **Fix:** use `100dvh`/`min-h-[100dvh]`
and let tight sections grow instead of forcing full height.

### 🟠 B3. Hero bottom bar crushes on small screens
`Hero.tsx:177` lays out three items (`SCROLL TO DEVIATE`, `NEXT CHAPTER`, `LAT. 43.7001° N`)
with `justify-between` and no wrapping. On phones they collide. **Fix:** hide the side labels
below `sm`, keep only the centered scroll cue.

### 🟠 B4. Wheel hijacking in Artists breaks scrolling
`Artists.tsx:72` calls `e.preventDefault()` on `wheel` to convert vertical scroll into
horizontal. This fights trackpads and can trap the page scroll. **Fix:** drop the wheel
hijack; rely on native touch swipe + the existing arrow buttons (and snap points).

### 🟡 B5. Micro-typography is too small to read/tap on mobile
Pervasive `text-[9px]`/`text-[10px]` labels and tiny calendar/qty buttons
(`BookSession.tsx` day cells, `Shop.tsx` qty controls) fall below comfortable tap-target
size (~44px). Bump sizes and hit areas at the `sm` breakpoint.

### 🟡 B6. Always-on canvas animation drains mobile battery
`AliveBackground.tsx` runs a 60-particle `requestAnimationFrame` loop continuously and
ignores device pixel ratio. **Fix:** pause when tab hidden / offscreen, reduce particle
count on small screens, and respect `prefers-reduced-motion`.

---

## C. Accessibility

- 🟠 **C1.** Every section photo is a CSS `background-image` (Hero/About/Services/Portfolio/
  Artists/News), so screen readers get nothing. Use real `<img>`/`next/image` with `alt`, or
  add `role="img"` + `aria-label`.
- 🟠 **C2.** No `prefers-reduced-motion` support anywhere despite preloader, parallax, custom
  cursor, canvas, and confetti. Add a global reduced-motion guard.
- 🟠 **C3.** `cursor: none` (`globals.css:98`) hides the pointer for everyone on fine
  pointers; if the custom-cursor JS fails, there's no cursor at all. Gate on a feature check
  and keep a fallback.
- 🟡 **C4.** Social links in `Footer.tsx:40` wrap only an SVG — add `aria-label` per link.
- 🟡 **C5.** Low-contrast text (`text-white/30`–`/50` on `#080808`) fails WCAG AA in places.
- 🟡 **C6.** Form inputs aren't associated to labels via `htmlFor`/`id`.

---

## D. Performance & SEO

- 🟠 **D1.** **Everything is a client component.** `page.tsx` is `"use client"` and imports all
  sections, so there's no SSR/streaming and the whole site ships as one JS bundle — bad for
  first paint and SEO. Convert static sections (About, Services, News, Footer) to server
  components; keep interactivity in small client leaves.
- 🟠 **D2.** `<img>` is used instead of `next/image` throughout (Hero logo, Services, Shop,
  Artists, cart). No optimization, lazy-loading, or sizing. Migrate to `next/image`.
- 🔴 **D3.** `public/images/Fine Arts Cadres /` (LUTs, PSDs, fonts, `.mov`/`.mp4`, contracts)
  is **unused** but ships to production and bloats the deploy. Move it out of `public/`.
- 🟡 **D4.** Below-the-fold sections aren't code-split/lazy-loaded (`next/dynamic`).
- 🟡 **D5.** SEO is just `<title>` + description. Add Open Graph/Twitter images, canonical,
  `robots`, `sitemap`, and JSON-LD (Organization/LocalBusiness).

---

## E. Code quality & foundations

- 🟠 **E1.** **Not a git repo.** `git init`, commit, add remote, set up CI (lint + build).
- 🟠 **E2.** **No data layer.** Services/projects/artists/products/articles/roles are hardcoded
  in components. Extract to `src/data/*` (or a CMS) so content isn't a code change.
- 🟡 **E3.** Unused imports — e.g. `BookSession.tsx:5` imports `CalendarIcon`, `Clock`,
  `Sparkles` that aren't used. Clean up (lint will flag once run).
- 🟡 **E4.** `gsap` is a dependency but never imported. Remove it or start using it.
- 🟡 **E5.** `as any` casts on framer-motion easing arrays and the parallax layer loop
  (`Hero.tsx:38`). Type these properly.
- 🟡 **E6.** The accent color `#FF5A1F` is hardcoded ~100+ times even though
  `--color-accent` exists. Use the Tailwind token (`text-accent`, `bg-accent`) for
  themeability.
- 🟡 **E7.** No tests, no error boundaries, no empty/loading/error states beyond the mocks.

---

## F. Artistic elevation (from client references — see DESIGN-DIRECTION.md)

> Source: client-provided inspiration sites **travisscott.com** ("the void" — flashlight
> reveal, spinning sticker CTA, one screen/one action) and **frenchkiwijuice.com** ("the
> photograph" — full-bleed film photo, corner serif nav, zero UI chrome). Full analysis
> and rationale live in DESIGN-DIRECTION.md; these are the resulting work items.

- 🟠 **F1. Flashlight hero.** Rebuild `Hero.tsx` as a studio photograph hidden in
  darkness, revealed by a cursor-following radial mask (touch/gyro on mobile). One CTA
  only — *Book a Session* — styled as a slowly spinning circular sticker (reuse the
  stamp artwork `TAMPON.jpg`). Native metaphor: recording rooms are dark.
- 🟠 **F2. Reduce to one mechanic per screen.** Keep film grain + custom cursor
  (upgraded into the flashlight). Demote the particle background to dust visible only
  in the hero light beam. Drop hero mouse-tilt, ambient blob glows, and confetti
  (replace with a tape-machine "REC" confirmation on booking). Cheap, instant lift.
- 🟠 **F3. Editorial serif accent voice.** Add Bodoni Moda or Playfair Display via
  `next/font`, used sparingly (pull-quotes, artist names, one italic word per headline,
  captions). Industrial (Syne/mono) × editorial (serif) = the beats × cinema duality.
  Not for body text.
- 🟠 **F4. De-card the portfolio.** Replace the glass-card masonry with full-bleed
  image rows, type set directly on the photograph (serif italic + mono index). Phase 2
  concept: **"The Vault"** — projects float in a dark room and reveal under the cursor
  (port of travisscott.com/explore).
- 🟠 **F5. Corner navigation frame.** Solves B1 the FKJ way: four quiet serif words
  pinned to the desktop corners — **Book / Work / Shop / Join** — collapsing to a single
  bottom bar on mobile. Navigation as picture frame, not furniture.
- 🟡 **F6. Sound identity.** Global sound toggle (default off), real beat previews with
  a drawn waveform (Web Audio + canvas already exist in the codebase — fix A3 first),
  soft tape-click hover sounds, vinyl-crackle bed. Preloader status becomes a VU
  meter/tape counter driven by real load progress.
- 🟡 **F7. Cinema-graded photography.** Schedule a real shoot (rooms, console, hands on
  faders, artists mid-take), shot dark, graded with the pro LUTs already in the repo
  (`Fine Arts Cadres /…/*.cube` — move them out of `public/` per D3). Makes the "A24
  grade" claim visible. Everything in F1/F4 gets better the day this lands.
- 🟡 **F8. Homepage as campaign canvas.** The hero's central artifact (latest drop /
  next open date / new video) becomes one CMS-driven slot, repainted per era without
  code changes. Pairs with E2.

**Guardrails (what we do NOT copy):** their emptiness — we still must convert bookings,
shop, and recruiting, so all sections stay, just calmer and more photographic; serif
stays an accent, not body text; total darkness stays confined to hero/vault moments —
booking and shop remain instantly legible.

---

## Suggested order of attack

1. **Bugs A1–A2** (broken form + literal asterisks) — minutes, high visibility.
2. **Mobile B1–B4** — the owner's stated priority (F5 corner nav is the fix for B1).
3. **F2 (reduce effects)** — cheap, instantly raises perceived quality.
4. **F1 + F5** (flashlight hero + corner nav) — the new artistic signature; prototype
   behind a flag and show the client.
5. **Foundations E1–E2** (git + data layer) — unblocks the team; E2 pairs with F8.
6. **A3/A4** (audio leak + pricing truth) — A3 blocks F6.
7. **F3 + F4** (serif voice + de-carded portfolio) — site-wide artistic lift.
8. **Perf/SEO D1–D3** before any real launch.
9. **Accessibility C** pass.
10. **F6/F7/F8** (sound, photography, campaign canvas) alongside the Tier-1 "make it
    real" backend work from PROJECT.md §7.
