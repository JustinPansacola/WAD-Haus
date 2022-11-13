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
            school: "",
            religion_list: ["African Traditional & Diasporic", "Agnostic", "Atheist", "Baha'i", "Buddhism", "Cao Dai", "Chinese traditional religion", "Christianity", "Hinduism", "Islam", "Jainism", "Juche", "Judaism", "Neo-Paganism", "Nonreligious", "Rastafarianism", "Secular", "Shinto", "Sikhism", "Spiritism", "Tenrikyo", "Unitarian-Universalism", "Zoroastrianism", "primal-indigenous", "Other"],
            nationality_list: ["Afghan","Albanian","Algerian","American","Andorran","Angolan","Antiguans","Argentinean","Armenian","Australian","Austrian","Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Barbudans","Batswana","Belarusian","Belgian","Belizean","Beninese","Bhutanese","Bolivian","Bosnian","Brazilian","British","Bruneian","Bulgarian","Burkinabe","Burmese","Burundian","Cambodian","Cameroonian","Canadian","Cape Verdean","Central African","Chadian","Chilean","Chinese","Colombian","Comoran","Congolese","Costa Rican","Croatian","Cuban","Cypriot","Czech","Danish","Djibouti","Dominican","Dutch","East Timorese","Ecuadorean","Egyptian","Emirian","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Fijian","Filipino","Finnish","French","Gabonese","Gambian","Georgian","German","Ghanaian","Greek","Grenadian","Guatemalan","Guinea-Bissauan","Guinean","Guyanese","Haitian","Herzegovinian","Honduran","Hungarian","Icelander","Indian","Indonesian","Iranian","Iraqi","Irish","Israeli","Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakhstani","Kenyan","Kittian and Nevisian","Kuwaiti","Kyrgyz","Laotian","Latvian","Lebanese","Liberian","Libyan","Liechtensteiner","Lithuanian","Luxembourger","Macedonian","Malagasy","Malawian","Malaysian","Maldivan","Malian","Maltese","Marshallese","Mauritanian","Mauritian","Mexican","Micronesian","Moldovan","Monacan","Mongolian","Moroccan","Mosotho","Motswana","Mozambican","Namibian","Nauruan","Nepalese","New Zealander","Ni-Vanuatu","Nicaraguan","Nigerien","North Korean","Northern Irish","Norwegian","Omani","Pakistani","Palauan","Panamanian","Papua New Guinean","Paraguayan","Peruvian","Polish","Portuguese","Qatari","Romanian","Russian","Rwandan","Saint Lucian","Salvadoran","Samoan","San Marinese","Sao Tomean","Saudi","Scottish","Senegalese","Serbian","Seychellois","Sierra Leonean","Singaporean","Slovakian","Slovenian","Solomon Islander","Somali","South African","South Korean","Spanish","Sri Lankan","Sudanese","Surinamer","Swazi","Swedish","Swiss","Syrian","Taiwanese","Tajik","Tanzanian","Thai","Togolese","Tongan","Trinidadian or Tobagonian","Tunisian","Turkish","Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbekistani","Venezuelan","Vietnamese","Welsh","Yemenite","Zambian","Zimbabwean"],
            school_list: ["Singapore Management University", "National University of Singapore", "National Technological University", "Singapore University of Social Science", "Singapore Insitute of Technology", "Singapore University of Technology and Design", "Singapore Institute of Management"]
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
                school: this.school,

            });

            console.log("er")
            console.log("data set")
            window.location = "profilepage-fad.html";
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

