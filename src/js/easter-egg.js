const eggBtn = document.querySelector('.advertising-btn');
const eggBox = document.querySelector('.advertising-container');

eggBtn.addEventListener('click', eggShow);
eggBtn.addEventListener('mouseout', eggHide);

function eggShow() {
    eggBox.classList.remove('visually-hidden');
}
function eggHide() {
    eggBox.classList.add('visually-hidden');
}