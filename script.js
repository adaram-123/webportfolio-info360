/* =====================================================================
   DESIGN CASE STUDY — interactions
   ===================================================================== */
   (function () {
    "use strict";
   
    const nav      = document.getElementById("nav");
    const burger   = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");
    const progress = document.getElementById("progress");
    const links    = Array.from(navLinks.querySelectorAll("a"));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
   
    /* ---------- mobile menu ---------- */
    function setMenu(open) {
      navLinks.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    }
    burger.addEventListener("click", () =>
      setMenu(!navLinks.classList.contains("open"))
    );
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") setMenu(false);
    });
   
    /* ---------- scroll: nav state + progress bar ---------- */
    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 12);
   
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
   
    /* ---------- scroll-spy: highlight active link ---------- */
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
   
    /* ---------- reveal-on-scroll ---------- */
    const revealer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));
  })();