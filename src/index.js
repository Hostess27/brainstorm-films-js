import './sass/main.scss';
import './templates/filmCard.hbs';
import './js/searchingForQuery.js';
import './js/spinner.js';
import renderMovieOnStartPage from './js/renderMoviesOnStartPage';

window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);
