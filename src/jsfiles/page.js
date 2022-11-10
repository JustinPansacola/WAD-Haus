// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
// import {mitt} from './mitt';
//import $Scriptjs from './scriptjs';

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


// Vue instance
var content = Vue.createApp({
    data() {
        return {
            location_listings: ["North", "South", "East", "West", "Central"], // initialize listings array to store all listings from db once created method is called
            room_type_listings: [], //taken from db
            occupancy_listings: ["Single", "Double"],
            price_listings: ["<$800/month", "<$1000/month", "<$1200/month", "<$1500/month"],
            listings_dict: {},
            location_selected_v: "Location",
            roomtype_selected_v: "Room Type",
            occupancy_selected_v: "Occupancy",
            price_selected_v: "Price",
            filtered_listings_dict: {},
            search_filter: false
        }
    },

    methods: {
        myPreference() {
            console.log("in myPreference()")
            this.search_filter = true

            this.filtered_listings_dict = {}

            let location_selected = this.location_selected_v
            let roomtype_selected = this.roomtype_selected_v
            let occupancy_selected = this.occupancy_selected_v
            let price_selected = (this.price_selected_v).replace(/\D/g, '')

            let listings_arr = Object.entries(this.listings_dict)
            console.log(listings_arr)

            for (let i = 0; i < listings_arr.length; i++) {
                console.log(listings_arr[i])
                let details = listings_arr[i][1]

                if (details.location.toLowerCase() == location_selected.toLowerCase() &&
                    details.roomType.toLowerCase() == roomtype_selected.toLowerCase() &&
                    details.roomOccupancy.toLowerCase() == occupancy_selected.toLowerCase() &&
                    Number(details.price) <= Number(price_selected)) {
                    
                    this.filtered_listings_dict[listings_arr[i][0]] = details
                    console.log(details)
                }
            }
            console.log(this.filtered_listings_dict)
            //this.listings_dict = this.filtered_listings_dict
        }
    },

    async created() {

        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const uid = user.uid;
                console.log(user);
                console.log(uid)

                console.log("Hello!")
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">logout</a>`

            }
            else
            {
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="login-fad.html">login</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="register-fad.html">register</a>`

            }
            });

        const colRef = collection(db, "listings");
        // const docsSnap = await getDocs(colRef);

        try {
            const docsSnap = await getDocs(colRef);

            if (docsSnap.docs.length > 0) {
                docsSnap.forEach(doc => {
                    this.listings_dict[doc.id] = doc.data()
                    // console.log(doc.data().roomType)

                    let current_roomType = doc.data().roomType
                    if (!this.room_type_listings.includes(current_roomType)) {
                        this.room_type_listings.push(current_roomType)
                    }
                })
                console.log(this.listings_dict)
            }
        } catch (error) {
            console.log(error);
        }
    }
})
content.mount('#content')