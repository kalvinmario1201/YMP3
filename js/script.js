const menuToggle = document.querySelector(".menu-toggle");
const rightNavbar = document.querySelector(".right-navbar");
const navLinks = document.querySelectorAll(".right-navbar a");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        rightNavbar.classList.remove("active");
    });
});

menuToggle.addEventListener("click", () => {
    rightNavbar.classList.toggle("active");
});