var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaO7dcyKs4biX1nmInftecJWjf8py7mRM&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
function initMap(lat, lng) {

    if (arguments.length == 0) {
        console.log("no parameters")

        var location = { lat: 1.290270, lng: 103.851959 };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 14, center: location });
        // The marker, positioned at location
        var marker = new google.maps.Marker({ position: location, map: map });

        console.log(initMap);

    } else {
        console.log("with parameters")
        
        // JS API is loaded and available
        var location = { lat: Number(lat), lng: Number(lng) };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 14, center: location });
        // The marker, positioned at location
        var marker = new google.maps.Marker({ position: location, map: map });

        console.log(initMap);
    }
};
window.initMap = initMap
// Append the 'script' element to 'head'
document.head.appendChild(script);