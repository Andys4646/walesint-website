/* ===========================================================
   Wales International — interactions
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const nav = document.getElementById("nav");
  const openBtn = document.getElementById("navOpen");
  const closeBtn = document.getElementById("navClose");

  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const openNav = () => {
    nav.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.classList.add("nav-open");
  };
  const closeNav = () => {
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };
  openBtn.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
  backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- Active nav link on scroll ---------- */
  const links = [...document.querySelectorAll('.nav__link[href^="#"]')];
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = "#" + e.target.id;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Hero rotating sub-headline ---------- */
  const heroLines = [
    "British Council trained and certified education consultants assisting students since 2003.",
    "Expert guidance for personalized course selection to fuel your academic journey.",
    "Streamlined visa assistance ensures hassle-free travel for your convenience.",
  ];
  const heroSub = document.getElementById("heroSub");
  let hi = 0;
  setInterval(() => {
    hi = (hi + 1) % heroLines.length;
    heroSub.classList.add("is-fading");
    setTimeout(() => {
      heroSub.textContent = heroLines[hi];
      heroSub.classList.remove("is-fading");
    }, 400);
  }, 4500);

  /* ---------- Testimonials (real student placements) ---------- */
  const testimonials = [
    { name: "Abdullah Mudassar", program: "Bachelor's of Law", years: "2021 – 2025", img: "abdullah.jpg" },
    { name: "Muhammad Iqbal", program: "Master of Business Administration", years: "2024 – 2025", img: "Iqbal.jpg" },
    { name: "Firzoq Anjum", program: "Bachelor's of Aeronautical Engineering", years: "2020 – 2023", img: "firzoq.jpg" },
    { name: "Hamza Afzal", program: "Bachelor's of Electrical Engineering", years: "2021 – 2024", img: "hamza.jpg" },
    { name: "Fakhir Nasir", program: "Bachelor's of Law", years: "2024 – 2028", img: "fakhir.jpg" },
    { name: "Falah Uddin", program: "Bachelor's of Mechanical Engineering", years: "2022 – 2025", img: "falah.jpg" },
    { name: "Ayesha Saeed", program: "MSc Management", years: "2023 – 2024", img: "person-02.jpg" },
    { name: "Syed Kumail", program: "MSc Public Relations", years: "2020 – 2021", img: "person-01.jpg" },
    { name: "Syed M. Misbah Ul Hassan", program: "MSc Data Science", years: "2022 – 2023", img: "person-05.jpg" },
    { name: "Syed Wali Ul Hassan", program: "MSc Engineering Management", years: "2010 – 2011", img: "person-04.jpg" },
    { name: "Asad Waqas", program: "MSc Engineering Management", years: "2018 – 2019", img: "person-03.jpg" },
    { name: "Jahanzaib Thakar", program: "Bachelor's of Law", years: "2024 – 2027", img: "kha-img.jpg" },
    { name: "Mobeen Fatima", program: "MSc Computing & Information Systems", years: "2023 – 2024", img: "Untitled-2-1.jpg" },
  ];

  const track = document.getElementById("tTrack");
  track.innerHTML = testimonials
    .map(
      (t) => `
      <article class="t-card">
        <div class="t-card__quote">&ldquo;</div>
        <p class="t-card__text">Wales International guided me from application to admission — and helped me secure my place in
          <span class="t-card__program">${t.program}</span>.</p>
        <div class="t-card__person">
          <img src="assets/img/avatars/${t.img}" alt="${t.name}" loading="lazy" />
          <div>
            <div class="t-card__name">${t.name}</div>
            <div class="t-card__years">${t.program} · ${t.years}</div>
          </div>
        </div>
      </article>`
    )
    .join("");

  const prev = document.getElementById("tPrev");
  const next = document.getElementById("tNext");
  const step = () => {
    const card = track.querySelector(".t-card");
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

  /* Auto-advance (pause on hover) */
  let auto = setInterval(tick, 4000);
  function tick() {
    const maxScroll = track.scrollWidth - track.clientWidth - 4;
    if (track.scrollLeft >= maxScroll) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step(), behavior: "smooth" });
    }
  }
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(auto));
  carousel.addEventListener("mouseleave", () => (auto = setInterval(tick, 4000)));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(
    ".value-card, .service-card, .country-card, .about__media, .about__body, .section__head, .final-cta__card"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ---------- Footer year ---------- */
  // Keep ©2024 to match brand copy; update here if desired.
})();
