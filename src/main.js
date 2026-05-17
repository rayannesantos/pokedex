// importações de estilos
import '@styles/base/reset.css';
import '@styles/base/variables.css';
import '@styles/base/layout.css';

// importações de estilos dos componentes
import '@styles/components/search.css';
import '@styles/components/pokemonCard.css';
import '@styles/components/pagination.css';
import '@styles/components/feedbacks.css';
import '@styles/components/sidebar.css'; 
import '@styles/components/typeFilter.css';

// importações de funcionalidades
import { getPokemonList, getPokemonDetails, getAllPokemonMasterList, getPokemonByType } from '@api/pokemonService.js';
import { renderPokemonList } from '@components/pokemonList.js';
import { createPagination } from '@components/pagination.js';
import { createSearchBar } from '@components/searchBar.js';
import { createSidebar } from '@components/sidebar.js'; 
import { getLoadingState, getErrorState, getEmptyState } from '@components/feedbacksStates.js';
import { createTypeFilter } from '@components/typeFilter.js';
import { store } from '@state/store.js';

let currentAbortController = null;
const searchContainer = document.getElementById('search-container');
const gridContainer = document.getElementById('pokemon-grid');
const paginationContainer = document.getElementById('pagination-container');

getAllPokemonMasterList(); 

const searchBarNode = createSearchBar((searchTerm) => {
  store.setState({ searchQuery: searchTerm, currentPage: 1 });
});
searchContainer.appendChild(searchBarNode);

const typeFilterNode = createTypeFilter((selectedType) => {
  store.setState({ selectedType: selectedType, currentPage: 1 });
});

const filterSidebarNode = createSidebar({
  title: 'Filtros',
  triggerText: 'Filtros',
  triggerIcon: `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H18V2H0V0ZM4 5H14V7H4V5ZM7 10H11V12H7V10Z" fill="currentColor"/></svg>`,
  contentNodes: [typeFilterNode] 
});

searchContainer.appendChild(filterSidebarNode);

// --------------------------------------------------------
// FUNÇÕES AUXILIARES
// --------------------------------------------------------

async function determineUrlsToFetch({ searchQuery, selectedType, itemsPerPage, currentPage }, signal) {
  const offset = (currentPage - 1) * itemsPerPage;
  let baseList = [];

  if (selectedType) {
    baseList = await getPokemonByType(selectedType);
  } else if (searchQuery) {
    baseList = await getAllPokemonMasterList();
  }

  if (searchQuery || selectedType) {
    let filtered = baseList;

    if (searchQuery) {
      filtered = filtered.filter(p => p.name.includes(searchQuery));
    }
    
    const paginatedUrls = filtered.slice(offset, offset + itemsPerPage).map(p => p.url);
    
    return { 
      urls: paginatedUrls, 
      totalItems: filtered.length 
    };
  }
  
  const listData = await getPokemonList(itemsPerPage, offset, signal);
  return { 
    urls: listData.results.map(p => p.url), 
    totalItems: listData.count 
  };
}

async function fetchDetailedData(urls, signal) {
  const promises = urls.map(url => getPokemonDetails(url, signal));
  const settled = await Promise.allSettled(promises);
  return settled
    .filter(res => res.status === 'fulfilled' && res.value)
    .map(res => res.value);
}

function updateDOMWithResults(validPokemon, { currentPage, itemsPerPage }, totalItems) {
  renderPokemonList(gridContainer, validPokemon);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages > 1) {
    const paginationNode = createPagination(
      currentPage,
      totalPages, 
      (newPage) => store.setState({ currentPage: newPage })
    );
    paginationContainer.appendChild(paginationNode);
  }
}

// --------------------------------------------------------
// FUNÇÃO PRINCIPAL
// --------------------------------------------------------

async function loadPage() {
  const state = store.getState();

  currentAbortController?.abort();
  currentAbortController = new AbortController();
  const signal = currentAbortController.signal;

  gridContainer.replaceChildren(getLoadingState());
  paginationContainer.replaceChildren(); 

  try {
    const { urls, totalItems } = await determineUrlsToFetch(state, signal);

    if (urls.length === 0 && (state.searchQuery || state.selectedType)) {
      return gridContainer.replaceChildren(getEmptyState(state.searchQuery, state.selectedType));
    }

    const validPokemon = await fetchDetailedData(urls, signal);

    updateDOMWithResults(validPokemon, state, totalItems);

  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error('Falha na renderização:', error);
    gridContainer.replaceChildren(getErrorState()); 
  }
}

store.subscribe(loadPage);

loadPage();

window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 500); 
  }
});