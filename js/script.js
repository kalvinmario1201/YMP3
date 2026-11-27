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

// slider obt YMP3
const obtContainer = document.querySelector(".obt-image-slider");

const obtImages = obtContainer?.querySelectorAll("img");
const obtSlides = obtContainer?.querySelector(".slide");
const obtPrev = obtContainer?.querySelector(".prev-button");
const obtNext = obtContainer?.querySelector(".next-button");
const obtDots = obtContainer?.querySelectorAll(".dot");

// slider terjemahan tertulis
const scriptureContainer = document.querySelector(".scripture-image-slider");

const scriptureImages = scriptureContainer?.querySelectorAll("img");
const scriptureSlides = scriptureContainer?.querySelector(".slide");
const scripturePrev = scriptureContainer?.querySelector(".prev-button");
const scriptureNext = scriptureContainer?.querySelector(".next-button");
const scriptureDots = scriptureContainer?.querySelectorAll(".dot");

// slider pendidikan
const studiesContainer = document.querySelector(".studies-image-slider");

const studiesImages = studiesContainer?.querySelectorAll("img");
const studiesSlides = studiesContainer?.querySelector(".slide");
const studiesPrev = studiesContainer?.querySelector(".prev-button");
const studiesNext = studiesContainer?.querySelector(".next-button");
const studiesDots = studiesContainer?.querySelectorAll(".dots");

// slider misionaris
const missionaryContainer = document.querySelector(".missionary-image-slider");

const missionaryImages = missionaryContainer?.querySelectorAll("img");
const missionarySlides = missionaryContainer?.querySelector(".slide");
const missionaryPrev = missionaryContainer?.querySelector(".prev-button");
const missionaryNext = missionaryContainer?.querySelector(".next-button");
const missionaryDots = missionaryContainer?.querySelectorAll(".dots");

// ELEMEN LIGHTBOX
const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("lightboxClose");
const prevLightbox = document.getElementById("lightboxPrev");
const nextLightbox = document.getElementById("lightboxNext");

const zoomInButton = document.getElementById("lightboxZoomIn");
const zoomOutButton = document.getElementById("lightboxZoomOut");
const zoomResetButton = document.getElementById("lightboxZoomReset");


const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");

const searchContainer = document.querySelector(".search-container");
const searchClose = document.querySelector(".search-close");

const readMore = document.querySelector(".read-more");

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

// JALANKAN SLIDER OBT
setupSlider(document.querySelector(".obt-image-slider"));

// JALANKAN SLIDER TERJEMAHAN TERTULIS
setupSlider(document.querySelector(".scripture-image-slider"));

// JALANKAN SLIDER PENDIDIKAN
setupSlider(document.querySelector(".studies-image-slider"));

// JALANKAN SLIDER MISIONARIS
setupSlider(document.querySelector(".missionary-image-slider"));

// ================= IMAGE LIGHTBOX =================


// VARIABEL
let activeImages = [];
let currentImageIndex = 0;

let lightboxScale = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imageOffsetX = 0;
let imageOffsetY = 0;
let startOffsetX = 0;
let startOffsetY = 0;

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const ZOOM_STEP = 0.5;


// ================= ZOOM =================

function limitImagePosition () {
    const rect = lightboxImage.getBoundingClientRect();

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const maxX = Math.max(0, (rect.width - screenWidth) / 2);
    const maxY = Math.max(0, (rect.height - screenHeight) / 2);

    imageOffsetX = Math.max(-maxX, Math.min(maxX, imageOffsetX));
    imageOffsetY = Math.max(-maxY, Math.min(maxY, imageOffsetY));
}

function updateImageTransform() {
    limitImagePosition();

    lightboxImage.style.transform = `
        translate(${imageOffsetX}px, ${imageOffsetY}px)
        scale(${lightboxScale})
    `;

    lightboxImage.classList.toggle("zoomed", lightboxScale > 1);
}

function zoomIn() {
    lightboxScale = Math.min(
        lightboxScale + ZOOM_STEP,
        MAX_ZOOM
    );

    updateImageTransform();
}

function zoomOut() {
    lightboxScale = Math.max(
        lightboxScale - ZOOM_STEP,
        MIN_ZOOM
    );

    if (lightboxScale === MIN_ZOOM) {
        imageOffsetX = 0;
        imageOffsetY = 0;
    }

    updateImageTransform();
}

function resetZoom() {
    lightboxScale = 1;
    imageOffsetX = 0;
    imageOffsetY = 0;

    lightboxImage.style.transformOrigin = "center center";

    updateImageTransform();
}


// ================= MOUSE DRAG =================

// Mulai drag
lightboxImage.addEventListener("mousedown", event => {

    if (lightboxScale <= 1) return;

    event.preventDefault();

    isDragging = true;

    dragStartX = event.clientX;
    dragStartY = event.clientY;

    startOffsetX = imageOffsetX;
    startOffsetY = imageOffsetY;

    lightboxImage.style.cursor = "grabbing";

});

// Geser gambar
document.addEventListener("mousemove", event => {

    if (!isDragging) return;

    const differenceX = event.clientX - dragStartX;
    const differenceY = event.clientY - dragStartY;

    imageOffsetX = startOffsetX + differenceX;
    imageOffsetY = startOffsetY + differenceY;

    updateImageTransform();

});

// Selesaikan drag
document.addEventListener("mouseup", () => {

    if (!isDragging) return;

    isDragging = false;

    lightboxImage.style.cursor =
        lightboxScale > 1 ? "grab" : "default";

});

// TOMBOL ZOOM
zoomInButton?.addEventListener("click", zoomIn);

zoomOutButton?.addEventListener("click", zoomOut);

zoomResetButton?.addEventListener("click", resetZoom);


// SCROLL MOUSE
lightboxImage?.addEventListener("wheel", event => {

    event.preventDefault();

    if (event.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }

}, { passive: false });


// ================= MENAMPILKAN GAMBAR =================

function showLightboxImage() {

    const image = activeImages[currentImageIndex];

    if (!image) return;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";

    lightboxCaption.textContent = image.alt || "";

    resetZoom();

}


// ================= MEMBUKA LIGHTBOX =================

function openLightbox(images, index) {

    if (!lightbox || !lightboxImage || !images.length) return;

    activeImages = images;

    currentImageIndex = index;

    showLightboxImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


// ================= MENUTUP LIGHTBOX =================

function closeImageLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    resetZoom();

}


// ================= NAVIGASI GAMBAR =================

function nextImage() {

    if (!activeImages.length) return;

    currentImageIndex =
        (currentImageIndex + 1) % activeImages.length;

    showLightboxImage();

}


function prevImage() {

    if (!activeImages.length) return;

    currentImageIndex =
        (currentImageIndex - 1 + activeImages.length) % activeImages.length;

    showLightboxImage();

}


// ================= DETEKSI GAMBAR =================

// KELAS SLIDER
const sliderSelector = [
    ".visi-image-slider",
    ".content-image-slider",
    ".impact-image-slider",
    ".onestory-image-slider",
    ".obt-image-slider",
    ".scripture-image-slider",
    ".studies-image-slider",
    ".missionary-image-slider"
].join(", ");


// KLIK GAMBAR
document.addEventListener("click", event => {

    const image = event.target.closest("img");

    if (!image) return;

    // Abaikan gambar dalam Lightbox
    if (image.closest("#imageLightbox")) return;

    // Abaikan gambar yang tidak memerlukan Lightbox
    if (image.closest(
        "header, nav, footer, .logo, .social-icons, [data-no-lightbox]"
    )) return;

    // PETA
    const map = image.closest(".peta-jangkauan");

    if (map) {

        openLightbox([image], 0);

        return;

    }

    // SLIDER
    const slider = image.closest(sliderSelector);

    if (slider) {

        const images = Array.from(slider.querySelectorAll("img"));

        const index = images.indexOf(image);

        if (index !== -1) {
            openLightbox(images, index);
        }

        return;

    }

    // GAMBAR DI LUAR SLIDER
    openLightbox([image], 0);

});


// ================= TOMBOL NAVIGASI =================

closeLightbox?.addEventListener("click", closeImageLightbox);

nextLightbox?.addEventListener("click", nextImage);

prevLightbox?.addEventListener("click", prevImage);


// KLIK AREA GELAP
lightbox?.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeImageLightbox();
    }

});


// ================= KEYBOARD =================

document.addEventListener("keydown", event => {

    if (!lightbox?.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeImageLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        prevImage();
    }

});


// ================= SWIPE ANDROID =================

let touchStartX = 0;
let touchStartY = 0;

let initialPinchDistance = 0;
let initialPinchScale = 1;
let touchGesture = null;

let lastTapTime = 0;
let lastTapX = 0;
let lastTapY = 0;
let touchStartTime = 0;

let closeSwipeThreshold = 100;

function getPinchDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;

    return Math.sqrt(dx * dx + dy * dy);
}

// ================= TOUCH CONTROL LIGHTBOX =================

lightboxImage?.addEventListener("touchstart", event => {

    // PINCH ZOOM: DUA JARI
    if (event.touches.length === 2) {

        touchGesture = "pinch";

        initialPinchDistance = getPinchDistance(
            event.touches[0],
            event.touches[1]
        );

        initialPinchScale = lightboxScale;

    }

    // SATU JARI
    else if (event.touches.length === 1) {

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;

        touchStartTime = Date.now();

        startOffsetX = imageOffsetX;
        startOffsetY = imageOffsetY;

        touchGesture = lightboxScale > 1 ? "pan" : "swipe";

    }

}, { passive: true });


// ================= TOUCH MOVE =================

lightboxImage?.addEventListener("touchmove", event => {

    // PINCH ZOOM
    if (touchGesture === "pinch" && event.touches.length === 2) {

        event.preventDefault();

        const currentDistance = getPinchDistance(
            event.touches[0],
            event.touches[1]
        );

        if (initialPinchDistance === 0) return;

        const scaleRatio = currentDistance / initialPinchDistance;

        lightboxScale = Math.min(
            MAX_ZOOM,
            Math.max(MIN_ZOOM, initialPinchScale * scaleRatio)
        );

        if (lightboxScale === MIN_ZOOM) {
            imageOffsetX = 0;
            imageOffsetY = 0;
        }

        updateImageTransform();

    }

    // DRAG GAMBAR DENGAN SATU JARI
    else if (
        touchGesture === "pan" &&
        event.touches.length === 1 &&
        lightboxScale > 1
    ) {

        event.preventDefault();

        const differenceX = event.touches[0].clientX - touchStartX;
        const differenceY = event.touches[0].clientY - touchStartY;

        imageOffsetX = startOffsetX + differenceX;
        imageOffsetY = startOffsetY + differenceY;

        updateImageTransform();

    }

}, { passive: false });


// ================= TOUCH END =================

lightboxImage?.addEventListener("touchend", event => {

    // SELESAI PINCH ZOOM
    if (touchGesture === "pinch") {

        if (event.touches.length === 0) {
            touchGesture = null;
            initialPinchDistance = 0;
        }

        return;
    }

    if (event.changedTouches.length === 1) {

        const touch = event.changedTouches[0];
        const now = Date.now();

        const touchDuration = now - touchStartTime;

        const differenceX = touch.clientX - touchStartX;
        const differenceY = touch.clientY - touchStartY;

        const movementX = Math.abs(differenceX);
        const movementY = Math.abs(differenceY);

        const isTap =
            touchDuration < 250 &&
            movementX < 15 &&
            movementY < 15;

        let isDoubleTap = false;

        // ================= DOUBLE TAP ZOOM =================

        if (isTap) {

            const tapDistance = Math.sqrt(
                Math.pow(touch.clientX - lastTapX, 2) +
                Math.pow(touch.clientY - lastTapY, 2)
            );

            if (
                now - lastTapTime < 300 &&
                tapDistance < 30
            ) {

                isDoubleTap = true;
                lastTapTime = 0;

                if (lightboxScale > 1) {
                    resetZoom();
                } else {
                    lightboxScale = Math.min(2, MAX_ZOOM);
                    updateImageTransform();
                }

            } else {

                lastTapTime = now;
                lastTapX = touch.clientX;
                lastTapY = touch.clientY;

            }

        } else {

            lastTapTime = 0;

        }


        // ================= SWIPE KE BAWAH =================

        if (
            !isDoubleTap &&
            touchGesture === "swipe" &&
            lightboxScale <= 1 &&
            differenceY > closeSwipeThreshold &&
            movementY > movementX
        ) {

            closeImageLightbox();

            lastTapTime = 0;
            touchGesture = null;

            return;
        }


        // ================= SWIPE HORIZONTAL =================

        if (
            !isDoubleTap &&
            touchGesture === "swipe" &&
            lightboxScale <= 1 &&
            movementX > 50 &&
            movementX > movementY
        ) {

            if (differenceX < 0) {
                nextImage();
            } else {
                prevImage();
            }

        }

    }

    if (event.touches.length === 0) {
        touchGesture = null;
    }

}, { passive: true });

// ================= TOUCH CANCEL =================

lightboxImage?.addEventListener("touchcancel", () => {

    touchGesture = null;
    initialPinchDistance = 0;

});

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