// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, updateDoc, getDoc, setDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
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
const storage = getStorage();

// Vue instance
const main = Vue.createApp({

    data() {
        return {
            username: "",
            race: "",
            religion: "0",
            nationality: "",
            school: "",
            dataLoaded: false,
            imagefile: "",
            uid: "",
            imageurl: "",
        }
    },

    methods: {

        // disallow user to click chat button if not logged in
        goChat() {
            if (uid == null) {
                alert("Login first!")
            }
        },

        previewFiles(event) {
            this.imagefile = event.target.files[0];
            console.log(this.imagefile);
        },

        uploadImage() {
            
            const storageRef = ref(storage, "users/" + this.uid);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, this.imagefile).then((snapshot) => {
                console.log('Uploaded a blob or file!');

                getDownloadURL(ref(storage, "users/" + this.uid))
                .then((url) => {

                    // Or inserted into an <img> element
                    const img = document.getElementById("selectedphoto");
                    img.setAttribute('src', url);
                })
                .catch((error) => {
                    // Handle any errors
                });
            });

           


        },

        async onSubmit() {

            console.log('form submitted');
            console.log(auth.currentUser.uid)

            const userprofile = doc(db, "users", auth.currentUser.uid);

            await updateDoc(userprofile, {
                religion: this.religion,
                school: this.school
            })

            // await setDoc(doc(db, "users", auth.currentUser.uid), {

            //     religion: this.religion,
            //     school: this.school
            // });

            console.log("er")
            console.log("data set")
            window.location = "profilepage-fad.html";
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
                this.uid = uid;
                this.username = user.displayName;

                console.log(this.school)

                getDownloadURL(ref(storage, "users/" + this.uid))
                .then((url) => {

                    // Or inserted into an <img> element
                    // const img = document.getElementById("selectedphoto");
                    // img.setAttribute('src', url);
                    this.imageurl = url;
                })
                .catch((error) => {
                    // Handle any errors
                });

                console.log("Hello!")
                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">logout</a>`

                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.race = docSnap.data().race;
                    this.religion = docSnap.data().religion;
                    this.nationality = docSnap.data().nationality;
                    this.school = docSnap.data().school;
                    this.avatar = docSnap.data().avatar;
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


