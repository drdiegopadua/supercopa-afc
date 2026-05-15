document.addEventListener("DOMContentLoaded", () => {
  console.log("Supercopa AFC carregada com sucesso!");

  const counters = document.querySelectorAll(".counter-num");

  const animateCounter = (counter) => {
    // Evita rodar duas vezes
    if (counter.dataset.animated === "true") return;
    counter.dataset.animated = "true";

    const target = +counter.getAttribute("data-target");
    let current = 0;
    const duration = 2000; // ms
    const steps = 60 * (duration / 1000); // ~60fps
    const speed = target / steps;

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

  if (!section) {
    console.warn("counter-section não encontrada!");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => animateCounter(counter));
        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.1  // ← era 0.4, agora dispara com só 10% visível
  });

  observer.observe(section);
});
