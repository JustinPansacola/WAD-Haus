// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore, setDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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
setPersistence(auth, browserSessionPersistence); // set persistence for browser session only. user will be logged out once he closes the window.

const main = Vue.createApp({
    data() {
        return {
            race: "",
            religion: "",
            nationality: "",
            school: ""
        }
    },

    methods: {
        async onSubmit() {
            console.log('form submitted');
            console.log(auth.currentUser.uid)

            await setDoc(doc(db, "users", auth.currentUser.uid), {

                race: this.race,
                religion: this.religion,
                nationality: this.nationality,
                school: this.school

            });

            console.log("er")
            console.log("data set")
            window.location = "profilepage.html";
        }
    },

    async created() {

        // listen for auth status change
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                userid = user.uid;
                console.log(user);
            } else {
                // User is signed out
                // ...
                window.location = "errorpage.html";
            }
        });

    }
})

main.mount("#content");

