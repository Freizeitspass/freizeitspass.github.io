//  Data GV AT : https://www.data.gv.at/suche/?typeFilter%5B%5D=dataset&searchterm=tirol&searchin=data&formatFilter%5B%5D=JSON Quellen
// Weitwanderwege: https://www.tirol.at/reisefuehrer/sport/wandern/weitwandern
// Weitwanderwege andere Quelle: https://www.almenrausch.at/touren/mehrtagestouren-sommer/tirol/
// mögliche Quelle für Almen/Gasthäuser: https://www.almenrausch.at/einkehr-uebernachtung/gasthoefe-alpengasthoefe-gasthaeuser/tirol/
// weitere Quelle: https://geohub-1-magibk.hub.arcgis.com/apps/f405522fae6e4e38b1feb0029c7f4817/explore
// über Data DV AT gefunden: https://data-tiris.opendata.arcgis.com/datasets/almzentren-1 

//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 11;

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

//Maßstab hinzugefügt
L.control.scale({
    imperial: false,
}).addTo(map);

//Minimap hinzugefügt
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

