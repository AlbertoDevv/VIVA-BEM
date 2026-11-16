# VivaBem

**Cuidar da saúde começa antes de ficar doente.**

O VivaBem é um protótipo acadêmico de tecnologia cidadã voltado à saúde preventiva e à organização de hábitos de autocuidado. A proposta é oferecer orientações gerais e permitir que o cidadão registre ações simples da própria rotina.

> O projeto é educativo. Não realiza diagnósticos, não recomenda tratamentos e não substitui profissionais ou serviços de saúde.

## Problema e público

O projeto parte da dificuldade que algumas pessoas encontram para organizar hábitos preventivos e localizar informações básicas e confiáveis sobre autocuidado. O público inicial são cidadãos que desejam acompanhar pequenas ações de bem-estar no cotidiano.

**Atenção:** a evidência pública ou observação que fundamentará o problema ainda deve ser pesquisada e incluída pelo estudante no relatório. Não apresentar esta descrição como resultado de entrevista.

## Objetivos de Desenvolvimento Sustentável

- **ODS 3 — Saúde e Bem-Estar:** promover informação e práticas preventivas.
- **ODS 10 — Redução das Desigualdades:** facilitar o acesso a conteúdos educativos.

## Funcionalidades

- Página inicial com apresentação do projeto.
- Página de orientações gerais.
- Painel para adicionar, listar, editar e excluir ações.
- Validação de campos no HTML5 e JavaScript.
- Histórico de operações com data e hora.
- Resumo dos registros por status.
- Armazenamento local no navegador com `localStorage`.

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid e media queries)
- JavaScript (DOM, eventos, arrays e `localStorage`)
- Bootstrap 5.3.3 via CDN
- Git e GitHub

## Como executar

1. Baixe ou clone o repositório.
2. Abra a pasta `VivaBem` no Visual Studio Code.
3. Execute `index.html` com a extensão Live Server (recomendado).
4. Navegue pelo menu e acesse **Meu painel** para testar o formulário.

É necessária conexão com a internet para carregar o Bootstrap pelo CDN.

## Estrutura de pastas

```text
VivaBem/
├── index.html
├── orientacoes.html
├── painel.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
└── README.md
```

## Modelo de dados

Cada ação registrada contém:

| Campo | Tipo | Descrição |
|---|---|---|
| id | texto | Identificador do registro |
| nome | texto | Nome da ação |
| categoria | texto | Categoria selecionada |
| data | data | Data da ação |
| status | texto | Em andamento ou Concluída |
| observacao | texto | Anotação opcional curta |

O histórico registra data/hora, tipo de operação e nome da ação.

## Privacidade e segurança

O formulário orienta o usuário a não inserir dados pessoais ou informações médicas. Os registros são guardados no `localStorage` do navegador e não são enviados a um servidor. O uso de `textContent` evita interpretar os dados digitados como HTML.

A versão acadêmica deve ser testada com dados fictícios. O armazenamento local não é indicado para informações sensíveis nem oferece sincronização entre dispositivos.

## Testes a realizar antes da entrega

- [ ] Celular: largura aproximada de 375 px.
- [ ] Tablet: largura aproximada de 768 px.
- [ ] Desktop: largura aproximada de 1366 px.
- [ ] Tentar enviar o formulário vazio.
- [ ] Testar nome com menos de 3 caracteres.
- [ ] Testar observação acima de 160 caracteres.
- [ ] Adicionar, editar e excluir um registro.
- [ ] Atualizar a página e conferir a persistência local.
- [ ] Conferir se os links entre as três páginas funcionam.

## Relatório

O relatório final deve documentar evidência do problema, ODS, arquitetura, modelo de dados, três ameaças e mitigações, testes, limitações, sustentabilidade do negócio de impacto e declaração de uso de IA.

## Uso de inteligência artificial e terceiros

A estrutura inicial e trechos de código deste protótipo foram elaborados com auxílio do ChatGPT (OpenAI), utilizado para planejamento, geração de uma base inicial e apoio à programação. O estudante deve revisar, adaptar, testar e compreender o código antes da entrega.

O Bootstrap é utilizado pela CDN oficial do projeto Bootstrap. Outras fontes, imagens ou trechos de terceiros adicionados posteriormente devem ser citados.
