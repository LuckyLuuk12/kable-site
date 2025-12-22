<script lang="ts">
  import type { Picture } from "vite-imagetools";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { getImageUrl } from "$lib";

  let {
    items,
  }: {
    items: Array<{
      title: string;
      description: string;
      details: string;
      image: { src: Picture; alt: string };
    }>;
  } = $props();

  let expandedIndex = $state(-1);
  let sectionRef: HTMLElement;
  let isVisible = $state(false);

  function toggleItem(index: number) {
    expandedIndex = expandedIndex === index ? -1 : index;
  }

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

<section class="full-feature" bind:this={sectionRef}>
  <div class="feature-list-layout" class:visible={isVisible}>
    <div class="feature-list-items">
      {#each items as item, i}
        <button
          class="feature-item"
          class:expanded={expandedIndex === i}
          onclick={() => toggleItem(i)}
          style="--item-index: {i};"
        >
          <div class="feature-item-header">
            <h3>{item.title}</h3>
            <div class="expand-icon">
              {expandedIndex === i ? "−" : "+"}
            </div>
          </div>
          {#if expandedIndex === i}
            <div class="feature-item-content">
              <p class="description">{item.description}</p>
              <p class="details">{item.details}</p>
            </div>
          {/if}
        </button>
      {/each}
    </div>
    <div
      class="feature-image-container"
      class:has-selection={expandedIndex >= 0}
    >
      <img
        src={getImageUrl(
          expandedIndex >= 0
            ? items[expandedIndex].image.src
            : items[0].image.src,
        )}
        alt={expandedIndex >= 0 ? items[expandedIndex].image.alt : ""}
        class="feature-image"
        class:visible={expandedIndex >= 0}
        loading="eager"
      />
    </div>
  </div>
</section>

<style>
  .full-feature {
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
    border-bottom: 1px solid rgba(113, 113, 122, 0.2);
  }

  .feature-list-layout {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: start;
  }

  .feature-list-items {
    display: flex;
    flex-direction: column;
    gap: 0;
    opacity: 0;
    transform: translateX(-40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feature-list-layout.visible .feature-list-items {
    opacity: 1;
    transform: translateX(0);
  }

  .feature-image-container {
    position: sticky;
    top: 2rem;
    min-height: 240px; /* reserve space so layout doesn't shift when images toggle */
    opacity: 0;
    transform: translateY(-40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
  }

  .feature-list-layout.visible .feature-image-container {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-item {
    width: 100%;
    background: transparent;
    border: none;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
    padding: var(--large);
    text-align: left;
    cursor: pointer;
    border-radius: 0 !important;
    opacity: 0;
    transform: translateX(-40px);
    transition:
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.2s ease,
      padding 0.2s ease;
    transition-delay: calc(var(--item-index, 0) * 0.15s);
  }

  .feature-list-layout.visible .feature-item {
    opacity: 1;
    transform: translateX(0);
  }

  .feature-item:last-child {
    border-bottom: 1px solid rgba(113, 113, 122, 0.2);
  }

  .feature-item:hover,
  .feature-item.expanded {
    background: var(--card);
    padding-left: var(--normal);
    padding-right: var(--normal);
  }

  .feature-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--normal);
  }

  .feature-item h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0;
    color: var(--text);
  }

  .expand-icon {
    font-size: 1.5rem;
    color: var(--placeholder);
    font-weight: 300;
    line-height: 1;
    transition: color 0.2s ease;
  }

  .feature-item.expanded .expand-icon {
    color: transparent;
  }

  .feature-item-content {
    margin-top: var(--normal);
    padding-right: 2rem;
  }

  .feature-item-content .description {
    font-size: var(--font-size-normal);
    color: var(--text);
    line-height: 1.6;
    margin: 0 0 var(--small) 0;
  }

  .feature-item-content .details {
    font-size: var(--font-size-normal);
    color: var(--placeholder);
    line-height: 1.6;
    margin: 0;
  }
  /* (duplicate .feature-image-container block removed to avoid overrides) */

  .feature-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.15),
      0 20px 60px -15px rgba(0, 0, 0, 0.4),
      0 10px 30px -10px rgba(139, 92, 246, 0.15);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-20px);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0s linear 0.6s;
  }

  .feature-image.visible {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0s;
  }

  @media (max-width: 1024px) {
    .feature-list-layout {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .feature-image-container {
      position: relative;
      top: 0;
    }
  }
</style>
