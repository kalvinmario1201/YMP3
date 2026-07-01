const menuToogle = document.querySelector(".menu-toogle");
const rightNavbar = document.querySelector(".right-navbar");

menuToogle.addEventListener("click", () => {
    rightNavbar.classList.toogle("active");
});