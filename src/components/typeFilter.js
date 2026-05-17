import { pokemonTypeTranslations } from '@utils/translations.js';

export const createTypeFilter = (onTypeChange) => {
  const container = document.createElement('div');
  container.className = 'filter-group';

  let optionsHtml = '<option value="">Todos os tipos</option>';
  Object.entries(pokemonTypeTranslations).forEach(([englishKey, translatedName]) => {
    optionsHtml += `<option value="${englishKey}">${translatedName}</option>`;
  });

  container.innerHTML = `
    <label for="type-select" class="filter-label">Tipo de Pokémon</label>
    <select id="type-select" class="type-select">
      ${optionsHtml}
    </select>
  `;

  const select = container.querySelector('#type-select');

  select.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    onTypeChange(selectedValue);
  });

  return container;
};