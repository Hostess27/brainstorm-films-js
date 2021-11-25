// import { fetchTrending } from './api';
import  FetchFromTrendingMovies from './api'
import { renderGalleryTrendingMovie } from './render';
import { error,  success } from './notify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';


const fetchFromTrendingMovies = new FetchFromTrendingMovies;
window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);

function renderMovieOnStartPage() {
  fetchFromTrendingMovies.fetchTrending()
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
