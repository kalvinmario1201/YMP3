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