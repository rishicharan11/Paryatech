(() => {
  const plans = {quarterly:{label:'Quarterly',amount:20000,months:3},'half-yearly':{label:'Half-yearly',amount:30000,months:6},yearly:{label:'Yearly',amount:50000,months:12}};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-pricing]').forEach(root => {
    const buttons=[...root.querySelectorAll('[data-plan]')],digits=root.querySelector('[data-price-digits]');let current='quarterly',animations=[];
    function display(amount,previous,animated){
      animations.forEach(a=>a.cancel());animations=[];
      const next=amount.toLocaleString('en-IN'),old=previous.toLocaleString('en-IN');digits.replaceChildren();
      [...next].forEach((character,index)=>{const slot=document.createElement('span');slot.className='pt-digit'+(character===','?' pt-digit-comma':'');const line=document.createElement('span');line.className='pt-digit-line';const end=document.createElement('span');end.textContent=character;
        if(animated&&old[index]!==character&&character!==','){
          const start=document.createElement('span');start.textContent=old[index]||'0';const up=amount>previous;
          line.append(...(up?[start,end]:[end,start]));slot.append(line);digits.append(slot);
          const animation=line.animate([{transform:`translateY(${up?0:-1.2}em)`},{transform:`translateY(${up?-1.2:0}em)`}],{duration:680+index*30,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});animations.push(animation);animation.finished.then(()=>{line.replaceChildren(end);animation.cancel();}).catch(()=>{});
        }else{line.append(end);slot.append(line);digits.append(slot);}
      });
    }
    function choose(key,animate=true){const old=plans[current],plan=plans[key];current=key;buttons.forEach((button,index)=>{const selected=button.dataset.plan===key;button.setAttribute('aria-pressed',String(selected));if(selected)root.style.setProperty('--plan-index',index);});root.querySelector('[data-plan-heading]').textContent=plan.label;root.querySelector('[data-price-period]').textContent=`Total for ${plan.months} months`;root.querySelector('[data-price-announcement]').textContent=`${plan.label}: ₹${plan.amount.toLocaleString('en-IN')} total for ${plan.months} months.`;root.querySelector('[data-price-cta]').href=`/book-a-demo/?plan=${key}`;display(plan.amount,old.amount,animate&&!reduce.matches);}
    buttons.forEach((button,index)=>{button.addEventListener('click',()=>choose(button.dataset.plan));button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%buttons.length;if(event.key==='ArrowLeft')target=(index+buttons.length-1)%buttons.length;if(event.key==='Home')target=0;if(event.key==='End')target=buttons.length-1;if(target!==undefined){event.preventDefault();buttons[target].focus();choose(buttons[target].dataset.plan);}});});
    const requested=new URLSearchParams(location.search).get('plan');choose(plans[requested]?requested:'quarterly',false);
    reduce.addEventListener('change',()=>choose(current,false));
  });
})();
