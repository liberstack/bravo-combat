/* ═══════════════════════════════════════════════
   main.js — entry point
   Bravo Combat
═══════════════════════════════════════════════ */

import { initNavbar } from "./navbar.js";
import { initForm } from "./form.js";
import { initUtils } from "./utils.js";

/* ── Year ─────────────────────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Init ─────────────────────────────────────── */
initNavbar();
initForm();
initUtils();
