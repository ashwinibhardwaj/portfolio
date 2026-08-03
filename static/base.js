/* ============================================================
   BASE.JS
   Injects shared navbar + footer across pages
   Works on:
   - Localhost
   - GitHub Pages
   - Nested blog/project pages
============================================================ */

(function () {

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const REPO_NAME = "portfolio";

  /* ─────────────────────────────────────────────
     ROOT PATH DETECTOR
  ───────────────────────────────────────────── */
  function root() {

    const host = window.location.hostname;

    // LOCALHOST
    if (
      host === "127.0.0.1" ||
      host === "localhost"
    ) {

      const segs = window.location.pathname
        .split('/')
        .filter(Boolean);

      if (
        segs.length &&
        segs[segs.length - 1].includes('.')
      ) {
        segs.pop();
      }

      return '../'.repeat(segs.length);
    }

    // GITHUB PAGES
    return `/${REPO_NAME}/`;
  }

  const R = root();

  /* ─────────────────────────────────────────────
     GRID CANVAS
  ───────────────────────────────────────────── */
  const canvas = document.createElement('canvas');

  canvas.id = 'grid-canvas';

  canvas.style.cssText = `
    position:fixed;
    inset:0;
    width:100%;
    height:100%;
    z-index:-1;
    pointer-events:none;
  `;

  document.body.insertBefore(
    canvas,
    document.body.firstChild
  );

  /* ─────────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────────── */
  const nav = document.createElement('nav');

  nav.className = 'nav';

  nav.innerHTML = `
    <div class="nav-inner">

      <a href="${R}index.html" class="nav-logo">
        Ashwini<span>.</span>
      </a>

      <div class="nav-links">
        <a href="${R}index.html">Home</a>
        <a href="${R}projects.html">Projects</a>
        <a href="${R}blog.html">Blog</a>
        <a href="${R}about.html">About</a>

        <a href="${R}contact.html" class="nav-cta">
          Get in Touch
        </a>
      </div>

      <div class="nav-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  `;

  document.body.insertBefore(
    nav,
    document.body.firstChild
  );

  /* ─────────────────────────────────────────────
     FOOTER
  ───────────────────────────────────────────── */
  const footer = document.createElement('footer');

  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer-inner">

      <div class="footer-top">

        <div>
          <div class="footer-logo">
            Ashwini<span>.</span>
          </div>

          <div class="footer-tagline">
            Code • Learn • Build • Improve
          </div>
        </div>

        <div class="footer-links">

          <div class="footer-col">
            <h5>Navigation</h5>

            <a href="${R}index.html">Home</a>
            <a href="${R}projects.html">Projects</a>
            <a href="${R}blog.html">Blog</a>
            <a href="${R}about.html">About</a>
          </div>

          <div class="footer-col">
            <h5>Connect</h5>

            <a
              href="https://github.com/ashwinibhardwaj"
              target="_blank"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ashwini-bhardwaj/"
              target="_blank"
            >
              LinkedIn
            </a>

            <a href="${R}contact.html">
              Email Me
            </a>
          </div>

        </div>

      </div>

      <div class="footer-bottom">

        <span class="footer-copy">
          © 2026 Ashwini Bhardwaj.
          Crafted with curiosity.
        </span>

      </div>

    </div>
  `;

  document.body.appendChild(footer);

})();