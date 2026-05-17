export const createPagination = (currentPage, totalPages, onPageChange) => {
  const nav = document.createElement('nav');
  nav.className = 'pagination';
  nav.setAttribute('aria-label', 'Navegação de páginas de Pokémon');

  let startPage = currentPage > 1 ? currentPage - 1 : 1;
  
  const pages = [startPage, startPage + 1, startPage + 2].filter(p => p <= totalPages);

  let html = `
    <button class="btn-nav btn-prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Página anterior">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1333 5.46672H0.799988M5.46665 0.800049L0.799988 5.46672L5.46665 10.1334" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Anterior
    </button>
    <div class="page-numbers">
  `;

  pages.forEach(page => {
    const isActive = page === currentPage;
    html += `
      <button 
        class="btn-page ${isActive ? 'active' : ''}" 
        data-page="${page}" 
        ${isActive ? 'aria-current="page"' : ''}
        aria-label="Ir para a página ${page}"
      >
        ${page}
      </button>
    `;
  });

  html += `
    </div>
    <button class="btn-nav btn-next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Próxima página">
      Próximo
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.799988 5.46672H10.1333M5.46665 10.1334L10.1333 5.46672L5.46665 0.800049" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </button>
  `;

  nav.innerHTML = html;

  const btnPrev = nav.querySelector('.btn-prev');
  const btnNext = nav.querySelector('.btn-next');
  const pageButtons = nav.querySelectorAll('.btn-page');

  if (currentPage > 1) {
    btnPrev.addEventListener('click', () => onPageChange(currentPage - 1));
  }

  if (currentPage < totalPages) {
    btnNext.addEventListener('click', () => onPageChange(currentPage + 1));
  }
  
  pageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pageClicked = parseInt(e.target.dataset.page, 10);
      if (pageClicked !== currentPage) {
        onPageChange(pageClicked);
      }
    });
  });

  return nav;
};