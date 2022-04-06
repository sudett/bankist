"use strict";

const sections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");
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
const header = document.querySelector(".header");
const featuresImages = document.querySelectorAll(".features__img");
const slides = document.querySelectorAll(".slide");
const slideBtnLeft = document.querySelector(".slider__btn--left");
const slideBtnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

/////////// Header hover functionality
const handleHover = function (e) {
  if (!e.target.classList.contains("nav__link")) return;

  // fade out/in links(except target link) and logo
  navLinks.forEach((link) => {
    if (link !== e.target) link.style.opacity = this;
  });
  navLogo.style.opacity = this;
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

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

/////////// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  if (!entries[0].isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //stick navigation before reach section features
});
headerObserver.observe(header);

/////////// Reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  //stop observing section
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

//observing all sections
sections.forEach((section) => sectionObserver.observe(section));

/////////// Lazy loading images
const lazyLoading = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replace src(low quality image) with data-src(real image)
  const newSrc = entry.target.dataset.src;
  entry.target.setAttribute("src", newSrc);

  //after loading the high quality image, remove the blur effect
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  //stop observing images after loading images
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
});

featuresImages.forEach((img) => imageObserver.observe(img));

/////////// Slider
let curSlide = 0;

//create dots
const createDots = () => {
  slides.forEach((slide, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="${
        i === 0 ? "dots__dot--active" : ""
      } dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

//slider
const slider = (curSlide) => {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  );
};
slider(0);

//add active dot class
const dots = document.querySelectorAll(".dots__dot");

const activateDot = () => {
  dots.forEach((dot, i) => {
    if (i === curSlide) dot.classList.add("dots__dot--active");
    else dot.classList.remove("dots__dot--active");
  });
};

//slide through dots
dotsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dots__dot")) return;
  curSlide = +e.target.dataset.slide;
  slider(curSlide);
  activateDot();
});

//next slide
const nextSlide = () => {
  curSlide++;

  if (curSlide >= slides.length) curSlide = 0;

  slider(curSlide);
  activateDot();
};

slideBtnRight.addEventListener("click", nextSlide);

//previous slide
const prevSlide = () => {
  curSlide--;

  if (curSlide < 0) curSlide = slides.length - 1;

  slider(curSlide);
  activateDot();
};

slideBtnLeft.addEventListener("click", prevSlide);

//slide through keyboard arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
