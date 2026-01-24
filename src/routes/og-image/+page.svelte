<script lang="ts">
  import { onMount } from "svelte";

  let ready = $state(false);

  onMount(() => {
    // Small delay to ensure fonts are loaded
    setTimeout(() => {
      ready = true;
    }, 100);
  });
</script>

<svelte:head>
  <title>OG Image Generator - Kable Launcher</title>
</svelte:head>

<div class="og-page">
  <div class="og-container" class:ready>
    <div class="og-content">
      <div class="logo-section">
        <div class="logo-text">KABLE</div>
        <div class="logo-subtitle">LAUNCHER</div>
      </div>

      <h1 class="main-headline">
        Best Minecraft Launcher<br />for Developers & Modders
      </h1>

      <div class="features">
        <div class="feature-item">
          <i class="fa-solid fa-terminal"></i>
          <span>Advanced Logging</span>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-cubes"></i>
          <span>Mod Management</span>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-layer-group"></i>
          <span>Instance Isolation</span>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-code-branch"></i>
          <span>Free & Open Source</span>
        </div>
      </div>

      <div class="bottom-text">kable.kablan.nl</div>
    </div>
  </div>

  {#if ready}
    <div class="instructions">
      <h2>📸 Screenshot Instructions</h2>
      <p>
        1. Use your screenshot tool to capture ONLY the purple box above<br />
        2. Save as "og-image.png"<br />
        3. Place in the <code>/static</code> folder<br />
        4. Dimensions: 1200×630px (already set)<br />
        5. Make sure to capture at 100% zoom for best quality
      </p>
    </div>
  {/if}
</div>

<style>
  :global(nav),
  :global(.footer-content),
  :global(.footer-bottom) {
    display: none !important;
  }

  .og-page {
    height: 100vh;
    background: #0b040f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 2rem;
    z-index: 10000;
  }

  .og-container {
    min-width: 1200px;
    max-width: 1200px;
    min-height: 630px;
    max-height: 630px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .og-container.ready {
    opacity: 1;
  }

  .og-container::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
  }

  .og-container::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
    border-radius: 50%;
  }

  .og-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 80px;
    color: white;
  }

  .logo-section {
    margin-bottom: 40px;
  }

  .logo-text {
    font-family: Minecraft, monospace;
    font-size: 72px;
    font-weight: bold;
    letter-spacing: 4px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .logo-subtitle {
    font-size: 24px;
    letter-spacing: 8px;
    opacity: 0.9;
    margin-top: -10px;
    font-weight: 600;
  }

  .main-headline {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.2;
    margin: 0 0 50px 0;
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  }

  .features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 40px;
    margin-bottom: 50px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 26px;
    font-weight: 600;
  }

  .feature-item i {
    font-size: 32px;
    opacity: 0.9;
  }

  .bottom-text {
    font-size: 28px;
    font-weight: 600;
    opacity: 0.8;
    letter-spacing: 1px;
  }

  .instructions {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    max-width: 800px;
    color: #d1d5db;
  }

  .instructions h2 {
    margin: 0 0 1rem 0;
    color: #fff;
  }

  .instructions p {
    margin: 0;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .instructions code {
    background: rgba(102, 126, 234, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    color: #a5b4fc;
  }

  @media (max-width: 1300px) {
    .og-container {
      transform: scale(0.8);
      transform-origin: center;
    }
  }
</style>
