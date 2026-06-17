// script.js – Analoq soat funksiyalari

(function() {
    'use strict';

    const clockFace = document.getElementById('clockFace');
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const digitalClock = document.getElementById('digitalClock');

    // ----- 1. Soat belgilarini (marker) yaratish -----
    function createMarkers() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 12; i++) {
            const marker = document.createElement('div');
            marker.className = 'marker';
            // 12, 3, 6, 9 – katta marker
            if (i % 3 === 0) {
                marker.classList.add('major');
            }
            // 30° * i ga burish
            marker.style.transform = `rotate(${i * 30}deg)`;
            fragment.appendChild(marker);
        }

        // Markerlarni clockFace ga qo'shamiz (center-dot va millarni buzmaslik uchun)
        // Barcha markerlarni clockFace boshiga qo'shamiz, lekin center-dot va hands dan oldin
        const firstChild = clockFace.firstChild;
        if (firstChild) {
            clockFace.insertBefore(fragment, firstChild);
        } else {
            clockFace.appendChild(fragment);
        }
    }

    // ----- 2. Vaqtni yangilash -----
    function updateClock() {
        const now = new Date();

        // Soat, minut, sekund
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        // Raqamli vaqt (HH:MM:SS)
        const hh = String(hours).padStart(2, '0');
        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');
        digitalClock.innerHTML = `${hh}<span class="blink-colon">:</span>${mm}<span class="blink-colon">:</span>${ss}`;

        // ---- Millarni hisoblash ----
        // Soat milli: 12 soat = 360° => 1 soat = 30°, 1 minut = 0.5°
        const hourDeg = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
        // Minut milli: 60 minut = 360° => 1 minut = 6°, 1 sekund = 0.1°
        const minuteDeg = minutes * 6 + seconds * 0.1;
        // Sekund milli: 60 sekund = 360° => 1 sekund = 6°, millisekund hisobi
        const secondDeg = seconds * 6 + milliseconds * 0.006;

        // Millarni aylantirish
        hourHand.style.transform = `rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        secondHand.style.transform = `rotate(${secondDeg}deg)`;
    }

    // ----- 3. Boshlash -----
    function init() {
        createMarkers();
        updateClock(); // darhol yangilash
        setInterval(updateClock, 50); // 50ms da yangilash (silliq sekund)
    }

    // DOM tayyor bo'lganda ishga tushirish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();