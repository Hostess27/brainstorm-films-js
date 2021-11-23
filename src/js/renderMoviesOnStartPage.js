// import { fetchTrending } from './api';
import  FetchFromTrendingMovies from './api'
import { renderGalleryTrendingMovie } from './render';
import { error,  success } from './notify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';


const fetchFromTrendingMovies = new FetchFromTrendingMovies;

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
      success({
        title: 'Success!',
        text: 'Loading Success! ',
      });
    
    })    
    .catch(() =>
      error({

        title: 'Error!',
        text: 'Loading Error',
      }),
    );
}
export default renderMovieOnStartPage;
