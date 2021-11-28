import axios from 'axios';
import { error } from './notify';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import FetchFromTrendingMovies from './api';
// import renderClickPageMovie from './renderMoviesOnStartPage'
import { renderGalleryTrendingMovie, clearGalleryTrendingMovi } from './render';
import responseForQuery from './responseForQuery'
// import searchForQuery from './searchingForQuery'
// import { getFormTextContent } from './searchingForQuery'
// import paginationSearchingForQuery from './paginationSearchingForQuery'
// console.log(paginationSearchingForQuery())

const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

const trendingMovies = new FetchFromTrendingMovies()
// console.log(renderGalleryTrendingMovie)


// console.log('FetchFromTrendingMovies', FetchFromTrendingMovies)
// console.log('trendingMovies.page', trendingMovies.page)
// console.log('trendingMovies.clickPage', trendingMovies.clickPage)
// console.log('trendingMovies.clickPage = 2', trendingMovies.clickPage = 5)
// console.log('trendingMovies.page', trendingMovies.page)
// console.log('trendingMovies.clickPage', trendingMovies.clickPage)


// console.log('typeof trendingMovies:', typeof trendingMovies)
// console.log(trendingMovies)
// console.log(trendingMovies.fetchTrending())

const formValueFef = document.querySelector(".search-button-js");
const searchFormInput = document.querySelector('.search-form__input');
const filmListContainerEl = document.querySelector(".js-container-pagination");
const filmItemEl = document.querySelector("li .gallery__item");
const container = document.getElementById('tui-pagination-container');

// const fetchTrendFilmsHere = async (KEY) => {
//     const API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;
//     try {
//         const response = await fetch(API);
//         const responseData = response.json();
//         console.log(responseData)
//             return responseData;

//     } catch (err) {
//         console.log(response.err)
//         throw err;
//     }
// }

// fetchTrendFilmsHere()


// if (!container) {
//   filmListContainerEl.insertAdjacentHTML('beforeend', container)
// }

console.log(container)
console.log(filmListContainerEl)

let inputQuery = ""
let clickOnSearchButton = false;

formValueFef.addEventListener('click', getImputContent);
function getImputContent() {
  clickOnSearchButton = true;
  inputQuery = searchFormInput.value;
  if (!container) {

  filmListContainerEl.insertAdjacentHTML('beforeend', 'container')
}
console.log(container)
console.log(filmListContainerEl)

  
  pagination(options.page, options.visiblePages)
  // pagination.reset()
}



const options = { // below default value of options
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

// const countOfPages = options.totalItems / options.itemsPerPage
// // console.log(countOfPages)
// if (countOfPages <= 5) {
//   options.visiblePages= countOfPages
// } else { options.visiblePages = 5 }

if ((clickOnSearchButton == false) && (inputQuery == "")) {
  options.totalItems = 20000

const countOfPages = options.totalItems / options.itemsPerPage
// console.log(countOfPages)
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
// console.log(countOfPages)
if (countOfPages <= 5) {
  options.visiblePages= countOfPages
    } else { options.visiblePages = 5 }
    
    // pagination(options.page, options.visiblePages)
    // return data.total_results
  })
//   // .then((data_total_results) => {
//   //   console.log(data_total_results)
//   //   options.totalItems = data_total_results
//   //   // return options.totalItems
//   // })
// // options.totalItems = data.total_results
}

// console.log(options.totalItems)



// if (!filmItemEl){container.remove()}

// formValueFef.addEventListener('click',myGetFormTextContent)
// function myGetFormTextContent(evt) {
//   console.log(evt)
//   if (searchFormInput.value != "") {
//   //  return
//     // container.remove()
//  }
// }
function pagination(page){

  const pagination = new Pagination(container, { ...options });
  pagination.reset()

// pagination.movePageTo(trendingMovies.resetPage());
// trendingMovies.resetPage()
// console.log('trendingMovies.resetPage()', trendingMovies.resetPage())
// console.log('trendingMovies.page', trendingMovies.page)

trendingMovies.incrementPage(10)
// console.log('trendingMovies.page', trendingMovies.page)
pagination.getCurrentPage();
// console.log('pagination.getCurrentPage()', pagination.getCurrentPage())




// //   pagination.on('beforeMove', function(eventData) {
// //         return confirm('Go to page ' + eventData.page + '?');
// //     });

// //     pagination.on('afterMove', function(eventData) {
// //         alert('The current page is ' + eventData.page);
// //     });

// pagination.on('beforeMove', evt => {
//   const { page } = evt;
//   const result = ajax.call({page});

//   if(result) {
//     pagination.movePageTo(page);
//   } else {
//     return false;
//   }
// });

// container.addEventListener('click', pagination.on)
//==========================================================
// pagination.on('afterMove', (event) => {
//      const currentPage = event.page;
//      console.log(currentPage);
// });

// pagination.on('beforeMove', (event) => {
//     const currentPage = event.page;

//     if (currentPage === 10) {
//         return false;
//         // return true;
//     }
// });

console.log(searchFormInput.value)
if (searchFormInput.value !== "") { console.log('в инпут что-то ввели') }
// if (searchFormInput.value !== "") { container.remove()}


console.log(responseForQuery)
// console.log(responseForQuery())


// formValueFef.addEventListener('click', getFormTextContent);
 
// function getFormTextContent(e) {
//   console.log(e)
//   localStorage.setItem('currentQuery', searchFormInput.value);
//   const watchLocalstorageInputQuery = localStorage.getItem('currentQuery')
//   console.log("watchLocalstorageInputQuery", watchLocalstorageInputQuery)
//   return watchLocalstorageInputQuery
// }

// // const useLocalstorageInputQuery = getFormTextContent()
// console.log("useLocalstorageInputQuery", getFormTextContent())


// localStorage.setItem('currentQuery', searchFormInput.value);
//   const watchLocalstorageInputQuery = localStorage.getItem('currentQuery')
// let watchLocalstorageInputQuery = ""
// const watchLocalstorageInputQuery = localStorage.getItem('currentQuery')
//   console.log("watchLocalstorageInputQuery", watchLocalstorageInputQuery)

// let inputQuery = ""
// let clickOnSearchButton = false;

// formValueFef.addEventListener('click', getImputContent);
// function getImputContent() {
//   clickOnSearchButton = true;
//   inputQuery = searchFormInput.value;
//   pagination.reset()
// }


// if ((clickOnSearchButton == true) && (inputQuery != "")) {
//   pagination.reset() 
// } // почему с вінесеннім условием не работает

if (!((clickOnSearchButton == false) && (inputQuery == ""))) {
  responseForQuery(KEY, inputQuery, page)
    .then((data) => {options.totalItems = data.total_results })
}






pagination.on('afterMove', ({ page }) => console.log(page));
pagination.on('afterMove', ({ page }) => {



  trendingMovies.clickPage = page
  // pagination.getCurrentPage()
  // console.log('pagination.getCurrentPage()', pagination.getCurrentPage())

  // localStorage.setItem('currentQuery', Theme.LIGHT);
  
// if (watchLocalstorageInputQuery == "" || null)
   if ((clickOnSearchButton == false) && (inputQuery == "")){
    trendingMovies.fetchTrending().then(data => {
      console.log(page),
        console.log(data),
        clearGalleryTrendingMovi(),
        data.map( film => renderGalleryTrendingMovie(film)),
        console.log(trendingMovies.fetchTrending()),
        console.log(trendingMovies.page)
    })
     return
  }

  // console.log(searchFormInput.value)
  // if (searchFormInput.value !== "") { container.remove() }
      if ((clickOnSearchButton == true) && (inputQuery != "")) {

   
    // pagination.reset()
        responseForQuery(KEY, inputQuery, page)
          .then((data) => {
            console.log(searchFormInput.value);
            options.totalItems = data.total_results;
            console.log('поиск из файла пагинации');
              // if (results.length > 0) {
            console.log(data);
              console.log(data.results);
            const arrayOfFilms = data.results;
            console.log(options.totalItems);
            console.log('определяем данные для пагинации');
            clearGalleryTrendingMovi();
            arrayOfFilms.map(film => renderGalleryTrendingMovie(film));
              // renderGalleryTrendingMovie(data.results)
                // } else {
                    
                //     container.remove()
                    
                // }
            });
    }
  
  // console.log(getFormTextContent())


 
  
  
  // trendingMovies.fetchTrending().then(data => { console.log(page), renderGalleryTrendingMovie(data), console.log(trendingMovies.fetchTrending()), console.log(trendingMovies.page) })
  // renderClickPageMovie(page)
  // console.log(renderClickPageMovie(page))
  console.log(page)
  
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=c69608b9bc251fbb333be1b2d7a49ce6&page=${page}`)
    .then(response => {
      console.log('response.json()', response.json())
    return response.json();
  })
  
  .catch(error => {error
    // error handling
  });
});

document.addEventListener('unload', localStorage.setItem('currentQuery', ""))




console.log('pagination', pagination)







// // addEventListener.

// // function getPageToGo(event) { }




// // const pagination2 = new Pagination(container, {  totalItems: 500,
// //         itemsPerPage: 10,
// //     visiblePages: 5,
// //         page: 5,
// //         centerAlign: true });
// // console.log('pagination2', pagination2)
// // pagination2.getCurrentPage();


//     // const pagination3 = new Pagination('pagination', {
//     //     totalItems: 500
//     // });

    
    

// // pagination.getCurrentPage();

// // pagination.movePageTo(10);

// fetch('https://api.themoviedb.org/3/movie/550?api_key=c69608b9bc251fbb333be1b2d7a49ce6')
//     .then(response => {
//       console.log('response.json()', response.json())
//     return response.json();
//   })
  
//   .catch(error => {error
//     // error handling
  //   });
}