document.addEventListener("DOMContentLoaded", () => {
  console.log("Supercopa AFC carregada com sucesso!");

  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;
    counter.dataset.animated = "true";

    const target = +counter.getAttribute("data-target");
    const duration = 2500; // ms total da animação
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: acelera e depois desacelera
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      counter.innerText = current.toLocaleString("pt-BR");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString("pt-BR");
      }
    };

    requestAnimationFrame(update);
  };

  const section = document.querySelector(".counter-section");

  if (!section) {
    console.warn("⚠️ .counter-section não encontrada no DOM!");
    return;
  }

  // Fallback: se já estiver visível ao carregar, dispara imediatamente
  const tryAnimate = () => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      document.querySelectorAll(".counter-num").forEach(animateCounter);
      return true;
    }
    return false;
  };

  // Tenta na hora — se falhar, usa Observer
  if (!tryAnimate()) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".counter-num").forEach(animateCounter);
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.05 }); // 5% — mínimo possível

    observer.observe(section);
  }
});
