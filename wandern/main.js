//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 9;

let map = L.map("map", {
    fullscreenControl: true,
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
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
}).addTo(map);

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

// Layers
let karwendelLayer = L.layerGroup().addTo(map);
let inntallLayer = L.layerGroup().addTo(map);

// GPX loading function
function loadGPXFile(filePath, layer, elevationControl) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let gpx = parser.parseFromString(data, "application/xml");
            new L.GPX(gpx, {
                async: true,
                marker_options: {
                    startIconUrl: 'images/pin-icon-start.png',
                    endIconUrl: 'images/pin-icon-end.png',
                    shadowUrl: 'images/pin-shadow.png'
                }
            }).on('loaded', function (e) {
                map.fitBounds(e.target.getBounds());
                elevationControl.load(filePath);
            }).addTo(layer);
        });
}

let controlElevationKarwendel = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme",
    collapsed: true
}).addTo(map);

loadGPXFile('data/gps-daten-karwendel-hoehenweg.gpx', karwendelLayer, controlElevationKarwendel);

let controlElevationInntal = L.control.elevation({
    position: "bottomleft",
    theme: "steelblue-theme",
    collapsed: true
}).addTo(map);

loadGPXFile('data/gps-daten-inntaler-hoehenweg.gpx', inntallLayer, controlElevationInntal);

// RainViewer setup
let rainviewer = new L.Control.Rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Start/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Time:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
});
map.addControl(rainviewer);

// Locate Control
L.control.locate().addTo(map);
