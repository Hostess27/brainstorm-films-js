import filmCard from '../templates/filmCard.hbs';

// Ожидает массив обьектов и рендерит карточки фильмов
const refs = {
  mainContainer: document.querySelector('.js-main-container'),
};

export const renderGalleryTrendingMovie = function (objects) {
  refs.mainContainer.insertAdjacentHTML('beforeend', filmCard(objects));
};

export const clearGalleryTrendingMovi = () =>  refs.mainContainer.innerHTML = '';
