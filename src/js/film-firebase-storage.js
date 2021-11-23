import { initializeApp, firebase } from "firebase/app";
import 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, getDoc, query, where, getDocs, deleteField } from "firebase/firestore"
import { success, error, defaults, defaultModules, Stack } from '@pnotify/core';

class FirebaseStorage
{
    #firebaseConfig = {
      apiKey: "AIzaSyDU_jVwQj3ofKIjrlt71bYcLmK3IKEgkeU",
      authDomain: "brainstorm-films.firebaseapp.com",
      databaseURL: "https://brainstorm-films-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "brainstorm-films",
      storageBucket: "brainstorm-films.appspot.com",
      messagingSenderId: "1080764076592",
      appId: "1:1080764076592:web:581cf43ae3341da05793f5"
      };

      #app;
      #auth;
      #database;
      #userId;
      #WATCHED_LIST = "watched";
      #QUEUE_LIST = "queue";

      constructor()
      {
            // Initialize Firebase
        this.#app = initializeApp(this.#firebaseConfig);
        this.#auth = getAuth();
        this.#database = getFirestore(this.#app);
      }

      checkUserLogin()
      {
        if(!this.#auth.currentUser)
        {
          this.showError();
          return false;
        }
        return true;
      }

      async addOrRemoveWatchedFilm(filmId, button)
      {
        if(await this.findFilmWatchedById(filmId, button))
        {
          await this.removeFromWatched(filmId, button);
        }
        else
        {
          await this.addToWatched(filmId, button);
        }
      }

      async addToWatched(filmId, button)
      {
          if(this.checkUserLogin())
          {
            try {
              const userRef = collection(this.#database, this.#auth.currentUser.uid);
              const watchedRef = doc(userRef, this.#WATCHED_LIST);
              await setDoc(watchedRef, { [filmId]: filmId }, {merge: true});
              button.innerText = "REMOVE FROM WATCHED";
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
      }

      async removeFromWatched(filmId, button)
      {
        if(this.checkUserLogin())
          {
            try {
              const userRef = collection(this.#database, this.#auth.currentUser.uid);
              const watchedRef = doc(userRef, this.#WATCHED_LIST);
              const docSnap = await getDoc(watchedRef);
              const data = docSnap.data();
              delete data[filmId];
              await updateDoc(watchedRef, data, {merge: true});
              button.innerText = "ADD TO WATCHED";



              // const userRef = collection(this.#database, this.#auth.currentUser.uid);
              // const watchedRef = doc(userRef, this.#WATCHED_LIST);
              // let updates = {};
              // updates[filmId] = deleteField();             
              // await updateDoc(watchedRef, updates, {merge: true});
              // button.innerText = "ADD TO WATCHED";
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
      }

      async findFilmWatchedById(filmId, button)
      {
        const watchedRef = doc(this.#database, this.#auth.currentUser.uid, this.#WATCHED_LIST);
        const docSnap = await getDoc(watchedRef);
        button.innerText = "ADD TO WATCHED";
        if (!docSnap.exists()) return false;
        if(docSnap.get(filmId))
        {
          button.innerText = "REMOVE FROM WATCHED";
          return true;
        }
      }

      async getAllWatchedListByUser()
      {
        const watchedRef = doc(this.#database, this.#auth.currentUser.uid, this.#WATCHED_LIST);
        const docSnap = await getDoc(watchedRef);

        if (!docSnap.exists()) return null;
        return docSnap.data();
      }

      removeFromWatched()
      {

      }

      addToQueue()
      {

      }

      removeFromQueue()
      {

      }

      showError()
      {
        error({
            title: 'Not Authorized!',
            text: 'You must be logged in to add movies to "Watched" and "Queue"!',
        });
      }
}

export default new FirebaseStorage();