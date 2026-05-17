const BASE_URL = 'https://pokeapi.co/api/v2';
const pokemonCache = new Map();
const listCache = new Map(); 

let allPokemonMasterList = null;


export const getAllPokemonMasterList = async () => {
  if (allPokemonMasterList) return allPokemonMasterList;

  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=10000`);
    if (!response.ok) throw new Error('Falha ao carregar a lista mestre.');
    
    const data = await response.json();
    allPokemonMasterList = data.results; 
    
    return allPokemonMasterList;
  } catch (error) {
    console.error('Erro na Master List:', error);
    return [];
  }
};

export const getPokemonList = async (limit = 18, offset = 0, signal) => {
  const cacheKey = `list-${limit}-${offset}`;

  if (listCache.has(cacheKey)) {
    return listCache.get(cacheKey);
  }

  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, { signal });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
    const data = await response.json();
    
    listCache.set(cacheKey, data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    console.error('Erro ao buscar a lista:', error);
    throw error;
  }
};

export const getPokemonDetails = async (urlOrName, signal) => {
  const fetchUrl = urlOrName.startsWith('http') 
    ? urlOrName 
    : `${BASE_URL}/pokemon/${urlOrName.toLowerCase()}`;

  if (pokemonCache.has(fetchUrl)) {
    return pokemonCache.get(fetchUrl);
  }

  try {
    const response = await fetch(fetchUrl, { signal });
    if (!response.ok) throw new Error(`Pokémon não encontrado: ${urlOrName}`);
    
    const data = await response.json();
    const pokemonData = {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      image: data.sprites.other['official-artwork'].front_default
    };

    pokemonCache.set(fetchUrl, pokemonData);
    return pokemonData;
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    console.error('Erro ao buscar detalhes:', error);
    return null;
  }
};

export const getPokemonByType = async (type) => {
  try {
    const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`);
    if (!response.ok) throw new Error(`Falha ao carregar o tipo ${type}`);
    
    const data = await response.json();
    
    return data.pokemon.map(p => p.pokemon); 
  } catch (error) {
    console.error('Erro ao buscar por tipo:', error);
    return [];
  }
};