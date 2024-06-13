//Map initialisieren
let lat4 = 47.268333;
let lng4 = 11.393333;
let zoom4 = 9;

document.addEventListener('DOMContentLoaded', function () {
    let map4 = L.map("map4", {
        fullscreenControl: true,
    }).setView([lat4, lng4], 11);

    // thematische Layer
    let themaLayer = {
        route: L.featureGroup(),
    }

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

    // Hintergrundlayer eGrundkarte Tirol mit GPX Overlay
    L.control.layers({
        "eGrundkarte Tirol Sommer": L.layerGroup([
            eGrundkarteTirol.sommer,
            eGrundkarteTirol.nomenklatur
        ]).addTo(map4),
    }, {
        "Gnadenwald-Runde": themaLayer.route.addTo(map4)
    }).addTo(map4);

    //Style Elevation
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile4",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
    }).addTo(map4);
    controlElevation.load("data/seefeld.gpx");



    //Maßstab 
    L.control.scale({
        imperial: false,
    }).addTo(map4);


    // MiniMap 
    new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
        toggleDisplay: true,
    }).addTo(map4);

    //Locate controle
    var lc = L.control
        .locate({
            position: "topright",
            strings: {
                title: "Show me where I am, yo!"
            }
        })
        .addTo(map4);

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
    }).addTo(map4);


});