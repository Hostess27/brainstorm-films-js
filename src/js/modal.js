import { filmLoader } from "./modal-service";
import { videoLoader } from "./modal-service";
import ModalFilmRenderer from "./modal-renderer";
import { filmFirebaseStorage } from "./film-firebase-storage";

(() => 
{
  //События о изменениях в списках
  let eventWatchedChanged = new Event("watched");
  let eventQueueChanged = new Event("queue");

    const refs = 
    {
      closeModalBtn: document.querySelector('[data-modal-close]'),
      modal: document.querySelector('[data-modal]'),
      gallery: document.querySelectorAll('.js-main-container'),
      backdrop: document.querySelector('.backdrop'),
      trailer: document.getElementById('#trailer'),
    };

    refs.trailer.onload = () => console.log('refs.trailer = ', refs.trailer);

    let addToWatched;
    let addToQueue;
    let filmId;

    let tabWatched = true;
    let tabQueue = false;

    //Подписываемся на события Переключения между списками в Library
    document.addEventListener("watchedTab", () => 
    {
      tabWatched = true;
      tabQueue = false;
    });
    document.addEventListener("queueTab", () =>  
    {
      tabWatched = false;
      tabQueue = true;
    });

    refs.closeModalBtn.addEventListener('click', toggleModal);
    for (let i = 0; i < refs.gallery.length; i++) 
    {
      refs.gallery[i].addEventListener('click', onFilmSelected);
    }
  
    function toggleModal() 
    {
      document.body.classList.toggle("modal-open");
      refs.modal.classList.toggle('backdrop--is-hidden');
    }

    async function renderFilmDetails(id)
    {
      const data = await filmLoader.loadFilmById(id);
      //Загружаю трейлер
      const trailer = await videoLoader.loadVideoById(id);
      ModalFilmRenderer.clear();
      ModalFilmRenderer.render({...data, trailer: trailer.results[0].key});
      toggleModal();
      //buttons
      addToWatched = document.querySelector('#add-to-watched');
      addToQueue = document.querySelector('#add-to-queue');
      filmId = document.querySelector('.film-detail_id').dataset.id;
    

      addToWatched.addEventListener('click', async () =>
      {
        await filmFirebaseStorage.addToWatched(filmId, addToWatched);
        if(tabWatched) 
        {
          document.dispatchEvent(eventWatchedChanged);
        }
      });

      addToQueue.addEventListener('click', async () =>
      {
        await filmFirebaseStorage.addToQueue(filmId, addToQueue);
        if(tabQueue) 
        {
          document.dispatchEvent(eventQueueChanged);
        }
      });

      await filmFirebaseStorage.findFilmWatchedById(filmId, addToWatched);
      await filmFirebaseStorage.findFilmQueueById(filmId, addToQueue);
    }


    async function onFilmSelected(evt)
    {
      const element = evt.target.closest('.gallery__item');
      if(element && element.dataset.id != undefined)
      {
        renderFilmDetails(element.dataset.id);
      }
    }

    refs.backdrop.addEventListener('click', evt =>
    {
      const element = evt.target.closest('.modal');
      if(element) return;
      toggleModal();
      refs.trailer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });

    //Слушатель Закрытие подалки по Esc
    window.addEventListener('keydown', evt =>
    {
        if(evt.code === "Escape" && document.body.classList.contains('modal-open')) toggleModal();
    });
  })();