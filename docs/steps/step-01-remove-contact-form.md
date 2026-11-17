# Etapa 01 — Remover o formulário de contato quebrado

## Objetivo

Tirar do site o formulário de contato, que não funcionava: ele enviava os dados para um endereço do Formspree (`formspree.io/f/xpzgwqkq`) que não existe mais, então toda mensagem enviada pelo site era perdida e quem escreveu nunca percebia. Esta etapa remove o bloco inteiro nas três versões (`index.html`, `pt-br/index.html` e `es/index.html`) e atualiza o `CLAUDE.md` e a documentação.

A etapa faz **só a remoção**. A nova seção de contato (e-mail, LinkedIn, GitHub e o currículo em PDF) fica para a Etapa 06.

## Decisões

### 1. Remover o formulário em vez de consertá-lo

| Opção | O que oferece | O que custa |
|---|---|---|
| Consertar com um novo formulário no Formspree | Mantém o visual atual e esconde o e-mail | Continua dependendo de um terceiro (já falhou uma vez), o plano gratuito tem limite de envios, atrai spam e o campo de telefone coleta um dado de que você não precisa |
| Trocar por um link `mailto:` dentro do formulário | Sem terceiros | Um formulário que só abre o e-mail é um botão disfarçado, mais código para o mesmo efeito |
| **Remover o formulário (escolhida)** | Some um ponto de falha, deixa o site mais direto, e quem recruta já usa LinkedIn e e-mail | O site fica sem área de contato até a Etapa 06 |

Ganha a remoção: quem contrata programador quase nunca preenche formulário, e o que existia já estava falhando em silêncio. Ficar temporariamente sem a seção é melhor do que ter uma que engole mensagens.

### 2. Separar "remover" de "construir a nova seção de contato"

São dois trabalhos diferentes. Remover é urgente, pequeno e não depende de nada. Construir a nova seção depende de várias coisas que ainda não existem:

| Etapa | Por que a nova seção não deve vir antes dela |
|---|---|
| 02 Arquitetura | Se as páginas passarem a ser geradas a partir de um modelo, a seção é escrita uma vez em vez de três |
| 03 HTML semântico | O botão "Resume" é hoje um `<button>`, e a Etapa 03 troca esse padrão por links `<a>`; fazer antes significaria refazer depois |
| 04 CSS e responsivo | O visual da seção depende da limpeza do CSS e do layout de celular, que está quebrado |
| 06 Conteúdo | É onde você decide o que comunicar; o e-mail público e o PDF do currículo também são definidos aí |

### 3. Deixar o CSS do formulário por enquanto

As regras de estilo do formulário (`.contact-*`, `.form-group`, `.submit-btn` no `style.css`) ficam sem uso depois da remoção. Elas **não** foram apagadas aqui, para manter a etapa pequena: o CSS será limpo por inteiro na Etapa 04, e apagar regras agora, sem a visão do arquivo todo, aumentaria o risco de apagar algo que ainda é usado.

Isso é uma dívida técnica conhecida e registrada, não um esquecimento.

## Como funciona

### O que foi apagado

Em cada `index.html`, o bloco do comentário `<!-- CONTACT -->` até o `</section>` correspondente:

```html
<!-- CONTACT -->
<section id="contact">
    <div class="contact-container">
        ...
        <form action="https://formspree.io/f/xpzgwqkq" method="POST" id="contactForm">
            ...
        </form>
    </div>
</section>
```

Depois da remoção, o rodapé (`<!-- FOOTER -->`) vem logo depois da seção "About me".

### Por que um formulário precisa de um servidor

Um site estático (só HTML e CSS) não consegue receber nem guardar dados: ele apenas **entrega** arquivos. Quando o visitante clica em "Send", o navegador faz uma requisição `POST` para o endereço do atributo `action`. Alguém do outro lado precisa receber esse `POST` e repassar a mensagem para você por e-mail. O Formspree era esse "alguém".

Como o endereço `xpzgwqkq` não existe, a resposta era um erro `404 Form not found`, e a mensagem se perdia. Esse é um tipo de falha silenciosa: o site não mostra erro nenhum, e por isso ficou no ar sem ninguém notar.

### `CLAUDE.md`

A seção **Infrastructure** deixou de listar o Formspree e passou a dizer que não há formulário nem serviço de terceiros. A seção **Status** agora marca a Etapa 00 como concluída e a Etapa 01 como a atual. A nova seção de contato com o currículo foi incluída na Etapa 06, junto com o conteúdo real do site, em vez de ganhar um número novo, para não renumerar o roteiro.

### `step-00-foundation.md`

Dois trechos prometiam que a Etapa 01 consertaria o formulário com um ID novo. Foram corrigidos para refletir a decisão real, porque um documento de estudo precisa continuar verdadeiro quando uma decisão muda.

## Conexão com a próxima etapa

Com o formulário fora do caminho, a **Etapa 02** trata do maior problema estrutural do projeto: as seis páginas HTML são cópias quase idênticas, então qualquer mudança (como esta, que foi feita três vezes) precisa ser repetida à mão. Nela você decide entre continuar com HTML puro, usar o Jekyll (que o GitHub Pages já suporta) ou o Eleventy, com os prós e contras de cada um.
