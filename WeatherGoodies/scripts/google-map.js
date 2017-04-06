GOOGLE_API_KEY="AIzaSyBvF1mtUEnijkgIS0BEyDt7P1SP7HmTjo0";

var google_map;
var google_map_zoom = 14;
var google_map_coords= { lat: 33.2362325, lng: -96.6458192};
var google_map_target = null;

function initMap() {
    google_map_target = document.getElementById("google-map");
    google_map = new google.maps.Map(google_map_target, {zoom: google_map_zoom, center: google_map_coords});
}

function updateMap(lat, lng) {
    google_map_coords.lat = lat;
    google_map_coords.lng = lng;
    if ( google_map == null ) {
        initMap();
    }
    google_map.setCenter(new google.maps.LatLng(lat,lng));
    //google_map = new google.maps.Map(google_map_target, {zoom: google_map_zoom, center: google_map_coords});
    //google_marker = new google.maps.Marker({position:google_map_coords, map:google_map});
}