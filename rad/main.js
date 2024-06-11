
//Map initialisieren
let lat = 47.268333;
let lng = 11.393333;
let zoom = 11;

let map = L.map("map", {
    fullscreenControl: true,
}).setView([lat, lng], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Maßstab hinzugefügt
L.control.scale({
    imperial: false,
}).addTo(map);

//Popup hinzugefügt
let marker = L.marker([47.268333, 11.393333]).addTo(map);
marker.bindPopup(`
<b> Innsbruck </b>
`).openPopup(); 