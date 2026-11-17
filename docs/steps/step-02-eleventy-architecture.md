# Etapa 02 — Gerar as páginas de cada idioma com o Eleventy

## Objetivo

Acabar com a duplicação das seis páginas HTML (`index.html` e `gsoc2025.html` em inglês, português e espanhol). Antes, depois de mascarar os textos, a versão em inglês e a em português do `index.html` diferiam em só 7 linhas de estrutura, e as cópias já tinham começado a divergir (a ordem das bandeiras era diferente entre as páginas, e o link "Portfolio" da página do GSoC apontava para lugares diferentes). Toda mudança futura (Etapas 03, 04 e 06) teria que ser repetida à mão em 6 arquivos.

Agora a estrutura é escrita **uma vez**, em modelos, e o texto de cada idioma fica em **um arquivo de dados por idioma**. O Eleventy junta os dois e gera as 6 páginas. O site publicado fica igual ao anterior, exceto por duas correções de divergência e pela troca das bandeiras por texto (veja "Diferenças intencionais").

## Decisões

### 1. Ferramenta: Eleventy

| Opção | O que oferece | O que custa |
|---|---|---|
| A. Continuar com HTML puro | Nada para instalar, `open index.html` funciona | Cada mudança segue sendo repetida em 3 ou 6 arquivos, e as cópias continuam divergindo |
| B. Jekyll | O deploy continua igual (o GitHub Pages já constrói Jekyll) | Seu Ruby (2.6) é velho demais, então exigiria instalar outro; e o Jekyll que o Pages usa é uma versão antiga |
| **C. Eleventy (escolhida)** | Ferramenta atual, Node 22 já instalado, uma única dependência | Um passo de build e um deploy novo via GitHub Actions |

Ganha o C porque as próximas etapas mexem justamente no que se repete (estrutura do HTML, seletor de idioma, metadados de SEO como `hreflang`), e com um modelo cada uma dessas mudanças é feita uma vez.

### 2. Linguagem de modelo: Nunjucks

O Eleventy aceita várias (Liquid, Nunjucks, JavaScript...). O Nunjucks já vem incluído, tem herança de modelos (`extends`/`block`) e laços (`for`), e a sintaxe `{{ variável }}` é parecida com a de outros motores que você verá em Java (Thymeleaf) e em Swift (Stencil). Não exige instalar nada.

### 3. Onde fica o texto: um arquivo JSON por idioma

| Opção | O que oferece | O que custa |
|---|---|---|
| **JSON em `src/_data/i18n/` (escolhida)** | O Eleventy lê nativamente, sem plugin; fica claro onde editar cada texto | JSON não aceita comentários e exige aspas em tudo |
| YAML | Mais legível | Precisa de configuração extra no Eleventy |
| Plugin oficial de i18n do Eleventy | Ajuda com URLs por idioma | Resolve um problema que não temos: nossas URLs já são `/`, `/pt-br/` e `/es/` |

### 4. Artigo do GSoC: um fragmento HTML por idioma

O artigo tem negrito, `<code>`, listas e imagens. Mantive o HTML exatamente como estava (um arquivo por idioma em `src/_includes/gsoc/`), em vez de converter para Markdown. Assim o resultado é idêntico ao anterior e esta etapa mexe só na estrutura. Converter para Markdown seria reescrever, e reescrever mistura dois tipos de mudança no mesmo passo.

### 5. Links relativos, sem prefixo fixo

Os links continuam relativos (`./` no inglês e `../` nos outros idiomas), guardados no campo `root` de cada idioma. Assim o site funciona em `github.io/portfolio/` e também funcionará em um domínio próprio, sem mudar configuração. A alternativa seria um prefixo fixo (`/portfolio/`), que quebraria na hora de trocar para um domínio.

### 6. Seletor de idioma com texto: `EN · PT · ES`

Bandeira representa país, não idioma, e o nome técnico dessa peça é **seletor de idioma** (*language switcher*). Usei os códigos de idioma ISO 639-1: `EN`, `PT`, `ES`. O `BR` não serve porque é um código de **país** (ISO 3166-1), enquanto `pt-BR` (idioma + região) continua sendo usado no atributo `lang` da página e na dica ao passar o mouse ("Português (Brasil)").

## ADR — Gerar o site com um construtor estático (Eleventy)

**Contexto.** O site era HTML escrito à mão, com seis páginas quase idênticas. A repetição já causava divergência, e as etapas seguintes alterariam as seis páginas várias vezes. O GitHub Pages sozinho só entrega arquivos prontos.

**Decisão.** Passar a gerar as páginas com o Eleventy a partir de modelos e arquivos de dados, e publicar a pasta gerada (`_site/`) por meio de um workflow do GitHub Actions.

**Consequências.**
- O que melhora: estrutura e tradução ficam separadas; um ajuste global é feito uma vez; adicionar um idioma passa a ser criar um JSON e uma linha em `languages.json`.
- O que piora: o site passa a depender do Node e de um passo de build; não dá mais para abrir o `index.html` na raiz (use `npm start`); o deploy depende do workflow estar funcionando.
- Infraestrutura nova: a fonte do GitHub Pages deixa de ser "uma branch" e passa a ser "GitHub Actions" (uma configuração do painel do GitHub, que só você altera).
- Custo de reverter: baixo. A saída (`_site/`) é HTML comum; para voltar basta copiá-la de volta para a raiz, remover o workflow e reativar a publicação por branch.

## Como funciona

### Visão geral

```
src/_data/languages.json ─┐
src/_data/i18n/*.json    ─┼─►  Eleventy  ─►  _site/index.html, _site/pt-br/index.html, ...
src/*.njk (+ _includes)  ─┘
```

O Eleventy lê os **dados** (`_data`), aplica os **modelos** (`.njk`) e escreve as páginas em `_site/`. Os arquivos que não são modelos (`style.css` e `assets/`) são só copiados.

### `package.json` e `package-lock.json`

`package.json` descreve o projeto Node: o nome, os scripts (`npm run build` gera o site, `npm start` abre o servidor de desenvolvimento) e as dependências. Há uma só, em `devDependencies` (usada só para construir, não faz parte do site): `@11ty/eleventy`, fixada na versão exata `3.1.8`, sem `^`, para o resultado ser reproduzível.

`"type": "module"` diz ao Node que os arquivos `.js` do projeto usam a sintaxe moderna de módulos (`import`/`export`), a que o Eleventy 3 espera no arquivo de configuração.

`package-lock.json` é gerado pelo `npm` e registra a versão exata de **cada** pacote que veio junto (o Eleventy puxa dezenas). Ele é versionado de propósito: o comando `npm ci`, usado no deploy, instala exatamente o que o lock descreve (diferente de `npm install`, que pode atualizar versões).

`node_modules/` (onde os pacotes ficam) e `_site/` (a saída) entram no `.gitignore`, porque podem ser recriados a qualquer momento.

**Sobre o `npm audit`:** ele aponta vulnerabilidades de severidade alta em dependências internas do Eleventy (a principal é um ataque de desempenho em um validador de padrões de arquivo, o `picomatch`). Isso afeta só a máquina que constrói o site, lendo arquivos seus, e não o site publicado. A "correção" sugerida (`npm audit fix --force`) **rebaixa** o Eleventy para a 3.0.0, o que não resolve de verdade, então não apliquei. O ponto fica registrado para reavaliar quando sair uma versão nova do Eleventy.

### `eleventy.config.js`

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css", "assets": "assets" });
  return { dir: { input: "src", output: "_site" } };
}
```

- `dir` diz de onde ler (`src`) e para onde escrever (`_site`).
- `addPassthroughCopy` ("cópia direta") copia arquivos sem processá-los. O `style.css` e as imagens ficaram na raiz do repositório (as imagens são área restrita), e o `{ origem: destino }` os leva para o lugar certo em `_site/`.

### Dados: `src/_data/`

O Eleventy carrega todo arquivo desta pasta como uma variável **disponível em qualquer modelo**, com o nome do arquivo:

- `languages.json` → variável `languages`: uma lista com `code`, `htmlLang` (o valor do atributo `lang`), `path` (a pasta do idioma), `root` (caminho de volta à raiz), `short` (EN/PT/ES) e `name`.
- `site.json` → variável `site`: nome, ano e URLs que não mudam por idioma.
- `projects.json` → variável `projects`: nome, imagens e lado da imagem de cada projeto.
- `i18n/en.json`, `pt-br.json`, `es.json` → variável `i18n`, com uma entrada por idioma: `i18n["pt-br"]`. Cada arquivo tem todos os textos visíveis, organizados por seção (`nav`, `hero`, `projects`...).

Exemplo: `t.hero.greeting` vale "Hi, I'm" no inglês e "Olá, eu sou o" no português.

### Modelos: `src/index.njk` e `src/gsoc2025.njk`

O começo de cada arquivo é o *front matter* (entre `---`), a configuração da página:

```yaml
pagination:
  data: languages
  size: 1
  alias: lang
permalink: "{{ lang.path }}index.html"
```

`pagination` faz o Eleventy repetir o modelo **uma vez para cada item** de `languages`, com `lang` valendo o item da vez. `permalink` define o arquivo de saída: para o inglês `lang.path` é vazio (`index.html`), para o português é `pt-br/` (`pt-br/index.html`). **Um arquivo vira três páginas.**

No corpo do modelo:

- `{% set t = i18n[lang.code] %}` guarda os textos do idioma atual em `t`.
- `{% extends "layouts/base.njk" %}` diz que a página usa o layout comum e só preenche os espaços (`{% block navLinks %}` e `{% block content %}`).
- `{{ t.hero.role }}` imprime um texto; `{% for project in projects %}` repete um trecho.
- Em `{{ lang.root }}assets/headshot.png`, o `lang.root` faz o caminho certo para cada idioma (`./assets/...` no inglês, `../assets/...` nos demais).
- Na lista de projetos, `{% set pictures %}...{% endset %}` captura um trecho de HTML numa variável, e `imagesFirst` decide se as imagens vêm antes ou depois do texto (como no layout em zigue-zague original).

### Layout: `src/_includes/layouts/base.njk`

É o esqueleto de toda página: `<head>`, a barra de navegação e o rodapé. Os dois espaços `{% block %}` são preenchidos por cada modelo. Agora o `<head>`, o menu e o rodapé existem **uma única vez**.

### Seletor de idioma: `src/_includes/partials/lang-switcher.njk`

Repete um link por idioma:

```njk
<a href="{{ lang.root }}{{ other.path }}{{ switchTarget }}" class="lang-btn ..." lang="..." hreflang="..." title="..." aria-label="..." aria-current="page">EN</a>
```

- `switchTarget` é o nome da página atual (vazio no início, `gsoc2025.html` no artigo), então cada botão leva à **mesma página** no outro idioma.
- `lang` e `hreflang` indicam o idioma do link; `title` e `aria-label` guardam o nome completo; `aria-current="page"` marca a página atual para leitores de tela.

### `style.css`

Só as regras do seletor mudaram: o botão era um círculo de 2,5rem pensado para um emoji, e duas letras transbordariam. Agora ele é uma "pílula" (`min-width` + `padding` + `border-radius`) e ganhou um contorno visível ao navegar pelo teclado (`:focus-visible`). O resto do CSS ficou intocado (a limpeza é a Etapa 04).

### O deploy: `.github/workflows/deploy.yml`

O GitHub Pages sozinho não roda o Eleventy, então um **workflow** do GitHub Actions faz isso. O arquivo descreve, em YAML:

- `on`: quando rodar. A cada `push` na `main`, e manualmente (`workflow_dispatch`), pela aba Actions.
- `permissions`: o mínimo que o deploy precisa (ler o código, publicar no Pages).
- `concurrency`: só um deploy por vez.
- `build` (job 1): baixa o código, instala o Node 22 (com cache do npm), roda `npm ci` e `npm run build`, e envia `_site/` como artefato.
- `deploy` (job 2): publica o artefato no ambiente `github-pages`.

**Ordem para ativar** (a configuração é sua, fora do Git): em *Settings → Pages → Build and deployment*, troque **Source** para **GitHub Actions** *antes* do push. Se o workflow ficar vermelho, o site continua mostrando a última versão publicada.

### Diferenças intencionais em relação ao site anterior

1. O seletor mostra `EN · PT · ES` (em vez de 🇺🇸🇧🇷🇲🇽), na mesma ordem em todas as páginas (nas páginas do GSoC a ordem era diferente).
2. O link "Portfolio" da página do GSoC aponta para a página inicial do idioma em todas as línguas (no português e no espanhol apontava para `index.html`).

Fora isso, a verificação comparou as 6 páginas geradas com as originais: a estrutura, os textos, os atributos e as imagens ficaram iguais. Um detalhe visível só no código-fonte: o apóstrofo em textos como "Hi, I'm" é escrito como `&#39;` no HTML gerado. O navegador mostra o mesmo apóstrofo.

## Conexão com a próxima etapa

Com a estrutura em um só lugar, a **Etapa 03** (HTML semântico e válido) conserta os problemas de marcação (como `<button>` dentro de `<a>` e vários `<h1>` por página) **uma vez**, no layout e nos dois modelos, em vez de seis. A Etapa 04 faz o mesmo com o CSS e o layout de celular.
