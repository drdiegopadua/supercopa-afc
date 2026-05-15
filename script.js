/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.tl-item').forEach(el => obs.observe(el));

/* ── CONTADOR ANIMADO ── */
function animCount(el, target, prefix, suffix) {
  const dur = 1800, frames = 60, step = target / (dur / 1000 * frames);
  let v = 0;
  (function tick() {
    v = Math.min(v + step, target);
    el.textContent = (prefix||'') + Math.round(v).toLocaleString('pt-BR') + (suffix||'');
    if (v < target) requestAnimationFrame(tick);
  })();
}

/* hero counters — disparam ao entrar na tela */
let heroFired = false;
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !heroFired) {
    heroFired = true;
    animCount(document.getElementById('c1'), 12);
    animCount(document.getElementById('c2'), 6);
    animCount(document.getElementById('c4'), 1);
    document.getElementById('c3').textContent = 'R$0,00';
  }
}, { threshold: 0.3 }).observe(document.querySelector('.hero-stats'));

/* section counters */
let secFired = false;
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !secFired) {
    secFired = true;
    document.querySelectorAll('.counter-num').forEach(el => {
      const target = +el.getAttribute('data-target');
      animCount(el, target);
    });
  }
}, { threshold: 0.1 }).observe(document.querySelector('.counter-section'));

/* ── SLIDER DEPOIMENTOS ── */
let idx = 0;
const track = document.getElementById('depTrack');
const cards = [...document.querySelectorAll('.dep-card')];
const dotsEl = document.getElementById('depDots');
const total = Math.ceil(cards.length / 2);

for (let i = 0; i < total; i++) {
  const d = document.createElement('div');
  d.className = 'dep-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => go(i);
  dotsEl.appendChild(d);
}
function go(i) {
  idx = Math.max(0, Math.min(i, total - 1));
  const w = cards[0].getBoundingClientRect().width + 24;
  track.style.transform = `translateX(-${idx * w * 2}px)`;
  document.querySelectorAll('.dep-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
}
document.getElementById('prevBtn').onclick = () => go(idx - 1);
document.getElementById('nextBtn').onclick = () => go(idx + 1);

/* ── FAQ ── */
function toggleFaq(btn) {
  const a = btn.nextElementSibling, open = a.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.faq-q.open').forEach(el => el.classList.remove('open'));
  if (!open) { a.classList.add('open'); btn.classList.add('open'); }
}
window.toggleFaq = toggleFaq;
