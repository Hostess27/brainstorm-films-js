import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import FetchFromTrendingMovies from './api';
import { renderGalleryTrendingMovie, clearGalleryTrendingMovi } from './render';
import responseForQuery from './responseForQuery'


const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

const trendingMovies = new FetchFromTrendingMovies()

const formValueFef = document.querySelector(".search-button-js");
const searchFormInput = document.querySelector('.search-form__input');
const filmListContainerEl = document.querySelector(".js-container-pagination");
const filmItemEl = document.querySelector("li .gallery__item");
const container = document.getElementById('tui-pagination-container');



let inputQuery = ""
let clickOnSearchButton = false;

formValueFef.addEventListener('click', getImputContent);
function getImputContent() {
  clickOnSearchButton = true;
  inputQuery = searchFormInput.value;
  pagination(options.page, options.visiblePages)
 }


// настройки блока пагинации
const options = { 

    //  totalItems: 20000,  
     itemsPerPage: 20,
    //  visiblePages: 3,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
  }
   
};


if ((clickOnSearchButton == false) && (inputQuery == "")) {
  options.totalItems = 20000
  const countOfPages = options.totalItems / options.itemsPerPage

  if (countOfPages <= 5) {
       options.visiblePages= countOfPages
  } else { options.visiblePages = 5 }
  pagination(options.page, options.visiblePages)
}

if ((clickOnSearchButton == true) && (inputQuery != "")) {
  responseForQuery(KEY, searchFormInput.value)
  .then((data) => {
    console.log(data.total_results)
    options.totalItems = data.total_results
    const countOfPages = options.totalItems / options.itemsPerPage
    if (countOfPages <= 5) {
    options.visiblePages= countOfPages
    } else { options.visiblePages = 5 }
  
  })
}


function pagination(page){

  const pagination = new Pagination(container, { ...options });
  pagination.reset()
  pagination.getCurrentPage();

  
  pagination.on('afterMove', ({ page }) => {
      
  trendingMovies.clickPage = page

    if ((clickOnSearchButton == false) && (inputQuery == "")){
      trendingMovies.fetchTrending()
        .then(data => {
          clearGalleryTrendingMovi(),
          data.map( film => renderGalleryTrendingMovie(film))
        })
        .catch(error => {
            console.log(error)
        });
        return
    }
  
    if ((clickOnSearchButton == true) && (inputQuery != "")) {

        responseForQuery(KEY, inputQuery, page)
          .then((data) => {
            
            const arrayOfFilms = data.results;
            clearGalleryTrendingMovi();
            arrayOfFilms.map(film => renderGalleryTrendingMovie(film));
            
          })
          .catch(error => {
            console.log(error)
          });
    }
 
  });


document.addEventListener('unload', localStorage.setItem('currentQuery', ""))

}