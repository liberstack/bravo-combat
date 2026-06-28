/* ═══════════════════════════════════════════════
   config.js
   — Fonte única de configuração do projeto
   — Dados de contato, redes sociais e parâmetros
     de UI usados pelos outros módulos
   — Edite SOMENTE este arquivo para atualizar
     telefone, e-mail, endereço, redes sociais etc.
═══════════════════════════════════════════════ */

export const CONFIG = {
  /* ── Identidade ───────────────────────────── */
  site: {
    name: "Bravo Combat",
    fullName: "Bravo Combat Academia de Artes Marciais",
  },

  /* ── Contato ──────────────────────────────── */
  contact: {
    address: "Rua dos Campeões, 42 – Centro",

    phoneDisplay: "(31) 9 0000-0000",
    phoneHref: "tel:+5531900000000",

    // Apenas dígitos, com DDI — usado no link do WhatsApp (wa.me)
    whatsappNumber: "5531900000000",

    email: "contato@bravocombat.com.br",
    emailHref: "mailto:contato@bravocombat.com.br",

    emailPrivacidade: "privacidade@bravocombat.com.br",
    emailPrivacidadeHref: "mailto:privacidade@bravocombat.com.br",
  },

  /* ── Redes sociais ────────────────────────── */
  social: {
    instagram: "#",
    youtube: "#",
  },

  /* ── Parâmetros de UI ─────────────────────── */
  ui: {
    navScrollThreshold: 40, // px de scroll para ativar .scrolled na navbar
    revealThreshold: 0.1, // threshold do IntersectionObserver (scroll-reveal)
    revealStaggerStep: 60, // ms de atraso escalonado entre elementos revelados
    feedbackTimeoutMs: 4000, // duração da mensagem de feedback do formulário
  },
};
