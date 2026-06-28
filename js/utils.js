/* ═══════════════════════════════════════════════
   utils.js
   — Scroll-reveal (IntersectionObserver)
   — Aplicação dos dados de config.js no HTML
     (data-config-text / data-config-href)
   — Utilitários pequenos sem módulo próprio
═══════════════════════════════════════════════ */

import { CONFIG } from "./config.js";

export function initUtils() {
  revealOnScroll();
}

/* ── Aplica CONFIG nos elementos marcados ─────── */
export function applyConfig(config = CONFIG) {
  document.querySelectorAll("[data-config-text]").forEach((el) => {
    const value = getByPath(config, el.dataset.configText);
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const value = getByPath(config, el.dataset.configHref);
    if (value != null) el.setAttribute("href", value);
  });
}

function getByPath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

/* ── Scroll-reveal ────────────────────────────── */
function revealOnScroll() {
  if (!("IntersectionObserver" in window)) return;

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
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay =
          (i % 6) * CONFIG.ui.revealStaggerStep + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: CONFIG.ui.revealThreshold },
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
