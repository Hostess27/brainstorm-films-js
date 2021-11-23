const devBtn = document.querySelector('.developed');
const heardRefs = document.querySelector('[data-icon="heard"]');

devBtn.addEventListener('mouseover', heardBeat);
devBtn.addEventListener('mouseout', heardStop);

function heardBeat() {
  heardRefs.classList.add('icon-heard-js');
}
function heardStop() {
  heardRefs.classList.remove('icon-heard-js');
}
