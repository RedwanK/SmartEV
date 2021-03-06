/**
 * Initialize the map with the position of the user
 */
loadMaps = function (map) {
    /* Load the map */
    L.tileLayer(URLS['loadMap'], {
        attribution: 'Redwan Kara, Burdet Lucien',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: token
    }).addTo(map);

    /* Create the icon marker */
    var markerIcon = L.icon({
        iconUrl: 'public/images/marker.png',

        iconSize: [38, 38], // size of the icon
        iconAnchor: [22, 37], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -20] // point from which the popup should open relative to the iconAnchor

    });

    /* Locate the user */
    map.locate({
        setView: true,
        maxZoom: 11
    }).on('locationfound', function (e) {
        lat = e.latitude;
        lng = e.longitude;

        var marker = L.marker(
            [lat, lng],
            { icon: markerIcon }
        ).bindPopup('Vous êtes ici en somme');

        var circle = L.circle([lat, lng], e.accuracy / 2, {
            weight: 1,
            color: 'red',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        map.addLayer(marker);
        map.addLayer(circle);

        /* Change the map center to the location */
        map.flyTo([lat, lng], 11)

    }).on('locationerror', function (e) {
        lat = 45.75;
        lng = 4.85;
    });
}

/**
 * Load charges
 */
loadCharges = function (map) {
    /* Request to get the charges */
    $.ajax({
        url: URLS['charges']
    }).done(function (data) {

        /* Parse data to json */
        var chargeData = data;
        if (chargeData) {
            chargeData = JSON.parse(
                JSON.stringify(data)
            );

            CHARGES = chargeData;
        }

        /* Add markers to the map */
        createCluster(map, CHARGES);

        /* Initialize model */
        initializeModel();
        /* Initialize marker */
        initializeMarker(map);

    });
}

displayRoadSheet = function (routes) {

    displayTripTabs();

    displayTripInfos(routes);

    $.each(routes.instructions, function (key, item) {
        var direction = Arrows[item.type] !== undefined ? Arrows[item.type] : (Arrows[item.modifier] !== undefined ? Arrows[item.modifier] : Arrows['default']);

        var add = "<a href='#'" + "class='list-group-item list-group-item-action flex-column align-items-start'>";
        add += "<div class='d-flex w-100 justify-content-between'>";
        add += "<h5 class='mb-1'>" + item.road + "</h5>";
        add += "<small><i class=\"fas fa-2x text-success fa-" + direction + "\"></i></small>";
        add += "</div>";
        add += "<p class='mb-1'>" + item.text + "</p>";
        add += "</a>";

        $(add).appendTo(".roadSheetList");
    });
};

addMarker = function (map, item) {
    var marker = L.marker(
        [item.lat, item.lon]
    ).bindPopup(item.display_name);
    map.addLayer(marker);

    userMarkers.push(marker);
};

removeUserMarkers = function (map) {
    $.each(userMarkers, function (key, item) {
        map.removeLayer(item);
    })
};

displayTripTabs = function () {
    $("#trip-container").removeClass("d-none");
    $("#trip-container").addClass("d-flex");
    $("#trip-info-container").removeClass("d-none");
    $("#trip-info-container").addClass("d-flex");
    $("#road-sheet-container").removeClass("d-none");
    $("#road-sheet-container").addClass("d-flex");
};

displayTripInfos = function (routes) {
    var totalDistance = routes.summary.totalDistance;
    var totalTime = routes.summary.totalTime / 60; /* Second to minute */

    /* Save trip time */
    tripTime += totalTime;

    /* Convert distance */
    totalDistance = formatDistance(totalDistance);

    /* Convert time */
    totalTime = formatTime(tripTime);

    var add = "<tr>";
    add += "<td>";
    add += totalDistance;
    add += "</td>";
    add += '<td id="trip-time">';
    add += totalTime;
    add += "</td>";
    add += "<td>";
    add += routes.name;
    add += "</td>";
    add += "</tr>";

    $(add).appendTo("#trip-info-body");
};
