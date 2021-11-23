// import axios from 'axios';
// import { error } from './notify';

// import FetchFromTrendingMovies from './api';
// import { renderGalleryTrendingMovie } from './render';

// const FetchFromTrendingMovies2 = new FetchFromTrendingMovies();

// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

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

// const zz = document.querySelector('strong');
// const a = document.querySelector('.tui-pagination');

// a.addEventListener('click', onLoadMore);

// function onLoadMore(e) {
//   e.preventDefault();
//   if (zz.classList.contains('tui-is-selected') === true) {
//     let b = Number(e.target.textContent);
//     console.log('Page #', b);
//     FetchFromTrendingMovies2.fetchTrending((this.page += 2));
//   }
// }
