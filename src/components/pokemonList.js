import { createPokemonCard } from '@components/pokemonCard.js';

export const renderPokemonList = (containerElement, pokemonArray) => {
  const fragment = document.createDocumentFragment();

  pokemonArray.forEach(pokemon => {
    const cardNode = createPokemonCard(pokemon);
    
    fragment.appendChild(cardNode);
  });

  containerElement.innerHTML = '';
  containerElement.replaceChildren(fragment);
};