// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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

let offeredprice = "";

// Vue instance
const main = Vue.createApp({

    data() {
        return {
            firstselected: "0", // show first listing from db as default selected value
            secondselected: "1", // show second listing from db as default selected value
            listings: "", // initialize listings array to store all listings from db once created method is called
            dataLoaded: false,
            favourites: []
        }
    },

    methods: {

        // disallow user to click chat button if not logged in
        goChat(val) {
            console.log(val);
            window.location = "chat.html?address=" + val;
        },

        sendfirstApplication(landlord, listingaddress, price) {
            var myModal = new bootstrap.Modal(document.getElementById("firstapplication"), { keyboard: false })

            let finalhtml = ``;

            finalhtml += `Landlord: ${landlord} <br> Address: ${listingaddress}`;

            console.log(price);
            document.getElementById("modal-body-first").innerHTML = finalhtml;
            
            document.getElementById("modal-price-first").setAttribute("placeholder", price);

            myModal.show()
        },

        sendsecondApplication(landlord, listingaddress, price) {
            var myModal = new bootstrap.Modal(document.getElementById("secondApplication"), { keyboard: false })

            let finalhtml = ``;

            finalhtml += `Landlord: ${landlord} <br> Address: ${listingaddress}`;

            console.log(price);
            document.getElementById("modal-body-second").innerHTML = finalhtml;
            
            document.getElementById("modal-price-second").setAttribute("placeholder", price);

            myModal.show()
        },

        submitfinalApplication(address, landlord){

            offeredprice = document.getElementById("modal-price-first").value;
            console.log(address);
            console.log(landlord);

            var myModal = new bootstrap.Modal(document.getElementById("finalapplication"), { keyboard: false })
            // var firstmyModal = new bootstrap.Modal(document.getElementById("firstapplication"), {keyboard: false})

            // firstmyModal.hide()

            // document.getElementById("firstapplication").remove();

            document.getElementById("modal-body-final").innerHTML = `Listing Address: ${address} <br> Landlord: ${landlord} <br> Your offer: $${offeredprice}`;

            myModal.show()
        },

        submitfinalApplicationsecond(address, landlord){
            offeredprice = document.getElementById("modal-price-second").value;
            console.log(address);
            console.log(landlord);

            var myModal = new bootstrap.Modal(document.getElementById("finalapplicationsecond"), { keyboard: false })
            // var firstmyModal = new bootstrap.Modal(document.getElementById("firstapplication"), {keyboard: false})

            // firstmyModal.hide()

            // document.getElementById("firstapplication").remove();

            document.getElementById("modal-body-final-second").innerHTML = `Listing Address: ${address} <br> Landlord: ${landlord} <br> Your offer: $${offeredprice}`;

            myModal.show()
        }

    },

    // created method to call db and store all the data before mounting to vue
    async created() {

        // listen for auth status change (For user authentication)
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user);
                console.log(uid)

                console.log("Hello!")
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">logout</a>`

                // pull favourite listings from db
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    this.favourites = docSnap.data().favourites;

                    console.log(this.favourites)
                    // console.log("Length" + this.favourites.length)

                    if (typeof this.favourites == 'undefined') {
                        window.location = "nofavouritespage.html";
                    }

                    if (this.favourites.length < 2) {
                        window.location = "notenoughfavourites.html";
                    }

                } else {
                    // doc.data() will be undefined in this case
                }

                console.log(typeof (this.favourites))

                let roomlist = [];

                for (let fav in this.favourites) {
                    console.log(this.favourites[fav]);

                    const docRef = doc(db, this.favourites[fav]);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        roomlist.push(docSnap.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }

                }

                this.dataLoaded = true;

                this.listings = roomlist;

                console.log("favroomlist" + roomlist);

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

main.mount("#content") // mount vue to html