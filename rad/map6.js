//Map initialisieren


document.addEventListener('DOMContentLoaded', function () {
    let map6 = L.map("map6", {
        center: [47.268333, 11.393333],
        zoom: 9,
        fullscreenControl: true,
        gestureHandling: true,
    });

    // WMTS Hintergrundlayer 
    let eGrundkarteTirol = {
        sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
        }),
        nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
            pane: "overlayPane",
        }),
        ortho: L.tileLayer("https://wmts.kartetirol.at/gdi_ortho/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
        }),
    }
    let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Hintergrundlayer 
    L.control.layers({
        "eGrundkarte Tirol Sommer": L.layerGroup([
            eGrundkarteTirol.sommer,
            eGrundkarteTirol.nomenklatur
        ]).addTo(map6),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,
    }).addTo(map6);

    //Style Elevation
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile6",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
        edgeScale: false,
    }).addTo(map6);
    controlElevation.load("data/kuehtai.gpx");

    //Maßstab 
    L.control.scale({
        imperial: false,
    }).addTo(map6);

    // MiniMap 
    new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
        toggleDisplay: true,
    }).addTo(map6);

    //Locate controle
    var lc = L.control
        .locate({
            position: "topright",
            strings: {
                title: "Show me where I am, yo!"
            }
        })
        .addTo(map6);


});