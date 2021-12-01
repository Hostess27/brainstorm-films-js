const general = document.querySelector('.general');
const library = document.querySelector('.library');
const headerGeneral = document.querySelector('.header__index');
const headerLib = document.querySelector('.header__lib');
const btnNav = document.querySelectorAll('.header-nav__item');

btnNav[1].addEventListener('click', () => {
  general.classList.add('is-hidden');
  headerGeneral.classList.add('is-hidden');

  library.classList.remove('is-hidden');
  headerLib.classList.remove('is-hidden');
});

btnNav[2].addEventListener('click', () => {
  library.classList.add('is-hidden');
  headerLib.classList.add('is-hidden');

  general.classList.remove('is-hidden');
  headerGeneral.classList.remove('is-hidden');
});
