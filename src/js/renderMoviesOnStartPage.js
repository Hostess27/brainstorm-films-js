// import { fetchTrending } from './api';
import  FetchFromTrendingMovies from './api'
import { renderGalleryTrendingMovie } from './render';
import { error,  success } from './notify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { filmLoader } from './library-service';

const fetchFromTrendingMovies = new FetchFromTrendingMovies();
window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);

async function renderMovieOnStartPage() {
  const data = await fetchFromTrendingMovies.fetchTrending();
  console.log("DATA", data);
  if (!data.length) {
    () =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      });
  }
  const filmsIdArr = data.map(film => film.id);
  await filmsIdArr.map(async id =>
  {
    const film = await filmLoader.loadFilmById(Number(id));
    if(film.genres.length >= 3)
    {
      film.genres = [...film.genres.slice(0, 3), {id: "00000", name: "other..."}];
    }
    renderGalleryTrendingMovie(film);
  });
}
export default renderMovieOnStartPage;