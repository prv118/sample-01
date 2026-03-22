// ===== RESERVATION PAGE JS =====
'use strict';

function initContactPage(data) {
  if (data && data.site) {
    const s = data.site;
    // Set tomorrow as min date
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }
  }
  initReservationForm();
}

function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  form.addEventListener('submit', handleReservationSubmit);
}

function handleReservationSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Collect values
  const name = document.getElementById('res-name')?.value.trim();
  const email = document.getElementById('res-email')?.value.trim();
  const phone = document.getElementById('res-phone')?.value.trim();
  const guests = document.getElementById('res-guests')?.value;
  const date = document.getElementById('res-date')?.value;
  const time = document.getElementById('res-time')?.value;
  const occasion = document.getElementById('res-occasion')?.value;
  const requests = document.getElementById('res-requests')?.value.trim();

  // Validate
  if (!name) { showFieldError('res-name', 'Please enter your name'); return; }
  if (!email || !isValidEmail(email)) { showFieldError('res-email', 'Please enter a valid email'); return; }
  if (!guests) { showFieldError('res-guests', 'Please select number of guests'); return; }
  if (!date) { showFieldError('res-date', 'Please select a date'); return; }
  if (!time) { showFieldError('res-time', 'Please select a time'); return; }

  const reservation = {
    id: Date.now(),
    name, email, phone, guests, date, time, occasion, requests,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('ror_reservations') || '[]');
  existing.push(reservation);
  localStorage.setItem('ror_reservations', JSON.stringify(existing));

  // Show success
  form.style.display = 'none';
  const success = document.getElementById('form-success');
  if (success) success.style.display = 'block';

  if (window.showToast) window.showToast('🎉 Reservation confirmed! We\'ll be in touch soon.', 'success');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.style.borderColor = '#e53935';
  field.focus();
  field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
  if (window.showToast) window.showToast('⚠️ ' + message, 'error');
}

window.initContactPage = initContactPage;
