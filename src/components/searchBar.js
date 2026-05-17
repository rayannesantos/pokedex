import { debounce } from '@utils/debounce.js';

export const createSearchBar = (onSearch) => {
  const form = document.createElement('form');
  form.className = 'search-form'; 
  form.setAttribute('role', 'search');
  
  form.addEventListener('submit', (e) => e.preventDefault());

  form.innerHTML = `
    <input 
      type="text" 
      id="search-input" 
      class="search-input" 
      placeholder="Faça uma busca pelo nome do pokémon" 
      aria-label="Buscar Pokémon por nome"
      autocomplete="off"
    />
    <button type="button" class="search-button" aria-label="Pesquisar">
      <img src="/icons/search-icon.svg" alt="" aria-hidden="true" />
    </button>
  `;

  const input = form.querySelector('#search-input');

  // Debounce para otimizar a busca, evitando chamadas a cada tecla pressionada
  const debouncedSearch = debounce((event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    onSearch(searchTerm);
  }, 500);

  input.addEventListener('input', debouncedSearch);

  return form;
};