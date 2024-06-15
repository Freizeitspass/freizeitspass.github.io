//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 9;

let map = L.map("map", {
    fullscreenControl: true,
}).setView([lat, lng], 11);

// thematische Layer
let themaLayer = {
    karwendelLayer: L.featureGroup(),
    inntalLayer: L.featureGroup(),
};

let karwendelLayer = L.featureGroup();
let inntalLayer = L.featureGroup();

// WMTS Hintergrundlayer der eGrundkarte Tirol
let eGrundkarteTirol = {
    sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
        pane: "overlayPane",
    }),
};

// Hintergrundlayer eGrundkarte Tirol
let baseLayers = {
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ])
};

L.control.layers(baseLayers, {
    "Karwendel Höhenweg": themaLayer.karwendelLayer,
    "Inntal Höhenweg": themaLayer.inntalLayer
}).addTo(map);

// Initialisierung des Leaflet-Elevation-Controls
let controlElevationKarwendel = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme",
    collapsed: true
}).addTo(map);

let controlElevationInntal = L.control.elevation({
    position: "bottomleft",
    theme: "steelblue-theme",
    collapsed: true
}).addTo(map);

// GPX loading function
function loadGPXFile(filePath, layer, elevationControl) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let gpx = parser.parseFromString(data, "application/xml");
            new L.GPX(gpx, {
                async: true,
            }).on('loaded', function (e) {
                map.fitBounds(e.target.getBounds());
                elevationControl.load(filePath); // Hier die Höhendaten laden
            }).addTo(layer);
        });
}

// GPX-Dateien laden und Höhenprofile anzeigen
loadGPXFile('data/gps-daten-karwendel-hoehenweg.gpx', karwendelLayer, controlElevationKarwendel);
loadGPXFile('data/gps-daten-inntaler-hoehenweg.gpx', inntalLayer, controlElevationInntal);

//Maßstab 
L.control.scale({
    imperial: false,
}).addTo(map);

// MiniMap 
new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
    attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
}), {
    toggleDisplay: true,
}).addTo(map);

//Rainviewer Plugin
L.control.rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Play/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Hour:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
}).addTo(map);

//Locate controle
var lc = L.control
    .locate({
        position: "topright",
        strings: {
            title: "Wo bin ich?"
        }
    })
    .addTo(map);

//Button zum nach oben Scrollen
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
