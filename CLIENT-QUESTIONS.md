# Client Questions — to finish the app

> Everything the site still needs from the client to go from "polished prototype" to
> "launchable product." Grounded in the actual code (2026-07-14). Priorities:
> 🔴 blocks launch · 🟠 important · 🟡 optional/later.
>
> **Reminder — the whole app is front-end only today.** Every booking, checkout, form,
> and newsletter is a mock that resolves in local state. Nothing is sent, stored, or
> charged. The answers below decide how each becomes real.

---

## A. Brand & identity
- 🔴 **A1. What is the primary name?** The code uses **three**: *Town Studios* (copy),
  *Monsterville* (parent / package name), *Bobino Beats* (founder / logo assets). Which is
  the public brand, and how do the others relate (parent company? founder? sub-label?)?
- 🔴 **A2. What is the real domain?** You wrote "Book on **Monsterville.spaces**" — is that
  the live domain, a separate booking platform, or a placeholder? (`.spaces` isn't a
  standard web address.) Where will this site be hosted?
- 🟠 **A3. Definitive logo file(s)?** Both a Bobino Beats logo and a Monsterville "M" logo
  are used. Which is primary? Can you provide final vector (SVG) versions?
- 🟡 **A4. Tagline check:** hero currently reads *"Create. Record. Film. Inspire."* Keep?

## B. Founder / owner info (I just added this — please confirm)
- 🔴 **B1. Phone number:** you gave `0022879938819`. I rendered it as **+228 79 93 88 19**
  (00228 = Togo country code) and made it a tap-to-call link. Correct number and format?
- 🔴 **B2. "Book on Monsterville.spaces"** — right now this button scrolls to the on-site
  booking section. Is *Monsterville.spaces* actually an **external booking page** I should
  link to instead? If so, what's the exact URL?
- 🟠 **B3. Business email?** There is currently **no email address anywhere** on the site.
  What email should we show / route form submissions to?
- 🟠 **B4. Should the founder block appear anywhere besides the footer** (e.g. a dedicated
  "About the Founder" section)? Right now it lives in the footer only.
- 🟡 **B5.** Any other channels for the founder card (WhatsApp for that number? Calendly)?

## C. Content authority — ⚠️ legal/truth check (important)
- 🔴 **C1. Are the headline stats real and cleared?** "**72+ Platinum Records**",
  "**A24** visual grade", "**24/7** access". "A24" is a trademarked company — do you have
  a real relationship/permission, or is this aspirational? (Risk if not.)
- 🔴 **C2. Portfolio credits — real or mockups?** The work currently claims
  "**Netflix** Title Concept / Netflix Inc." and an artist bio says
  "soundtrack: **Love Death + Robots Ep. 5**." If these aren't real, credited engagements,
  they must be reworded — naming Netflix / a Netflix show as your client is a legal risk.
- 🟠 **C3. The Berklee certificate** (`Bobino Beats.jpg` is a real Berklee College of Music
  diploma). Keep it as a credibility asset (framed, in About) or remove it from the public
  site? Right now it's used as decorative background in a few places.
- 🟠 **C4. Artist roster — real, consenting people?** Listed: Bobino Beats, TATASANVI,
  MONSTERVILLE, SANVI T., with bios. Are these real residents who've approved their bio +
  photo? (Their "photos" are currently placeholder logos, not portraits.)

## D. Services & pricing
- 🔴 **D1. Confirm the price list** (shared by the Services + Booking sections):
  Recording **$120/hr**, Mixing **$350/track**, Mastering **$150/track**,
  Photography **$200/hr ($800 / 4hr)**, Videography **$250/hr**, Creative Direction
  **custom quote**, Podcast & Live **$200/hr**. Add-ons: Analog gear **+$75**,
  B-roll videographer **+$150**. All correct?
- 🟠 **D2. Which currency?** Everything is in **USD** now. Given a Togo/Paris footprint,
  should it be USD, EUR, or XOF?
- 🟠 **D3. Which services are bookable online vs "contact for quote"?** Currently Creative
  Direction and Podcast & Live are *not* online-bookable — is that right?

## E. Shop / e-commerce
- 🔴 **E1. Are these real products at these prices?** Leopard Beat Lease **$299**,
  Tiger Drum Kit **$49**, Cinematic Hoodie **$85**, Analog Limiter Plugin **$149**.
- 🔴 **E2. How should checkout work?** Options: Stripe (we build it), Gumroad/LemonSqueezy
  (digital goods), or **link out** to an existing store. Image filenames reference
  "PURCHASE LEASE ON **BOBINOBEATS.COM**" — do you already sell beats there? Should the
  shop link there instead of having its own cart?
- 🟠 **E3. Digital delivery:** for beats/drum-kits/plugins, how are files delivered after
  purchase (email link, download page)? Physical merch (hoodie) — do you ship, from where?

## F. Booking
- 🔴 **F1. How are bookings really handled?** Real availability calendar? Which tool —
  Calendly, Cal.com, Google Calendar? Where should a booking request land (email, CRM)?
- 🟠 **F2. Time zone:** the calendar says "**Paris Time**" and copy says "Established in
  Paris & NY" with a latitude of 43.7° N. What are the *real* location(s) and booking
  time zone?
- 🟠 **F3. Deposit/payment at booking**, or request-only (you confirm + invoice later)?

## G. Forms, notifications & data
- 🔴 **G1. Where do submissions go?** Three forms exist (Booking request, "Join the
  Network" application, Newsletter). What email address / tool should receive each?
  (Recommend a service like Resend or Formspree — cheap, no backend needed.)
- 🟠 **G2. Newsletter provider?** Mailchimp, Beehiiv, ConvertKit, etc.?

## H. Social & external links
- 🔴 **H1. Real social URLs?** Footer icons currently point to bare
  `instagram.com / youtube.com / twitter.com / github.com` (GitHub is almost certainly
  wrong for a studio). Which platforms and exact handles — Instagram, YouTube, TikTok,
  **Spotify, Apple Music, SoundCloud**?

## I. Legal & launch
- 🔴 **I1. Privacy Policy & Terms** — the footer links are dead. Do you have copy, want us
  to draft basic versions, or remove the links for now? (A privacy policy is legally
  required once forms collect emails.)
- 🟠 **I2. Analytics & cookie consent** — do you want analytics (Google Analytics,
  Plausible)? If yes, an EU/Togo audience needs a consent banner.
- 🟠 **I3. Language(s)** — English only, or also **French** (Paris/Togo audience)?

## J. Media & assets (needed for the artistic direction, F7)
- 🟠 **J1. Real photography** — the site has **only one** true photograph (`PORTE.jpg`).
  Everything else is a logo/graphic. Can you commission/provide a shoot: studio rooms,
  the console, hands on faders, artists mid-session? This is the single highest-impact
  content upgrade (the flashlight hero and portfolio come alive with it).
- 🟡 **J2. Real audio previews** — the shop/portfolio "play" buttons currently make a
  placeholder synth tone. Provide short preview clips (MP3) of actual beats/sessions?

## K. News / editorial
- 🟡 **K1.** The 3 "News" articles are placeholder copy. Do you want a **working blog**
  (needs a simple CMS) with real posts, or should we **remove the News section** for launch?

---

### Suggested "minimum to launch" set
If the client can only answer a few first, prioritize: **A1, A2, B1–B3, C1, C2, D1, E2,
F1, G1, H1, I1.** Those unblock a truthful, functional v1. The rest can follow.
