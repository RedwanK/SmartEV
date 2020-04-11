// Global Variables

URLS = {
    "loadMap": 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    "charges": '/public/charges.json',
    "reverseGeocoding": "https://eu1.locationiq.com/v1/reverse.php?key=",
    "searchGeocoding": "https://eu1.locationiq.com/v1/search.php?key="
};

/* Default Lyon position */
lat = 45.75;
lng = 4.85;

/* Relaxation ideas */
relaxation = [
    "regarder une série Netflix ! 🎬",
    "écouter une musique douce 🎵",
    "trouver votre voie. Partez à la recherche de vos talents, de ce qui a du sens pour vous… Qu’est-ce que vous aimez faire ? Quelles activités vous procurent du bien-être ?",
    "aller courir dans la nature ! 🏆 Vous aérer : de plus en plus d’études montrent les vertus du contact avec la nature, qui nous aide à être plus serein(e), plus ancré(e).",
    "découvrir le yoga, le tai-chi, la méthode Pilates. Ces pratiques vous aideront à vous retrouver avec vous-même, à vous détendre et à accueillir la vie telle qu’elle vient.",
    "lire un livre inspirant et passionnant !"
];

/* Trip time in minute */
tripTime = 0;

/* Models of car */
models = {
    "renault": {
        "zoe": {
            "autonomy": 290,
            "battery": 41, /* kWh capacité batterie */
            "powerCharger": 22, /* kW puissance de charge max */
            "name": "zoe",
            "charges": {
                "id": [
                    25,
                    1036
                ],
                "list": []
            }
        }
    },
    "tesla": {
        "model3": {
            "autonomy": 485,
            "battery": 57,
            "powerCharger": 170,
            "name": "model3",
            "charges": {
                "id": [
                    27
                ],
                "list": []
            }
        }
    }
};
/* Selected model of car */
model = models.renault.zoe;

/* Cluster of marker */
markers = null;

/* List of lat/lng of the current trip selected by the user */
TRIP = {
    departure: {
        "lat": null,
        "lng": null
    },
    destination: {
        "lat": null,
        "lng": null
    }
};

// the input of the selected locate me
activeLocateMeInput = null;
//its id
activeLocateMeInputID = null;
//the current step
activeLocateMeStep = null;
// true if one locate me is active
locateMeIsActive = false;
// true if user search a trip
activeTrip = false;
// Router from view
routing = null;

userMarkers = [];

Arrows = {
    "Default": "arrow-up",
    "Head": "arrow-up",
    "SlightRight": "arrow-right",
    "EndOfRoad": "arrow-up",
    "Roundabout": "sync",
    "Fork": "code-branch",
    "Merge": "arrow-up",
    "OffRamp": "sign-out-alt",
    "Right": "arrow-right",
    "Left": "arrow-left",
    "SlightLeft": "arrow-left",
    "DestinationReached": "check-circle",
    "Continue": "arrow-up",
    "OnRamp": "arrow-up",
    "SharpRight": " arrow-right",
    "SharpLeft": "arrow-left"
};

CHARGES = null;

CHARGE_RAD = 0.01;

SAFE_PERCENTAGE = 15;

CHARGE_POINT_RANGE = 100;
