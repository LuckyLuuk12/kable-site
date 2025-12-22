<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
  import "@kablan/clean-ui/css/index.css";
</script>

<PageLayout>
  <div class="about-page">
    <section class="about-hero">
      <h1>About Kable Launcher</h1>
      <p class="tagline">Built with passion for the Minecraft community</p>
    </section>

    <section class="about-content">
      <div class="content-card">
        <h2>The Project</h2>
        <p>
          Kable Launcher is a lightweight, cross-platform Minecraft launcher
          designed to make launching and managing your Minecraft experience
          effortless. Built with modern web technologies and a focus on user
          experience, Kable Launcher provides a clean, intuitive interface for
          all your Minecraft needs.
        </p>
        <p>
          Whether you're a casual player or a mod enthusiast, Kable Launcher
          streamlines the process of launching Minecraft, managing mods, and
          organizing your game profiles.
        </p>
      </div>

      <div class="content-card">
        <h2>The Creator</h2>
        <p>
          Kable Launcher is developed by <strong>Luuk Kablan</strong>, a
          passionate developer dedicated to creating tools that enhance the
          gaming experience for the Minecraft community.
        </p>
        <p>
          With a focus on clean code, user-friendly design, and reliable
          performance, Luuk continues to improve and expand Kable Launcher based
          on community feedback and modern best practices.
        </p>
      </div>

      <div class="content-card">
        <h2>Open Source</h2>
        <p>
          Kable Launcher is open source and available on GitHub. We welcome
          contributions, bug reports, and feature requests from the community.
        </p>
        <div class="links">
          <a
            href="https://github.com/LuckyLuuk12/kable"
            target="_blank"
            rel="noopener"
            class="link-button"
          >
            <span>📦</span>
            View Source Code
          </a>
          <a
            href="https://github.com/LuckyLuuk12/kable/issues"
            target="_blank"
            rel="noopener"
            class="link-button"
          >
            <span>🐛</span>
            Report an Issue
          </a>
          <a
            href="https://github.com/LuckyLuuk12/kable/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener"
            class="link-button"
          >
            <span>🤝</span>
            Contribute
          </a>
        </div>
      </div>

      <div class="content-card">
        <h2>Contact & Social</h2>
        <p>
          Have questions, suggestions, or just want to connect? Reach out
          through GitHub!
        </p>
        <div class="links">
          <a
            href="https://github.com/LuckyLuuk12"
            target="_blank"
            rel="noopener"
            class="link-button"
          >
            <span>👤</span>
            GitHub Profile
          </a>
        </div>
      </div>

      <div class="content-card tech-stack">
        <h2>Technology Stack</h2>
        <ul class="tech-list">
          <li>
            <strong>Framework:</strong> Built with Rust and modern web technologies
            for maximum performance
          </li>
          <li>
            <strong>Cross-Platform:</strong> Native support for Windows, macOS, and
            Linux
          </li>
          <li>
            <strong>UI/UX:</strong> Clean, intuitive interface designed for ease
            of use
          </li>
          <li>
            <strong>Updates:</strong> Regular updates with new features and bug fixes
          </li>
        </ul>
      </div>
    </section>
  </div>
</PageLayout>

<style>
  .about-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    min-height: 100vh;
  }

  .about-hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .about-hero h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    margin: 0 0 1rem 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    margin: 0;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .content-card {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--huge);
    transition: all 0.3s ease;
  }

  .content-card:hover {
    border-color: var(--primary-500);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .content-card h2 {
    font-size: var(--font-size-large);
    font-weight: 800;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .content-card p {
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0 0 var(--large) 0;
  }

  .content-card p:last-child {
    margin-bottom: 0;
  }

  .content-card strong {
    color: var(--text);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: var(--large);
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    color: var(--text);
    text-decoration: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  }

  .link-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 92, 246, 0.3);
  }

  .link-button span {
    font-size: 1.25rem;
  }

  .tech-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--large);
  }

  .tech-list li {
    color: var(--placeholder);
    line-height: 1.6;
    padding-left: 2rem;
    position: relative;
  }

  .tech-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  @media (max-width: 640px) {
    .about-page {
      padding: 6rem 1rem 2rem;
    }

    .content-card {
      padding: var(--large);
    }

    .links {
      flex-direction: column;
    }

    .link-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>
