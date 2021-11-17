import './sass/main.scss';
import searchForQuery from'./search.js';

const KEY = "c69608b9bc251fbb333be1b2d7a49ce6";

    searchForQuery(KEY, "Titanic", "1").then((o)=>console.log(o));
