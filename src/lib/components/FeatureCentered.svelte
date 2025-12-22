<script lang="ts">
  import type { Picture } from "vite-imagetools";

  let { image }: { image: { src: Picture; alt: string } } = $props();
</script>

<section class="full-feature">
  <div class="feature-content-centered">
    <enhanced:img {...image} class="feature-image-large" />
  </div>
</section>

<style>
  .full-feature {
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
    border-bottom: 1px solid rgba(113, 113, 122, 0.2);
  }

  .feature-content-centered {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
  }

  .feature-image-large {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 20px 60px -15px rgba(0, 0, 0, 0.5),
      0 10px 30px -10px rgba(139, 92, 246, 0.2);
  }
</style>
