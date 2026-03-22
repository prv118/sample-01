// ===== MENU PAGE JS =====
'use strict';

let allMenuItems = [];
let currentFilter = 'all';

function initMenuPage(data) {
  if (!data) return;
  allMenuItems = data.menu || [];
  renderMenuGrid(allMenuItems);
  initFilterTabs();
  // Check for hash filter
  const hash = location.hash.replace('#', '');
  if (hash && ['starters','main','desserts','drinks'].includes(hash)) {
    filterMenu(hash);
    document.querySelector(`.filter-tab[data-filter="${hash}"]`)?.classList.add('active');
    document.querySelectorAll('.filter-tab').forEach(t => {
      if (t.dataset.filter !== hash) t.classList.remove('active');
    });
  }
}

function renderMenuGrid(items) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  if (!items.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray)">No items found.</div>';
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="menu-card" data-category="${item.category}" data-animate>
      <img class="menu-card-img" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-card-footer">
          <span class="price-tag">${item.price}</span>
          ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  // Re-trigger animations
  setTimeout(() => {
    document.querySelectorAll('[data-animate]').forEach(el => {
      if (!el.classList.contains('animated')) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); observer.unobserve(e.target); }});
        }, { threshold: 0.1 });
        observer.observe(el);
      }
    });
  }, 50);
}

function filterMenu(category) {
  currentFilter = category;
  const cards = document.querySelectorAll('.menu-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterMenu(tab.dataset.filter);
    });
  });
}

window.filterMenu = filterMenu;
