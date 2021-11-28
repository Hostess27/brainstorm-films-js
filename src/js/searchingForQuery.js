import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCard.hbs';
import { success, error } from './notify.js';
import { addSpinner, removeSpinner } from './spinner';
import {filmLoader} from './library-service';
import { doc } from '@firebase/firestore';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма
//ulListRef-список фильмов главной страницы
//currentPage-страница, с которой рендерим данные. По умолчанию 1
const formValueFef = document.querySelector(".search-button-js");
const ulListRef = document.querySelector(".gallery");
const searchFormInput = document.querySelector('.search-form__input');
const container = document.getElementById('tui-pagination-container');
const currentPage = 1;

//Считываю текст в инпуте 
formValueFef.addEventListener('click', getFormTextContent);

async function getFormTextContent(evt) {
    //Выключаю автоматическую перезагрузку страницы
    evt.preventDefault();

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
                searchFormInput.value = "";
                removeSpinner();
            });
                           
        } else {
            ulListRef.innerHTML = ``;
            searchFormInput.value = "";
            container.remove()
            ulListRef.insertAdjacentHTML('afterbegin', `<p class="image-list-empty library-text neon xz">ничего не найдено...</p> <img src ="/theatre1.1adc50f8.png" class="search-image_position"/>`);

            error({
                title: 'OOPS!',
                text: 'Nothing found!',
            });
            removeSpinner();
        }
    }
}
  