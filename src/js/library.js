import { getAuth, onAuthStateChanged } from "firebase/auth";
import { filmFirebaseStorage } from "./film-firebase-storage";
import { filmLoader } from "./library-service";
import libraryRenderer from "./library-renderer";

const refs =
{
    btnWatched: document.querySelector('.js-button-watched-library'),
    btnQueue: document.querySelector('.js-button-queue-library'),
    message: document.querySelector('.list-library__no-movie'),
}

refs.btnWatched.addEventListener('click', (e) =>
{
    loadWatched();
    toggleButtons();
});

refs.btnQueue.addEventListener('click', (e) =>
{
    loadQueue();
    toggleButtons();
});

function tooggleMessage() 
{
    refs.message.classList.toggle('visually-hidden');
}

export function toggleButtons() 
{
    refs.btnWatched.classList.toggle("button--orange");
    refs.btnQueue.classList.toggle("button--orange");
}


export function loadWatched() 
{
    onAuthStateChanged(getAuth(), async (user) => 
    {
        if (user) 
        {
            const data = await filmFirebaseStorage.getAllWatchedListByUser();
            const filmsIdArr = Object.keys(data);
            if(filmsIdArr.length === 0) tooggleMessage();
            libraryRenderer.clear();
            filmsIdArr.map(async id => 
            {
                const film = await filmLoader.loadFilmById(Number(id))
                libraryRenderer.render(film);
            });
        } 
        else 
        {
          console.log('[LIBRARY] User is signed out...');
        }
      });
}

export function loadQueue() 
{
    onAuthStateChanged(getAuth(), async (user) => 
    {
        if (user) 
        {
            const data = await filmFirebaseStorage.getAllQueueListByUser();
            const filmsIdArr = Object.keys(data);
            if(filmsIdArr.length === 0) tooggleMessage();
            libraryRenderer.clear();
            filmsIdArr.map(async id => 
            {
                const film = await filmLoader.loadFilmById(Number(id))
                libraryRenderer.render(film);
            });
        } 
        else 
        {
          console.log('[LIBRARY] User is signed out...');
        }
      });
}

//загружаю список
loadWatched();


