//  Data GV AT : https://www.data.gv.at/suche/?typeFilter%5B%5D=dataset&searchterm=tirol&searchin=data&formatFilter%5B%5D=JSON Quellen
// Weitwanderwege: https://www.tirol.at/reisefuehrer/sport/wandern/weitwandern
// Weitwanderwege andere Quelle: https://www.almenrausch.at/touren/mehrtagestouren-sommer/tirol/
// mögliche Quelle für Almen/Gasthäuser: https://www.almenrausch.at/einkehr-uebernachtung/gasthoefe-alpengasthoefe-gasthaeuser/tirol/
// weitere Quelle: https://geohub-1-magibk.hub.arcgis.com/apps/f405522fae6e4e38b1feb0029c7f4817/explore
// über Data DV AT gefunden: https://data-tiris.opendata.arcgis.com/datasets/almzentren-1 

//Map initialisieren
var map = L.map('map').setView([47.268333, 11.393333], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);