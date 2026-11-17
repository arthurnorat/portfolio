# Etapa 06 — Conteúdo real, contato e SEO

## Objetivo

Trocar o conteúdo provisório por conteúdo real, em três idiomas, e preparar o site para ser encontrado e compartilhado. Antes, os três projetos e o "Sobre mim" eram Lorem ipsum, os projetos eram de curso, o botão "Resume" não fazia nada e a página não tinha descrição nem imagem de compartilhamento.

## Decisões

### 1. Quais projetos mostrar

Pesquisei o seu GitHub público (repositórios, descrições e READMEs) e comparei com o que o site mostrava. Os projetos do site eram Tipsy, Budget Tracker e Quizzler (de curso, o segundo com uma tela inacabada, com "Label" e "Button" ainda visíveis). O seu trabalho atual é bem diferente e mais forte para quem recruta.

| Projeto | Decisão | Motivo |
|---|---|---|
| **Home Budget** (API Java/Spring Boot, web Angular, macOS, iOS, Android) | Entra, em primeiro | É o projeto mais completo, mostra backend e Apple juntos, e é o seu foco atual |
| **MenuBarTimer** | Entra | App macOS completo, com README, e demonstra produto acabado |
| **Tipsy** (repositório `Gorjetas`) | Fica | É um projeto iOS curto, mas tem repositório público e screenshots |
| Budget Tracker | Sai | Tela inacabada e substituído pelo Home Budget |
| Quizzler | Sai | Não encontrei repositório público para linkar |

O GSoC continua na seção de Experiência.

### 2. Nenhum link para o Home Budget "ao vivo"

O README do `home-budget-api` lista a API e o app web em produção como "demo". Mas o próprio README diz que **não há autenticação** e que a API é pública, de uso privado entre duas pessoas. Isso significa que qualquer pessoa com o endereço consegue ler (e alterar) os gastos reais da sua casa. Por isso o portfólio **não linka** esses endereços: só os repositórios.

**Isso merece atenção fora do portfólio:** o endereço da API está no README público do repositório, e a autenticação (Firebase Auth) está só "planejada". Vale priorizá-la, ou pelo menos remover os links de produção do README enquanto ela não existe.

### 3. Posicionamento: "Apple and Backend Developer"

O site dizia "iOS and Web Developer", mas o seu perfil e os repositórios hoje são Swift (iOS e macOS) e Java com Spring Boot. O cargo no seu perfil do GitHub já diz "Backend Developer". Usei **Apple e Backend** (e não "iOS", porque você também desenvolve para macOS) e uma frase curta embaixo: "Crio apps para as plataformas Apple com Swift e back-ends com Java e Spring Boot." O portfólio é para recrutadores e entrevistadores, então os textos não falam em "procurar a primeira oportunidade".

### 4. Texto do "Sobre mim" a partir das suas próprias palavras

Escrevi com base no README do seu perfil do GitHub (estudante de Engenharia de Software na Estácio, formado em Direito, Analista Judiciário, em transição para tecnologia, começou com iOS) e nos repositórios (Java, Spring Boot, GSoC). Só usei fatos que já estão públicos por você. Nada foi inventado.

### 5. Contato sem formulário (decisão da Etapa 01)

A seção "Entre em contato" tem botões para **LinkedIn** e **GitHub**. Dois botões aparecem sozinhos quando você preencher os dados:

- **E-mail:** preencha `email` em `src/_data/site.json`.
- **Currículo (PDF):** coloque o arquivo em `assets/` e preencha `resume` em `site.json`.

Enquanto estiverem vazios, os botões simplesmente **não aparecem** (em vez de aparecerem sem função). Exemplo:

```json
"email": "voce@exemplo.com",
"resume": {
  "en": "assets/resume-en.pdf",
  "pt-br": "assets/resume-pt.pdf",
  "es": "assets/resume-es.pdf"
}
```

Cada idioma pode ter o seu PDF; deixe em branco o idioma que não tiver.

### 6. Ano do rodapé calculado no build

O rodapé dizia "2025" fixo. Agora `src/_data/build.js` calcula o ano quando o site é gerado (`new Date().getFullYear()`), então ele se atualiza a cada deploy.

## SEO e compartilhamento

SEO é facilitar que buscadores e redes sociais entendam cada página. Tudo está no `<head>` do `base.njk`:

| O que | Para quê |
|---|---|
| `<title>` descritivo e `<meta name="description">` por página e idioma | O que aparece nos resultados do Google |
| `<link rel="canonical">` | Diz qual é o endereço "oficial" da página |
| `<link rel="alternate" hreflang="...">` | Liga as versões em outros idiomas, para o Google mostrar a certa para cada pessoa (inclui `x-default`) |
| Open Graph (`og:title`, `og:image`...) e `twitter:card` | A prévia ao colar o link no LinkedIn, WhatsApp e outras redes |
| `sitemap.xml` | Lista todas as páginas e suas versões de idioma |
| `robots.txt` | Aponta o sitemap para os buscadores |

Detalhes importantes:

- Os endereços de `canonical`, `hreflang` e `og:image` precisam ser **absolutos** (com `https://...`). Eles vêm de `site.url` em `site.json`. **Quando você tiver um domínio próprio, troque só esse valor.**
- O `robots.txt` só tem efeito na **raiz de um domínio**. Em `arthurnorat.github.io/portfolio/` ele fica no caminho `/portfolio/robots.txt`, que os buscadores ignoram. Ele passa a valer quando houver domínio próprio. Por enquanto o `sitemap.xml` pode ser enviado direto ao Google Search Console.

## O que ainda precisa de você

Não consegui, por conta própria, e deixei preparado:

1. **Revisar os textos.** São rascunhos nas três línguas. Em especial, confirme: o primeiro parágrafo do "Sobre mim", reescrito para destacar a bagagem em Direito (raciocínio analítico, atenção aos detalhes, senso de responsabilidade, que são palavras suas no README do perfil) em vez de falar em transição de carreira, e a data de formatura, que não foi incluída.
2. **E-mail público** (e se prefere um alias só para o portfólio).
3. **PDF do currículo** (um ou por idioma).
4. **Screenshots do Home Budget e do MenuBarTimer** (os cartões deles hoje não têm imagem). Basta adicionar a lista `images` em `projects.json` e os arquivos em `assets/`. Cuidado para não mostrar dados reais de gastos.
5. **O artigo do GSoC** diz que a merge request "ainda não foi mesclada". Foi escrito em agosto de 2025; se o status mudou, atualize os três arquivos em `src/_includes/gsoc/`.
6. **Domínio próprio** (se for fazer): um arquivo `CNAME` no site e registros de DNS, que ficam fora do Git.

## Como foi verificado

- Conferi os cartões, o "Sobre", o contato e o rodapé no navegador (desktop e celular).
- O `sitemap.xml` e o `robots.txt` são gerados com as 6 URLs e os `hreflang`.
- O HTML gerado passou no validador e o axe não achou violações (veja a Etapa 03).

## Conexão com a próxima etapa

O roteiro principal está completo. O que sobra são as entradas que só você tem (itens acima) e, no futuro, um redesign mais elaborado: com a estrutura em templates e o CSS em variáveis, ele passa a ser uma mudança concentrada em poucos arquivos.
