//Map initialisieren
let lat = 47.06;
let lng = 11.89;
let zoom = 2;

let map = L.map("map", {
    fullscreenControl: true,
    gestureHandling: true,
}).setView([lat, lng], 2);

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

// Overlay-Layer für Routen
let overlayLayers = {
    "Karwendel Route": karwendelLayer,
    "Inntal Route": inntallLayer
};

// Layers Control hinzufügen
let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
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

// RainViewer setup
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


//Slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Vorhäriges/nächstes Foto
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
};
