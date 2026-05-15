document.addEventListener("DOMContentLoaded", () => {

  console.log("Supercopa AFC carregada com sucesso!");

  const counters = document.querySelectorAll(".counter-num");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;

    const speed = target / 120; // controla velocidade

    const update = () => {
      current += speed;

      if (current < target) {
        counter.innerText = Math.floor(current).toLocaleString("pt-BR");
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString("pt-BR");
      }
    };

    update();
  };

  const section = document.querySelector(".counter-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        counters.forEach(counter => {
          animateCounter(counter);
        });

        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.4
  });

  if (section) {
    observer.observe(section);
  }

});
