(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width:767px)');
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.site-menu');
  const menuButton = document.querySelector('.menu-toggle');
  let menuOpen = false, manual = false;
  function toggleMenu(open, byClick = false) {
    if (!header || !menu || !menuButton) return;
    menuOpen = open; manual = byClick && open;
    menu.hidden = !open;
    header.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open && small.matches);
  }
  menuButton?.addEventListener('click', () => toggleMenu(!(menuOpen && manual), true));
  header?.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover) and (pointer:fine)').matches && !small.matches) toggleMenu(true); });
  header?.addEventListener('mouseleave', () => { if (!manual && !small.matches) toggleMenu(false); });
  document.addEventListener('click', event => { if (menuOpen && !header.contains(event.target)) toggleMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuOpen) { toggleMenu(false); menuButton.focus(); } });
  header?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  small.addEventListener('change', () => toggleMenu(false));
  document.querySelector('.announcement-close')?.addEventListener('click', () => {
    document.querySelector('.announcement').classList.add('dismissed');
    document.documentElement.style.setProperty('--banner-height', '0px');
  });
  function markCurrent() {
    menu?.querySelectorAll(':scope > a').forEach(link => {
      const url = new URL(link.href);
      const sectionMatch = url.pathname === '/blogs/' && location.pathname.startsWith('/blogs/');
      const current = sectionMatch || (url.pathname === location.pathname && (url.hash ? url.hash === location.hash : !(location.pathname === '/' && location.hash === '#features')));
      if (current) link.setAttribute('aria-current', url.hash ? 'location' : 'page'); else link.removeAttribute('aria-current');
    });
  }
  markCurrent(); addEventListener('hashchange', markCurrent);

  // The page remains usable as ordinary documents, including with JavaScript disabled.
  document.querySelectorAll('button[data-demo]').forEach(button => button.addEventListener('click', () => navigate('/book-a-demo/')));
  if (!reduced.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), {threshold: .1});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  const featureData = {
    inbox:{eyebrow:'Shared inbox',title:'One conversation.\nA whole team.',description:'WhatsApp and email belong in the same place. Give your team the context to pick up any conversation, without relying on one person’s phone.',points:['Assign conversations to the right teammate.','Add internal notes and keep context together.','Connect conversations to your enquiry pipeline.']},
    proposal:{eyebrow:'Proposals & agency websites',title:'Looks like you.\nWorks for you.',description:'Your agency’s logo, colours and font carry through to proposals, vouchers and a public website. Make every client touchpoint feel considered.',points:['Send interactive proposals clients can accept online.','Create branded package pages and your agency site.','Keep your identity consistent with one brand kit.']},
    automation:{eyebrow:'The automation spine',title:'A thoughtful nudge.\nRight on time.',description:'Let everyday follow-ups happen quietly in the background. Best-practice automations are ready from the start, and remain yours to pause, tune or reverse.',points:['Follow up on quiet enquiries and pending proposals.','Remind travellers about documents before a trip.','See each run in the log and stay in control.']}
  };
  let lastTrigger;
  function openDialog(dialog, trigger) {
    if (!dialog) return;
    lastTrigger = trigger;
    document.querySelectorAll('dialog[open]').forEach(item => item.close());
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }
  document.querySelectorAll('[data-feature]').forEach(button => button.addEventListener('click', () => {
    const feature = featureData[button.dataset.feature], dialog = document.querySelector('#feature-dialog');
    if (!feature || !dialog) return;
    dialog.querySelector('#feature-dialog-eyebrow').textContent = feature.eyebrow;
    const title = dialog.querySelector('#feature-dialog-title'); title.textContent = feature.title; title.style.whiteSpace = 'pre-line';
    dialog.querySelector('#feature-dialog-description').textContent = feature.description;
    dialog.querySelector('#feature-dialog-points').replaceChildren(...feature.points.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    openDialog(dialog, button);
  }));
  document.querySelectorAll('[data-credits]').forEach(button => button.addEventListener('click', () => openDialog(document.querySelector('#credits-dialog'), button)));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) { document.body.style.overflow = ''; lastTrigger?.focus({preventScroll:true}); } });
  });
  document.querySelectorAll('#current-year').forEach(element => element.textContent = String(new Date().getFullYear()));

  // A logo aperture closes over the old document and opens onto the next one.
  // The tab favicon remains the supplied brand symbol; the motion lives in-page.
  const overlay = document.querySelector('.page-transition');
  const canvas = overlay?.querySelector('canvas');
  const ctx = canvas?.getContext('2d');
  const aperturePaths = typeof Path2D === 'function' ? [...(overlay?.querySelectorAll('[data-transition-shape] path') || [])].map(path => new Path2D(path.getAttribute('d'))) : [];
  const label = overlay?.querySelector('.page-transition-label');
  const symbol = new Image(); symbol.src = '/assets/brand-symbol.png';
  let navigating = false, animation = 0;
  const expo = value => value <= 0 ? 0 : value >= 1 ? 1 : value < .5 ? Math.pow(2, 20 * value - 10) / 2 : (2 - Math.pow(2, -20 * value + 10)) / 2;
  function paint(fraction, direction) {
    if (!ctx) return;
    overlay.classList.add('has-canvas');
    const w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#E5E8E3'; ctx.fillRect(0,0,w,h);
    if (!symbol.complete || !symbol.naturalWidth) return;
    const base = Math.min(136, Math.max(72, w * .095));
    const diagonal = Math.hypot(w,h);
    const scale = 1 + fraction * diagonal / (base * .035) * 2;
    const iw = base * scale, ih = iw * symbol.naturalHeight / symbol.naturalWidth;
    ctx.save(); ctx.translate(w/2,h/2); ctx.rotate(direction * fraction);
    // At full expansion, an opaque part of the mark covers the viewport aperture.
    const x = -iw * (.5 + .075 * fraction), y = -ih * (.5 - .075 * fraction);
    ctx.globalCompositeOperation = 'destination-out';
    if (aperturePaths.length) {
      ctx.save(); ctx.translate(x,y); ctx.scale(iw/74,ih/66);
      aperturePaths.forEach(path => ctx.fill(path)); ctx.restore();
    } else ctx.drawImage(symbol,x,y,iw,ih);
    if (fraction < .06) { ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1 - fraction / .06; ctx.drawImage(symbol,x,y,iw,ih); }
    ctx.restore(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (label) label.style.opacity = String(Math.max(0, 1 - fraction * 8));
  }
  function animateTransition(opening) {
    return new Promise(resolve => {
      const start = performance.now();
      const tick = time => {
        const progress = Math.min(1, (time-start) / 1000);
        paint(expo(opening ? progress : 1-progress), opening ? 1 : -1);
        if (progress < 1) animation = requestAnimationFrame(tick); else resolve();
      };
      cancelAnimationFrame(animation); animation = requestAnimationFrame(tick);
    });
  }
  async function navigate(href) {
    if (navigating) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || reduced.matches || !ctx) { location.assign(url.href); return; }
    navigating = true; toggleMenu(false); document.documentElement.classList.add('is-navigating');
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    overlay.hidden = false;
    try { await Promise.race([symbol.decode(), new Promise(resolve => setTimeout(resolve,250))]); } catch {}
    await animateTransition(false);
    try { sessionStorage.setItem('pt-navigation', String(Date.now())); } catch {}
    location.assign(url.href);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    event.preventDefault(); navigate(url.href);
  });
  function clearTransition() {
    clearTimeout(window.__ptArrivalSafety);
    cancelAnimationFrame(animation); navigating = false;
    document.documentElement.classList.remove('is-arriving','is-navigating');
    if (overlay) overlay.hidden = true;
    try { sessionStorage.removeItem('pt-navigation'); } catch {}
  }
  async function arrive() {
    if (!document.documentElement.classList.contains('is-arriving') || reduced.matches || !ctx) { clearTransition(); return; }
    overlay.hidden = false;
    try { await Promise.race([symbol.decode(), new Promise(resolve => setTimeout(resolve,250))]); } catch {}
    paint(0,1); await animateTransition(true); clearTransition();
  }
  arrive();
  addEventListener('pageshow', event => { if (event.persisted) clearTransition(); });
  reduced.addEventListener('change', () => { if (reduced.matches && !navigating) clearTransition(); });
})();
