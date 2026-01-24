<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const features = [
    {
      icon: "🌐",
      title: "Cross-Platform",
      description:
        "Native support for Windows, macOS (Intel & Apple Silicon), and Linux distributions.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Optimized performance ensures quick launches and smooth gameplay every time.",
    },
    {
      icon: "🎨",
      title: "Beautiful UI",
      description:
        "Modern, clean interface with glassmorphism design and smooth animations.",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description:
        "Open source code you can trust. No telemetry, no tracking, just gaming.",
    },
    {
      icon: "🧩",
      title: "Mod Support",
      description:
        "Install and manage mods effortlessly with built-in mod management tools.",
    },
    {
      icon: "🔄",
      title: "Auto Updates",
      description:
        "Stay current with automatic updates and the latest Minecraft versions.",
    },
  ];

  let sectionRef: HTMLElement;
  let isVisible = $state(false);

  onMount(() => {
    if (browser && sectionRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
      );
      observer.observe(sectionRef);
      return () => observer.disconnect();
    }
  });
</script>

<section bind:this={sectionRef}>
  <div class="feature-cards-section" class:visible={isVisible}>
    <div class="feature-cards-container">
      {#each features as feature, i}
        <div class="feature-card" style="--card-index: {i};">
          <div class="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .feature-cards-section {
    padding: 4rem 2rem;
    max-width: 750px;
    margin: 0 auto;
  }

  .feature-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: var(--huge);
  }

  .feature-card {
    padding: var(--huge);
    min-width: 0;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-large);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: scale(0) rotateY(90deg);
    transition:
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: calc(var(--card-index, 0) * 0.1s);
    transform-origin: center center;
    perspective: 1000px;
    text-wrap: wrap;
  }

  .feature-cards-section.visible .feature-card {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }

  .feature-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.3),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.2),
      0 20px 40px -12px rgba(139, 92, 246, 0.3),
      0 8px 16px -4px rgba(0, 0, 0, 0.4);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: var(--normal);
  }

  .feature-card h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--small) 0;
    color: var(--text);
  }

  .feature-card p {
    font-size: var(--font-size-normal);
    color: var(--placeholder);
    line-height: 1.6;
    margin: 0;
  }
</style>
