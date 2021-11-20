import { fetchTrending } from './api';
import { renderGalleryTrendingMovie } from './render';
import { error } from './notify';

function renderMovieOnStartPage() {
  fetchTrending()
    .then(data => renderGalleryTrendingMovie(data))
    .catch(() =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      }),
    );
}
export default renderMovieOnStartPage;
