import throttle from "lodash.throttle";



function refreshPage() {
    document.location.reload();
  }
  
  function refreshPageOnClickFilmoteka () {
  
    const filmoteka = document.querySelector('.header-logo__site-name');
    filmoteka.addEventListener('click', refreshPage);
  }
  export default  refreshPageOnClickFilmoteka;




// const throttleFunc = throttle( (num) => {
//   console.log('num:', num), 3000;
// });
// throttleFunc(1);
// throttleFunc(2);