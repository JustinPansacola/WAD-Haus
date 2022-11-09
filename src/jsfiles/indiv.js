// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// Vue instance
const main = Vue.createApp({

    data() {
        return {
            listing_dict: {},
            roomMates:[]
        }
    },

    methods: {},

    // created method to call db and store all the data before mounting to vue
    async created() {

        // listen for auth status change (For user authentication)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">Logout</a>`

                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                let params = (new URL(document.location)).searchParams
                let id = params.get("id")
                console.log(id)
                const docRef = doc(db, "listings", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.listing_dict = docSnap.data()
                    this.roomMates = this.listing_dict.roomMates
                    console.log(this.roomMates)
                    console.log(this.listing_dict.listingMrt)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                const loginnav = document.getElementById("loginnav");
                const registernav = document.getElementById("registernav");

                // if there is a user logged in, change navbar login and register to profile and logout
                loginnav.innerText = user.displayName;
                loginnav.href = "profilepage.html";
                registernav.innerText = "Logout";

                // if user clicks logout, sign them out
            
                document.getElementById("navbar_button_2").addEventListener("click", logOut);

                function logOut() {
                    auth.signOut().then(() => {
                        console.log("user signed out");
                        window.location = "logoutsuccess.html";
                    })
                }

            } else {
                // User is signed out
                // ...

                // redirect to errorpage.html if user is not logged in
                window.location = "errorpage.html";

            }
        });
    }
})
main.mount("#content"); // mount vue to html



// function map_details(current_id) {
//     const docRef = doc(db, "projects", current_id);
//     const docSnap = getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }