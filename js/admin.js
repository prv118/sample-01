// ===== ADMIN DASHBOARD JS =====
'use strict';

// Auth guard
(function() {
  if (sessionStorage.getItem('ror_admin') !== 'true') {
    window.location.href = 'index.html';
  }
})();

// ===== DEFAULT DATA (inline fallback for file:// protocol) =====
const DEFAULT_DATA = {
  "site": {
    "restaurantName": "Royal of Royal", "tagline": "A Divine Culinary Journey Awaits",
    "subTagline": "Where every meal is a masterpiece of flavor and elegance",
    "phone": "+1 (800) 769-2567", "email": "reservations@royalofroyalrestaurant.com",
    "address": "123 Royal Avenue, Beverly Hills, CA 90210",
    "aboutText": "Nestled in the heart of Beverly Hills, Royal of Royal has been an icon of culinary excellence since 1998.",
    "aboutStory": "Founded by Viscount Theodore Ashworth III, Royal of Royal was born from a singular vision."
  },
  "menu": [
    { "id": 1, "category": "starters", "name": "Golden Caviar Blinis", "description": "Hand-select Ossetra caviar on warm buckwheat blinis with crème fraîche and chive oil", "price": "$85", "image": "images/starters.png", "badge": "Chef's Pick" },
    { "id": 2, "category": "starters", "name": "Seared Foie Gras", "description": "Pan-seared duck foie gras, caramelized fig, brioche, aged balsamic reduction", "price": "$68", "image": "images/starters.png", "badge": "" },
    { "id": 3, "category": "starters", "name": "Truffle Burrata", "description": "Fresh burrata with shaved black truffle, heirloom tomatoes, aged extra-virgin olive oil", "price": "$52", "image": "images/starters.png", "badge": "Seasonal" },
    { "id": 4, "category": "starters", "name": "Royal Lobster Bisque", "description": "Velvety Maine lobster bisque, tarragon cream, cognac, lobster medallion", "price": "$48", "image": "images/starters.png", "badge": "" },
    { "id": 5, "category": "main", "name": "A5 Wagyu Tenderloin", "description": "Japanese A5 Wagyu, truffle jus, roasted bone marrow butter, gold-dusted truffle fries", "price": "$220", "image": "images/main-course.png", "badge": "Signature" },
    { "id": 6, "category": "main", "name": "Atlantic Turbot Royale", "description": "Wild Atlantic turbot, champagne beurre blanc, sea vegetables, caviar butter sauce", "price": "$145", "image": "images/main-course.png", "badge": "" },
    { "id": 7, "category": "main", "name": "Royal Rack of Lamb", "description": "Frenched Colorado rack of lamb, pistachio crust, rosemary au jus, dauphinoise potato", "price": "$168", "image": "images/main-course.png", "badge": "" },
    { "id": 8, "category": "main", "name": "Black Truffle Risotto", "description": "Arborio risotto, aged Parmigiano-Reggiano, freshly shaved Périgord black truffle", "price": "$95", "image": "images/main-course.png", "badge": "Vegetarian" },
    { "id": 9, "category": "desserts", "name": "Chocolate Royal Dome", "description": "Dark chocolate sphere, warm salted caramel poured tableside, gold leaf, raspberry sorbet", "price": "$42", "image": "images/desserts.png", "badge": "Signature" },
    { "id": 10, "category": "desserts", "name": "Soufflé Grand Marnier", "description": "Classic French soufflé, orange liqueur, Tahitian vanilla crème anglaise (20 min)", "price": "$38", "image": "images/desserts.png", "badge": "" },
    { "id": 11, "category": "desserts", "name": "Mille-Feuille Royale", "description": "Caramelized puff pastry, Tahitian vanilla diplomat cream, gold-dusted berries", "price": "$35", "image": "images/desserts.png", "badge": "" },
    { "id": 12, "category": "drinks", "name": "Royal Champagne Ceremony", "description": "Dom Pérignon Vintage, sabered tableside with hand-engraved crystal flutes", "price": "$380", "image": "images/drinks.png", "badge": "Exclusive" },
    { "id": 13, "category": "drinks", "name": "Château Pétrus 2010", "description": "Legendary Pomerol Grand Vin, decanted by our master sommelier", "price": "$890", "image": "images/drinks.png", "badge": "Rare" },
    { "id": 14, "category": "drinks", "name": "Royal Crown Cocktail", "description": "Hennessy XO, 24-karat gold shimmer, elderflower, smoked rosemary sprig", "price": "$65", "image": "images/drinks.png", "badge": "House Special" },
    { "id": 15, "category": "drinks", "name": "Artisan Tea Collection", "description": "Rare single-origin teas from Darjeeling & Formosa, served in gold-rimmed bone china", "price": "$28", "image": "images/drinks.png", "badge": "" }
  ],
  "gallery": [
    { "id": 1, "src": "images/hero.png", "caption": "The Royal Dining Hall" },
    { "id": 2, "src": "images/gallery1.png", "caption": "Romantic Dining Experience" },
    { "id": 3, "src": "images/starters.png", "caption": "Golden Caviar Blinis" },
    { "id": 4, "src": "images/main-course.png", "caption": "A5 Wagyu Tenderloin" },
    { "id": 5, "src": "images/desserts.png", "caption": "Chocolate Royal Dome" },
    { "id": 6, "src": "images/drinks.png", "caption": "Royal Champagne Ceremony" }
  ],
  "testimonials": []
};

// ===== UTILS =====
function fixPath(p) {
  if (!p) return '';
  if (p.startsWith('http') || p.startsWith('data:')) return p;
  // Always strip leading ../ and / for consistent storage
  return p.replace(/^\.\.\//, '').replace(/^\//, '');
}

function displayPath(p) {
  if (!p) return '';
  if (p.startsWith('http') || p.startsWith('data:')) return p;
  // For admin display, prepend ../ if it's a local path
  return '../' + p.replace(/^\.\.\//, '').replace(/^\//, '');
}

// ===== DATA MANAGEMENT =====
async function loadContent() {
  const stored = localStorage.getItem('ror_content');
  if (stored) return JSON.parse(stored);
  try {
    const res = await fetch('../data/content.json');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('ror_content', JSON.stringify(data));
      return data;
    }
  } catch { /* fall through */ }
  const data = JSON.parse(JSON.stringify(DEFAULT_DATA));
  localStorage.setItem('ror_content', JSON.stringify(data));
  return data;
}

function saveContent(data) {
  localStorage.setItem('ror_content', JSON.stringify(data));
}

// ===== NAVIGATION =====
function navigateTo(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  const link = document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');
  const titleEl = document.getElementById('page-title');
  if (titleEl) {
    const titles = { overview:'Dashboard', menu:'Menu Items', gallery:'Gallery', content:'Site Content', reservations:'Reservations', security:'Security' };
    titleEl.textContent = titles[pageId] || 'Dashboard';
  }

  // Reload data for this page
  if (pageId === 'overview') loadOverview();
  if (pageId === 'menu') loadMenuAdmin();
  if (pageId === 'gallery') loadGalleryAdmin();
  if (pageId === 'content') loadContentEditor();
  if (pageId === 'reservations') loadReservationsAdmin();
}

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => navigateTo(link.dataset.page));
});

// ===== LOGOUT =====
document.getElementById('logout-btn')?.addEventListener('click', () => {
  sessionStorage.removeItem('ror_admin');
  window.location.href = 'index.html';
});

// ===== TOPBAR CLOCK =====
function updateClock() {
  const el = document.getElementById('topbar-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ===== TOAST =====
function adminToast(msg, type = 'success') {
  let t = document.querySelector('.toast-admin');
  if (!t) { t = document.createElement('div'); t.className = 'toast-admin'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast-admin ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== OVERVIEW =====
async function loadOverview() {
  const data = await loadContent();
  const reservations = JSON.parse(localStorage.getItem('ror_reservations') || '[]');
  document.getElementById('stat-menu').textContent = (data.menu || []).length;
  document.getElementById('stat-gallery').textContent = (data.gallery || []).length;
  document.getElementById('stat-reservations').textContent = reservations.length;
  document.getElementById('stat-pending').textContent = reservations.filter(r => r.status === 'pending').length;

  const container = document.getElementById('recent-reservations');
  if (!reservations.length) { 
    container.innerHTML = '<div class="empty-state"><i class="fas fa-calendar" style="display:block;margin-bottom:.5rem"></i>No reservations yet.</div>'; 
    return; 
  }
  const recent = [...reservations].reverse().slice(0, 5);
  container.innerHTML = `<table class="admin-table"><thead><tr><th>Name</th><th>Date</th><th>Status</th></tr></thead><tbody>
    ${recent.map(r => `<tr>
      <td>${r.name}</td>
      <td>${r.date}</td>
      <td><span class="badge badge-green">${r.status}</span></td>
    </tr>`).join('')}
  </tbody></table>`;
}

// ===== MENU CRUD =====
let menuData = [];
let editingMenuId = null;

async function loadMenuAdmin() {
  const data = await loadContent();
  menuData = data.menu || [];
  renderMenuTable();
}

function renderMenuTable() {
  const tbody = document.getElementById('menu-tbody');
  if (!tbody) return;
  if (!menuData.length) { tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No menu items yet.</td></tr>'; return; }
  tbody.innerHTML = menuData.map(item => `
    <tr>
      <td><img src="${displayPath(item.image)}" alt="${item.name}" onerror="this.src='../images/starters.png'"></td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge badge-gold">${item.category}</span></td>
      <td style="color:var(--gold);font-weight:700">${item.price}</td>
      <td>${item.badge ? `<span class="badge badge-gold">${item.badge}</span>` : '–'}</td>
      <td style="display:flex;gap:.5rem">
        <button class="btn-admin btn-outline" onclick="editMenuItem(${item.id})"><i class="fas fa-edit"></i></button>
        <button class="btn-admin btn-danger" onclick="deleteMenuItem(${item.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function openMenuModal(id) {
  editingMenuId = id || null;
  const modal = document.getElementById('menu-modal');
  const title = document.getElementById('menu-modal-title');
  if (id) {
    title.textContent = 'Edit Menu Item';
    const item = menuData.find(m => m.id === id);
    if (item) {
      document.getElementById('mi-name').value = item.name;
      document.getElementById('mi-category').value = item.category;
      document.getElementById('mi-price').value = item.price;
      document.getElementById('mi-desc').value = item.description || '';
      document.getElementById('mi-image').value = item.image || '';
      document.getElementById('mi-badge').value = item.badge || '';
    }
  } else {
    title.textContent = 'Add Menu Item';
    document.getElementById('menu-item-form').reset();
  }
  modal?.classList.add('open');
}

function closeMenuModal() {
  document.getElementById('menu-modal')?.classList.remove('open');
  editingMenuId = null;
}

async function saveMenuItem() {
  const name = document.getElementById('mi-name')?.value.trim();
  const category = document.getElementById('mi-category')?.value;
  const price = document.getElementById('mi-price')?.value.trim();
  if (!name || !category || !price) { adminToast('Please fill in required fields.', 'error'); return; }

  const data = await loadContent();
  const item = {
    id: editingMenuId || Date.now(),
    name, category, price,
    description: document.getElementById('mi-desc')?.value.trim() || '',
    image: fixPath(document.getElementById('mi-image')?.value.trim()) || 'images/starters.png',
    badge: document.getElementById('mi-badge')?.value.trim() || ''
  };

  if (editingMenuId) {
    const idx = data.menu.findIndex(m => m.id === editingMenuId);
    if (idx !== -1) data.menu[idx] = item;
  } else {
    data.menu.push(item);
  }
  saveContent(data);
  menuData = data.menu;
  renderMenuTable();
  closeMenuModal();
  adminToast(editingMenuId ? '✅ Menu item updated!' : '✅ Menu item added!');
}

window.editMenuItem = (id) => openMenuModal(id);
window.deleteMenuItem = async (id) => {
  if (!confirm('Delete this menu item?')) return;
  const data = await loadContent();
  data.menu = data.menu.filter(m => m.id !== id);
  saveContent(data);
  menuData = data.menu;
  renderMenuTable();
  adminToast('🗑️ Menu item deleted.');
};

// ===== GALLERY CRUD =====
let galleryData = [];
let editingGalleryId = null;

async function loadGalleryAdmin() {
  const data = await loadContent();
  galleryData = data.gallery || [];
  renderGalleryAdmin();
}

function renderGalleryAdmin() {
  const grid = document.getElementById('gallery-admin-grid');
  if (!grid) return;
  if (!galleryData.length) { grid.innerHTML = '<div class="empty-state">No gallery images yet.</div>'; return; }
  grid.innerHTML = galleryData.map(img => `
    <div style="background:var(--dark-4);border:var(--border);border-radius:6px;overflow:hidden">
      <img src="${displayPath(img.src)}" alt="${img.caption}" style="width:100%;height:160px;object-fit:cover" onerror="this.src='../images/gallery1.png'">
      <div style="padding:.75rem">
        <p style="font-size:.85rem;margin-bottom:.5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${img.caption}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
          <button class="btn-admin btn-outline" style="padding:.4rem" onclick="editGalleryItem(${img.id})"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-admin btn-danger" style="padding:.4rem" onclick="deleteGalleryItem(${img.id})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

function openGalleryModal(id) {
  editingGalleryId = id || null;
  const modal = document.getElementById('gallery-modal');
  const title = modal?.querySelector('h3');
  if (id) {
    if (title) title.textContent = 'Edit Image';
    const item = galleryData.find(g => g.id === id);
    if (item) {
      document.getElementById('gi-src').value = item.src;
      document.getElementById('gi-caption').value = item.caption;
    }
  } else {
    if (title) title.textContent = 'Add Gallery Image';
    document.getElementById('gallery-item-form').reset();
  }
  modal?.classList.add('open');
}

async function saveGalleryItem() {
  const src = document.getElementById('gi-src')?.value.trim();
  const caption = document.getElementById('gi-caption')?.value.trim() || 'Gallery Image';
  if (!src) { adminToast('Please enter an image path.', 'error'); return; }

  const data = await loadContent();
  const item = { id: editingGalleryId || Date.now(), src: fixPath(src), caption };

  if (editingGalleryId) {
    const idx = data.gallery.findIndex(g => g.id === editingGalleryId);
    if (idx !== -1) data.gallery[idx] = item;
  } else {
    data.gallery.push(item);
  }
  
  saveContent(data);
  galleryData = data.gallery;
  renderGalleryAdmin();
  document.getElementById('gallery-modal')?.classList.remove('open');
  adminToast(editingGalleryId ? '✅ Image updated!' : '✅ Image added!');
}

window.editGalleryItem = (id) => openGalleryModal(id);
window.deleteGalleryItem = async (id) => {
  if (!confirm('Remove this image from gallery?')) return;
  const data = await loadContent();
  data.gallery = data.gallery.filter(g => g.id !== id);
  saveContent(data);
  galleryData = data.gallery;
  renderGalleryAdmin();
  adminToast('🗑️ Image removed.');
};

// ===== CONTENT EDITOR =====
async function loadContentEditor() {
  const data = await loadContent();
  const s = data.site || {};
  document.getElementById('cf-name').value = s.restaurantName || '';
  document.getElementById('cf-tagline').value = s.tagline || '';
  document.getElementById('cf-subtagline').value = s.subTagline || '';
  document.getElementById('cf-phone').value = s.phone || '';
  document.getElementById('cf-email').value = s.email || '';
  document.getElementById('cf-address').value = s.address || '';
  document.getElementById('cf-about').value = s.aboutText || '';
  document.getElementById('cf-story').value = s.aboutStory || '';
}

document.getElementById('content-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = await loadContent();
  data.site.restaurantName = document.getElementById('cf-name').value.trim();
  data.site.tagline = document.getElementById('cf-tagline').value.trim();
  data.site.subTagline = document.getElementById('cf-subtagline').value.trim();
  data.site.phone = document.getElementById('cf-phone').value.trim();
  data.site.email = document.getElementById('cf-email').value.trim();
  data.site.address = document.getElementById('cf-address').value.trim();
  data.site.aboutText = document.getElementById('cf-about').value.trim();
  data.site.aboutStory = document.getElementById('cf-story').value.trim();
  saveContent(data);
  adminToast('✅ Site content updated!');
});

// ===== RESERVATIONS =====
function loadReservationsAdmin() {
  const res = JSON.parse(localStorage.getItem('ror_reservations') || '[]');
  const tbody = document.getElementById('reservations-tbody');
  if (!tbody) return;
  if (!res.length) { tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No reservations yet.</td></tr>'; return; }
  tbody.innerHTML = [...res].reverse().map(r => `
    <tr>
      <td>${r.name}</td><td>${r.email}</td><td>${r.date}</td><td>${r.time}</td><td>${r.guests}</td><td>${r.occasion || '–'}</td>
      <td><button class="btn-admin btn-danger" onclick="deleteReservation(${r.id})"><i class="fas fa-times"></i></button></td>
    </tr>`).join('');
}

window.deleteReservation = (id) => {
  let res = JSON.parse(localStorage.getItem('ror_reservations') || '[]');
  localStorage.setItem('ror_reservations', JSON.stringify(res.filter(r => r.id !== id)));
  loadReservationsAdmin();
  adminToast('🗑️ Reservation removed.');
};

window.clearReservations = () => {
  if (confirm('Clear ALL reservations?')) {
    localStorage.removeItem('ror_reservations');
    loadReservationsAdmin();
  }
};

// ===== PASSWORD CHANGE =====
async function sha256(msg) {
  const buf = new TextEncoder().encode(msg);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

document.getElementById('change-pass-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const curr = document.getElementById('curr-pass').value;
  const newP = document.getElementById('new-pass').value;
  const conf = document.getElementById('confirm-pass').value;
  if (newP.length < 6) { adminToast('Password too short.', 'error'); return; }
  if (newP !== conf) { adminToast('Passwords mismatch.', 'error'); return; }
  const currHash = await sha256(curr);
  const storedHash = localStorage.getItem('ror_admin_hash') || await sha256('prv111');
  if (currHash !== storedHash) { adminToast('Invalid current password.', 'error'); return; }
  localStorage.setItem('ror_admin_hash', await sha256(newP));
  document.getElementById('change-pass-form').reset();
  adminToast('✅ Password updated!');
});

// ===== MODALS =====
window.openMenuModal = openMenuModal;
window.closeMenuModal = closeMenuModal;
window.saveMenuItem = saveMenuItem;
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = () => document.getElementById('gallery-modal')?.classList.remove('open');
window.saveGalleryItem = saveGalleryItem;
window.navigateTo = navigateTo;

document.querySelectorAll('.modal-overlay').forEach(ov => ov.onclick = (e) => { if(e.target===ov) ov.classList.remove('open'); });

// ===== INIT =====
loadOverview();

