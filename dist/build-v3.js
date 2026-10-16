(() => {
  'use strict';
  const section = document.querySelector('.build-v3');
  if (!section) return;
  const stage = section.querySelector('.build-stage');
  const canvas = section.querySelector('.build-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const chapters = [...section.querySelectorAll('[data-build-chapter]')];
  const buttons = [...section.querySelectorAll('[data-build-stop]')];
  const tooltip = section.querySelector('.build-tooltip');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 767px)');
  const stops = [.035, .48, .94];
  const labels = [
    ['Conversations', 'Your travellers', 'Your team'],
    ['Enquiries', 'Proposals', 'Package pages', 'Your website', 'Travellers'],
    ['Your triggers', 'Your timings', 'Your guidance']
  ];
  const hints = [
    ['WhatsApp and email, in one shared place.', 'Every enquiry, with its context.', 'Assign conversations. Keep everyone in the loop.'],
    ['A new enquiry starts the journey.', 'An interactive proposal, in your brand.', 'Package pages that feel like you.', 'Your agency website. One consistent identity.', 'Client context stays with the journey.'],
    ['A quiet enquiry. A pending proposal.', 'A thoughtful follow-up, at the right moment.', 'Pause, tune or reverse. You stay in control.']
  ];
  let width = 0, height = 0, ratio = 1, mode = '', active = 0, target = 0, progress = 0;
  let visible = false, raf = 0, last = 0, elapsed = 0, hover = -1;
  const pointer = { x: -1000, y: -1000, nx: 0, ny: 0, inside: false };
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = t => { t = clamp(t); return t * t * (3 - 2 * t); };
  const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const pointCount = 410;
  const dots = Array.from({ length: pointCount }, (_, i) => ({
    lane: i % 5, u: rnd(i + 1), d: rnd(i + 9), phase: rnd(i + 100) * Math.PI * 2
  }));
  let hitRegions = [];
  function activate(index) {
    active = index;
    chapters.forEach((chapter, i) => {
      chapter.classList.toggle('is-active', i === index);
      if (mode) {
        chapter.setAttribute('aria-hidden', String(i !== index));
        chapter.inert = i !== index;
      } else { chapter.removeAttribute('aria-hidden'); chapter.inert = false; }
    });
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    section.dataset.buildActive = ['connect', 'create', 'automate'][index];
  }
  function read() {
    if (mode !== 'scroll') return;
    const travel = Math.max(1, section.offsetHeight - stage.offsetHeight);
    target = clamp(-section.getBoundingClientRect().top / travel);
    wake();
  }
  function measure() {
    const next = reduced.matches ? '' : compact.matches ? 'manual' : 'scroll';
    if (mode !== next) {
      mode = next;
      section.classList.toggle('build-enhanced', mode === 'scroll');
      section.classList.toggle('build-manual', mode === 'manual');
      pointer.inside = false;
      tooltip.hidden = true;
    }
    const box = stage.getBoundingClientRect();
    width = box.width; height = box.height; ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    activate(active);
    read();
    progress = target;
    wake();
  }
  function fanPoint(group, strand, t, close = false) {
    const mobile = mode === 'manual';
    const sx = width * (mobile ? .1 : .055);
    const ex = width * (mobile ? .86 : .8);
    const short = !mobile && height < 760;
    const cy = height * (mobile ? .54 : short ? .65 : .58);
    const ys = mobile ? [.45, .54, .63] : short ? [.5, .65, .8] : [.39, .58, .77];
    const startY = height * ys[group] + (strand - 11) * (mobile ? 1.4 : 2.05);
    const startX = sx + (strand % 3) * (mobile ? 5 : 13);
    const ease = smooth(t);
    let x = mix(startX, ex, t);
    let y = mix(startY, cy, ease);
    const depth = (strand % 3 - 1) * 6 * Math.sin(t * Math.PI);
    x += pointer.nx * depth; y += pointer.ny * depth;
    if (close) y += Math.sin(t * Math.PI) * (group - 1) * height * .012;
    if (pointer.inside && !compact.matches) {
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      const pull = .68 * Math.pow(Math.max(0, 1 - distance / 180), 2);
      x = mix(x, pointer.x, pull); y = mix(y, pointer.y, pull);
    }
    return { x, y };
  }
  function drawFans(opacity, close) {
    if (opacity < .01) return;
    ctx.lineWidth = .65;
    const selected = hover >= 0 ? hover : -1;
    for (let group = 0; group < 3; group++) {
      const groupAlpha = selected < 0 || selected === group ? 1 : .22;
      for (let strand = 0; strand < 24; strand++) {
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const p = fanPoint(group, strand, i / 48, close);
          if (!i) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(17,85,83,${opacity * groupAlpha * (.08 + (strand % 3 === 0 ? .18 : .035))})`;
        ctx.stroke();
        const origin = fanPoint(group, strand, 0, close);
        ctx.fillStyle = `rgba(17,85,83,${opacity * groupAlpha * .6})`;
        ctx.fillRect(origin.x - .7, origin.y - .7, 1.4, 1.4);
        // Quiet cascading pulses arrive together at the single workspace node.
        const cycle = ((elapsed * .00016 - group * .085 - strand * .0025) % 1 + 1) % 1;
        if (cycle < .76) {
          const p = fanPoint(group, strand, clamp(cycle / .76), close);
          ctx.fillStyle = `rgba(17,85,83,${opacity * groupAlpha * .55})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    ctx.font = `${mode === 'manual' ? 9 : 11}px NeueHaas, Arial, sans-serif`;
    ctx.textBaseline = 'bottom';
    const phase = close ? 2 : 0;
    for (let group = 0; group < 3; group++) {
      const p = fanPoint(group, 23, 0, close);
      const cy = fanPoint(group, 11, 0, close).y;
      const ly = cy - (mode === 'manual' ? 25 : 37);
      ctx.fillStyle = `rgba(17,85,83,${opacity * (selected < 0 || selected === group ? .85 : .28)})`;
      ctx.fillText(labels[phase][group], p.x, ly);
      hitRegions.push({ x: p.x, y: cy, r: mode === 'manual' ? 20 : 58, index: group });
    }
    const end = fanPoint(1, 12, 1, close);
    const pulse = Math.max(0, Math.sin(elapsed * .002));
    ctx.fillStyle = `rgba(17,85,83,${opacity * .045})`;
    ctx.beginPath(); ctx.arc(end.x, end.y, 8 + pulse * 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(17,85,83,${opacity})`;
    ctx.fillRect(end.x - 2.5, end.y - 2.5, 5, 5);
  }
  function drawDots(opacity, settle) {
    if (opacity < .01) return;
    const mobile = mode === 'manual';
    const x0 = width * (mobile ? .24 : .23), x1 = width * (mobile ? .92 : .79);
    const y0 = height * (mobile ? .43 : height < 760 ? .55 : .5), pitch = height * (mobile ? .045 : .058);
    ctx.font = `${mobile ? 8 : 10}px NeueHaas, Arial, sans-serif`;
    ctx.textBaseline = 'middle';
    for (let lane = 0; lane < 5; lane++) {
      const y = y0 + lane * pitch;
      ctx.fillStyle = `rgba(17,85,83,${opacity * (hover < 0 || hover === lane ? .85 : .3)})`;
      ctx.fillText(labels[1][lane], width * (mobile ? .07 : .055), y);
      hitRegions.push({ x: width * .08, y, r: pitch * .45, index: lane });
      ctx.strokeStyle = `rgba(17,85,83,${opacity * .09})`;
      ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();
    }
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const laneY = y0 + dot.lane * pitch;
      let x = mix(x0, x1, dot.u);
      let y = laneY + (dot.d - .5) * pitch * .48;
      const scatter = 1 - settle;
      x += Math.sin(dot.phase + elapsed * .00008) * width * .08 * scatter;
      y += Math.cos(dot.phase + dot.u * 5) * height * .12 * scatter;
      if (pointer.inside && !compact.matches) {
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        const pull = Math.pow(Math.max(0, 1 - distance / 135), 2) * .2;
        x = mix(x, pointer.x, pull); y = mix(y, pointer.y, pull);
      }
      const lit = (dot.u + elapsed * .000035 + dot.lane * .1) % 1 < .075;
      const emphasis = hover < 0 || hover === dot.lane ? 1 : .2;
      ctx.fillStyle = `rgba(17,85,83,${opacity * emphasis * (lit ? .9 : .18 + dot.d * .24)})`;
      ctx.beginPath(); ctx.arc(x, y, lit ? 1.5 : .8, 0, Math.PI * 2); ctx.fill();
    }
  }
  function draw() {
    ctx.clearRect(0, 0, width, height); hitRegions = [];
    if (!mode) return;
    const p = mode === 'manual' ? stops[active] : progress;
    const a = 1 - smooth((p - .22) / .13);
    const c = smooth((p - .69) / .14);
    const b = Math.min(smooth((p - .22) / .13), 1 - smooth((p - .69) / .14));
    ctx.save();
    ctx.translate(-width * .22 * smooth((p - .16) / .2), 0);
    drawFans(a, false);
    ctx.restore();
    drawDots(b, smooth((p - .3) / .16));
    drawFans(c, true);
    const idx = p < .285 ? 0 : p < .755 ? 1 : 2;
    if (mode === 'scroll' && active !== idx) activate(idx);
  }
  function frame(now) {
    raf = 0;
    if (!mode || !visible) { last = 0; return; }
    const dt = Math.min(50, now - (last || now)); last = now; elapsed += dt;
    progress = mix(progress, target, 1 - Math.pow(.001, dt / 1000));
    draw();
    raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf && visible && mode) raf = requestAnimationFrame(frame); }
  function select(index) {
    index = clamp(index, 0, 2);
    tooltip.hidden = true; hover = -1;
    if (mode === 'scroll') {
      const top = scrollY + section.getBoundingClientRect().top;
      const travel = section.offsetHeight - stage.offsetHeight;
      scrollTo({ top: top + travel * stops[index], behavior: 'smooth' });
    } else {
      activate(index); target = progress = stops[index]; draw();
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % 3;
      else if (event.key === 'ArrowLeft') next = (index + 2) % 3;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 2;
      else return;
      event.preventDefault(); buttons[next].focus({ preventScroll: true }); select(next);
    });
  });
  stage.addEventListener('pointermove', event => {
    if (mode !== 'scroll' || event.pointerType === 'touch') return;
    const r = stage.getBoundingClientRect();
    pointer.x = event.clientX - r.left; pointer.y = event.clientY - r.top;
    pointer.nx = (pointer.x / width - .5) * 2; pointer.ny = (pointer.y / height - .5) * 2;
    pointer.inside = true;
    const nearest = hitRegions.find(item => Math.hypot(item.x - pointer.x, item.y - pointer.y) < item.r);
    hover = nearest ? nearest.index : -1;
    if (hover >= 0) {
      tooltip.textContent = hints[active][hover] || '';
      tooltip.style.left = `${clamp(pointer.x + 18, 15, width - 230)}px`;
      tooltip.style.top = `${clamp(pointer.y - 40, 20, height - 70)}px`;
      tooltip.hidden = false;
    } else tooltip.hidden = true;
  });
  stage.addEventListener('pointerleave', () => {
    pointer.inside = false; pointer.nx = pointer.ny = 0; hover = -1; tooltip.hidden = true;
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) wake(); else { cancelAnimationFrame(raf); raf = 0; last = 0; }
  }, { rootMargin: '100px' });
  observer.observe(stage);
  addEventListener('scroll', read, { passive: true });
  addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; last = 0; } else wake();
  });
  reduced.addEventListener('change', measure); compact.addEventListener('change', measure);
  measure();
  document.fonts?.ready.then(() => { if (mode) draw(); });
})();
