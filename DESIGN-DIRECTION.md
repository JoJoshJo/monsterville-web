# Design Direction — Elevating the Artistic Side

> Analysis of the two client-provided references (travisscott.com, frenchkiwijuice.com,
> reviewed live 2026-07-13) and a concrete plan to raise the artistic level of the
> Town Studios site. Companion to PROJECT.md and IMPROVEMENTS.md.

---

## 1. Reference analysis

### travisscott.com — "the void"

**What's on screen:** an almost pitch-black page. Two thin-outline pill buttons (TOUR,
SHOP) in the top corners. One artifact in the center — the current drop poster (Cactus
Jack × Nike '90 collab) — **hidden in darkness until your cursor approaches**, then it
glows into view. Below it, a slowly **spinning circular sticker** that acts as the SHOP
button. That's the entire homepage. No scroll (page height = one viewport).

**The /explore page** extends the idea: an "archive in the dark" — vinyl, items and
artifacts float in blackness and reveal one by one. A museum where you carry the
flashlight.

**Why it works:**
- **Darkness is the material.** Withholding the image makes you lean in; the visitor
  *earns* the reveal. Mystery reads as luxury and confidence.
- **One screen, one action.** The site is a rotating campaign poster, not a brochure.
  It changes per drop (content comes from a CMS — Sanity).
- **Physical-object language.** The CTA is a *sticker that spins*, like merch on a
  crate. Industrial mono/condensed type. Everything feels like an object, not a UI.
- **Technically simple.** No WebGL, no video — one CMS image, CSS transitions, an
  opacity/brightness reveal. The artistry is 100% concept and restraint.

### frenchkiwijuice.com — "the photograph"

**What's on screen:** one full-bleed **analog film photograph** (grainy, muted
earth-tones: FKJ seated beside a bonsai) that IS the entire site. The album logo is a
**handwritten script signature** over the photo. Navigation is four elegant **Bodoni
serif** words parked in the four corners — Listen / Tour / Shop / Contact — framing the
image like a gallery mat. One white button: "Pre-order Now". A quiet row of tiny social
icons. Nothing else.

**Why it works:**
- **Zero UI chrome.** No cards, no glass panels, no borders, no badges. Typography sits
  directly on the artwork. The photograph is the interface.
- **Editorial serif = fashion-magazine heritage.** Bodoni instantly signals *Vogue*,
  print, atelier — elegance by association.
- **Analog imperfection = warmth.** Film grain, soft light, imperfect color — matches
  the organic, instrument-driven music. Texture is identity.
- **Era-based canvas.** The whole site repaints for each album era (currently "Tyber",
  11.09.2026). Again: campaign poster, not brochure.

### The shared philosophy (what the client is really asking for)

| Principle | Travis Scott | FKJ |
|---|---|---|
| One screen, one action | SHOP the drop | Pre-order the album |
| UI is invisible | 2 pills + a sticker | 4 words in corners |
| Art carries everything | poster in darkness | full-bleed film photo |
| One signature mechanic | flashlight reveal | none — stillness IS the mechanic |
| Texture identity | void, industrial mono | grain, editorial serif |
| Homepage = rotating campaign | per drop (CMS) | per album era |

**Key insight:** both sites choose **one strong idea and delete everything else.** Our
current site does the opposite — ten sections, glass cards, particles, parallax, custom
cursor, grain, and confetti *all at once*. We don't lack effects; we lack restraint and
a single memorable signature.

---

## 2. How we use this — concrete moves

### Move 1 — Rebuild the hero as "the curtain" 🔦
Merge both references into our identity: **a real photograph of the studio hidden in
darkness** (recording rooms ARE dark — the metaphor is native to us). The cursor acts
as a flashlight (radial-gradient mask following the pointer; on mobile, the gyroscope or
touch position drives it). Type on top: only the wordmark and ONE action — *Book a
Session*. The Book CTA becomes a **spinning circular sticker** (we already have stamp
artwork — `TAMPON.jpg` — the physical-object language is sitting in our assets).

```css
/* flashlight reveal, no WebGL needed */
.reveal {
  -webkit-mask-image: radial-gradient(circle 220px at var(--mx) var(--my),
    black 0%, transparent 100%);
}
```

### Move 2 — Introduce an editorial serif voice ✒️
We currently speak in one voice (Syne + mono labels = industrial). Add a second voice:
an **italic editorial serif** (Bodoni Moda or Playfair Display via `next/font`) used
*sparingly* — pull-quotes, artist names, the word "*Session*" inside headlines, image
captions. The contrast industrial × editorial is exactly the TS × FKJ tension, and it
maps to our own duality: **beats × cinema**.

### Move 3 — Let the portfolio breathe: kill the cards 🖼️
Replace the glass-card masonry grid with **full-bleed image rows** — each project takes
the full viewport width (FKJ style), title set directly on the photograph in serif
italic + mono index number. Alternative concept for maximum brand memory: **"The Vault"**
— port the Travis /explore idea: projects float in a dark room and reveal under the
cursor. Our portfolio becomes a place you *explore*, not a grid you scan.

### Move 4 — Make it sound like a studio 🔊
FKJ's brand is inseparable from musical interactivity; we're literally a recording
studio, yet the site is silent except a placeholder synth. Elevate:
- A global **sound toggle** (default off, elegant "SOUND ON" button like fashion sites).
- Real **Bobino Beats previews** with a drawn waveform (Web Audio + canvas — we already
  have both skills in the codebase).
- Subtle UI sounds: a soft tape-click on hover, a vinyl crackle bed when sound is on.
- The preloader's fake status lines become a **VU meter / tape counter** that reacts to
  real loading.

### Move 5 — Photography with a cinema grade 🎞️
FKJ's power comes from *one great photograph*. We need a shoot day: the rooms, the
console, hands on faders, artists mid-take — shot dark and graded warm. Note: the repo
already contains professional cinema LUTs (`public/images/Fine Arts Cadres /…/*.cube` —
Joker, Dunkirk, Oppenheimer looks). **Grade the brand photography with these LUTs in
post** — that's how "A24 grade" stops being a copy claim and becomes visible reality.
(The LUTs still must move out of `public/` — see IMPROVEMENTS.md D3.)

### Move 6 — One mechanic per screen, not five 🧹
Current stack: particles + orbs + parallax + tilt + custom cursor + grain + hover-color
+ confetti. References use ONE signature each. Proposal:
- **Keep:** film grain (identity), custom cursor (upgrade it to be the flashlight).
- **Demote:** particle background → only visible in the hero darkness, as dust in the
  light beam (this turns a generic effect into a *cinematic* one).
- **Drop:** mouse-tilt on hero text, ambient blob glows, confetti (replace with a
  tape-machine "REC" confirmation animation on booking).

### Move 7 — Homepage as campaign canvas 📰
Both references repaint per drop/era. Structure our hero so the "current thing" (latest
beat drop, latest video, next open studio date) is **one CMS-driven artifact**, swapped
without code changes. This pairs with the data-layer work in IMPROVEMENTS.md E2 and
keeps the site alive month after month.

### Move 8 — Corner navigation frame 🧭
Solve our missing-nav problem (IMPROVEMENTS.md B1) the FKJ way instead of a standard
header: four quiet words pinned to the corners on desktop — **Book / Work / Shop /
Join** — set in the serif. On mobile they collapse into a single bottom bar. Navigation
becomes a picture frame, not furniture.

---

## 3. Suggested sequencing

1. **Move 6 (reduce)** first — cheap, instantly raises perceived quality.
2. **Move 1 (flashlight hero) + Move 8 (corner nav)** — the new signature. Prototype
   behind a flag, A/B against current hero.
3. **Move 2 (serif voice)** — a day of type work, site-wide lift.
4. **Move 3 (portfolio)** — full-bleed rows now; "Vault" concept once photography exists.
5. **Move 5 (photo shoot + LUT grade)** — schedule with client; everything above gets
   better the day real photography lands.
6. **Move 4 (sound)** + **Move 7 (CMS canvas)** — alongside the backend work.

## 4. What we deliberately do NOT copy

- **Their emptiness.** TS/FKJ sell one artist with outside channels doing the selling.
  We must still convert bookings, shop, and recruiting — we keep our sections, but each
  becomes calmer, more photographic, less "panel UI".
- **Serif as body text.** It's an accent voice, not a replacement for Outfit.
- **Total darkness everywhere.** The flashlight belongs to the hero/vault moments only;
  booking and shop must stay instantly legible.
