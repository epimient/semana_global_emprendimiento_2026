/* ============================================================
   Semana Global de Emprendimiento 2026 — comportamiento
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Cabecera fija ---------- */
  const head = document.getElementById("siteHead");
  const onScroll = () => {
    if (!head) return;
    head.classList.toggle("is-stuck", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Revelado al desplazar ---------- */
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }

  /* ---------- Navegación activa ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-desktop a"));
  const navSections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  let navTick = false;
  function updateNav() {
    navTick = false;
    if (!navSections.length) return;
    const marker = window.scrollY + window.innerHeight * 0.3;
    let current = null;
    navSections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        !!current && link.getAttribute("href") === "#" + current.id
      );
    });
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!navTick) {
        navTick = true;
        window.requestAnimationFrame(updateNav);
      }
    },
    { passive: true }
  );
  updateNav();

  /* ---------- Cuenta regresiva ---------- */
  const countdownValue = document.getElementById("countdownValue");
  const countdownStart = Date.parse("2026-11-18T18:00:00-05:00");
  const countdownEnd = Date.parse("2026-11-20T21:00:00-05:00");

  function renderCountdown() {
    if (!countdownValue) return;
    const now = Date.now();
    if (now >= countdownEnd) {
      countdownValue.textContent = "Edición finalizada";
      return;
    }
    if (now >= countdownStart) {
      countdownValue.textContent = "En curso";
      return;
    }
    let diff = countdownStart - now;
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    const pad = (n) => String(n).padStart(2, "0");
    countdownValue.textContent =
      days > 0
        ? pad(days) + " d · " + pad(hours) + " h"
        : pad(hours) + " h · " + pad(minutes) + " min";
  }
  renderCountdown();
  window.setInterval(renderCountdown, 30000);

  /* ---------- Agenda: enlaces a cada jornada ---------- */
  document.querySelectorAll("[data-agenda-day]").forEach((link) => {
    link.addEventListener("click", () => {
      const day = link.getAttribute("data-agenda-day");
      const trigger = document.getElementById("tab-" + day.replace("dia-", ""));
      if (trigger && window.bootstrap && window.bootstrap.Tab) {
        window.bootstrap.Tab.getOrCreateInstance(trigger).show();
      }
    });
  });

  /* ---------- Menú móvil: cerrar al navegar ---------- */
  const menu = document.getElementById("menuMovil");
  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.bootstrap && window.bootstrap.Offcanvas) {
          const instance = window.bootstrap.Offcanvas.getInstance(menu);
          if (instance) instance.hide();
        }
      });
    });
  }

  /* ---------- Calendario (.ics) ---------- */
  const calendarDays = [
    { day: 18, endUtc: "20261119T020000Z", label: "Día 1 — Instalación, experiencias y sostenibilidad" },
    { day: 19, endUtc: "20261120T020000Z", label: "Día 2 — Emprendimiento sostenible, experiencias y tecnología 4.0" },
    { day: 20, endUtc: "20261121T020000Z", label: "Día 3 — Experiencias universitarias, estrategia y era digital" },
  ];

  function buildCalendar() {
    const stamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CIE Corporacion Universitaria Americana//SGE 2026//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Semana Global de Emprendimiento 2026",
      "X-WR-TIMEZONE:America/Bogota",
    ];

    calendarDays.forEach((item) => {
      lines.push(
        "BEGIN:VEVENT",
        "UID:sge-2026-" + item.day + "@americana.edu.co",
        "DTSTAMP:" + stamp,
        "DTSTART:202611" + item.day + "T230000Z",
        "DTEND:" + item.endUtc,
        "SUMMARY:Semana Global de Emprendimiento 2026 — " + item.label,
        "DESCRIPTION:Innovación y Modelos de Negocios Digitales. Modalidad híbrida. Hora de Colombia (COT).",
        "LOCATION:Auditorio Cosmos — Calle 72 # 41C-64, Barranquilla, Colombia",
        "URL:https://americana.edu.co/",
        "END:VEVENT"
      );
    });

    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "semana-global-emprendimiento-2026.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  ["addCalendar", "addCalendar2", "addCalendar3"].forEach((id) => {
    const button = document.getElementById(id);
    if (button) button.addEventListener("click", buildCalendar);
  });

})();
