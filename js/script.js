const menuToggle = document.querySelector(".menu-toggle");
const rightNavbar = document.querySelector(".right-navbar");
const navLinks = document.querySelectorAll(".right-navbar a");
const backToTop = document.getElementById("backToTop");
const reveals = document.querySelectorAll(".reveal");

// slider beranda
const sliderContainer = document.querySelector(".visi-image-slider");

const visiImages = sliderContainer?.querySelectorAll("img");
const visiSlides = sliderContainer?.querySelector(".slide");
const visiPrev = sliderContainer?.querySelector(".prev-button");
const visiNext = sliderContainer?.querySelector(".next-button");
const visiDots = sliderContainer?.querySelectorAll(".dot");

// slider tentang YMP3
const contentContainer = document.querySelector(".content-image-slider");

const contentImages = contentContainer?.querySelectorAll("img");
const contentSlides = contentContainer?.querySelector(".slide");
const contentPrev = contentContainer?.querySelector(".prev-button");
const contentNext = contentContainer?.querySelector(".next-button");
const contentDots = contentContainer?.querySelectorAll(".dot");

// slider impact YMP3
const impactContainer = document.querySelector(".impact-image-slider");

const impactImages = impactContainer?.querySelectorAll("img");
const impactSlides = impactContainer?.querySelector(".slide");
const impactPrev = impactContainer?.querySelector(".prev-button");
const impactNext = impactContainer?.querySelector(".next-button");
const impactDots = impactContainer?.querySelectorAll(".dot");

const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");

const searchContainer = document.querySelector(".search-container");
const searchClose = document.querySelector(".search-close");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");

            observer.unobserve(entry.target);
        }
    });
});

reveals.forEach(el => observer.observe(el));

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

// FUNGSI SLIDER
function setupSlider(container) {

    if (!container) return;

    const images = container.querySelectorAll("img");
    const slides = container.querySelector(".slide");
    const prevButton = container.querySelector(".prev-button");
    const nextButton = container.querySelector(".next-button");
    const dots = container.querySelectorAll(".dot");

    let currentSlide = 0;

    if (!slides || images.length === 0) return;

    // Menampilkan gambar
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

    // Tombol Next
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });
    }

    // Tombol Previous
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });
    }

    container.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentSlide + 1);
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault()
        showSlide(currentSlide - 1);
    }
});

    // Navigasi Dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
        });
    });

    // Fitur Swipe
    let touchStartX = 0;
    let touchStartY = 0;

    container.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    container.addEventListener("touchend", event => {

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const differenceX = touchStartX - touchEndX;
        const differenceY = touchStartY - touchEndY;

        if (
            Math.abs(differenceX) > 50 &&
            Math.abs(differenceX) > Math.abs(differenceY)
        ) {

            if (differenceX > 0) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(currentSlide - 1);
            }
        }

    }, { passive: true });

    // Slide Otomatis
    if (images.length > 1) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

}

// Jalankan Slider Beranda
setupSlider(document.querySelector(".visi-image-slider"));

// Jalankan Slider About YMP3
setupSlider(document.querySelector(".content-image-slider"));

// Jalankan Slider Impact
setupSlider(document.querySelector(".impact-image-slider"))

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