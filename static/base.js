/* ============================================================
   BASE.JS — Shared Layout Injector
   Injects:
   - Grid Canvas
   - Navbar
   - Footer

   Works correctly in:
   - Localhost
   - GitHub Pages production
   - Nested blog/project pages
   ============================================================ */

(function () {

  /* ─────────────────────────────────────────────
     ROOT PATH HANDLER
     Local:
       http://127.0.0.1:5500/projects.html

     Production:
       https://yourusername.github.io/portfolio/projects.html

     Replace "/portfolio/" with your repo name.
     ───────────────────────────────────────────── */
  function root() {
    const isLocal =
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost";

    return isLocal ? "/" : "/portfolio/";
  }

  const R = root();

  /* ─────────────────────────────────────────────
     GRID BACKGROUND CANVAS
     ───────────────────────────────────────────── */
  const canvas = document.createElement("canvas");

  canvas.id = "grid-canvas";

  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  `;

  document.body.insertBefore(canvas, document.body.firstChild);

  /* ─────────────────────────────────────────────
     NAVBAR
     ───────────────────────────────────────────── */
  const nav = document.createElement("nav");

  nav.className = "nav";

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

  document.body.insertBefore(nav, document.body.firstChild);

  /* ─────────────────────────────────────────────
     FOOTER
     ───────────────────────────────────────────── */
  const footer = document.createElement("footer");

  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer-inner">

      <div class="footer-top">

        <div>
          <div class="footer-logo">
            Ashwini<span>.</span>
          </div>

          <div class="footer-tagline">
            Building the future with AI — one model at a time.
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

            <a href="https://github.com/ashwinibhardwaj" target="_blank">
              GitHub
            </a>

            <a href="https://www.linkedin.com/in/ashwini-bhardwaj/" target="_blank">
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
          © 2026 Ashwini Bhardwaj. Crafted with curiosity.
        </span>

        <div class="footer-socials">

          <!-- GitHub -->
          <a
            href="https://github.com/ashwinibhardwaj"
            target="_blank"
            title="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7.8 2 1.2.3-.7.8-1.2 1.4-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.4 1.1-3.2-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.2 1.1a10.8 10.8 0 0 1 5.8 0c2.3-1.4 3.2-1.1 3.2-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.9 1.1 3.2 0 4.4-2.7 5.4-5.3 5.7.8.7 1.5 2 1.5 4v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
            </svg>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://www.linkedin.com/in/ashwini-bhardwaj/"
            target="_blank"
            title="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 5 3.87 6.1 2.5 6.1S0 5 0 3.5 1.1.9 2.5.9s2.48 1.1 2.48 2.6zM.3 8h4.4v14H.3V8zm7.6 0h4.2v2h.1c.6-1.1 2.1-2.2 4.2-2.2 4.5 0 5.3 3 5.3 6.8V22h-4.4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V22H7.9V8z"/>
            </svg>
          </a>

        </div>
      </div>

    </div>
  `;

  document.body.appendChild(footer);

})();