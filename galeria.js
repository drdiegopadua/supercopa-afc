const filterBtns = document.querySelectorAll('.filter-btn');

const filterPill = document.getElementById('filter-pill');

const galleryItems = document.querySelectorAll('.gallery-item');

function updatePill(btn){

    filterPill.style.width = `${btn.offsetWidth}px`;

    filterPill.style.left = `${btn.offsetLeft}px`;
}

/* INICIAR */

window.addEventListener('load', () => {

    const activeBtn = document.querySelector('.filter-btn.active');

    updatePill(activeBtn);
});

/* FILTRO */

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        updatePill(btn);

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {

            const category = item.getAttribute('data-category');

            if(filter === 'todos' || filter === category){

                item.classList.remove('hide');

                item.classList.add('show');

            }else{

                item.classList.remove('show');

                item.classList.add('hide');
            }

        });

    });

});

/* RESPONSIVO */

window.addEventListener('resize', () => {

    const activeBtn = document.querySelector('.filter-btn.active');

    updatePill(activeBtn);
});