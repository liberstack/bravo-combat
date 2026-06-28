/* ═══════════════════════════════════════════════
   navbar.js
   — Scroll state (.scrolled)
   — Mobile menu toggle
   — Smooth scroll com offset da navbar
═══════════════════════════════════════════════ */

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  /* ── Scroll state ─────────────────────────── */
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile toggle ────────────────────────── */
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (navbar && !navbar.contains(e.target)) closeMenu();
    });
  }

  function closeMenu() {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  /* ── Smooth scroll com offset ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    });
  });
}
