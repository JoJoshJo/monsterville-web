# Worklog — Town Studios / Monsterville

> Complete record of the work done to take this project "to the next level."
> Session date: 2026-07-13 → 2026-07-14.
> Companion docs: [PROJECT.md](PROJECT.md) (handbook), [IMPROVEMENTS.md](IMPROVEMENTS.md)
> (audit + status), [DESIGN-DIRECTION.md](DESIGN-DIRECTION.md) (art direction rationale).

---

## 1. Summary

Starting point: a folder of Next.js source with no git history, ~452 MB of unused files
shipping in `public/`, several broken features, no navigation, and a design that fell
apart on mobile. It looked like a finished product but every form/booking/shop action was
a front-end mock.

What we did, end to end:
1. **Analyzed** every file and wrote a team handbook.
2. **Audited** the build and logged 40+ concrete, file-referenced issues.
3. **Studied** the two client reference sites (Travis Scott, FKJ) and wrote an art
   direction plan.
4. **Implemented** the fixes and the artistic redesign.
5. **Verified** the result in a real browser at desktop + mobile sizes and fixed
   everything the verification pass surfaced.

Net result across the session: **4 git commits**, ~1,000 lines of component code changed,
20+ audit items resolved, deploy size cut from **~494 MB → ~42 MB**.

---

## 2. Documentation produced

| File | What it is |
|---|---|
| [PROJECT.md](PROJECT.md) | Team handbook — what the site is, tech stack, how to run it, architecture, section-by-section reference, asset notes, open decisions. |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | The audit: every issue found, severity-ranked and file-referenced, with ✅ DONE / 🔶 PARTIAL status. |
| [DESIGN-DIRECTION.md](DESIGN-DIRECTION.md) | Analysis of travisscott.com + frenchkiwijuice.com and the 8-move plan to elevate the site's artistic level. |
| WORKLOG.md | This file — the chronological record of everything done. |
| `.claude/skills/verify/SKILL.md` | Repo-specific recipe for building/launching/driving the site (so future verification is fast). |

---

## 3. Reference-site analysis (client inspiration)

The client sent **travisscott.com** and **frenchkiwijuice.com** as inspiration. Findings
(full write-up in DESIGN-DIRECTION.md):

- **Travis Scott — "the void":** near-black single screen; the drop poster is hidden in
  darkness and revealed by a cursor-driven flashlight; the CTA is a spinning sticker.
  Technically simple — the artistry is concept + restraint.
- **FKJ — "the photograph":** one full-bleed analog film photo IS the site; handwritten
  logo; four elegant Bodoni serif nav words in the corners; zero UI chrome.
- **Shared lesson:** pick ONE strong idea and delete everything else. Our site had the
  opposite problem — particles + parallax + tilt + glass cards + cursor + grain + confetti
  all at once.

This produced 8 art-direction moves (F1–F8 in IMPROVEMENTS.md), of which F1–F5 were
implemented this session.

---

## 4. Work done, by category

### 4.1 Foundations
- **`git init`** + committed a baseline, then the implementation work as separate commits.
- **Moved 452 MB of unused production material** (LUTs, PSDs, fonts, contracts — the old
  `public/images/Fine Arts Cadres/` folder) out of `public/` into an untracked
  `brand-archive/`. It no longer ships to production. (Deploy: ~494 MB → ~42 MB.)
- **Created a data layer:** `src/data/pricing.ts` is now the single source of truth for
  service pricing, shared by the Services and Book Session sections.
- **Created `src/lib/motion.ts`** for shared animation easing.
- Removed unused dependencies (`gsap`, `canvas-confetti`) and unused imports.
- Added `.claude/launch.json` (dev-server config) and the verify skill.

### 4.2 Functional bugs fixed
| Ref | Bug | Fix |
|---|---|---|
| A1 | "Join the Network" form was **stuck on step 1** — could never be submitted. | Corrected the step-advance logic. Verified reaching step 2/3. |
| A2 | Literal `**asterisks**` showed in booking + join success messages. | Replaced markdown with real `<strong>` tags. |
| A3 | Portfolio audio leaked a new `AudioContext` per click — audio died after ~6 plays. | One shared, reused context. |
| A4 | Pricing contradicted itself between Services and Book Session. | Unified in `src/data/pricing.ts`. |
| A5 | On-screen section numbers were out of order (05 before 04 before 03). | Renumbered to match visual order. |
| A6 | **Root-cause bug:** an unlayered `* { margin:0; padding:0 }` reset in `globals.css` overrode **every** Tailwind spacing/centering utility site-wide (things "leaning left", text on the edge, no card padding). | Removed it — Tailwind's preflight already handles the reset correctly. This bug was in the original build. |

### 4.3 Mobile overhaul
| Ref | Issue | Fix |
|---|---|---|
| B1 | No navigation at all after the hero. | New **`CornerNav`** — serif corner words on desktop, fixed bottom bar on mobile. |
| B2 | `100vh` fought the mobile browser bar. | Switched to `dvh` units. |
| B3 | Hero footer bar crushed on small screens. | Simplified to a single centered scroll cue on mobile. |
| B4 | Artists section hijacked wheel/scroll. | Removed the hijack; native swipe + arrows. |
| B5 | Tap targets too small. | Enlarged cart/qty/close buttons and label sizes. |
| B6 | Always-on particle canvas drained battery. | Deleted the full-page canvas; dust now lives only in the hero beam, pauses when hidden, fewer particles on small screens. |
| B7 | Hero "STUDIOS" title overflowed the 375px viewport. | Fluid `text-[13vw]` base size + width guard. |
| B8 | Booking quote panel clipped the price off-screen. | Header stacks vertically on mobile; service name truncates. |
| B9 | Nav/CTA taps sometimes did nothing (native smooth-scroll fought Lenis). | All scrolling now goes through the Lenis API. |
| B10 | Background-tab: frozen hero animations + a preloader that stretched to ~100s. | Hero skips entrance animation when mounted hidden; preloader progress is time-based (~2.8s always). |
| B11 | Services said "Hover over…" — meaningless on touch. | Reworded; tap-to-activate verified. |

### 4.4 Artistic elevation (from the reference plan)
| Ref | Move | Result |
|---|---|---|
| F1 | **Flashlight hero.** | The studio entrance photo (`PORTE.jpg`) sits in near-darkness; a cursor-driven light beam reveals it (auto-drifts on touch/idle), with dust floating in the beam. One CTA: a **spinning "BOOK A SESSION" sticker**. |
| F2 | **One mechanic per screen.** | Deleted the full-page particle background, mouse-tilt, and confetti. Kept grain + cursor. Booking confirmation is now a pulsing **REC** indicator. |
| F3 | **Editorial serif accent voice.** | **Bodoni Moda italic** for one word per headline ("*vision*", "*boutique*", "*network*", "*session*"), project titles, and the hero tagline. |
| F4 | **De-carded portfolio.** | Full-bleed editorial image rows with type set on the photograph, plus an **"artifact" mode** (logo pieces hung like framed prints in a dark gallery, lit on hover). |
| F5 | **Corner navigation frame.** | Delivered as `CornerNav` (also the fix for B1). |
| T1 | **Typography system.** | Loaded **Space Mono** for all technical micro-labels (they were silently falling back to Courier). Voice system is now: Syne (display) · Outfit (body) · Bodoni Moda italic (editorial accent) · Space Mono (labels). |

F6 (sound identity), F7 (photo shoot + LUT grade), F8 (CMS campaign canvas) remain
planned — see IMPROVEMENTS.md.

### 4.5 Performance & smoothness (web + mobile)
- **Image weight — the biggest load win.** Source images were 4000–5000px and 4–8.5MB
  each. Recompressed all in place (cap 2400px, q80): `public/images` **42MB → 15MB**;
  full-res originals preserved in `brand-archive/originals-fullres/`. The hero image now
  serves at **~25KB** (from 4.3MB).
- **Finished the `next/image` migration** — Shop, Footer, Services, Artists, News, About
  were still raw `<img>` or CSS background-images serving full originals. All now get
  **AVIF/WebP** + correctly-sized delivery. `next.config` enables AVIF/WebP + a 1-year cache.
- **`content-visibility: auto`** on all 9 below-the-fold sections — the browser skips
  layout + paint for off-screen content on the long single-page scroll (verified: no
  scroll-height drift).
- **Hero animation gating** — the two always-on `requestAnimationFrame` loops (flashlight
  beam + dust) were merged into one and gated by an IntersectionObserver + visibility, so
  they fully stop when the hero is off-screen or the tab is hidden.
- **CustomCursor** now bails entirely on touch devices (no listeners, no live spring
  animation) instead of mounting on every device; passive/debounced listeners throughout.

### 4.6 Accessibility, SEO
- **Reduced-motion** global guard (C2); JS-gated `cursor:none` so a script failure never
  leaves users cursorless (C3); `aria-label`s on icon buttons + social links (C4); form
  inputs associated to labels (C6).
- **`next/image`** in the hero and portfolio (D2, partial — Shop/Footer still use `<img>`).
- **Open Graph** metadata added (D5, partial).
- Removed the 452 MB archive from the deploy (D3).

---

## 5. Content flags found (need client decisions)

- **`Bobino Beats.jpg` is actually a Berklee College of Music certificate** (Bobino
  Vonyoh, Composing & Orchestrating for Film and TV) — currently used as an artist
  portrait, a service visual, and a news thumbnail. It's a credibility asset, but probably
  not as decoration.
- **The only real photograph** in the repo is `PORTE.jpg` (the entrance). `NETFLIX.jpg`
  and `WALL PAPER.jpg` are white-ground logo cards. → A real photo shoot (F7) is the
  single highest-leverage content task.
- **Brand name** still appears three ways: Town Studios / Monsterville / Bobino Beats.
  Needs one primary decision.

---

## 6. Verification

Driven in a real browser (dev server + browser pane) at desktop and 375×812 mobile:
- Flashlight hero reveal confirmed working.
- Join wizard confirmed advancing past step 1.
- Services tap-activation, cart add/drawer, booking form + live quote all confirmed.
- Production build passes (`npm run build`), lint clean (0 errors; 4 known `<img>`
  warnings tracked as D2).

Known limitation observed during testing: when the browser tab is OS-occluded,
`requestAnimationFrame` is fully suspended, which can make animation-driven UI look frozen
mid-state in screenshots — a testing artifact, not a site bug (documented in the verify
skill).

---

## 7. Commit history

| Commit | What |
|---|---|
| `b1d9618` | Baseline — original state + the three planning docs; 452 MB archive kept untracked. |
| `6a87e86` | Implementation pass — bug fixes (A1–A5), mobile overhaul (B1–B6), artistic elevation (F1–F5), a11y/perf/quality. |
| `88baed2` | Root-cause fix — removed the unlayered CSS reset that disabled all Tailwind spacing (A6). |
| `d176e17` | Mobile verification pass — overflow, Lenis scrolling, background-tab robustness, Space Mono (B7–B11, T1). |

---

## 8. What's next (open items)

From IMPROVEMENTS.md, not yet done:
- **Tier 1 "make it real":** wire bookings, shop checkout (Stripe), and forms to a real
  backend + email. Everything is still a front-end mock.
- **D1:** convert static sections to server components (currently all client-rendered).
- **E2 / F8:** move remaining hardcoded content into a data layer or CMS.
- **F6 / F7:** sound identity; real photo shoot graded with the archived cinema LUTs.
- **C1, C5, D2 (finish), D4, E1 (remote + CI):** remaining accessibility, perf, and
  infra items.
