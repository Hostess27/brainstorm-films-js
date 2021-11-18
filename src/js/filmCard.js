import searchForQuery from'../js/responseForQuery.js';
import filmCard from '../templates/filmCard.hbs';

const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

const refs = {
    galleryList: document.querySelector('.main-container')
};

const apendFilmCardMarkup = searchForQuery(KEY, "Titanic", "1").then(({ results }) => {
    return results;
}).then((results)=> {
    if (results.length > 0) {
        refs.galleryList.insertAdjacentHTML('beforeend', filmCard(results));
    } else {
        alert('Nothing found!');
    };
});

export default apendFilmCardMarkup;