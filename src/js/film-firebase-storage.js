import { initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, getDoc, query, where, getDocs, deleteField, deleteDoc } from "firebase/firestore"
import { success, error, defaults, defaultModules, Stack } from '@pnotify/core';

class FirebaseStorage
{
      #firebaseConfig = {
        apiKey: "AIzaSyDU_jVwQj3ofKIjrlt71bYcLmK3IKEgkeU",
        authDomain: "brainstorm-films.firebaseapp.com",
        projectId: "brainstorm-films",
        storageBucket: "brainstorm-films.appspot.com",
        messagingSenderId: "1080764076592",
        appId: "1:1080764076592:web:581cf43ae3341da05793f5",
        measurementId: "G-9RYK671QQS"
      };

      #app;
      #auth;
      #database;
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

      async addToWatched(filmId, button)
      {
          if(this.checkUserLogin())
          {
            try {
              const isFinded = await this.findFilmWatchedById(filmId, button);
              const method = isFinded? updateDoc : setDoc;
              const data = isFinded? deleteField() : filmId;
              const userRef = collection(this.#database, this.#auth.currentUser.uid);
              const watchedRef = doc(userRef, this.#WATCHED_LIST);
              await method(watchedRef, { [filmId]: data }, {merge: true});
              this.findFilmWatchedById(filmId, button)
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

      async addToQueue(filmId, button)
      {
          if(this.checkUserLogin())
          {
            try {
              const isFinded = await this.findFilmQueueById(filmId, button);
              const method = isFinded? updateDoc : setDoc;
              const data = isFinded? deleteField() : filmId;
              const userRef = collection(this.#database, this.#auth.currentUser.uid);
              const queuedRef = doc(userRef, this.#QUEUE_LIST);
              await method(queuedRef, { [filmId]: data }, {merge: true});
              this.findFilmQueueById(filmId, button)
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
      }

      async findFilmQueueById(filmId, button)
      {
        const queuedRef = doc(this.#database, this.#auth.currentUser.uid, this.#QUEUE_LIST);
        const docSnap = await getDoc(queuedRef);
        button.innerText = "ADD TO QUEUE";
        if (!docSnap.exists()) return false;
        if(docSnap.get(filmId))
        {
          button.innerText = "REMOVE FROM QUEUE";
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

      async getAllQueueListByUser()
      {
        const queuedRef = doc(this.#database, this.#auth.currentUser.uid, this.#QUEUE_LIST);
        const docSnap = await getDoc(queuedRef);

        if (!docSnap.exists()) return null;
        return docSnap.data();
      }

      showError()
      {
        error({
            title: 'Not Authorized!',
            text: 'You must be logged in to add/remove movies to "Watched" and "Queue"!',
        });
      }
}

const filmFirebaseStorage = new FirebaseStorage();

export { filmFirebaseStorage }