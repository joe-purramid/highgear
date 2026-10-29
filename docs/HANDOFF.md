# High Gear website — build handoff

Approved design for **High Gear**, a women's barbershop quartet from Nashua, NH. This brief is everything needed to build the production site. The approved mockups are in `design/` beside this file (see "About the design files" at the end).

## Goals and constraints

- Six pages, static site, hosted on **GitHub Pages** with a **custom domain not yet purchased**. Use root-relative or relative links that work on both `<user>.github.io/<repo>/` and the future apex domain. Leave a note in the README on adding `CNAME` and enforcing HTTPS once the domain exists.
- Must meet **WCAG 2.2 AA**. Accessibility requirements below are not optional.
- Modern, image-and-text balanced, fully responsive (designed at 1440 px desktop and 390 px phone).
- **Tooling is your choice** (plain HTML/CSS, Jekyll, Eleventy, Astro, etc.). Requirements: header, footer and menu defined once and shared by every page; output is static files GitHub Pages can serve; no client-side framework needed for content. Explain your choice in the README.
- No tracking or analytics unless the owner asks later.

## Pages and navigation

Menu order and labels are exact. Mark the current page with `aria-current="page"`.

| Menu label | Page | Notes |
|---|---|---|
| Home | `/` | Landing page |
| About Us | `/about/` | Group story + member bios |
| Barbershop Style | `/barbershop-style/` | Explainer |
| Videos | `/videos/` | YouTube embeds |
| High Societies | `/high-societies/` | Harmony, Inc. + Barbershop Harmony Society |
| Contact | `/contact/` | Form |

URL slugs are suggestions; keep them lowercase and readable.

## Design tokens

Colors were sampled from the group's logo (black ink, cream faces, orange hair, pale-yellow music staff, brown gear).

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#141114` | Header, footer, dark sections, body text on light |
| `--cream` | `#F7EFE0` | Page background, text on dark |
| `--paper` | `#FFFBF3` | Cards/panels on cream |
| `--sand` | `#E9DDC8` | Alternate light section, portrait placeholders |
| `--orange` | `#F0925A` | Primary accent: buttons, header rule, highlight sections, offset shadows. **Text on orange is always `--ink`, never white.** |
| `--staff` | `#EBD48F` | Accent on dark: current menu item, footer links, focus ring |
| `--gear` | `#6E4B2A` | Barbershop Harmony Society section background (cream text) |
| `--brown-text` | `#7A4520` | Links and small labels on light backgrounds; hover `#4E2A10` |
| `--muted-dark` | `#3D342E` | Secondary body text on light |
| `--muted-2` | `#5A4E44` | Captions, input borders |
| `--muted-light` | `#E3D8C6` / `#CBBFAE` | Secondary text on dark |
| `--card-dark` | `#221D21` | Member cards on ink |
| `--error` | `#A3261B` | Form errors (alert box bg `#FBE3E6`, text `#7E0C1E`) |

All text/background pairs used in the design pass 4.5:1. If you add a pairing, check it.

**Type**

- Display: **Limelight** 400 (headings, footer wordmark). Fallback `Georgia, serif`.
- Body/UI: **DM Sans** 400/600/700. Fallback `system-ui, sans-serif`.
- Self-host both (e.g., via `@fontsource`) rather than loading Google Fonts, for privacy and speed. Use `font-display: swap`.
- Body 18 px desktop / 17 px phone, line-height 1.6.
- Fluid headings use `clamp()`. Approved values: Home H1 `clamp(40px, 5vw, 68px)`; other page H1s `clamp(42px, 5.4vw, 68px)`; section H2s `clamp(34px, 4vw, 48px)`.
- Eyebrow labels: 15 px (13 px phone), 700, `letter-spacing: .14em`, uppercase.

**Layout**

- Content max-width 1240 px, side padding 24 px (16 px phone). Sections use generous vertical padding (≈ 80–96 px desktop, 48–56 px phone).
- Grids use `repeat(auto-fit, minmax(min(<n>px, 100%), 1fr))` so they collapse to one column on phones.
- Buttons are pills (`border-radius: 999px`), min-height 52 px. All tap targets ≥ 44 × 44 px.
- Decorative "offset shadow" on framed images/panels: solid, no blur (e.g., `18px 18px 0 var(--orange)`).
- Decorative gear motif: dashed-stroke circles (see design files), `aria-hidden="true"`, low opacity.
- No gradients, no emoji.

## Shared components

**Header**

- Ink background, 4 px orange bottom border.
- Logo on the left, filling the header height: **224 × 128 px** desktop, **168 × 96 px** phone. The logo is the only branding in the header; there is no "High Gear" text beside it. It links to Home and its accessible name is **"High Gear"** (`alt="High Gear"`).
- The logo has black outlines and hair, so it must sit on a light backing (cream tile) against the ink header unless the artist supplies a dark-background version.
- Desktop: menu items to the right of the logo, vertically centered.
- Phone/narrow: a "Menu" button (hamburger icon + visible text) replaces the inline menu; it toggles a vertical list below the header. Use a real `<button>` with `aria-expanded` and `aria-controls`. Escape closes it and returns focus to the button. Switch to the button at whatever width the full menu stops fitting beside the logo (around 1024 px). It must work without JavaScript (e.g., fall back to the full list).

**Footer**

- Ink background. Left: "High Gear" in Limelight; "A proud quartet member of Harmony, Inc." linking to High Societies. Right: "Book or contact us" link to Contact; "© {current year} High Gear".
- **The footer must always sit at the bottom of the window**, even on short pages: page wrapper is a column flexbox with `min-height: 100vh` (use `100dvh` with fallback), `<main>` gets `flex: 1 0 auto`.

**Accessibility baseline (every page)**

- Skip link "Skip to main content" as the first focusable element, visible on focus.
- Landmarks: `header`, `nav aria-label="Main"`, `main id="main"`, `footer`. One `h1` per page; logical heading order.
- Focus ring on all interactive elements: `outline: 3px solid var(--staff); outline-offset: 2px; box-shadow: 0 0 0 5px var(--ink)` (two-tone so it shows on both light and dark sections). Never remove it.
- Ensure focused elements are not hidden behind anything sticky (WCAG 2.4.11).
- External links: visible ↗ icon and visually hidden "(external site)" text. Open in the same tab.
- Decorative SVGs `aria-hidden="true"`. Real images need meaningful `alt` (see asset list).
- Respect `prefers-reduced-motion`; no autoplaying media or motion.
- Set `lang="en"` and a unique `<title>` per page, e.g., "About Us — High Gear".

## Page content

The desktop design files are the source of truth for copy. Bracketed text `[LIKE THIS]` is a placeholder the owner will supply; render it in the build as clearly marked TODO content, not as invented text.

### Home

1. **Hero** (ink): eyebrow "A barbershop quartet · Nashua, NH"; H1 on two lines, each sentence its own line: "Four women." / "One voice."; intro [1–2 sentences]; buttons "Book High Gear" (orange → Contact) and "Watch us sing" (outline → Videos). Right side: large group photo with cream frame and orange offset shadow, plus caption.
2. **Meet the voices**: H2 + "Read our story" link → About Us; four round portraits with part label (Tenor, Lead, Baritone, Bass) and name.
3. **New to barbershop?** (orange band): "Four unaccompanied voices, tuned so precisely that the chords seem to ring with a fifth voice nobody is singing." Button "How barbershop works" → Barbershop Style.

### About Us

1. Eyebrow "About the quartet"; H1 "Four friends who shifted into High Gear"; two story paragraphs [placeholder]; large logo in a cream circle with orange border.
2. **The Squad** (ink section, H2 "The Squad"): four member cards (two-up desktop, stacked phone). Each card: round portrait, part label (staff yellow, uppercase), name (H3, uppercase as entered), **pronoun line** directly under the name (14 px, `#CBBFAE`, smaller than body), then bio [placeholder].

   | Part | Name | Pronouns |
   |---|---|---|
   | Tenor | Ari Schmidt | (They/Them) |
   | Lead | Christina Tramack | (She/They) |
   | Baritone | Jennifer Selby | (She/Her) |
   | Bass | Deb Green | (She/Her) |

   Use these names on the Home "Meet the voices" cards too.
3. CTA panel: "Want High Gear at your event?" + "Get in touch" → Contact.

### Barbershop Style

Copy is final in `design/Barbershop.dc.html`. Sections: hero ("What makes a chord ring?" with the four-part stack graphic, tenor → bass); "The four parts" (four short columns); "How to recognize it" (definition list of six hallmarks, on sand background); "A short history" with a link to High Societies.

### Videos

- H1 "Hear us ring"; "Our YouTube channel" link [URL TBD].
- One featured video + grid of three (`auto-fit`, min 340 px). Each has song title (H3) and event/date.
- Embed with **`youtube-nocookie.com`**, `loading="lazy"`, a descriptive `title` on each iframe (e.g., "High Gear performs [song] — YouTube video"), 16:9 responsive wrapper, no autoplay. Consider a click-to-load facade (lite-youtube) for performance; it must be a real button with an accessible name.
- Note under the grid: "Every video includes captions. Videos never autoplay; press play when you're ready." Only keep this line if captions are actually present on every video.

### High Societies

1. **Harmony, Inc.** (orange section): Harmony, Inc. logo tile [asset]; eyebrow "Our parent organization"; H1 "Harmony, Inc."; description (see design); button "Visit harmonyinc.org" (ink) → https://harmonyinc.org/.
2. **Sing with Harmony, Inc.**: four link cards → Find a chapter, Contests & convention, Education, and **New England Voices in Harmony** (High Gear's area). In that card title, wrap "Voices in Harmony" in `white-space: nowrap` so the name never breaks as "New England Voices / in Harmony". Card URLs are TBD.
3. **Barbershop Harmony Society** (gear-brown section, cream text, **no eyebrow label**): H2 "Barbershop Harmony Society"; description (see design); "High Gear competes in the Northeast District."; button "Visit barbershop.org" → https://www.barbershop.org/; BHS logo tile with staff-yellow offset shadow, on the right on desktop.

### Contact

- Left column: eyebrow "Contact"; H1 "Let's make harmony"; intro "Booking a performance, planning a singing valentine, or just curious about barbershop? Send us a note."; "We usually reply within [NUMBER] days."; performance photo.
- Right: form panel, "Send a message", "All fields are required."
- **Fields** (visible `<label>` for each, `required`, correct `autocomplete`): Name (`name`), Email (`type="email"`, `autocomplete="email"`), Subject (text), Message (textarea, 6 rows).
- **Human verification: Cloudflare Turnstile** (managed / non-interactive mode, no puzzles), integrated through **Formspree's Turnstile support**. Confirm the owner's Formspree plan includes it. Add a honeypot field as well.
- **Submission: Formspree** (`action="https://formspree.io/f/<FORM_ID>"`, form ID supplied by owner). Submit with `fetch` and progressive enhancement, so it still posts normally without JS.
- **Validation** (as prototyped in the design): validate on submit; on error show an alert summary "Please fix the N highlighted field(s) below." (`role="alert"`), mark fields `aria-invalid="true"`, link messages with `aria-describedby`, error border `--error`, and move focus to the summary or first invalid field. Messages: "Enter your name." / "Enter an email address like name@example.com." / "Enter a subject." / "Enter your message."
- **Success**: replace the form with "Thank you!", "Your message is on its way. We'll write back to the email address you gave us." (`role="status"`), plus a "Send another message" button. Handle network/Formspree errors with a clear message and keep the user's input.
- Privacy line under the button: "We use your details only to reply to you."

## Assets the owner still needs to supply

- **High Gear logo** from the original artist (signed "RY"): vector SVG or transparent PNG at 2×. Confirm web-use permission. Alt: "High Gear".
- Group photo (Home hero) with alt text naming each member left to right, plus a caption.
- Four member portraits (alt: member name).
- Performance photo (Contact).
- Harmony, Inc. and Barbershop Harmony Society logos, used per each organization's brand guidelines.
- YouTube video IDs and titles/events/dates; channel URL.
- Harmony, Inc. sub-page URLs (chapter locator, events, education, New England Voices in Harmony).
- Home intro sentence, group story paragraphs, four bios (60–100 words each), reply-time number.
- Formspree form ID; Cloudflare Turnstile site key (configured in Formspree).
- Social links, if wanted (not in the approved design; ask before adding).

Until assets arrive, use neutral placeholders with the same dimensions so layout doesn't shift. Optimize images (WebP/AVIF with fallbacks, `width`/`height` set, `srcset`).

## Definition of done

- All six pages built to the design at 1440 px and 390 px, and checked at 320, 768 and 1024 px with no horizontal scroll and no clipped text (WCAG 1.4.10 reflow; also check 200% zoom).
- Keyboard-only walkthrough of every page and the mobile menu; focus always visible.
- Automated checks clean: axe or Pa11y on every page, plus Lighthouse accessibility 100.
- Screen-reader spot check (VoiceOver or NVDA) of the header, member cards and contact form, including error and success states.
- Contact form tested end to end against Formspree with Turnstile.
- GitHub Pages deploy working (GitHub Actions if your tooling needs a build), plus README notes on adding the custom domain.

## About the design files

`design/` holds the approved mockups: `*.dc.html` for desktop and `*Mobile.dc.html` for phone, plus `canvas.json` (the canvas layout). They are written in a design-tool component format, not production code:

- `<x-dc>`, `<helmet>`, `<sc-if>`, `{{…}}` placeholders and the `DCLogic` script are the design tool's runtime; ignore them.
- Inline styles hold the exact approved values (colors, sizes, spacing). Move them into a real stylesheet with the tokens above.
- Links point between design files (`About.dc.html`); map them to the real routes.
- Where desktop and phone copy differ, **the desktop file wins** (some phone mockups still show placeholders the desktop has filled in).
