// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics, } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBpfCmk9rSs6B6XETYCJcjOyz9qKqKU6Vw",
  authDomain: "haus-e1dc4.firebaseapp.com",
  projectId: "haus-e1dc4",
  storageBucket: "haus-e1dc4.appspot.com",
  messagingSenderId: "1021237511460",
  appId: "1:1021237511460:web:7c2a7974f7799ee0a79fb1",
  measurementId: "G-NMREBXS3VT"
});


// Initialize Firebase
const auth = getAuth(firebaseConfig)

onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log("Hello!")
    }
    else{
        console.log("No user")
    }
})