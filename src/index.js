import './sass/main.scss';
import './templates/filmCard.hbs'
import './js/searchingForQuery.js';
import './js/filmCard';
import {fetchTrending} from './js/api';
import { renderGalleryTrendingMovie } from './js/render';
import { error } from './js/notify';


window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);
function renderMovieOnStartPage() { 
      
fetchTrending().then((data) =>  renderGalleryTrendingMovie(data)).catch(()=> error({
          title: 'Error!',
          text: 'Loading Error',
        }))};

