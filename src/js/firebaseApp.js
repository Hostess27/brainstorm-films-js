import * as firebase from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyDU_jVwQj3ofKIjrlt71bYcLmK3IKEgkeU",
    authDomain: "brainstorm-films.firebaseapp.com",
    databaseURL: "https://brainstorm-films-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "brainstorm-films",
    storageBucket: "brainstorm-films.appspot.com",
    messagingSenderId: "1080764076592",
    appId: "1:1080764076592:web:581cf43ae3341da05793f5"
    };
firebase.initializeApp(firebaseConfig);
export default firebase;