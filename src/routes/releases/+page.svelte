<script lang="ts">
  import { onMount } from "svelte";
  import PageLayout from "$lib/components/PageLayout.svelte";
  import {
    fetchLatestRelease,
    labelFor,
    getPlatformIcon,
    type Release,
  } from "$lib";
  import "@kablan/clean-ui/css/index.css";

  let release: Release | null = $state(null);
  let loading = $state(true);
  let error = $state(false);

  onMount(async () => {
    try {
      release = await fetchLatestRelease();
      loading = false;
    } catch (e) {
      error = true;
      loading = false;
    }
  });
</script>

<PageLayout>
  <div class="releases-page">
    <section class="releases-hero">
      <h1>Releases</h1>
      <p class="tagline">Download the latest version of Kable Launcher</p>
    </section>

    {#if loading}
      <div class="loading-state">
        <div class="spinner"></div>
        <span>Loading release information...</span>
      </div>
    {:else if error}
      <div class="error-state">
        <p>Failed to load release information.</p>
        <a
          href="https://github.com/LuckyLuuk12/kable/releases"
          target="_blank"
          rel="noopener"
          class="link-button"
        >
          View Releases on GitHub
        </a>
      </div>
    {:else if release}
      <section class="latest-release">
        <div class="release-header">
          <h2>Latest Release</h2>
          <span class="version-badge">{release.version}</span>
        </div>

        <div class="download-matrix">
          <h3>Download for Your Platform</h3>
          <div class="platform-grid">
            {#each Object.entries(release.platforms) as [key, info]}
              <a
                href={info.url}
                target="_blank"
                rel="noopener"
                class="platform-card"
              >
                <div class="platform-icon">{getPlatformIcon(key)}</div>
                <div class="platform-info">
                  <h4>{labelFor(key)}</h4>
                  <p class="file-name">{info.filename}</p>
                  <p class="file-size">
                    {(info.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div class="download-icon">⬇️</div>
              </a>
            {/each}
          </div>
        </div>
      </section>

      <section class="release-info">
        <div class="info-card">
          <h3>Installation Notes</h3>
          <ul>
            <li>
              <strong>Windows:</strong> Download the .msi or .exe installer and run
              it
            </li>
            <li>
              <strong>macOS:</strong> Download the .dmg file, open it, and drag to
              Applications
            </li>
            <li>
              <strong>Linux:</strong> Download the .AppImage (make it executable
              with chmod +x) or .deb package
            </li>
          </ul>
        </div>

        <div class="info-card">
          <h3>What's New</h3>
          <p>
            Check the <a
              href="https://github.com/LuckyLuuk12/kable/releases"
              target="_blank"
              rel="noopener">GitHub releases page</a
            > for detailed changelogs and release notes.
          </p>
        </div>

        <div class="info-card">
          <h3>Previous Versions</h3>
          <p>
            Need an older version? View the complete
            <a
              href="https://github.com/LuckyLuuk12/kable/releases"
              target="_blank"
              rel="noopener">release history on GitHub</a
            >.
          </p>
        </div>
      </section>
    {/if}
  </div>
</PageLayout>

<style>
  .releases-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    min-height: 100vh;
  }

  .releases-hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .releases-hero h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    margin: 0 0 1rem 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    margin: 0;
  }

  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 4rem 2rem;
    color: var(--placeholder);
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--dark-600);
    border-top-color: var(--primary-500);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .latest-release {
    margin-bottom: 4rem;
  }

  .release-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .release-header h2 {
    font-size: var(--font-size-huge);
    font-weight: 800;
    margin: 0;
    color: var(--text);
  }

  .version-badge {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    color: var(--text);
    border-radius: var(--border-radius);
    font-weight: 700;
    font-size: var(--font-size-large);
  }

  .download-matrix {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--huge);
  }

  .download-matrix h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .platform-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: var(--large);
    background: var(--card);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text);
    transition: all 0.3s ease;
  }

  .platform-card:hover {
    border-color: var(--primary-500);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }

  .platform-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .platform-info {
    flex: 1;
    min-width: 0;
  }

  .platform-info h4 {
    font-size: var(--font-size);
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: var(--text);
  }

  .file-name {
    font-size: var(--font-size-small);
    color: var(--placeholder);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-size {
    font-size: var(--font-size-small);
    color: var(--primary-500);
    margin: 0.25rem 0 0 0;
    font-weight: 600;
  }

  .download-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .release-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .info-card {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--huge);
    transition: all 0.3s ease;
  }

  .info-card:hover {
    border-color: var(--primary-500);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .info-card h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .info-card p {
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0;
  }

  .info-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--large);
  }

  .info-card li {
    color: var(--placeholder);
    line-height: 1.6;
    padding-left: 2rem;
    position: relative;
  }

  .info-card li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  .info-card a {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .info-card a:hover {
    text-shadow: 0 0 20px var(--primary-500);
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    color: var(--text);
    text-decoration: none;
    border-radius: var(--border-radius);
    font-weight: 700;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  }

  .link-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 640px) {
    .releases-page {
      padding: 6rem 1rem 2rem;
    }

    .download-matrix,
    .info-card {
      padding: var(--large);
    }

    .platform-grid {
      grid-template-columns: 1fr;
    }

    .release-info {
      grid-template-columns: 1fr;
    }
  }
</style>
