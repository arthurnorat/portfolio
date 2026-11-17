# Portfolio

Personal professional portfolio of Arthur Norat. A static site in three languages, generated with Eleventy (Node) and published on GitHub Pages. No client-side JavaScript.

## Commands
- `npm install`: install dependencies (once).
- `npm start`: dev server with live reload at `http://localhost:8080` (Arthur runs it).
- `npm run build`: generate the site into `_site/` (a compile check; safe for Claude to run).

## Architecture
- Source lives in `src/`; the generated site goes to `_site/` (git-ignored, never edited by hand).
- **Structure is written once**, in `src/_includes/layouts/base.njk` (head, nav, footer) and `src/_includes/partials/lang-switcher.njk`. The two page types are `src/index.njk` (home) and `src/gsoc2025.njk` (Google Summer of Code 2025 write-up); each one is generated three times, once per entry of `src/_data/languages.json` (`/`, `/pt-br/`, `/es/`).
- **Text lives in data files**, one per language: `src/_data/i18n/{en,pt-br,es}.json`. Language-neutral data: `site.json` (name, URLs, year) and `projects.json` (project names and images).
- The GSoC article body is one HTML fragment per language: `src/_includes/gsoc/{en,pt-br,es}.html` (images use `{{ lang.root }}assets/...`).
- Links are relative (`lang.root` is `./` for English and `../` for the others), so the site works under `github.io/portfolio/` and at a custom domain with no config change.
- `style.css` and `assets/` stay at the repo root and are copied as they are (`eleventy.config.js`).
- A change that affects every page goes in the layout; a text change goes in the three i18n files. Never edit `_site/`.
- The visible site content is in EN / PT-BR / ES (that is the product). Code, comments, commit messages and docs are in English.

## Working mode (authorized by Arthur on 2026-11-17)
For the remaining roadmap (Steps 03–06) Claude delivers the site end to end and tests it itself, instead of stopping for review after each step. This overrides the default "one step, then stop" rule of the global instructions, with these limits:
- **Git**: Claude may `git add` and `git commit` (small Conventional Commits, English). Claude never runs `git push` or any history-rewriting command; Arthur pushes after checking the result.
- **Content**: Claude drafts texts from public sources (his GitHub, existing pages) and flags what it cannot confirm. Never invent facts about his work.
- **Design**: the current minimalist look stays; a redesign is postponed until Arthur has references.
- The step documents in `docs/steps/` (Portuguese), the README and this file are still kept up to date.

## Out of scope (ask before touching)
- Images in `assets/`: do not edit, compress or rename without asking.
- The photos `assets/arthur.JPG` and `assets/4e713b43-d59f-4b44-8cc5-8d373e287f49.jpg` stay until Step 06.
- GitHub Pages settings (Settings → Pages): changed only by Arthur.

## Infrastructure
- **Hosting**: GitHub Pages, `https://arthurnorat.github.io/portfolio/`. Pages **source is GitHub Actions** (not "Deploy from a branch").
- **Deploy**: `.github/workflows/deploy.yml` builds with Node 22 (`npm ci`, `npm run build`) and publishes `_site/` on every push to `main`. It can also be run by hand from the Actions tab.
- No contact form and no third-party service (the broken Formspree form was removed in Step 01).
- A custom domain is planned for later: it will need a `CNAME` file copied into `_site/` and DNS records (outside Git). Not done yet.
- No environment variables and no secrets.

## Status
Roadmap (one step at a time, reviewed before the next):
- 00 Foundation (done).
- 01 Remove the broken contact form (done).
- 02 Eleventy architecture (done): templates + one data file per language; GitHub Actions deploy; language switcher with text (`EN · PT · ES`) instead of flags.
- 03 Semantic, valid HTML (next).
- 04 CSS cleanup (including the dead form CSS) and responsive layout (mobile is broken).
- 05 Image and font optimization.
- 06 Real content (Lorem ipsum is live), contact section + resume PDF (needs Arthur's public email choice and the PDF), custom domain, and SEO / Open Graph.
