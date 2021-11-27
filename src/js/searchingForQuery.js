import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCardcopy.hbs';
import { success, error } from './notify.js';
import {addSpinner, removeSpinner} from './spinner';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма
//ulListRef-список фильмов главной страницы
const formValueFef = document.querySelector(".search-button-js");
const ulListRef = document.querySelector(".gallery");

//Считываю текст в инпуте 
if (formValueFef != null) formValueFef.addEventListener('click', getFormTextContent);

function getFormTextContent(evt) {
    evt.preventDefault();
    
    if (formValueFef.previousElementSibling.value != "") {
        ulListRef.innerHTML = ``;
        addSpinner();
        searchForQuery(KEY, formValueFef.previousElementSibling.value, "1")
            .then((data) => {
                //Общее кол-во найденных фильмов
                const total = data.total_results;
                const results = data.results;
                //Общее кол-во найденных страниц
                const pages = data.total_pages;
                
                if (results.length > 0) {
                // success({
                // title: 'Success!',
                // text: `Success! There are ${total} films in ${pages} page(s)`,
                // })
                    ulListRef.insertAdjacentHTML('afterbegin', templateQuery(data.results));
                    formValueFef.previousElementSibling.value = "";
                } else {
                    formValueFef.previousElementSibling.value = "";
                    ulListRef.insertAdjacentHTML('afterbegin', `<img src = "https://cdn.dribbble.com/users/1322726/screenshots/5695684/media/a01e5969a7eca6426880f81d8b15e0e8.gif" width="100%" height="100%"/>`);
                    error({
                    title: 'OOPS!',
                    text: 'Nothing found!',
                    })
                }
                removeSpinner();
            });
    }
}
