const CATEGORY_LABEL = {
  munchies: "Munchies",
  drinks: "Drinks",
  meal: "Meal",
  games: "Games",
  gear: "Gear",
  other: "Other",
};

const PAGE_META = {
  itinerary: { title: "Itinerary", subtitle: "Friday 4th – Sunday 6th September" },
  attendees: { title: "Attendees", subtitle: "Who's in, and how many nights" },
  "tasks-by-day": { title: "Tasks by Day", subtitle: "What to bring, grouped by day" },
  "tasks-by-person": { title: "My Tasks", subtitle: "What to bring, grouped by person" },
};

const STORAGE_PREFIX = "bucks-weekend-2026-";
const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function isChecked(id) {
  return localStorage.getItem(STORAGE_PREFIX + id) === "1";
}

function setChecked(id, val) {
  if (val) localStorage.setItem(STORAGE_PREFIX + id, "1");
  else localStorage.removeItem(STORAGE_PREFIX + id);
}

function initials(name) {
  return name.slice(0, 2).toUpperCase();
}

function avatar(name, extraClass) {
  return `<span class="avatar${extraClass ? " " + extraClass : ""}" title="${name}">${initials(name)}</span>`;
}

function badge(category) {
  return `<span class="badge badge-${category}">${CATEGORY_LABEL[category] || category}</span>`;
}

function taskRow(task) {
  const checked = isChecked(task.id);
  return `
    <li class="task-row ${checked ? "done" : ""}" data-task-id="${task.id}">
      <label>
        <span class="checkbox">
          <input type="checkbox" ${checked ? "checked" : ""} data-task-checkbox="${task.id}">
          <span class="box">${CHECK_ICON}</span>
        </span>
        ${badge(task.category)}
        <span class="task-desc">${task.description}</span>
        <span class="task-people">${task.assignedTo.map(n => avatar(n)).join("")}</span>
      </label>
    </li>`;
}

function renderItinerary() {
  const el = document.getElementById("itinerary");
  el.innerHTML = itinerary.map(day => `
    <div class="card">
      <div class="card-header"><h2>${day.day}</h2></div>
      <ul class="itinerary-list">
        ${day.items.map(item => `
          <li>
            <span class="itin-time">${item.time}</span>
            <span class="itin-body">
              <span class="itin-title">${item.title}</span>
              ${item.detail ? `<span class="itin-detail">${item.detail}</span>` : ""}
            </span>
          </li>`).join("")}
      </ul>
    </div>`).join("");
}

function renderAttendees() {
  const el = document.getElementById("attendees");
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h2>Who's in</h2>
        <span class="card-meta">${attendees.length} attendees</span>
      </div>
      <ul class="attendee-list">
        ${attendees.map(a => `
          <li class="attendee-row">
            ${avatar(a.name)}
            <span class="attendee-info">
              <span class="attendee-name">${a.name}</span>
              ${a.note ? `<span class="attendee-note">${a.note}</span>` : ""}
            </span>
            <span class="pill">${a.nights} night${a.nights > 1 ? "s" : ""}</span>
          </li>`).join("")}
      </ul>
    </div>`;
}

function taskProgress(taskSubset) {
  const total = taskSubset.length;
  const done = taskSubset.filter(t => isChecked(t.id)).length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function renderTasksByDay() {
  const el = document.getElementById("tasks-by-day");
  const days = ["Friday", "Saturday", "Sunday", "Any"];
  el.innerHTML = days.map(day => {
    const dayTasks = tasks.filter(t => t.day === day);
    if (dayTasks.length === 0) return "";
    const p = taskProgress(dayTasks);
    return `
      <div class="card">
        <div class="card-header">
          <h2>${day === "Any" ? "General / Any Day" : day}</h2>
          <span class="card-meta">${p.done}/${p.total} packed</span>
        </div>
        <ul class="task-list">
          ${dayTasks.map(taskRow).join("")}
        </ul>
      </div>`;
  }).join("");
  wireCheckboxes();
}

function renderTasksByPerson() {
  const el = document.getElementById("tasks-by-person");
  el.innerHTML = attendees.map(a => {
    const personTasks = tasks.filter(t => t.assignedTo.includes(a.name));
    if (personTasks.length === 0) {
      return `
        <div class="card">
          <div class="card-header">
            <h2>${a.name}</h2>
            <span class="card-meta">Hosting</span>
          </div>
          <p class="empty-state">Nothing to bring — thanks for sorting the house! 🏡</p>
        </div>`;
    }
    const p = taskProgress(personTasks);
    return `
      <div class="card">
        <div class="card-header">
          <h2>${a.name}</h2>
          <span class="card-meta">${p.done}/${p.total} packed</span>
        </div>
        <ul class="task-list">
          ${personTasks.map(taskRow).join("")}
        </ul>
      </div>`;
  }).join("");
  wireCheckboxes();
}

function renderProgressWidget() {
  const p = taskProgress(tasks);
  document.getElementById("progress-count").textContent = `${p.done} / ${p.total}`;
  document.getElementById("progress-fill").style.width = `${p.pct}%`;
}

function renderAll() {
  renderItinerary();
  renderAttendees();
  renderTasksByDay();
  renderTasksByPerson();
  renderProgressWidget();
}

function wireCheckboxes() {
  document.querySelectorAll("[data-task-checkbox]").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-task-checkbox");
      setChecked(id, e.target.checked);
      renderAll();
    });
  });
}

function setupTabs() {
  const navButtons = document.querySelectorAll(".nav-item, .tab-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll(".nav-item, .tab-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.tab === tab);
      });
      document.querySelectorAll(".tab-panel").forEach(p => {
        p.classList.toggle("active", p.id === tab);
      });
      const meta = PAGE_META[tab];
      if (meta) {
        document.getElementById("page-title").textContent = meta.title;
        document.getElementById("page-subtitle").textContent = meta.subtitle;
      }
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
  });
}

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("bucks-weekend-theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bucks-weekend-theme", next);
  });
}

renderAll();
setupTabs();
setupThemeToggle();
