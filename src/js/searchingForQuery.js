import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCard.hbs';
import { success, error } from './notify.js';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма временная!!
//ulListRef-список фильмов главной страницы- постоянный!!
const formValueFef = document.querySelector(".search-button");
const ulListRef = document.querySelector(".gallery");

//Считываю текст в инпуте 
formValueFef.addEventListener('click',getFormTextContent);


function getFormTextContent(evt) {
    evt.preventDefault();
    if (formValueFef.previousElementSibling.value != "") {
    
        ulListRef.innerHTML = ``;
        searchForQuery(KEY, formValueFef.previousElementSibling.value, "1")
            .then((data) => {
                const total = data.total_results;
                const results = data.results;
                const pages = data.total_pages;
                if (results.length > 0) {
                success({
                title: 'Success!',
                text: `Success! There are ${total} films in ${pages} page(s)`,
                })
                    ulListRef.insertAdjacentHTML('afterbegin', templateQuery(results));
                } else {
                    formValueFef.previousElementSibling.value = "";
                    error({
                    title: 'Error!',
                    text: 'Nothing found!',
                    })
                }
            });
    }
}