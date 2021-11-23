import axios from 'axios';
import { error } from './notify';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// Запрос за популярными фильмами

export default class FetchFromTrendingMovies {
  constructor() {
    this.page = 1;
  }

  async fetchTrending() {
    try {
      const { data } = await axios.get(`/trending/movie/week?api_key=${API_KEY}&page=${this.page}`);
      this.incrementPage();
      // console.log(this);
      return data.results;
    } catch (err) {
      () =>
        error({
          title: 'Error!',
          text: 'Loading Error',
        });
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// async function fetchTrending(pageValue = 1) {
//   try {
//     const { data } = await axios.get(`/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`);
//     return data.results;
//   } catch (err) {
//     () =>
//       error({
//         title: 'Error!',
//         text: 'Loading Error',
//       });
//     // console.log(response.err);
//     // throw err;
//   }
// }

// export { fetchTrending };

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const newPage = new FetchFromTrendingMovies();

const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 10,
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
const pagination = new Pagination(container, options);

const zz = document.querySelector('strong');
const a = document.querySelector('.tui-pagination');

a.addEventListener('click', onLoadMore);

function onLoadMore(e) {
  e.preventDefault();
  if (zz.classList.contains('tui-is-selected') === true) {
    let b = Number(e.target.textContent);
    console.log('Page #', b);
    newPage.page = b;
    console.log(newPage.page);
    newPage.fetchTrending();
    // console.log(newPage.fetchTrending);
  }
}
