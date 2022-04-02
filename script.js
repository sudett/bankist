"use strict";

const navItems = document.querySelectorAll(".nav__item");
const navLogo = document.querySelector(".nav__logo");
const btnClose = document.querySelector(".btn--close");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnNav = document.querySelector(".btn--nav");
const btnModal = document.querySelector(".btn--modal");

// Header hover functionality
navItems.forEach((navItem) => {
  navItem.addEventListener("mouseover", (e) => {
    navItems.forEach((navItem) => (navItem.style.opacity = 0.5));
    navLogo.style.opacity = 0.5;
    e.target.parentElement.style.opacity = 1;
  });

  navItem.addEventListener("mouseleave", (e) => {
    navItems.forEach((navItem) => (navItem.style.opacity = 1));
    navLogo.style.opacity = 1;
  });
});

// Modal functionality
btnNav.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

[btnModal, btnClose, overlay].forEach((item) =>
  item.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  })
);
