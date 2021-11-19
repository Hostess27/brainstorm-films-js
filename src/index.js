import './sass/main.scss';
import searchForQuery from'./search.js';
import {fetchTrending} from './js/api';
import { renderGalleryTrendingMovie } from './js/render';
import { error } from './js/notify';


const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

// searchForQuery(KEY, "Titanic", "1").then((o)=>console.log(o));


window.addEventListener('DOMContentLoaded', renderMovieOnStartPage);
function renderMovieOnStartPage() { 
      
fetchTrending().then((data) =>  renderGalleryTrendingMovie(data)).catch(()=> error({
          title: 'Error!',
          text: 'Loading Error',
        }))};
