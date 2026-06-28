/* ═══════════════════════════════════════════════
   utils.js
   — Scroll-reveal (IntersectionObserver)
   — Utilitários pequenos sem módulo próprio
═══════════════════════════════════════════════ */

export function initUtils() {
  revealOnScroll();
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
        entry.target.style.transitionDelay = (i % 6) * 60 + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
