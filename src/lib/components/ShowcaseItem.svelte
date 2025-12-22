<script lang="ts">
  import { browser } from "$app/environment";

  interface Props {
    title: string;
    description: string;
    features: string[];
    image: any;
    imageAlt: string;
    reverse?: boolean;
  }

  let {
    title,
    description,
    features,
    image,
    imageAlt,
    reverse = false,
  }: Props = $props();

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

<div class="showcase-item floating-element" class:reverse bind:this={element}>
  <div class="showcase-content">
    <div class="showcase-text">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul class="feature-list">
        {#each features as feature}
          <li>{feature}</li>
        {/each}
      </ul>
    </div>
    <div class="showcase-image">
      <enhanced:img src={image} alt={imageAlt} loading="lazy" />
    </div>
  </div>
</div>

<style>
  .showcase-item {
    max-width: 1350px;
    margin: 0 auto 6rem auto;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .showcase-item:last-child {
    margin-bottom: 0;
  }

  .showcase-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .showcase-content {
    display: flex;
    gap: 4rem;
    align-items: center;
    padding: 0 2rem;
  }

  .showcase-item.reverse .showcase-content {
    flex-direction: row-reverse;
  }

  .showcase-item.reverse .showcase-text {
    text-align: right;
  }

  .showcase-text {
    flex: 1;
  }

  .showcase-text h3 {
    font-size: var(--font-size-huge);
    font-weight: 800;
    margin: 0 0 var(--large) 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .showcase-text p {
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
    gap: var(--normal);
  }

  .feature-list li {
    position: relative;
    padding-left: 2rem;
    color: var(--text);
    line-height: 1.6;
  }

  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  .showcase-image {
    flex: 1;
    max-width: 600px;
    position: relative;
  }

  .showcase-image::before {
    content: "";
    position: absolute;
    inset: -4px;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.4),
      rgba(236, 72, 153, 0.3)
    );
    border-radius: var(--border-radius-large);
    opacity: 0.6;
    z-index: -1;
    filter: blur(8px);
  }

  .showcase-image :global(img) {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.2),
      0 20px 60px -12px rgba(0, 0, 0, 0.5),
      0 8px 20px -6px rgba(0, 0, 0, 0.3);
    transform: perspective(1000px) rotateY(5deg);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .showcase-image :global(img):hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  .showcase-item.reverse .showcase-image :global(img) {
    transform: perspective(1000px) rotateY(-5deg);
  }

  .showcase-item.reverse .showcase-image :global(img):hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  .showcase-image:hover :global(img) {
    transform: perspective(1000px) rotateY(0deg);
  }

  @media (max-width: 1024px) {
    .showcase-content {
      flex-direction: column !important;
      gap: 2rem;
    }

    .showcase-item.reverse .showcase-text {
      text-align: left;
    }

    .showcase-image {
      max-width: 100%;
    }

    .showcase-image :global(img),
    .showcase-item.reverse .showcase-image :global(img) {
      transform: none !important;
    }
  }

  @media (max-width: 640px) {
    .showcase-item {
      margin-bottom: 4rem;
    }

    .showcase-content {
      padding: 0 1rem;
    }
  }
</style>
