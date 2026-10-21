"use strict";

const robots = [
  {
    id: "g1", name: "G1", subtitle: "小巧身形，自由表达",
    description: "将每一个细微动作，转化为灵巧而自然的回应。",
    tags: ["全身遥操", "灵巧手"], accent: "#b8886a", tint: "#f3ede1",
    variants: [{ value: "G1_29", label: "G1 · 29 自由度" }, { value: "G1_23", label: "G1 · 23 自由度" }],
  },
  {
    id: "h1", name: "H1", subtitle: "舒展双臂，探索边界",
    description: "以更舒展的动作，将你的意图延伸到真实空间。",
    tags: ["双臂遥操", "多型号"], accent: "#8a977c", tint: "#eef0e8",
    variants: [{ value: "H1_2", label: "H1-2 · 手臂 7 自由度" }, { value: "H1", label: "H1 · 手臂 4 自由度" }],
  },
  {
    id: "h2", name: "H2", subtitle: "从容协作，感知更多",
    description: "让人与机器的协作，在每一次动作中自然发生。",
    tags: ["全身遥操", "人形机器人"], accent: "#8a94a5", tint: "#eaeef0",
    variants: [{ value: "H2", label: "H2 · 标准型号" }],
  },
  {
    id: "r1", name: "R1", subtitle: "轻盈起步，释放可能",
    description: "从一个简单的动作开始，探索属于你的新可能。",
    tags: ["双臂遥操", "多型号"], accent: "#b5a077", tint: "#f3efe3",
    variants: [{ value: "R1_A5", label: "R1 A5 · 手臂 5 自由度" }, { value: "R1_A7", label: "R1 A7 · 手臂 7 自由度" }],
  },
];

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

// These illustrations are intentionally stylized vectors, not technical models.
function robotIllustration(id, instance) {
  const key = `${instance}-${id}`;
  const palettes = {
    g1: ["#efede6", "#bcbab2", "#40464a", "#d5b59a"],
    h1: ["#565b58", "#303632", "#272c2b", "#abb49e"],
    h2: ["#eeefeb", "#bdc2c0", "#444c51", "#acb8bd"],
    r1: ["#e8e7df", "#a9aaa1", "#3f4747", "#c7b68e"],
  };
  const [light, shade, joint, accent] = palettes[id];
  const tall = id === "h1";
  const short = id === "r1";
  const head = id === "h2"
    ? `<path d="M83 23Q100 13 117 23L115 47Q100 59 85 47Z" fill="url(#${key}-shell)"/><path d="M87 29Q100 23 113 29L111 39Q100 44 89 39Z" fill="${joint}"/><path d="M94 32h12" stroke="#a7b9ba" stroke-width="2"/>`
    : tall
      ? `<rect x="88" y="18" width="24" height="24" rx="5" fill="${joint}"/><path d="M90 21h20v9H90Z" fill="#77817c"/><circle cx="95" cy="25" r="2" fill="#b7c4b5"/><path d="M94 35h12" stroke="#969e91" stroke-width="2"/>`
      : `<rect x="${short ? 80 : 82}" y="21" width="${short ? 40 : 36}" height="30" rx="${short ? 9 : 13}" fill="url(#${key}-shell)"/><path d="M86 28Q100 23 114 28V38Q100 44 86 38Z" fill="${joint}"/><path d="M91 32h18" stroke="${accent}" stroke-width="2" opacity=".8"/>`;
  return `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${key}-shell" x1="0" x2="1" y1="0" y2=".6"><stop stop-color="${light}"/><stop offset=".6" stop-color="${light}"/><stop offset="1" stop-color="${shade}"/></linearGradient>
      <linearGradient id="${key}-metal" x1="0" x2="1"><stop stop-color="${joint}"/><stop offset=".45" stop-color="#656c69"/><stop offset="1" stop-color="${joint}"/></linearGradient>
    </defs>
    <ellipse cx="103" cy="205" rx="47" ry="7" fill="#776d5c" opacity=".09"/>
    <g stroke="#625f55" stroke-width=".65" stroke-linejoin="round">
      <g transform="${short ? "translate(0 16) scale(1 .91)" : tall ? "translate(0 -1)" : "translate(0 3)"}">
        <path d="M94 43h12v15H94Z" fill="url(#${key}-metal)"/>
        ${head}
        <path d="${tall ? "M77 51 123 51 120 99 80 99Z" : "M76 54Q100 45 124 54L118 99Q100 107 82 99Z"}" fill="url(#${key}-shell)"/>
        <path d="M87 59Q100 55 113 59L111 73H89Z" fill="${joint}" opacity="${tall ? ".9" : ".85"}"/>
        <path d="M94 63h12" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M88 83h24M89 88h22" stroke="${shade}" fill="none"/>
        <circle cx="73" cy="61" r="11" fill="url(#${key}-metal)"/>
        <circle cx="127" cy="61" r="11" fill="url(#${key}-metal)"/>
        <path d="M64 61 78 65 70 97 58 93Z" fill="url(#${key}-shell)"/>
        <path d="M122 65 136 61 143 93 130 97Z" fill="url(#${key}-shell)"/>
        <circle cx="63" cy="98" r="8" fill="${joint}"/>
        <circle cx="137" cy="98" r="8" fill="${joint}"/>
        <path d="M56 99 69 102 65 126 52 124Z" fill="url(#${key}-shell)"/>
        <path d="M131 102 144 99 148 124 135 126Z" fill="url(#${key}-shell)"/>
        <path d="m53 126 11 1-1 13-4 3-7-5Z" fill="${joint}"/>
        <path d="m136 127 11-1 1 12-7 5-4-3Z" fill="${joint}"/>
        <path d="m55 131-1 7m5-7v9m82-9v9m4-9 1 7" stroke="#969a91"/>
        <path d="M85 100h30v13H85Z" fill="url(#${key}-metal)"/>
        <path d="M79 111Q100 106 121 111L118 132 103 134 100 127 97 134 82 132Z" fill="url(#${key}-shell)"/>
        <circle cx="85" cy="128" r="8" fill="${joint}"/>
        <circle cx="115" cy="128" r="8" fill="${joint}"/>
        <path d="m77 130 17 1-3 32-15-1Z" fill="url(#${key}-shell)"/>
        <path d="m106 131 17-1 1 32-15 1Z" fill="url(#${key}-shell)"/>
        <circle cx="83" cy="163" r="8" fill="url(#${key}-metal)"/>
        <circle cx="117" cy="163" r="8" fill="url(#${key}-metal)"/>
        <path d="m76 167 15 1-2 28-14-1Z" fill="url(#${key}-shell)"/>
        <path d="m109 168 15-1 1 28-14 1Z" fill="url(#${key}-shell)"/>
        <path d="m78 171 4 1-1 19m37-20-1 20" stroke="${shade}" stroke-width="2" fill="none"/>
        <path d="m75 193 14 1 1 9-24 1 1-6Z" fill="${joint}"/>
        <path d="m111 194 14-1 8 5 1 6-24-1Z" fill="${joint}"/>
        <path d="m69 201 17-1m28 0 16 1" stroke="#8b8f86" fill="none"/>
      </g>
    </g>
    <path d="M35 183h11m-5-5v10M157 45h8m-4-4v8" stroke="${accent}" stroke-width=".7" opacity=".7"/>
  </svg>`;
}

const grid = document.querySelector("#robot-grid");
const search = document.querySelector("#search");
const robotDialog = document.querySelector("#robot-dialog");
const guideDialog = document.querySelector("#guide-dialog");
const modelSelect = document.querySelector("#model-select");
let activeRobot = null;
let toastTimeout;
let history = [];
try {
  const saved = JSON.parse(localStorage.getItem("xr-robot-history") || "[]");
  if (Array.isArray(saved)) {
    history = saved.filter((entry) => entry && robots.some((robot) =>
      robot.id === entry.id && robot.variants.some((variant) => variant.value === entry.model)
    )).filter((entry, index, entries) => entries.findIndex((item) => item.id === entry.id) === index).slice(0, 4);
  }
} catch { /* The page also works with browser storage disabled. */ }

function renderRobots() {
  const query = search.value.trim().toLowerCase();
  const visible = robots.filter((robot) =>
    `${robot.name} ${robot.subtitle} ${robot.tags.join(" ")} ${robot.variants.map((variant) => `${variant.value} ${variant.label}`).join(" ")}`.toLowerCase().includes(query)
  );
  grid.innerHTML = visible.map((robot) => {
    const selected = history[0]?.id === robot.id;
    return `<article class="robot-card${selected ? " selected" : ""}" style="--robot-accent:${robot.accent};--robot-tint:${robot.tint}">
      <div class="card-main">
        <div class="card-text">
          <div class="card-eyebrow">UNITREE ROBOTICS</div>
          <h3>${robot.name}</h3>
          <p class="card-subtitle">${robot.subtitle}</p>
          <p class="card-description">${robot.description}</p>
          <div class="card-tags">${robot.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </div>
        <div class="robot-art">${robotIllustration(robot.id, "card")}</div>
      </div>
      <div class="card-footer">
        <span class="model-count">${icon(selected ? "check" : "cube")}${selected ? `已选择 ${history[0].model}` : `${String(robot.variants.length).padStart(2, "0")} 个可选型号`}</span>
        <button class="entry-button" data-robot="${robot.id}" aria-label="进入 ${robot.name} 遥操">进入遥操${icon("arrow")}</button>
      </div>
    </article>`;
  }).join("");
  document.querySelector("#result-count").textContent = String(visible.length).padStart(2, "0");
  document.querySelector("#empty-state").hidden = visible.length > 0;
}

function renderHistory() {
  const container = document.querySelector("#recent-list");
  container.replaceChildren();
  if (!history.length) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = "你的选择会出现在这里";
    container.append(empty);
    return;
  }
  for (const entry of history) {
    const robot = robots.find((item) => item.id === entry.id);
    const button = document.createElement("button");
    button.className = "recent-item";
    button.dataset.robot = robot.id;
    // Model values are validated against the fixed catalog before rendering.
    button.innerHTML = `<span class="recent-dot"></span>${robot.name}<small>${entry.model}</small>`;
    container.append(button);
  }
}

function openRobot(id) {
  activeRobot = robots.find((robot) => robot.id === id);
  if (!activeRobot) return;
  closeSidebar();
  document.querySelector("#dialog-title").textContent = `${activeRobot.name} 遥操工作空间`;
  document.querySelector("#dialog-description").textContent = activeRobot.subtitle;
  document.querySelector("#dialog-robot").innerHTML = robotIllustration(id, "dialog");
  modelSelect.replaceChildren(...activeRobot.variants.map((variant) => new Option(variant.label, variant.value)));
  const previous = history.find((entry) => entry.id === id);
  if (previous) modelSelect.value = previous.model;
  robotDialog.showModal();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 3500);
}

function closeSidebar() {
  document.body.classList.remove("nav-open");
  document.querySelector("#sidebar-backdrop").hidden = true;
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
  syncSidebarAccessibility();
}

const mobileLayout = window.matchMedia("(max-width: 850px)");
function syncSidebarAccessibility() {
  document.querySelector("#sidebar").inert = mobileLayout.matches && !document.body.classList.contains("nav-open");
}
mobileLayout.addEventListener("change", closeSidebar);
syncSidebarAccessibility();

document.addEventListener("click", (event) => {
  const entry = event.target.closest("[data-robot]");
  if (entry) openRobot(entry.dataset.robot);
  const close = event.target.closest("[data-close]");
  if (close) close.closest("dialog").close();
});

document.querySelector("#confirm-selection").addEventListener("click", () => {
  if (!activeRobot) return;
  const id = activeRobot.id;
  history = [{ id, model: modelSelect.value }, ...history.filter((entry) => entry.id !== id)].slice(0, 4);
  try { localStorage.setItem("xr-robot-history", JSON.stringify(history)); } catch { /* Selection remains available for this session. */ }
  robotDialog.close();
  renderRobots();
  renderHistory();
  const returnTarget = document.querySelector(`.entry-button[data-robot="${id}"]`) || search;
  returnTarget.focus({ preventScroll: true });
  showToast(`已选择 ${history[0].model} · 当前为入口预览`);
});

search.addEventListener("input", renderRobots);
document.querySelector("#clear-search").addEventListener("click", () => {
  search.value = "";
  renderRobots();
  search.focus();
});
for (const selector of ["#nav-guide", "#open-guide"]) {
  document.querySelector(selector).addEventListener("click", () => {
    closeSidebar();
    guideDialog.showModal();
  });
}
document.querySelector("#nav-robots").addEventListener("click", () => {
  closeSidebar();
  search.value = "";
  renderRobots();
  document.querySelector("#robots-title").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#menu-toggle").addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  document.querySelector("#sidebar-backdrop").hidden = !open;
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", String(open));
  syncSidebarAccessibility();
  if (open) document.querySelector("#nav-robots").focus();
});
document.querySelector("#sidebar-backdrop").addEventListener("click", closeSidebar);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) &&
      !document.querySelector("dialog[open]")) {
    event.preventDefault();
    closeSidebar();
    search.focus();
  }
  if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
    closeSidebar();
    document.querySelector("#menu-toggle").focus();
  }
});
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
}
renderRobots();
renderHistory();
