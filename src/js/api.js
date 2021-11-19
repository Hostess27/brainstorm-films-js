import axios from 'axios';
import { error } from './notify';
const API_KEY = "c69608b9bc251fbb333be1b2d7a49ce6";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// /trending/{media_type}/{time_window}

// Запрос за популярными фильмами
async function fetchTrending(pageValue=1) {
  try {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`,
    );
    // const { results, total_pages, page, total_results } = data;
    // console.log(data);
    // return { results, total_pages, page, total_results };
    return data;
    
  } catch (err) {
    error({
    title: 'Error!',
    text: 'Loading Error',
})
    
  }
    
  }
 
export {fetchTrending};


