// import config from './config.js';
// const apiKey = config.api_key;

//* Note: Figure out how to get apk_key to work using ./config.js

// require('dotenv').config();

// const apiKey = process.env.API_KEY;



// ~~~~ Code below is for project ~~~ //

// Setup map
function initialize() {
    const mapOptions = {
        // Zoom of map on start
        zoom: 10,
        // Initial center coordinates on start (New York)
        center: new google.maps.LatLng(40.7128, -74.0060),
        // Type of map (ROADMAP, SATELLITE, HYBRID, TERRAIN)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Minimum zoom of map
        minZoom: 2
    };

    // Create an auto search list of places
    const input = document.getElementById('searchInput');
    const autocomplete = new google.maps.places.Autocomplete(input);

    // Create a new map instance using provided options
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create an info window to display location info
    const infoWindow = new google.maps.InfoWindow();

    let centerMarker = null; // Initialize the center marker variable

    // Add click event listener for marker
    function addMarker(place) {
        if (centerMarker) {
            centerMarker.setMap(null); // Remove the previous center marker
        }

        centerMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });

        centerMarker.addListener('click', function () {
            infoWindow.setContent(centerMarker.title);
            infoWindow.open(map, centerMarker);
        });
    }

    // Listen for the place_changed event of the autocomplete input
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            console.error("Place not found");
            return;
        }

        // Update the map's center to the selected place
        map.setCenter(place.geometry.location);
        map.setZoom(14); // You can adjust the zoom level as needed

        // Add a marker at the selected place
        addMarker(place);
    });

    // Adjust map center when the window is resized
    google.maps.event.addDomListener(window, "resize", function () {
        map.setCenter(mapOptions.center);
    });
}

// Initialize the map when window loading finished
google.maps.event.addDomListener(window, 'load', initialize);




