/* ── DATA LOADER ── */
async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Failed to load " + path);
  return res.json();
}

/* ── RESOLVE DATA PATH ── */
function dataPath(file) {
  const depth = window.location.pathname.split("/").filter(Boolean).length;
  const prefix = depth <= 1 ? "" : "../".repeat(depth - 1);
  return prefix + "data/" + file;
}

/* ── SCROLL ANIMATIONS ── */
function initFadeObserver() {
  const fades = document.querySelectorAll(".fade");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
      else e.target.classList.remove("visible");
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  fades.forEach(el => observer.observe(el));
}

/* ── SKILL BARS ── */
function initSkillBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector(".skill-bar-fill");
        if (fill) {
          fill.style.width = fill.dataset.width;
          e.target._animated = true;
        }
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".skill-card").forEach(card => barObserver.observe(card));
}

/* ── NAV ACTIVE LINK ── */
function initNavActive() {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    const resolved = new URL(href, window.location.href).pathname;

    if (resolved === currentPath ||
      (resolved !== "/" && resolved !== "/index.html" && currentPath.startsWith(resolved)))
      link.classList.add("active");

    if ((href === "/" || href === "/index.html" || href === "index.html") &&
      (currentPath === "/" || currentPath.endsWith("/index.html")))
      link.classList.add("active");
  });
}

/* ── HAMBURGER ── */
function initHamburger() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const bars = toggle.querySelectorAll("span");
      const isOpen = navLinks.classList.contains("open");

      bars[0].style.transform = isOpen ? "translateY(7px) rotate(45deg)" : "";
      bars[1].style.opacity   = isOpen ? "0" : "1";
      bars[2].style.transform = isOpen ? "translateY(-7px) rotate(-45deg)" : "";
    });

    navLinks.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.querySelectorAll("span").forEach(s => {
          s.style.transform = "";
          s.style.opacity   = "1";
        });
      })
    );
  }
}

/* ── PROJECT FILTERS ── */
function initProjectFilters() {
  function filterProjects(tag) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === tag);
    });

    document.querySelectorAll(".project-card[data-tags]").forEach(card => {
      const tags = card.dataset.tags || "";
      const show = tag === "all" || tags.toLowerCase().includes(tag.toLowerCase());
      card.style.display = show ? "" : "none";
    });
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => filterProjects(btn.dataset.filter));
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", () => {
      const btn  = form.querySelector("button[type=submit]");
      const orig = btn.innerHTML;

      btn.textContent = "Sending…";
      btn.disabled    = true;

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled  = false;
      }, 3000);
    });
  }
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ── 🎬 CINEMATIC TITLE ── */
function initCinematicTitle() {
  const el = document.querySelector(".cinematic-title");
  if (!el) return;

  el.style.transform = "scale(0.92)";
  el.style.opacity   = "0";

  let start = null;

  function animateReveal(t) {
    if (!start) start = t;
    const progress = Math.min((t - start) / 2600, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);

    el.style.transform = `scale(${0.92 + ease * 0.08})`;
    el.style.opacity   = ease;

    if (progress < 1) requestAnimationFrame(animateReveal);
  }

  requestAnimationFrame(animateReveal);
}

function initFog() {
  const canvas = document.getElementById("fog");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let W = 0, H = 0;
  let fog = [];
  let scrollY = 0;
  let smoothScroll = 0;
  let rafId;
  let running = true;

  let introStart = performance.now();
  let revealForce = 0;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const isMobile = () => window.innerWidth <= 640;

  /* ── resize ── */
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ── improved layers (slightly richer) ── */
  function buildLayers() {
    const mobile = isMobile();
    const scale = clamp((W * H) / (1440 * 900), 0.7, 1.4);

    return [
      { count: (mobile ? 20 : 38) * scale, size: 260, speed: 0.08, alpha: 0.018, depth: 0.12 },
      { count: (mobile ? 18 : 32) * scale, size: 170, speed: 0.16, alpha: 0.028, depth: 0.28 },
      { count: (mobile ? 14 : 26) * scale, size: 110, speed: 0.28, alpha: 0.045, depth: 0.45 },
    ];
  }

  function createParticle(layer) {
    const angle = Math.random() * Math.PI * 2;

    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: layer.size + Math.random() * 80,
      vx: Math.cos(angle) * layer.speed,
      vy: Math.sin(angle) * layer.speed * 0.6,
      alpha: layer.alpha * (0.7 + Math.random() * 0.6),
      depth: layer.depth,
      phase: Math.random() * Math.PI * 2,
      seed: Math.random() * 1000 // 👈 texture variation
    };
  }

  function rebuildFog() {
    fog = [];
    const layers = buildLayers();

    layers.forEach(layer => {
      const count = Math.round(layer.count);
      for (let i = 0; i < count; i++) {
        fog.push(createParticle(layer));
      }
    });
  }

  /* ── intro ── */
  function updateRevealForce(t) {
    const elapsed = t - introStart;
    const p = clamp(elapsed / 1800, 0, 1);
    revealForce = p * p * (3 - 2 * p);
  }

  /* ── draw ── */
  function draw(t) {
    if (!running) return;

    updateRevealForce(t);
    smoothScroll += (scrollY - smoothScroll) * 0.08;

    ctx.clearRect(0, 0, W, H);

    const centerX = W / 2;
    const centerY = H / 2;
    const revealRadius = isMobile() ? 180 : 340;

    for (const p of fog) {
      /* ── natural drift ── */
      p.phase += 0.003;
      const drift = Math.sin(p.phase) * 0.4;

      p.x += p.vx + 0.02;
      p.y += p.vy + drift;

      /* ── wrapping ── */
      const m = p.r + 50;
      if (p.x < -m) p.x = W + m;
      if (p.x > W + m) p.x = -m;
      if (p.y < -m) p.y = H + m;
      if (p.y > H + m) p.y = -m;

      const py = p.y + smoothScroll * p.depth;

      let alpha = p.alpha;

      /* ── center breathing ── */
      const dx = p.x - centerX;
      const dy = py - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < revealRadius && dist > 0) {
        const f = 1 - dist / revealRadius;
        const push = f * f * revealForce;

        p.x += (dx / dist) * push * 10;
        p.y += (dy / dist) * push * 8;

        alpha *= 1 - f * 0.6 * revealForce;
      }

      /* ── TEXTURE MAGIC (important) ── */
      const noise = Math.sin(p.seed + t * 0.0007 + p.phase) * 0.5 + 0.5;

      alpha *= 0.85 + noise * 0.3;
      alpha = clamp(alpha, 0, 0.18);

      const drawY = clamp(py, -p.r, H + p.r);

      /* ── multi-stop gradient = soft textured fog ── */
      const g = ctx.createRadialGradient(p.x, drawY, 0, p.x, drawY, p.r);

      g.addColorStop(0,   `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.25,`rgba(255,255,255,${alpha * 0.6})`);
      g.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.35})`);
      g.addColorStop(0.75,`rgba(255,255,255,${alpha * 0.15})`);
      g.addColorStop(1,   `rgba(255,255,255,0)`);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }

  function onResize() {
    resize();
    rebuildFog();
  }

  function onScroll() {
    scrollY = window.scrollY;
  }

  resize();
  rebuildFog();

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  rafId = requestAnimationFrame(draw);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    }
  };
}

/* ── GLOBAL INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  initFadeObserver();
  initSkillBars();
  initNavActive();
  initHamburger();
  initProjectFilters();
  initContactForm();
  initSmoothScroll();
  initCinematicTitle();
  initFog();
});