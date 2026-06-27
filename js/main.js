/* ===========================================================
   Wales International — interactions
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Sticky header ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById("nav");
  const openBtn = document.getElementById("navOpen");
  const closeBtn = document.getElementById("navClose");
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const openNav = () => { nav.classList.add("is-open"); backdrop.classList.add("is-open"); document.body.classList.add("nav-open"); };
  const closeNav = () => { nav.classList.remove("is-open"); backdrop.classList.remove("is-open"); document.body.classList.remove("nav-open"); };
  openBtn.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
  backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  /* ---------- Active nav link ---------- */
  const links = [...document.querySelectorAll('.nav__link[href^="#"]')];
  const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
      }
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Honours board (real placements) ---------- */
  const admits = [
    { name: "Abdullah Mudassar", prog: "Bachelor's of Law", year: "2021–2025", img: "abdullah.jpg" },
    { name: "Muhammad Iqbal", prog: "Master of Business Administration", year: "2024–2025", img: "Iqbal.jpg" },
    { name: "Firzoq Anjum", prog: "Bachelor's of Aeronautical Engineering", year: "2020–2023", img: "firzoq.jpg" },
    { name: "Hamza Afzal", prog: "Bachelor's of Electrical Engineering", year: "2021–2024", img: "hamza.jpg" },
    { name: "Falah Uddin", prog: "Bachelor's of Mechanical Engineering", year: "2022–2025", img: "falah.jpg" },
    { name: "Ayesha Saeed", prog: "MSc Management", year: "2023–2024", img: "person-02.jpg" },
    { name: "Syed Kumail", prog: "MSc Public Relations", year: "2020–2021", img: "person-01.jpg" },
    { name: "Syed M. Misbah Ul Hassan", prog: "MSc Data Science", year: "2022–2023", img: "person-05.jpg" },
    { name: "Asad Waqas", prog: "MSc Engineering Management", year: "2018–2019", img: "person-03.jpg" },
    { name: "Fakhir Nasir", prog: "Bachelor's of Law", year: "2024–2028", img: "fakhir.jpg" },
    { name: "Jahanzaib Thakar", prog: "Bachelor's of Law", year: "2024–2027", img: "kha-img.jpg" },
    { name: "Mobeen Fatima", prog: "MSc Computing & Information Systems", year: "2023–2024", img: "Untitled-2-1.jpg" },
  ];
  const board = document.getElementById("board");
  if (board) {
    board.innerHTML = admits.map((a) => `
      <li class="board__row">
        <img class="board__face" src="assets/img/avatars/${a.img}" alt="" loading="lazy" />
        <span class="board__name">${a.name}</span>
        <span class="board__prog">${a.prog}</span>
        <span class="board__year">${a.year}</span>
      </li>`).join("");
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(
    ".manifesto__text, .firm__media, .firm__body, .method__head, .method__row, .dest__head, .dest__card, .outcomes__head, .board__row, .stat, .finder__head, .finder__tool, .assess__intro, .assess__card"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  const revealObs = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ---------- Count-up stats ---------- */
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll("[data-count]");
  const countObs = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      obs.unobserve(el);
      if (reduceMotion || isNaN(target)) { el.textContent = (isNaN(target) ? el.textContent : target + suffix); return; }
      const start = performance.now(), dur = 1100;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // guarantee the final value even if rAF is throttled (background tab etc.)
      setTimeout(function () { el.textContent = target + suffix; }, dur + 300);
    }),
    { threshold: 0.5 }
  );
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Finder (route explorer) ---------- */
  const finderData = {
    uk: { name: "United Kingdom",
      bachelors: { duration: "3 years", intake: "Sept · some Jan", tuition: "£14k–£26k / yr", work: "Graduate Route: 2 yrs", note: "Apply via UCAS — your personal statement carries real weight, and Russell Group options are on the table." },
      masters: { duration: "1 year", intake: "Sept · some Jan", tuition: "£15k–£30k / yr", work: "Graduate Route: 2 yrs", note: "A one-year master's saves time and money — the UK's biggest advantage over other destinations." } },
    usa: { name: "United States",
      bachelors: { duration: "4 years", intake: "Fall · some Spring", tuition: "$25k–$55k / yr", work: "OPT: 1 yr (3 for STEM)", note: "Admissions tests are often optional now — essays, profile and activities matter most. Deep scholarship pool." },
      masters: { duration: "1.5–2 years", intake: "Fall · Spring", tuition: "$20k–$50k / yr", work: "OPT: 1 yr (3 for STEM)", note: "The GRE is increasingly optional; assistantships and merit aid can cut costs substantially." } },
    australia: { name: "Australia",
      bachelors: { duration: "3 years", intake: "Feb · Jul", tuition: "A$28k–45k / yr", work: "Post-study: 2–4 yrs", note: "Group of Eight universities, generous post-study work, and clear pathways to stay on." },
      masters: { duration: "1.5–2 years", intake: "Feb · Jul", tuition: "A$30k–48k / yr", work: "Post-study: 2–4 yrs", note: "Strong post-study rights and regional incentives make Australia a long-game favourite." } },
    canada: { name: "Canada",
      bachelors: { duration: "4 years", intake: "Sept · some Jan/May", tuition: "C$20k–38k / yr", work: "PGWP: up to 3 yrs", note: "Affordable tuition and one of the clearest routes to permanent residency." },
      masters: { duration: "1–2 years", intake: "Sept · some Jan", tuition: "C$18k–35k / yr", work: "PGWP: up to 3 yrs", note: "Co-op options and a direct PR pathway via Express Entry." } },
  };
  let fdDest = "uk", fdLevel = "bachelors";
  const finderResult = document.getElementById("finderResult");

  function renderFinder() {
    const d = finderData[fdDest][fdLevel];
    const cname = finderData[fdDest].name;
    const levelLabel = fdLevel === "bachelors" ? "Bachelor's" : "Master's";
    finderResult.innerHTML =
      '<div class="fr__top"><h3>' + cname + ' — ' + levelLabel + '</h3><span class="fr__sub">Indicative guidance</span></div>' +
      '<div class="fr__grid">' +
        '<div class="fr__cell"><div class="k">Duration</div><div class="v">' + d.duration + '</div></div>' +
        '<div class="fr__cell"><div class="k">Intake</div><div class="v">' + d.intake + '</div></div>' +
        '<div class="fr__cell"><div class="k">Tuition (indicative)</div><div class="v">' + d.tuition + '</div></div>' +
        '<div class="fr__cell"><div class="k">Post-study work</div><div class="v">' + d.work + '</div></div>' +
      '</div>' +
      '<p class="fr__note"><span></span>' + d.note + '</p>' +
      '<a href="#contact" class="btn btn--primary fr__cta" data-dest="' + cname + '" data-level="' + levelLabel + '">Get a free assessment for ' + cname + ' &rarr;</a>';
  }
  function bindSeg(id, setter) {
    const seg = document.getElementById(id);
    if (!seg) return;
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      [...seg.children].forEach((c) => c.classList.remove("is-active"));
      b.classList.add("is-active");
      setter(b.dataset.val);
      renderFinder();
    });
  }
  if (finderResult) {
    bindSeg("segDest", (v) => (fdDest = v));
    bindSeg("segLevel", (v) => (fdLevel = v));
    renderFinder();
    // Finder CTA pre-fills the assessment form
    finderResult.addEventListener("click", (e) => {
      const cta = e.target.closest(".fr__cta");
      if (!cta) return;
      const destSel = document.getElementById("af-dest");
      const lvlSel = document.getElementById("af-level");
      if (destSel) { [...destSel.options].forEach((o) => { if (o.value === cta.dataset.dest) destSel.value = o.value; }); }
      if (lvlSel) { [...lvlSel.options].forEach((o) => { if (o.value === cta.dataset.level) lvlSel.value = o.value; }); }
    });
  }

  /* ---------- Assessment form ---------- */
  const aForm = document.getElementById("assessForm");
  if (aForm) {
    aForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const checks = [
        ["af-name", (v) => v.trim().length > 1],
        ["af-phone", (v) => v.replace(/\D/g, "").length >= 7],
        ["af-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
      ];
      let ok = true;
      checks.forEach(([id, test]) => {
        const el = document.getElementById(id);
        if (!test(el.value)) { el.classList.add("invalid"); ok = false; }
        else { el.classList.remove("invalid"); }
      });
      if (!ok) { const bad = aForm.querySelector(".invalid"); if (bad) bad.focus(); return; }
      const errEl = document.getElementById("assessError");
      if (errEl) errEl.hidden = true;
      const btn = aForm.querySelector(".assess__submit");
      const label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(aForm.getAttribute("action") || "lead-submit.php", {
        method: "POST",
        body: new FormData(aForm),
        headers: { Accept: "application/json" },
      })
        .then((r) => r.json().catch(() => ({ ok: r.ok })))
        .then((data) => {
          if (!data || !data.ok) throw new Error("save failed");
          aForm.hidden = true;
          const done = document.getElementById("assessSuccess");
          done.hidden = false;
          done.scrollIntoView({ block: "center", behavior: "smooth" });
        })
        .catch(() => {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          if (errEl) errEl.hidden = false;
        });
    });
    aForm.addEventListener("input", (e) => {
      if (e.target.classList.contains("invalid") && e.target.value.trim()) e.target.classList.remove("invalid");
    });
  }
})();
