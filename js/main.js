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
    ".manifesto__text, .firm__media, .firm__body, .method__head, .method__row, .dest__head, .dest__card, .outcomes__head, .board__row, .stat, .cta__inner"
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
  const counters = document.querySelectorAll("[data-count]");
  const countObs = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
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
      obs.unobserve(el);
    }),
    { threshold: 0.5 }
  );
  counters.forEach((c) => countObs.observe(c));
})();
