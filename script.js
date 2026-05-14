/* REVEAL */

const obs = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add('visible');

obs.unobserve(entry.target);

}

});

}, { threshold: 0.12 });

document.querySelectorAll('.reveal,.reveal-scale')
.forEach(el => obs.observe(el));

/* CONTADORES */

function animCount(el, target){

const duration = 1800;

const frames = 60;

const step = target / (duration / 1000 * frames);

let value = 0;

(function update(){

value = Math.min(value + step, target);

el.textContent = Math.round(value).toLocaleString('pt-BR');

if(value < target){

requestAnimationFrame(update);

}

})();

}

/* HERO */

let heroStarted = false;

new IntersectionObserver(entries => {

if(entries[0].isIntersecting && !heroStarted){

heroStarted = true;

animCount(document.getElementById('c1'), 12);

animCount(document.getElementById('c2'), 800);

animCount(document.getElementById('c3'), 8550);

animCount(document.getElementById('c4'), 1);

}

}, { threshold: 0.3 })

.observe(document.querySelector('.hero-stats'));

/* COUNTER SECTION */

let counterStarted = false;

new IntersectionObserver(entries => {

if(entries[0].isIntersecting && !counterStarted){

counterStarted = true;

animCount(document.getElementById('cc1'), 12);

animCount(document.getElementById('cc2'), 800);

animCount(document.getElementById('cc3'), 8550);

animCount(document.getElementById('cc4'), 1);

}

}, { threshold: 0.3 })

.observe(document.querySelector('.counter-section'));

/* PLACARES */

async function fetchScores(){

const mockData = [

{ t1: "AFONSO CLÁUDIO", s1: 2, s2: 1, t2: "VENDA NOVA" },

{ t1: "VITÓRIA VÔLEI", s1: 3, s2: 0, t2: "SERRA" },

{ t1: "LARANJA TERRA", s1: 1, s2: 2, t2: "ITARANA" },

{ t1: "DOMINGOS MARTINS", s1: 0, s2: 3, t2: "MARECHAL" }

];

let html = '';

const displayData = [...mockData, ...mockData];

displayData.forEach(game => {

html += `

<div class="score-card">

<div class="team-name">${game.t1}</div>

<div class="score-num">${game.s1}</div>

<div class="score-separator">x</div>

<div class="score-num">${game.s2}</div>

<div class="team-name">${game.t2}</div>

</div>

`;

});

document.getElementById('ticker-content').innerHTML = html;

}

fetchScores();