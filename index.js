const form = document.getElementById('escrow-form');
const lightContainer = form.querySelector('.light-container');
const light = lightContainer.querySelector('.light');

form.addEventListener('mousemove', (event) => {
  const x = event.clientX - form.offsetLeft - light.offsetWidth / 2;
  const y = event.clientY - form.offsetTop - light.offsetHeight / 2;

  light.style.left = `${x}px`;
  light.style.top = `${y}px`;
});
