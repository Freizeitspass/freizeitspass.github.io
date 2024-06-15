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
}
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
}

// Hintergrundlayer eGrundkarte Tirol
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
}, {
    "Karwendel Höhenweg": themaLayer.karwendel.addTo(map),
    "Inntal Höhenweg": themaLayer.inntal.addTo(map)
}).addTo(map);

/* let controlElevation = L.control.elevation({}).addTo(map);
controlElevation.load("data/gps-daten-karwendel-hoehenweg.gpx");
controlElevation.load("data/gps-track-inntaler-hoehenweg.gpx")
*/

//ausprobieren von ChatGPT
new L.GPX("data/gps-daten-karwendel-hoehenweg.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
    controlElevationKarwendel.load("data/gps-daten-karwendel-hoehenweg.gpx");
}).addTo(karwendelLayer);

new L.GPX("data/gps-track-inntaler-hoehenweg.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
    controlElevationInntal.load("data/gps-track-inntaler-hoehenweg.gpx");
}).addTo(inntalLayer);

let controlElevationKarwendel = L.control.elevation({
    position: "bottomright",
    theme: "lime-theme",
    detached: true,
    elevationDiv: "#elevation-div-karwendel"
}).addTo(map);

let controlElevationInntal = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme",
    detached: true,
    elevationDiv: "#elevation-div-inntal"
}).addTo(map);

// Laden der GPX-Daten und Hinzufügen zu den entsprechenden Layern
new L.GPX("data/gps-daten-karwendel-hoehenweg.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
    controlElevationKarwendel.load("data/gps-daten-karwendel-hoehenweg.gpx");
});

new L.GPX("data/gps-track-inntaler-hoehenweg.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
    controlElevationInntal.load("data/gps-track-inntaler-hoehenweg.gpx");
});


//Maßstab 
L.control.scale({
    imperial: false,
}).addTo(map);

//Höhenprofil und gpx


/*
//Pulldown (noch nur kopiert und nicht verändert von biketirol)
let pulldown = document.querySelector("#pulldown");
// console.log("Pulldown: ", pulldown);

for (let etappe of ETAPPEN) {
    let status = "";
    if (etappe.nr == 19) {
        status = " selected ";
    }
    pulldown.innerHTML += `<option ${status} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.titel}</option>`;
};

pulldown.onchange = function (evt) {
    // console.log("Pulldown change event: ", evt);
    // console.log("User: ", evt.target.value);
    let username = evt.target.value;
    let url = `https://${username}.github.io/biketirol`;
    // console.log("Url: ", url);
    // console.log(window.location);
    window.location.href = url;
}
*/

// MiniMap 
new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
    attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
}), {
    toggleDisplay: true,
}).addTo(map);

/*
// Initialize the sidebar
var sidebar = L.control.sidebar({
    container: 'sidebar',
    closeButton: true,
    position: 'left'
}).addTo(map);

// Example marker with popup content
var marker = L.marker([47.2682, 11.3928]).addTo(map);
marker.on('click', function () {
    sidebar.open('home');
    document.getElementById('sidebar-content').innerHTML = '<h2>Rennradstrecke</h2><p>Dies ist eine Beschreibung der Rennradstrecke.</p>';
});

// Open sidebar on marker click
marker.bindPopup("Klicken Sie hier für mehr Informationen").on('click', function () {
    sidebar.open('home');
});



*/

let overlayLayers = {
    "Karwendel Hoehenweg": karwendelLayer,
    "Inntal Hoehenweg": inntalLayer
};
L.control.layers(null, overlayLayers).addTo(map);


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