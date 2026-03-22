// ===== GALLERY PAGE JS =====
'use strict';

let galleryImages = [];
let currentLightboxIdx = 0;

function initGalleryPage(data) {
  if (!data) return;
  galleryImages = data.gallery || [];
  renderGallery(galleryImages);
  initLightbox();
}

function renderGallery(images) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = images.map((img, idx) => `
    <div class="gallery-item" data-idx="${idx}" data-animate>
      <img src="${img.src}" alt="${img.caption}" loading="lazy">
      <div class="gallery-item-overlay">
        <span>🔍</span>
        <p>${img.caption}</p>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.idx)));
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (!lightbox) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(idx) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !galleryImages.length) return;
  currentLightboxIdx = idx;
  updateLightboxContent();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentLightboxIdx = (currentLightboxIdx + dir + galleryImages.length) % galleryImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = galleryImages[currentLightboxIdx];
  const imgEl = document.getElementById('lightbox-img');
  const capEl = document.getElementById('lightbox-caption');
  if (imgEl) { imgEl.src = img.src; imgEl.alt = img.caption; }
  if (capEl) capEl.textContent = img.caption;
}

window.initGalleryPage = initGalleryPage;
