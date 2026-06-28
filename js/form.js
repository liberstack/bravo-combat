/* ═══════════════════════════════════════════════
   form.js
   — Validação dos campos
   — Montagem da mensagem WhatsApp
   — Feedback visual inline
═══════════════════════════════════════════════ */

import { CONFIG } from "./config.js";

export function initForm() {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = form.querySelector('[name="nome"]').value.trim();
    const whatsapp = form.querySelector('[name="whatsapp"]').value.trim();
    const modalidade = form.querySelector('[name="modalidade"]').value;

    if (!nome || !whatsapp) {
      showMessage(form, "Preencha seu nome e WhatsApp.", "error");
      return;
    }

    const text = encodeURIComponent(
      `Olá! Me chamo *${nome}* e quero agendar minha aula gratuita na ${CONFIG.site.name}.\n` +
        `Modalidade de interesse: *${modalidade || "A definir"}*.\n` +
        `Aguardo contato! 🥊`,
    );

    window.open(
      `https://wa.me/${CONFIG.contact.whatsappNumber}?text=${text}`,
      "_blank",
    );

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
  }, CONFIG.ui.feedbackTimeoutMs);
}
