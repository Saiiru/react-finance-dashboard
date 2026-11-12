# Finance Dashboard — React

**Objetivo:** Estudar o desenho de uma interface para registrar entradas e saídas e acompanhar resumos financeiros.

**Estado:** Projeto de estudo React; testes não localizados no branch principal. Não é sistema bancário.

**Documentação técnica, origem e próximos passos:** [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md)

---

## Material original preservado

### DTMONEY

<p>
  Feito na trilha ignite de reactjs da rocketseat, um aplicativo simples de controle de finaças utilizando o basico do react.
</p>

<img align="right" src="./src/assets/Logo.svg" width="35%" alt="dt money">

## Tópicos

[Sobre o dt money](#sobre-o-dt-money)

[Tecnologias](#tecnologias)

[Instalação e uso](#instalação-e-uso)

[Licença](#licença)

<br>

## Sobre o dt money

O dt money é uma alternativa simples e eficaz para gerenciar suas finanças, permitindo o cadastro de entradas, saídas e a organização das mesmas em categorias.

<br>

<p align="center">
  <img src="./public/screenshot.png" alt="Página inicial">
</p>

## Tecnologias

Tecnologias e ferramentas utilizadas no desenvolvimento do projeto:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [MirageJS](https://miragejs.com/)
- [Axios](https://github.com/axios/axios)
- [Polished](https://polished.js.org/)

<br>

## Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git clone https://github.com/Saiiru/dtmoney.git


# Entre na pasta web com
cd dtmoney

# Instale as dependências
yarn

# Rode a aplicação
yarn start
```

<br>


## Licença
```
 * ------------------------------------------------------------
 * "THE BEERWARE LICENSE" (Revision 42):
 * Saiiru wrote this code. As long as you retain this
 * notice, you can do whatever you want with this stuff. If we
 * meet someday, and you think this stuff is worth it, you can
 * buy me a beer in return.
 * ------------------------------------------------------------
 ```








## Execução atual (Vite)

Node.js 20.19+ ou 22+ e npm. Dependências legadas do Create React App foram substituídas por Vite para permitir builds atuais.

```bash
npm ci
npm test
npm run build
npm run dev
```

O diretório de saída é **dist/**. Para hospedar na Vercel, importe o repositório com framework Vite, comando npm run build e saída dist. Nenhum endereço de deploy Vercel é declarado sem deploy verificado.


## Publicação como frontend estático

O repositório inclui `vercel.json` com build Vite e saída `dist/`.
O site é totalmente estático: não há backend em Vercel nem banco remoto a configurar.
Build local: `npm ci` (nos estudos React 17, `npm ci --legacy-peer-deps`), `npm test` quando existir e `npm run build`.
Uma URL de produção somente é anunciada após deploy e teste HTTP/navegador. Nenhuma transação real ou credencial deve ser inserida.


## Verificação do código em 12/11/2026

Node 24 · npm test: 5/5; Vite build; tsc --noEmit; Playwright 390/1280 e recarga mantendo registro

**Limitações:** Sem backend bancário; dados fictícios apenas no navegador; demonstração estática Vercel.



## Publicação GitHub Pages (alternativa a Vercel)

A página estática é construída com a base específica do repositório; o branch de publicação é `gh-pages`. O código e os testes permanecem na branch `main`.

1. Execute localmente `npm test` (quando disponível), `npm run build` e verifique no navegador.
2. Compile com `GITHUB_PAGES=true npm run build` e publique a pasta `dist` com uma ferramenta como `gh-pages` usando a autenticação GitHub autorizada.
3. Confira a resposta HTTP e as interações em `https://saiiru.github.io/react-finance-dashboard/`.

