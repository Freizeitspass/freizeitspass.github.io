//Map initialisieren
let lat = 47.25;
let lng = 11.50;
let zoom = 1;

let map = L.map("map", {
    fullscreenControl: true,
    gestureHandling: false,
}).setView([lat, lng], 0);

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

// Hintergrundlayer eGrundkarte Tirol
let baseLayers = {
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
};

// Layers für Routen
let karwendelLayer = L.layerGroup();
let inntallLayer = L.layerGroup();

// Thema-Layer für Routen
let themaLayer = {
    "Karwendel Route": karwendelLayer,
    "Inntal Route": inntallLayer
};

// Layers Control hinzufügen
let layerControl = L.control.layers(baseLayers, themaLayer).addTo(map);
//Maßstab 
L.control.scale({
    imperial: false,
}).addTo(map);

// MiniMap 
new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
    attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
}), {
    toggleDisplay: true,
}).addTo(map);


//GPX mit Höhenprofil einbinden
let controlElevationKarwendel = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme",
    collapsed: true
}).addTo(map);
controlElevationKarwendel.load("data/gps-daten-karwendel-hoehenweg.gpx");


let controlElevationInntal = L.control.elevation({
    // time: false,
    position: "bottomleft",
    theme: "steelblue-theme",
    collapsed: true,
    legend: true
}).addTo(map);
controlElevationInntal.load("data/gps-track-inntaler-hoehenweg.gpx");

/*
//neuer Weg Elevation
//Festival-Radweg
var gpx = 'data/gps-daten-karwendel-hoehenweg.gpx';
let karwendel = new L.GPX(gpx, {
    polyline_options: {
        color: '#8D021F',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.karwendelLayer);

// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
festival.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "festival"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("data/gps-daten-karwendel-hoehenweg.gpx")
});
*/


// Locate Control
L.control.locate().addTo(map);

// Nach oben scrollen Button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* Diese Anleitung: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_multiple
//Slideshow
let slideIndex = [1, 1];
let slideID = ["slides-karwendel", "slides-inntal"]
showSlides(1, 0);
showSlides(1, 1);

// Vorheriges/nächstes Foto
function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n, no) {
    let i;
    let x = document.getElementsByClassName(slideID[no]);
    if (n > x.length) { slideIndex[no] = 1 }
    if (n < 1) { slideIndex[no] = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex[no] - 1].style.display = "block";
} */

//neuer Versuch mit dieser Anleitung: https://stackoverflow.com/questions/43299759/how-do-i-make-multiple-slideshows-in-the-same-html-document

var slideskarwendel = document.getElementById("slideskarwendel");
slideskarwendel.currentSlideIndex = 1;
showSlides(slideskarwendel.currentSlideIndex, slideskarwendel);

var slidesinntal = document.getElementById("slidesinntal");
slidesinntal.currentSlideIndex = 1;
showSlides(slidesinntal.currentSlideIndex, slidesinntal);


function plusSlides(n, slideshow) {
    showSlides(slideshow.currentSlideIndex += n, slideshow);
}

function currentSlide(n, slideshow) {
    showSlides(slideshow.currentSlideIndex = n, slideshow);
}

function showSlides(n, slideshow) {



    var i;
    var slides = slideshow.getElementsByClassName("mySlides");
    var dots = slideshow.getElementsByClassName("dot");
    if (n > slides.length) { slideshow.currentSlideIndex = 1 }
    if (n < 1) { slideshow.currentSlideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideshow.currentSlideIndex - 1].style.display = "block";
    dots[slideshow.currentSlideIndex - 1].className += " active";
}