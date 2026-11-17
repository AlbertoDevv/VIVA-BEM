# Relatório — VIVA_BEM

<!--Problema, cidadão, evidência e ODS-->

**Cidadão afetado:** pessoas que encontram dificuldade para organizar hábitos preventivos e acessar informações básicas de autocuidado.

**Problema:** AS PESSOAS NÃO TEM O DEVIDO CUIDADO COM A SAÚDE, TENDE A SÓ SE PREOCUPAR COM ISSO DEPOIS DE UMA CERTA IDADE, ONDE MUITAS DAS VEZES JA SÃO CASOS MAIS GRAVES E DIFICIL DE REVERTER.

**ODS:** ODS 3 — Saúde e Bem-Estar; ODS 10 — Redução das Desigualdades.

## 2. Solução e arquitetura

O VivaBem possui três páginas: `index.html` (apresentação), `orientacoes.html` (conteúdo educativo) e `painel.html` (registro e acompanhamento). O CSS está em `css/style.css` e as funcionalidades do painel em `js/script.js`.

O formulário cria registros com os campos: id, nome, categoria, data, status e observação. O JavaScript lê e grava os dados no `localStorage`, atualiza a lista e o resumo pelo DOM e registra operações no histórico.

## 3. Segurança e privacidade

1. **Entrada inválida:** validar campos obrigatórios, tamanho e formato com HTML5 e JavaScript.
2. **Conteúdo malicioso em campos:** inserir conteúdo do usuário com `textContent`, sem interpretar como HTML.
3. **Exposição de dados pessoais:** coletar somente informações necessárias, usar dados fictícios e orientar o usuário a não inserir dados sensíveis.

## 4. Validação e limitações

**Testes responsivos:** o site foi verificado nas resoluções de 375 px (celular), 768 px (tablet) e 1366 px (computador), apresentando funcionamento adequado nas três.

**Testes funcionais:**
- Adicionar registro: aprovado.
- Editar registro: aprovado.
- Remover registro: aprovado.
- Atualizar a página e verificar a persistência dos registros: aprovado.

**Limitações:** protótipo sem servidor, sem autenticação, sem atendimento profissional, sem sincronização entre dispositivos e sem garantia de segurança para dados sensíveis. O conteúdo é educativo e deve ser revisado com fontes confiáveis.

## 5. Sustentabilidade e impacto

A proposta poderá ser mantida por parcerias institucionais com organizações de saúde, clínicas, instituições comunitárias ou prefeituras, mantendo o acesso básico gratuito ao cidadão. A viabilidade precisa ser validada com potenciais parceiros e usuários.

## 6. Declaração de uso de IA e terceiros

Utilizei ChatGPT (OpenAI) para apoiar o planejamento, a criação da estrutura inicial, a programação e a revisão do protótipo a base do site, em sequencia revisei adaptei e fiz mudanças principalmente na parte estetica,  alguns codigos ja prontos do Bootstrap 5.3.3 utilizado por CDN oficial e uma parte do projeto integrador.
