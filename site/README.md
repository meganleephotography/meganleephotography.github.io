# Megan Lee Photography — website source

## Deploying

**`index.html` is the entire website** — one self-contained file with the logos
embedded inside it. No build step, no dependencies, no other files needed.

This repo is published with **GitHub Pages**, which serves the repo root — so
`build.js` writes the same standalone file to both `site/index.html` and
`../index.html`. Push to `main` and Pages redeploys the root copy.

To host it somewhere else instead, upload `index.html` on its own:

- **Netlify**: drag the file onto https://app.netlify.com/drop
- **Any cPanel/FTP host**: upload it into `public_html/`

## Editing

You can edit `index.html` directly — all HTML, CSS, and JavaScript is in that
one file, and the page copy lives in the `PAGES` object inside the `<script>`
block.

The other files here are the build pipeline used to regenerate it:

- `site.template.html` — same source, but with `__SIDEBYSIDE__` / `__STACKED__`
  tokens where the logo images go
- `stackedLogo-trim.png`, `sidebysidelogo-trim.png` — trimmed transparent logos
  (originals are in `../resources/`)
- `build.js` — swaps the tokens for base64 data URIs and writes `index.html`
  (plus `site.html`, the body-only variant used for the Claude artifact)

To rebuild after editing the template: `node build.js` in this directory. That
refreshes `site/index.html` and the repo-root `index.html` together, so never
edit only one of them.

Still placeholder in the copy: city, email (hello@example.com), prices,
founding year, testimonials, and all photos.
