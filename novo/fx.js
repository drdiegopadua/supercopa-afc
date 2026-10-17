
(function(){
const PH={"inicio": "novo/fotos/inicio.webp", "historia": "novo/fotos/historia.webp", "times": "novo/fotos/times.webp", "jogos": "novo/fotos/jogos.webp", "transmissao": "novo/fotos/transmissao.webp", "galeria": "novo/fotos/galeria.webp", "destaque": "novo/fotos/destaque.webp", "regulamento": "novo/fotos/regulamento.webp", "downloads": "novo/fotos/downloads.webp", "inscricao": "novo/fotos/inscricao.webp", "feedback": "novo/fotos/feedback.webp", "patrocinadores": "novo/fotos/patrocinadores.webp"};
const page=document.getElementById('page');
const bar=document.createElement('div');bar.id='fxbar';document.body.appendChild(bar);
const wipe=document.createElement('div');wipe.id='wipe';document.body.appendChild(wipe);
const lb=document.createElement('div');lb.id='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);lb.onclick=()=>lb.classList.remove('on');
const top=document.getElementById('top');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')';(scrollY>120?top.classList.add('sm'):scrollY<20&&top.classList.remove('sm'));const p=document.querySelector('.fxph');if(p&&scrollY<900)p.style.translate='0 '+(scrollY*.18)+'px'},{passive:true});
addEventListener('hashchange',()=>{wipe.classList.remove('go');void wipe.offsetWidth;wipe.classList.add('go')});
function words(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}const w=document.createElement('span');w.className='w';const i=document.createElement('i');i.textContent=t;i.style.setProperty('--d',(0.12+idx++*0.09)+'s');w.appendChild(i);f.appendChild(w)});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})};let idx=0;walk(el)}
function count(el){const m=el.textContent.match(/^(R\$)?\s*(\d+)(.*)$/);if(!m)return;const pre=m[1]||'',to=+m[2],suf=m[3];const t0=performance.now(),d=1400;const f=t=>{const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,4);el.textContent=pre+Math.round(to*e)+suf;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.matches('.stat'))count(e.target.querySelector('b'));io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
function run(){
 const k=(location.hash||'#inicio').slice(1);const hero=page.querySelector('section.sc');
 if(hero){const key=PH[k]?k:'inicio';const im=document.createElement('div');im.className='fxph';im.style.backgroundImage='url('+PH[key]+')';hero.prepend(im);{const sh=document.createElement('div');sh.className='fxsh';hero.insertBefore(sh,im.nextSibling)}
  const pl=document.createElement('div');pl.className='hero-pulse';hero.appendChild(pl);
  const h=hero.querySelector('.h1');if(h)words(h)}
 if(k==='inicio'&&hero){const mq=document.createElement('div');mq.className='fxmq';const t='<span>◥</span>Supercopa 2026<span>◥</span><b>Vôlei</b><span>◥</span>Basquete<span>◥</span><b>Afonso Cláudio</b><span>◥</span>Sem taxa de inscrição<span>◥</span><b>Ao vivo</b>';mq.innerHTML='<div>'+t+t+t+t+'</div>';hero.after(mq)}
 let n=0;page.querySelectorAll('.card,.stat,.game,.tl>div,.sech,details,.mason img,.rk,.ath,table,.dk,.bar-title').forEach(e=>{if(e.closest('.rv'))return;e.classList.add('rv');if(e.matches('.sech'))e.classList.add('l');if(e.matches('.stat,.mason img'))e.classList.add('z');e.style.setProperty('--d',((n++%6)*.08)+'s');io.observe(e)});
 setTimeout(()=>{const h=page.querySelector('section.sc');if(h)h.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))},200);
 const tl=page.querySelector('.tl');if(tl){tl.classList.remove('rv');io.observe(tl)}
 page.querySelectorAll('.mason img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.dataset.full||i.src;lb.classList.add('on')});
}
new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&!n.classList.contains('fxmq'))))run()}).observe(page,{childList:true});run();
document.addEventListener('pointermove',e=>{document.querySelectorAll('.btn').forEach(b=>{const r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);if(Math.abs(dx)<r.width&&Math.abs(dy)<r.height*1.8){b.style.transform='translate('+dx*.12+'px,'+dy*.25+'px)'}else b.style.transform=''})});
// mosaico vivo: quadrados que piscam nos faixas azuis
(function(){let t=0;setInterval(()=>{document.querySelectorAll('canvas.mosaic').forEach(c=>{const r=c.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!c.width)return;const x=c.getContext('2d'),d=c.width/r.width;for(let i=0;i<5;i++){const X=Math.floor(Math.random()*r.width/26)*26,Y=Math.floor(Math.random()*r.height/26)*26;x.fillStyle='rgba(120,160,255,'+(Math.random()*.35)+')';x.fillRect(X*d,Y*d,26*d,26*d)}})},180)})();
})();
