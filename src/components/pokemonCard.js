import { pokemonTypeTranslations } from '@utils/translations.js';

export const createPokemonCard = (pokemon) => {
  const formattedId = `#${String(pokemon.id).padStart(4, '0')}`;
  const mainTypeEnglish = pokemon.types[0];
  const translatedType = pokemonTypeTranslations[mainTypeEnglish] || mainTypeEnglish;
  const article = document.createElement('article');
  
  article.className = 'pokemon-card';
  article.tabIndex = 0;
  article.setAttribute('aria-labelledby', `poke-name-${pokemon.id}`);

  article.innerHTML = `
    <header class="card-header">
      <span class="card-type type-${mainTypeEnglish}" aria-label="Tipo: ${translatedType} ">
        ${translatedType}
      </span>
      <span class="card-id" aria-label="Número na Pokédex: ${pokemon.id}">
        ${formattedId}
      </span>
    </header>
    
    <figure class="card-image-container img-loading-bg">
      <img 
        src="${pokemon.image}" 
        alt="Ilustração oficial do Pokémon ${pokemon.name}" 
        class="pokemon-image"
        width="143"
        height="143"
        loading="lazy" 
        decoding="async"
      />
    </figure>
    
    <footer class="card-name">
      <h2 id="poke-name-${pokemon.id}" style="margin: 0; font-size: inherit; font-weight: inherit;">
        ${pokemon.name}
      </h2>
    </footer>
  `;

  const imgElement = article.querySelector('.pokemon-image');
  const imgContainer = article.querySelector('.card-image-container');

  // Função que revela a imagem
  const showImage = () => {
    imgElement.classList.add('loaded'); 
    imgContainer.classList.remove('img-loading-bg'); 
  };

  // 2. TRUQUE DE PERFORMANCE: Se a imagem já estiver no cache do navegador, exibe na hora
  if (imgElement.complete) {
    showImage();
  } else {
    // Se ainda for baixar da internet, espera o evento 'load'
    imgElement.addEventListener('load', showImage);
  }

  return article;
};