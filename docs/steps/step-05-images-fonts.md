# Etapa 05 — Imagens e fontes

## Objetivo

Reduzir o peso do site. Na primeira visita, a página inicial baixava cerca de **2,1 MB**, quase tudo em imagens: a foto do hero sozinha tinha 1,3 MB e era exibida com 400px. Também havia 18 variações da fonte Poppins carregadas de um serviço externo. Depois desta etapa, tudo o que a página pode carregar soma cerca de **200 KB**, e nada vem de terceiros.

## Decisões

### 1. Como otimizar as imagens

| Opção | O que oferece | O que custa |
|---|---|---|
| Plugin `eleventy-img` | Gera tamanhos e formatos automaticamente a cada build | Mais uma dependência e configuração para entender, para um site com pouquíssimas imagens |
| Ferramenta de linha de comando manual (Preview, `sips`) | Nada para instalar | Não escolhe WebP e é difícil repetir com os mesmos parâmetros |
| **Script único com `sharp` (escolhida)** | Controle total, resultado reproduzível pelo trecho abaixo, nenhuma dependência no projeto | Rodar de novo exige reinstalar o `sharp` por fora do repositório |

Como são ~15 imagens que quase nunca mudam, otimizar uma vez e commitar o resultado é mais simples do que otimizar a cada build.

### 2. Formato: WebP

| Formato | Tamanho | Suporte |
|---|---|---|
| PNG | Grande para fotos e screenshots | Universal |
| JPEG | Pequeno para fotos | Universal, mas não tem transparência |
| **WebP (escolhido)** | ~10x menor que o PNG, aceita transparência | Todos os navegadores atuais |
| AVIF | Ainda menor | Suporte mais recente; ganho pequeno para este site |

### 3. Fontes hospedadas no próprio site

| Opção | O que oferece | O que custa |
|---|---|---|
| Google Fonts (como estava) | Zero arquivos para manter | Uma requisição a um terceiro (que também vê o IP do visitante), 18 variações das quais só 3 eram usadas |
| **Hospedar a Poppins (escolhida)** | Sem terceiros, sem pedido extra de DNS, controle do que é carregado | 3 arquivos no repositório (cerca de 8 KB cada) |

Ficaram só os pesos que o site usa: 400 (texto), 600 (botões, destaques) e 700 (títulos), e só o subconjunto **latin**, que cobre inglês, português e espanhol (acentos, `ñ`, `ç`...). A licença da Poppins (SIL Open Font License) permite hospedar.

## Como funciona

### Resultado

| Arquivo | Antes | Depois |
|---|---|---|
| Foto do hero (`headshot`) | 1304 KB (PNG) | 34 KB (WebP 800×800) |
| Foto do "Sobre" (`about`) | 362 KB (JPG, usada nenhuma vez) | 37 KB (WebP 800×800, recorte do rosto) |
| Screenshots do Tipsy (cada) | ~125 KB | ~10 KB |
| Logo do VLC | 220 KB | 4 KB |
| Ícones do LinkedIn e GitHub | 13 e 9 KB | 2 e 3 KB |
| Imagens de código do artigo | de 52 a 312 KB cada | de 5 a 63 KB cada |
| Fonte Poppins | 18 variações vindas do Google | 3 arquivos de ~8 KB |
| Ícones do Boxicons | biblioteca inteira de um site externo | 3 SVGs no próprio HTML |

### O script de otimização

Rodei um script único (fora do repositório) com a biblioteca `sharp`. A ideia central:

```js
await sharp("original.jpg")
  .resize(800, 800)         // o dobro do tamanho exibido (400px), para telas retina
  .webp({ quality: 80 })    // qualidade 80 é indistinguível a olho nu
  .toFile("headshot.webp");
```

Para repetir, instale o `sharp` numa pasta temporária (`npm install sharp`) e ajuste esses parâmetros. Os recortes foram:

- `headshot.webp`: a foto quadrada, redimensionada. O círculo agora vem do CSS (`border-radius: 50%`).
- `about.webp`: um recorte quadrado de 1100px da foto larga, centrado no rosto.
- `og-image.jpg` (1200×630): a foto em círculo sobre fundo claro, para a prévia ao compartilhar o link.
- `favicon-32.png` e `apple-touch-icon.png` (180×180): ícones do site, gerados a partir do avatar antigo.

### No HTML

- `width` e `height` em todas as imagens: o navegador reserva o espaço antes de baixar, e a página não "pula".
- `loading="lazy"`: imagens abaixo da dobra só carregam quando você chega perto delas.
- `fetchpriority="high"` na foto do hero: ela é o que aparece primeiro, então tem prioridade.
- `<link rel="preload">` das fontes 400 e 600: o navegador começa a baixá-las antes de ler o CSS, o que evita o texto "piscar" com a fonte trocada.
- `font-display: swap` no CSS: mostra o texto com uma fonte do sistema enquanto a Poppins carrega.

### Arquivos originais removidos

Os arquivos substituídos (como `headshot.png`, `arthur.JPG`, `4e713b43-….jpg`, os screenshots em PNG) saíram do repositório e **continuam no histórico do Git**. Para recuperar um deles:

```bash
git show e54b8a4:assets/arthur.JPG > arthur.JPG
```

(`e54b8a4` é o último commit antes desta etapa.) O `budget_tracker.png` e o `quizzler.png` também foram removidos, porque esses projetos saíram do site (veja a Etapa 06).

## Como foi verificado

- O site gerado tem 520 KB no total (já com os arquivos que só aparecem em outra página); a página inicial pode carregar cerca de 200 KB.
- Todas as imagens carregam no navegador (conferi `naturalWidth > 0` em todas, inclusive as preguiçosas).
- O script de links confirmou que nenhum dos 99 links e imagens locais está quebrado.

## Conexão com a próxima etapa

A Etapa 06 troca o conteúdo provisório (Lorem ipsum e projetos de curso) pelo conteúdo real e adiciona os metadados de SEO, incluindo a imagem de compartilhamento gerada aqui.
