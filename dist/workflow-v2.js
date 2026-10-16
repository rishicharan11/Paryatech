(() => {
  'use strict';
  const section = document.querySelector('.stage-section');
  if (!section) return;
  const track = section.querySelector('.stage-track');
  const sticky = section.querySelector('.stage-sticky');
  const copies = [...section.querySelectorAll('.stage-copy')];
  const cards = [...section.querySelectorAll('.stage-card')];
  const jumps = [...section.querySelectorAll('[data-stage-jump]')];
  const motion = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  // Real polar geometry: cards share one large circular path; they do not swap or crossfade.
  const spacing = 14 * Math.PI / 180;
  let frame = 0;
  let geometry;
  let position = 0;
  let active = -1;
  function measure() {
    const rect = track.getBoundingClientRect();
    const height = sticky.clientHeight;
    geometry = {
      start: rect.top + window.scrollY,
      distance: Math.max(1, track.offsetHeight - height),
      height,
      cardHeight: cards[0].offsetHeight,
      copyHeights: copies.map(copy => copy.offsetHeight)
    };
  }
  function toPosition(progress) {
    // Give each stage a readable moment at the beginning, middle and end.
    if (progress < .1) return 0;
    if (progress < .47) return (progress - .1) / .37;
    if (progress < .53) return 1;
    if (progress < .9) return 1 + (progress - .53) / .37;
    return 2;
  }
  function render() {
    frame = 0;
    if (!motion.matches) return;
    if (!geometry) measure();
    const progress = clamp((window.scrollY - geometry.start) / geometry.distance, 0, 1);
    position = toPosition(progress);
    const centerY = geometry.height * .49;
    const stride = Math.max(geometry.cardHeight + 78, geometry.height * .56);
    const radius = stride / Math.sin(spacing);
    copies.forEach((copy, index) => {
      const delta = index - position;
      const y = centerY - geometry.copyHeights[index] / 2 + delta * geometry.height * .77;
      copy.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
      copy.style.opacity = String(clamp(1 - Math.abs(delta) * .5, .2, 1));
    });
    cards.forEach((card, index) => {
      const delta = index - position;
      const angle = delta * spacing;
      card.style.setProperty('--stage-face-opacity', String(clamp(1 - Math.abs(delta) * 2.5, 0, 1)));
      const x = radius * (1 - Math.cos(angle));
      const y = centerY - geometry.cardHeight / 2 + radius * Math.sin(angle);
      card.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${-angle * 180 / Math.PI}deg)`;
    });
    const next = clamp(Math.round(position), 0, 2);
    if (active !== next) {
      active = next;
      jumps.forEach((button, index) => button.setAttribute('aria-pressed', String(index === active)));
    }
  }
  function queue() { if (!frame && motion.matches) frame = requestAnimationFrame(render); }
  function reset() {
    section.classList.toggle('stage-enhanced', motion.matches);
    geometry = null;
    if (!motion.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      [...cards, ...copies].forEach(element => { element.style.transform = ''; element.style.opacity = ''; element.style.removeProperty('--stage-face-opacity'); });
      return;
    }
    measure();
    queue();
  }
  jumps.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (!motion.matches) return;
      measure();
      const destination = [0, .5, 1][index];
      window.scrollTo({top: geometry.start + geometry.distance * destination, behavior: 'smooth'});
    });
    button.addEventListener('keydown', event => {
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : -1;
      if (next < 0) return;
      event.preventDefault();
      jumps[next].focus({preventScroll: true});
      jumps[next].click();
    });
  });
  window.addEventListener('scroll', queue, {passive: true});
  window.addEventListener('resize', reset, {passive: true});
  window.addEventListener('pageshow', reset);
  motion.addEventListener('change', reset);
  // Font metrics and upstream image dimensions can move the section after its first paint.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reset);
  window.addEventListener('load', reset, {once: true});
  reset();
})();
