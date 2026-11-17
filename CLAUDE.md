# Portfolio

Personal professional portfolio of Arthur Norat. A static site in three languages, generated with Eleventy (Node) and published on GitHub Pages. No client-side JavaScript.

## Commands
- `npm install`: install dependencies (once).
- `npm start`: dev server with live reload at `http://localhost:8080`.
- `npm run build`: generate the site into `_site/` (a compile check).

## Architecture
- Source lives in `src/`; the generated site goes to `_site/` (git-ignored, never edited by hand).
- **Structure is written once**, in `src/_includes/layouts/base.njk` (head with SEO tags, header, footer) and `src/_includes/partials/` (language switcher, SVG icons). The two page types are `src/index.njk` (home) and `src/gsoc2025.njk` (Google Summer of Code 2025 write-up); each one is generated three times, once per entry of `src/_data/languages.json` (`/`, `/pt-br/`, `/es/`). `src/sitemap.njk` and `src/robots.njk` generate `sitemap.xml` and `robots.txt`.
- **Text lives in data files**, one per language: `src/_data/i18n/{en,pt-br,es}.json`. Language-neutral data: `site.json` (name, `url`, social links, `email`, `resume`), `projects.json` (names, tech line, screenshots, repository links) and `build.js` (build year for the footer).
- The GSoC article body is one HTML fragment per language: `src/_includes/gsoc/{en,pt-br,es}.html` (images use `{{ lang.root }}assets/...`).
- Links are relative (`lang.root` is `./` for English and `../` for the others), so the site works under `github.io/portfolio/` and at a custom domain. Absolute URLs (canonical, hreflang, Open Graph) come from `site.url` in `site.json`: change it when a custom domain exists.
- `style.css` (plain CSS with variables in `:root`, breakpoints at 900px and 480px) and `assets/` stay at the repo root and are copied as they are (`eleventy.config.js`). Fonts are self-hosted in `assets/fonts/`; images are WebP/PNG already optimized.
- Contact: no form. `site.json` `email` and `resume.<lang>` are empty on purpose; the buttons only appear when filled in.
- A change that affects every page goes in the layout; a text change goes in the three i18n files. Never edit `_site/`.
- Rules for new markup: one `<h1>` per page, headings in order, links (`<a class="btn">`) for navigation, `alt` text in all three languages, `width`/`height` on images.
- The visible site content is in EN / PT-BR / ES (that is the product). Code, comments, commit messages and docs are in English.

## Working mode (authorized by Arthur on 2026-11-17)
For Steps 03–06 Claude delivered the site end to end and tested it itself, instead of stopping for review after each step. This overrides the default "one step, then stop" rule of the global instructions, with these limits:
- **Git**: Claude may `git add` and `git commit` (small Conventional Commits, English). Claude never runs `git push` or any history-rewriting command; Arthur pushes after checking the result.
- **Content**: Claude drafts texts from public sources (his GitHub, existing pages) and flags what it cannot confirm. Never invent facts about his work.
- **Design**: the current minimalist look stays; a redesign is postponed until Arthur has references.
- The step documents in `docs/steps/` (Portuguese), the README and this file are still kept up to date.

## Out of scope (ask before touching)
- GitHub Pages settings (Settings → Pages): changed only by Arthur.
- Do not link the live Home Budget web app or API from the site: the API has no authentication and exposes real household data (see Step 06).

## Infrastructure
- **Hosting**: GitHub Pages, `https://arthurnorat.github.io/portfolio/`. Pages **source is GitHub Actions** (not "Deploy from a branch").
- **Deploy**: `.github/workflows/deploy.yml` builds with Node 22 (`npm ci`, `npm run build`) and publishes `_site/` on every push to `main`. It can also be run by hand from the Actions tab.
- No contact form and no third-party service (no Google Fonts or icon CDN either: fonts and icons are self-hosted).
- A custom domain is planned for later: it needs a `CNAME` file copied into `_site/`, DNS records (outside Git) and the new `site.url`. Not done yet.
- No environment variables and no secrets.

## Status
Roadmap: Steps 00–06 are done (see `docs/steps/`).
- 00 Foundation, 01 Remove the broken contact form, 02 Eleventy architecture.
- 03 Semantic HTML, 04 CSS cleanup and responsive layout, 05 Images and fonts, 06 Real content, contact and SEO.

Pending inputs from Arthur (the site is complete without them):
- Review the drafted texts in `src/_data/i18n/*.json` (hero, projects, About, contact) and the GSoC article status. Positioning: "Apple and Backend Developer" (iOS and macOS); the site is for recruiters and interviewers, so it never says he is looking for a first opportunity.
- Public email and resume PDF(s) in `site.json`.
- Screenshots for Home Budget and MenuBarTimer (add to `projects.json` and `assets/`).
- Custom domain (CNAME + DNS + `site.url`).
- A redesign, when he has references.
