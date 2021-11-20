import { fetchTrending } from './api';
import { renderGalleryTrendingMovie } from './render';
import { error } from './notify';

function renderMovieOnStartPage() {
  fetchTrending()
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
