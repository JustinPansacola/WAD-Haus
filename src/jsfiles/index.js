// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics, } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArV04a4S8V0wGmhYuFbo4-kXLjmrxLJc8",
    authDomain: "haus-testing.firebaseapp.com",
    projectId: "haus-testing",
    storageBucket: "haus-testing.appspot.com",
    messagingSenderId: "397764373658",
    appId: "1:397764373658:web:f662c290beee1f4a640323",
    measurementId: "G-15BEF38096"
};


// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();


onAuthStateChanged(auth, user =>{
    // if no user logged in, display "login" and "register" elements
    if(user != null){
        console.log("Hello!")
        document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
        document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);">Logout</a>`
    }
    else{ // if user is logged, display "username" and "logout" elements
        console.log("No user")
        document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="login-fad.html">login</a>`
        document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="register-fad.html">register</a>`
    }

    // if user clicks logout, sign them out
    document.getElementById("navbar_button_2").addEventListener("click", logOut);

    function logOut() {
        auth.signOut().then(() => {
            console.log("user signed out");
        })
    }
})


function newUserData(userID, name, lastname, gender, race, religion, email){
    const db = getDatabase(firebaseConfig)
    const reference = ref(db, 'Users/', userID);

    set (reference, {
        userFirstName: name,
        userLastName: lastname,
        userEmail: email,
        gender: gender,
        race: race,
        religion: religion
    })
}

newUserData(7561, "Randy", "Orton", "M", "American", "Freethinker", "ro@gmail.com")

