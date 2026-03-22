// ===== ROYAL OF ROYAL - MAIN JS =====
'use strict';

/* ---- Default Data (inline to avoid file:// CORS issues) ---- */
const DEFAULT_DATA = {
  "site": {
    "restaurantName": "Royal of Royal",
    "tagline": "A Divine Culinary Journey Awaits",
    "subTagline": "Where every meal is a masterpiece of flavor and elegance",
    "heroImage": "images/hero.png",
    "phone": "+1 (800) 769-2567",
    "email": "reservations@royalofroyalrestaurant.com",
    "address": "123 Royal Avenue, Beverly Hills, CA 90210",
    "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203583643!2d-118.4003563!3d34.0736208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly+Hills%2C+CA%2C+USA!5e0!3m2!1sen!2sus!4v1615999999999!5m2!1sen!2sus",
    "aboutText": "Nestled in the heart of Beverly Hills, Royal of Royal has been an icon of culinary excellence since 1998. Our Executive Chef brings over 30 years of Michelin-starred experience to craft dishes that transcend mere dining—they are works of art. Every ingredient is sourced from the world's finest purveyors, every wine selected by our master sommelier, every detail curated with passion and precision.",
    "aboutStory": "Founded by Viscount Theodore Ashworth III, Royal of Royal was born from a singular vision: to create a dining experience so extraordinary that guests would feel transported to another world. Two decades later, our three Michelin stars, four James Beard Awards, and the loyalty of discerning guests from over 80 countries stand as testament to that enduring commitment.",
    "social": { "instagram": "#", "facebook": "#", "twitter": "#", "youtube": "#" }
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
  "testimonials": [
    { "name": "Lady Catherine M.", "role": "Food Critic, The Gastronome", "text": "Royal of Royal is not merely a restaurant — it is a pilgrimage for the senses. The A5 Wagyu alone justifies the trip from London.", "stars": 5 },
    { "name": "James Harrington", "role": "Forbes Travel Guide", "text": "Three Michelin stars cannot fully capture what awaits here. The service is impeccably choreographed, the cuisine a revelation.", "stars": 5 },
    { "name": "Sofia Al-Rashid", "role": "International Gourmet Magazine", "text": "Every detail at Royal of Royal speaks of a profound respect for the guest. This is dining elevated to high art.", "stars": 5 }
  ]
};

/* ---- Data Loading ---- */
let siteData = null;
async function loadData() {
  try {
    const stored = localStorage.getItem('ror_content');
    if (stored) {
      siteData = JSON.parse(stored);
      return siteData;
    }
    // Try fetch first (works on web server)
    try {
      const res = await fetch('data/content.json');
      if (res.ok) {
        siteData = await res.json();
        localStorage.setItem('ror_content', JSON.stringify(siteData));
        return siteData;
      }
    } catch (fetchErr) { /* fall through to inline data */ }
    // Fallback: use inline default data (works with file:// protocol)
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    localStorage.setItem('ror_content', JSON.stringify(siteData));
    return siteData;
  } catch { return DEFAULT_DATA; }
}

/* ---- Navbar ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ---- Dark / Light Toggle ---- */
function initDarkMode() {
  const btn = document.querySelector('.dark-mode-btn');
  const iconEl = btn ? btn.querySelector('i') : null;
  const saved = localStorage.getItem('ror_theme') || 'dark';
  applyTheme(saved, iconEl);
  btn?.addEventListener('click', () => {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, iconEl);
    localStorage.setItem('ror_theme', next);
  });
}
function applyTheme(theme, iconEl) {
  document.body.classList.toggle('light-mode', theme === 'light');
  if (iconEl) {
    iconEl.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

/* ---- Scroll Animations (IntersectionObserver) ---- */
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* ---- Parallax Hero ---- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  }, { passive: true });
}

/* ---- Testimonials Slider ---- */
function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!track || !dots.length) return;
  let current = 0;
  const total = dots.length;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  goTo(0);

  // Auto-advance
  let autoTimer = setInterval(() => goTo(current + 1), 5000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  });
}

/* ---- Counter Animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('.experience-item .number');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ---- Toast ---- */
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ---- Populate Nav from data ---- */
function populateNav() {
  if (!siteData) return;
  const s = siteData.site;
  document.querySelectorAll('.nav-restaurant-name').forEach(el => el.textContent = s.restaurantName);
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initNavbar();
  initDarkMode();
  initScrollAnimations();
  initParallax();
  initTestimonials();
  initCounters();
  populateNav();

  // Page-specific inits
  if (typeof initMenuPage === 'function') initMenuPage(siteData);
  if (typeof initGalleryPage === 'function') initGalleryPage(siteData);
  if (typeof initContactPage === 'function') initContactPage(siteData);
  if (typeof initAboutPage === 'function') initAboutPage(siteData);
  if (typeof initHomePage === 'function') initHomePage(siteData);
});

window.showToast = showToast;
window.loadData = loadData;
window.getSiteData = () => siteData;
