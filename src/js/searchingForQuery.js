import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCard.hbs';
import { success, error } from './notify.js';
import { addSpinner, removeSpinner } from './spinner';
import {filmLoader} from './library-service';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма
//ulListRef-список фильмов главной страницы
const formValueFef = document.querySelector(".search-button-js");
const ulListRef = document.querySelector(".gallery");
 
//Считываю текст в инпуте 
if (formValueFef != null) formValueFef.addEventListener('click', getFormTextContent);

async function getFormTextContent(evt) {
    addSpinner();
    
    evt.preventDefault();
    const data = await searchForQuery(KEY, formValueFef.previousElementSibling.value, "1");
    
    if (data.results.length > 0) {
        ulListRef.innerHTML = ``;
     //Общее кол-во найденных фильмов
             const total = data.total_results;
             const results = data.results;
    //Общее кол-во найденных страниц
             const pages = data.total_pages;
        
            // success({
            // title: 'Success!',
            // text: `Success! There are ${total} films in ${pages} page(s)`,
            // })
        
    //Получаю айдишники фильмов
    const filmsIdArr = data.results.map(film => film.id);
    await filmsIdArr.map(async id => {
        const film = await filmLoader.loadFilmById(Number(id));
        if (film.genres.length >= 3) {
        film.genres = [...film.genres.slice(0, 3), { id: '00000', name: 'other...' }];
        }

    
        ulListRef.insertAdjacentHTML('afterbegin', templateQuery(film));
        formValueFef.previousElementSibling.value = "";
        removeSpinner();
  });
                           
    } else {
            ulListRef.innerHTML = ``;
            formValueFef.previousElementSibling.value = "";
            ulListRef.insertAdjacentHTML('afterbegin', `<img src = "https://cdn.dribbble.com/users/1322726/screenshots/5695684/media/a01e5969a7eca6426880f81d8b15e0e8.gif" width="100%" height="100%"/>`);
        error({
            title: 'OOPS!',
            text: 'Nothing found!',
        });
        removeSpinner();
    }
}
  