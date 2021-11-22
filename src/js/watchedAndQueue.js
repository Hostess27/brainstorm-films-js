import { filmLoader } from './modal-service';
import filmCardTempl from '../templates/filmCard.hbs';

import filmStorage from './film-storage-list-service';

const refs = {
  addToWatched: document.querySelector('#add-to-watched'),
  addToQueue: document.querySelector('#add-to-queue'),

  watchedLibraryBtn: document.querySelector('#watched-btn'),
  queueLibraryBtn: document.querySelector('#queue-btn'),

  galleryList: document.querySelector('.gallery'),
};

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';

const WATCHED_KEY = 'whatched';
const QUEUE_KEY = 'queue';

const WATCHED_ARRAY = JSON.parse(localStorage.getItem(WATCHED_KEY));
const QUEUE_ARRAY = JSON.parse(localStorage.getItem(QUEUE_KEY));
console.log(WATCHED_ARRAY);

onWatchedBtnClick();

refs.watchedLibraryBtn.addEventListener('click', onWatchedBtnClick);
refs.queueLibraryBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  clearMoviesList();

  refs.watchedLibraryBtn.classList.add('active');
  refs.queueLibraryBtn.classList.remove('active');

  if (WATCHED_ARRAY === null || WATCHED_ARRAY.length === 0) {
    refs.galleryList.innerHTML = '<p>The watched list is empty.</p>';

    // refs.paginationContainer.innerHTML = '';
    return;
  }
  renderLibraryResults(WATCHED_ARRAY);
}

function onQueueBtnClick() {
  refs.watchedLibraryBtn.classList.remove('active');

  refs.queueLibraryBtn.classList.add('active');

  clearMoviesList();

  if (QUEUE_ARRAY === null || QUEUE_ARRAY.length === 0) {
    refs.galleryList.innerHTML = '<p>The queue list is empty.</p>';

    // refs.paginationContainer.innerHTML = '';

    return;
  }

  renderLibraryResults(QUEUE_ARRAY);
}

const genreIdsArr = [];
console.log(fetchGenreIds());

function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

function fetchMovieById(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`).then(response =>
    response.json(),
  );
}

function getMovie(id) {
  fetchMovieById(id).then(movie => appendMoviesMarkup(movie));
}
console.log(getMovie);
function appendMoviesMarkup(movie) {
  if (movie.release_date) {
    movie.release_date = movie.release_date.slice(0, 4);
  }

  if (movie.genres.length === 0) {
    movie.genres.push({ name: 'No genre' });
  } else if (movie.genres.length <= 3) {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    movie.genres[movie.genres.length - 1] = movie.genres[movie.genres.length - 1].slice(
      0,
      movie.genres[movie.genres.length - 1].length - 1,
    );
  } else {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    const tempArr = [];

    tempArr.push(movie.genres[0]);
    tempArr.push(movie.genres[1]);
    tempArr.push('Other');

    movie.genres.splice(0, movie.genres.length, ...tempArr);
  }

  refs.galleryList.insertAdjacentHTML('afterbegin', movieItemTpl(movie));
}

function clearMoviesList() {
  refs.galleryList.innerHTML = '';
}

function renderLibraryResults(renderArray, page = 1) {
  clearMoviesList();

  const moviesPerPage = 6;

  renderArray.forEach((id, index) => {
    if (index >= page * moviesPerPage - moviesPerPage && index <= page * moviesPerPage - 1) {
      getMovie(id);
    }
  });
}
