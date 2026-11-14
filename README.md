🇺🇸 [English](#english) · 🇧🇷 [Português](#português)

---

<a name="english"></a>

# Arthur Norat — Portfolio

Personal professional portfolio, available in English, Brazilian Portuguese and Spanish. Live at https://arthurnorat.github.io/portfolio/

## Structure

```
.
├── index.html          # home (English)
├── gsoc2025.html       # Google Summer of Code 2025 write-up (English)
├── pt-br/              # same pages in Brazilian Portuguese
├── es/                 # same pages in Spanish
├── style.css           # single stylesheet shared by all pages
├── assets/             # images
└── docs/steps/         # study documents, one per step (in Portuguese)
```

## Run locally

It is a static site, so no installation is needed. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

The site is published with GitHub Pages straight from the repository. Pushing to the published branch updates the live site.

---

<a name="português"></a>

# Arthur Norat — Portfólio

Portfólio profissional pessoal, disponível em inglês, português do Brasil e espanhol. No ar em https://arthurnorat.github.io/portfolio/

## Estrutura

```
.
├── index.html          # página inicial (inglês)
├── gsoc2025.html       # texto sobre o Google Summer of Code 2025 (inglês)
├── pt-br/              # as mesmas páginas em português do Brasil
├── es/                 # as mesmas páginas em espanhol
├── style.css           # única folha de estilo, usada por todas as páginas
├── assets/             # imagens
└── docs/steps/         # documentos de estudo, um por etapa (em português)
```

## Rodar localmente

É um site estático, então não precisa instalar nada. Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Deploy

O site é publicado com o GitHub Pages direto do repositório. Fazer push na branch publicada atualiza o site no ar.
