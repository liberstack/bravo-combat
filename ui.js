// ── ui.js: comportamentos visuais, sem lógica de conteúdo ──

// NAV: shadow on scroll
const nav = document.getElementById("nav");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  },
  { passive: true },
);

// NAV: hamburger toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// NAV: fechar menu mobile ao clicar num link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// SMOOTH SCROLL: links internos (não interfere com #legal)
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute("href"));
  if (target && target.offsetParent !== null) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }
});

// SCROLL REVEAL: elementos com classe .reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

window.observeReveal = function (el) {
  el.classList.add("reveal");
  revealObserver.observe(el);
};

// GALERIA: foto cards reveal com stagger
document.querySelectorAll(".photo-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  window.observeReveal(el);
});
