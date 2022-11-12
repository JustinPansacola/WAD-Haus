// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
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
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        }
    },

    methods: {
        onSubmit() {

            if (this.password != this.confirmpassword) {
                console.log("Passwords do not match!");

                var myModal = new bootstrap.Modal(document.getElementById("errormessage"), { keyboard: false })
                document.getElementById("modal-body").innerHTML = `<p>Passwords do not match!</p>`
                myModal.show()
            }
            else {

                console.log('form submitted');
                console.log(this.email);
                console.log(this.password);

                // Sign up the user
                createUserWithEmailAndPassword(auth, this.email, this.password).then(async cred => {
                    console.log(cred);
                    await updateProfile(auth.currentUser, {
                        displayName: this.username // set username to db
                    })
                    window.location = 'registerdetailspage.html';
                })
                    .catch((error) => {
                        // Some error occurred.
                        console.log(error.code);
                        let errormsg = "";

                        if (error.code.includes("weak-password")) {
                            errormsg = "Weak password."
                        }
                        else if (error.code.includes("email-already-in-use")) {
                            errormsg = "Email already in use."
                        }

                        var myModal = new bootstrap.Modal(document.getElementById("errormessage"), { keyboard: false })
                        document.getElementById("modal-body").innerHTML = `<p>${errormsg}</p>`
                        myModal.show()
                    })
            }



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
            } else {
                // User is signed out
                // ...
            }


        });

    }
})

main.mount("#content");

