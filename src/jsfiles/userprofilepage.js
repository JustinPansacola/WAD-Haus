// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, updateDoc, getDoc, setDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
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

// TO GET ALL DOCUMENTS IN A COLLECTION
// const colRef = collection(db, "listings");
// const docsSnap = await getDocs(colRef);

let id = "7c2QONB8q2SEp60wjATxQuQDf7z1";


// Vue instance
const main = Vue.createApp({

    data() {
        return {
            username: "",
            race: "",
            religion: "",
            nationality: "",
            school: "",
            dataLoaded: false
        }
    },

    methods: {

        // disallow user to click chat button if not logged in
        goChat() {
            if (uid == null) {
                alert("Login first!")
            }
        },

        async onSubmit() {

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
                console.log(uid);
                this.username = user.displayName;

                console.log(this.school)


                console.log("Hello!")
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">Logout</a>`

                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.race = docSnap.data().race;
                    this.religion = docSnap.data().religion;
                    this.nationality = docSnap.data().nationality;
                    this.school = docSnap.data().school;
                } else {
                    // doc.data() will be undefined in this case
                }

                this.dataLoaded = true;

                // if user clicks logout, sign them out
                document.getElementById("navbar_button_2").addEventListener("click", logOut);

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

    }

})

main.mount("#content") // mount vue to html