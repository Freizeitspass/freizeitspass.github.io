//Map initialisieren
let lat2 = 47.268333;
let lng2 = 11.393333;
let zoom2 = 11;

document.addEventListener('DOMContentLoaded', function () {
    let map2 = L.map("map2", {
        fullscreenControl: true,
        gestureHandling: true,
    }).setView([lat2, lng2], 11);

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
        ]).addTo(map2),
        "eGrundkarte Tirol Orthophoto": L.layerGroup([
            eGrundkarteTirol.ortho,
            eGrundkarteTirol.nomenklatur
        ]),
        "OpenStreetMap": openStreetMap,
    }, {
        "Fahrradgeschäfte/-reparatur": themaLayer.bikeshop.addTo(map2),
        "Cafés/Restaurants": themaLayer.coffee.addTo(map2),
    }).addTo(map2);

    //Style Elevation
    let controlElevation = L.control.elevation({
        elevationDiv: "#profile2",
        height: 300,
        theme: "blue-theme",
        closeBtn: true,
        distanceMarkers: false,
        collapsed: true,
        edgeScale: false,
    }).addTo(map2);
    controlElevation.load("data/ellboegen.gpx");


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
            title: "Bikefabrik",
            link: "-",
            ort: "Lans",
            lat: 47.24559629799294,
            lng: 11.432010814878398,
        },
        {
            title: "Sport 2000 Resch",
            link: "http://www.sport-resch.com/",
            ort: "Steinach am Brenner",
            lat: 47.090992299835214,
            lng: 11.466006506121182,
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
            title: "Cafe Fiorina",
            link: "https://www.aegidihof.at/fiorina",
            ort: "Igls",
            lat: 47.23061466739177,
            lng: 11.410768926352457,
        },
        {
            title: "Waldcafé Sistrans",
            link: "https://www.waldcafe-sistrans.at/",
            ort: "Sistrans",
            lat: 47.231054682761666,
            lng: 11.446902221888312,
        },
        {
            title: "Cetos Sport Cafe Matrei",
            link: "-",
            ort: "Matrei am Brenner",
            lat: 47.13041910917551,
            lng: 11.452024115564821,
        },
        {
            title: "Konditorei Wagner",
            link: "https://konditorei-wagner-cafe.eatbu.com/?lang=de",
            ort: "Matrei am Brenner",
            lat: 47.131329399320634,
            lng: 11.452988277290974,
        },
        {
            title: "Kostbar Mutters",
            link: "http://www.kostbar.tirol/",
            ort: "Mutters",
            lat: 47.22939567582593,
            lng: 11.385784905930416,
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
    }).addTo(map2);


    // MiniMap 
    new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }), {
        toggleDisplay: true,
    }).addTo(map2);

    //Locate controle
    var lc = L.control
        .locate({
            position: "topright",
            strings: {
                title: "Show me where I am, yo!"
            }
        })
        .addTo(map2);

});