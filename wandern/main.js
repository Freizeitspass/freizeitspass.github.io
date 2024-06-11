//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 9;

let map = L.map("map", {
    fullscreenControl: true,
}).setView([lat, lng], 11);

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

// Hintergrundlayer eGrundkarte Tirol
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
}).addTo(map);

//Maßstab 
L.control.scale({
    imperial: false,
}).addTo(map);

//Pulldown (noch nur kopiert und nicht verändert von biketirol)
let pulldown = document.querySelector("#pulldown");
// console.log("Pulldown: ", pulldown);

for (let etappe of ETAPPEN) {
    let status = "";
    if (etappe.nr == 19) {
        status = " selected ";
    }
    pulldown.innerHTML += `<option ${status} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.titel}</option>`;
};

pulldown.onchange = function (evt) {
    // console.log("Pulldown change event: ", evt);
    // console.log("User: ", evt.target.value);
    let username = evt.target.value;
    let url = `https://${username}.github.io/biketirol`;
    // console.log("Url: ", url);
    // console.log(window.location);
    window.location.href = url;
}

// MiniMap 
new L.Control.MiniMap(L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
    attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
}), {
    toggleDisplay: true,
}).addTo(map);