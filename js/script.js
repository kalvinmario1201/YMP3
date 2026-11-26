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

// slider onestory YMP3
const onestoryContainer = document.querySelector(".onestory-image-slider");

const onestoryImages = onestoryContainer?.querySelectorAll("img");
const onestorySlides = onestoryContainer?.querySelector(".slide");
const onestoryPrev = onestoryContainer?.querySelector(".prev-button");
const onestoryNext = onestoryContainer?.querySelector(".next-button");
const onestoryDots = onestoryContainer?.querySelectorAll(".dot");

const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");

const searchContainer = document.querySelector(".search-container");
const searchClose = document.querySelector(".search-close");

const readMore = document.querySelector(".read-more");

// image group
const imageGroups = document.querySelectorAll(".visi-image-slider, .content-image-slider, .impact-image-slider, .onestory-image-slider");

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("lightboxClose");
const prevLightbox = document.getElementById("lightboxPrev");
const nextLightbox = document.getElementById("lightboxNext")

const mapImage = document.querySelector(".peta-jangkauan img");

if (mapImage) {
    mapImage.addEventListener("click", () => {
        openLightbox([mapImage], 0);
    });
}

let currentImageIndex = 0;
let activeImage = [];

function openLightbox(images, index) {
    activeImage =images;
    currentImageIndex= index;

    showLightboxImage();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function showLightboxImage() {
    const image = activeImage[currentImageIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = image.alt;
}

function closeImageLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextImage() {
    currentImageIndex  = (currentImageIndex + 1) % activeImage.length;

    showLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + activeImage.length) % activeImage.length;

    showLightboxImage();
}

let touchStartX = 0;
let touchStartY = 0;

const swipeArea = lightboxImage;

swipeArea.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;

}, {passive: true});

swipeArea.addEventListener("touchend", (event) => {

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const differenceX = touchStartX - touchEndX;
    const differenceY = touchStartY - touchEndY;

    if (
        Math.abs(differenceX) > 50 &&
        Math.abs(differenceX) > Math.abs(differenceY)
    ) {
        if (differenceX > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }
}, {passive: true });

imageGroups.forEach((group) => {
    const images = group.querySelectorAll("img");

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            openLightbox(Array.from(images), index);
        });
    });
});

//  navigasi
closeLightbox.addEventListener("click", closeImageLightbox);
nextLightbox.addEventListener("click", nextImage);
prevLightbox.addEventListener("click", prevImage);

// klik area gelap untuk menutup gambar
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeImageLightbox();
    }
});

// tombol navigasi
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeImageLightbox();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
});

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
// FUNGSI SLIDER
function setupSlider(container) {
    if (!container) return;

    const images = container.querySelectorAll("img");
    const slides = container.querySelector(".slide");
    const prevButton = container.querySelector(".prev-button");
    const nextButton = container.querySelector(".next-button");
    const dots = container.querySelectorAll(".dot");

    if (!slides || images.length === 0) return;

    let currentSlide = 0;

    let autoSlide;
    let resumeTimeout;

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            pauseAutoSlide();
            clearTimeout(resumeTimeout);
        } else {
                startAutoSlide();
            }
    });

    // MENAMPILKAN GAMBAR
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

    // TOMBOL NEXT
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // TOMBOL PREVIOUS
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // AUTOPLAY CONTROL
    function startAutoSlide() {

        clearInterval(autoSlide);

        if (images.length <= 1) return;

        autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function pauseAutoSlide() {
        clearInterval(autoSlide);
    }

    function resumeAutoSlide() {

        clearTimeout(resumeTimeout);

        if (images.length <= 1) return;

        resumeTimeout = setTimeout(() => {
            startAutoSlide();
        }, 3000);
    }

    // MENGHENTIKAN AUTOPLAY KETIKA ADA INTERAKSI
    function handleInteraction() {
        pauseAutoSlide();
        resumeAutoSlide();
    }

    // TOMBOL NEXT
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            nextSlide();
            handleInteraction();
        });
    }

    // TOMBOL PREVIOUS
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            prevSlide();
            handleInteraction();
        });
    }

    // NAVIGASI KEYBOARD
    container.addEventListener("keydown", event => {

        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextSlide();
            handleInteraction();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            prevSlide();
            handleInteraction();
        }
    });

    // NAVIGASI DOTS
    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            showSlide(index);
            handleInteraction();
        });
    });

    // FITUR SWIPE
    let touchStartX = 0;
    let touchStartY = 0;

    container.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;

        pauseAutoSlide();
        clearTimeout(resumeTimeout);

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
                nextSlide();
            } else {
                prevSlide();
            }
        }

        resumeAutoSlide();

    }, { passive: true });

    // PAUSE KETIKA KURSOR BERADA DI ATAS SLIDER
    container.addEventListener("mouseenter", () => {

        pauseAutoSlide();
        clearTimeout(resumeTimeout);

    });

    // AUTOPLAY AKTIF KEMBALI KETIKA KURSOR KELUAR
    container.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    // INISIALISASI SLIDER
    showSlide(0);
    startAutoSlide();

}


// JALANKAN SLIDER BERANDA
setupSlider(document.querySelector(".visi-image-slider"));

// JALANKAN SLIDER ABOUT YMP3
setupSlider(document.querySelector(".content-image-slider"));

// JALANKAN SLIDER IMPACT
setupSlider(document.querySelector(".impact-image-slider"));

// JALANKAN SLIDER ONESTORY
setupSlider(document.querySelector(".onestory-image-slider"));

function toggleText(id, button) {
    const text = document.getElementById(id);

    if (!text) return;
    text.classList.toggle("expanded");

    if (text.classList.contains("expanded")) {
        button.textContent = "Baca Lebih Sedikit";
    } else {
        button.textContent = "Lihat Selengkapnya..."
    }
}

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