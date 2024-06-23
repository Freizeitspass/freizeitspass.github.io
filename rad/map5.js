//Map initialisieren
let lat5 = 47.268333;
let lng5 = 11.393333;
let zoom5 = 11;

document.addEventListener('DOMContentLoaded', function () {
    let map5 = L.map("map5", {
        fullscreenControl: true,
        gestureHandling: true,
    }).setView([lat5, lng5], 11);


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
        ]).addTo(map5),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,
    }, {
        "Fahrradgeschäfte/-reparatur": themaLayer.bikeshop.addTo(map5),
        "Cafés/Restaurants": themaLayer.coffee.addTo(map5),
    }).addTo(map5);

    //Style Elevation
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile5",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
        edgeScale: false,
    }).addTo(map5);
    controlElevation.load("data/sellrain.gpx");


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
            title: "Radsport Neuner GmbH",
            link: "https://www.bikestoreneuner.com/",
            ort: "Kematen in Tirol",
            lat: 47.26420710613028,
            lng: 11.269072803358116,
        },
        {
            title: "Bikesport Baumgartner",
            link: "https://www.sport-baumgartner.at/",
            ort: "Völs",
            lat: 47.25835240590591,
            lng: 11.32184908194286,
        },
        {
            title: "Radl Werkstatt - MANG Thomas",
            link: "-",
            ort: "Zirl",
            lat: 47.27074145483338,
            lng: 11.253307261129905,
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
            title: "coffeekult Kaffeerösterei",
            link: "http://www.coffeekult.com/",
            ort: "Innsbruck",
            lat: 47.25652829874937,
            lng: 11.395917733227401,
        },
        {
            title: "Kostbar Mutters",
            link: "http://www.kostbar.tirol/",
            ort: "Mutters",
            lat: 47.22939567582593,
            lng: 11.385784905930416,
        },
        {
            title: "Kaffeestub'n am Pavillon",
            link: "https://www.herold.at/gelbe-seiten/axams/kPpTp/kaffeestubn-am-pavillon/",
            ort: "Axams",
            lat: 47.231891693884805,
            lng: 11.27856328952412,
        },
        {
            title: "schauplats / interior café wohnen",
            link: "http://www.schauplats.at/",
            ort: "Axams",
            lat: 47.22862580345009,
            lng: 11.278181230995395,
        },
        {
            title: "Gästehaus Edelweiss",
            link: "-",
            ort: "Tanneben",
            lat: 47.21305591724297,
            lng: 11.223648721193618,
        },
        {
            title: "Cafe Anni",
            link: "-",
            ort: "Sellrain",
            lat: 47.21336145378785,
            lng: 11.21378415332635,
        },
        {
            title: "Cafe Grünfelder",
            link: "https://pizzeria-cafe-gruenfelder.eatbu.com/",
            ort: "Oberperfuss",
            lat: 47.23626521786019,
            lng: 11.244025770058283,
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

});