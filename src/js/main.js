jQuery = require('jquery');
$ = require('jquery');

jQuery(function ($) {

    /* Create the map */
    var map = L.map('mapid').setView([lat, lng], 5);

    /* Initialize maps */
    loadMaps(map);

    /* Load charges */
    loadCharges(map);


});
