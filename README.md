🇺🇸 [English](#english) · 🇧🇷 [Português](#português)

---

<a name="english"></a>

# Arthur Norat — Portfolio

Personal professional portfolio, available in English, Brazilian Portuguese and Spanish. Live at https://arthurnorat.github.io/portfolio/

Built with [Eleventy](https://www.11ty.dev/): the structure is written once in templates, and the text of each language lives in its own data file.

## Structure

```
.
├── src/
│   ├── _data/              # languages, site info and one text file per language (i18n/)
│   ├── _includes/          # layout, language switcher and the GSoC article per language
│   ├── index.njk           # home page template (generated in 3 languages)
│   └── gsoc2025.njk        # GSoC 2025 write-up template (generated in 3 languages)
├── style.css               # single stylesheet shared by all pages
├── assets/                 # images
├── eleventy.config.js      # Eleventy configuration
├── .github/workflows/      # deploy to GitHub Pages
└── docs/steps/             # study documents, one per step (in Portuguese)
```

The generated site goes to `_site/` (not versioned) as `/`, `/pt-br/` and `/es/`.

## Run locally

Requires Node 18 or newer.

```bash
npm install
```

```bash
npm start
```

Then open http://localhost:8080. To only generate the site into `_site/`, run `npm run build`.

## Deploy

On every push to `main`, a GitHub Actions workflow builds the site and publishes it with GitHub Pages. In the repository settings, Pages must use **GitHub Actions** as its source.

---

<a name="português"></a>

# Arthur Norat — Portfólio

Portfólio profissional pessoal, disponível em inglês, português do Brasil e espanhol. No ar em https://arthurnorat.github.io/portfolio/

Feito com [Eleventy](https://www.11ty.dev/): a estrutura é escrita uma vez em modelos, e o texto de cada idioma fica em um arquivo de dados próprio.

## Estrutura

```
.
├── src/
│   ├── _data/              # idiomas, dados do site e um arquivo de texto por idioma (i18n/)
│   ├── _includes/          # layout, seletor de idioma e o artigo do GSoC por idioma
│   ├── index.njk           # modelo da página inicial (gerado em 3 idiomas)
│   └── gsoc2025.njk        # modelo do texto sobre o GSoC 2025 (gerado em 3 idiomas)
├── style.css               # única folha de estilo, usada por todas as páginas
├── assets/                 # imagens
├── eleventy.config.js      # configuração do Eleventy
├── .github/workflows/      # deploy no GitHub Pages
└── docs/steps/             # documentos de estudo, um por etapa (em português)
```

O site gerado vai para `_site/` (não versionado) como `/`, `/pt-br/` e `/es/`.

## Rodar localmente

Requer Node 18 ou mais recente.

```bash
npm install
```

```bash
npm start
```

Depois abra http://localhost:8080. Para apenas gerar o site em `_site/`, rode `npm run build`.

## Deploy

A cada push na `main`, um workflow do GitHub Actions gera o site e o publica com o GitHub Pages. Nas configurações do repositório, o Pages precisa usar **GitHub Actions** como fonte.
