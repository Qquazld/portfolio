// Ajoute ça tout en haut de main.js, avant tout le reste
window.scrollTo(0, 0);

// DOM ELEMENTS
const header = document.getElementById("header");
const homeSection = document.getElementById("home");
const typewriterEl = document.getElementById("typewriter");
const sectionTitles = document.querySelectorAll(".section-title");
const burgerMenu = document.getElementById("burgerMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove(
        "bg-sky-950/80",
        "backdrop-blur-md",
        "border-gray-700/50",
      );
      header.classList.add("border-transparent", "bg-transparent");
    } else {
      header.classList.add(
        "bg-sky-950/80",
        "backdrop-blur-md",
        "border-gray-700/50",
      );
      header.classList.remove("border-transparent", "bg-transparent");
    }
  },
  { rootMargin: "-80px" },
);

heroObserver.observe(homeSection);

// Reveal sections on scroll

const allSections = document.querySelectorAll("section:not(#home)");

// Observer Callback
const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("is-visible");

    observer.unobserve(entry.target);

    // Animate skills list items with staggered effect
    if (entry.target.id === "skills") {
      const items = entry.target.querySelectorAll(".skill-item");
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
  threshold: 0.2,
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
let i = 0;
let isDeleting = false;

function loop() {
  if (!isDeleting) {
    // Typing
    typewriterEl.textContent = text.substring(0, i++);

    if (i > text.length) {
      isDeleting = true;
      return setTimeout(loop, 1500); // end pause
    }
  } else {
    // Deleting
    typewriterEl.textContent = text.substring(0, i--);

    if (i < 0) {
      isDeleting = false;
      i = 0;
      return setTimeout(loop, 500); // start pause
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

  closeMobileMenuBtn.focus();
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

  burgerMenu.focus();
}

burgerMenu.addEventListener("click", openMobileMenu);
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

mobileMenu
  .querySelectorAll("a,button")
  .forEach((el) => el.addEventListener("click", closeMobileMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

// Copyright year auto update

const yearSpan = document.getElementById("footer-year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
