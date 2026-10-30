# High Gear

Website for **High Gear**, a women's barbershop quartet from Nashua, NH. Six static pages, built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages.

The approved design and build brief live in [`docs/`](docs/HANDOFF.md).

## Working on the site

Requires Node 20 or newer.

```bash
npm install
npm start        # dev server with live reload at http://localhost:8080
npm run build    # writes the static site to _site/
```

## Why Eleventy

- **One header, footer and menu.** They're defined once in `src/_includes/` and every page uses them, which is the brief's main tooling requirement.
- **Plain HTML out.** Eleventy outputs ordinary static files and ships no client-side framework. The only JavaScript is three small, optional enhancement scripts: the mobile menu, the contact form and the video player.
- **Images handled for you.** [`@11ty/eleventy-img`](https://www.11ty.dev/docs/plugins/image/) turns each photo into AVIF, WebP and JPEG/PNG at several widths, with `width`, `height` and `srcset` set.
- **Links work on any host.** The `HtmlBasePlugin` adds the GitHub Pages sub-path (`/highgear/`) to internal links at build time, so the same templates work on `github.io` now and on the apex domain later.
- **Content in data files.** Copy and placeholders live in small files under `src/_data/`, so the owner's material can be dropped in without touching templates.

## Project layout

```
src/
  _data/        site.js (settings, images, copy), members.json, videos.json,
                harmonyLinks.json, nav.json
  _includes/    layouts/base.njk, partials/ (header, footer, video), macros.njk
  css/site.css  all styles; design tokens at the top
  js/           menu.js, contact.js, videos.js (progressive enhancement)
  *.njk         one file per page
images/         owner-supplied photos and logos
.github/workflows/deploy.yml
```

## Placeholders still to fill in

Anything the owner hasn't supplied yet appears on the site as bracketed text, like `[BIO — 60–100 words…]`, with a dashed underline and a `data-todo` attribute. Run this to list what's left:

```bash
grep -rn "data-todo" _site --include=*.html
```

| What | Where to put it |
|---|---|
| High Gear logo (SVG, or transparent PNG at 2×, 448 × 256) | `images/`, then `images.logo` in `src/_data/site.js` |
| Group photo, alt text naming each member left to right, and caption | `images.group`, `images.groupAlt`, `images.groupCaption` |
| Performance photo and alt text (Contact page) | `images.performance`, `images.performanceAlt` |
| Harmony, Inc. and BHS logos | `images.harmonyLogo`, `images.bhsLogo` |
| Home intro; two group-story paragraphs | `intro`, `story` in `site.js` |
| Member portraits and bios | `photo`, `bio` in `src/_data/members.json` |
| YouTube video IDs, titles and events; channel URL | `src/_data/videos.json`; `youtubeChannel` in `site.js` |
| Harmony, Inc. sub-page URLs | `url` in `src/_data/harmonyLinks.json` |
| Reply time in days | `replyDays` in `site.js` |
| Formspree form ID; Turnstile site key | `formspreeId`, `turnstileSiteKey` in `site.js` |

Image paths are relative to the project root, for example `"images/highgear1.jpg"`.

**Captions note on the Videos page.** The line "Every video includes captions…" only appears once `captionsOnAll` is set to `true` in `videos.json`. Turn it on only after checking that every embedded video has real captions, not just YouTube's automatic ones.

## Contact form (Formspree + Cloudflare Turnstile)

1. Create the form in Formspree, then copy the form ID (the part after `https://formspree.io/f/`) into `formspreeId`.
2. Check that the Formspree plan includes custom CAPTCHA (Turnstile).
3. In Cloudflare, create a Turnstile widget:
   - Set **Widget mode** to **Managed**.
   - Add the github.io host and, later, the custom domain under **Hostnames**.
4. In Formspree's form settings, choose Turnstile as the CAPTCHA and paste in the **secret key**.
5. Put the **site key** in `turnstileSiteKey`. The widget and Cloudflare's script only load once this key is set.
6. The form already has a `_gotcha` honeypot field, which Formspree uses to drop spam.

Without JavaScript, the form posts straight to Formspree and the browser's built-in validation applies. With JavaScript, `contact.js` handles it as follows:

- It validates on submit and shows the design's error summary and messages per field.
- It submits with `fetch` and replaces the form with the "Thank you!" message.
- If the network fails or Formspree returns an error, it shows a message and keeps everything the visitor typed.

## Deploying

Every push to `main` builds and deploys the site through `.github/workflows/deploy.yml`. The workflow also rebuilds on 1 January each year, so the copyright year in the footer stays current.

**One-time setup:** in the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.

### Adding the custom domain later

1. Buy the domain and add DNS records at the registrar:
   - **Apex domain** (`example.com`): four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. Optionally add the matching `AAAA` records too.
   - **`www`:** a `CNAME` record pointing to `joe-purramid.github.io`.
2. Under **Settings → Pages → Custom domain**, enter the domain and save.
   - Because the site deploys through GitHub Actions, a `CNAME` file in the repo is **not** needed; GitHub stores the domain in the setting.
   - If you ever switch to branch-based publishing, add a `src/CNAME` file containing the domain and a passthrough copy for it in `eleventy.config.js`.
3. Wait for the DNS check to pass, then tick **Enforce HTTPS**. Certificate provisioning can take up to an hour.
4. Re-run the deploy workflow (**Actions → Deploy to GitHub Pages → Run workflow**).
   - `configure-pages` then reports an empty base path, so links switch from `/highgear/…` to `/…` automatically.
5. Add the new hostname to the Turnstile widget's allowed hostnames.

## Accessibility

The site targets WCAG 2.2 AA. Every page has:

- a skip link
- `header`, `nav` (labelled "Main"), `main` and `footer` landmarks
- `aria-current` on the menu item for the current page
- a two-tone focus ring
- external-link icons with hidden "(external site)" text
- support for `prefers-reduced-motion`

The header isn't sticky, so it can never hide focused content. Before launch, work through the checks in the handoff's "Definition of done": axe or Pa11y on every page, Lighthouse, a keyboard walkthrough, and a screen-reader pass.

No analytics or tracking is included.
