<script lang="ts">
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
</script>

<section>
  <div class="feature-cards-section">
    <div class="feature-cards-container">
      {#each features as feature}
        <div class="feature-card">
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--huge);
  }

  .feature-card {
    padding: var(--huge);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-large);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
