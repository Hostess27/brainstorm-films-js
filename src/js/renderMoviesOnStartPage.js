// import { fetchTrending } from './api';
import FetchFromTrendingMovies from './api';
import { renderGalleryTrendingMovie } from './render';
import { error } from './notify';

const fetchFromTrendingMovies = new FetchFromTrendingMovies();

function renderMovieOnStartPage() {
  fetchFromTrendingMovies
    .fetchTrending()
    .then(data => {
      if (!data.length) {
        () =>
          error({
            title: 'Error!',
            text: 'Loading Error',
          });
      }
      renderGalleryTrendingMovie(data);
    })
    .catch(() =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      }),
    );
}
export default renderMovieOnStartPage;
