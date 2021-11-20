import axios from 'axios';
import { error } from './notify';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// Запрос за популярными фильмами
async function fetchTrending(pageValue = 1) {
  try {
    const { data } = await axios.get(`/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`);
    return data.results;
  } catch (err) {
    () =>
      error({
        title: 'Error!',
        text: 'Loading Error',
      });
    // console.log(response.err);
    // throw err;
  }
}

export { fetchTrending };
