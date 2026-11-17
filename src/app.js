/**
 * Simulador estático educativo. No utiliza API, cookies, almacenamiento local
 * ni transmite información a ningún servidor.
 */
(() => {
  'use strict';

  const form = document.getElementById('booking-form');
  const dateInput = document.getElementById('appointment-date');
  const result = document.getElementById('booking-result');
  const summary = document.getElementById('booking-summary');
  const error = document.getElementById('form-error');

  if (!form || !dateInput || !result || !summary || !error) return;

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 45);
  dateInput.min = formatLocalDate(start);
  dateInput.max = formatLocalDate(end);

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    result.hidden = true;
  }

  form.addEventListener('input', () => {
    error.hidden = true;
    result.hidden = true;
  });

  form.addEventListener('change', () => {
    error.hidden = true;
    result.hidden = true;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.hidden = true;
    result.hidden = true;

    if (!form.reportValidity()) return;

    const [year, month, day] = dateInput.value.split('-').map(Number);
    const chosen = new Date(year, month - 1, day);
    const validDate = chosen.getFullYear() === year && chosen.getMonth() === month - 1 && chosen.getDate() === day;
    if (!validDate || chosen < start || chosen > end) {
      showError('Selecciona una fecha válida dentro de los próximos 45 días.');
      dateInput.focus();
      return;
    }
    if (chosen.getDay() === 0 || chosen.getDay() === 6) {
      showError('La agenda demostrativa solo permite fechas de lunes a viernes.');
      dateInput.focus();
      return;
    }

    const specialty = document.getElementById('specialty').value;
    const time = document.getElementById('appointment-time').value;
    const modality = document.getElementById('modality').value;
    const allowedSpecialties = ['Medicina general', 'Pediatría', 'Kinesiología'];
    const allowedTimes = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'];
    const allowedModalities = ['Presencial', 'Telemedicina'];
    if (!allowedSpecialties.includes(specialty) || !allowedTimes.includes(time) || !allowedModalities.includes(modality)) {
      showError('Revisa los datos del formulario e inténtalo nuevamente.');
      return;
    }

    const formatted = new Intl.DateTimeFormat('es-CL', {
      day: '2-digit', month: 'long', year: 'numeric'
    }).format(chosen);
    summary.textContent = `${specialty} · ${formatted} · ${time} h · ${modality}.`;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
