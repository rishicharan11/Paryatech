(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width:767px)');
  const hero = document.querySelector('.hero-timeline');
  const stage = document.querySelector('.hero-stage');
  const heroMedia = document.querySelector('.hero-media');
  const heroCopy = document.querySelector('.hero-copy');
  const video = document.querySelector('.hero-video');
  let scrollFrame = 0;
  const clamp = (x,lo=0,hi=1) => Math.max(lo,Math.min(hi,x));
  document.querySelector('.hero-scroll').addEventListener('click',()=>document.querySelector('#about').scrollIntoView({behavior:reduced.matches?'instant':'smooth'}));
  const videoToggle=document.querySelector('.video-toggle');
  function syncVideoControl(){const playing=!video.paused;videoToggle.setAttribute('aria-label',playing?'Pause background video':'Play background video');videoToggle.querySelector('span').textContent=playing?'Ⅱ':'▷';videoToggle.querySelector('.video-toggle-label').textContent=playing?'Pause film':'Play film'}
  videoToggle.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>{});else video.pause();syncVideoControl()});
  video.addEventListener('play',syncVideoControl);video.addEventListener('pause',syncVideoControl);
  if(reduced.matches){video.pause();videoToggle.hidden=true;}
  else video.play().catch(syncVideoControl);

  function renderScroll(){
    scrollFrame=0;
    const sy=window.scrollY;
    if(!reduced.matches){
      const heroProgress=clamp(sy/Math.max(hero.offsetHeight-stage.offsetHeight,1));
      const shrink=clamp((heroProgress-.12)/.76);
      const eased=shrink*shrink*(3-2*shrink);
      const size=small.matches?133:Math.max(133,innerWidth*.09236);
      const side=eased*(innerWidth-size)/2;
      const vertical=eased*(stage.offsetHeight-size)/2;
      heroMedia.style.clipPath=`inset(${vertical}px ${side}px round ${eased*14}px)`;
      heroCopy.style.opacity=String(1-clamp(heroProgress/.35));
      document.querySelector('.hero-scroll').style.opacity=String(1-clamp(heroProgress/.2));
      videoToggle.style.opacity=String(1-clamp(heroProgress/.2));
      document.querySelector('.hero-shade').style.opacity=String(1-eased*.85);
      const intro=document.querySelector('.introduction');const rect=intro.getBoundingClientRect();
      if(rect.top<innerHeight&&rect.bottom>0){
        const amount=(innerHeight/2-(rect.top+rect.height/2));
        document.querySelectorAll('[data-depth]').forEach(el=>el.style.transform=`translateY(${amount*Number(el.dataset.depth)}px)`);
      }
      document.querySelectorAll('[data-parallax]').forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.style.transform=`translateY(${(innerHeight/2-(r.top+r.height/2))*.075}px)`});
    }
  }
  function scheduleScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(renderScroll)}
  window.addEventListener('scroll',scheduleScroll,{passive:true});window.addEventListener('resize',scheduleScroll);renderScroll();
  reduced.addEventListener('change',()=>{if(reduced.matches){video.pause();videoToggle.hidden=true;heroCopy.style.opacity='1';heroMedia.style.clipPath='none'}else{videoToggle.hidden=false;video.play().catch(()=>{})}renderScroll()});
})();
