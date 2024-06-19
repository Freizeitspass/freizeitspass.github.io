//Map initialisieren


document.addEventListener('DOMContentLoaded', function () {
    let map6 = L.map("map6", {
        center: [47.268333, 11.393333],
        zoom: 9,
        fullscreenControl: true,
        gestureHandling: true,
    });

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
        ]).addTo(map6),
    }).addTo(map6);

    //Style Elevation
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile6",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
        edgeScale: true,
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