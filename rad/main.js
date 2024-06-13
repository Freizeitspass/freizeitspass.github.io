//Mal schauen was hier dann noch reinmuss; Karten jetzt alle im eigenen JS

//DropDown Menü für Navigation 
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});