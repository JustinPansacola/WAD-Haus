// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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
            email: "",
            password: ""
        }
    },

    methods: {
        onSubmit() {
            console.log('form submitted');
            console.log(this.email);
            console.log(this.password);

            // Sign In the user
            signInWithEmailAndPassword(auth, this.email, this.password).then(cred => {
                console.log(cred);
            })
            .catch((error) => {

                // Some error occurred.
                console.log(error.code);
                let errormsg = "";

                if (error.code.includes("wrong-password")) {
                    errormsg = "password is incorrect."
                }
                else if (error.code.includes("user-not-found")) {
                    errormsg = "user not found."
                }

                var myModal = new bootstrap.Modal(document.getElementById("errormessage"), { keyboard: false })
                document.getElementById("modal-body").innerHTML = `<p>${errormsg}</p>`
                myModal.show()

            })


        }
    },

    async created() {

        // listen for auth status change
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user);
                // window.location = "index.html";
                window.location.href = 'index.html' // redirects to previous page after login
            } else {
                // User is signed out
                // ...
            }
        });

    }

})

main.mount("#content");
