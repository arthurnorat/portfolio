# Portfolio

Personal professional portfolio of Arthur Norat. A static site in plain HTML and CSS: no build step, no JavaScript, no dependencies installed locally. Published on GitHub Pages.

## Architecture
- Three language versions with the same structure: `/` (English), `/pt-br/` and `/es/`.
- Each language has `index.html` (home) and `gsoc2025.html` (Google Summer of Code 2025 write-up).
- A single `style.css` at the root is shared by all six pages; `assets/` holds the images.
- The six pages are near-copies of each other. Until Step 02 decides how to remove this duplication, **every content or structure change must be replicated in all three languages**.
- The visible site content is in EN / PT-BR / ES (that is the product). Code, comments, commit messages and docs are in English.

## Out of scope (ask before touching)
- Images in `assets/`: do not edit, compress or rename without asking.
- The photos `assets/arthur.JPG` and `assets/4e713b43-d59f-4b44-8cc5-8d373e287f49.jpg` stay until Step 06.

## Infrastructure
- **Hosting**: GitHub Pages, `https://arthurnorat.github.io/portfolio/`.
- **Contact form**: Formspree (endpoint in `index.html`, action URL). The form ID is public by nature (it is in the HTML), so it is not a secret. **Known issue: the current ID does not exist**, so messages are lost (fixed in Step 01).
- No environment variables and no secrets.

## Status
Roadmap (one step at a time, reviewed before the next):
- **00 Foundation** (current): CLAUDE.md, bilingual README, minimal `.gitignore`, remove dead assets.
- 01 Fix the contact form (needs a new Formspree form, created by Arthur in the dashboard).
- 02 Decide the architecture against the 6-file duplication (plain HTML vs Jekyll vs Eleventy).
- 03 Semantic, valid HTML.
- 04 CSS cleanup and responsive layout (mobile is broken).
- 05 Image and font optimization.
- 06 Real content (Lorem ipsum is live) and SEO / Open Graph.
