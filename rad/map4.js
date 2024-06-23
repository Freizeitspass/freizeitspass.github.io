//Map initialisieren
let lat4 = 47.268333;
let lng4 = 11.393333;

document.addEventListener('DOMContentLoaded', function () {
    let map4 = L.map("map4", {
        center: [lat4, lng4],
        zoom: 11,
        fullscreenControl: true,
        gestureHandling: true,
        mapTypeId: 'terrain',
    });

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
        ]).addTo(map4),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,
    }, {
        "Fahrradgeschäfte/-reparatur": themaLayer.bikeshop.addTo(map4),
        "Cafés/Restaurants": themaLayer.coffee.addTo(map4),
    }).addTo(map4);

    //Style Elevation
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile4",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
        edgeScale: false,
    }).addTo(map4);
    controlElevation.load("data/seefeld.gpx");

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
        {
            title: "PWcycle - Fahrradreparatur & Service",
            link: "https://www.pwcycle.at/",
            ort: "Pettnau",
            lat: 47.291376802909305,
            lng: 11.159121193571826,
        },
        {
            title: "Bikepalast Telfs -Cubestore Telfs",
            link: "-",
            ort: "Telfs",
            lat: 47.313282961343546,
            lng: 11.101218725701125,
        },
        {
            title: "Fahrradverleih & Service",
            link: "-",
            ort: "Leutasch",
            lat: 47.37162804962264,
            lng: 11.164794159227261,
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
            title: "Wild Bean Café",
            link: "https://www.bp.com/de_at/austria/home/produkte-und-services/fuer-sie/kaffee-und-genuss.html",
            ort: "Telfs",
            lat: 47.30741967264585,
            lng: 11.078996947403871,
        },
        {
            title: "KAFFEE 13",
            link: "http://www.kaffee13.at/",
            ort: "Zirl",
            lat: 47.27214748264314,
            lng: 11.242332219624108,
        },
        {
            title: "landhauscafe Schöpf",
            link: "-",
            ort: "Mösern",
            lat: 47.31169409574331,
            lng: 11.146176303053728,
        },
        {
            title: "Cafe Niveau",
            link: "-",
            ort: "Seefeld in Tirol",
            lat: 47.32732860000119,
            lng: 11.187831125506147,
        },
        {
            title: "Sport Cafe",
            link: "-",
            ort: "Leutasch",
            lat: 47.37031045346174,
            lng: 11.162769722882114,
        },
        {
            title: "Café Weisse Katz",
            link: "-",
            ort: "Inzing",
            lat: 47.27394380389983,
            lng: 11.194932535135209,
        },
        {
            title: "Thomas ́ KAFFEE-& GENUSSMANUFAKTUR",
            link: "https://www.thomas-kaffee.tirol/",
            ort: "Telfs",
            lat: 47.31987815442093,
            lng: 11.072045838994661,
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
})

