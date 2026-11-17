# Etapa 04 — CSS limpo e layout responsivo

## Objetivo

Reescrever o `style.css` mantendo o **mesmo visual minimalista** (Poppins, texto preto e cinza, botões em forma de pílula, foto circular), mas com o código organizado, sem o que não era usado, e com um layout que **funciona no celular**. Antes, em uma tela de 375px o site era desenhado com 757px de largura e o hero ficava cortado.

## Decisões

### 1. Reescrever em vez de remendar

| Opção | O que oferece | O que custa |
|---|---|---|
| Remendar o CSS antigo | Menos linhas alteradas | O arquivo tinha ~1000 linhas, cerca de 150 sem uso (formulário, botões que não existem), regras duplicadas e seletores atrelados a nomes de arquivo; remendar manteria tudo isso |
| **Reescrever (escolhida)** | Código novo de 672 linhas (eram 1014), pensado para a marcação nova | Risco de mudar o visual sem querer, mitigado comparando o site antes e depois no navegador |

A marcação nova (Etapa 03) usa classes novas e mais curtas, então o CSS antigo teria que ser reescrito de qualquer forma.

### 2. Variáveis CSS para cores e tamanhos

Os valores que se repetem ficam em um só lugar, em `:root`:

```css
:root {
    --color-muted: #555;
    --color-border: #555;
    --page-max: 1200px;
    --gutter: clamp(1.25rem, 6vw, 5rem);
}
```

Depois se usa `var(--color-muted)`. Trocar uma cor passa a ser mudar uma linha. É a base para o redesign futuro.

### 3. Responsivo sem JavaScript e sem menu "hambúrguer"

O menu tem só quatro links. Em vez de um menu que abre e fecha (que precisaria de JavaScript), o cabeçalho **quebra em duas linhas** no celular: logo e seletor de idioma em cima, links embaixo. O `flex-wrap` faz isso.

### 4. Pontos de quebra: 900px e 480px

| Largura | O que muda |
|---|---|
| Acima de 900px | Duas colunas (texto e foto lado a lado) |
| Até 900px | Colunas viram uma só; foto do hero vai para cima e diminui; cabeçalho em duas linhas |
| Até 480px | Tamanhos de título e botões menores; lista de metadados vira coluna |

### 5. Um só estilo de botão: `.btn`

Existiam `.btn-1`, `.btn-2` (idênticos), `.btn-3` e regras para `button` e `a` ao mesmo tempo. Agora é um só: `.btn`.

### 6. Foco visível e movimento reduzido

- `:focus-visible` desenha um contorno em qualquer elemento que receba foco pelo teclado (antes, os campos tinham `outline: none`).
- `scroll-behavior: smooth` só vale para quem **não** pediu menos movimento (`prefers-reduced-motion`).

## Como o CSS funciona

O arquivo segue a ordem: fontes, variáveis, base, cabeçalho, seletor de idioma, botões, hero, seções e itens, sobre, contato, cabeçalho do GSoC, artigo, rodapé e, por último, o responsivo.

Conceitos novos:

- **`clamp(mínimo, ideal, máximo)`:** um valor que cresce com a tela dentro de limites. `--gutter: clamp(1.25rem, 6vw, 5rem)` dá margens de 20px no celular e 80px em telas grandes, sem ponto de quebra.
- **`min(400px, 80vw)`:** usa o menor dos dois. A foto tem 400px, mas nunca passa de 80% da largura da tela.
- **`aspect-ratio: 1` + `border-radius: 50%`:** deixa a foto quadrada e a corta em círculo. Antes, o círculo vinha *dentro* do arquivo PNG (com cantos transparentes, 1,3 MB).
- **`flex` e `flex-wrap`:** alinham itens em linha e deixam que quebrem de linha quando faltar espaço.
- **`order`:** muda a ordem visual no celular (seletor de idioma ao lado do logo) sem mudar a ordem do HTML.
- **`[aria-current="page"]`:** seletor de atributo. O botão do idioma atual é destacado com o mesmo atributo que o leitor de tela lê, em vez de uma classe `.active` separada.

### O que foi removido

Estilos do formulário de contato (da Etapa 01), `.btn-3`, `.contact-item`, `.contact-icon`, `.btn-back`, `.links-container`, o bloco de CSS comentado e os seletores por nome de arquivo (`src*="keychain.png"`).

## Como foi verificado

- Abri o site no navegador em desktop (1280px) e celular (375px), nas páginas inicial e do GSoC, comparando com o visual anterior.
- Um script abriu as 6 páginas em 6 larguras (320, 375, 600, 768, 1024 e 1440px) e conferiu se alguma coisa passa da largura da tela: **nenhum overflow nas 36 combinações**.
- O contraste das cores foi calculado (ver Etapa 03).

**Pequenas diferenças visuais em relação ao site anterior** (intencionais): os botões usam a fonte Poppins (antes usavam a fonte padrão do sistema, porque `<button>` não herda a fonte), o logo do VLC aparece menor (200px) e o cabeçalho do GSoC e seus botões ficam em uma só faixa, alinhados à esquerda do artigo.

## Conexão com a próxima etapa

A Etapa 05 reduz o peso do que o CSS e o HTML carregam: imagens e fontes.
