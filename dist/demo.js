(() => {
  'use strict';
  const form = document.getElementById('demo-form');
  if (!form) return;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) form.closest('.demo-page').classList.add('demo-ready');
  const errorSummary = document.getElementById('demo-errors');
  const errorList = errorSummary.querySelector('ul');
  const fields = [...form.querySelectorAll('input[required]')];
  const plans = {
    quarterly: { label: 'Quarterly · ₹20,000', value: 'Quarterly — ₹20,000' },
    'half-yearly': { label: 'Half-yearly · ₹30,000', value: 'Half-yearly — ₹30,000' },
    yearly: { label: 'Yearly · ₹50,000', value: 'Yearly — ₹50,000' }
  };
  const plan = plans[new URLSearchParams(window.location.search).get('plan')];
  if (plan) {
    document.getElementById('demo-plan-note').hidden = false;
    document.getElementById('demo-plan-label').textContent = plan.label;
    const planInput = document.getElementById('demo-plan');
    planInput.value = plan.value;
    planInput.disabled = false;
  }
  // Progressive enhancement: the ordinary HTML form still works without JavaScript.
  form.noValidate = true;
  function validationMessage(field) {
    if (!field.value.trim()) return {
      'demo-name': 'Enter your name.',
      'demo-email': 'Enter your work email.',
      'demo-agency': 'Enter your agency name.'
    }[field.id];
    if (field.type === 'email' && field.validity.typeMismatch) return 'Enter a valid email address, like you@youragency.com.';
    return '';
  }
  function showFieldError(field, message) {
    const output = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    output.textContent = message;
    output.hidden = !message;
  }
  fields.forEach(field => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showFieldError(field, validationMessage(field));
    });
  });
  form.addEventListener('submit', event => {
    const invalid = [];
    errorList.replaceChildren();
    fields.forEach(field => {
      field.value = field.value.trim();
      const message = validationMessage(field);
      showFieldError(field, message);
      if (!message) return;
      invalid.push(field);
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = message;
      link.addEventListener('click', e => { e.preventDefault(); field.focus(); });
      item.append(link);
      errorList.append(item);
    });
    errorSummary.hidden = invalid.length === 0;
    if (invalid.length) {
      event.preventDefault();
      errorSummary.focus();
    }
    // Valid requests use the native form action and the real Cal.com booking flow.
    // We never claim that validation or navigation creates a booking.
  });
})();
