"use strict";

// DOM ELEMENTS
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const home = document.getElementById("home");
const svg = document.getElementById("svg");
const homeImage = document.getElementById("home-image");
const homeTitle = document.getElementById("home-title");
const homeText = document.getElementById("home-text");
const aboutSection = document.getElementById("about");
const skillsSection = document.getElementById("skills");
const contactBtn = document.querySelectorAll(".contact-trigger");
const contactModal = document.getElementById("contactModal");
const closeModalButton = document.getElementById("closeModal");
const burgerMenu = document.getElementById("burgerMenu");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");

// Sticky Navigation using Intersection Observer
const navHeight = nav.getBoundingClientRect().height;

// Callback to toggle sticky class on header based on intersection
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky", "opacity-90");
  else header.classList.remove("sticky", "opacity-90");
};

// Observer for sticky navigation
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(home);

// Reveal "Home" Section on Page Loading
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll("[data-animate]").forEach((el) => {
      el.classList.remove("opacity-0", "translate-y-32", "translate-x-32");
      el.classList.add(
        "opacity-100",
        "translate-y-0",
        "translate-x-0",
        "ease-out"
      );
    });
  }, 500);
});

//  Reveal Other Sections on Scroll

// Select all sections except #home
const allSections = document.querySelectorAll("section:not(#home)");

// Callback to reveal sections when they enter the viewport
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("opacity-0", "translate-y-20");
    entry.target.classList.add("opacity-100", "translate-y-0", "ease-out");

    observer.unobserve(entry.target);

    // Animate skills list items with staggered effect
    if (entry.target.id === "skills") {
      const skillsItems = entry.target.querySelectorAll("li");
      skillsItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("opacity-0", "translate-x-20");
          item.classList.add("opacity-100", "translate-x-0", "ease-out");
        }, index * 150);
      });
    }
  });
};

// Observer for section reveal
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

// Initialize section animations
allSections.forEach(function (section) {
  sectionObserver.observe(section);

  section.classList.add(
    "opacity-0",
    "translate-y-20",
    "ease-out",
    "transition-all",
    "duration-700",
    "transform"
  );

  // Prepare skills items for animation
  if (section.id === "skills") {
    const skillItems = section.querySelectorAll("li");
    skillItems.forEach((item) => {
      item.classList.add(
        "opacity-0",
        "translate-x-20",
        "transition-all",
        "duration-700"
      );
    });
  }
});

// Modal Window (Contact Form)

// Reset the contact form fields
function resetContactForm() {
  const form = contactModal.querySelector("form");
  if (form) form.reset();
}

// Open modal and focus first input
contactBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
    setTimeout(() => {
      contactModal.querySelector("input, textarea, button")?.focus();
    }, 100);
  })
);

// Close modal on close button click
closeModalButton.addEventListener("click", () => {
  contactModal.classList.add("hidden");
  resetContactForm();
});

// Close modal when clicking outside the modal content
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.add("hidden");
    resetContactForm();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (
    !contactModal.classList.contains("hidden") &&
    (e.key === "Escape" || e.key === "Esc")
  ) {
    contactModal.classList.add("hidden");
    resetContactForm();
  }
});

// Projects Section: Video Interactions

// Play/pause videos on hover, fullscreen on click
document.querySelectorAll("#projects video").forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play();
  });
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
  video.addEventListener("click", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  });
});

// Mobile Burger Menu

// Open mobile menu
function openMobileMenu() {
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  mobileMenu.classList.add("opacity-100");
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenu.classList.add("opacity-0", "pointer-events-none");
  mobileMenu.classList.remove("opacity-100");
}

// Event listeners for opening/closing mobile menu
burgerMenu.addEventListener("click", openMobileMenu);
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking any link or button inside it
mobileMenu
  .querySelectorAll("a,button")
  .forEach((el) => el.addEventListener("click", closeMobileMenu));

// Automatically update the copyright year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
