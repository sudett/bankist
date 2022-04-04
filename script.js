"use strict";

const navItems = document.querySelectorAll(".nav__item");
const navLogo = document.querySelector(".nav__logo");
const btnClose = document.querySelector(".btn--close");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnNav = document.querySelector(".btn--nav");
const btnModal = document.querySelector(".btn--modal");
const btnTxt = document.querySelector(".btn--txt");
const sectionFeatures = document.getElementById("section-features");
const navList = document.querySelector(".nav__list");
const tabContainer = document.querySelector(".operations__tab-container");
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsContents = document.querySelectorAll(".operations__content");

/////////// Header hover functionality
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

/////////// Modal functionality
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//open modal on clicking btnNav
btnNav.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//close modal on cliking button close, overlay, button modal
[btnModal, btnClose, overlay].forEach((item) =>
  item.addEventListener("click", closeModal)
);

//close modal on press scape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/////////// Smooth scrolling
btnTxt.addEventListener("click", (e) => {
  //prevent link default functionality
  e.preventDefault();

  sectionFeatures.scrollIntoView({ behavior: "smooth" });
});

//page navigation
navList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("nav__link")) return;

  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

/////////// Tabbed component
tabContainer.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest(".operations__tab");

  if (!clickedBtn) return;

  // Remove active class from all tabs
  operationsTabs.forEach((tab) =>
    tab.classList.remove("operations__tab--active")
  );

  // Add active class to the target tab
  clickedBtn.classList.add("operations__tab--active");

  // Hide all contents
  operationsContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Display target content
  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add("operations__content--active");
});
