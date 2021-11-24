// Import the functions you need from the SDKs you need
import { success, error} from '@pnotify/core';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU_jVwQj3ofKIjrlt71bYcLmK3IKEgkeU",
  authDomain: "brainstorm-films.firebaseapp.com",
  projectId: "brainstorm-films",
  storageBucket: "brainstorm-films.appspot.com",
  messagingSenderId: "1080764076592",
  appId: "1:1080764076592:web:581cf43ae3341da05793f5",
  measurementId: "G-9RYK671QQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

///////////////////////////////////////////////////////////////////////

const userRef = document.querySelector(".user-registration");
const emailRef = document.getElementById('exampleInputEmail1');
const passwordRef = document.getElementById('exampleInputPassword1');
const buttonRefIn = document.querySelector('.signIn');

//Проверка- авторизован ли уже пользователь ранее
onAuthStateChanged(auth, (user) => {
    if (user) {
        userRef.src = "https://img.icons8.com/ios-glyphs/30/ffffff/checked-user-male.png";
        userRef.title = `${user.email.match(/^([^@]*)@/)[1]} \n 2xCLICK FOR EXIT `;
        userRef.addEventListener('dblclick', exite);
    }
    else {
        userRef.src = "https://img.icons8.com/ios-glyphs/30/ffffff/add-user-male.png";
        buttonRefIn.nextElementSibling.addEventListener('click', getValuesRegister);
        buttonRefIn.addEventListener('click', getValues);
        
        userRef.addEventListener('click', toggleUser);
        // userRef.nextElementSibling.firstElementChild.addEventListener('mouseout',toggleUser)

       //Переключение появления формы при клике на иконку невошедшего пользователя
        function toggleUser() {
            userRef.nextElementSibling.classList.toggle('visually-hidden');
            emailRef.value = "";
            passwordRef.value = "";
                }


        function getValues(evt) {
            evt.preventDefault();
            const email = emailRef.value;
            const password = passwordRef.value;
    
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user;
                    success({
                        title: 'Success!',
                        text: 'Authorization Success',
                    })
                
                    userRef.nextElementSibling.classList.add('visually-hidden');
                    userRef.src = "https://img.icons8.com/ios-glyphs/30/ffffff/checked-user-male.png";
               
                    userRef.title = `${email.match(/^([^@]*)@/)[1]} \n 2xCLICK FOR EXIT `;

                    buttonRefIn.removeEventListener('click', getValues);
                    userRef.removeEventListener('click', toggleUser);
                })
                .catch(() => {
                    error({
                        title: 'Error!',
                        text: 'User not found. Register, please',
                    });
                });
        }
    }
})


// Функция выхода из кабинета пользователя
     function exite() {
         signOut(auth)
             .then(() => {
                userRef.src ="https://img.icons8.com/ios-glyphs/30/ffffff/add-user-male.png";
                userRef.title = "";
            }
            ).catch(() => {
            error({
                        title: 'Exit!',
                        text: 'Somthing bed',
                    });
            });
                    }

//Регистрация нового пользователя
function getValuesRegister(evt) {
    evt.preventDefault();
    
    const email = emailRef.value;
    const password = passwordRef.value;
    
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    
                    const user = userCredential.user;
                    userRef.src = "https://img.icons8.com/ios-glyphs/30/ffffff/add-user-male.png";
                    userRef.title = `${user.email.match(/^([^@]*)@/)[1]} \n 2xCLICK FOR EXIT`;
                    
                    success({
                        title: 'Success!',
                        text: 'Registration Success, press "Sign In"',
                    });
                    
                })
                .catch(() => {
                    error({
                        title: 'Error!',
                        text: 'Try another email',
                    })
                });
        }

