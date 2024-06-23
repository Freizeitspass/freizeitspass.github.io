//Map initialisieren
let lat1 = 47.268333;
let lng1 = 11.393333;
let zoom1 = 11;


document.addEventListener('DOMContentLoaded', function () {
    let map1 = L.map("map1", {
        fullscreenControl: true,
        gestureHandling: true,
    }).setView([lat1, lng2], zoom1);

    // thematische Layer
    let themaLayer = {
        bikeshop: L.featureGroup(),
        coffee: L.featureGroup()
    };

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
    let layerControl = L.control.layers({
        "eGrundkarte Tirol Sommer": L.layerGroup([
            eGrundkarteTirol.sommer,
            eGrundkarteTirol.nomenklatur
        ]).addTo(map1),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,
    }, {
        "Fahrradgeschäfte/-reparatur": themaLayer.bikeshop.addTo(map1),
        "Cafés/Restaurants": themaLayer.coffee.addTo(map1),
    }).addTo(map1);

    //Elevation Plugin
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile1",
        height: 300,
        theme: "blue-theme",
        distanceMarkers: false,
        collapsed: true,
        edgeScale: false,
    }).addTo(map1);
    controlElevation.load("data/gnadenwald.gpx");

    //Bikeshops Liste
    const BIKESHOP = [
        {
            title: "Alpin Bike - Fahrradservice & Reparatur",
            link: "http://www.alpin-bike.at/",
            ort: "Innsbruck",
            lat: 47.27877864015659,
            lng: 11.370899941018507,

        },
        {
            title: "Bike Klinik Innsbruck",
            link: "https://www.bike-klinik.com/",
            ort: "Innsbruck",
            lat: 47.27482897493371,
            lng: 11.404881058358859,
        },
        {
            title: "Fahrradladen Innsbruck",
            link: "https://www.fahrradladen-innsbruck.at/",
            ort: "Innsbruck",
            lat: 47.25522225775388,
            lng: 11.396223510784315,
        },
        {
            title: "Veloflott GmbH",
            link: "https://www.veloflott.at/",
            ort: "Innsbruck",
            lat: 47.276823813800476,
            lng: 11.412865313018468,
        },
        {
            title: "WAMS Radwerkstatt Conrad",
            link: "-",
            ort: "Innsbruck",
            lat: 47.262814924800566,
            lng: 11.378780777203447,
        },
        {
            title: "Die Bike Box",
            link: "http://www.diebikebox.com/",
            ort: "Hall in Tirol",
            lat: 47.28075454213907,
            lng: 11.508268475934218,
        },
        {
            title: "Bikebow GmbH",
            link: "https://www.bikebow.at/",
            ort: "Hall in Tirol",
            lat: 47.28952375496829,
            lng: 11.581261919773226,
        },
        {
            title: "Manu's Radwerkstatt",
            link: "http://www.mk-radwerkstatt.at/",
            ort: "Volders",
            lat: 47.28700374918285,
            lng: 11.56730575358996,
        },
        {
            title: "Radgut Bikestore + Werkstatt",
            link: "https://www.radgut.at/",
            ort: "Vomperbach",
            lat: 47.325095602842794,
            lng: 11.675931908999685,
        },
        {
            title: "Bikepalast Tirol - Cubestore Volders",
            link: "https://web.bikepalast.com/",
            ort: "Volders",
            lat: 47.28952375496829,
            lng: 11.581261919773226,
        },

    ]


    //Bikeshops Popups
    for (let bikeshop of BIKESHOP) {
        L.marker([bikeshop.lat, bikeshop.lng], {
            icon: L.icon({
                iconUrl: `icons/bicycle_shop.png`,
                popupAnchor: [0, -37],
                iconAnchor: [16, 37],
            })
        })
            .addTo(themaLayer.bikeshop)
            .bindPopup(`<b>${bikeshop.title}</b> <br> ${bikeshop.ort} | <a href="${bikeshop.link}">Zur Website</a> 
    `)
    };

    //Cafes Liste
    const COFFEE = [
        {
            title: "manni.coffee",
            link: "-",
            ort: "Innsbruck",
            lat: 47.26537316391705,
            lng: 11.394063993012983,

        },
        {
            title: "haepinest",
            link: "https://haepinest.at/",
            ort: "Innsbruck",
            lat: 47.271126885551034,
            lng: 11.391991823597085,
        },
        {
            title: "Cafe Platzl",
            link: "-",
            ort: "Rum",
            lat: 47.2872244805296,
            lng: 11.457385753772916,
        },
        {
            title: "Forum Cafe",
            link: "-",
            ort: "Rum",
            lat: 47.2872244805296,
            lng: 11.458931803749055,
        },
        {
            title: "Cafe-Konditorei Schreiner",
            link: "https://www.hall-wattens.at/de/absam/info/alpengasthof-walderbruecke.html",
            ort: "Absam",
            lat: 47.29494903499993,
            lng: 11.472414755996965,
        },
        {
            title: "Hotel Speckbacherhof",
            link: "https://www.speckbacherhof.at/",
            ort: "Gnadenwald",
            lat: 47.319630742160776,
            lng: 11.553950963207264,
        },
        {
            title: "Julia´s Kuchenstüberl Volders",
            link: "https://www.julias-kuchenstueberl.at/",
            ort: "Volders",
            lat: 47.28770401567384,
            lng: 11.570158035694938,
        },
    ]


    //Cafes Popups
    for (let coffee of COFFEE) {
        L.marker([coffee.lat, coffee.lng], {
            icon: L.icon({
                iconUrl: `icons/coffee.png`,
                popupAnchor: [0, -37],
                iconAnchor: [16, 37],
            })
        })
            .addTo(themaLayer.coffee)
            .bindPopup(`<b>${coffee.title}</b> <br> ${coffee.ort} | <a href="${coffee.link}">Zur Website</a> 
`)
    };


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
        })
        .addTo(map1);
});

