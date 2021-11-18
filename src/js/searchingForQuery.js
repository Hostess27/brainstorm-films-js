import searchForQuery from './responseForQuery';
import templateQuery from '../templates/mainListOfFilms.hbs'

//КОНСТАНТА- ключ к АPI
const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

//formValueFef-форма временная!!
//ulListRef-список фильмов главной страницы- постоянный!!
const formValueFef = document.querySelector(".search-button");
const ulListRef = document.querySelector(".main-container");

//Считываю текст в инпуте 
formValueFef.addEventListener('click',getFormTextContent);


function getFormTextContent(evt) {
    evt.preventDefault();
    if (formValueFef.previousElementSibling.value != "") {
    
    ulListRef.innerHTML = ``;
        searchForQuery(KEY, formValueFef.previousElementSibling.value, "1")
        .then((data) => {
            console.log(data.results);
            markupBeforeend(data.results);
        });   
   }
    
    
}

function markupBeforeend(data) { 
    
    const listMarkup = createMarkup(data, templateQuery);
    ulListRef.insertAdjacentHTML('afterbegin', listMarkup);
    }
    
//Данные data сливаем в template с Handlebars-a   
function createMarkup(data,template) {
            return data.map(template).join('');
}