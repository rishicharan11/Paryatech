/* Native email and resource links remain available when JavaScript is off. */
(() => {
  const page=document.querySelector('.pt-community-page');
  if(!page || page.dataset.communityReady)return;
  page.dataset.communityReady='true';
  const group=page.querySelector('[data-community-filters]');
  const buttons=[...page.querySelectorAll('[data-community-filter]')];
  const resources=[...page.querySelectorAll('[data-community-resource]')];
  const status=page.querySelector('[data-community-resource-status]');
  if(!group || !buttons.length || !resources.length)return;
  function choose(category){
    let count=0;
    resources.forEach(resource=>{resource.hidden=category!=='all' && resource.dataset.communityResource!==category;if(!resource.hidden)count++;});
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.communityFilter===category)));
    if(status)status.textContent=`${count} ${count===1?'resource':'resources'} shown${category==='all'?'':` · ${category==='Guides'?'Practical guides':category==='Product'?'The product':category}`}.`;
  }
  buttons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.communityFilter)));
  choose('all');group.hidden=false;
})();
