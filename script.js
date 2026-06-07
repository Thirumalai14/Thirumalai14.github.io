/* ============================================================
   Thirumalai V — Portfolio interactions
   - Terminal typing effect for `whoami` output
   - IntersectionObserver reveal-on-scroll
   - Mobile nav toggle
   - Auto-update copyright year (if footer year is present)
   ============================================================ */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     Theming: handled by pure CSS via @media (prefers-color-scheme).
     No JS needed — auto-matches the user's OS.
  ----------------------------------------------------------- */

  /* Keep the browser chrome color (mobile) in sync with the system. */
  if (window.matchMedia) {
    var mql = window.matchMedia("(prefers-color-scheme: light)");
    var setMeta = function (isLight) {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", isLight ? "#faf9fc" : "#0e0a1a");
    };
    setMeta(mql.matches);
    var onChange = function (e) {
      setMeta(e.matches);
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else if (mql.addListener) mql.addListener(onChange);
  }

  /* -----------------------------------------------------------
     1) Terminal typing effect
        Uses textContent only — no innerHTML for user/dynamic
        content, to avoid any XSS surface.
  ----------------------------------------------------------- */
  const typedEl = document.getElementById("typed");

  if (typedEl) {
    const lines = [
      "Thirumalai V — DevOps & Cloud Automation Engineer @ Cisco Systems"
    ];
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = lines[lineIndex];

      if (!deleting) {
        charIndex += 1;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          // Pause at end, then either delete (if multiple lines) or stop
          if (lines.length === 1) {
            return; // Single line — leave it typed out
          }
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 40 + Math.random() * 30);
      } else {
        charIndex -= 1;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
        setTimeout(tick, 25);
      }
    }

    // Slight delay before typing starts for a nicer entrance
    setTimeout(tick, 350);
  }

  /* -----------------------------------------------------------
     2) Reveal-on-scroll for .reveal sections
  ----------------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: just show everything
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* -----------------------------------------------------------
     3) Mobile nav toggle
  ----------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function closeNav() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close nav after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* -----------------------------------------------------------
     4) Smooth scroll offset for sticky nav (in-page anchors)
        Native CSS smooth-scroll already enabled; this adds an
        offset for the sticky header.
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector(".nav")
        ? document.querySelector(".nav").offsetHeight
        : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
