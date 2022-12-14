import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { doc, getDoc, collection, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';

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


const colRef = collection(db, "listings");
const docsSnap = await getDocs(colRef);


let listings_latlng_dict = {}
let listings_dict = {}

try {
    const docsSnap = await getDocs(colRef);

    if (docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
            listings_latlng_dict[doc.id] = { "lat": doc.data().lat, "lng": doc.data().lng }
            listings_dict[doc.id] = doc.data()
        })
        console.log(listings_latlng_dict)
        console.log(listings_dict)
    }
} catch (error) {
    console.log(error);
}

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaO7dcyKs4biX1nmInftecJWjf8py7mRM&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
function initMap(parameter_data) {
    if (arguments.length == 0) {
        // JS API is loaded and available
        var location = { lat: 1.290270, lng: 103.851959 };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 10, center: location });

        var listing_details_map = {}
        for (const [key, value] of Object.entries(listings_latlng_dict)) {

            for (const [listing_id, listings_details] of Object.entries(listings_dict)){
                console.log(listing_id)
                console.log(listings_details)

                if (listings_details.lat == value.lat && listings_details.lng == value.lng) {
                    listing_details_map[key] = listings_details
                }
            }

            console.log(listing_details_map[key].listingAddress)

            var infoWindow = new google.maps.InfoWindow({
                content: '<div>'
                    + '<p style="color:#000000; font-weight: bold;">' + listing_details_map[key].listingAddress + '<p>'
                    + '<p style="color:#000000">SGD ' + listing_details_map[key].price + ' / mth<p>'
                    + '</div>'
            });

            addMarker(key, value, map, infoWindow)
        }

        console.log(initMap);

    } else {
        console.log(parameter_data)

        // JS API is loaded and available
        var location = { lat: 1.290270, lng: 103.851959 };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 10, center: location });
        // The marker, positioned at location
        // var marker = new google.maps.Marker({ position: location, map: map });

        var listing_details_map = {}
        for (const [key, value] of Object.entries(parameter_data)) {
            for (const [listing_id, listings_details] of Object.entries(listings_dict)){
                console.log(listing_id)
                console.log(listings_details)

                if (listings_details.lat == value.lat && listings_details.lng == value.lng) {
                    listing_details_map[key] = listings_details
                }
            }

            console.log(listing_details_map[key].listingAddress)

            var infoWindow = new google.maps.InfoWindow({
                content: '<div>'
                + '<p style="color:#000000; font-weight: bold;">' + listing_details_map[key].listingAddress + '<p>'
                    + '<p style="color:#000000">SGD ' + listing_details_map[key].price + ' / mth<p>'
                    + '</div>'
            });
            
            addMarker(key, value, map, infoWindow)
        }
    }
};

function addMarker(key, value, map, infoWindow) {
    var marker = new google.maps.Marker({
        position: { lat: Number(value.lat), lng: Number(value.lng) },
        // label: key,
        map: map,
    });

    marker.addListener("click", () => {
        infoWindow.open({
            anchor: marker,
            map: map,
        });
    });
}

window.initMap = initMap
// Append the 'script' element to 'head'
document.head.appendChild(script);


listings = listings_dict