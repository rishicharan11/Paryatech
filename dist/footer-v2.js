/* An original, bounded sticker pool: gravity, pressure transfer, pointer stirring,
   and a fixed-count pour gesture inspired by Lusion's interactive particle footer. */
(() => {
  const board = document.querySelector('.sticker-board');
  if (!board) return;
  const elements = [...board.querySelectorAll('[data-sticker]')];
  const announcement = board.querySelector('[data-sticker-announcement]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const bodies = elements.map((element, index) => ({element,index,x:0,y:0,vx:0,vy:0,w:0,h:0,rx:0,ry:0,angle:0,omega:0,home:null}));
  let width=0,height=0,frame=0,lastTime=0,restTime=0,inView=false,active=null,selected=null,pointer=null,pouring=null,resizeFrame=0,layer=elements.length;
  board.classList.add('is-physics-ready');
  board.dataset.stickerCount=String(bodies.length);
  board.dataset.physicsState='paused';
  const name = body => body.element.querySelector('.sticker-label').textContent.trim();
  const held = body => active?.body===body || selected===body;
  const extent = body => ({x:Math.abs(Math.cos(body.angle))*body.w*.5325+Math.abs(Math.sin(body.angle))*body.h*.5325+3,y:Math.abs(Math.cos(body.angle))*body.h*.5325+Math.abs(Math.sin(body.angle))*body.w*.5325+3});
  function constrain(body, bounce=false) {
    const e=extent(body),left=e.x,right=Math.max(left,width-e.x),top=e.y+35,bottom=Math.max(top,height-e.y-3);
    if(body.x<left || body.x>right) {body.x=clamp(body.x,left,right);body.vx=bounce ? -body.vx*.28 : 0;body.omega*=.7;}
    if(body.y<top) {body.y=top;body.vy=bounce ? Math.abs(body.vy)*.2 : 0;}
    if(!pouring && body.y>bottom) {body.y=bottom;body.vy=bounce && body.vy>35 ? -body.vy*.18 : 0;body.vx*=.91;body.omega*=.8;}
  }
  function paint(body) {
    body.element.style.setProperty('--sticker-x',`${(body.x-body.w/2).toFixed(2)}px`);
    body.element.style.setProperty('--sticker-y',`${(body.y-body.h/2).toFixed(2)}px`);
    body.element.style.setProperty('--sticker-rotation',`${(body.angle*180/Math.PI).toFixed(2)}deg`);
  }
  function stop() {cancelAnimationFrame(frame);frame=0;lastTime=0;board.dataset.physicsState=inView?'resting':'paused';}
  function wake() {
    restTime=0;
    if(frame || reduced.matches || !inView || document.hidden) return;
    lastTime=0;board.dataset.physicsState='playing';frame=requestAnimationFrame(animate);
  }
  function layout() {
    width=board.clientWidth;height=board.clientHeight;
    const sample=elements[0],w=sample.offsetWidth,h=sample.offsetHeight;
    const columns=Math.max(2,Math.floor((width-12)/(w*.87)));
    const rows=Math.ceil(bodies.length/columns);
    const stepX=Math.min(w*.96,(width-w-16)/Math.max(1,columns-1));
    const stepY=h*.75;
    const left=(width-(columns-1)*stepX)/2;
    const bottom=height-h*.65-12;
    bodies.forEach((body,i) => {
      body.w=body.element.offsetWidth;body.h=body.element.offsetHeight;
      // Elliptical contacts follow the illustrated cutouts, ignoring transparent corners.
      body.rx=body.w*.405;body.ry=body.h*.405;
      const row=Math.floor(i/columns),col=i%columns;
      body.x=left+col*stepX+(row%2 ? w*.10 : -w*.025);
      body.y=bottom-(rows-1-row)*stepY;
      body.angle=([-7,5,-4,8,-6,3][i%6])*Math.PI/180;
      body.vx=body.vy=body.omega=0;constrain(body);
      body.home={x:body.x,y:body.y,angle:body.angle};paint(body);
    });
    wake();
  }
  function select(body) {
    selected?.element.classList.remove('is-selected');
    selected?.element.setAttribute('aria-pressed','false');
    selected=body;
    if(body) {body.vx=body.vy=body.omega=0;body.element.setAttribute('aria-pressed','true');body.element.classList.add('is-selected');body.element.style.zIndex=String(++layer);}
  }
  function release(cancelled=false) {
    if(!active) return;
    const drag=active;active=null;
    drag.body.element.classList.remove('is-dragging');
    if(cancelled) Object.assign(drag.body,drag.origin,{vx:0,vy:0,omega:0});
    else if(drag.dragging && !reduced.matches) {
      const freshness=Math.exp(-Math.max(0,performance.now()-drag.lastTime-40)/80);
      drag.body.vx=clamp(drag.vx*freshness,-1500,1500);drag.body.vy=clamp(drag.vy*freshness,-1500,1500);
      drag.body.omega=clamp(drag.vx*freshness*.0025,-2.2,2.2);
    }
    if(drag.body.element.hasPointerCapture(drag.pointerId)) drag.body.element.releasePointerCapture(drag.pointerId);
    if(drag.dragging) select(null);
    paint(drag.body);wake();
  }
  function endPour() {
    if(!pouring) return;
    const id=pouring.pointerId;pouring=null;board.classList.remove('is-pouring');
    if(board.hasPointerCapture(id)) board.releasePointerCapture(id);
    bodies.forEach(body => constrain(body));wake();
  }
  function emit(body, x, y) {
    body.x=x+(Math.random()-.5)*18;body.y=y+(Math.random()-.5)*8;
    body.vx=(Math.random()-.5)*260+(pointer?.vx||0)*.20;
    body.vy=-80-Math.random()*140;body.omega=(Math.random()-.5)*3;
    body.element.style.zIndex=String(++layer);constrain(body);
  }
  function collide(a,b,velocities) {
    if(a.y>height+a.h || b.y>height+b.h) return;
    let dx=b.x-a.x,dy=b.y-a.y;
    const rx=a.rx+b.rx,ry=a.ry+b.ry;
    if(Math.abs(dx)>=rx || Math.abs(dy)>=ry) return;
    if(Math.abs(dx)+Math.abs(dy)<.001) {dx=.02;dy=.01;}
    const distance=Math.sqrt(dx*dx/(rx*rx)+dy*dy/(ry*ry));
    if(distance>=1) return;
    let nx=dx/(rx*rx),ny=dy/(ry*ry),length=Math.hypot(nx,ny);
    nx/=length;ny/=length;
    const depth=(1-distance)/(length/distance);
    const ia=held(a)?0:1,ib=held(b)?0:1,total=ia+ib;
    if(!total) return;
    const correction=Math.max(0,depth-.08)*.78/total;
    a.x-=nx*correction*ia;a.y-=ny*correction*ia;
    b.x+=nx*correction*ib;b.y+=ny*correction*ib;
    if(!velocities) return;
    const rvx=b.vx-a.vx,rvy=b.vy-a.vy,normal=rvx*nx+rvy*ny;
    if(normal<0) {
      const impulse=-(1.15)*normal/total;
      a.vx-=nx*impulse*ia;a.vy-=ny*impulse*ia;b.vx+=nx*impulse*ib;b.vy+=ny*impulse*ib;
      const tangent=rvx*-ny+rvy*nx,friction=tangent*.04/total;
      a.vx+=-ny*friction*ia;a.vy+=nx*friction*ia;b.vx-=-ny*friction*ib;b.vy-=nx*friction*ib;
      a.omega=clamp(a.omega+tangent*.0012*ia,-2,2);b.omega=clamp(b.omega-tangent*.0012*ib,-2,2);
    }
  }
  function stir(body) {
    if(!pointer || pouring || held(body)) return;
    const speed=Math.hypot(pointer.vx,pointer.vy),radius=pointer.touch?38:clamp(width*.10,70,135)*clamp(speed/800,.22,1);
    const rx=body.rx+radius,ry=body.ry+radius;
    let dx=body.x-pointer.x,dy=body.y-pointer.y;
    const d=Math.sqrt(dx*dx/(rx*rx)+dy*dy/(ry*ry));
    if(d>=1) return;
    if(d<.001) {dx=0;dy=-1;}
    const angle=Math.atan2(dy/ry,dx/rx);
    body.x=pointer.x+Math.cos(angle)*rx;body.y=pointer.y+Math.sin(angle)*ry;
    // A moving circular collider transfers momentum through the entire pile.
    body.vx=clamp(pointer.vx*1.65+Math.cos(angle)*speed*.16,-1600,1600);
    body.vy=clamp(pointer.vy*1.65+Math.sin(angle)*speed*.16,-1400,1400);
    body.omega=clamp(body.omega+pointer.vx*.001,-2.3,2.3);
  }
  function step(dt) {
    if(pouring) {
      pouring.clock+=dt;
      while(pouring.clock>.065) {pouring.clock-=.065;emit(bodies[pouring.next++%bodies.length],pouring.x,pouring.y);}
    }
    bodies.forEach(body => {
      if(held(body)) return;
      body.vy+=780*dt;
      const damping=Math.exp(-.65*dt);body.vx*=damping;body.vy*=damping;body.omega*=Math.exp(-2*dt);
      body.x+=body.vx*dt;body.y+=body.vy*dt;
      body.angle=clamp(body.angle+body.omega*dt,-.48,.48);
      if(Math.abs(body.angle)>.47) body.omega*=-.3;
      if(pouring && body.y>height+body.h) emit(body,pouring.x,pouring.y);
      stir(body);constrain(body,true);
    });
    for(let pass=0;pass<5;pass++) {
      for(let i=0;i<bodies.length;i++) for(let j=i+1;j<bodies.length;j++) collide(bodies[i],bodies[j],pass===0);
      bodies.forEach(body => constrain(body));
    }
  }
  function animate(time) {
    frame=0;
    if(!inView || document.hidden || reduced.matches) {stop();return;}
    const dt=lastTime?Math.min((time-lastTime)/1000,.034):1/60;lastTime=time;
    const before=bodies.map(body=>[body.x,body.y]);
    const steps=Math.max(1,Math.ceil(dt/(1/120)));
    for(let i=0;i<steps;i++) step(dt/steps);
    let displacement=0;
    bodies.forEach((body,i) => {displacement+=Math.hypot(body.x-before[i][0],body.y-before[i][1]);paint(body);});
    if(pointer) {pointer.vx*=Math.exp(-dt*12);pointer.vy*=Math.exp(-dt*12);}
    restTime=displacement/bodies.length<.19 && !active && !pouring ? restTime+dt : 0;
    if(restTime>1.3) {bodies.forEach(body=>{body.vx=body.vy=body.omega=0;});stop();return;}
    frame=requestAnimationFrame(animate);
  }
  function updatePointer(event) {
    const rect=board.getBoundingClientRect(),now=performance.now(),x=event.clientX-rect.left,y=event.clientY-rect.top;
    const previous=pointer,dt=previous?Math.max(.008,(now-previous.time)/1000):1/60;
    pointer={x,y,vx:previous?clamp((x-previous.x)/dt,-1700,1700):0,vy:previous?clamp((y-previous.y)/dt,-1700,1700):0,time:now,touch:event.pointerType==='touch'};
    if(pouring) {pouring.x=x;pouring.y=y;}
  }
  bodies.forEach(body => {
    const el=body.element;el.setAttribute('aria-pressed','false');el.style.zIndex=String(body.index+1);
    el.addEventListener('dragstart',event=>event.preventDefault());
    el.addEventListener('pointerdown',event => {
      if(event.button!==0 || !event.isPrimary) return;
      endPour();release();
      const ready=event.pointerType!=='touch' || selected===body;
      select(body);
      if(!ready) return;
      const now=performance.now();
      active={body,pointerId:event.pointerId,x:event.clientX,y:event.clientY,origin:{x:body.x,y:body.y,angle:body.angle},lastX:event.clientX,lastY:event.clientY,lastTime:now,vx:0,vy:0,dragging:false};
      el.setPointerCapture(event.pointerId);
    });
    el.addEventListener('pointermove',event => {
      if(!active || active.body!==body || active.pointerId!==event.pointerId) return;
      const dx=event.clientX-active.x,dy=event.clientY-active.y;
      if(!active.dragging && Math.hypot(dx,dy)<4) return;
      active.dragging=true;el.classList.add('is-dragging');
      const now=performance.now(),dt=Math.max(.008,(now-active.lastTime)/1000);
      active.vx=(event.clientX-active.lastX)/dt;active.vy=(event.clientY-active.lastY)/dt;
      active.lastX=event.clientX;active.lastY=event.clientY;active.lastTime=now;
      body.vx=clamp(active.vx,-1500,1500);body.vy=clamp(active.vy,-1500,1500);
      body.x=active.origin.x+dx;body.y=active.origin.y+dy;constrain(body);paint(body);wake();
    });
    el.addEventListener('pointerup',()=>release());
    el.addEventListener('pointercancel',()=>release(true));
    el.addEventListener('lostpointercapture',()=>{if(active?.body===body)release(true);});
    el.addEventListener('keydown',event => {
      const arrows={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(event.key==='Escape') {
        event.preventDefault();release(true);endPour();select(null);pointer=null;
        Object.assign(body,body.home,{vx:0,vy:0,omega:0});constrain(body);paint(body);wake();
        announcement.textContent=`${name(body)} returned to the pile.`;
      } else if(arrows[event.key]) {
        event.preventDefault();select(body);const [dx,dy]=arrows[event.key],step=event.shiftKey?32:10;
        body.x+=dx*step;body.y+=dy*step;constrain(body);paint(body);wake();
      } else if(event.key==='Enter' || event.key===' ') {
        event.preventDefault();select(selected===body?null:body);wake();
      }
    });
    el.addEventListener('blur',()=>{if(selected===body && !active){select(null);wake();}});
  });
  board.addEventListener('pointermove',event => {
    if(reduced.matches || (!fine.matches && event.pointerType!=='touch')) return;
    if(event.pointerType==='touch' && !event.buttons) return;
    updatePointer(event);wake();
  },{passive:true});
  board.addEventListener('pointerleave',()=>{if(!pouring){pointer=null;wake();}});
  board.addEventListener('pointerdown',event => {
    if(event.target.closest('[data-sticker]')) return;
    if(selected) {
      const rect=board.getBoundingClientRect(),body=selected;
      body.x=event.clientX-rect.left;body.y=event.clientY-rect.top;body.vx=body.vy=body.omega=0;
      constrain(body);paint(body);select(null);pointer=null;announcement.textContent=`${name(body)} moved.`;wake();return;
    }
    if(event.button!==0 || !event.isPrimary || event.pointerType==='touch' || reduced.matches) return;
    updatePointer(event);pouring={pointerId:event.pointerId,x:pointer.x,y:pointer.y,clock:.065,next:0};
    board.setPointerCapture(event.pointerId);board.classList.add('is-pouring');wake();
  });
  board.addEventListener('pointerup',event=>{endPour();if(event.pointerType==='touch')pointer=null;});
  board.addEventListener('pointercancel',()=>{endPour();pointer=null;});
  board.addEventListener('lostpointercapture',()=>endPour());
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){endPour();pointer=null;}});
  document.querySelector('[data-reset-stickers]')?.addEventListener('click',()=>{
    release(true);endPour();pointer=null;select(null);stop();layer=bodies.length;
    bodies.forEach(body=>body.element.style.zIndex=String(body.index+1));layout();
    announcement.textContent=`All ${bodies.length} places are back in the world.`;
  });
  reduced.addEventListener('change',()=>{release(true);endPour();pointer=null;select(null);stop();layout();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){release();endPour();pointer=null;stop();}else wake();
  });
  window.addEventListener('blur',()=>{release();endPour();pointer=null;});
  const visibility=new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;
    if(inView)wake();else{release();endPour();pointer=null;stop();}
  },{rootMargin:'70px'});
  visibility.observe(board);
  const resize=new ResizeObserver(()=>{
    cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{
      if(width===board.clientWidth && height===board.clientHeight)return;
      release(true);endPour();pointer=null;select(null);stop();layout();
    });
  });
  resize.observe(board);layout();
})();
