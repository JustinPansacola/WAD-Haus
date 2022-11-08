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

// Vue instance
const main = Vue.createApp({

    data() {
        return {
            firstselected: "0", // show first listing from db as default selected value
            secondselected: "1", // show second listing from db as default selected value
            location_listings: ["North", "South", "East", "West", "Central"], // initialize listings array to store all listings from db once created method is called
            room_type_listings: ["Studio", "1 Bedroom Apartment", "Bedroom (Private Bathroom)", "Bedroom (Common Bathroom)"],
            occupancy_listings: ["Single", "Double"],
            price_listings: ["<$800/month", "<$1000/month", "<$1200/month", "<$1500/month"],

            listings_dict: {}
        }
    },

    methods: {},

    // created method to call db and store all the data before mounting to vue
    async created() {
        const colRef = collection(db, "listings");
        const docsSnap = await getDocs(colRef);

        try {
            const docsSnap = await getDocs(colRef);
            if (docsSnap.docs.length > 0) {
                docsSnap.forEach(doc => {
                    console.log(doc.data());
                    console.log(doc.id);

                    this.listings_dict[doc.id] = doc.data()
                    console.log(this.listings_dict)
                })
            }
        } catch (error) {
            console.log(error);
        }

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