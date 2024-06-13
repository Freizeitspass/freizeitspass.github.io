//Map initialisieren
let lat1 = 47.268333;
let lng1 = 11.393333;
let zoom1 = 9;

document.addEventListener('DOMContentLoaded', function () {
    let map1 = L.map("map1", {
        fullscreenControl: true,
    }).setView([lat1, lng2], 11);

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
        ]).addTo(map1),
    }, {
        "Gnadenwald-Runde": themaLayer.route.addTo(map1)
    }).addTo(map1);

    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile1",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
    }).addTo(map1);
    controlElevation.load("data/gnadenwald.gpx");



    //Maßstab 
    L.control.scale({
        imperial: false,
    }).addTo(map1);


    // MiniMap 
    new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
        toggleDisplay: true,
    }).addTo(map1);

    //Locate controle
    var lc = L.control
        .locate({
            position: "topright",
            strings: {
                title: "Show me where I am, yo!"
            }
        })
        .addTo(map1);

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
    }).addTo(map1);


});