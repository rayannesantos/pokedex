import { pokemonTypeTranslations } from '@utils/translations.js';

export const getLoadingState = (count = 18) => { 
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('article');
    skeleton.className = 'skeleton-card';
    
    skeleton.innerHTML = `
      <div class="card-header" style="width: 100%; justify-content: space-between; display: flex;">
         <div class="skeleton-bone-text" style="width: 40px; margin: 0;"></div>
         <div class="skeleton-bone-text" style="width: 30px; margin: 0;"></div>
      </div>
      <div class="skeleton-bone-img"></div>
      <div class="skeleton-bone-text" style="width: 60%; margin: auto 0 0 0; height: 20px;"></div>
    `;
    
    fragment.appendChild(skeleton);
  }
  
  return fragment;
};

export const getErrorState = () => {
  const template = document.createElement('template');
  template.innerHTML = `
    <div
      class="feedback-state error-state"
      role="alert"
      aria-live="assertive"
    >
      <p>Não foi possível carregar os dados.</p>
    </div>
  `;
  return template.content.cloneNode(true);
};

export const getEmptyState = (searchTerm, selectedType) => {
  const template = document.createElement('template');
  
  let messageHtml = 'Nenhum Pokémon encontrado';
  
  const translatedType = selectedType 
    ? pokemonTypeTranslations[selectedType] || selectedType 
    : '';

  if (searchTerm && selectedType) {
    messageHtml += ` para "<strong class="term-highlight">${searchTerm}</strong>" do tipo <strong>${translatedType.toLowerCase()}</strong>.`;
  } else if (searchTerm) {
    messageHtml += ` para "<strong class="term-highlight">${searchTerm}</strong>".`;
  } else if (selectedType) {
    messageHtml += ` do tipo <strong>${translatedType.toLowerCase()}</strong>.`;
  } else {
    messageHtml += '.';
  }
  
  template.innerHTML = `
    <div class="feedback-state empty-state">
      <p>${messageHtml}</p>
    </div>
  `;

  return template.content.cloneNode(true);
};