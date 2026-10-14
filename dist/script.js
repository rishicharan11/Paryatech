(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width:767px)');
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.site-menu');
  const menuButton = document.querySelector('.menu-toggle');
  const hero = document.querySelector('.hero-timeline');
  const stage = document.querySelector('.hero-stage');
  const heroMedia = document.querySelector('.hero-media');
  const heroCopy = document.querySelector('.hero-copy');
  const video = document.querySelector('.hero-video');
  let menuOpen = false, manuallyOpened = false, scrollFrame = 0;
  const clamp = (x,lo=0,hi=1) => Math.max(lo,Math.min(hi,x));
  function toggleMenu(open, manual=false) {
    menuOpen = open; manuallyOpened = manual && open;
    menu.hidden = !open; header.classList.toggle('open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
    document.body.classList.toggle('menu-open',open && small.matches);
  }
  menuButton.addEventListener('click',()=>toggleMenu(!(menuOpen && manuallyOpened),true));
  header.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover) and (pointer:fine)').matches && !small.matches)toggleMenu(true)});
  header.addEventListener('mouseleave',()=>{if(!manuallyOpened && !small.matches)toggleMenu(false)});
  document.addEventListener('click',e=>{if(menuOpen && !header.contains(e.target))toggleMenu(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){toggleMenu(false);menuButton.focus()}});
  header.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  small.addEventListener('change',()=>toggleMenu(false));
  document.querySelector('.announcement-close').addEventListener('click',()=>{
    document.querySelector('.announcement').classList.add('dismissed');
    document.documentElement.style.setProperty('--banner-height','0px');
  });
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
    const total=document.documentElement.scrollHeight-innerHeight;
    document.querySelector('.reading-progress').style.transform=`scaleX(${clamp(sy/Math.max(total,1))})`;
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
  if(!reduced.matches){document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}

  const workflow=[
    {screenshot:'assets/product-queries.webp',alt:'Paryatech enquiry pipeline product preview',label:'Enquiry pipeline',image:'assets/media/forest.jpg',status:'Every enquiry, in view.'},
    {screenshot:'assets/product-customers.webp',alt:'Paryatech customer workspace product preview',label:'Customer context',image:'assets/media/coast.jpg',status:'A journey shaped around your client.'},
    {screenshot:'assets/product-home.webp',alt:'Paryatech agency overview product preview',label:'Agency overview',image:'assets/media/mountain.jpg',status:'Your team, ready for what’s next.'}
  ];
  const tabs=[...document.querySelectorAll('[data-workflow]')];let active=0,workflowVisible=false,autoTimer;
  function selectWorkflow(index,focus=false){
    active=(index+tabs.length)%tabs.length;
    tabs.forEach((tab,i)=>{const on=i===active;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!on});
    const data=workflow[active],image=document.querySelector('#workflow-screenshot');image.src=data.screenshot;image.alt=data.alt;
    document.querySelector('.window-toolbar>span').textContent='Paryatech / '+data.label;document.querySelector('.workflow-landscape').src=data.image;document.querySelector('#workflow-status').textContent=data.status;
    document.querySelector('.workflow-mobile-progress>span').style.transform=`translateX(${active*100}%)`;
    if(focus)tabs[active].focus();
  }
  function restartAuto(){clearInterval(autoTimer);if(small.matches&&!reduced.matches&&workflowVisible)autoTimer=setInterval(()=>selectWorkflow(active+1),5000)}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>{selectWorkflow(i);restartAuto()});tab.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:active+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1);selectWorkflow(next,true);restartAuto()}})});
  document.querySelector('[data-workflow-prev]').addEventListener('click',()=>{selectWorkflow(active-1);restartAuto()});document.querySelector('[data-workflow-next]').addEventListener('click',()=>{selectWorkflow(active+1);restartAuto()});
  new IntersectionObserver(entries=>{workflowVisible=entries[0].isIntersecting;restartAuto()},{threshold:.5}).observe(document.querySelector('.workflow-grid'));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(autoTimer);else restartAuto()});small.addEventListener('change',restartAuto);reduced.addEventListener('change',restartAuto);

  const featureData={
    inbox:{eyebrow:'Shared inbox',title:'One conversation.\nA whole team.',description:'WhatsApp and email belong in the same place. Give your team the context to pick up any conversation, without relying on one person’s phone.',points:['Assign conversations to the right teammate.','Add internal notes and keep context together.','Connect conversations to your enquiry pipeline.']},
    proposal:{eyebrow:'Proposals & agency websites',title:'Looks like you.\nWorks for you.',description:'Your agency’s logo, colours and font carry through to proposals, vouchers and a public website. Make every client touchpoint feel considered.',points:['Send interactive proposals clients can accept online.','Create branded package pages and your agency site.','Keep your identity consistent with one brand kit.']},
    automation:{eyebrow:'The automation spine',title:'A thoughtful nudge.\nRight on time.',description:'Let everyday follow-ups happen quietly in the background. Best-practice automations are ready from the start, and remain yours to pause, tune or reverse.',points:['Follow up on quiet enquiries and pending proposals.','Remind travellers about documents before a trip.','See each run in the log and stay in control.']}
  };
  let lastTrigger;
  function openDialog(dialog,trigger){const returnTarget=trigger?.closest('dialog')?lastTrigger:trigger;document.querySelectorAll('dialog[open]').forEach(d=>d.close());lastTrigger=returnTarget;dialog.showModal();document.body.style.overflow='hidden'}
  document.querySelectorAll('[data-demo]').forEach(btn=>btn.addEventListener('click',()=>{toggleMenu(false);openDialog(document.querySelector('#demo-dialog'),btn)}));
  document.querySelectorAll('[data-feature]').forEach(btn=>btn.addEventListener('click',()=>{const f=featureData[btn.dataset.feature];document.querySelector('#feature-dialog-eyebrow').textContent=f.eyebrow;document.querySelector('#feature-dialog-title').textContent=f.title;document.querySelector('#feature-dialog-title').style.whiteSpace='pre-line';document.querySelector('#feature-dialog-description').textContent=f.description;document.querySelector('#feature-dialog-points').replaceChildren(...f.points.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));openDialog(document.querySelector('#feature-dialog'),btn)}));
  document.querySelector('[data-credits]').addEventListener('click',e=>openDialog(document.querySelector('#credits-dialog'),e.currentTarget));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.querySelector('[data-close-dialog]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
    dialog.addEventListener('close',()=>{if(document.querySelector('dialog[open]'))return;document.body.style.overflow='';if(lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true})});
  });
  const footer=document.querySelector('.site-footer');
  footer.addEventListener('pointermove',e=>{if(reduced.matches||small.matches)return;const r=footer.getBoundingClientRect();footer.querySelector('.footer-field').style.setProperty('--pointer-x',`${(e.clientX-r.left-r.width/2)*.025}px`);footer.querySelector('.footer-field').style.setProperty('--pointer-y',`${(e.clientY-r.top-r.height/2)*.025}px`)});
  document.querySelector('#current-year').textContent=String(new Date().getFullYear());
})();
