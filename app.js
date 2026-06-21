// ── app.js: orquestrador principal ──
// Responsabilidades: fetch MD, parse, estruturar DOM, injetar conteúdo,
// rotear entre a view principal e a view legal via hash (#legal)

let mainRendered = false;
let legalRendered = false;

(async function init() {
  await waitForMarked();
  window.addEventListener("hashchange", route);
  await route();
})();

// ─────────────────────────────────────────────────────────
// ROTEAMENTO
// ─────────────────────────────────────────────────────────
async function route() {
  const hash = location.hash.replace("#", "");

  if (hash === "legal") {
    await showLegalView();
  } else {
    await showMainView();
    if (hash) {
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
}

async function showMainView() {
  document.getElementById("view-main").style.display = "";
  document.getElementById("legal-area").style.display = "none";
  if (!mainRendered) {
    mainRendered = true;
    await renderPage();
  }
}

async function showLegalView() {
  document.getElementById("view-main").style.display = "none";
  document.getElementById("legal-area").style.display = "";
  if (!legalRendered) {
    legalRendered = true;
    await renderLegal();
  }
}

// ─────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────
async function renderPage() {
  let md = "";

  try {
    const res = await fetch("content.md");
    if (!res.ok) throw new Error("fetch falhou");
    md = await res.text();
    md = md.replace(/\r\n/g, "\n");
  } catch (err) {
    console.error("Erro ao carregar content.md:", err);
    document.getElementById("content-area").innerHTML =
      '<p style="padding:60px 0;color:#CC0000">Conteúdo indisponível.</p>';
    return;
  }

  const blocks = md
    .split(/\n---\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (blocks[0]) {
    injectHero(blocks[0]);
  }

  const contentArea = document.getElementById("content-area");
  const sectionDefs = [
    { id: "escola", label: "Nossa Escola" },
    { id: "diferenciais", label: "Por que a Bravo" },
    { id: "contato", label: "Fale Conosco" },
  ];

  blocks.slice(1).forEach((block, i) => {
    const def = sectionDefs[i] || { id: `section-${i}`, label: "" };
    const section = buildSection(block, def);
    contentArea.appendChild(section);
  });

  document.querySelectorAll(".md-section").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    window.observeReveal(el);
  });
}

function injectHero(block) {
  const lines = block.split("\n").filter(Boolean);
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-desc");

  if (!titleEl || !descEl) return;

  const h1line = lines.find((l) => l.startsWith("# "));
  if (h1line) {
    titleEl.textContent = h1line.replace(/^#\s+/, "");
  }

  const para = lines.find(
    (l) => l && !l.startsWith("#") && !l.startsWith("---"),
  );
  if (para) {
    descEl.textContent = para;
  }
}

function buildSection(block, { id, label }) {
  const section = document.createElement("section");
  section.className = "md-section";
  section.id = id;
  section.dataset.id = id;

  if (label) {
    const labelEl = document.createElement("p");
    labelEl.className = "section-label";
    labelEl.textContent = label;
    section.appendChild(labelEl);
  }

  const hasH3 = /^### /m.test(block);
  const hasList = /^- /m.test(block);
  const hasH2 = /^## /m.test(block);

  let remainingBlock = block;
  let h2text = "";

  if (hasH2) {
    const h2match = block.match(/^## (.+)/m);
    if (h2match) {
      h2text = h2match[1];
      remainingBlock = block.replace(/^## .+\n?/m, "").trim();
    }
  }

  if (h2text) {
    const h2 = document.createElement("h2");
    h2.className = "section-title";
    h2.textContent = h2text;
    section.appendChild(h2);
  }

  if (hasH3) {
    section.appendChild(buildCards(remainingBlock));
  } else if (hasList) {
    section.appendChild(buildList(remainingBlock));
  } else {
    section.appendChild(buildText(remainingBlock));
  }

  return section;
}

function buildCards(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "md-cards";

  const chunks = block.split(/^### /m).filter(Boolean);

  chunks.forEach((chunk) => {
    const lines = chunk.trim().split("\n");
    const title = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    const card = document.createElement("div");
    card.className = "md-card";

    const h3 = document.createElement("h3");
    h3.textContent = title;

    const p = document.createElement("p");
    p.innerHTML = marked.parseInline(body);

    card.appendChild(h3);
    card.appendChild(p);
    wrapper.appendChild(card);
  });

  return wrapper;
}

function buildList(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "md-list-section";
  wrapper.innerHTML = marked.parse(block);
  return wrapper;
}

function buildText(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "md-text-section";
  wrapper.innerHTML = marked.parse(block);
  return wrapper;
}

// ─────────────────────────────────────────────────────────
// PÁGINA LEGAL
// ─────────────────────────────────────────────────────────
async function renderLegal() {
  const area = document.getElementById("legal-area");
  if (!area) return;

  let md = "";

  try {
    const res = await fetch("legal.md");
    if (!res.ok) throw new Error("fetch falhou");
    md = await res.text();
    md = md.replace(/\r\n/g, "\n");
  } catch (err) {
    area.innerHTML = "<p>Conteúdo indisponível.</p>";
    return;
  }

  area.innerHTML = marked.parse(md);
}

// ─────────────────────────────────────────────────────────
// UTILITÁRIOS
// ─────────────────────────────────────────────────────────
function waitForMarked() {
  return new Promise((resolve) => {
    if (typeof marked !== "undefined") {
      resolve();
      return;
    }
    const check = setInterval(() => {
      if (typeof marked !== "undefined") {
        clearInterval(check);
        resolve();
      }
    }, 50);
    setTimeout(() => {
      clearInterval(check);
      resolve();
    }, 5000);
  });
}
