(() => {
  'use strict';
  const page = document.querySelector('.journal-page');
  if (!page || page.dataset.journalReady) return;
  page.dataset.journalReady = 'true';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const title = page.querySelector('[data-journal-title]');
  if (title && !reduced.matches) {
    const label = title.firstChild?.textContent || '';
    const word = document.createElement('span');
    word.className = 'journal-title-word';
    word.setAttribute('aria-hidden', 'true');
    [...label].forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'journal-title-char';
      span.style.setProperty('--journal-char-index', index);
      span.textContent = char === ' ' ? '\u00a0' : char;
      word.append(span);
    });
    title.firstChild.replaceWith(word);
  }
  const cards = [...page.querySelectorAll('[data-journal-card]')];
  title?.setAttribute('aria-label', `Blogs and news. ${cards.length} stories.`);
  const filters = [...page.querySelectorAll('[data-filter]')];
  const search = page.querySelector('[data-journal-search]');
  const status = page.querySelector('[data-journal-status]');
  const empty = page.querySelector('[data-journal-empty]');
  let activeFilter = 'all';
  const update = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const visible = (activeFilter === 'all' || card.dataset.category === activeFilter) && (!query || card.dataset.search.includes(query));
      card.hidden = !visible;
      if (visible) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
    if (empty) empty.hidden = count > 0;
    if (status) status.textContent = `${count} ${count === 1 ? 'story' : 'stories'} shown${query ? ` for “${search.value.trim()}”` : ''}.`;
  };
  filters.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; update(); }));
  search?.addEventListener('input', update);
  page.querySelector('[data-journal-clear]')?.addEventListener('click', () => {
    activeFilter = 'all';
    if (search) search.value = '';
    update();
    filters[0]?.focus();
  });
  const toolbar = page.querySelector('[data-journal-toolbar]');
  update();
  if (toolbar) toolbar.hidden = false;
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-journal-revealed');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    cards.forEach(card => observer.observe(card));
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced.matches) {
    cards.forEach(card => {
      const image = card.querySelector('.journal-card-image');
      if (!image) return;
      let frame = 0;
      let coordinates = null;
      const clear = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        coordinates = null;
        ['--journal-rx', '--journal-ry', '--journal-x', '--journal-y'].forEach(key => image.style.removeProperty(key));
      };
      card.addEventListener('pointermove', event => {
        coordinates = { x: event.clientX, y: event.clientY };
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!coordinates || reduced.matches) return clear();
          const bounds = image.getBoundingClientRect();
          const x = Math.max(-.5, Math.min(.5, (coordinates.x - bounds.left) / bounds.width - .5));
          const y = Math.max(-.5, Math.min(.5, (coordinates.y - bounds.top) / bounds.height - .5));
          image.style.setProperty('--journal-rx', `${-y * 3}deg`);
          image.style.setProperty('--journal-ry', `${x * 4}deg`);
          image.style.setProperty('--journal-x', `${x * 8}px`);
          image.style.setProperty('--journal-y', `${y * 7}px`);
        });
      });
      card.addEventListener('pointerleave', clear);
      reduced.addEventListener('change', clear);
    });
  }
})();
