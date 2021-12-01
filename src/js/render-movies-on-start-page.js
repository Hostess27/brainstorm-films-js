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

  if(data)
  {
    data.map(film => 
      {
        film.genres = genreLoader.getGenres(film.genre_ids);
        // console.log("ЖАНРЫ = ", genres);
        if (film.genres.length > 3) 
        {
          film.genres = [...film.genres.slice(0, 3), { id: '00000', name: 'other...' }];
        }
        renderGalleryTrendingMovie(film);
        removeSpinner();
      });
  }
}
export default renderMovieOnStartPage;
