"use strict";

// DOM ELEMENTS
const header = document.getElementById("header");
const homeSection = document.getElementById("home");
const typewriterEl = document.getElementById("typewriter");
const sectionTitles = document.querySelectorAll(".section-title");
const aboutSection = document.getElementById("about");
const skillsSection = document.getElementById("skills");
const contactBtn = document.querySelectorAll(".contact-trigger");
const contactModal = document.getElementById("contactModal");
const closeModalButton = document.getElementById("closeModal");
const burgerMenu = document.getElementById("burgerMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");

// // Adjust scroll-margin-top based on nav height
// const updateScrollMargin = () => {
//   const navHeight = header.getBoundingClientRect().height;
//   document.querySelectorAll("section").forEach((section) => {
//     section.style.scrollMarginTop = `${navHeight}px`;
//   });
// };

// updateScrollMargin();
// window.addEventListener("resize", updateScrollMargin);

// Navbar — visible sur hero, disparaît au scroll, réapparaît sur about
let lastScrollY = window.scrollY;
let aboveAbout = true;

const aboutObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      // About visible → nav réapparaît avec fond
      aboveAbout = false;
      header.classList.remove("-translate-y-full");
      header.classList.add(
        "fixed",
        "bg-sky-950/80",
        "backdrop-blur-md",
        "border-gray-700/50",
      );
      header.classList.remove("bg-transparent", "border-transparent");
    } else if (window.scrollY < document.getElementById("about").offsetTop) {
      // On est remonté au-dessus de l'about → nav transparente visible
      aboveAbout = true;
      header.classList.remove(
        "fixed",
        "-translate-y-full",
        "bg-sky-950/80",
        "backdrop-blur-md",
        "border-gray-700/50",
      );
      header.classList.add("bg-transparent", "border-transparent");
    }
  },
  { threshold: 0.2 },
);

aboutObserver.observe(document.getElementById("about"));

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Cache la nav uniquement quand on scrolle vers le bas sur le hero
  if (aboveAbout && currentScrollY > lastScrollY && currentScrollY > 80) {
    header.classList.add("-translate-y-full");
  }

  lastScrollY = currentScrollY;
});

// Reveal sections on scroll

const allSections = document.querySelectorAll("section:not(#home)");

// Initialize section animations
allSections.forEach((section) => {
  section.classList.add(
    "opacity-0",
    "translate-y-24",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "transition",
    "duration-700",
  );
});

// Callback
const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("opacity-0", "translate-y-24");
    entry.target.classList.add("opacity-100", "translate-y-0");

    observer.unobserve(entry.target);

    // Animate skills list items with staggered effect
    if (entry.target.id === "skills") {
      const items = entry.target.querySelectorAll(".skill-item, .skill-badge");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("opacity-0", "-translate-x-8");
          item.classList.add("opacity-100", "translate-x-0");
        }, index * 80);
      });
    }
  });
};

// Observer
const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

// Observe
allSections.forEach((section) => sectionObserver.observe(section));

const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.2 },
);

sectionTitles.forEach((title) => titleObserver.observe(title));

// Modal Window (Contact Form)

const focusableSelectors = "input, textarea, button, a[href]";

function getFocusableElements() {
  return [...contactModal.querySelectorAll(focusableSelectors)];
}

function resetContactForm() {
  const form = contactModal.querySelector("form");
  if (form) form.reset();
}

function openModal() {
  contactModal.classList.remove("hidden");
  document.addEventListener("keydown", handleModalKeydown);
  setTimeout(() => {
    getFocusableElements()[0]?.focus();
  }, 100);
}

function closeModal() {
  contactModal.classList.add("hidden");
  document.removeEventListener("keydown", handleModalKeydown);
  resetContactForm();
}

function handleModalKeydown(e) {
  const focusable = getFocusableElements();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
    return;
  }

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

contactBtn.forEach((btn) => btn.addEventListener("click", openModal));

closeModalButton.addEventListener("click", closeModal);

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) closeModal();
});

// Projects Section: Video Interactions

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

// Typewritter effect

const text = "Full-Stack Web Developer";
const el = typewriterEl;

let i = 0;
let isDeleting = false;

function loop() {
  if (!isDeleting) {
    // Typing
    el.textContent = text.substring(0, i++);

    if (i > text.length) {
      isDeleting = true;
      return setTimeout(loop, 1500); // pause fin
    }
  } else {
    // Deleting
    el.textContent = text.substring(0, i--);

    if (i < 0) {
      isDeleting = false;
      return setTimeout(loop, 500); // pause début
    }
  }

  setTimeout(loop, isDeleting ? 40 : 80);
}

setTimeout(loop, 1000);
// Mobile Menu

function openMobileMenu() {
  mobileMenu.classList.remove(
    "opacity-0",
    "pointer-events-none",
    "-translate-y-10",
  );
  mobileMenu.classList.add("opacity-100", "translate-y-0");
  mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
  mobileOverlay.classList.add("opacity-100");
}

function closeMobileMenu() {
  mobileMenu.classList.add(
    "opacity-0",
    "pointer-events-none",
    "-translate-y-10",
  );
  mobileMenu.classList.remove("opacity-100", "translate-y-0");
  mobileOverlay.classList.add("opacity-0", "pointer-events-none");
  mobileOverlay.classList.remove("opacity-100");
}

burgerMenu.addEventListener("click", openMobileMenu);
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

mobileMenu
  .querySelectorAll("a,button")
  .forEach((el) => el.addEventListener("click", closeMobileMenu));

// Automatically update the copyright year

const yearSpan = document.getElementById("footer-year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
