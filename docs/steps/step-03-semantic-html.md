# Etapa 03 — HTML semântico e válido

## Objetivo

Corrigir a marcação (o HTML) do site para que ela diga **o que cada pedaço é**, e não apenas como ele aparece. Isso ajuda leitores de tela, buscadores e qualquer ferramenta que leia a página sem enxergar o visual. Como a estrutura agora vive em um só lugar (Etapa 02), cada correção foi feita **uma vez**, no layout e nos dois modelos, e vale para as seis páginas.

Problemas resolvidos (todos listados na auditoria):

- `<button>` dentro de `<a>`, que é HTML inválido.
- Vários `<h1>` por página e títulos fora de ordem.
- Botões que não faziam nada.
- Nenhuma região da página marcada (`<header>`, `<main>`...).
- Textos alternativos fracos e símbolos `&` e `>` sem escape.

## Decisões

### 1. Botão ou link? A regra é: navega = `<a>`, executa = `<button>`

| Elemento | Quando usar | Por que |
|---|---|---|
| `<a href>` | Leva a outra página, outra seção ou um arquivo | O navegador oferece "abrir em nova aba", o teclado e o leitor de tela o tratam como link |
| `<button>` | Executa uma ação na própria página (enviar formulário, abrir um menu) | Ele não tem destino |

Todos os "botões" do site levam a algum lugar (GitHub, LinkedIn, o artigo do GSoC, a seção de contato). Então viraram `<a class="btn">`, com a mesma aparência de antes. O `<button>` dentro de `<a>` era inválido porque dois elementos interativos não podem ficar um dentro do outro.

### 2. Um `<h1>` por página, e títulos em ordem

Os títulos formam o "índice" da página que leitores de tela usam para navegar. A regra é um `<h1>` (o assunto da página) e depois `<h2>`, `<h3>` sem pular níveis.

- **Página inicial:** `<h1>` é o seu nome; as seções (Projetos, Experiência, Sobre, Contato) são `<h2>`; cada projeto é `<h3>`.
- **Página do GSoC:** o `<h1>` é o título do projeto. O artigo começava com outro `<h1>`, então ele virou `<h2>` e os subtítulos viraram `<h3>`.

A aparência não muda, porque o CSS usa classes e não o nível do título.

### 3. Regiões da página (landmarks)

`<header>`, `<nav aria-label="...">`, `<main id="main">` e `<footer>` permitem que um leitor de tela pule direto para o conteúdo. Cada `<section>` tem `aria-labelledby` apontando para o seu título, e cada projeto é um `<article>` (um bloco que faz sentido sozinho).

### 4. Link "Pular para o conteúdo"

É o primeiro elemento da página e só aparece quando recebe foco (ao apertar `Tab`). Quem navega pelo teclado evita passar por todo o menu a cada página.

### 5. Textos alternativos e nomes acessíveis

- Cada imagem tem `alt` descrevendo o que mostra (por exemplo, "Tela de resultado do Tipsy com o valor por pessoa"), nas três línguas. Antes, duas imagens diferentes tinham o mesmo `alt="Tipsy"`.
- Os botões dos repositórios do Home Budget têm texto curto ("API", "Web", "macOS"...). Sozinho, isso não explica nada para um leitor de tela, então o `aria-label` completa: "Código-fonte de Home Budget: API". Isso respeita a regra "Label in Name" (WCAG 2.5.3): o nome acessível **contém** o texto visível.
- Imagens com `width` e `height` evitam que o conteúdo "pule" quando elas carregam.

## Como o código funciona

### `src/_includes/layouts/base.njk`

O esqueleto comum. Mostra os conceitos novos:

- `<html lang="{{ lang.htmlLang }}">`: o idioma da página (`pt-BR`, `es`, `en`), usado pelo leitor de tela para escolher a pronúncia.
- `<a class="skip-link" href="#main">`: o link de pular; `#main` aponta para o `id` do `<main>`.
- `<nav aria-label="Principal">`: rótulo que diferencia esta navegação de outras na mesma página.
- `<div role="group" aria-label="Idioma">`: agrupa os links do seletor de idioma.
- Os `{%- set ... -%}` do começo escolhem o título e a descrição conforme `pageKind` ("home" ou "gsoc"). O `-` ao lado de `{%` e `%}` remove espaços em branco, para que nada apareça antes do `<!DOCTYPE html>`.

### `src/index.njk`

Cada seção usa `aria-labelledby`:

```njk
<section id="projects" class="section" aria-labelledby="projects-title">
    <h2 id="projects-title" class="section-title">...</h2>
```

Os projetos vêm de `src/_data/projects.json` por um laço `{% for project in projects %}`. `{% if project.images | length %}` desenha o bloco de imagens apenas quando o projeto tem screenshots (o `| length` é um *filtro* do Nunjucks que conta os itens da lista).

### `src/_includes/partials/icons.njk`

Os três ícones da página do GSoC (calendário, código e ramificação) eram da biblioteca Boxicons, carregada inteira de um site externo. Agora são três SVGs escritos à mão, dentro de um *macro* (uma função de modelo): `{{ icon("calendar") }}`. Eles têm `aria-hidden="true"`, porque são decorativos e o texto ao lado já diz tudo.

### Fragmentos do artigo (`src/_includes/gsoc/*.html`)

- Títulos rebaixados (de `<h1>`/`<h2>` para `<h2>`/`<h3>`).
- `->` virou `-&gt;` e `&` virou `&amp;`. Em HTML, `&` e `>` soltos são ambíguos (um `&` pode começar uma entidade como `&copy;`). O navegador mostra o mesmo texto.
- Imagens com `width`, `height` e `loading="lazy"` (só carregam quando chegam perto da tela).
- Os tamanhos antigos, que dependiam do nome do arquivo (`src*="keychain.png"`), viraram classes: `code-image--phone`, `--wide`, `--large`.

### `lang-switcher.njk`

Cada link tem `lang` e `hreflang` próprios (o idioma do destino), `title`/`aria-label` com o nome completo e `aria-current="page"` no idioma atual, que também é o que o CSS usa para destacar o botão.

## Como foi verificado

- **`html-validate`** (um validador de HTML que roda no Node) sobre as 6 páginas geradas: 0 erros. Ele pegou os `&` e `>` soltos do artigo, que foram corrigidos.
- **`axe-core`** (o motor de acessibilidade usado pelo Lighthouse), rodado localmente sobre as 6 páginas: 0 violações nas regras estruturais (nomes, rótulos, títulos, regiões, idioma).
- **Contraste de cores** calculado à mão (a regra de contraste do axe precisa de um navegador de verdade): todos os pares de cores passam de 4,5:1 (o mínimo AA). O azul dos links foi trocado de `#007bff` (3,98:1, reprovado) para `#0b5ed7` (5,84:1).
- **Links e imagens:** 99 links locais, nenhum quebrado.

**Limites:** não testei com um leitor de tela de verdade (como o VoiceOver). Vale você ligar o VoiceOver (`Cmd+F5`) e navegar pelo site uma vez.

## Conexão com a próxima etapa

Com a marcação certa, a Etapa 04 reescreve o CSS para acompanhar as novas classes e deixa o site funcionar no celular.
