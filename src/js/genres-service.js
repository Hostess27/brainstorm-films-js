const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const API_KEY = 'c69608b9bc251fbb333be1b2d7a49ce6';

export const genreLoader =
{
    GENRES: [],

    async loadGenresList()
    {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        this.GENRES = data.genres;
    },

    getGenres(arrIds)
    {
        return this.GENRES.filter(genre => arrIds.some(id => id === genre.id));
    },
}