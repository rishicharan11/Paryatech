(() => {
  const initialize = () => {
    const faqItems = [...document.querySelectorAll('.lower-faq')];
    faqItems.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        faqItems.forEach((other) => {
          if (other !== item && other.open) other.open = false;
        });
      });
    });

    const track = document.querySelector('.lower-carousel');
    if (!track) return;
    const cards = [...track.querySelectorAll('.lower-usecase')];
    const previous = document.querySelector('.lower-carousel-prev');
    const next = document.querySelector('.lower-carousel-next');
    const count = document.querySelector('.lower-carousel-count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentIndex = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const firstOffset = cards[0].offsetLeft;
      const position = track.scrollLeft;
      const offsets = cards.map((card) => card.offsetLeft - firstOffset);
      currentIndex = offsets.reduce((best, offset, index) => Math.abs(offset - position) < Math.abs(offsets[best] - position) ? index : best, 0);
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 3;
      previous.disabled = track.scrollLeft <= 3;
      next.disabled = atEnd;
      count.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    };
    const move = (direction) => {
      const positions = cards.map((card) => card.offsetLeft - cards[0].offsetLeft);
      const position = track.scrollLeft;
      const target = direction > 0
        ? positions.find((offset) => offset > position + 3) ?? positions[positions.length - 1]
        : positions.filter((offset) => offset < position - 3).at(-1) ?? 0;
      track.scrollTo({left:target, behavior:reducedMotion.matches ? 'instant' : 'smooth'});
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', () => {if (!frame) frame = requestAnimationFrame(update);}, {passive:true});
    track.addEventListener('keydown', (event) => {
      if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    });
    window.addEventListener('resize', () => {if (!frame) frame = requestAnimationFrame(update);}, {passive:true});
    update();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
})();
