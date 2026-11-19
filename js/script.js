const menuToggle = document.querySelector(".menu-toggle");
const rightNavbar = document.querySelector(".right-navbar");
const navLinks = document.querySelectorAll(".right-navbar a");
const backToTop = document.getElementById("backToTop");
const fades = document.querySelectorAll(".fade");

const slides = document.querySelector(".slide");
const images = document.querySelectorAll(".visi-image-slider img");

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const dots = document.querySelectorAll(".dot");

const sliderContainer = document.querySelector(".visi-image-slider");

const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");

const searchContainer = document.querySelector(".search-container");
const searchClose = document.querySelector(".search-close");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

fades.forEach(el => observer.observe(el));

if (backToTop) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        rightNavbar.classList.remove("active");
    });
});

menuToggle.addEventListener("click", () => {
    rightNavbar.classList.toggle("active");
});

let currentSlide = 0;

function showSlide(index) {
    if (index >= images.length) {
        currentSlide = 0;

    } else if (index < 0) {
        currentSlide = images.length - 1;
    } else {
        currentSlide = index;
    }

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });
}

if (prevButton) {
    prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});

// fitur swipe android
if (sliderContainer) {
    let touchStartX = 0;
    let touchStartY = 0;

    sliderContainer.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    sliderContainer.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const differenceX = touchStartX - touchEndX;
        const differenceY = touchStartY - touchEndY;

        // Pastikan gerakan lebih dominan ke samping
        if (Math.abs(differenceX) > 50 &&
            Math.abs(differenceX) > Math.abs(differenceY)) {

            if (differenceX > 0) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(currentSlide - 1);
            }
        }
    }, { passive: true });
}

// Slide otomatis setiap 5 detik
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Search Box
if (searchToggle && searchBox && searchContainer && searchClose) {

    // Ketika ikon Search diklik
    searchToggle.addEventListener("click", () => {
        searchContainer.classList.add("active");
        searchBox.classList.add("active");
    });

    // Ketika tombol X diklik
    searchClose.addEventListener("click", () => {
        searchContainer.classList.remove("active");
        searchBox.classList.remove("active");
    });

}