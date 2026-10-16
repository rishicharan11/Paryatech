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
  let refreshMotion = () => {};
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
    refreshMotion();
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
  // Keep the document's native scrolling and apply inertia only to the media.
  // Stable card boxes are measured on layout changes, never in the animation loop.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const compact = window.matchMedia('(max-width: 600px)');
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const items = cards.map(card => ({
    card,
    image: card.querySelector('.journal-card-image'),
    top: 0, height: 0, side: 1,
    x: 0, y: 0, turn: 0, yaw: 0, inset: 0, parallax: 0,
    pointerX: 0, pointerY: 0, hoverX: 0, hoverY: 0,
    active: false
  })).filter(item => item.image);
  let frame = 0;
  let measureFrame = 0;
  let lastTime = 0;
  let easedScroll = window.scrollY;
  let viewport = window.innerHeight;
  let pointerItem = null;
  let paused = document.hidden;
  const wake = () => {
    if (!frame && !reduced.matches && !paused) frame = requestAnimationFrame(render);
  };
  const measure = () => {
    measureFrame = 0;
    viewport = window.innerHeight;
    let visibleIndex = 0;
    const scroll = window.scrollY;
    items.forEach(item => {
      if (item.card.hidden) return;
      const box = item.card.getBoundingClientRect();
      item.top = box.top + scroll;
      item.height = item.image.offsetHeight;
      item.side = compact.matches ? 1 : (visibleIndex++ % 2 ? 1 : -1);
    });
    wake();
  };
  refreshMotion = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    easedScroll = window.scrollY;
    page.classList.toggle('has-journal-motion', !reduced.matches);
    items.forEach(item => {
      item.card.classList.remove('is-journal-in-view');
      item.image.removeAttribute('style');
      item.x = item.y = item.turn = item.yaw = item.inset = item.parallax = 0;
      item.hoverX = item.hoverY = item.pointerX = item.pointerY = 0;
      item.active = false;
      if (reduced.matches) item.card.classList.add('is-journal-entered');
    });
    refreshMotion();
  };
  function render(time) {
    frame = 0;
    if (reduced.matches || paused) return;
    const dt = Math.min(50, lastTime ? time - lastTime : 16.67);
    lastTime = time;
    const blend = 1 - Math.exp(-dt / 110);
    const scroll = window.scrollY;
    easedScroll += (scroll - easedScroll) * blend;
    const lag = clamp(scroll - easedScroll, -100, 100);
    let moving = Math.abs(scroll - easedScroll) > .15;
    items.forEach(item => {
      if (item.card.hidden) return;
      const top = item.top - scroll;
      const visible = top < viewport + 180 && top + item.height > -180;
      if (!visible) {
        if (item.active) item.card.classList.remove('is-journal-in-view');
        item.active = false;
        return;
      }
      if (!item.active) item.card.classList.add('is-journal-in-view');
      item.active = true;
      // The pair opens from the centre as it crosses the lower viewport edge.
      // Past the reading position, only a light image drift continues.
      const entrance = clamp((top - viewport * .53) / (viewport * .52), 0, 1);
      const curve = entrance * entrance * (3 - 2 * entrance);
      const centre = clamp((top + item.height / 2 - viewport / 2) / ((viewport + item.height) / 2), -1, 1);
      const mobile = compact.matches;
      const focused = item.card.contains(document.activeElement);
      const target = {
        x: focused ? 0 : -item.side * curve * (mobile ? 9 : 32),
        y: focused ? 0 : curve * (mobile ? 24 : 55) + lag * (mobile ? .05 : .11),
        turn: focused ? 0 : item.side * (curve * (mobile ? 1 : 3.1) + lag * .008),
        yaw: focused ? 0 : -item.side * curve * (mobile ? 2 : 9),
        inset: focused ? 0 : curve * (mobile ? 1.8 : 4.2),
        parallax: focused ? 0 : centre * (mobile ? 9 : 22) - lag * .035,
        hoverX: finePointer.matches && pointerItem === item ? item.pointerX : 0,
        hoverY: finePointer.matches && pointerItem === item ? item.pointerY : 0
      };
      Object.keys(target).forEach(key => {
        item[key] += (target[key] - item[key]) * blend;
        if (Math.abs(target[key] - item[key]) > .025) moving = true;
      });
      const style = item.image.style;
      style.setProperty('--journal-enter-x', `${item.x.toFixed(2)}px`);
      style.setProperty('--journal-enter-y', `${item.y.toFixed(2)}px`);
      style.setProperty('--journal-turn', `${item.turn.toFixed(3)}deg`);
      style.setProperty('--journal-yaw', `${item.yaw.toFixed(3)}deg`);
      style.setProperty('--journal-inset', `${item.inset.toFixed(2)}%`);
      style.setProperty('--journal-parallax', `${item.parallax.toFixed(2)}px`);
      style.setProperty('--journal-rx', `${(-item.hoverY * 2.5).toFixed(3)}deg`);
      style.setProperty('--journal-ry', `${(item.hoverX * 3.5).toFixed(3)}deg`);
      style.setProperty('--journal-x', `${(item.hoverX * 12).toFixed(2)}px`);
      style.setProperty('--journal-y', `${(item.hoverY * 9).toFixed(2)}px`);
      if (top < viewport * .92) item.card.classList.add('is-journal-entered');
    });
    if (moving) wake();
    else lastTime = 0;
  }
  items.forEach(item => {
    item.card.addEventListener('pointermove', event => {
      if (!finePointer.matches || reduced.matches || event.pointerType === 'touch') return;
      pointerItem = item;
      const bounds = item.image.getBoundingClientRect();
      item.pointerX = clamp((event.clientX - bounds.left) / bounds.width - .5, -.5, .5);
      item.pointerY = clamp((event.clientY - bounds.top) / bounds.height - .5, -.5, .5);
      wake();
    }, { passive: true });
    item.card.addEventListener('pointerleave', () => { if (pointerItem === item) pointerItem = null; wake(); });
    item.card.addEventListener('focusin', () => { item.card.classList.add('is-journal-entered'); wake(); });
    item.card.addEventListener('focusout', wake);
  });
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', refreshMotion, { passive: true });
  window.addEventListener('pageshow', refreshMotion);
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (paused) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    else { easedScroll = window.scrollY; refreshMotion(); }
  });
  reduced.addEventListener('change', reset);
  compact.addEventListener('change', refreshMotion);
  if ('ResizeObserver' in window) new ResizeObserver(refreshMotion).observe(page.querySelector('.journal-grid'));
  document.fonts?.ready.then(refreshMotion);
  reset();
})();
