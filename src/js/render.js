// import cardTemplate from "../templates/cardTemplates.hbs" 



// Ожидает массив обьектов и рендерит карточки фильмов
const refs = {
    mainContainer: document.querySelector(".js-main-container"),
   
  };
  
export const renderGalleryTrendingMovie = function (objects) {
  refs.mainContainer.innerHTML = '';
  refs.mainContainer
      .insertAdjacentHTML('beforeend', cardTemplate(objects));

    //    refs.mainContainer.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    //   });
  };



  