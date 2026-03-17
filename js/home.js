function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
function getScrollProgress(el) {
  const top = el.getBoundingClientRect().top;
  return clamp(1 - top / window.innerHeight, 0, 1);
}
function interpolateColor(p, a, b, c) {
  let r, g, b2;
  if (p <= 0.4) {
    const t = p / 0.4;
    r = a[0] + (b[0] - a[0]) * t;
    g = a[1] + (b[1] - a[1]) * t;
    b2 = a[2] + (b[2] - a[2]) * t;
  } else if (p <= 0.8) {
    const t = (p - 0.4) / 0.4;
    r = b[0] + (c[0] - b[0]) * t;
    g = b[1] + (c[1] - b[1]) * t;
    b2 = b[2] + (c[2] - b[2]) * t;
  } else {
    r = c[0];
    g = c[1];
    b2 = c[2];
  }
  return `rgb(${r | 0},${g | 0},${b2 | 0})`;
}
function applyVisualEffect(el, p) {
  el.style.transform = `scale(${1 - p * 0.5})`;
  el.style.opacity = `${1 - p * 1.5}`;
  el.style.filter = `blur(${p * 3}vh)`;
}
function applyShadow(el, p) {
  const col = interpolateColor(
    p,
    [255, 255, 255],
    [221, 221, 221],
    [255, 255, 255]
  );
  el.style.boxShadow = `0 0 100vh ${col}`;
}
let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const f = document.getElementById("_1_face");
      const m = document.getElementById("_2_me");
      const j = document.getElementById("_3_journal");
      if (f && f.style.display !== "none") {
        const mp = getScrollProgress(m);
        applyVisualEffect(f, mp);
        applyShadow(m, mp);
      }
      if (m && m.style.display !== "none") {
        const jp = getScrollProgress(j);
        applyVisualEffect(m, jp);
        applyShadow(j, jp);
      }
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});
const navSections = [
  { id: "_1_face", navId: "nav-home" },
  { id: "_2_me", navId: "nav-tentang" },
  { id: "_3_journal", navId: "nav-jurnal" },
];
window.addEventListener("scroll", () => {
  navSections.forEach(({ id, navId }) => {
    const el = document.getElementById(id);
    const nav = document.getElementById(navId);
    if (!el || !nav) return;
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2;
    nav.classList.toggle("active", inView);
  });
});
document.querySelectorAll("._0_page a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
const greetings = [
  "Halo",
  "Bonjour",
  "こんにちは",
  "Helló",
  "مرحبًا",
  "Olá",
  "здравей",
  "Hej",
  "你好",
  "Tere",
  "नमस्ते",
  "Hei",
  "Aloha",
  "안녕하세요",
  "Halló",
  "สวัสดี",
  "Ciao",
  "မင်္ဂလာပါ",
  "Cześć",
  "Привет",
  "Hola",
  "Салом",
  "Xin chào",
  "Hello",
];
const greetingEl = document.getElementById("greeting");
let gIndex = 0;
setInterval(() => {
  greetingEl.classList.add("fade-out");
  setTimeout(() => {
    gIndex = (gIndex + 1) % greetings.length;
    greetingEl.textContent = greetings[gIndex];
    greetingEl.classList.remove("fade-out");
  }, 500);
}, 2000);
function htmlEsc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function xmlEsc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
const getIdentity = () =>
  typeof IDENTITY !== "undefined"
    ? IDENTITY
    : { nama: "—", nim: "—", kelas: "—", bio: "", photo: "" };
(function loadIdentity() {
  const id = getIdentity();
  const bio = document.getElementById("bio");
  if (bio) bio.textContent = id.bio || "";
  const photo = document.getElementById("photoEl");
  if (photo && id.photo) {
    photo.innerHTML = `<img src="${htmlEsc(id.photo)}" alt="Foto ${htmlEsc(
      id.nama
    )}" />`;
  }
})();
const canvas = document.getElementById("dataParticles");
const ctx = canvas.getContext("2d");
let vw = window.innerWidth;
let vh = window.innerHeight;
let pxPerVh = vh / 100;
function resizeCanvas() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  pxPerVh = vh / 100;
  canvas.width = vw;
  canvas.height = vh;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const PARTICLE_COUNT = 90;
const PARTICLE_SIZE_VH = 0.3;
const CONNECTION_DIST = 12;
let particles = [];
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * vw;
    this.y = Math.random() * vh;
    this.size = PARTICLE_SIZE_VH * pxPerVh;
    this.vx = (Math.random() - 0.5) * 0.09 * pxPerVh;
    this.vy = (Math.random() - 0.5) * 0.09 * pxPerVh;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10 || this.x > vw + 10 || this.y < -10 || this.y > vh + 10) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,200,200,1)";
    ctx.fill();
  }
}
function initParticles() {
  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}
function drawConnections() {
  const maxDist = CONNECTION_DIST * pxPerVh;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.hypot(dx, dy);
      if (d < maxDist) {
        const alpha = 1 - d / maxDist;
        ctx.strokeStyle = `rgba(200,200,200,${alpha * 0.8})`;
        ctx.lineWidth = 0.09 * pxPerVh;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, vw, vh);
  for (const p of particles) {
    p.update();
    p.draw();
  }
  drawConnections();
  requestAnimationFrame(animate);
}
initParticles();
animate();
let activeFilter = "all";
function renderJournals(filter) {
  const grid = document.getElementById("journalGrid");
  if (!grid || typeof JOURNALS === "undefined") return;
  try {
    const sorted = [...JOURNALS].sort((a, b) =>
      b.dateSort.localeCompare(a.dateSort)
    );
    const filtered =
      filter === "all" ? sorted : sorted.filter((j) => j.type === filter);
    grid.innerHTML = "";
    if (filtered.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;font-style:italic;color:var(--color-tertiary);padding:var(--size-3x04) 0;">Belum ada entri.</p>`;
      return;
    }
    filtered.forEach((journal, i) => {
      const card = buildCard(journal, i);
      grid.appendChild(card);
    });
  } catch (e) {
    console.error("Gagal render jurnal:", e);
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:red;">Terjadi kesalahan saat memuat jurnal.</p>`;
  }
}
function buildCard(journal, index) {
  const card = document.createElement("article");
  card.className = "journal-card";
  card.style.animationDelay = `${index * 0.06}s`;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Buka jurnal ${htmlEsc(journal.date)}`);
  const typeLabel = journal.type === "daily" ? "Harian" : "Mingguan";
  const badgeClass = journal.type === "daily" ? "daily" : "weekly";
  let inner = ` <div class="card-meta"> <span class="card-date">${htmlEsc(
    journal.date
  )}</span> <span class="card-badge ${badgeClass}">${typeLabel}</span> </div> <div class="card-divider"></div> `;
  if (journal.type === "daily") {
    const d = journal.daily || {};
    const targets = d.targets || [];
    const preview = targets.slice(0, 2);
    inner += ` <div class="card-targets"> ${preview
      .map((t) => `<div class="card-target-item">${htmlEsc(t)}</div>`)
      .join("")} ${
      targets.length > 2
        ? `<div class="card-target-item" style="opacity:0.5">+ ${
            targets.length - 2
          } target lainnya</div>`
        : ""
    } </div> ${
      d.results ? `<p class="card-snippet">${htmlEsc(d.results)}</p>` : ""
    } <div class="card-score"> <span class="card-score-label">Produktivitas</span> <div class="card-score-bar"> <div class="card-score-fill" style="width:${
      (d.reflection?.score || 0) * 10
    }%"></div> </div> <span class="card-score-num">${htmlEsc(
      d.reflection?.score || 0
    )}/10</span> </div> `;
  } else {
    const w = journal.weekly || {};
    const achievements = w.achievements || [];
    inner += ` <div class="card-achievements"> ${achievements
      .slice(0, 2)
      .map((a) => `<div class="card-achievement">${htmlEsc(a)}</div>`)
      .join("")} ${
      achievements.length > 2
        ? `<div class="card-achievement" style="opacity:0.5">+ ${
            achievements.length - 2
          } capaian lainnya</div>`
        : ""
    } </div> <div class="card-progress-row"> <span class="card-score-label">Progress Semester</span> <div class="card-progress-bar"> <div class="card-progress-fill" style="width:${
      w.semesterTarget?.progress || 0
    }%"></div> </div> <span class="card-progress-num">${htmlEsc(
      w.semesterTarget?.progress || 0
    )}%</span> </div> `;
  }
  inner += ` <div class="card-read-more"> Baca selengkapnya <i class="ph ph-arrow-right" aria-hidden="true"></i> </div> `;
  card.innerHTML = inner;
  const open = () => {
    if (journal.type === "weekly") {
      showWeeklyDetail(journal);
    } else {
      openModal(journal);
    }
  };
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") open();
  });
  return card;
}
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderJournals(activeFilter);
  });
});
let currentDailyJournal = null;
let currentWeeklyJournal = null;
function openModal(journal) {
  try {
    currentDailyJournal = journal;
    const modal = document.getElementById("journalModal");
    const body = document.getElementById("modalBody");
    const badge = document.getElementById("modalBadge");
    const dateEl = document.getElementById("modalDate");
    badge.className = `card-badge daily`;
    badge.textContent = "Harian";
    dateEl.textContent = journal.date;
    body.innerHTML = buildDailyDetail(journal);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    body.scrollTop = 0;
    document.getElementById("modalClose").focus();
  } catch (e) {
    console.error("Gagal membuka modal:", e);
    alert("Terjadi kesalahan saat membuka jurnal.");
  }
}
function closeModal() {
  document.getElementById("journalModal").classList.remove("open");
  document.body.style.overflow = "";
  currentDailyJournal = null;
}
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
function buildDailyDetail(journal) {
  const d = journal.daily || {};
  const sc = TEMPLATE_SCHEMA.daily.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const activities = d.activities || [];
  const targets = d.targets || [];
  const obstacles = d.obstacles || {};
  const reflection = d.reflection || {};
  const secTitle = (n, title) =>
    `<div class="detail-section-title"><span class="section-num">${n}</span> ${title}</div>`;
  const colHeaders = s1.columns
    .map((col) => `<th>${htmlEsc(col.label)}</th>`)
    .join("");
  const actRows = activities
    .map((a) => {
      const cls = a.status === "\u2713" ? "status-done" : "status-process";
      return `<tr><td>${htmlEsc(a.time)}</td><td>${htmlEsc(
        a.activity
      )}</td><td>${htmlEsc(a.output)}</td><td class="${cls}">${htmlEsc(
        a.status
      )}</td></tr>`;
    })
    .join("");
  return [
    `<div class="detail-section"> ${secTitle(
      1,
      s0.title
    )} <div class="detail-list"> ${targets
      .map(
        (t, i) =>
          `<div class="detail-list-item"><span class="bullet">\u2192</span><span>${
            s0.itemPrefix
          } ${i + 1}: ${htmlEsc(t)}</span></div>`
      )
      .join("")} </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      2,
      s1.title
    )} <table class="detail-table"> <thead><tr>${colHeaders}</tr></thead> <tbody>${actRows}</tbody> </table> </div>`,
    `<div class="detail-section"> ${secTitle(
      3,
      s2.title
    )} <p class="detail-paragraph">${htmlEsc(d.results)}</p> </div>`,
    `<div class="detail-section"> ${secTitle(
      4,
      s3.title
    )} <div class="detail-sub"> ${s3.subFields
      .map(
        (sf) =>
          `<div class="detail-sub-item"> <span class="detail-sub-label">${htmlEsc(
            sf.shortLabel || sf.label
          )}</span> <span class="detail-sub-value">${htmlEsc(
            obstacles[sf.key] || "\u2014"
          )}</span> </div>`
      )
      .join("")} </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      5,
      s4.title
    )} <p class="detail-paragraph">${htmlEsc(d.solutions)}</p> </div>`,
    `<div class="detail-section"> ${secTitle(
      6,
      s5.title
    )} <div class="detail-sub"> ${s5.subFields
      .map(
        (sf) =>
          `<div class="detail-sub-item"> <span class="detail-sub-label">${htmlEsc(
            sf.shortLabel || sf.label
          )}</span> <span class="detail-sub-value">${htmlEsc(
            reflection[sf.key] || ""
          )}</span> </div>`
      )
      .join(
        ""
      )} </div> <div class="detail-score" style="margin-top:var(--size-3x01)"> <span class="detail-score-num">${htmlEsc(
      reflection.score
    )}</span> <div class="detail-score-info"> <span class="detail-score-label">${htmlEsc(
      s5.scoreLabel
    )}</span> <div class="detail-score-bar"> <div class="detail-score-fill" style="width:${
      (reflection.score || 0) * 10
    }%"></div> </div> </div> </div> </div>`,
  ].join("");
}
function buildWeeklyDetail(journal) {
  const w = journal.weekly || {};
  const sc = TEMPLATE_SCHEMA.weekly.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const activities = w.activities || [];
  const achievements = w.achievements || [];
  const semesterTarget = w.semesterTarget || {};
  const obstacles = w.obstacles || {};
  const evaluation = w.evaluation || {};
  const nextWeekPlan = w.nextWeekPlan || [];
  const secTitle = (n, title) =>
    `<div class="detail-section-title"><span class="section-num weekly-num">${n}</span> ${title}</div>`;
  const colHeaders = s0.columns
    .map((col) => `<th>${htmlEsc(col.label)}</th>`)
    .join("");
  const totalHours = activities.reduce(
    (sum, a) => sum + parseFloat(a.duration || 0),
    0
  );
  const actRows = activities
    .map(
      (a) =>
        `<tr><td>${htmlEsc(a.day)}</td><td>${htmlEsc(
          a.focus
        )}</td><td>${htmlEsc(a.output)}</td><td>${htmlEsc(
          a.duration
        )} jam</td></tr>`
    )
    .join("");
  return [
    `<div class="detail-section"> ${secTitle(
      1,
      s0.title
    )} <table class="detail-table"> <thead><tr>${colHeaders}</tr></thead> <tbody> ${actRows} <tr> <td colspan="3" style="text-align:right;font-weight:500;color:var(--color-primary)">Total</td> <td style="font-weight:500;color:#3b5bdb">${totalHours} jam</td> </tr> </tbody> </table> </div>`,
    `<div class="detail-section"> ${secTitle(
      2,
      s1.title
    )} <div class="detail-list"> ${achievements
      .map(
        (a) =>
          `<div class="detail-list-item"><span class="bullet" style="color:#3b5bdb">\u2714</span><span>${htmlEsc(
            a
          )}</span></div>`
      )
      .join("")} </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      3,
      s2.title
    )} <div class="detail-sub" style="margin-bottom:var(--size-3x-6)"> ${s2.subFields
      .map(
        (sf) =>
          `<div class="detail-sub-item"> <span class="detail-sub-label">${htmlEsc(
            sf.label
          )}</span> <span class="detail-sub-value">${htmlEsc(
            semesterTarget[sf.key] || ""
          )}</span> </div>`
      )
      .join(
        ""
      )} </div> <div class="detail-progress-row"> <div class="detail-progress-bar"> <div class="detail-progress-fill" style="width:${
      semesterTarget.progress || 0
    }%"></div> </div> <span class="detail-progress-num">${htmlEsc(
      semesterTarget.progress || 0
    )}%</span> </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      4,
      s3.title
    )} <div class="detail-sub"> ${s3.subFields
      .map(
        (sf) =>
          `<div class="detail-sub-item"> <span class="detail-sub-label">${htmlEsc(
            sf.shortLabel || sf.label
          )}</span> <span class="detail-sub-value">${htmlEsc(
            obstacles[sf.key] || "\u2014"
          )}</span> </div>`
      )
      .join("")} </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      5,
      s4.title
    )} <div class="detail-sub"> ${s4.subFields
      .map(
        (sf) =>
          `<div class="detail-sub-item"> <span class="detail-sub-label">${htmlEsc(
            sf.shortLabel || sf.label
          )}</span> <span class="detail-sub-value">${htmlEsc(
            evaluation[sf.key] || ""
          )}</span> </div>`
      )
      .join("")} </div> </div>`,
    `<div class="detail-section"> ${secTitle(
      6,
      s5.title
    )} <div class="detail-list"> ${nextWeekPlan
      .map(
        (t, i) =>
          `<div class="detail-list-item"><span class="bullet" style="color:#3b5bdb">\u2192</span><span>${
            s5.itemPrefix
          } ${i + 1}: ${htmlEsc(t)}</span></div>`
      )
      .join("")} </div> </div>`,
  ].join("");
}
document.getElementById("btnPrint").addEventListener("click", () => {
  if (!currentDailyJournal) return;
  const printArea = document.getElementById("printArea");
  printArea.innerHTML = buildPrintDaily(currentDailyJournal);
  window.print();
});
function buildPrintDaily(journal) {
  const d = journal.daily || {};
  const id = getIdentity();
  const sc = TEMPLATE_SCHEMA.daily.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const idf = TEMPLATE_SCHEMA.identity;
  const activities = d.activities || [];
  const targets = d.targets || [];
  const colHeaders = s1.columns
    .map(
      (col) => `<th style="width:${col.printWidth}">${htmlEsc(col.label)}</th>`
    )
    .join("");
  const actRows = activities
    .map(
      (a) =>
        `<tr><td>${htmlEsc(a.time)}</td><td>${htmlEsc(
          a.activity
        )}</td><td>${htmlEsc(a.output)}</td><td>${htmlEsc(a.status)}</td></tr>`
    )
    .join("");
  const hintRow =
    activities.length === 0
      ? `<tr><td>08.00\u201309.30</td><td></td><td></td><td></td></tr>`
      : "";
  const emptyRows = `<tr class="print-blank-row"><td></td><td></td><td></td><td></td></tr><tr class="print-blank-row"><td></td><td></td><td></td><td></td></tr>`;
  const targetItems = targets
    .map((t, i) => `<li>${s0.itemPrefix} ${i + 1}: ${htmlEsc(t)}</li>`)
    .join("");
  const padTargets = Array.from({ length: Math.max(0, 3 - targets.length) })
    .map(
      (_, i) => `<li>${s0.itemPrefix} ${targets.length + i + 1}: \u2014</li>`
    )
    .join("");
  return ` <div class="print-page"> <div class="print-title">${htmlEsc(
    TEMPLATE_SCHEMA.daily.docTitle
  )}</div> <div class="print-identitas print-section"> <p><strong>${htmlEsc(
    idf.label
  )}</strong> <em>${htmlEsc(idf.note)}</em></p> ${idf.fields
    .map((f) => `<p>${htmlEsc(f.label)}: ${htmlEsc(id[f.key] || "\u2014")}</p>`)
    .join(
      ""
    )} </div> </div> <div class="print-page"> <div class="print-section"> <div class="print-section-header">${
    s0.num
  } ${htmlEsc(s0.title)} (${htmlEsc(
    journal.date
  )})</div> <p class="print-note">${htmlEsc(
    s0.note
  )}</p> <ul>${targetItems}${padTargets}</ul> </div> <div class="print-section"> <div class="print-section-header">${
    s1.num
  } ${htmlEsc(
    s1.title
  )}</div> <table class="print-table"> <thead><tr>${colHeaders}</tr></thead> <tbody>${hintRow}${actRows}${emptyRows}</tbody> </table> </div> <div class="print-section"> <div class="print-section-header">${
    s2.num
  } ${htmlEsc(s2.title)}</div> <p class="print-note">${htmlEsc(
    s2.note
  )}</p> <p>${htmlEsc(
    d.results
  )}</p> </div> <div class="print-section"> <div class="print-section-header">${
    s3.num
  } ${htmlEsc(s3.title)}</div> <ul> ${s3.subFields
    .map(
      (sf) =>
        `<li>${htmlEsc(sf.label)}: ${htmlEsc(
          d.obstacles?.[sf.key] || "\u2014"
        )}</li>`
    )
    .join(
      ""
    )} </ul> </div> <div class="print-section"> <div class="print-section-header">${
    s4.num
  } ${htmlEsc(s4.title)}</div> <p>${htmlEsc(
    d.solutions
  )}</p> </div> <div class="print-section"> <div class="print-section-header">${
    s5.num
  } ${htmlEsc(s5.title)}</div> <p class="print-note">${htmlEsc(
    s5.note
  )}</p> <ul> ${s5.subFields
    .map(
      (sf) =>
        `<li>${htmlEsc(sf.label)} ${htmlEsc(d.reflection?.[sf.key] || "")}</li>`
    )
    .join("")} <li>${htmlEsc(
    s5.scoreLabel
  )}: <span class="print-score">${htmlEsc(
    d.reflection?.score
  )}</span></li> </ul> </div> </div>`;
}
document.getElementById("btnDocx").addEventListener("click", async () => {
  if (!currentDailyJournal) return;
  await downloadDocx(currentDailyJournal, "daily");
});
async function downloadDocx(journal, type) {
  const btn =
    type === "daily"
      ? document.getElementById("btnDocx")
      : document.getElementById("weeklyDocxBtn");
  btn.disabled = true;
  btn.innerHTML = '<i class="ph ph-spinner"></i> Memproses...';
  try {
    const blob =
      type === "daily"
        ? await buildDocxDaily(journal)
        : await buildDocxWeekly(journal);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Jurnal_${type === "daily" ? "Harian" : "Mingguan"}_${
      journal.dateSort
    }.docx`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (err) {
    console.error("Docx error:", err);
    alert("Gagal membuat file .docx: " + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="ph ph-file-doc"></i> Unduh .docx';
  }
}
function wr(text, opts = {}) {
  const rpr = [
    opts.bold ? "<w:b/>" : "",
    opts.italic ? "<w:i/>" : "",
    opts.sz
      ? `<w:sz w:val="${opts.sz}"/><w:szCs w:val="${opts.sz}"/>`
      : '<w:sz w:val="22"/><w:szCs w:val="22"/>',
    opts.color ? `<w:color w:val="${opts.color}"/>` : "",
    `<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>`,
  ].join("");
  return `<w:r><w:rPr>${rpr}</w:rPr><w:t xml:space="preserve">${xmlEsc(
    text
  )}</w:t></w:r>`;
}
function wp(runs, opts = {}) {
  const ppr = [];
  if (opts.numId)
    ppr.push(
      `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${opts.numId}"/></w:numPr>`
    );
  const bdr = [];
  if (opts.borderBottom)
    bdr.push(
      `<w:bottom w:val="single" w:sz="8" w:space="2" w:color="999999"/>`
    );
  if (opts.borderLeft)
    bdr.push(`<w:left w:val="single" w:sz="18" w:space="8" w:color="000000"/>`);
  if (opts.titleBorder)
    bdr.push(
      `<w:bottom w:val="single" w:sz="12" w:space="4" w:color="000000"/>`
    );
  if (bdr.length) ppr.push(`<w:pBdr>${bdr.join("")}</w:pBdr>`);
  const before = opts.before != null ? opts.before : 0;
  const after = opts.after != null ? opts.after : 120;
  ppr.push(`<w:spacing w:before="${before}" w:after="${after}"/>`);
  if (opts.indent) ppr.push(`<w:ind w:left="${opts.indent}" w:hanging="360"/>`);
  if (opts.align) ppr.push(`<w:jc w:val="${opts.align}"/>`);
  const pprStr = ppr.length > 0 ? `<w:pPr>${ppr.join("")}</w:pPr>` : "";
  return `<w:p>${pprStr}${runs}</w:p>`;
}
function wtc(text, width, isHeader = false) {
  const shading = isHeader
    ? `<w:shd w:val="clear" w:color="auto" w:fill="E8E8E8"/>`
    : "";
  return `<w:tc> <w:tcPr> <w:tcW w:w="${width}" w:type="dxa"/> ${shading} <w:tcMar><w:top w:w="72" w:type="dxa"/><w:bottom w:w="72" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tcMar> </w:tcPr> <w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>${wr(
    text || "",
    { bold: isHeader, sz: 20 }
  )}</w:p> </w:tc>`;
}
function wtr(cells) {
  return `<w:tr>${cells}</w:tr>`;
}
function wtable(colWidths, rows) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  const grid = colWidths.map((w) => `<w:gridCol w:w="${w}"/>`).join("");
  return `<w:tbl> <w:tblPr> <w:tblW w:w="${total}" w:type="dxa"/> <w:tblBorders> <w:top w:val="single" w:sz="4" w:space="0" w:color="444444"/> <w:left w:val="single" w:sz="4" w:space="0" w:color="444444"/> <w:bottom w:val="single" w:sz="4" w:space="0" w:color="444444"/> <w:right w:val="single" w:sz="4" w:space="0" w:color="444444"/> <w:insideH w:val="single" w:sz="4" w:space="0" w:color="444444"/> <w:insideV w:val="single" w:sz="4" w:space="0" w:color="444444"/> </w:tblBorders> <w:tblCellMar> <w:top w:w="72" w:type="dxa"/><w:bottom w:w="72" w:type="dxa"/> <w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/> </w:tblCellMar> </w:tblPr> <w:tblGrid>${grid}</w:tblGrid> ${rows} </w:tbl>`;
}
function emptyTr(colWidths) {
  const cells = colWidths
    .map(
      (w) =>
        `<w:tc> <w:tcPr><w:tcW w:w="${w}" w:type="dxa"/></w:tcPr> <w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr><w:r><w:t></w:t></w:r></w:p> </w:tc>`
    )
    .join("");
  return `<w:tr><w:trPr><w:trHeight w:val="400" w:hRule="atLeast"/></w:trPr>${cells}</w:tr>`;
}
function wsh(text) {
  return wp(wr(text, { bold: true, sz: 22 }), {
    before: 180,
    after: 80,
    borderBottom: true,
  });
}
function wnote(text) {
  return wp(wr(text, { italic: true, sz: 20, color: "777777" }), {
    before: 40,
    after: 40,
  });
}
function wbp(text) {
  return wp(wr(text, { sz: 22 }), { numId: 1, before: 40, after: 40 });
}
function widp(text) {
  return wp(wr(text, { sz: 22 }), { borderLeft: true, before: 40, after: 40 });
}
function wnp(text) {
  return wp(wr(text, { sz: 22 }), { before: 40, after: 80 });
}
function makeDocumentXml(bodyContent) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 wp14"> <w:body> ${bodyContent} <w:sectPr> <w:pgSz w:w="11906" w:h="16838"/> <w:pgMar w:top="1134" w:right="1418" w:bottom="1134" w:left="1418"/> </w:sectPr> </w:body> </w:document>`;
}
function makeNumberingXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"> <w:abstractNum w:abstractNumId="0"> <w:lvl w:ilvl="0"> <w:start w:val="1"/> <w:numFmt w:val="bullet"/> <w:lvlText w:val="&#x2022;"/> <w:lvlJc w:val="left"/> <w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr> <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/></w:rPr> </w:lvl> </w:abstractNum> <w:num w:numId="1"> <w:abstractNumId w:val="0"/> </w:num> </w:numbering>`;
}
function makeStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"> <w:docDefaults> <w:rPrDefault> <w:rPr> <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/> <w:sz w:val="22"/><w:szCs w:val="22"/> </w:rPr> </w:rPrDefault> <w:pPrDefault> <w:pPr><w:spacing w:after="120"/></w:pPr> </w:pPrDefault> </w:docDefaults> <w:style w:type="paragraph" w:styleId="Normal" w:default="1"> <w:name w:val="Normal"/> </w:style> </w:styles>`;
}
function makeContentTypes() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"> <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/> <Default Extension="xml" ContentType="application/xml"/> <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/> <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/> <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/> </Types>`;
}
function makeRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/> </Relationships>`;
}
function makeWordRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/> <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/> </Relationships>`;
}
async function buildDocxDaily(journal) {
  const d = journal.daily || {};
  const id = getIdentity();
  const sc = TEMPLATE_SCHEMA.daily.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const idf = TEMPLATE_SCHEMA.identity;
  const cw = s1.columns.map((col) => col.docxWidth);
  const headerRow = wtr(
    s1.columns.map((col, i) => wtc(col.label, cw[i], true)).join("")
  );
  const activities = d.activities || [];
  const dataRows = activities
    .map((a) =>
      wtr(
        wtc(a.time, cw[0]) +
          wtc(a.activity, cw[1]) +
          wtc(a.output, cw[2]) +
          wtc(a.status, cw[3])
      )
    )
    .join("");
  const hintRow =
    activities.length === 0
      ? wtr(
          wtc("08.00\u201309.30", cw[0]) +
            wtc("", cw[1]) +
            wtc("", cw[2]) +
            wtc("", cw[3])
        )
      : "";
  const emptyRows = emptyTr(cw) + emptyTr(cw);
  const titlePara = wp(
    wr(TEMPLATE_SCHEMA.daily.docTitle, { bold: true, sz: 28 }),
    { align: "center", before: 0, after: 200, titleBorder: true }
  );
  const targets = d.targets || [];
  const paddedTargets = [...targets];
  while (paddedTargets.length < 3) paddedTargets.push("\u2014");
  const body = [
    titlePara,
    wp(
      wr(idf.label, { bold: true, sz: 22 }) +
        wr(" " + idf.note, { italic: true, sz: 22 }),
      { borderLeft: true, before: 120, after: 40 }
    ),
    ...idf.fields.map((f) => widp(f.label + ": " + (id[f.key] || "\u2014"))),
    wp('<w:r><w:br w:type="page"/></w:r>', { before: 0, after: 0 }),
    wsh(s0.num + " " + s0.title + " (" + journal.date + ")"),
    wnote(s0.note),
    ...paddedTargets.map((t, i) =>
      wbp(s0.itemPrefix + " " + (i + 1) + ": " + t)
    ),
    wsh(s1.num + " " + s1.title),
    wtable(cw, headerRow + hintRow + dataRows + emptyRows),
    wsh(s2.num + " " + s2.title),
    wnote(s2.note),
    wnp(d.results || ""),
    wsh(s3.num + " " + s3.title),
    ...s3.subFields.map((sf) =>
      wbp(sf.label + ": " + (d.obstacles?.[sf.key] || "\u2014"))
    ),
    wsh(s4.num + " " + s4.title),
    wnp(d.solutions || ""),
    wsh(s5.num + " " + s5.title),
    wnote(s5.note),
    ...s5.subFields.map((sf) =>
      wbp(sf.label + " " + (d.reflection?.[sf.key] || ""))
    ),
    wbp(s5.scoreLabel + ": " + (d.reflection?.score || "")),
  ].join("\n");
  const zip = new JSZip();
  zip.file("[Content_Types].xml", makeContentTypes());
  zip.file("_rels/.rels", makeRels());
  zip.file("word/_rels/document.xml.rels", makeWordRels());
  zip.file("word/styles.xml", makeStylesXml());
  zip.file("word/numbering.xml", makeNumberingXml());
  zip.file("word/document.xml", makeDocumentXml(body));
  return await zip.generateAsync({ type: "blob" });
}
async function buildDocxWeekly(journal) {
  const w = journal.weekly || {};
  const sc = TEMPLATE_SCHEMA.weekly.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const id = getIdentity();
  const idf = TEMPLATE_SCHEMA.identity;
  const cw = s0.columns.map((col) => col.docxWidth);
  const headerRow = wtr(
    s0.columns.map((col, i) => wtc(col.label, cw[i], true)).join("")
  );
  const activities = w.activities || [];
  const dataRows = activities
    .map((a) =>
      wtr(
        wtc(a.day, cw[0]) +
          wtc(a.focus, cw[1]) +
          wtc(a.output, cw[2]) +
          wtc(String(a.duration), cw[3])
      )
    )
    .join("");
  const emptyRows = emptyTr(cw) + emptyTr(cw);
  const titlePara = wp(
    wr(TEMPLATE_SCHEMA.weekly.docTitle, { bold: true, sz: 28 }),
    { align: "center", before: 0, after: 200, titleBorder: true }
  );
  const achievements = w.achievements || [];
  const paddedAch = [...achievements];
  while (paddedAch.length < 3) paddedAch.push("\u2014");
  const nextWeekPlan = w.nextWeekPlan || [];
  const paddedPlan = [...nextWeekPlan];
  while (paddedPlan.length < 3) paddedPlan.push("\u2014");
  const semesterTarget = w.semesterTarget || {};
  const obstacles = w.obstacles || {};
  const evaluation = w.evaluation || {};
  const identitasParts = [
    titlePara,
    wp(
      wr(idf.label, { bold: true, sz: 22 }) +
        wr(" " + idf.note, { italic: true, sz: 22 }),
      { borderLeft: true, before: 120, after: 40 }
    ),
    ...idf.fields.map((f) => widp(f.label + ": " + (id[f.key] || "\u2014"))),
    wp('<w:r><w:br w:type="page"/></w:r>', { before: 0, after: 0 }),
  ];
  const mainParts = [
    wsh(s0.num + " " + s0.title + " (" + journal.date + ")"),
    wtable(cw, headerRow + dataRows + emptyRows),
    wsh(s1.num + " " + s1.title),
    wnote(s1.note),
    ...paddedAch.map((a) => wnp("\u2714 " + a)),
    wsh(s2.num + " " + s2.title),
    wbp(s2.subFields[0].label + ": " + (semesterTarget.target || "")),
    wbp(s2.progressLabel + ": " + (semesterTarget.progress || 0) + "%"),
    wbp(s2.subFields[1].label + ": " + (semesterTarget.note || "")),
    wsh(s3.num + " " + s3.title),
    ...s3.subFields.map((sf) =>
      wbp(sf.label + ": " + (obstacles[sf.key] || "\u2014"))
    ),
    wsh(s4.num + " " + s4.title),
    wnote(s4.note),
    ...s4.subFields.map((sf) =>
      wbp(sf.label + " " + (evaluation[sf.key] || ""))
    ),
    wsh(s5.num + " " + s5.title),
    ...paddedPlan.map((t, i) => wbp(s5.itemPrefix + " " + (i + 1) + ": " + t)),
  ];
  const body = identitasParts.concat(mainParts).join("\n");
  const zip = new JSZip();
  zip.file("[Content_Types].xml", makeContentTypes());
  zip.file("_rels/.rels", makeRels());
  zip.file("word/_rels/document.xml.rels", makeWordRels());
  zip.file("word/styles.xml", makeStylesXml());
  zip.file("word/numbering.xml", makeNumberingXml());
  zip.file("word/document.xml", makeDocumentXml(body));
  return await zip.generateAsync({ type: "blob" });
}
function validateData() {
  if (typeof JOURNALS === "undefined") return;
  const violations = [];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const idSet = new Set();
  JOURNALS.forEach(function (journal) {
    if (!dateRegex.test(journal.dateSort))
      violations.push({
        id: journal.id || "N/A",
        date: journal.date,
        field: "dateSort",
        err: "Format harus YYYY-MM-DD",
      });
    if (idSet.has(journal.id))
      violations.push({
        id: journal.id,
        date: journal.date,
        field: "ID",
        err: "Duplikat ID",
      });
    idSet.add(journal.id);
    if (journal.type === "daily") {
      if (!journal.daily) {
        violations.push({
          id: journal.id,
          date: journal.date,
          field: "Schema",
          err: "Objek daily tidak ditemukan",
        });
      } else {
        TEMPLATE_SCHEMA.daily.requiredFields.forEach(function (field) {
          if (
            journal.daily[field] === undefined ||
            journal.daily[field] === null
          )
            violations.push({
              id: journal.id,
              date: journal.date,
              field,
              err: "Field wajib tidak ditemukan",
            });
        });
      }
    }
    if (journal.type === "weekly") {
      if (!journal.weekly) {
        violations.push({
          id: journal.id,
          date: journal.date,
          field: "Schema",
          err: "Objek weekly tidak ditemukan",
        });
      } else {
        TEMPLATE_SCHEMA.weekly.requiredFields.forEach(function (field) {
          if (
            journal.weekly[field] === undefined ||
            journal.weekly[field] === null
          )
            violations.push({
              id: journal.id,
              date: journal.date,
              field,
              err: "Field wajib tidak ditemukan",
            });
        });
      }
    }
  });
  if (violations.length === 0) return;
  console.group(
    "%c\u26a0 data.js \u2014 Peringatan Integritas Data",
    "color:#b45309;font-weight:bold"
  );
  violations.forEach(function (v) {
    console.warn(`[${v.id}] "${v.date}" \u2192 ${v.field}: ${v.err}`);
  });
  console.groupEnd();
  const banner = document.createElement("div");
  banner.id = "dataValidationBanner";
  banner.setAttribute("role", "alert");
  banner.style.cssText =
    "position:fixed;top:0;left:0;right:0;z-index:9999;background:#fffbeb;border-bottom:2px solid #f59e0b;padding:10px 20px;display:flex;align-items:flex-start;gap:12px;font-family:Arial,sans-serif;font-size:13px;color:#92400e;box-shadow:0 2px 8px rgba(0,0,0,0.1);";
  const icon = document.createElement("span");
  icon.textContent = "\u26a0";
  icon.style.cssText = "font-size:16px;flex-shrink:0;margin-top:2px;";
  const textBlock = document.createElement("div");
  textBlock.style.flex = "1";
  const title = document.createElement("strong");
  title.style.display = "block";
  title.textContent = "Peringatan Integritas Data (data.js)";
  const list = document.createElement("ul");
  list.style.cssText = "margin:4px 0 0 16px;padding:0;";
  violations.forEach(function (v) {
    const li = document.createElement("li");
    li.style.cssText = "margin:2px 0;";
    li.textContent = `[${v.date}] ${v.field}: ${v.err}`;
    list.appendChild(li);
  });
  textBlock.appendChild(title);
  textBlock.appendChild(list);
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "\u2715";
  closeBtn.setAttribute("aria-label", "Tutup peringatan");
  closeBtn.style.cssText =
    "background:none;border:none;cursor:pointer;font-size:16px;color:#92400e;flex-shrink:0;padding:0 4px;line-height:1;align-self:flex-start;";
  closeBtn.addEventListener("click", function () {
    banner.remove();
  });
  banner.appendChild(icon);
  banner.appendChild(textBlock);
  banner.appendChild(closeBtn);
  document.body.prepend(banner);
}
validateData();
renderJournals("all");
const weeklyDetailContainer = document.getElementById("weeklyDetailContainer");
const weeklyDetailContent = document.getElementById("weeklyDetailContent");
const journalHeader = document.querySelector(".journal-header");
const journalGrid = document.getElementById("journalGrid");
const backBtn = document.getElementById("backToGridBtn");
function showWeeklyDetail(journal) {
  try {
    toggleFaceMe(true);
    currentWeeklyJournal = journal;
    journalHeader.style.display = "none";
    journalGrid.style.display = "none";
    weeklyDetailContainer.style.display = "block";
    weeklyDetailContent.innerHTML = buildWeeklyDetail(journal);
    document.getElementById("weeklyIdentity").innerHTML = buildIdentityHTML();
    const url = new URL(window.location);
    url.searchParams.set("week", journal.id);
    history.pushState({}, "", url);
    document.title = `Jurnal Mingguan - ${journal.date}`;
    document.getElementById("weeklyPrintBtn").onclick = () => {
      const printArea = document.getElementById("printArea");
      printArea.innerHTML = buildPrintWeekly(journal);
      window.print();
    };
    document.getElementById("weeklyDocxBtn").onclick = async () => {
      await downloadDocx(journal, "weekly");
    };
  } catch (e) {
    console.error("Gagal menampilkan detail mingguan:", e);
    alert("Terjadi kesalahan saat membuka jurnal mingguan.");
  }
}
function buildPrintWeekly(journal) {
  const w = journal.weekly || {};
  const sc = TEMPLATE_SCHEMA.weekly.sections;
  const [s0, s1, s2, s3, s4, s5] = sc;
  const id = getIdentity();
  const idf = TEMPLATE_SCHEMA.identity;
  const activities = w.activities || [];
  const achievements = w.achievements || [];
  const nextWeekPlan = w.nextWeekPlan || [];
  const colHeaders = s0.columns
    .map(
      (col) => `<th style="width:${col.printWidth}">${htmlEsc(col.label)}</th>`
    )
    .join("");
  const actRows = activities
    .map(
      (a) =>
        `<tr><td>${htmlEsc(a.day)}</td><td>${htmlEsc(
          a.focus
        )}</td><td>${htmlEsc(a.output)}</td><td>${htmlEsc(
          a.duration
        )}</td></tr>`
    )
    .join("");
  const emptyRows = `<tr class="print-blank-row"><td></td><td></td><td></td><td></td></tr><tr class="print-blank-row"><td></td><td></td><td></td><td></td></tr>`;
  const achItems = achievements
    .map((a) => `<li>\u2714 ${htmlEsc(a)}</li>`)
    .join("");
  const padAch = Array.from({ length: Math.max(0, 3 - achievements.length) })
    .map(() => `<li>\u2714 \u2014</li>`)
    .join("");
  const planItems = nextWeekPlan
    .map((t, i) => `<li>${s5.itemPrefix} ${i + 1}: ${htmlEsc(t)}</li>`)
    .join("");
  const padPlan = Array.from({ length: Math.max(0, 3 - nextWeekPlan.length) })
    .map(
      (_, i) =>
        `<li>${s5.itemPrefix} ${nextWeekPlan.length + i + 1}: \u2014</li>`
    )
    .join("");
  const identitasHtml = ` <div class="print-page"> <div class="print-title">${htmlEsc(
    TEMPLATE_SCHEMA.weekly.docTitle
  )}</div> <div class="print-identitas print-section"> <p><strong>${htmlEsc(
    idf.label
  )}</strong> <em>${htmlEsc(idf.note)}</em></p> ${idf.fields
    .map((f) => `<p>${htmlEsc(f.label)}: ${htmlEsc(id[f.key] || "\u2014")}</p>`)
    .join("")} </div> </div>`;
  const mainHtml = ` <div class="print-page"> <div class="print-section-header">${
    s0.num
  } ${htmlEsc(s0.title)} (${htmlEsc(
    journal.date
  )})</div> <table class="print-table"> <thead><tr>${colHeaders}</tr></thead> <tbody>${actRows}${emptyRows}</tbody> </table> <div class="print-section"> <div class="print-section-header">${
    s1.num
  } ${htmlEsc(s1.title)}</div> <p class="print-note">${htmlEsc(
    s1.note
  )}</p> <ul>${achItems}${padAch}</ul> </div> <div class="print-section"> <div class="print-section-header">${
    s2.num
  } ${htmlEsc(s2.title)}</div> <ul> <li>${htmlEsc(
    s2.subFields[0].label
  )}: ${htmlEsc(w.semesterTarget?.target || "")}</li> <li>${htmlEsc(
    s2.progressLabel
  )}: ${htmlEsc(w.semesterTarget?.progress || 0)}%</li> <li>${htmlEsc(
    s2.subFields[1].label
  )}: ${htmlEsc(
    w.semesterTarget?.note || ""
  )}</li> </ul> </div> <div class="print-section"> <div class="print-section-header">${
    s3.num
  } ${htmlEsc(s3.title)}</div> <ul> ${s3.subFields
    .map(
      (sf) =>
        `<li>${htmlEsc(sf.label)}: ${htmlEsc(
          w.obstacles?.[sf.key] || "\u2014"
        )}</li>`
    )
    .join(
      ""
    )} </ul> </div> <div class="print-section"> <div class="print-section-header">${
    s4.num
  } ${htmlEsc(s4.title)}</div> <p class="print-note">${htmlEsc(
    s4.note
  )}</p> <ul> ${s4.subFields
    .map(
      (sf) =>
        `<li>${htmlEsc(sf.label)} ${htmlEsc(w.evaluation?.[sf.key] || "")}</li>`
    )
    .join(
      ""
    )} </ul> </div> <div class="print-section"> <div class="print-section-header">${
    s5.num
  } ${htmlEsc(s5.title)}</div> <ul>${planItems}${padPlan}</ul> </div> </div>`;
  return identitasHtml + mainHtml;
}
function hideWeeklyDetail() {
  weeklyDetailContainer.style.display = "none";
  journalHeader.style.display = "";
  journalGrid.style.display = "";
  const url = new URL(window.location);
  url.searchParams.delete("week");
  history.pushState({}, "", url);
  document.title = "'Aarif Faqiih - Journal";
  currentWeeklyJournal = null;
}
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const weekId = params.get("week");
  const isDetailVisible = weeklyDetailContainer.style.display !== "none";
  if (weekId) {
    const journal = JOURNALS.find(
      (j) => j.id === weekId && j.type === "weekly"
    );
    if (journal) {
      if (!isDetailVisible) showWeeklyDetail(journal);
    } else {
      if (isDetailVisible) hideWeeklyDetail();
      else {
        const url = new URL(window.location);
        url.searchParams.delete("week");
        history.replaceState({}, "", url);
      }
    }
  } else {
    if (isDetailVisible) hideWeeklyDetail();
  }
  toggleFaceMe(weeklyDetailContainer.style.display === "none");
}
backBtn.addEventListener("click", hideWeeklyDetail);
window.addEventListener("popstate", loadFromURL);
loadFromURL();
function toggleFaceMe(show) {
  const face = document.getElementById("_1_face");
  const me = document.getElementById("_2_me");
  if (face) face.style.display = show ? "" : "none";
  if (me) me.style.display = show ? "" : "none";
}
function buildIdentityHTML() {
  const id = getIdentity();
  return ` <div class="weekly-identity"> <div class="identity-header">Identitas Mahasiswa</div> <div class="identity-row"><span class="identity-label">Nama:</span> ${htmlEsc(
    id.nama
  )}</div> <div class="identity-row"><span class="identity-label">NIM:</span> ${htmlEsc(
    id.nim
  )}</div> <div class="identity-row"><span class="identity-label">Kelas:</span> ${htmlEsc(
    id.kelas || "—"
  )}</div> <div class="identity-row"><span class="identity-label">Dosen Pengampu:</span> Rakhmad Maulidi, S.Kom., M.Kom.</div> <div class="identity-row"><span class="identity-label">Tujuan:</span> Web ini untuk memenuhi tugas kuliah Weekly Journal di mata kuliah WAWASAN GLOBAL TIK.</div> </div> `;
}
