function refreshPage() {
  document.location.reload();
}

function refreshPageOnClickFilmoteka() {
  const filmoteka = document.querySelector('.header-logo__site-name');
  filmoteka.addEventListener('click', refreshPage);
}

refreshPageOnClickFilmoteka();
export default refreshPageOnClickFilmoteka;
