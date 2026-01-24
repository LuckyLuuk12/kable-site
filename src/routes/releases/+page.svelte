<script lang="ts">
  import { onMount } from "svelte";
  import PageLayout from "$lib/components/PageLayout.svelte";
  import { fetchReleases, labelFor, type Release } from "$lib";
  import { marked } from "marked";

  let releases: Release[] = $state([]);
  let selectedRelease: Release | null = $state(null);
  let loading = $state(true);
  let error = $state(false);

  // Load showNightlies preference from localStorage, default to false
  let showNightlies = $state(
    typeof window !== "undefined"
      ? localStorage.getItem("showNightlies") === "true"
      : false,
  );

  // Filter releases based on nightly toggle
  let filteredReleases = $derived(
    showNightlies
      ? releases
      : releases.filter(
          (r) =>
            !r.name.toLowerCase().includes("nightly") &&
            !r.version.toLowerCase().includes("nightly"),
        ),
  );

  // Save preference to localStorage when it changes
  $effect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("showNightlies", String(showNightlies));
    }
  });

  onMount(async () => {
    try {
      releases = await fetchReleases();
      if (releases.length > 0) {
        // Default to latest non-nightly release if available
        const nonNightlies = releases.filter(
          (r) =>
            !r.name.toLowerCase().includes("nightly") &&
            !r.version.toLowerCase().includes("nightly"),
        );
        selectedRelease =
          nonNightlies.length > 0 ? nonNightlies[0] : releases[0];
      }
      loading = false;
    } catch (e) {
      error = true;
      loading = false;
    }
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Configure marked to return string synchronously
  marked.setOptions({
    async: false,
    breaks: true,
    gfm: true,
  });

  function renderMarkdown(markdown: string): string {
    return marked.parse(markdown) as string;
  }
</script>

<PageLayout showAds={false}>
  <div class="builds-page">
    {#if loading}
      <div class="loading-state">
        <div class="spinner"></div>
        <span>Loading releases...</span>
      </div>
    {:else if error}
      <div class="error-state">
        <p>Failed to load release information.</p>
        <a
          href="https://github.com/LuckyLuuk12/kable/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="link-button"
        >
          View Releases on GitHub
        </a>
      </div>
    {:else if releases.length > 0}
      <div class="builds-container">
        <!-- Sidebar with version list -->
        <aside class="versions-sidebar">
          <div class="sidebar-header">
            <h2>Versions</h2>
            <label class="nightly-toggle">
              <input type="checkbox" bind:checked={showNightlies} />
              <span>Show nightlies</span>
            </label>
          </div>
          <nav class="versions-nav">
            {#each filteredReleases as release}
              <button
                class="version-item"
                class:active={selectedRelease?.version === release.version}
                onclick={() => (selectedRelease = release)}
              >
                <span class="version-number">{release.name}</span>
                <span class="version-date"
                  >{formatDate(release.publishedAt)}</span
                >
              </button>
            {/each}
          </nav>
        </aside>

        <!-- Main content area -->
        <main class="release-content">
          {#if selectedRelease}
            <div class="release-header">
              <div class="release-title">
                <h2>{selectedRelease.name}</h2>
                <span class="release-date"
                  >{formatDate(selectedRelease.publishedAt)}</span
                >
              </div>
              <a
                href={selectedRelease.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="github-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                View on GitHub
              </a>
            </div>

            <!-- Download section -->
            <section class="download-section">
              <h3>Downloads</h3>
              <div class="platform-grid">
                {#each Object.entries(selectedRelease.platforms) as [key, info]}
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="platform-card"
                  >
                    <div class="platform-info">
                      <h4>{labelFor(key)}</h4>
                      <p class="file-name">{info.filename}</p>
                      <p class="file-size">
                        {(info.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <i class="download-icon fas fa-download"></i>
                  </a>
                {/each}
              </div>
            </section>

            <!-- Installation notes -->
            <section class="info-section">
              <h3>Installation Notes</h3>
              <ul class="install-list">
                <li>
                  <strong>Windows:</strong> Download the .msi or .exe installer and
                  run it
                </li>
                <li>
                  <strong>macOS:</strong> Download the .dmg file, open it, and drag
                  to Applications
                </li>
                <li>
                  <strong>Linux:</strong> Download the .AppImage (make it executable
                  with chmod +x) or .deb package
                </li>
              </ul>
            </section>

            <!-- Release notes -->
            {#if selectedRelease.body}
              <section class="release-notes">
                <h3>Release Notes</h3>
                <div class="markdown-content">
                  {@html renderMarkdown(selectedRelease.body)}
                </div>
              </section>
            {/if}
          {/if}
        </main>
      </div>
    {/if}
  </div>
</PageLayout>

<style>
  .builds-page {
    padding: 6rem 2rem 4rem;
    min-height: 100%;
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

  .builds-container {
    min-height: 100%;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    align-items: start;
  }

  /* Sidebar Styles */
  .versions-sidebar {
    position: sticky;
    top: 6rem;
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--large);
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
  }

  .versions-sidebar h2 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0;
    color: var(--text);
  }

  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--medium);
    margin-bottom: var(--large);
  }

  .nightly-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--placeholder);
    cursor: pointer;
    user-select: none;
  }

  .nightly-toggle input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--primary-500);
  }

  .nightly-toggle:hover {
    color: var(--text);
  }

  .versions-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .version-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--medium) var(--large);
    background: var(--card);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .version-item:hover {
    border-color: var(--primary-500);
    background: var(--dark-700);
  }

  .version-item.active {
    border-color: var(--primary-500);
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.1),
      rgba(236, 72, 153, 0.1)
    );
  }

  .version-number {
    font-size: var(--font-size);
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .version-date {
    font-size: var(--font-size-small);
    color: var(--placeholder);
  }

  /* Main Content Styles */
  .release-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 100%;
  }

  .release-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 0.25rem;
  }

  .release-title {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
  }

  .release-title h2 {
    font-size: var(--font-size-huge);
    font-weight: 800;
    margin: 0;
    color: var(--text);
  }

  .release-date {
    font-size: var(--font-size);
    color: var(--placeholder);
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--card);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius);
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .github-link:hover {
    border-color: var(--primary-500);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  }

  /* Download Section */
  .download-section,
  .info-section,
  .release-notes {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--large);
    flex: 1;
  }

  .download-section h3,
  .info-section h3,
  .release-notes h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
    color: var(--primary-500);
  }

  /* Installation Notes */
  .install-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--medium);
  }

  .install-list li {
    color: var(--placeholder);
    font-size: var(--font-size-small);
    line-height: 1.5;
    padding-left: 2rem;
    position: relative;
  }

  .install-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  /* Release Notes Markdown Rendering */
  .markdown-content {
    color: var(--placeholder);
    font-size: var(--font-size-small);
    line-height: 1.8;
  }

  .markdown-content :global(h1),
  .markdown-content :global(h2),
  .markdown-content :global(h3),
  .markdown-content :global(h4) {
    color: var(--text);
    font-weight: 700;
    margin: 1.5rem 0 1rem;
  }

  .markdown-content :global(h1) {
    font-size: var(--font-size-huge);
  }

  .markdown-content :global(h2) {
    font-size: var(--font-size-large);
    border-bottom: 1px solid var(--dark-600);
    padding-bottom: 0.5rem;
  }

  .markdown-content :global(h3) {
    font-size: var(--font-size);
  }

  .markdown-content :global(p) {
    margin: 1rem 0;
  }

  .markdown-content :global(ul),
  .markdown-content :global(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .markdown-content :global(li) {
    margin: 0.5rem 0;
  }

  .markdown-content :global(code) {
    background: var(--card);
    padding: 0.2rem 0.4rem;
    border-radius: var(--border-radius-small);
    font-family: "Courier New", monospace;
    font-size: 0.9em;
  }

  .markdown-content :global(pre) {
    background: var(--card);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius);
    padding: var(--large);
    overflow-x: auto;
    margin: 1rem 0;
  }

  .markdown-content :global(pre code) {
    background: none;
    padding: 0;
  }

  .markdown-content :global(a) {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
  }

  .markdown-content :global(a:hover) {
    text-shadow: 0 0 20px var(--primary-500);
  }

  .markdown-content :global(blockquote) {
    border-left: 4px solid var(--primary-500);
    padding-left: var(--large);
    margin: 1rem 0;
    color: var(--placeholder);
    font-style: italic;
  }

  .markdown-content :global(img) {
    max-width: 100%;
    border-radius: var(--border-radius);
    margin: 1rem 0;
  }

  .markdown-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .markdown-content :global(th),
  .markdown-content :global(td) {
    padding: 0.75rem;
    border: 1px solid var(--dark-600);
    text-align: left;
  }

  .markdown-content :global(th) {
    background: var(--card);
    font-weight: 700;
    color: var(--text);
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

  /* Responsive Design */
  @media (max-width: 1024px) {
    .builds-container {
      grid-template-columns: 1fr;
    }

    .versions-sidebar {
      position: static;
      max-height: 300px;
    }
  }

  @media (max-width: 640px) {
    .builds-page {
      padding: 5rem 1rem 2rem;
    }

    .download-section,
    .info-section,
    .release-notes {
      padding: var(--large);
    }

    .platform-grid {
      grid-template-columns: 1fr;
    }

    .versions-sidebar {
      max-height: 250px;
    }
  }
</style>
