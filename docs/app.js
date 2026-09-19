/**
 * HKJC Tip Board — meetings → races → top3
 * Loads data/meetings.json; falls back to embedded EMBEDDED_DATA for file://
 */

const RANK_MARKS = { 1: "①", 2: "②", 3: "③" };

/** @type {typeof EMBEDDED_DATA} */
const EMBEDDED_DATA = {
  updatedAt: "2026-09-19 15:45",
  meetings: [
    {
      id: "20260919-s1",
      date: "2026-09-19",
      venue: "澳洲考菲爾德 · 羅柏奇勒爵士錦標賽馬日",
      type: "overseas",
      bettable: "馬會可投（S1）",
      status: "進行中",
      races: [
        {
          no: "S1-6",
          name: "功必有因錦標",
          top3: [
            { rank: 1, number: 3, nameZh: "北極角", nameEn: "Point Barrow" },
            { rank: 2, number: 10, nameZh: "新娘舞曲", nameEn: "Bridal Waltz" },
            { rank: 3, number: 2, nameZh: "慈悲之行", nameEn: "Inkaruna" },
          ],
          note: "賽果（已完）",
        },
        {
          no: "S1-7",
          name: "木下錦標",
          top3: [
            { rank: 1, number: 5, nameZh: "星辰征駕", nameEn: "Cosmic Crusader" },
            { rank: 2, number: 1, nameZh: "力先生", nameEn: "Lindermann" },
            { rank: 3, number: 6, nameZh: "天鳥俠義", nameEn: "Birdman" },
          ],
        },
        { no: "S1-8", name: "自然派錦標", top3: [
            { rank: 1, nameZh: "Zahrann", nameEn: "Zahrann" },
            { rank: 2, nameZh: "Saint George", nameEn: "Saint George" },
            { rank: 3, nameZh: "Campaldino", nameEn: "Campaldino" },
          ] },
        { no: "S1-9", name: "羅柏奇勒爵士錦標", top3: [
            { rank: 1, nameZh: "星彩女兒", nameEn: "Lady Shenandoah" },
            { rank: 2, nameZh: "天使資金", nameEn: "Angel Capital" },
            { rank: 3, nameZh: "花之萼", nameEn: "Sepals" },
          ] },
      ],
    },
    {
      id: "20260923-hv",
      date: "2026-09-23",
      venue: "跑馬地夜賽",
      type: "local",
      bettable: "本地賽事",
      status: "待更新",
      races: [
        { no: "1", name: "待定", top3: [] },
        { no: "2", name: "待定", top3: [] },
        { no: "3", name: "待定", top3: [] },
      ],
    },
  ],
};

const state = {
  data: null,
  view: "meetings", // "meetings" | "races"
  meetingId: null,
};

const $ = (sel) => document.querySelector(sel);

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

function statusClass(status) {
  if (!status) return "pending";
  if (status.includes("進行") || status.includes("直播") || status.includes("賽中")) {
    return "live";
  }
  return "pending";
}

async function loadData() {
  try {
    const res = await fetch("data/meetings.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json || !Array.isArray(json.meetings)) throw new Error("Invalid schema");
    return json;
  } catch (err) {
    console.warn("fetch meetings.json failed, using embedded data:", err.message);
    return EMBEDDED_DATA;
  }
}

function renderMeetings() {
  const list = $("#view-meetings");
  const racesView = $("#view-races");
  const nav = $("#nav-bar");
  list.classList.remove("hidden");
  racesView.classList.add("hidden");
  nav.classList.add("hidden");

  const meetings = state.data.meetings || [];
  if (!meetings.length) {
    list.innerHTML = `<div class="state-msg">暫無賽日資料</div>`;
    return;
  }

  list.innerHTML = meetings
    .map((m) => {
      const raceCount = (m.races || []).length;
      const sc = statusClass(m.status);
      const isOverseas = m.type === "overseas" || (m.venue || "").includes("海外") || (m.bettable || "").includes("馬會可投");
      const typeClass = isOverseas ? "overseas" : "local";
      const typeLabel = escapeHtml(m.bettable || (isOverseas ? "馬會可投海外賽" : "本地賽事"));
      return `
        <button type="button" class="meeting-card" data-id="${escapeAttr(m.id)}" aria-label="${escapeAttr(m.venue)}">
          <div class="meeting-card-top">
            <span class="meeting-date">${escapeHtml(formatDate(m.date))}</span>
            <span class="status-pill ${sc}">${escapeHtml(m.status || "待更新")}</span>
          </div>
          <div class="meeting-venue">${escapeHtml(m.venue)}</div>
          <div class="meeting-meta-row">
            <span class="type-pill ${typeClass}">${typeLabel}</span>
            <span>${raceCount} 場賽事</span>
          </div>
        </button>
      `;
    })
    .join("");

  list.querySelectorAll(".meeting-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.meetingId = btn.dataset.id;
      state.view = "races";
      render();
    });
  });
}

function renderRaces() {
  const list = $("#view-meetings");
  const racesView = $("#view-races");
  const nav = $("#nav-bar");
  const navTitle = $("#nav-title");

  list.classList.add("hidden");
  racesView.classList.remove("hidden");
  nav.classList.remove("hidden");

  const meeting = (state.data.meetings || []).find((m) => m.id === state.meetingId);
  if (!meeting) {
    racesView.innerHTML = `<div class="state-msg error">找不到此賽日</div>`;
    return;
  }

  navTitle.textContent = `${formatDate(meeting.date)} · ${meeting.venue}`;

  const races = meeting.races || [];
  if (!races.length) {
    racesView.innerHTML = `<div class="state-msg">暫無場次</div>`;
    return;
  }

  racesView.innerHTML = `<div class="race-list">${races.map(renderRaceBlock).join("")}</div>`;
}

function renderRaceBlock(race) {
  const top3 = Array.isArray(race.top3) ? [...race.top3].sort((a, b) => a.rank - b.rank) : [];
  const note = race.note
    ? `<span class="race-note">${escapeHtml(race.note)}</span>`
    : "";

  let body;
  if (!top3.length) {
    body = `<div class="empty-tip">待更新</div>`;
  } else {
    body = `
      <div class="section-label">三支最佳預測</div>
      <ul class="top3-list">
        ${top3.map(renderHorseRow).join("")}
      </ul>
    `;
  }

  return `
    <article class="race-block">
      <header class="race-header">
        <div class="race-no-name">
          <span class="race-no">${escapeHtml(String(race.no))}</span>
          <span class="race-name">${escapeHtml(race.name || "")}</span>
        </div>
        ${note}
      </header>
      ${body}
    </article>
  `;
}

function renderHorseRow(h) {
  const rank = h.rank || 0;
  const mark = RANK_MARKS[rank] || String(rank);
  const badge =
    rank === 1
      ? `<span class="badge-win">獨贏首選</span>`
      : `<span></span>`;
  const en = h.nameEn
    ? `<div class="horse-en">${escapeHtml(h.nameEn)}</div>`
    : "";

  return `
    <li class="horse-row rank-${rank}">
      <span class="rank-mark r${rank}" aria-label="第${rank}名">${mark}</span>
      <span class="saddle">${escapeHtml(h.number != null && h.number !== "" ? String(h.number) : "—")}</span>
      <div class="horse-names">
        <div class="horse-zh">${escapeHtml(h.nameZh || "")}</div>
        ${en}
      </div>
      ${badge}
    </li>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

function render() {
  if (state.view === "races" && state.meetingId) {
    renderRaces();
  } else {
    renderMeetings();
  }
}

function bindNav() {
  $("#btn-back").addEventListener("click", () => {
    state.view = "meetings";
    state.meetingId = null;
    render();
  });
}

async function init() {
  const loading = $("#loading");
  bindNav();
  try {
    state.data = await loadData();
    loading.classList.add("hidden");
    const upd = document.getElementById("header-updated");
    if (upd) {
      upd.textContent = state.data.updatedAt
        ? `資料更新：${state.data.updatedAt}`
        : "";
    }
    render();
  } catch (e) {
    loading.textContent = "載入失敗";
    loading.classList.add("error");
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", init);
