
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.navlinks');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}))}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('.portfolio-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter})}));
document.querySelectorAll('form[data-whatsapp-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const lines=['Hello M@C-SHEFF, I would like to make an enquiry.','',...Array.from(data.entries()).map(([key,value])=>`${key}: ${value}`)];const url='https://wa.me/233256614966?text='+encodeURIComponent(lines.join('\n'));window.open(url,'_blank','noopener,noreferrer')}));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const cards=[...document.querySelectorAll('.portfolio-card')];
if(cards.length){
 const viewer=document.createElement('div');viewer.className='image-viewer';viewer.setAttribute('role','dialog');viewer.setAttribute('aria-modal','true');viewer.setAttribute('aria-label','Portfolio image preview');viewer.innerHTML='<button class="viewer-close" aria-label="Close image preview">×</button><button class="viewer-prev" aria-label="Previous image">←</button><figure><img alt=""><figcaption></figcaption></figure><button class="viewer-next" aria-label="Next image">→</button>';document.body.append(viewer);
 const viewImg=viewer.querySelector('img'),caption=viewer.querySelector('figcaption');let current=0,visible=[];
 const refresh=()=>{visible=cards.filter(c=>!c.hidden);const card=visible[current];if(!card)return;viewImg.src=card.querySelector('img').src;viewImg.alt=card.querySelector('img').alt;caption.textContent=card.querySelector('h3').textContent};
 const open=card=>{visible=cards.filter(c=>!c.hidden);current=visible.indexOf(card);refresh();viewer.classList.add('show');document.body.style.overflow='hidden';viewer.querySelector('.viewer-close').focus()};
 const close=()=>{viewer.classList.remove('show');document.body.style.overflow=''};
 const move=step=>{current=(current+step+visible.length)%visible.length;refresh()};
 cards.forEach(card=>{card.setAttribute('tabindex','0');card.setAttribute('role','button');card.setAttribute('aria-label','Open '+card.querySelector('h3').textContent);card.addEventListener('click',()=>open(card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(card)}})});
 viewer.querySelector('.viewer-close').addEventListener('click',close);viewer.querySelector('.viewer-prev').addEventListener('click',()=>move(-1));viewer.querySelector('.viewer-next').addEventListener('click',()=>move(1));viewer.addEventListener('click',e=>{if(e.target===viewer)close()});document.addEventListener('keydown',e=>{if(!viewer.classList.contains('show'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
}
