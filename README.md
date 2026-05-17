# Pokedex

Aplicação para busca e visualização de Pokémons usando a PokéAPI. Projeto front-end construido com Vite e JavaScript puro (módulos ES).

## Funcionalidades
- Listagem de Pokémons com paginação
- Busca por nome
- Filtros por tipo
- Cards com informações básicas do Pokémon

## Stack utilizada

### Ferramentas
- Vite

### Linguagem e arquitetura
- JavaScript Vanilla (ES Modules)
- Arquitetura modular baseada em componentes

### Consumo de API
- Fetch API

### Estilização
- CSS modularizado

## Pré-requisitos
- Node.js (recomendado >= 16)
- npm ou yarn

## Como rodar (desenvolvimento)

Clone o repositório e execute os comandos abaixo:

```bash
git clone https://github.com/rayannesantos/pokedex

cd pokedex

npm install
npm run dev
```

O projeto ficará disponível no endereço exibido pelo Vite no terminal, normalmente:

```bash
http://localhost:3000
```

## Build para produção

```bash
npm run build
npm run preview
```

## Estrutura do projeto (principal)
- [pokedex/index.html](pokedex/index.html)
- [pokedex/src/main.js](pokedex/src/main.js)
- [pokedex/src/api/pokemonService.js](pokedex/src/api/pokemonService.js)
- [pokedex/src/components/pokemonList.js](pokedex/src/components/pokemonList.js)
- [pokedex/src/components/pokemonCard.js](pokedex/src/components/pokemonCard.js)
- [pokedex/src/components/searchBar.js](pokedex/src/components/searchBar.js)
- [pokedex/src/components/feedbackStates.js](pokedex/src/components/feedbackStates.js)
- [pokedex/src/components/typeFilter.js](pokedex/src/components/typerFilter.js)
- [pokedex/src/components/sidebar.js](pokedex/src/components/sidebar.js)
-  [pokedex/src/components/paginarion.js](pokedex/src/components/pagination.js)
- [pokedex/src/state/store.js](pokedex/src/state/store.js)

## Scripts úteis
- `npm run dev` — inicia servidor de desenvolvimento (Vite)
- `npm run build` — gera build de produção
- `npm run preview` — serve o build local para preview



