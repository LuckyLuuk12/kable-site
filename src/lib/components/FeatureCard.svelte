<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  interface Props {
    icon: string;
    title: string;
    description: string;
  }

  let { icon, title, description }: Props = $props();

  let element: HTMLElement | undefined;

  $effect(() => {
    if (browser && element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element?.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(element);

      return () => observer.disconnect();
    }
  });
</script>

<div class="feature-card" bind:this={element}>
  <div class="feature-icon">{icon}</div>
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .feature-card {
    padding: var(--large);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-large);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.05),
      0 8px 16px -4px rgba(0, 0, 0, 0.3),
      0 4px 8px -2px rgba(0, 0, 0, 0.2);
  }

  .feature-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.4),
      rgba(236, 72, 153, 0.3)
    );
    border-radius: var(--border-radius-large);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .feature-card::after {
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
    transition: opacity 0.3s ease;
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-card:hover::after {
    opacity: 1;
  }

  .feature-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-card:hover {
    transform: translateY(-6px);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.2),
      0 16px 32px -8px rgba(0, 0, 0, 0.4),
      0 8px 16px -4px rgba(139, 92, 246, 0.2);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: var(--normal);
    position: relative;
    z-index: 1;
  }

  .feature-card h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--small) 0;
    color: var(--text);
    position: relative;
    z-index: 1;
    letter-spacing: -0.01em;
  }

  .feature-card p {
    margin: 0;
    color: var(--placeholder);
    line-height: 1.6;
    font-size: var(--font-size-normal);
    position: relative;
    z-index: 1;
  }
</style>
