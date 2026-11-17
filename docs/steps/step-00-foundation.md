# Etapa 00 — Fundação

## Objetivo

Preparar o repositório para as próximas etapas de melhoria do portfólio, **sem mudar nada do que aparece no site**. Antes desta etapa, o projeto não tinha nenhuma documentação: não existia `CLAUDE.md`, o `README.md` tinha só uma linha de teste, o `.gitignore` era um template enorme de Node (o site não usa Node) e havia arquivos que não deveriam estar no Git.

Esta etapa entrega:

- um `.gitignore` enxuto e correto para um site estático;
- um `CLAUDE.md` que explica o projeto, suas regras e o roteiro das próximas etapas;
- um `README.md` bilíngue (inglês e português);
- este documento;
- a remoção de arquivos que o site não usa (feita por você, com comandos do Git).

## Decisões

### 1. `.gitignore` mínimo em vez de um template genérico

| Opção | O que oferece | O que custa |
|---|---|---|
| Template genérico (o que existia: ~180 linhas, com blocos repetidos) | Cobre "tudo" que alguém já imaginou | Ninguém lê 180 linhas; regras de Node, Gatsby, Nuxt e Storybook não têm relação com este site; as repetições escondem o que importa |
| `.gitignore` mínimo (escolhido: ~20 linhas) | Cada linha tem motivo e dá para entender de cabeça | Se um dia o projeto ganhar uma ferramenta (por exemplo Node, na Etapa 02), é preciso acrescentar a regra dela |

Ganha o mínimo: este é um projeto de aprendizado e a regra é "entender tudo o que está no repositório". Se a Etapa 02 introduzir uma ferramenta, a regra dela entra nessa etapa, com a explicação.

### 2. `.DS_Store` não deve ser versionado

`.DS_Store` é um arquivo que o Finder do macOS cria em cada pasta para guardar detalhes de visualização (posição dos ícones, ordenação). Ele não tem valor para ninguém além da sua máquina e muda sozinho, gerando "alterações" falsas nos commits. Por isso ele entra no `.gitignore` (`.DS_Store` e `._*`, que são arquivos parecidos criados em alguns discos externos).

### 3. Apagar os ícones sem uso em vez de guardá-los "por garantia"

Seis imagens nunca são referenciadas por nenhuma página nem pelo CSS: `arrow.png`, `checkmark.png`, `education.png`, `email.png`, `experience.png` e `toggle.png`. Manter arquivos mortos aumenta o tamanho do repositório e atrapalha: quando você abrir a pasta `assets/`, não saberá o que é usado. Não há risco em apagar, porque **o Git guarda o histórico**: qualquer arquivo removido pode ser recuperado depois (por exemplo, `git show <commit>:assets/arrow.png`).

### 4. Manter as duas fotos por enquanto

`arthur.JPG` e `4e713b43-d59f-4b44-8cc5-8d373e287f49.jpg` também não são usadas hoje, mas são fotos suas e podem servir na seção "Sobre mim". Essa decisão é de conteúdo, então fica para a Etapa 06. Elas estão listadas no `CLAUDE.md` como fora de escopo até lá.

## Como funciona

### `.gitignore`

Cada linha é um padrão de nomes de arquivo que o Git deve ignorar, ou seja, arquivos que nunca aparecem em `git status` como "não rastreados" e não são adicionados por `git add .`.

```gitignore
.DS_Store      # arquivo do Finder, em qualquer pasta
._*            # arquivos "sombra" do macOS
.env*          # variáveis de ambiente e segredos
*.pem  *.key   # chaves privadas e certificados
```

Os padrões `*` funcionam como curinga: `*.pem` casa com qualquer arquivo que termine em `.pem`.

**Ponto importante: o `.gitignore` não "desrastreia" arquivos que já foram commitados.** Ele só impede que arquivos novos entrem. O `assets/.DS_Store` já está no repositório, então mesmo com a regra nova ele continua sendo rastreado até você rodar `git rm --cached assets/.DS_Store`. A opção `--cached` remove o arquivo só do índice do Git (o controle de versão), sem apagá-lo do seu disco.

Os padrões de segredos (`.env*`, `*.pem`, `*.key`, `*.p12`, `*.crt`) são uma proteção preventiva: hoje o site não tem segredos, mas a regra existe **antes** de qualquer arquivo desses ser criado.

### `CLAUDE.md`

Documento curto lido no início de cada sessão de trabalho. Registra o que só este projeto pode dizer: a arquitetura (3 idiomas × 2 páginas + um CSS compartilhado), a regra de que toda mudança precisa ser repetida nos três idiomas enquanto a duplicação existir, o que não pode ser mexido sem perguntar, a infraestrutura (GitHub Pages e, na época, o Formspree) e o status com o roteiro das etapas.

Na seção de infraestrutura há um problema conhecido registrado de propósito: o ID do formulário no Formspree não existe, então as mensagens do formulário de contato se perdem. Isso foi resolvido na Etapa 01, que decidiu **remover** o formulário em vez de consertá-lo (veja `step-01-remove-contact-form.md`). Vale guardar a ideia: o ID de um formulário Formspree **não é segredo**, porque precisa estar no HTML da página para funcionar.

### `README.md`

Segue o formato bilíngue padrão: um seletor de idioma no topo (`[English](#english) · [Português](#português)`), uma seção em inglês e outra em português com o mesmo conteúdo. Cada idioma tem uma âncora (`<a name="english"></a>`) para o seletor saltar até ela. O README explica o que é o site, a estrutura de pastas, como rodar localmente e como funciona o deploy.

Para rodar localmente, o site é estático e basta abrir o `index.html`. Para simular um servidor de verdade:

```bash
python3 -m http.server 8000
```

Isso usa o servidor HTTP embutido no Python e serve a pasta atual em `http://localhost:8000`. Ele é útil porque alguns comportamentos (como links relativos entre `./pt-br/` e `../`) se comportam como no site publicado, e não como quando se abre o arquivo direto.

Sobre o deploy: o GitHub Pages publica o site a partir do repositório. O README não diz qual branch é a publicada porque isso é uma configuração no painel do GitHub (Settings → Pages) e eu não consegui confirmar daqui. Vale você conferir lá.

### Remoção dos assets sem uso (comandos que você roda)

```bash
git rm assets/arrow.png assets/checkmark.png assets/education.png assets/email.png assets/experience.png assets/toggle.png
git rm --cached assets/.DS_Store
```

`git rm` apaga o arquivo do disco **e** registra a remoção para o próximo commit. É você quem executa os comandos que mudam o Git.

## Conexão com a próxima etapa

Com o repositório organizado e o roteiro registrado no `CLAUDE.md`, a **Etapa 01** resolve o problema mais urgente do site: o formulário de contato que descarta as mensagens. Na discussão entre as etapas, a decisão foi remover o formulário (em vez de consertá-lo com um novo ID no Formspree) e deixar a nova seção de contato para mais tarde.
