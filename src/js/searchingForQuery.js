import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCard.hbs';
import { success, error } from './notify.js';
import { addSpinner, removeSpinner } from './spinner';
import {filmLoader} from './library-service';
import { doc } from '@firebase/firestore';
import { genreLoader } from './genres-service';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма
//ulListRef-список фильмов главной страницы
//currentPage-страница, с которой рендерим данные. По умолчанию 1
const formValueFef = document.querySelector(".search-button-js");
const ulListRef = document.querySelector(".gallery");
const searchFormInput = document.querySelector('.search-form__input');
const container = document.getElementById('tui-pagination-container');
let currentPage = 1;

//Считываю текст в инпуте 
formValueFef.addEventListener('click', getFormTextContent);

async function getFormTextContent(evt) {
    //Загружаю список жанров
//   await genreLoader.loadGenresList();
    //Выключаю автоматическую перезагрузку страницы
    evt.preventDefault();
    container.classList.remove('visually-hidden')

    if (searchFormInput.value != "") {
        addSpinner();
    
        const data = await searchForQuery(KEY, searchFormInput.value, currentPage);
        
        if (data.results.length > 0) {
            ulListRef.innerHTML = ``;
            
            //Общее кол-во найденных фильмов
            const total = data.total_results;
            const results = data.results;
            //Общее кол-во найденных страниц
            const pages = data.total_pages;
            data.results.map(film => 
                {
                    film.genres = genreLoader.getGenres(film.genre_ids);
                    // console.log("ЖАНРЫ = ", genres);
                    if (film.genres.length > 3) 
                    {
                        film.genres = [...film.genres.slice(0, 3), { id: '00000', name: 'other...' }];
                    }
                        ulListRef.insertAdjacentHTML('afterbegin', templateQuery(film));
                        searchFormInput.value = "";
                        removeSpinner();
                });
                           
        } else {
            ulListRef.innerHTML = ``;
            searchFormInput.value = "";
            container.classList.add('visually-hidden')

            ulListRef.insertAdjacentHTML('afterbegin', `<p class="image-list-empty library-text neon xz js_correct">ничего не найдено...</p><span class="js-my_bcg"></span> `);

            error({
                title: 'OOPS!',
                text: 'Nothing found!',
            });
            removeSpinner();
        }
    }
}
  