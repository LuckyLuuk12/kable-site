<script lang="ts">
  import type { Release } from "$lib";
  import { browser } from "$app/environment";
  import { detectPlatform, labelFor } from "$lib";

  import homeImage from "$lib/assets/home.png?enhanced";
  import manageModsImage from "$lib/assets/manage-mods.png?enhanced";
  import searchModsImage from "$lib/assets/search-mods.png?enhanced";
  import settingsImage from "$lib/assets/settings.png?enhanced";
  import logsImage from "$lib/assets/logs.png?enhanced";

  interface Props {
    release: Release | null;
    loading?: boolean;
    error?: boolean;
  }

  let { release = null, loading = false, error = false }: Props = $props();

  interface Tab {
    id: string;
    label: string;
    image: any;
    description: string;
  }

  const tabs: Tab[] = [
    {
      id: "launch",
      label: "Launch",
      image: homeImage,
      description:
        "One-click access to all your Minecraft versions with a beautiful, intuitive interface",
    },
    {
      id: "manage",
      label: "Manage Mods",
      image: manageModsImage,
      description:
        "Effortlessly install, update, and organize your favorite mods with automatic dependency resolution",
    },
    {
      id: "discover",
      label: "Discover",
      image: searchModsImage,
      description:
        "Browse thousands of mods with powerful search, filtering, and one-click installation",
    },
    {
      id: "customize",
      label: "Customize",
      image: settingsImage,
      description:
        "Fine-tune every aspect from Java memory allocation to custom JVM arguments",
    },
    {
      id: "monitor",
      label: "Monitor",
      image: logsImage,
      description:
        "Real-time log streaming with search, filtering, and error highlighting for easy troubleshooting",
    },
  ];

  let activeTab = $state("launch");
  let scrollY = $state(0);
  let downloadUrl = $state<string | null>(null);
  const detectedPlatformKey = detectPlatform();
  const platformLabel = labelFor(detectedPlatformKey);

  $effect(() => {
    downloadUrl = release?.platforms?.[detectedPlatformKey]?.url ?? null;
  });

  $effect(() => {
    if (browser) {
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  // Calculate parallax and fade effects
  const heroTransform = $derived(`translateY(${scrollY * 0.5}px)`);
  const heroOpacity = $derived(Math.max(0, 1 - scrollY / 600));
  // Cap scaling at 1.1 (stops at scrollY = 500)
  const scale = $derived(Math.min(1.1, 1 + scrollY * 0.0003));
  // Stop preview movement at scrollY 300 to keep it overlapped with tabs
  const cappedScrollY = $derived(Math.min(scrollY, 300));
  const previewTransform = $derived(
    `translateY(${cappedScrollY * -0.15}px) scale(${scale})`,
  );
</script>

<div class="hero">
  <div class="hero-background">
    <div
      class="cloud cloud-left"
      style="transform: translateX({-scrollY * 0.3}px) translateY({scrollY *
        0.2}px) scale({Math.max(0.5, 1 - scrollY * 0.001)});"
    ></div>
    <div
      class="cloud cloud-right"
      style="transform: translateX({scrollY * 0.3}px) translateY({scrollY *
        0.2}px) scale({Math.max(0.5, 1 - scrollY * 0.001)});"
    ></div>
  </div>

  <div
    class="hero-content"
    style="transform: {heroTransform}; opacity: {heroOpacity};"
  >
    <div class="announcement-badge">
      <span class="sparkle">✨</span>
      <span>Explore the latest features and updates</span>
    </div>

    <h1 class="hero-title">
      Launch Minecraft the
      <span class="emphasis"> advanced way</span>
    </h1>

    <p class="hero-subtitle">
      The modern, open-source launcher with powerful mod management,
      cross-platform support, and a beautiful interface.
    </p>

    <div class="hero-actions">
      {#if downloadUrl}
        <a href={downloadUrl} class="btn-primary" rel="noopener noreferrer">
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          <span>Download for {platformLabel}</span>
        </a>
      {:else}
        <a href="/wiki" class="btn-primary">
          <span>Get Started</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.5 3L13.5 8L8.5 13M13 8H3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      {/if}
      <a href="/wiki" class="btn-secondary"> Learn More </a>
    </div>
  </div>

  <div class="preview-section" style="transform: {previewTransform};">
    <div class="preview-container">
      {#each tabs as tab}
        {#if activeTab === tab.id}
          <div class="preview-content">
            <enhanced:img
              src={tab.image}
              alt="{tab.label} view"
              class="preview-image"
            />
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<!-- Full-width tabs container outside hero -->
<section class="tabs-wrapper">
  <div class="preview-tabs">
    {#each tabs as tab}
      <button
        class="tab"
        class:active={activeTab === tab.id}
        onclick={() => (activeTab = tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div class="preview-description-wrapper">
    <p class="preview-description">
      {tabs.find((t) => t.id === activeTab)?.description}
    </p>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8rem 0 0;
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .hero-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .cloud {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.7;
    will-change: transform;
    transition: transform 0.1s linear;
  }

  .cloud-left {
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.3),
      transparent 70%
    );
    top: 10%;
    left: -200px;
  }

  .cloud-right {
    width: 700px;
    height: 700px;
    background: radial-gradient(
      circle,
      rgba(236, 72, 153, 0.25),
      transparent 70%
    );
    top: 5%;
    right: -250px;
  }

  .hero-content {
    max-width: 1000px;
    text-align: center;
    position: relative;
    z-index: 1;
    will-change: transform, opacity;
    margin-bottom: 4rem;
    padding: 0 2rem;
  }

  .announcement-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--container);
    border: 1px solid var(--border);
    border-radius: 9999px;
    font-size: var(--font-size-small);
    color: var(--placeholder);
    margin-bottom: 2rem;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .announcement-badge:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background: rgba(39, 39, 42, 0.8);
  }

  .sparkle {
    font-size: 1rem;
    animation: sparkle 2s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }

  .hero-title {
    font-size: clamp(2.75rem, 8vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    color: var(--text);
    letter-spacing: -0.03em;
    width: 100%;
  }

  .emphasis {
    font-style: italic;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
  }

  .hero-subtitle {
    font-size: clamp(1.0625rem, 2.5vw, 1.375rem);
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0 0 2.5rem 0;
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    display: flex;
    gap: var(--normal);
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    color: white;
    text-decoration: none;
    font-size: var(--font-size-normal);
    font-weight: 600;
    border-radius: var(--border-radius-normal);
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.4),
      0 8px 20px -4px rgba(139, 92, 246, 0.4),
      0 4px 10px -2px rgba(0, 0, 0, 0.3);
  }

  .btn-primary svg {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary:hover svg {
    transform: translateX(3px);
  }

  .btn-primary::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: var(--border-radius-normal);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-primary:hover::before {
    opacity: 1;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.5),
      0 12px 28px -6px rgba(139, 92, 246, 0.5),
      0 8px 16px -4px rgba(0, 0, 0, 0.4);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    text-decoration: none;
    font-size: var(--font-size-normal);
    font-weight: 600;
    border-radius: var(--border-radius-normal);
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .btn-secondary:hover {
    background: var(--container);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  .preview-section {
    max-width: 1200px;
    max-height: 600px;
    width: 100%;
    position: relative;
    z-index: 2;
    will-change: transform;
    padding: 0 2rem 4rem;
  }

  .tabs-wrapper {
    width: 100vw;
    position: relative;
    margin-top: -8rem;
    z-index: 3;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
    border-bottom: 1px solid rgba(113, 113, 122, 0.2);
  }

  .preview-tabs {
    display: flex;
    justify-content: center;
    gap: var(--small);
    padding: 1.5rem 2rem;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    flex-wrap: wrap;
    position: relative;
  }

  .preview-description-wrapper {
    padding: 1.5rem 2rem;
  }

  .tab {
    padding: 0.625rem 1.25rem;
    background: transparent;
    border: 1px solid transparent;
    color: var(--placeholder);
    font-size: var(--font-size-small);
    font-weight: 600;
    border-radius: var(--border-radius-normal);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .tab:hover {
    color: var(--text);
    background: rgba(39, 39, 42, 0.6);
  }

  .tab.active {
    color: var(--text);
    background: rgba(39, 39, 42, 0.9);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.2);
  }

  .preview-container {
    background: var(--card);
    border: 1px solid var(--secondary-900);
    border-radius: var(--border-radius-large);
    padding: 1rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 20px 60px -15px rgba(0, 0, 0, 0.5),
      0 10px 30px -10px rgba(139, 92, 246, 0.15);
    position: relative;
    overflow: hidden;
  }

  .preview-container::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.2),
      rgba(236, 72, 153, 0.15)
    );
    border-radius: var(--border-radius-large);
    opacity: 0.45;
    z-index: -1;
    pointer-events: none;
  }

  .preview-content {
    position: relative;
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .preview-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-normal);
    display: block;
    box-shadow: 0 4px 12px -3px rgba(0, 0, 0, 0.3);
  }

  .preview-description {
    text-align: center;
    font-size: var(--font-size-normal);
    color: var(--placeholder);
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 6rem 0 4rem;
      min-height: 100vh;
    }

    .hero-content {
      margin-bottom: 3rem;
    }

    .announcement-badge {
      font-size: 0.8125rem;
      padding: 0.4rem 0.875rem;
    }

    .hero-title {
      margin-bottom: 1.25rem;
    }

    .hero-subtitle {
      margin-bottom: 2rem;
    }

    .hero-actions {
      flex-direction: column;
      width: 100%;
      gap: var(--small);
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      justify-content: center;
    }

    .preview-tabs {
      gap: 0.5rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.8125rem;
    }

    .preview-container {
      padding: 0.75rem;
    }

    .cloud-left,
    .cloud-right {
      filter: blur(60px);
    }
  }
</style>
