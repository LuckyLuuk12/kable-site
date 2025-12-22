<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    showAds?: boolean;
  }

  let { children, showAds = true }: Props = $props();

  onMount(() => {
    if (showAds && browser && (window as any).adsbygoogle) {
      try {
        const adElements = document.querySelectorAll(".adsbygoogle");
        adElements.forEach((ad) => {
          if (!(ad as any).dataset.adsbygoogleStatus) {
            (window as any).adsbygoogle.push({});
          }
        });
      } catch (e) {
        // ignore
      }
    }
  });
</script>

<!-- Moving gradient background -->
<div class="bg-gradient"></div>
<div class="bg-orbs">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
</div>

<div class="page-root">
  {#if showAds}
    <!-- Ad Sidebar (right side) - inside page-root for proper height calculation -->
    <aside class="ad-sidebar">
      {#each Array(8) as _, i}
        <div class="ad-unit">
          <!-- KableVertical -->
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-8329850616808451"
            data-ad-slot="3777214661"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      {/each}
    </aside>
  {/if}

  <main class="main-content">
    {@render children()}
  </main>
</div>

<style>
  :global(body) {
    background: #0d0d0d;
    color: #e4e4e7;
  }

  .bg-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: -2;
    background: repeating-linear-gradient(
        90deg,
        rgba(20, 20, 20, 0.3) 0px,
        rgba(15, 15, 15, 0.5) 1px,
        rgba(18, 18, 18, 0.4) 2px,
        rgba(20, 20, 20, 0.3) 80px
      ),
      #0d0d0d;
  }

  .bg-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 800px 600px at 20% 10%,
        rgba(139, 92, 246, 0.15),
        transparent
      ),
      radial-gradient(
        ellipse 600px 800px at 80% 90%,
        rgba(236, 72, 153, 0.1),
        transparent
      ),
      radial-gradient(
        ellipse 1000px 400px at 50% 50%,
        rgba(139, 92, 246, 0.05),
        transparent
      );
  }

  .bg-orbs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.4;
    animation: float 30s ease-in-out infinite;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.4),
      transparent 70%
    );
    top: -200px;
    right: 10%;
  }

  .orb-2 {
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(236, 72, 153, 0.3),
      transparent 70%
    );
    bottom: -250px;
    left: 5%;
    animation-delay: -10s;
  }

  .orb-3 {
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(168, 85, 247, 0.25),
      transparent 70%
    );
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -20s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(30px, -30px);
    }
    66% {
      transform: translate(-30px, 20px);
    }
  }

  .page-root {
    position: relative;
    min-height: 100vh;
    display: flex;
  }

  .main-content {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .ad-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 2rem 1rem;
    z-index: 10;
    pointer-events: none;
  }

  .ad-unit {
    flex: 1;
    min-height: 250px;
    max-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  @media (max-width: 1280px) {
    .ad-sidebar {
      display: none;
    }

    .main-content {
      width: 100%;
    }
  }
</style>
