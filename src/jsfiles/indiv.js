// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore, updateDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

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
const storage = getStorage();

// Vue instance
const main = Vue.createApp({

    data() {
        return {
            listing_dict: {},
            roomMates: [],
            roomMatesId: [],
            curr_views: 0,
            new_views: 0,
            viewers: [],
            images: [],
            dataLoaded: false,
            landlordimg: "",
            tenantsimg: []
        }
    },

    methods: {},

    // created method to call db and store all the data before mounting to vue
    async created() {

        // listen for auth status change (For user authentication)
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                document.getElementById("navbar_button_1").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="profilepage-fad.html">${user.displayName}</a>`
                document.getElementById("navbar_button_2").innerHTML = `<a class="nav-link text-dark text-white" style="background-color:rgb(55, 32, 40);" href="logoutsuccesspage.html">logout</a>`

                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                let params = (new URL(document.location)).searchParams
                let id = params.get("id")
                console.log(id)
                const docRef = doc(db, "listings", id);
                const docSnap = await getDoc(docRef);
                // const pathReference = ref(storage, '');

                if (docSnap.exists()) {
                    this.listing_dict = docSnap.data()

                    for (let i = 0; i < 3; i++) {
                        getDownloadURL(ref(storage, `listings/${id}/${i + 1}.jpeg`))
                            .then((url) => {

                                // Or inserted into an <img> element

                                let curr_targ = `carou${i + 1}`
                                const img = document.getElementById(curr_targ);
                                img.setAttribute('src', url);

                            })
                            .catch((error) => {
                                // Handle any errors
                            });
                        console.log(this.images)
                    }

                    // let curr_url = ""

                    // console.log(this.images)
                    // for(image of this.images){
                    //     console.log(image)
                    // }
                    // // for(let j=0; j < 3; j++){

                    // //     curr_url = this.images[j]
                    // //     console.log(curr_url)
                    // //     // Or inserted into an <img> element
                    // //     let img = document.getElementById(`test${j+1}`);

                    // //     img.src = curr_url;


                    // // }

                    console.log(this.tenantsimg)

                    this.roomMates = this.listing_dict.roomMates
                    this.roomMatesId = this.listing_dict.roomatesId

                    this.curr_views = this.listing_dict.listingViews
                    this.viewers = this.listing_dict.listingViewers

                    let new_views = this.curr_views
                    console.log(new_views)

                    console.log(this.roomMates)
                    console.log(this.listing_dict.listingMrt)


                    console.log('updating view')

                    console.log(this.viewers.includes(user.uid))
                    console.log(user.uid)

                    if (!this.viewers.includes(user.uid)) {
                        this.viewers.push(user.uid)
                        new_views += 1

                        console.log(new_views)


                        await updateDoc(docRef, {
                            listingViewers: this.viewers,
                            listingViews: new_views
                        })
                    }




                    // await updateDoc(docSnap, {
                    //     listingViews: FieldValue.increment(1)
                    // })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                // get landlord profile picture
                getDownloadURL(ref(storage, "users/" + this.listing_dict.landlordid))
                    .then((url) => {

                        // Or inserted into an <img> element
                        // const img = document.getElementById("selectedphoto");
                        // img.setAttribute('src', url);
                        this.landlordimg = url;
                    })
                    .catch((error) => {
                        // Handle any errors
                    });

                console.log("check: " + this.listing_dict.roomatesId)

                // get tenants profile picture
                for (let rid in this.listing_dict.roomatesId) {

                    console.log("loop" + this.listing_dict.roomatesId[rid])
                    getDownloadURL(ref(storage, "users/" + this.listing_dict.roomatesId[rid]))
                        .then((url) => {

                            // Or inserted into an <img> element
                            // const img = document.getElementById("selectedphoto");
                            // img.setAttribute('src', url);
                            // this.landlordimg = url;

                            console.log("Here: " + url);
                            this.tenantsimg.push(url);
                            console.log(this.tenantsimg)
                        })
                        .catch((error) => {
                            // Handle any errors
                        });
                }

                this.dataLoaded = true;

                console.log(this.roomMatesId)

                // const loginnav = document.getElementById("loginnav");
                // const registernav = document.getElementById("registernav");

                // loginnav.innerText = user.displayName;
                // loginnav.href = "profilepage.html";
                // registernav.innerText = "Logout";

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