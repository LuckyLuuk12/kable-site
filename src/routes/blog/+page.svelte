<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Technical Articles - Kable Launcher</title>
  <meta
    name="description"
    content="In-depth technical articles about Minecraft launcher architecture, performance, and developer workflows."
  />
</svelte:head>

<PageLayout>
  <div class="blog-index">
    <header>
      <h1>Technical Articles</h1>
      <p class="subtitle">
        Deep dives into launcher architecture, performance optimization, and
        developer-focused design decisions.
      </p>
    </header>

    <div class="articles-grid">
      <article class="article-card">
        <h2>
          <a href="/blog/launcher-performance"
            >Why Minecraft Launchers Feel Slow Even on Good PCs</a
          >
        </h2>
        <p class="excerpt">
          A deep dive into launcher architecture and why most Minecraft
          launchers have poor startup performance. Learn about the JVM startup
          tax, native alternatives, and architectural trade-offs.
        </p>
        <div class="meta">
          <span class="tag">Performance</span>
          <span class="tag">Architecture</span>
        </div>
      </article>

      <article class="article-card">
        <h2>
          <a href="/blog/developer-workflows"
            >Why Mod Developers Need Different Launcher UX</a
          >
        </h2>
        <p class="excerpt">
          How typical Minecraft launcher design fails developers and what a
          developer-focused launcher should do instead. Covers hot-reload
          detection, IDE integration, and multi-version testing workflows.
        </p>
        <div class="meta">
          <span class="tag">Developer Experience</span>
          <span class="tag">Workflow</span>
        </div>
      </article>

      <article class="article-card">
        <h2>
          <a href="/blog/tauri-architecture"
            >Why Kable Uses Tauri Instead of Electron or Java</a
          >
        </h2>
        <p class="excerpt">
          Technical explanation of Kable's architecture decision and the
          trade-offs between launcher frameworks. Compare Java/Qt, Electron, and
          Tauri approaches to building desktop applications.
        </p>
        <div class="meta">
          <span class="tag">Architecture</span>
          <span class="tag">Tauri</span>
        </div>
      </article>
    </div>

    <div class="related-links">
      <h2>Looking for Launcher Comparisons?</h2>
      <div class="links-grid">
        <a href="/compare/prism-launcher" class="comparison-link">
          <h3>Kable vs Prism Launcher</h3>
          <p>Detailed comparison for Fabric mod developers</p>
        </a>
        <a href="/compare/multimc" class="comparison-link">
          <h3>Kable vs MultiMC</h3>
          <p>Which launcher for mod development?</p>
        </a>
        <a href="/compare/official" class="comparison-link">
          <h3>Kable vs Official Launcher</h3>
          <p>Why developers choose third-party launchers</p>
        </a>
      </div>
    </div>
  </div>
</PageLayout>

<style>
  .blog-index {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  header {
    text-align: center;
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(139, 92, 246, 0.2);
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--placeholder);
    max-width: 700px;
    margin: 0 auto;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .article-card {
    background: rgba(139, 92, 246, 0.05);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: var(--border-radius);
    padding: 2rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .article-card:hover {
    border-color: rgba(139, 92, 246, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px -8px rgba(139, 92, 246, 0.3);
  }

  .article-card h2 {
    margin-bottom: 1rem;
  }

  .article-card h2 a {
    color: var(--text);
    text-decoration: none;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .article-card h2 a:hover {
    color: var(--primary-400);
  }

  .excerpt {
    color: var(--placeholder);
    font-size: 1.0625rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background: rgba(139, 92, 246, 0.15);
    color: var(--primary-400);
    border-radius: var(--border-radius-small);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .related-links {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }

  .related-links h2 {
    font-size: 2rem;
    color: var(--text);
    margin-bottom: 2rem;
    text-align: center;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .comparison-link {
    display: block;
    padding: 1.5rem;
    background: rgba(139, 92, 246, 0.05);
    border: 1px solid rgba(139, 92, 246, 0.1);
    border-radius: var(--border-radius);
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .comparison-link:hover {
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  .comparison-link h3 {
    color: var(--primary-400);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .comparison-link p {
    color: var(--placeholder);
    font-size: 0.9375rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.125rem;
    }

    .articles-grid {
      grid-template-columns: 1fr;
    }

    .links-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
