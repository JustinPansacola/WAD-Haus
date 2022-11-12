import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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

const colRef = collection(db, "listings");
const docsSnap = await getDocs(colRef);


let listings_latlng_dict = {}
// let listings_dict = {}

// try {
//     const docsSnap = await getDocs(colRef);

//     if (docsSnap.docs.length > 0) {
//         docsSnap.forEach(doc => {
//             listings_latlng_dict[doc.id] = { "lat": doc.data().lat, "lng": doc.data().lng }
//             listings_dict[doc.id] = doc.data()
//         })
//         console.log(listings_latlng_dict)
//     }
// } catch (error) {
//     console.log(error);
// }

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        console.log(uid)

        // pull favourite listings from db
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let roomlist = {};
        let favourites = ""

        if (docSnap.exists()) {

            favourites = docSnap.data().favourites;

            console.log(favourites)

            if (typeof favourites == 'undefined') {
                window.location = "nofavouritespage.html";
            }

        } else {
            // doc.data() will be undefined in this case
        }

        console.log(typeof (favourites))

        let counter = 1
        for (let fav in favourites) {
            console.log(favourites[fav]);

            const docRef = doc(db, favourites[fav]);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                console.log(docSnap.data().lat)
                console.log(docSnap.data().lng)
                listings_latlng_dict[counter] = { "lat": docSnap.data().lat, "lng": docSnap.data().lng }
                counter++

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        console.log(listings_latlng_dict)
    }


    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaO7dcyKs4biX1nmInftecJWjf8py7mRM&callback=initMap';
    script.async = true;

    // Attach your callback function to the `window` object
    function initMap() {

        // JS API is loaded and available
        var location = { lat: 1.290270, lng: 103.851959 };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 10, center: location });
        // The marker, positioned at location
        // var marker = new google.maps.Marker({ position: location, map: map });

        for (const [key, value] of Object.entries(listings_latlng_dict)) {
            // console.log(key, value)
            // console.log(value.lat)
            // var marker = new google.maps.Marker({ position: { lat: value.lat, lng: value.lng }, map: map });
            // addMarker({ lat: Number(value.lat), lng: Number(value.lng) }, map)
            new google.maps.Marker({
                position: { lat: Number(value.lat), lng: Number(value.lng) },
                label: key,
                map: map,
            });
        }
    };

    window.initMap = initMap
    // Append the 'script' element to 'head'
    document.head.appendChild(script);
});