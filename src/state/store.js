const state = {
  currentPage: 1,
  itemsPerPage: 18,
  searchQuery: '', 
  selectedType: '', 
};

const listeners = [];

export const store = {
  getState: () => ({ ...state }),

  setState: (newState) => {
    Object.assign(state, newState);
    
    listeners.forEach(listener => listener(state));
  },

  subscribe: (listener) => {
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }
};