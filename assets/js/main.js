jQuery(function ($) {

    /* Default Lyon position */
    var lat = 45.75;
    var lng = 4.85;
    var url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

    /* Create the map */
    var map = L.map('mapid').setView([lat, lng], 5);

    /* Load the map */
    L.tileLayer(url, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: token
    }).addTo(map);

    /* Locate the user */
    map.locate({ setView: true, watch: true })
        .on('locationfound', function (e) {
            lat = e.latitude;
            lng = e.longitude;
        })
        .on('locationerror', function (e) {
            
        });


});