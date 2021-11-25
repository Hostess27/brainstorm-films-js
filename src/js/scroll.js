//^ var throttle = require('lodash.throttle');
// import FetchFromTrendingMovies from './api';
// import { renderGalleryTrendingMovie } from './render';
// const api = new FetchFromTrendingMovies();
// window.addEventListener(
//   'scroll',
//   throttle(() => {
//     const documentRect = document.documentElement.getBoundingClientRect();
//     if (documentRect.bottom < document.documentElement.clientHeight + 150) {
//       api.fetchTrending().then(renderGalleryTrendingMovie);
//     }
//   }, 200),
//^ );

// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// const newPage = new FetchFromTrendingMovies();

// const container = document.getElementById('tui-pagination-container');
// const options = {
//   totalItems: 500,
//   itemsPerPage: 10,
//   visiblePages: 10,
//   page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };
// const pagination = new Pagination(container, options);

// const next = document.querySelector('.tui-next');
// const zz = document.querySelector('strong');
// const a = document.querySelector('.tui-pagination');
// const numberPage = document.querySelectorAll('a.tui-page-btn');

// a.addEventListener('click', onLoadMore);

// function onLoadMore(e) {
//   e.preventDefault();
//   if (zz.classList.contains('tui-is-selected') === true) {
//     let b = Number(e.target.textContent);
//     console.log('Page #', b);
//     newPage.page = b;
//     console.log(newPage.page);
//     newPage.fetchTrending();
//   }
// }
// console.log(newPage.fetchTrending);
// console.log(FetchFromTrendingMovies.constructor);

// const btn = document.getElementById('next-page');

// a.addEventListener('click', load);

// function load(e) {
//   let b = Number(e.target.textContent);

//   // e.preventDefault();

//   api.fetchTrending().then(renderGalleryTrendingMovie);
//   console.log('загрузил');
// }

// export default class LoadMoreBtn {
//   constructor({ selector, hidden = false }) {
//     this.refs = this.getRefs(selector);

//     hidden && this.hide();
//   }

//   getRefs(selector) {
//     const refs = {};
//     refs.button = document.querySelector(selector);
//     refs.label = refs.button.querySelector('.label');
//     refs.spinner = refs.button.querySelector('.spinner');

//     return refs;
//   }

//   enable() {
//     this.refs.button.disabled = false;
//     this.refs.label.textContent = 'Показать ещё...';
//     this.refs.spinner.classList.add('is-hidden');
//   }

//   disable() {
//     this.refs.button.disabled = true;
//     this.refs.label.textContent = 'Загружаем...';
//     this.refs.spinner.classList.remove('is-hidden');
//   }

//   show() {
//     this.refs.button.classList.remove('is-hidden');
//   }

//   hide() {
//     this.refs.button.classList.add('is-hidden');
//   }
// }

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });
// console.log(loadMoreBtn);
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
// function onLoadMore() {
//   // loadMoreBtn.disable();
//   api.fetchTrending().then(renderGalleryTrendingMovie);
// }

const general = document.querySelector('.general');
const library = document.querySelector('.library');
const headerGeneral = document.querySelector('.header__index');
const headerLib = document.querySelector('.header__lib');
const btnNav = document.querySelectorAll('.header-nav__item');

btnNav[1].addEventListener('click', () => {
  general.classList.add('is-hidden');
  headerGeneral.classList.add('is-hidden');

  library.classList.remove('is-hidden');
  headerLib.classList.remove('is-hidden');
});

btnNav[2].addEventListener('click', () => {
  library.classList.add('is-hidden');
  headerLib.classList.add('is-hidden');

  general.classList.remove('is-hidden');
  headerGeneral.classList.remove('is-hidden');
});
