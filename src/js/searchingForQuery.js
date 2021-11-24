import searchForQuery from './responseForQuery';
import templateQuery from '../templates/filmCard.hbs';
import { success, error } from './notify.js';

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма
//ulListRef-список фильмов главной страницы
const formValueFef = document.querySelector(".search-button-js");
const ulListRef = document.querySelector(".gallery");

//Считываю текст в инпуте 
if(formValueFef!=null)formValueFef.addEventListener('click',getFormTextContent);



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
                // success({
                // title: 'Success!',
                // text: `Success! There are ${total} films in ${pages} page(s)`,
                // })
                    ulListRef.insertAdjacentHTML('afterbegin', templateQuery(results));
                } else {
                    formValueFef.previousElementSibling.value = "";
                    ulListRef.insertAdjacentHTML('afterbegin', `<img src = "https://cdn.dribbble.com/users/1322726/screenshots/5695684/media/a01e5969a7eca6426880f81d8b15e0e8.gif" width="100%" height="100%"/>`);
                    error({
                    title: 'OOPS!',
                    text: 'Nothing found!',
                    })
                }
            });
    }
}