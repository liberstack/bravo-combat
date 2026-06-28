/* ═══════════════════════════════════════════════
   BRAVO COMBAT – ui.js
   Navbar scroll · Mobile menu · Form feedback · Year
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Year ─────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar scroll ───────────────────────── */
  const navbar = document.getElementById("navbar");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu toggle ───────────────────── */
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Smooth scroll offset (fixed navbar) ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ── CTA Form ─────────────────────────────── */
  const form = document.getElementById("ctaForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = form.querySelector('[name="nome"]').value.trim();
      const whatsapp = form.querySelector('[name="whatsapp"]').value.trim();
      const modalidade = form.querySelector('[name="modalidade"]').value;

      if (!nome || !whatsapp) {
        showMessage(form, "Preencha seu nome e WhatsApp.", "error");
        return;
      }

      // Build WhatsApp deep-link message
      const text = encodeURIComponent(
        `Olá! Me chamo *${nome}* e quero agendar minha aula gratuita na Bravo Combat.\n` +
          `Modalidade de interesse: *${modalidade || "A definir"}*.\n` +
          `Aguardo contato! 🥊`,
      );

      // Replace with real number
      const phone = "5531900000000";
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

      showMessage(form, "✅ Redirecionando para o WhatsApp…", "success");
      form.reset();
    });
  }

  function showMessage(form, msg, type) {
    let el = form.querySelector(".form-feedback");
    if (!el) {
      el = document.createElement("p");
      el.className = "form-feedback";
      el.style.cssText =
        "font-size:13px;font-weight:600;text-align:center;margin-top:4px;transition:opacity .3s;";
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.color = type === "error" ? "#FF1A1A" : "#4ADE80";
    el.style.opacity = "1";
    setTimeout(() => {
      el.style.opacity = "0";
    }, 4000);
  }

  /* ── Scroll-reveal ────────────────────────── */
  if ("IntersectionObserver" in window) {
    const style = document.createElement("style");
    style.textContent = `
      .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1); }
      .reveal.visible { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const targets = document.querySelectorAll(
      ".card, .dif-item, .sobre-card, .schedule-table, .stat",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i % 6) * 60 + "ms";
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    targets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
})();
