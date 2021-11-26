import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import FetchFromTrendingMovies from './api';
import renderClickPageMovie from './render-movies-on-start-page';
import { renderGalleryTrendingMovie, clearGalleryTrendingMovi } from './render';
import { filmLoader } from './library-service';

const trendingMovies = new FetchFromTrendingMovies();

console.log('FetchFromTrendingMovies', FetchFromTrendingMovies);
console.log('trendingMovies.page', trendingMovies.page);
console.log('trendingMovies.clickPage', trendingMovies.clickPage);
console.log('trendingMovies.clickPage = 2', (trendingMovies.clickPage = 5));
console.log('trendingMovies.page', trendingMovies.page);
console.log('trendingMovies.clickPage', trendingMovies.clickPage);

console.log('typeof trendingMovies:', typeof trendingMovies);
console.log(trendingMovies);
console.log(trendingMovies.fetchTrending());

const container = document.getElementById('tui-pagination-container');
const options = {
  // below default value of options
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 7,
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
      '</a>',
  },
};

const pagination = new Pagination(container, { ...options });

// pagination.movePageTo(trendingMovies.resetPage());
trendingMovies.resetPage();
console.log('trendingMovies.resetPage()', trendingMovies.resetPage());
console.log('trendingMovies.page', trendingMovies.page);

trendingMovies.incrementPage(10);
console.log('trendingMovies.page', trendingMovies.page);
pagination.getCurrentPage();
console.log('pagination.getCurrentPage()', pagination.getCurrentPage());

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

pagination.on('afterMove', ({ page }) => console.log(page));
pagination.on('afterMove', async ({ page }) => {
  trendingMovies.clickPage = page;
  pagination.getCurrentPage();
  console.log('pagination.getCurrentPage()', pagination.getCurrentPage());
  clearGalleryTrendingMovi();
  const data = await trendingMovies.fetchTrending();
  console.log('DATA', data);
  if (!data.length) {
    () =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      });
  }
  const filmsIdArr = data.map(film => film.id);
  await filmsIdArr.map(async id => {
    const film = await filmLoader.loadFilmById(Number(id));
    if (film.genres.length >= 3) {
      film.genres = [...film.genres.slice(0, 3), { id: '00000', name: 'other...' }];
    }
    renderGalleryTrendingMovie(film);
  });
  //  console.log(page),
  //  renderGalleryTrendingMovie(data),
  //  console.log(trendingMovies.fetchTrending()),
  //   console.log(trendingMovies.page)
  // renderClickPageMovie(page)
  // console.log(renderClickPageMovie(page))
  console.log(page);

  fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=c69608b9bc251fbb333be1b2d7a49ce6&page=${page}`,
  )
    .then(response => {
      console.log('response.json()', response.json());
      return response.json();
    })

    .catch(error => {
      error;
      // error handling
    });
});

console.log('pagination', pagination);

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
