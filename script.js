const counters = document.querySelectorAll('.stat-number');

const speed = 200;

const startCounters = () => {

    counters.forEach(counter => {

        const updateCount = () => {

            const target = +counter.getAttribute('data-target');

            const count = +counter.innerText;

            const inc = target / speed;

            if(count < target){

                counter.innerText = Math.ceil(count + inc);

                setTimeout(updateCount, 10);

            }else{

                counter.innerText = target + (target === 800 ? '+' : '');

            }

        };

        updateCount();

    });

};

const observer = new IntersectionObserver((entries) => {

    if(entries[0].isIntersecting){

        startCounters();

        observer.disconnect();

    }

}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats'));

/* PLACAR */

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