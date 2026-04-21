
(function(){
  const pageMode = document.body.dataset.pageMode || 'articles';
  const manifest = pageMode === 'news' ? (window.SysHelperNewsManifest || []) : (window.SysHelperArticleManifest || []);
  const isReader = document.body.dataset.pageType === 'reader';
  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => Array.from(p.querySelectorAll(s));
  function savedTheme(){ return localStorage.getItem('syshelper-theme') || 'dark'; }
  function applyTheme(theme){ document.documentElement.setAttribute('data-color-mode', theme); }
  function updateThemeButton(){ const btn = qs('#theme-toggle'); if(!btn) return; const dark=(document.documentElement.getAttribute('data-color-mode')||'dark')==='dark'; btn.innerHTML=dark?'<i class="fas fa-moon"></i><span>Тёмная</span>':'<i class="fas fa-sun"></i><span>Светлая</span>'; }
  function initTheme(){ applyTheme(savedTheme()); updateThemeButton(); qs('#theme-toggle')?.addEventListener('click',()=>{ const next=savedTheme()==='dark'?'light':'dark'; localStorage.setItem('syshelper-theme', next); applyTheme(next); updateThemeButton();}); }
  function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function formatDate(value){ if(!value) return ''; const d=new Date(value); return isNaN(d)?value:d.toLocaleDateString('ru-RU',{day:'2-digit',month:'long',year:'numeric'}); }
  function slugify(text=''){ return text.toLowerCase().trim().replace(/[`~!@#$%^&*()+=\[\]{}|\\:;"'<>,.?/]+/g,'').replace(/\s+/g,'-'); }
  function iconForCallout(type){ return { note:'fa-circle-info', tip:'fa-lightbulb', warning:'fa-triangle-exclamation', danger:'fa-skull-crossbones' }[type] || 'fa-circle-info'; }
  const state = { search:'', category:'Все', tag:'Все', sort:'date-desc' };
  function getCategories(){ return ['Все', ...new Set(manifest.map(i => i.category).filter(Boolean))]; }
  function getTags(){ return ['Все', ...new Set(manifest.flatMap(i => i.tags || []))]; }
  function filteredItems(){
    return manifest.filter(item => {
      const haystack=[item.title,item.description,item.category,...(item.tags||[])].join(' ').toLowerCase();
      const matchSearch=!state.search || haystack.includes(state.search);
      const matchCategory=state.category==='Все' || item.category===state.category;
      const matchTag=state.tag==='Все' || (item.tags||[]).includes(state.tag);
      return matchSearch && matchCategory && matchTag;
    }).sort((a,b)=>{
      if(state.sort==='date-asc') return String(a.updated).localeCompare(String(b.updated));
      if(state.sort==='views-desc') return (b.views||0)-(a.views||0);
      if(state.sort==='views-asc') return (a.views||0)-(b.views||0);
      return String(b.updated).localeCompare(String(a.updated));
    });
  }
  function renderChipRow(container, items, active, onSelect){ if(!container) return; container.innerHTML=items.map(v=>`<button class="chip ${v===active?'active':''}" data-value="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join(''); qsa('.chip', container).forEach(btn=>btn.addEventListener('click', ()=>onSelect(btn.dataset.value))); }
  function observeCards(){ const cards=qsa('.card, .feature-card'); if(!cards.length) return; const io=new IntersectionObserver(entries=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); } }); }, {threshold:.12}); cards.forEach(c=>io.observe(c)); }
  function openCard(item){ window.location.href=`view.html?id=${encodeURIComponent(item.id)}`; }
  function cardTemplate(item, index){
    const icon = pageMode==='news'?'fa-bolt':'fa-book-open';
    return `
      <article class="card" data-id="${escapeHtml(item.id)}" style="transition-delay:${Math.min(index*30,260)}ms">
        <div class="card-media">
          <div class="card-overlay-badge"><span class="card-badge"><i class="fas ${icon}"></i>${escapeHtml(item.category || (pageMode==='news'?'Новость':'Статья'))}</span></div>
          <img src="../${escapeHtml(item.cover || '')}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-meta"><span>${escapeHtml(formatDate(item.updated))}</span><span>${escapeHtml(item.author || 'SysHelper')}</span></div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description || '')}</p>
          <div class="card-metrics"><span class="metric"><i class="fas fa-eye"></i>${item.views || 0}</span><span class="metric"><i class="fas fa-folder-open"></i>${escapeHtml(item.category || '')}</span></div>
          <div class="card-tags">${(item.tags||[]).slice(0,4).map(tag=>`<span class="tag">#${escapeHtml(tag)}</span>`).join('')}</div>
          <div class="card-footer"><span class="muted">${pageMode==='news'?'Читать новость':'Читать статью'}</span><a class="read-link" href="view.html?id=${encodeURIComponent(item.id)}">Открыть <i class="fas fa-arrow-right"></i></a></div>
        </div>
      </article>`;
  }
  function renderCards(){
    const grid=qs('#cards-grid'); if(!grid) return;
    const items=filteredItems();
    const countNode=qs('#result-count'); if(countNode) countNode.textContent=`${items.length} ${pageMode==='news'?'новостей':'статей'}`;
    if(!items.length){ grid.innerHTML='<div class="empty-state">Ничего не найдено. Попробуй сменить фильтры или сортировку.</div>'; return; }
    grid.innerHTML=items.map(cardTemplate).join('');
    qsa('.card', grid).forEach(card=>{ const item=manifest.find(x=>x.id===card.dataset.id); if(item){ card.addEventListener('click', e=>{ if(e.target.closest('a')) return; openCard(item); }); }});
    observeCards();
  }
  function renderFeatured(){
    const host=qs('#featured-strip'); if(!host) return;
    const items=[...manifest].sort((a,b)=>(b.views||0)-(a.views||0));
    const first=items[0], second=items[1] || items[0];
    if(!first) return;
    host.innerHTML=`
      <article class="feature-card" data-id="${escapeHtml(first.id)}">
        <div class="content">
          <span class="card-badge"><i class="fas ${pageMode==='news'?'fa-fire':'fa-star'}"></i>${pageMode==='news'?'Главная новость':'Главная статья'}</span>
          <h3>${escapeHtml(first.title)}</h3>
          <p>${escapeHtml(first.description || '')}</p>
          <div class="card-metrics"><span class="metric"><i class="fas fa-eye"></i>${first.views || 0}</span><span class="metric"><i class="fas fa-calendar"></i>${escapeHtml(formatDate(first.updated))}</span></div>
          <div class="hero-actions"><a class="primary-btn" href="view.html?id=${encodeURIComponent(first.id)}">Открыть материал</a></div>
        </div>
        <img src="../${escapeHtml(first.cover || '')}" alt="${escapeHtml(first.title)}" loading="lazy">
      </article>
      <article class="feature-card compact" data-id="${escapeHtml(second.id)}">
        <div class="content">
          <span class="card-badge"><i class="fas fa-chart-line"></i>Популярное</span>
          <h3>${escapeHtml(second.title)}</h3>
          <p>${escapeHtml(second.description || '')}</p>
          <div class="card-metrics"><span class="metric"><i class="fas fa-eye"></i>${second.views || 0}</span></div>
        </div>
        <img src="../${escapeHtml(second.cover || '')}" alt="${escapeHtml(second.title)}" loading="lazy">
      </article>`;
    qsa('.feature-card', host).forEach(card=>{ const item=manifest.find(x=>x.id===card.dataset.id); if(item) card.addEventListener('click', ()=>openCard(item)); });
    observeCards();
  }
  function fillHero(){
    qs('#hero-count') && (qs('#hero-count').textContent=String(manifest.length));
    qs('#hero-categories') && (qs('#hero-categories').textContent=String(new Set(manifest.map(i=>i.category).filter(Boolean)).size));
    const totalViews=manifest.reduce((sum,i)=>sum+(i.views||0),0);
    qs('#hero-featured') && (qs('#hero-featured').textContent=String(totalViews));
    const last=[...manifest].sort((a,b)=>String(b.updated).localeCompare(String(a.updated)))[0];
    qs('#hero-last-date') && (qs('#hero-last-date').textContent=last?formatDate(last.updated):'—');
  }
  function initListing(){
    fillHero(); renderFeatured();
    function setCat(v){ state.category=v; renderChipRow(qs('#category-chips'), getCategories(), state.category, setCat); renderCards(); }
    function setTag(v){ state.tag=v; renderChipRow(qs('#tag-chips'), getTags(), state.tag, setTag); renderCards(); }
    renderChipRow(qs('#category-chips'), getCategories(), state.category, setCat);
    renderChipRow(qs('#tag-chips'), getTags(), state.tag, setTag);
    qs('#search-input')?.addEventListener('input', e=>{ state.search=e.target.value.trim().toLowerCase(); renderCards(); });
    qs('#sort-select')?.addEventListener('change', e=>{ state.sort=e.target.value; renderCards(); });
    qs('#open-featured')?.addEventListener('click', ()=>{ const item=[...manifest].sort((a,b)=>(b.views||0)-(a.views||0))[0] || manifest[0]; if(item) openCard(item); });
    renderCards();
  }
  function parseCallouts(raw=''){ return raw.replace(/^> \[!(NOTE|TIP|WARNING|DANGER)\]\n((?:>.*\n?)*)/gim, (match, kind, body)=>{ const type=kind.toLowerCase(); const content=body.replace(/^> ?/gm,'').trim(); return `\n<div class="callout ${type}"><div class="callout-icon"><i class="fas ${iconForCallout(type)}"></i></div><div><div class="callout-title">${kind}</div><div>${content}</div></div></div>\n`; }); }
  function markdownToHtml(markdown=''){ let html=parseCallouts(markdown); if(window.marked){ marked.setOptions({breaks:true,gfm:true,headerIds:false,mangle:false,highlight:(code,lang)=>window.hljs?hljs.highlightAuto(code, lang?[lang]:undefined).value:code}); html=marked.parse(html);} else { html=html.replace(/\n/g,'<br>'); } if(window.DOMPurify) html=DOMPurify.sanitize(html); return html; }
  function enhanceContent(root){
    qsa('pre code', root).forEach(code=>{ if(window.hljs) hljs.highlightElement(code); const pre=code.parentElement; const lang=[...code.classList].find(c=>c.startsWith('language-'))?.replace('language-','') || 'code'; const wrap=document.createElement('div'); wrap.className='code-block'; const toolbar=document.createElement('div'); toolbar.className='code-toolbar'; toolbar.innerHTML=`<span>${escapeHtml(lang)}</span><button class="copy-btn" type="button">Копировать</button>`; pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(toolbar); wrap.appendChild(pre); toolbar.querySelector('.copy-btn').addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(code.textContent); const btn=toolbar.querySelector('.copy-btn'); btn.textContent='Скопировано'; setTimeout(()=>btn.textContent='Копировать',1200);}catch{} }); });
    qsa('img', root).forEach(img=>img.addEventListener('click', ()=>{ const modal=qs('#image-modal'); if(!modal) return; qs('img', modal).src=img.src; qs('img', modal).alt=img.alt || ''; modal.classList.add('open'); }));
    const headings=qsa('h2, h3', root); headings.forEach(h=>{ h.id=slugify(h.textContent); }); const toc=qs('#toc-links'); if(toc){ toc.innerHTML=headings.length ? headings.map(h=>`<a href="#${h.id}">${escapeHtml(h.textContent)}</a>`).join('') : '<span class="muted">В этой статье нет внутренних разделов.</span>'; const links=qsa('a', toc); const obs=new IntersectionObserver(entries=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ links.forEach(link=>link.classList.toggle('active', link.getAttribute('href')==='#'+entry.target.id)); } }); }, {rootMargin:'-20% 0px -60% 0px', threshold:.1}); headings.forEach(h=>obs.observe(h)); }
  }
  function itemById(id){ return manifest.find(item=>item.id===id); }
  function renderRelated(current){ const wrap=qs('#related-list'); if(!wrap) return; const related=manifest.filter(item=>item.id!==current.id && ((item.category && item.category===current.category) || (item.tags||[]).some(tag=>(current.tags||[]).includes(tag)))).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,4); wrap.innerHTML=related.length ? related.map(item=>`<a class="related-item" href="view.html?id=${encodeURIComponent(item.id)}"><strong>${escapeHtml(item.title)}</strong><span class="muted">${escapeHtml(item.description || '')}</span></a>`).join('') : '<div class="muted">Пока нет связанных материалов.</div>'; }
  async function loadImportedMarkdown(){ const text=sessionStorage.getItem(pageMode+'-imported-md'); const name=sessionStorage.getItem(pageMode+'-imported-name') || 'Импортированный markdown'; if(!text) return null; return { id:'imported-md', title:name.replace(/\.md$/i,''), description:'Открыт из локального markdown-файла', category: pageMode==='news' ? 'Импорт' : 'Локальный файл', tags:['import'], updated:new Date().toISOString().slice(0,10), author:'Локальный файл', inlineContent:text, cover:'images/import-cover.svg', views:0 }; }
  async function initReader(){ const params=new URLSearchParams(location.search); let item=itemById(params.get('id')); if(!item && params.get('id')==='imported-md') item=await loadImportedMarkdown(); if(!item) item=manifest[0]; if(!item){ qs('#reader-body').innerHTML='<div class="empty-state">Нет материалов для отображения.</div>'; return; }
    qs('#reader-cover')?.insertAdjacentHTML('afterbegin', `<img src="../${escapeHtml(item.cover || '')}" alt="${escapeHtml(item.title)}">`);
    qs('#reader-badge').innerHTML=`<i class="fas ${pageMode==='news'?'fa-bolt':'fa-book-open'}"></i> ${escapeHtml(item.category || (pageMode==='news'?'Новость':'Статья'))}`;
    qs('#reader-title').textContent=item.title || '';
    qs('#reader-desc').textContent=item.description || '';
    qs('#reader-date').textContent=formatDate(item.updated);
    qs('#reader-author').textContent=item.author || 'SysHelper';
    qs('#reader-views') && (qs('#reader-views').textContent=String(item.views || 0));
    qs('#reader-tags').innerHTML=(item.tags||[]).map(tag=>`<span class="tag">#${escapeHtml(tag)}</span>`).join('') || '<span class="muted">Без тегов</span>';
    const body=qs('#reader-body'); body.innerHTML=markdownToHtml(item.inlineContent || ''); enhanceContent(body); renderRelated(item);
  }
  function initImport(){ const input=qs('#file-input'); const drop=qs('#drop-zone'); async function handleFiles(fileList){ const file=fileList?.[0]; if(!file) return; const text=await file.text(); sessionStorage.setItem(pageMode+'-imported-md', text); sessionStorage.setItem(pageMode+'-imported-name', file.name); location.href='view.html?id=imported-md'; } input?.addEventListener('change', e=>handleFiles(e.target.files)); if(drop){ ['dragenter','dragover'].forEach(name=>drop.addEventListener(name, e=>{ e.preventDefault(); drop.style.borderColor='rgba(88,166,255,.48)'; })); ['dragleave','drop'].forEach(name=>drop.addEventListener(name, e=>{ e.preventDefault(); drop.style.borderColor=''; })); drop.addEventListener('drop', e=>handleFiles(e.dataTransfer.files)); } }
  function initModal(){ qs('#image-modal')?.addEventListener('click', e=>{ if(e.target.id==='image-modal' || e.target.tagName!=='IMG') e.currentTarget.classList.remove('open'); }); }
  document.addEventListener('DOMContentLoaded', ()=>{ initTheme(); initImport(); initModal(); if(isReader) initReader(); else initListing(); });
})();
