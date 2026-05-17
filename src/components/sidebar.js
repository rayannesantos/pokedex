export const createSidebar = ({ title, triggerText, triggerIcon = '', contentNodes = [] }) => {
  const container = document.createElement('div');
  container.className = 'sidebar-wrapper';

  container.innerHTML = `
    <div class="sidebar-trigger-container">
      <button class="btn-sidebar-trigger" aria-label="Abrir ${title}">
        ${triggerIcon}
        ${triggerText}
      </button>
    </div>

    <div class="sidebar-overlay" aria-hidden="true"></div>

    <aside class="sidebar-panel" aria-label="${title}">
      <header class="sidebar-header">
        <h2>${title}</h2>
        <button class="btn-close-sidebar" aria-label="Fechar ${title}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </header>
      <div class="sidebar-content"></div>
    </aside>
  `;

  const btnOpen = container.querySelector('.btn-sidebar-trigger');
  const btnClose = container.querySelector('.btn-close-sidebar');
  const overlay = container.querySelector('.sidebar-overlay');
  const sidebar = container.querySelector('.sidebar-panel');
  const contentArea = container.querySelector('.sidebar-content');

  contentNodes.forEach(node => {
    contentArea.appendChild(node);
  });

  const openSidebar = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
  };

  btnOpen.addEventListener('click', openSidebar);
  btnClose.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  return container;
};