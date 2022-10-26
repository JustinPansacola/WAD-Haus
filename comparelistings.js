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
            // if (uid == null) {
            //     alert("Login first!")
            // }
            console.log(val);
            window.location = "chat.html?address=" + val;
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

                // pull favourite listings from db
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.favourites = docSnap.data().favourites;

                    if (typeof this.favourites == 'undefined') {
                        window.location = "errorpage.html";
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

                const loginnav = document.getElementById("loginnav");
                const registernav = document.getElementById("registernav");

                // if there is a user logged in, change navbar login and register to profile and logout
                loginnav.innerText = user.displayName;
                loginnav.href = "profilepage.html";
                registernav.innerText = "Logout";

                // if user clicks logout, sign them out
                registernav.addEventListener("click", logOut);

                function logOut() {
                    auth.signOut().then(() => {
                        console.log("user signed out");
                    })
                }

            } else {
                // User is signed out
                // ...

                window.location = "errorpage.html";

            }
        });

        // let roomlist = []; // initialize roomlist to store all listings from db

        // const colRef = collection(db, "listings");
        // const docsSnap = await getDocs(colRef);

        // try {
        //     const docsSnap = await getDocs(colRef);
        //     if (docsSnap.docs.length > 0) {
        //         docsSnap.forEach(doc => {
        //             // console.log(doc.data());
        //             roomlist.push(doc.data()) // push all listings into roomlist array
        //             // console.log(doc.id);
        //             this.dataLoaded = true;
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        // this.listings = roomlist; // set listings variable in vue data as roomlist for access to vue in html

    }

})

main.mount("#content") // mount vue to html