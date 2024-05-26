let slideNow = [0,0,0,0,0];

// Συνάρτηση για την εμφάνιση της επιθυμητής φωτογραφίας στην κάθε γκαλερί
function showSlide(galleryIndex, slideIndex) {
    const slides = document.querySelectorAll(`#gallery${galleryIndex} .picture`);
    const totalSlides = slides.length;

    // Έλεγχος για την κυκλική εναλλαγή φωτογραφιών
    if (slideIndex >= totalSlides) {
        slideNow[galleryIndex - 1] = 0;
    } else if (slideIndex < 0) {
        slideNow[galleryIndex - 1] = totalSlides - 1;
    } else {
        slideNow[galleryIndex - 1] = slideIndex;
    }

    // Κρυφή όλων των φωτογραφιών
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Εμφάνιση της επιθυμητής φωτογραφίας
    slides[slideNow[galleryIndex - 1]].style.display = 'block';
}

// Συνάρτηση για την εμφάνιση της επόμενης φωτογραφίας στην κάθε γκαλερί
function nextSlide(galleryIndex) {
    showSlide(galleryIndex, slideNow[galleryIndex - 1] + 1);
}

// Συνάρτηση για την εμφάνιση της προηγούμενης φωτογραφίας στην κάθε γκαλερί
function prevSlide(galleryIndex) {
    showSlide(galleryIndex, slideNow[galleryIndex - 1] - 1);
}

// Αρχικοποίηση των γκαλερί
showSlide(1, 0);
showSlide(2, 0);
showSlide(3, 0);
showSlide(4, 0);
showSlide(5, 0);


document.addEventListener('DOMContentLoaded', function () {
    let map = L.map('map').setView([21.353379, -89.177023], 9); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker = L.marker([21.353379, -89.177023]).addTo(map)
        .bindPopup('El Dorado Boutique Hotel')
        .openPopup();
});