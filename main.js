//  Data GV AT : https://www.data.gv.at/suche/?typeFilter%5B%5D=dataset&searchterm=tirol&searchin=data&formatFilter%5B%5D=JSON Quellen
// Weitwanderwege: https://www.tirol.at/reisefuehrer/sport/wandern/weitwandern
// Weitwanderwege andere Quelle: https://www.almenrausch.at/touren/mehrtagestouren-sommer/tirol/
// mögliche Quelle für Almen/Gasthäuser: https://www.almenrausch.at/einkehr-uebernachtung/gasthoefe-alpengasthoefe-gasthaeuser/tirol/
// weitere Quelle: https://geohub-1-magibk.hub.arcgis.com/apps/f405522fae6e4e38b1feb0029c7f4817/explore
// über Data DV AT gefunden: https://data-tiris.opendata.arcgis.com/datasets/almzentren-1 

//Map initialisieren
let lat = 47.267222;
let lng = 11.392778;
let zoom = 11;

let map = L.map("map", {
    fullscreenControl: true,
    gestureHandling: true,
}).setView([lat, lng], 11);

// WMTS Hintergrundlayer der eGrundkarte Tirol
let eGrundkarteTirol = {
    sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
        pane: "overlayPane",
    }),
}

// Hintergrundlayer eGrundkarte Tirol
let baseLayers = {
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
};

//Layers für Almen
let almenLayer = L.layerGroup();

//Themalayer für Almen
let themaLayer = {
    "Almen": almenLayer
}; 

// Layers Control hinzufügen
let layerControl = L.control.layers(baseLayers, themaLayer).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// MiniMap 
new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
    attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
}), {
    toggleDisplay: true,
}).addTo(map);

// RainViewer Plugin
let rainviewer = new L.Control.Rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Start/Stopp',
    prevButtonText: '<',
    positionSliderLabelText: "Zeit:",
    opacitySliderLabelText: "Sichtbarkeit:",
    animationInterval: 500,
    opacity: 0.5
});
map.addControl(rainviewer);

//Locate control
var lc = L.control.locate({
    position: "topright",
    strings: {
        title: "Wo bin ich?"
    }
}).addTo(map);

//Reachability
var reachability = L.control.reachability({
    apiKey: '5b3ce3597851110001cf62483132be05085146fa9c513961e12c7208',
    opacity: 0.6,
    range: [5, 10, 15],
    label: 'Erreichbarkeit',
    serviceUrl: 'https://api.openrouteservice.org/v2/isochrones',
    travelModeButton1Content: '',
    travelModeButton1StyleClass: 'fa fa-car',
    travelModeButton2Content: '',
    travelModeButton2StyleClass: 'fa fa-bicycle',
    travelModeButton3Content: '',
    travelModeButton3StyleClass: 'fa fa-person-walking',
    travelModeButton4Content: '',
    travelModeButton4StyleClass: 'fa fa-wheelchair',
    drawButtonContent: '',
    drawButtonStyleClass: 'fa fa-pencil',
    deleteButtonContent: '',
    deleteButtonStyleClass: 'fa fa-trash',
    distanceButtonContent: '',
    distanceButtonStyleClass: 'fa fa-ruler-horizontal',
    timeButtonContent: '',
    timeButtonStyleClass: 'fa fa-clock',
}).addTo(map);

map.on('click', function (e) {
    reachability.addTo(map).setLatLng(e.latlng);
    reachability.queryService({
        locations: [[e.latlng.lng, e.latlng.lat]]
    });
});

// HTML für das Popup-Fenster erstellen
var popupContent = '<div class="popup-container" id="popupContainer">' +
    '<div class="popup">' +
    '<span class="close" id="closeButton">&times;</span>' +
    '<p>Mit dem Reachability Plugin können Sie auf einer Karte Erreichbarkeitszonen darstellen.</p><p>Wählen Sie ein Fortbewegungsmittel (Auto, Fahrrad, zu Fuß) und sehen Sie,</p> <p>welche Gebiete Sie in einer bestimmten Zeitspanne (z.B. 5, 10, 15 Minuten) erreichen können.</p><p> Klicken Sie einfach auf die Karte, um die Zonen von einem bestimmten Punkt aus zu visualisieren.</p>' +
    '</div>' +
    '</div>';

// HTML zum Body-Element hinzufügen
document.body.insertAdjacentHTML('beforeend', popupContent);

// Elemente abrufen
var popupContainer = document.getElementById('popupContainer');
var closeButton = document.getElementById('closeButton');

// Event-Listener für das Schließen des Popups hinzufügen
closeButton.addEventListener('click', function () {
    popupContainer.style.display = 'none';
});

// Positionieren des Popups über der Karte
function positionPopup() {
    var mapTop = map._container.getBoundingClientRect().top;
    var mapLeft = map._container.getBoundingClientRect().left;
    var mapWidth = map._container.offsetWidth;

    var popupHeight = popupContainer.offsetHeight;
    var popupWidth = popupContainer.offsetWidth;

    var topOffset = 20; // Abstand von der Oberseite der Karte

    var popupTop = mapTop + topOffset;
    var popupLeft = mapLeft + mapWidth / 2 - popupWidth / 2;

    popupContainer.style.top = popupTop + 'px';
    popupContainer.style.left = popupLeft + 'px';
};

// Initial Popup positionieren
map.on('load', function () {
    popupContainer.style.display = 'block';
    positionPopup();
});

//Slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Vorhäriges/nächstes Foto
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
};

// Nach oben scrollen Button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Almen
fetch('data_almen/Almzentren.geojson')
    .then(response => response.json())
    .then(data => {
        // Bounding Box für Innsbruck
        let bbox = {
            minLat: 47.2000,
            maxLat: 47.3000,
            minLng: 11.3000,
            maxLng: 11.4500
        };

        let filteredFeatures = data.features.filter(feature => {
            let [lng, lat] = feature.geometry.coordinates;
            return lat >= bbox.minLat && lat <= bbox.maxLat && lng >= bbox.minLng && lng <= bbox.maxLng;
        });

        let filteredData = {
            type: 'FeatureCollection',
            features: filteredFeatures
        };

        let almenGeoJSON = L.geoJSON(filteredData, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.NAME) {
                    layer.bindPopup(feature.properties.NAME);
                }
            }
        });

        almenLayer.addLayer(almenGeoJSON);
        map.addLayer(almenLayer);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON data:', error);
    });
