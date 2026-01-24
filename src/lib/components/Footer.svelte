<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<div class="site-footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>Kable Launcher</h3>
      <p>The modern, fast launcher for your favorite game: Minecraft!</p>
    </div>

    <div class="footer-section">
      <h4>Quick Links</h4>
      <nav class="footer-nav">
        <a href="/">Home</a>
        <a href="/releases">Releases</a>
        <a href="/wiki">Documentation</a>
        <a href="/faq">FAQ</a>
        <a href="/about">About</a>
      </nav>
    </div>

    <div class="footer-section">
      <h4>Community</h4>
      <nav class="footer-nav">
        <a
          href="https://github.com/LuckyLuuk12/kable"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-github"></i>
          GitHub
        </a>
        <a
          href="https://github.com/LuckyLuuk12/kable/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report Issue
        </a>
        <a
          href="https://github.com/LuckyLuuk12/kable/security/advisories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report Vulnerability
        </a>
        <a
          href="https://discord.gg/qRTevFvHbx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-discord"></i>
          Discord
        </a>
      </nav>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; {currentYear} Luuk Kablan. All rights reserved.</p>
  </div>
</div>

<style>
  .site-footer {
    background: var(--container, #1a1a1a);
    border-top: 1px solid var(--dark-600);
    position: relative;
    margin-top: auto;
    z-index: 100;
    opacity: 1;
    visibility: visible;
  }

  .site-footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.3),
      transparent
    );
    z-index: 1;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    position: relative;
    z-index: 2;
  }

  .footer-section h3 {
    font-size: var(--font-size-large);
    font-weight: 800;
    margin: 0 0 0.75rem 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .footer-section h4 {
    font-size: var(--font-size);
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: var(--text);
  }

  .footer-section p {
    margin: 0;
    color: var(--placeholder);
    font-size: var(--font-size-small);
    line-height: 1.6;
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-nav a {
    color: var(--placeholder);
    text-decoration: none;
    font-size: var(--font-size-small);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
  }

  .footer-nav a:hover {
    color: var(--primary-500);
    transform: translateX(4px);
  }

  .footer-bottom {
    border-top: 1px solid var(--dark-600);
    padding: 1.5rem 2rem;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .footer-bottom p {
    margin: 0;
    color: var(--placeholder);
    font-size: var(--font-size-small);
  }

  @media (max-width: 768px) {
    .footer-content {
      /* grid-template-columns: 1fr; */
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem 1.5rem 1.5rem;
      gap: 2rem 6rem;
    }

    .footer-section:first-child {
      text-align: center;
      width: 100%;
    }
  }
</style>
