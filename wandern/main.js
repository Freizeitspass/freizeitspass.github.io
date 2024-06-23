//Map initialisieren
let lat = 47.25;
let lng = 11.50;
let zoom = 1;

let map = L.map("map", {
    fullscreenControl: true,
    gestureHandling: true,
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

//Multiple Slideshows, jetzt neuer Versuch mit dieser Anleitung: https://stackoverflow.com/questions/43299759/how-do-i-make-multiple-slideshows-in-the-same-html-document

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

// RainViewer Plugin
let rainviewer = new L.Control.Rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Start/Stopp',
    prevButtonText: '<',
    positionSliderLabelText: "Zeit:",
    opacitySliderLabelText: "Sichtbarkeit:",
    animationInterval: 500,
    opacity: 0.5
});
map.addControl(rainviewer);
