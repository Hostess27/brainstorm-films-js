// import { filmLoader } from "./modal-service";
// import ModalFilmRenderer from "./modal-renderer";
// import filmFirebaseStorage from "./film-firebase-storage";

// (() => 
// {
//     const refs = 
//     {
//       closeModalBtn: document.querySelector('[data-modal-close]'),
//       modal: document.querySelector('[data-modal]'),
//       gallery: document.querySelector('.js-main-container'),
//       backdrop: document.querySelector('.backdrop'),
//     };

//     let addToWatched;
//     let addToQueue;
//     let filmId;

//     // updateBtnWatched();
  
//     refs.closeModalBtn.addEventListener('click', toggleModal);
//     refs.gallery.addEventListener('click', onFilmSelected);
  
//     function toggleModal() 
//     {
//       document.body.classList.toggle("modal-open");
//       refs.modal.classList.toggle('backdrop--is-hidden');
//     }

//     async function renderFilmDetails(id)
//     {
//       const data = await filmLoader.loadFilmById(id);
//       ModalFilmRenderer.clear();
//       ModalFilmRenderer.render(data);
//       toggleModal();
//       //buttons
//       addToWatched = document.querySelector('#add-to-watched');
//       addToQueue = document.querySelector('#add-to-queue');
//       filmId = document.querySelector('.film-detail_id').dataset.id;
    

//       addToWatched.addEventListener('click', async () =>
//       {
//         await filmFirebaseStorage.addToWatched(filmId, addToWatched);
//       });

//       addToQueue.addEventListener('click', async () =>
//       {
//         await filmFirebaseStorage.addToQueue(filmId, addToQueue);
//       });

//       await filmFirebaseStorage.findFilmWatchedById(filmId, addToWatched);
//       await filmFirebaseStorage.findFilmQueueById(filmId, addToQueue);
//     }


//     async function onFilmSelected(evt)
//     {
//       const element = evt.target.closest('.gallery__item');
//       if(element && element.dataset.id != undefined)
//       {
//         console.log("ID = ", element.dataset.id);
//         console.log(await filmLoader.loadFilmById(element.dataset.id));
//         renderFilmDetails(element.dataset.id);
//       }
//     }

//     refs.backdrop.addEventListener('click', evt =>
//     {
//       const element = evt.target.closest('.modal');
//       if(element) return;
//        toggleModal();
//     });

//     //Слушатель Закрытие подалки по Esc
//     window.addEventListener('keydown', evt =>
//     {
//         if(evt.code === "Escape" && document.body.classList.contains('modal-open')) toggleModal();
//     });
//   })();