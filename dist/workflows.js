(() => {
  'use strict';
  const page = document.querySelector('.journey-page');
  if (!page || !('IntersectionObserver' in window)) return;
  const steps = [...page.querySelectorAll('[data-journey-step]')];
  const links = [...page.querySelectorAll('[data-journey-link]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setCurrent(id) {
    links.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  }
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-journey-visible'); reveal.unobserve(entry.target); }
    });
  }, {rootMargin: '0px 0px -5% 0px', threshold: .05});
  const current = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setCurrent(visible[0].target.id);
  }, {rootMargin: '-15% 0px -55% 0px', threshold: 0});
  steps.forEach(step => {reveal.observe(step); current.observe(step);});
  links.forEach(link => link.addEventListener('click', () => setCurrent(link.hash.slice(1))));
  const updateMotion = () => page.classList.toggle('journey-motion', !motion.matches);
  motion.addEventListener('change', updateMotion);
  updateMotion();
})();
