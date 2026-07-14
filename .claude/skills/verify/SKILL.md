---
name: verify
description: Build, launch and drive the Town Studios site to verify changes end-to-end (dev server, browser pane, known rAF/visibility gotchas).
---

# Verifying MONSTERVILLE-WEB (Town Studios site)

## Launch
```bash
npm install            # first time only
npm run dev            # http://localhost:3000  (do NOT pipe through `head` — SIGPIPE kills it)
npm run build          # production check (Turbopack, ~2s)
```
Detached launch that survives the session:
`(nohup npm run dev > /tmp/dev.log 2>&1 &)`

## Driving the page
- A fake **preloader (~3s)** gates the whole page; wait for it before querying sections.
- Section anchors: `#about`, `#work` (portfolio), `#book`, `#shop`, `#join`.
- Jump instantly with `window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)`
  — smooth scrolling goes through **Lenis** (`useLenis().scrollTo`), not native
  `scrollIntoView({behavior:'smooth'})`, which Lenis fights.
- Mobile pass: resize pane to 375×812. Known-good state after fixes: hero title
  `text-[13vw]`, corner nav collapses to a bottom bar.

## Gotchas (cost real time)
- **Occluded browser pane ⇒ `document.visibilityState === "hidden"` ⇒ rAF fully
  suspended.** All framer-motion entrance animations freeze at initial state and
  screenshots look "blank" or mid-animation (e.g. cart drawer stuck half-open at
  x=81). Verify with `getBoundingClientRect()` measurements, not only pixels.
  Hero + preloader are hardened against this (instant mount / time-based progress);
  other sections' `whileInView` animations are not.
- The site is one client-rendered page; `curl` only shows the preloader markup.
- Images with spaces in filenames are normal here (`PORTE.jpg` is the only real photo).

## What to re-check after styling changes
- No horizontal overflow at 375px (hero title, booking quote panel were past offenders).
- `globals.css` must never gain **unlayered** broad rules (`* { margin:0 }` once
  disabled every Tailwind spacing utility — cascade layers lose to unlayered CSS).
