// Import the functions you need from the SDKs you need
import { success, error, defaults, defaultModules, Stack } from '@pnotify/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// const analytics = getAnalytics(app);
const auth = getAuth();
const user = auth.currentUser;

const userRef = document.querySelector(".user-registration");



onAuthStateChanged(auth, (user) => {
    if (user) {
        userRef.src = "https://img.icons8.com/color/48/000000/test-lab.png";
                    userRef.width = "50";
        userRef.title = `${user.email}"2xCLICK FOR EXIT"`;
        userRef.addEventListener('dblclick', exite);
        function exite() {
           
            signOut(auth).then(() => {
  userRef.src = "https://img.icons8.com/external-bearicons-gradient-bearicons/64/000000/external-user-essential-collection-bearicons-gradient-bearicons.png";
                userRef.width = "45";
                userRef.title = "";
                
}).catch((error) => {
  // An error happened.
});
       }
        
        
    } else {
        const emailRef = document.getElementById('exampleInputEmail1');
        const passwordRef = document.getElementById('exampleInputPassword1');
        const formRef = document.getElementById('form-registration');
        const buttonRefIn = document.querySelector('.signIn');
        const buttonRefReg = document.querySelector('.register');
        

        buttonRefIn.addEventListener('click', getValues);
        buttonRefReg.addEventListener('click', getValuesRegister);
        userRef.addEventListener('click', toggleUser)

        function toggleUser() {
            formRef.classList.toggle('visually-hidden')
        }
        //auth

        function getValues(evt) {
            evt.preventDefault();
            const email = emailRef.value;
            const password = passwordRef.value;
    
            console.log(email);

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    success({
                        title: 'Success!',
                        text: 'Authorization Success',
                    })
                    //userRef.textContent = `${email}`;
                    formRef.classList.add('visually-hidden');
                    userRef.src = "https://img.icons8.com/color/48/000000/test-lab.png";
                    userRef.width = "50";
                    userRef.title = `${email}"2xCLICK FOR EXIT" `;

                    buttonRefIn.removeEventListener('click', getValues);

                    // buttonRefReg.removeEventListener('click', getValuesRegister);
                    userRef.removeEventListener('click', toggleUser);

                    console.log(user)
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    error({
                        title: 'Error!',
                        text: 'User not found. Register, please',
                    });
                });

        }

        //register
        
    }
})


function getValuesRegister(evt) {
    evt.preventDefault();
    
    const emailRef = document.getElementById('exampleInputEmail1');
    const passwordRef = document.getElementById('exampleInputPassword1');
    
            const email = emailRef.value;
            const password = passwordRef.value;
            console.log(email);
    
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    
                    const user = userCredential.user;
                    success({
                        title: 'Success!',
                        text: 'Registration Success, press "Sign In"',
                    });
                    userRef.src = "https://img.icons8.com/external-bearicons-gradient-bearicons/64/000000/external-user-essential-collection-bearicons-gradient-bearicons.png";
                userRef.width = "45";
                userRef.title = `${user.email}"2xCLICK FOR EXIT"`;
                    // buttonRefReg.removeEventListener('click', getValuesRegister); 
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    error({
                        title: 'Error!',
                        text: 'Try another email',
                    })
                });
        }

