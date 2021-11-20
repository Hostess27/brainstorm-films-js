import { filmLoader } from "./modal-service";
import ModalFilmRenderer from "./modal-renderer";
import filmStorageListService from "./film-storage-list-service";

(() => {
    const refs = 
    {
      closeModalBtn: document.querySelector('[data-modal-close]'),
      modal: document.querySelector('[data-modal]'),
      gallery: document.querySelector('.js-main-container'),
    };

    let addToWatched;
    let addToQueue;
    let filmId;

    // updateBtnWatched();
  
    refs.closeModalBtn.addEventListener('click', toggleModal);
    refs.gallery.addEventListener('click', onFilmSelected);
  
    function toggleModal() 
    {
      document.body.classList.toggle("modal-open");
      refs.modal.classList.toggle('backdrop--is-hidden');
    }

    async function renderFilmDetails(id)
    {
      const data = await filmLoader.loadFilmById(id);
      ModalFilmRenderer.clear();
      ModalFilmRenderer.render(data);
      toggleModal();
      //buttons
      addToWatched = document.querySelector('#add-to-watched');
      addToQueue = document.querySelector('#add-to-queue');
      filmId = document.querySelector('.film-detail_id').dataset.id;

      addToWatched.addEventListener('click', () =>
      {
        filmStorageListService.addFilmToWatchedList(filmId, addToWatched);
      });

      addToQueue.addEventListener('click', () =>
      {
        filmStorageListService.addFilmToQueueList(filmId, addToQueue);
      });

      filmStorageListService.updateWatchedBtn(filmId, addToWatched);
      filmStorageListService.updateQueueBtn(filmId, addToQueue);
    }


    async function onFilmSelected(evt)
    {
      const element = evt.target.closest('.gallery__item');
      if(element && element.dataset.id != undefined)
      {
        console.log("ID = ", element.dataset.id);
        console.log(await filmLoader.loadFilmById(element.dataset.id));
        renderFilmDetails(element.dataset.id);
      }
    }
  })();