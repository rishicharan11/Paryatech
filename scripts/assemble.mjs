import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root = new URL('../',import.meta.url);
const siteOrigin = new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4179')).origin;
const read = file => readFile(new URL(file,root),'utf8');
const escape = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const boot = `<script>try{const t=Number(sessionStorage.getItem('pt-navigation'));if(t&&Date.now()-t<15000){document.documentElement.classList.add('is-arriving');window.__ptArrivalSafety=setTimeout(()=>{document.documentElement.classList.remove('is-arriving');const o=document.querySelector('.page-transition');if(o)o.hidden=true},4000)}else sessionStorage.removeItem('pt-navigation')}catch{}</script>`;
const shared = {};
for(const name of ['header','announcement','transition','credits']) shared[name.toUpperCase()] = (await read(`src/partials/${name}.html`)).trim();
shared.NAVIGATION_BOOT = boot;
const footer = (await read('dist/footer-v2.html')).trim();
function normalize(html) {
  return html.replace(/\b(src|href|poster)="(assets\/[^"\n]+|(?:styles|site|sections|build-v3|workflow-v2|faq-v2|footer-v2|pricing)\.(?:css|js)|script\.js)"/g,(_,attribute,url)=>`${attribute}="/${url}"`)
    .replace(/<button\b([^>]*\bdata-demo\b[^>]*)>([\s\S]*?)<\/button>/g,(_,attributes,content)=>`<a href="/book-a-demo/"${attributes.replace(/\s+type="[^"]*"/g,'')}>${content}</a>`)
    .replace(/<link rel="icon"[^>]*>/,'<link rel="icon" href="/assets/brand-symbol.png" type="image/png">');
}
function replace(html,marker,value) {
  const token=`<!-- ${marker} -->`;
  if(!html.includes(token)) throw new Error(`Missing assembly marker: ${marker}`);
  return html.replace(token,value);
}
async function save(route,html) {
  const folder = new URL(`dist/${route}`,root);
  await mkdir(folder,{recursive:true});
  await writeFile(new URL('index.html',folder),normalize(html));
  console.log(`Assembled /${route}`);
}
let home = (await read('src/index.template.html')).replaceAll('{{ SITE_ORIGIN }}',escape(siteOrigin));
for(const [marker,file] of [['WORKFLOW_SECTION','workflow-v2.html'],['BUILD_SECTION','build-v3.html'],['PRICING_SECTION','pricing-section.html'],['FAQ_SECTION','faq-v2.html']]) home=replace(home,marker,(await read(`dist/${file}`)).trim());
home=replace(home,'FOOTER_SECTION',footer);
for(const [marker,value] of Object.entries(shared)) home=replace(home,marker,value);
home=home.replace('</head>','<link rel="preload" as="image" href="/assets/brand-symbol.png">\n</head>');
await save('',home);
const pages = [
  {route:'book-a-demo/',title:'Book a demo',description:'See how Paryatech brings your agency’s enquiries, conversations, itineraries and bookings together.',fragment:'book-a-demo.html',styles:['demo.css'],scripts:['demo.js']},
  {route:'pricing/',title:'Pricing',description:'Choose quarterly, half-yearly or yearly Paryatech pricing for your travel agency.',fragment:'pricing.html',styles:['pricing.css'],scripts:['pricing.js']},
  {route:'careers/',title:'Careers',description:'Help build thoughtful software for the people who bring the world within reach.',fragment:'careers.html',styles:['careers.css'],scripts:['careers.js']},
 ];
const journal = JSON.parse(await read('src/pages/blogs-manifest.json'));
const stories = journal.filter(entry => entry.route !== '/blogs/');
const padded = count => String(count).padStart(2,'0');
const arrow = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M9 39 39 9M10 9h29v29" stroke="currentColor" stroke-width="1.4"/></svg>';
const cards = stories.map((story,index) => {
  const title = story.title.replace(/ — Paryatech$/,'');
  const meta = `${story.topic} · ${story.readTime}`;
  return `<article class="journal-card" data-journal-card data-category="${escape(story.category)}" data-search="${escape(`${title} ${story.category} ${meta} ${story.description}`.toLocaleLowerCase())}"><a class="journal-card-link" href="${escape(story.route)}"><div class="journal-card-image"><img src="${escape(story.image)}" alt="${escape(story.alt)}" width="1200" height="780" ${index < 2 ? 'fetchpriority="high"' : 'loading="lazy"'}><span class="journal-card-index" aria-hidden="true">${padded(index+1)}</span><span class="journal-card-read">Read the story ${arrow}</span></div><div class="journal-card-meta"><span>${escape(meta)}</span><span>${escape(story.category)}</span></div><h2><span class="journal-title-arrow" aria-hidden="true">↗</span><span data-roll-title>${escape(title)}</span></h2><p>${escape(story.description)}</p></a></article>`;
}).join('\n');
for(const entry of journal) pages.push({...entry,route:entry.route.replace(/^\//,''),fragment:entry.fragment.replace(/^src\/pages\//,''),title:entry.title.replace(/ — Paryatech$/,'')});
for(const page of pages) {
  let content=(await read(`src/pages/${page.fragment}`)).trim();
  if(page.route === 'blogs/') {
    for(const [marker,value] of Object.entries({JOURNAL_CARDS:cards,STORY_COUNT:String(stories.length),STORY_COUNT_PADDED:padded(stories.length),GUIDE_COUNT_PADDED:padded(stories.filter(story=>story.category==='Guides').length),NOTE_COUNT_PADDED:padded(stories.filter(story=>story.category==='Product notes').length)})) content=content.replaceAll(`<!-- ${marker} -->`,value);
  }
  if(/<main\b/.test(content)) content=content.replace(/(<main\b[^>]*\bid=")[^"]+"/,'$1main"');
  else content=`<main id="main">${content}</main>`;
  const title=`${page.title} — Paryatech`;
  await save(page.route,`<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#115553"><title>${escape(title)}</title><meta name="description" content="${escape(page.description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${escape(siteOrigin)}/${page.route}"><link rel="icon" href="/assets/brand-symbol.png" type="image/png"><link rel="preload" href="/assets/fonts/zagma-book.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/neue-haas.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" as="image" href="/assets/brand-symbol.png"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/footer-v2.css">${page.styles.map(file=>`<link rel="stylesheet" href="/${file}">`).join('')}<link rel="stylesheet" href="/site.css"><script src="/site.js" defer></script>${page.scripts.map(file=>`<script src="/${file}" defer></script>`).join('')}<script src="/footer-v2.js" defer></script>${boot}</head>
<body class="page-standard" data-page="${page.route.split('/')[0]}">${shared.TRANSITION}<a class="skip-link" href="#main">Skip to content</a>${shared.ANNOUNCEMENT}${shared.HEADER}${content}${footer}${shared.CREDITS}</body></html>`);
}
await writeFile(new URL('dist/page-manifest.json',root),JSON.stringify(pages,null,2));
console.log(`Built ${pages.length+1} pages.`);
