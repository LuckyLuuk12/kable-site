<script lang="ts">
  import type { Picture } from "vite-imagetools";

  let {
    title,
    description,
    listItems = [],
    image,
    imageGrid = [],
    reverse = false,
  }: {
    title: string;
    description: string;
    listItems?: string[];
    image?: { src: Picture; alt: string };
    imageGrid?: Array<{ src: Picture; alt: string }>;
    reverse?: boolean;
  } = $props();
</script>

<section class="full-feature">
  <div class="feature-split" class:reverse>
    <div class="feature-text">
      <h2>{title}</h2>
      <p>{description}</p>
      {#if listItems.length > 0}
        <ul class="feature-list">
          {#each listItems as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </div>

    {#if imageGrid.length > 0}
      <div class="feature-image-grid">
        {#each imageGrid as img, i}
          <enhanced:img
            {...img}
            class={i === 0 ? "grid-image-main" : "grid-image-secondary"}
          />
        {/each}
      </div>
    {:else if image}
      <div class="feature-image-container">
        <enhanced:img {...image} class="feature-image" />
      </div>
    {/if}
  </div>
</section>

<style>
  .full-feature {
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
    border-bottom: 1px solid rgba(113, 113, 122, 0.2);
  }

  .feature-split {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .feature-split.reverse {
    grid-template-columns: 1.2fr 1fr;
  }

  .feature-text h2 {
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

  .feature-text p {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0 0 var(--large) 0;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--small);
  }

  .feature-list li {
    position: relative;
    padding-left: 2rem;
    color: var(--text);
    line-height: 1.6;
    font-size: var(--font-size-normal);
  }

  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  .feature-image-container {
    position: relative;
  }

  .feature-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.15),
      0 20px 60px -15px rgba(0, 0, 0, 0.4),
      0 10px 30px -10px rgba(139, 92, 246, 0.15);
  }

  .feature-image-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--normal);
  }

  .grid-image-main,
  .grid-image-secondary {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 12px 40px -12px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1024px) {
    .feature-split,
    .feature-split.reverse {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
</style>
