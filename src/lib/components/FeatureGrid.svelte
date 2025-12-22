<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    title?: string;
    subtitle?: string;
  }

  let {
    children,
    title = "Features",
    subtitle = "Everything you need for the perfect Minecraft experience",
  }: Props = $props();
</script>

<div class="features-section">
  {#if title}
    <div class="section-header">
      <h2>{title}</h2>
      {#if subtitle}
        <p class="section-subtitle">{subtitle}</p>
      {/if}
    </div>
  {/if}
  <div class="features-grid">
    {@render children()}
  </div>
</div>

<style>
  .features-section {
    max-width: 1350px;
    margin: 0 auto;
    padding: 6rem 2rem;
    position: relative;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
  }

  .section-header h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin: 0 0 var(--normal) 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-subtitle {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    margin: 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--huge);
  }

  @media (max-width: 640px) {
    .features-section {
      padding: 2rem 1rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
