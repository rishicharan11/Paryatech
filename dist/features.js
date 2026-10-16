(() => {
  'use strict';
  const page = document.querySelector('.features-page');
  if (!page || page.dataset.featuresReady) return;
  page.dataset.featuresReady = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const group = page.querySelector('[data-fx-tabs]');
  const buttons = [...page.querySelectorAll('[data-fx-tab]')];
  const panels = [...page.querySelectorAll('[data-fx-panel]')];
  const select = (button, focus = false) => {
    buttons.forEach(item => {
      const current = item === button;
      item.setAttribute('aria-selected', String(current));
      item.tabIndex = current ? 0 : -1;
    });
    panels.forEach(panel => {
      const current = panel.dataset.fxPanel === button.dataset.fxTab;
      panel.hidden = !current;
      panel.classList.toggle('is-fx-current', current);
    });
    if (focus) button.focus({preventScroll: true});
  };
  if (group && buttons.length && panels.length) {
    group.setAttribute('role', 'tablist');
    buttons.forEach((button, index) => {
      const panel = panels.find(item => item.dataset.fxPanel === button.dataset.fxTab);
      if (!panel) return;
      button.id = `fx-tab-${button.dataset.fxTab}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', button.id);
      panel.tabIndex = 0;
      button.addEventListener('click', () => select(button));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(buttons[next], true);
      });
    });
    const requested = buttons.find(button => `#fx-${button.dataset.fxTab}` === location.hash);
    select(requested || buttons[0]);
    group.hidden = false;
  }
  const targets = [...page.querySelectorAll('[data-fx-reveal]')];
  let observer;
  const syncMotion = () => {
    observer?.disconnect();
    page.classList.toggle('has-fx-motion', !reduced.matches);
    if (reduced.matches || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-fx-visible'));
      return;
    }
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-fx-visible');
      observer.unobserve(entry.target);
    }), {threshold: .08});
    targets.forEach(target => observer.observe(target));
  };
  reduced.addEventListener('change', syncMotion);
  syncMotion();
})();
