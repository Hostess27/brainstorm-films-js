import FetchFromTrendingMovies from './api';
import { renderGalleryTrendingMovie } from './render';
import { error } from './notify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { filmLoader } from './library-service';
import {addSpinner, removeSpinner} from './spinner';
import { genreLoader } from './genres-service';

const fetchFromTrendingMovies = new FetchFromTrendingMovies();
window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);
addSpinner();

async function renderMovieOnStartPage() {
  //Загружаю список жанров
  await genreLoader.loadGenresList();
  const data = await fetchFromTrendingMovies.fetchTrending();
  console.log('DATA', data);
  if (!data.length) {
    () =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      });
  }
  data.map(film => 
    {
      let genres =  genreLoader.getGenres(film.genre_ids);
      if (genres.length > 3) 
      {
        film.genres = [...genres.slice(0, 3), { id: '00000', name: 'other...' }];
      }
      else
      {
         film.genres = genres;
      }
      renderGalleryTrendingMovie(film);
      removeSpinner();
    });
}
export default renderMovieOnStartPage;
