//Map initialisieren
let lat5 = 47.268333;
let lng5 = 11.393333;
let zoom5 = 9;

document.addEventListener('DOMContentLoaded', function () {
    let map5 = L.map("map5", {
        fullscreenControl: true,
    }).setView([lat5, lng5], 11);

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
        ]).addTo(map5),
    }, {
        "Gnadenwald-Runde": themaLayer.route.addTo(map5)
    }).addTo(map5);

    //Style Elevation
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile1",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
    }).addTo(map5);
    controlElevation.load("data/sellrain.gpx");



    //Maßstab 
    L.control.scale({
        imperial: false,
    }).addTo(map5);


    // MiniMap 
    new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
        toggleDisplay: true,
    }).addTo(map5);

    //Locate controle
    var lc = L.control
        .locate({
            position: "topright",
            strings: {
                title: "Show me where I am, yo!"
            }
        })
        .addTo(map5);

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
    }).addTo(map5);


});