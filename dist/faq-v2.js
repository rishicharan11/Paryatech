(() => {
  'use strict';
  const section = document.querySelector('.faq-v2');
  if (!section || section.dataset.initialized) return;
  section.dataset.initialized = 'true';
  const rows = [...section.querySelectorAll('[data-faq-row]')];
  const list = section.querySelector('.faq-v2-list');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  let active = null;
  let pinned = null;
  let visible = true;
  let suppressFocusOpen = false;
  const pausedByUser = new WeakSet();
  section.classList.add('is-enhanced');

  function updatePlayback(row, shouldPlay) {
    const video = row.querySelector('video');
    const toggle = row.querySelector('.faq-v2-play');
    if (shouldPlay && !video.src) {
      video.src = video.dataset.src;
      video.load();
    }
    if (shouldPlay && visible && !document.hidden) {
      video.play().catch(() => { syncControl(); });
    } else video.pause();
    function syncControl() {
      toggle.setAttribute('aria-label', video.paused ? 'Play background film' : 'Pause background film');
      toggle.querySelector('span').textContent = video.paused ? '▶' : 'Ⅱ';
    }
    syncControl();
  }

  function select(next) {
    active = next;
    rows.forEach(row => {
      const open = row === next;
      row.classList.toggle('is-active', open);
      row.querySelector('.faq-v2-trigger').setAttribute('aria-expanded', String(open));
      const answer = row.querySelector('.faq-v2-answer');
      const film = row.querySelector('.faq-v2-film');
      answer.inert = !open;
      answer.setAttribute('aria-hidden', String(!open));
      film.inert = !open;
      film.setAttribute('aria-hidden', String(!open));
      row.querySelector('.faq-v2-play').tabIndex = open ? 0 : -1;
      updatePlayback(row, open && !reduce.matches && !pausedByUser.has(row));
    });
  }

  rows.forEach(row => {
    const trigger = row.querySelector('.faq-v2-trigger');
    const video = row.querySelector('video');
    const toggle = row.querySelector('.faq-v2-play');
    row.addEventListener('pointerenter', event => {
      if (fine.matches && event.pointerType !== 'touch') select(row);
    });
    trigger.addEventListener('focus', () => {
      if (!suppressFocusOpen) select(row);
    });
    trigger.addEventListener('click', () => {
      pinned = pinned === row ? null : row;
      select(pinned);
    });
    toggle.addEventListener('click', () => {
      if (video.paused) {
        pausedByUser.delete(row);
        updatePlayback(row, true);
      } else {
        pausedByUser.add(row);
        updatePlayback(row, false);
      }
    });
    ['play', 'pause'].forEach(type => video.addEventListener(type, () => {
      toggle.setAttribute('aria-label', video.paused ? 'Play background film' : 'Pause background film');
      toggle.querySelector('span').textContent = video.paused ? '▶' : 'Ⅱ';
    }));
    video.addEventListener('error', () => {
      // The poster and written answer remain usable if footage cannot load.
      toggle.hidden = true;
    });
  });
  list.addEventListener('pointerleave', () => {
    const focused = rows.find(row => row === active && row.contains(document.activeElement));
    select(focused || pinned);
  });
  list.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!list.contains(document.activeElement)) select(pinned);
    }, 0);
  });
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      const trigger = active.querySelector('.faq-v2-trigger');
      pinned = null;
      suppressFocusOpen = true;
      trigger.focus({preventScroll: true});
      select(null);
      suppressFocusOpen = false;
    }
  });
  function reconcilePlayback() {
    rows.forEach(row => updatePlayback(row, row === active && !reduce.matches && !pausedByUser.has(row)));
  }
  document.addEventListener('visibilitychange', reconcilePlayback);
  reduce.addEventListener('change', reconcilePlayback);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      reconcilePlayback();
    }, {threshold: 0}).observe(section);
  }
  select(null);
})();
