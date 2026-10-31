"use strict";

const robots = [
  {
    id: "g1", name: "G1", subtitle: "小巧身形，自由表达",
    description: "将每一个细微动作，转化为灵巧而自然的回应。",
    tags: ["全身遥操", "灵巧手"], tint: "#f3ede1",
    model: "G1",
  },
  {
    id: "b2", name: "B2 + Z1", subtitle: "四足机动，Z1 机械臂",
    description: "在四足平台上延伸机械臂，把动作带到更远的位置。",
    tags: ["四足遥操", "机械臂"], tint: "#e7ebe3",
    model: "B2_Z1",
  },
];

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

// These illustrations are intentionally stylized vectors, not technical models.
function b2Illustration(key, light, shade, joint, accent) {
  return `<svg viewBox="-4 -20 214 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${key}-shell" x1="0" x2="1" y1="0" y2=".7"><stop stop-color="${light}"/><stop offset=".55" stop-color="${light}"/><stop offset="1" stop-color="${shade}"/></linearGradient>
      <linearGradient id="${key}-metal" x1="0" x2="1"><stop stop-color="${joint}"/><stop offset=".45" stop-color="#656c69"/><stop offset="1" stop-color="${joint}"/></linearGradient>
    </defs>
    <ellipse cx="104" cy="206" rx="62" ry="7" fill="#776d5c" opacity=".09"/>
    <g stroke="#625f55" stroke-width=".65" stroke-linejoin="round">
      <circle cx="132" cy="146" r="6" fill="url(#${key}-metal)"/>
      <path d="M126 148 140 152 134 174 118 170Z" fill="${shade}"/>
      <circle cx="126" cy="174" r="5.5" fill="${joint}"/>
      <path d="M120 176 134 180 128 200 112 196Z" fill="${shade}"/>
      <path d="M110 198 130 202 132 208 106 204Z" fill="${joint}"/>
      <circle cx="74" cy="148" r="6" fill="url(#${key}-metal)"/>
      <path d="M68 150 82 154 76 176 60 172Z" fill="${shade}"/>
      <circle cx="68" cy="176" r="5.5" fill="${joint}"/>
      <path d="M62 178 76 182 70 202 54 198Z" fill="${shade}"/>
      <path d="M52 200 72 204 74 210 48 206Z" fill="${joint}"/>
      <path d="M68 104h74c14 0 20 9 20 22v16c0 14-8 22-20 22H72c-16 0-24-8-24-22v-16c0-13 8-22 20-22Z" fill="url(#${key}-shell)"/>
      <path d="M92 104h28c2 8 2 8 0 14H92c-2-6-2-6 0-14Z" fill="${joint}" opacity=".55"/>
      <path d="M78 126h62M80 134h46" stroke="${shade}" fill="none"/>
      <path d="M64 110c-20 0-32 12-30 28 2 14 16 20 32 16l12-10V118c0-6-4-8-14-8Z" fill="url(#${key}-shell)"/>
      <path d="M40 122h24v11H42c-5 0-7-5-2-9Z" fill="${joint}"/>
      <circle cx="47" cy="127" r="1.7" fill="${accent}"/>
      <circle cx="124" cy="156" r="8" fill="url(#${key}-metal)"/>
      <path d="M116 158 136 162 130 186 108 182Z" fill="url(#${key}-shell)"/>
      <circle cx="118" cy="186" r="7" fill="${joint}"/>
      <path d="M110 188 130 192 124 210 102 206Z" fill="url(#${key}-shell)"/>
      <path d="M98 208 126 212 128 218 94 214Z" fill="${joint}"/>
      <circle cx="84" cy="158" r="8" fill="url(#${key}-metal)"/>
      <path d="M76 160 96 164 90 188 68 184Z" fill="url(#${key}-shell)"/>
      <circle cx="78" cy="188" r="7" fill="${joint}"/>
      <path d="M70 190 90 194 84 212 62 208Z" fill="url(#${key}-shell)"/>
      <path d="M58 210 86 214 88 220 54 216Z" fill="${joint}"/>
      <path d="M108 92h30v14h-30Z" fill="url(#${key}-metal)"/>
      <circle cx="122" cy="92" r="8" fill="${joint}"/>
      <path d="M116 86 132 80 156 52 142 44Z" fill="url(#${key}-shell)"/>
      <circle cx="150" cy="50" r="7" fill="url(#${key}-metal)"/>
      <path d="M148 44 162 40 180 22 166 16Z" fill="url(#${key}-shell)"/>
      <circle cx="174" cy="22" r="6" fill="${joint}"/>
      <path d="M168 18 164 6h6l6 12Z" fill="${joint}"/>
      <path d="M178 20 186 6h6l-2 16Z" fill="${joint}"/>
      <path d="M166 16h24" stroke="${accent}" stroke-width="2" fill="none"/>
    </g>
    <path d="M22 64h10m-5-5v10M168 176h8m-4-4v8" stroke="${accent}" stroke-width=".7" opacity=".7"/>
  </svg>`;
}

function robotIllustration(id, instance) {
  const key = `${instance}-${id}`;
  const palettes = {
    g1: ["#efede6", "#bcbab2", "#40464a", "#d5b59a"],
    b2: ["#6e736f", "#454b47", "#2e3331", "#c9b08a"],
    h2: ["#eeefeb", "#bdc2c0", "#444c51", "#acb8bd"],
    r1: ["#e8e7df", "#a9aaa1", "#3f4747", "#c7b68e"],
  };
  const [light, shade, joint, accent] = palettes[id];
  if (id === "b2") return b2Illustration(key, light, shade, joint, accent);
  const short = id === "r1";
  const head = id === "h2"
    ? `<path d="M83 23Q100 13 117 23L115 47Q100 59 85 47Z" fill="url(#${key}-shell)"/><path d="M87 29Q100 23 113 29L111 39Q100 44 89 39Z" fill="${joint}"/><path d="M94 32h12" stroke="#a7b9ba" stroke-width="2"/>`
    : `<rect x="${short ? 80 : 82}" y="21" width="${short ? 40 : 36}" height="30" rx="${short ? 9 : 13}" fill="url(#${key}-shell)"/><path d="M86 28Q100 23 114 28V38Q100 44 86 38Z" fill="${joint}"/><path d="M91 32h18" stroke="${accent}" stroke-width="2" opacity=".8"/>`;
  return `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${key}-shell" x1="0" x2="1" y1="0" y2=".6"><stop stop-color="${light}"/><stop offset=".6" stop-color="${light}"/><stop offset="1" stop-color="${shade}"/></linearGradient>
      <linearGradient id="${key}-metal" x1="0" x2="1"><stop stop-color="${joint}"/><stop offset=".45" stop-color="#656c69"/><stop offset="1" stop-color="${joint}"/></linearGradient>
    </defs>
    <ellipse cx="103" cy="205" rx="47" ry="7" fill="#776d5c" opacity=".09"/>
    <g stroke="#625f55" stroke-width=".65" stroke-linejoin="round">
      <g transform="${short ? "translate(0 16) scale(1 .91)" : "translate(0 3)"}">
        <path d="M94 43h12v15H94Z" fill="url(#${key}-metal)"/>
        ${head}
        <path d="M76 54Q100 45 124 54L118 99Q100 107 82 99Z" fill="url(#${key}-shell)"/>
        <path d="M87 59Q100 55 113 59L111 73H89Z" fill="${joint}" opacity=".85"/>
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
const robotDialog = document.querySelector("#robot-dialog");
let activeRobot = null;
let launchingB2 = false;
let toastTimeout;
let history = [];
try {
  const saved = JSON.parse(localStorage.getItem("xr-robot-history") || "[]");
  if (Array.isArray(saved)) {
    history = saved.filter((entry) => entry && robots.some((robot) =>
      robot.id === entry.id
    )).filter((entry, index, entries) => entries.findIndex((item) => item.id === entry.id) === index).slice(0, 4);
  }
} catch { /* The page also works with browser storage disabled. */ }

function modelLabel(entry) {
  return robots.find((robot) => robot.id === entry.id)?.name ?? entry.id;
}

function renderRobots() {
  grid.innerHTML = robots.map((robot) => {
    const selected = history[0]?.id === robot.id;
    return `<article class="robot-card${selected ? " selected" : ""}" style="--robot-tint:${robot.tint}">
      <div class="card-main">
        <div class="card-text">
          <h3>${robot.name}</h3>
          <p class="card-subtitle">${robot.subtitle}</p>
        </div>
        <div class="robot-art">${robotIllustration(robot.id, "card")}</div>
      </div>
      <div class="card-footer">
        <span class="model-count">${icon(selected ? "check" : "cube")}${selected ? `已选择 ${modelLabel(history[0])}` : "遥操工作空间"}</span>
        <button class="entry-button" data-robot="${robot.id}" aria-label="进入 ${robot.name} 遥操">进入遥操${icon("arrow")}</button>
      </div>
    </article>`;
  }).join("");
  document.querySelector("#result-count").textContent = String(robots.length).padStart(2, "0");
}

function openRobot(id) {
  if (id === "b2") {
    launchB2Z1();
    return;
  }
  activeRobot = robots.find((robot) => robot.id === id);
  if (!activeRobot) return;
  document.querySelector("#dialog-title").textContent = `${activeRobot.name} 遥操工作空间`;
  document.querySelector("#dialog-description").textContent = activeRobot.subtitle;
  document.querySelector("#dialog-robot").innerHTML = robotIllustration(id, "dialog");
  robotDialog.showModal();
}

async function launchB2Z1() {
  if (launchingB2) return;
  if (location.protocol !== "http:" || !["127.0.0.1", "localhost"].includes(location.hostname)) {
    showToast("请运行 python3 server.py，并从本地服务地址打开页面。");
    return;
  }
  launchingB2 = true;
  const button = document.querySelector('.entry-button[data-robot="b2"]');
  button.disabled = true;
  button.textContent = "正在启动…";
  try {
    const response = await fetch("/api/launch/b2z1", {
      method: "POST",
      headers: { "X-Teleop-Launch": "1" },
    });
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("启动接口不可用，请改用 python3 server.py 启动页面。");
    }
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || "启动失败，请检查本地服务。");
    const robot = robots.find((entry) => entry.id === "b2");
    history = [{ id: robot.id, model: robot.model }, ...history.filter((entry) => entry.id !== robot.id)].slice(0, 4);
    try { localStorage.setItem("xr-robot-history", JSON.stringify(history)); } catch { /* Storage is optional. */ }
    renderRobots();
    document.querySelector('.entry-button[data-robot="b2"]')?.focus({ preventScroll: true });
    showToast(result.message);
  } catch (error) {
    showToast(error instanceof TypeError ? "无法连接本地启动服务，请检查 python3 server.py 是否运行。" : error.message);
  } finally {
    launchingB2 = false;
    button.disabled = false;
    button.innerHTML = `进入遥操${icon("arrow")}`;
  }
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 3500);
}

document.addEventListener("click", (event) => {
  const entry = event.target.closest("[data-robot]");
  if (entry) openRobot(entry.dataset.robot);
  const close = event.target.closest("[data-close]");
  if (close) close.closest("dialog").close();
});

document.querySelector("#confirm-selection").addEventListener("click", () => {
  if (!activeRobot) return;
  const id = activeRobot.id;
  history = [{ id, model: activeRobot.model }, ...history.filter((entry) => entry.id !== id)].slice(0, 4);
  try { localStorage.setItem("xr-robot-history", JSON.stringify(history)); } catch { /* Selection remains available for this session. */ }
  robotDialog.close();
  renderRobots();
  document.querySelector(`.entry-button[data-robot="${id}"]`)?.focus({ preventScroll: true });
  showToast(`已选择 ${modelLabel(history[0])}`);
});

for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
}
renderRobots();
