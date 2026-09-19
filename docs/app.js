/**
 * HKJC Tip Board — meetings → races → top3
 * Loads data/meetings.json; falls back to embedded EMBEDDED_DATA for file://
 */

const RANK_MARKS = { 1: "①", 2: "②", 3: "③" };
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

/** @type {typeof EMBEDDED_DATA} */
const EMBEDDED_DATA = {
  "meetings": [
    {
      "id": "20260919-s1",
      "date": "2026-09-19",
      "venue": "澳洲考菲爾德 · 羅柏奇勒爵士錦標賽馬日",
      "type": "overseas",
      "bettable": "馬會可投（S1）",
      "status": "已完成",
      "races": [
        {
          "no": "S1-6",
          "name": "功必有因錦標",
          "postTimeHkt": "13:00",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 3,
              "nameZh": "北極角",
              "nameEn": "Point Barrow",
              "winOdds": 4.6
            },
            {
              "rank": 2,
              "number": 10,
              "nameZh": "新娘舞曲",
              "nameEn": "Bridal Waltz",
              "winOdds": 2.1
            },
            {
              "rank": 3,
              "number": 2,
              "nameZh": "慈悲之行",
              "nameEn": "Inkaruna",
              "winOdds": 15
            }
          ]
        },
        {
          "no": "S1-7",
          "name": "木下錦標",
          "postTimeHkt": "13:35",
          "top3": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "星辰征駕",
              "nameEn": "Cosmic Crusader",
              "winOdds": 2.8
            },
            {
              "rank": 2,
              "number": 1,
              "nameZh": "力先生",
              "nameEn": "Lindermann",
              "winOdds": 3.5
            },
            {
              "rank": 3,
              "number": 6,
              "nameZh": "天鳥俠義",
              "nameEn": "Birdman",
              "winOdds": 5.5
            }
          ]
        },
        {
          "no": "S1-8",
          "name": "自然派錦標",
          "postTimeHkt": "14:15",
          "top3": [
            {
              "rank": 1,
              "nameZh": "Zahrann",
              "nameEn": "Zahrann",
              "winOdds": 4.5
            },
            {
              "rank": 2,
              "nameZh": "Saint George",
              "nameEn": "Saint George",
              "winOdds": 6
            },
            {
              "rank": 3,
              "nameZh": "Campaldino",
              "nameEn": "Campaldino",
              "winOdds": 14
            }
          ]
        },
        {
          "no": "S1-9",
          "name": "羅柏奇勒爵士錦標",
          "postTimeHkt": "14:50",
          "top3": [
            {
              "rank": 1,
              "nameZh": "星彩女兒",
              "nameEn": "Lady Shenandoah",
              "winOdds": 5
            },
            {
              "rank": 2,
              "nameZh": "天使資金",
              "nameEn": "Angel Capital",
              "winOdds": 7
            },
            {
              "rank": 3,
              "nameZh": "花之萼",
              "nameEn": "Sepals",
              "winOdds": 11
            }
          ]
        },
        {
          "no": "S1-10",
          "name": "指標評分84讓賽",
          "postTimeHkt": "15:25",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 9,
              "nameZh": "繁花浪"
            },
            {
              "rank": 2,
              "number": 5,
              "nameZh": "力勁速"
            },
            {
              "rank": 3,
              "number": 6,
              "nameZh": "發佈會"
            }
          ]
        }
      ]
    },
    {
      "id": "20260923-hv",
      "date": "2026-09-23",
      "venue": "跑馬地夜賽",
      "type": "local",
      "bettable": "本地賽事",
      "status": "待更新",
      "races": [
        {
          "no": "1",
          "name": "待定",
          "top3": []
        },
        {
          "no": "2",
          "name": "待定",
          "top3": []
        },
        {
          "no": "3",
          "name": "待定",
          "top3": []
        }
      ]
    }
  ],
  "calendarDays": [
    { "date": "2026-09-06", "label": "沙田", "type": "local" },
    { "date": "2026-09-09", "label": "跑馬地", "type": "local" },
    { "date": "2026-09-13", "label": "沙田", "type": "local" },
    { "date": "2026-09-16", "label": "跑馬地", "type": "local" },
    { "date": "2026-09-19", "label": "海外S1", "type": "overseas" },
    { "date": "2026-09-23", "label": "跑馬地", "type": "local" },
    { "date": "2026-09-27", "label": "沙田", "type": "local" }
  ],
  "updatedAt": "2026-09-19 16:55"
};

const state = {
  data: null,
  view: "meetings", // "meetings" | "races"
  meetingId: null,
  calYear: null,
  calMonth: null, // 0-indexed
};

const $ = (sel) => document.querySelector(sel);

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function isoFromYMD(y, m0, d) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

function todayIsoHkt() {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Hong_Kong",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    const d = new Date();
    return isoFromYMD(d.getFullYear(), d.getMonth(), d.getDate());
  }
}

function statusClass(status) {
  if (!status) return "pending";
  if (status.includes("進行") || status.includes("直播") || status.includes("賽中")) {
    return "live";
  }
  return "pending";
}

function isOverseasMeeting(m) {
  return (
    m.type === "overseas" ||
    (m.venue || "").includes("海外") ||
    (m.bettable || "").includes("馬會可投")
  );
}

function formatOdds(val) {
  if (val == null || val === "") return null;
  const n = typeof val === "number" ? val : parseFloat(String(val).replace(/\$/g, ""));
  if (!Number.isFinite(n)) {
    const s = String(val).trim();
    return s ? (s.startsWith("$") ? s : `$${s}`) : null;
  }
  const formatted = Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
  return `$${formatted}`;
}

/** Merge calendarDays + meeting dates → Map<iso, { types, labels, meetingIds }> */
function buildDayIndex() {
  const map = new Map();
  const ensure = (date) => {
    if (!map.has(date)) {
      map.set(date, { types: new Set(), labels: [], meetingIds: [] });
    }
    return map.get(date);
  };

  for (const cd of state.data.calendarDays || []) {
    if (!cd || !cd.date) continue;
    const e = ensure(cd.date);
    const t = cd.type === "overseas" ? "overseas" : "local";
    e.types.add(t);
    if (cd.label) e.labels.push(cd.label);
  }

  for (const m of state.data.meetings || []) {
    if (!m || !m.date) continue;
    const e = ensure(m.date);
    e.types.add(isOverseasMeeting(m) ? "overseas" : "local");
    if (m.id) e.meetingIds.push(m.id);
  }

  return map;
}

function defaultCalendarMonth() {
  const today = todayIsoHkt();
  const [ty, tm] = today.split("-").map((x) => parseInt(x, 10));
  const meetings = state.data.meetings || [];
  const calDays = state.data.calendarDays || [];
  const allDates = [
    ...meetings.map((m) => m.date).filter(Boolean),
    ...calDays.map((c) => c.date).filter(Boolean),
  ].sort();

  // Prefer current month if it has race days; else first meeting/calendar month
  const hasThisMonth = allDates.some((d) => d.startsWith(`${ty}-${pad2(tm)}`));
  if (hasThisMonth || !allDates.length) {
    return { year: ty, month: tm - 1 };
  }
  const [fy, fm] = allDates[0].split("-").map((x) => parseInt(x, 10));
  return { year: fy, month: fm - 1 };
}

function ensureCalMonth() {
  if (state.calYear == null || state.calMonth == null) {
    const d = defaultCalendarMonth();
    state.calYear = d.year;
    state.calMonth = d.month;
  }
}

function showToast(msg) {
  let el = $("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("show"), 2200);
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

function renderCalendar() {
  ensureCalMonth();
  const y = state.calYear;
  const m0 = state.calMonth;
  const dayIndex = buildDayIndex();
  const today = todayIsoHkt();

  const firstDow = new Date(y, m0, 1).getDay();
  const daysInMonth = new Date(y, m0 + 1, 0).getDate();
  const title = `${y}年${m0 + 1}月`;

  const cells = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push(`<div class="cal-cell empty" aria-hidden="true"></div>`);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = isoFromYMD(y, m0, d);
    const info = dayIndex.get(iso);
    const isToday = iso === today;
    const hasRace = !!info;
    const hasMeeting = info && info.meetingIds.length > 0;
    const types = info ? [...info.types] : [];
    const typeClass = types.includes("overseas") && types.includes("local")
      ? "both"
      : types.includes("overseas")
        ? "overseas"
        : types.includes("local")
          ? "local"
          : "";

    const dots = types.length
      ? `<span class="cal-dots">${types
          .map((t) => `<span class="cal-dot ${t}" title="${t === "overseas" ? "海外" : "本地"}"></span>`)
          .join("")}</span>`
      : "";

    const label = info && info.labels[0]
      ? `<span class="cal-day-label">${escapeHtml(info.labels[0])}</span>`
      : "";

    const classes = [
      "cal-cell",
      hasRace ? "race-day" : "",
      hasMeeting ? "has-meeting" : "",
      isToday ? "today" : "",
      typeClass,
    ]
      .filter(Boolean)
      .join(" ");

    const clickable = hasRace ? `data-date="${escapeAttr(iso)}" role="button" tabindex="0"` : "";

    cells.push(`
      <div class="${classes}" ${clickable} aria-label="${escapeAttr(iso)}${hasRace ? " 賽日" : ""}">
        <span class="cal-num">${d}</span>
        ${dots}
        ${label}
      </div>
    `);
  }

  return `
    <section class="calendar-panel" aria-label="賽日月曆">
      <div class="cal-header">
        <button type="button" class="cal-nav" id="cal-prev" aria-label="上一個月">‹</button>
        <h2 class="cal-title">${escapeHtml(title)}</h2>
        <button type="button" class="cal-nav" id="cal-next" aria-label="下一個月">›</button>
      </div>
      <div class="cal-weekdays">
        ${WEEKDAYS.map((w) => `<div class="cal-wd">${w}</div>`).join("")}
      </div>
      <div class="cal-grid">
        ${cells.join("")}
      </div>
      <div class="cal-legend">
        <span><i class="cal-dot local"></i> 本地</span>
        <span><i class="cal-dot overseas"></i> 海外</span>
      </div>
    </section>
  `;
}

function bindCalendarEvents(root) {
  const prev = root.querySelector("#cal-prev");
  const next = root.querySelector("#cal-next");
  if (prev) {
    prev.addEventListener("click", () => {
      state.calMonth -= 1;
      if (state.calMonth < 0) {
        state.calMonth = 11;
        state.calYear -= 1;
      }
      render();
    });
  }
  if (next) {
    next.addEventListener("click", () => {
      state.calMonth += 1;
      if (state.calMonth > 11) {
        state.calMonth = 0;
        state.calYear += 1;
      }
      render();
    });
  }

  const dayIndex = buildDayIndex();
  root.querySelectorAll(".cal-cell.race-day").forEach((cell) => {
    const open = () => {
      const iso = cell.dataset.date;
      const info = dayIndex.get(iso);
      if (!info) return;
      if (info.meetingIds.length) {
        state.meetingId = info.meetingIds[0];
        state.view = "races";
        render();
      } else {
        showToast("未有預測");
      }
    };
    cell.addEventListener("click", open);
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function renderMeetings() {
  const list = $("#view-meetings");
  const racesView = $("#view-races");
  const nav = $("#nav-bar");
  list.classList.remove("hidden");
  racesView.classList.add("hidden");
  nav.classList.add("hidden");

  const meetings = state.data.meetings || [];
  const calHtml = renderCalendar();

  let listHtml;
  if (!meetings.length) {
    listHtml = `<div class="state-msg">暫無賽日資料</div>`;
  } else {
    listHtml = `
      <div class="meeting-list-inner">
        <h2 class="section-heading">賽日列表</h2>
        ${meetings
          .map((m) => {
            const raceCount = (m.races || []).length;
            const sc = statusClass(m.status);
            const overseas = isOverseasMeeting(m);
            const typeClass = overseas ? "overseas" : "local";
            const typeLabel = escapeHtml(
              m.bettable || (overseas ? "馬會可投海外賽" : "本地賽事")
            );
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
          .join("")}
      </div>
    `;
  }

  list.innerHTML = calHtml + listHtml;
  bindCalendarEvents(list);

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
  const postTime = race.postTimeHkt
    ? `<span class="race-post" title="開跑時間（香港時間）">${escapeHtml(race.postTimeHkt)}</span>`
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
          ${postTime}
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
      : "";
  const en = h.nameEn
    ? `<div class="horse-en">${escapeHtml(h.nameEn)}</div>`
    : "";

  const winFmt = formatOdds(h.winOdds);
  const placeFmt = formatOdds(h.placeOdds);
  const winDisplay = winFmt || "—";
  const placeHtml = placeFmt
    ? `<span class="odds-place">位置 ${escapeHtml(placeFmt)}</span>`
    : "";

  return `
    <li class="horse-row rank-${rank}">
      <span class="rank-mark r${rank}" aria-label="第${rank}名">${mark}</span>
      <span class="saddle">${escapeHtml(h.number != null && h.number !== "" ? String(h.number) : "—")}</span>
      <div class="horse-names">
        <div class="horse-zh-row">
          <span class="horse-zh">${escapeHtml(h.nameZh || "")}</span>
          ${badge}
        </div>
        ${en}
      </div>
      <div class="odds-block" title="參考賠率">
        <span class="odds-label">獨贏</span>
        <span class="odds-win">${escapeHtml(winDisplay)}</span>
        ${placeHtml}
      </div>
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
