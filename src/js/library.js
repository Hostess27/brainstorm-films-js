import { getAuth, onAuthStateChanged } from "firebase/auth";
import { filmFirebaseStorage } from "./film-firebase-storage";
import { filmLoader } from "./library-service";
import libraryRenderer from "./library-renderer";
import {addSpinner, removeSpinner} from './spinner';

let eventSelectedWatchedTab = new Event('watchedTab');
let eventSelectedQueueTab = new Event('queueTab');

const refs =
{
    btnWatched: document.querySelector('.js-button-watched-library'),
    btnQueue: document.querySelector('.js-button-queue-library'),
    message: document.querySelector('.js-list-library__no-movie'),
    section: document.querySelector('.js-section-library'),
    btnLibrary: document.querySelectorAll('.js-nav-btn-library'),
    btnHome: document.querySelectorAll('.js-nav-btn-home'),
}


//Подписываемся на события изменения списков
document.addEventListener("watched", () => loadWatched());
document.addEventListener("queue", () => loadQueue());

for (let i = 0; i < refs.btnLibrary.length; i++) 
{
    refs.btnLibrary[i].addEventListener("click", () => 
    {
        refs.btnWatched.classList.add("button--orange");
        refs.btnQueue.classList.remove("button--orange");
        //загружаю список
        loadWatched();
    });
}

for (let i = 0; i < refs.btnHome.length; i++) 
{
    refs.btnHome[i].addEventListener("click", () => 
{
    refs.section.classList.remove('visually-hidden');
    refs.message.classList.add('visually-hidden');
});
}


refs.btnWatched.addEventListener('click', () =>
{
    document.dispatchEvent(eventSelectedWatchedTab);
    refs.section.classList.remove('visually-hidden');
    refs.message.classList.add('visually-hidden');
    loadWatched();
    refs.btnWatched.classList.add("button--orange");
    refs.btnQueue.classList.remove("button--orange");
});

refs.btnQueue.addEventListener('click', () =>
{
    document.dispatchEvent(eventSelectedQueueTab);
    refs.section.classList.remove('visually-hidden');
    refs.message.classList.add('visually-hidden');
    loadQueue();
    refs.btnWatched.classList.remove("button--orange");
    refs.btnQueue.classList.add("button--orange");
});

function loadWatched() 
{
    addSpinner();
    onAuthStateChanged(getAuth(), async (user) => 
    {
        if (user) 
        {
            const data = await filmFirebaseStorage.getAllWatchedListByUser();
            const filmsIdArr = Object.keys(data);
            if(filmsIdArr.length === 0)
            {
                refs.section.classList.add('visually-hidden');
                refs.message.classList.remove('visually-hidden');
            }
            libraryRenderer.clear();
            filmsIdArr.map(async id => 
            {
                const film = await filmLoader.loadFilmById(Number(id));
                if(film.genres.length >= 3)
                {
                    film.genres = [...film.genres.slice(0, 3), {id: "00000", name: "other..."}];
                }
                libraryRenderer.render(film);
            });
        } 
        else 
        {
          console.log('[LIBRARY] User is signed out...');
        }
        removeSpinner();
      });
}

function loadQueue() 
{
    addSpinner();
    onAuthStateChanged(getAuth(), async (user) => 
    {
        if (user) 
        {
            const data = await filmFirebaseStorage.getAllQueueListByUser();
            const filmsIdArr = Object.keys(data);
            if(filmsIdArr.length === 0)
            {
                refs.section.classList.add('visually-hidden');
                refs.message.classList.remove('visually-hidden');
            }
            libraryRenderer.clear();
            filmsIdArr.map(async id => 
            {
                const film = await filmLoader.loadFilmById(Number(id));
                if(film.genres.length >= 3)
                {
                    film.genres = [...film.genres.slice(0, 3), {id: "00000", name: "other..."}];
                }
                libraryRenderer.render(film);
            });
        } 
        else 
        {
          console.log('[LIBRARY] User is signed out...');
        }
        removeSpinner();
      });
}

refs.section.classList.remove('visually-hidden');
refs.message.classList.add('visually-hidden');