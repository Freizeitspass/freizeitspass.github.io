//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 9;

let map = L.map("map", {
    fullscreenControl: true,
}).setView([lat, lng], zoom);

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
    ]).addTo(map)
};

L.control.layers(baseLayers).addTo(map);

// thematische Layer
let themaLayer = {
    karwendelLayer: L.featureGroup().addTo(map),
    inntalLayer: L.featureGroup().addTo(map),
};

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
                let elevationData = []; // Array für die Höhendaten

                // Extrahiere Höhendaten aus der GPX-Datei
                e.target.eachLayer(function (track) {
                    if (track.getLatLngs) {
                        track.getLatLngs().forEach(function (latlng) {
                            elevationData.push(latlng.alt); // Höhendaten zum Array hinzufügen
                        });
                    }
                });

                // Hier die Höhendaten in das elevationControl laden
                elevationControl.load(elevationData);
            }).addTo(layer);
        });
}


// GPX-Dateien laden und Höhenprofile anzeigen
loadGPXFile('data/gps-daten-karwendel-hoehenweg.gpx', themaLayer.karwendelLayer, controlElevationKarwendel);
loadGPXFile('data/gps-daten-inntaler-hoehenweg.gpx', themaLayer.inntalLayer, controlElevationInntal);

//Maßstab 
L.control.scale({
    imperial: false,
}).addTo(map);

// MiniMap 
new L.Control.MiniMap(
    L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
    toggleDisplay: true,
    zoomLevelOffset: -5
}
).addTo(map);
