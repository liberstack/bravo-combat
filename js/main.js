/* ═══════════════════════════════════════════════
   main.js — entry point
   Bravo Combat
═══════════════════════════════════════════════ */

import { CONFIG } from "./config.js";
import { initNavbar } from "./navbar.js";
import { initForm } from "./form.js";
import { initUtils, applyConfig } from "./utils.js";

/* ── Year ─────────────────────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Config (telefone, e-mail, redes sociais...) ─ */
applyConfig(CONFIG);

/* ── Init ─────────────────────────────────────── */
initNavbar();
initForm();
initUtils();
