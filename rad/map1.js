//Map initialisieren
let lat1 = 47.268333;
let lng1 = 11.393333;
let zoom1 = 9;

document.addEventListener('DOMContentLoaded', function () {
    let map1 = L.map("map1", {
        fullscreenControl: true,
        gestureHandling: true,
    }).setView([lat1, lng2], zoom1);

    // thematische Layer
    let themaLayer = {
        radladen: L.featureGroup()
    };

    // WMTS Hintergrundlayer der eGrundkarte Tirol
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


    // Hintergrundlayer eGrundkarte Tirol 
    L.control.layers({
        "eGrundkarte Tirol Sommer": L.layerGroup([
            eGrundkarteTirol.sommer,
            eGrundkarteTirol.nomenklatur
        ]).addTo(map1),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,

    },
        {
            "Radgeschäfte": themaLayer.radladen,

        }).addTo(map1);



    //Elevation Plugin
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile1",
        height: 300,
        theme: "blue-theme",
        distanceMarkers: false,
        collapsed: true,
        edgeScale: true,
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
});

//Radgeschäfte/Reparatur 
const RADLADEN = [
    {
        title: "Veloflott GmbH",
        lat: 47.27759,
        lng: 11.41669,
    },
];

for (let radladen of RADLADEN) {
    L.marker([radladen.lat, radladen.lng], {
        icon: L.icon({
            iconUrl: `icons/icecream.png`,
            popupAnchor: [0, -37],
            iconAnchor: [16, 37],
        })
    })
        .addTo(themaLayer.radladen)
        .bindPopup(`<b>${radladen.title}</b> <br>
    `)
};