const counters = document.querySelectorAll('.stat-box h2');

counters.forEach(counter => {

  const updateCounter = () => {

    const target = +counter.innerText;
    const current = +counter.getAttribute('data-count') || 0;

    const increment = target / 80;

    if(current < target){

      const newValue = Math.ceil(current + increment);

      counter.setAttribute('data-count', newValue);
      counter.innerText = newValue;

      setTimeout(updateCounter, 25);

    }else{

      counter.innerText = target;

    }

  };

  updateCounter();

});