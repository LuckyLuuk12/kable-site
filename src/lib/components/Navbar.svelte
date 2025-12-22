<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import favicon from "$lib/assets/favicon.png?enhanced";

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  $effect(() => {
    if (browser) {
      const handleScroll = () => {
        scrolled = window.scrollY > 50;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<nav class="navbar" class:scrolled class:menu-open={mobileMenuOpen}>
  <div class="navbar-content">
    <a href="/" class="logo-section">
      <enhanced:img src={favicon} alt="Kable Launcher Logo" class="logo-img" />
      <span class="app-name" class:hide={scrolled}>Kable</span>
    </a>

    <button
      class="mobile-toggle"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label="Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" class:show={mobileMenuOpen}>
      <a href="/" class="nav-link" class:active={$page.url.pathname === "/"}
        >Home</a
      >
      <a
        href="/about"
        class="nav-link"
        class:active={$page.url.pathname.startsWith("/about")}>About</a
      >
      <a
        href="/releases"
        class="nav-link"
        class:active={$page.url.pathname.startsWith("/releases")}>Releases</a
      >
      <a
        href="/wiki"
        class="nav-link"
        class:active={$page.url.pathname.startsWith("/wiki")}>Wiki</a
      >
      <a
        href="https://github.com/LuckyLuuk12/kable"
        class="nav-link"
        target="_blank"
        rel="noopener">GitHub</a
      >
    </div>

    <a href="/wiki" class="install-btn">Get Started</a>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.25rem 2rem;
    background: transparent;
    border-bottom: 1px solid rgba(139, 92, 246, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar.scrolled {
    padding: 0.875rem 2rem;
    background: var(--container);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 4px 16px -4px rgba(0, 0, 0, 0.3),
      0 2px 8px -2px rgba(0, 0, 0, 0.2);
  }

  .navbar-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .logo-section:hover {
    opacity: 0.9;
  }

  .logo-img {
    width: 40px;
    height: 40px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scrolled .logo-img {
    width: 36px;
    height: 36px;
  }

  .app-name {
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .mobile-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
  }

  .mobile-toggle span {
    transition: all 0.3s ease;
  }

  .menu-open .mobile-toggle span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
  }

  .menu-open .mobile-toggle span:nth-child(2) {
    opacity: 0;
  }

  .menu-open .mobile-toggle span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    flex: 1;
    justify-content: center;
  }

  .nav-link {
    color: var(--placeholder);
    text-decoration: none;
    font-size: var(--font-size-normal);
    font-weight: 500;
    position: relative;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-link:hover {
    color: var(--text);
  }

  .nav-link.active {
    color: var(--text);
    font-weight: 600;
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--primary-500),
      var(--secondary-500)
    );
    border-radius: var(--border-radius-small);
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  }

  .install-btn {
    padding: 0.75rem 1.75rem;
    background: rgba(244, 244, 245, 0.95);
    color: #18181b;
    text-decoration: none;
    font-size: var(--font-size-normal);
    font-weight: 600;
    border-radius: var(--border-radius);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.2);
  }

  .install-btn:hover {
    background: #fafafa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 968px) {
    .mobile-toggle {
      display: flex;
    }

    .nav-links {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      flex-direction: column;
      background: rgba(10, 10, 10, 0.98);
      border-bottom: 1px solid rgba(139, 92, 246, 0.2);
      padding: 2rem;
      gap: 1.5rem;
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-links.show {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .nav-link {
      font-size: 1.1rem;
      width: 100%;
      text-align: center;
      padding: 1rem;
    }

    .install-btn {
      display: none;
    }

    .scrolled .app-name {
      opacity: 1;
      transform: translateX(0);
    }

    .app-name.hide {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 640px) {
    .navbar {
      padding: 1rem;
    }

    .app-name {
      font-size: 1.25rem;
    }
  }
</style>
