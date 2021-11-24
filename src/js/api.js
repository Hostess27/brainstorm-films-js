import axios from 'axios';
import { error } from './notify';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// Запрос за популярными фильмами


export default class FetchFromTrendingMovies {
  constructor(){
    this.page = 1;
  }


  async  fetchTrending() {
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

get clickPage() {
    return this.page;
  }

  set clickPage(newPage) {
    this.page = newPage;
  }
}



