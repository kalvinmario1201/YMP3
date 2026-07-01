const menuToogle = document.querySelector(".menu-toogle");
const rightNavbar = document.querySelector(".right-navbar");
const navLinks = document.querySelectorAll(".right-navbar a");
const backToTop =document.getElementById("backToTop");
const fades = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

fades.forEach(el=>observer.observe(el));

window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }
});

backToTop.onclick = () => {
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
};


navLinks.forEach(link => {
    link.addEventListener("click", () => {
        rightNavbar.classList.remove("active");
    });
});

menuToogle.addEventListener("click", () => {
    rightNavbar.classList.toogle("active");
});