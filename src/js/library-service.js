const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';

export const filmLoader =
{
    async loadFilmById(id)
    {
        const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    }
}