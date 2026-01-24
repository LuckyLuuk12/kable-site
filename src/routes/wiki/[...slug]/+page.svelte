<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";
  import {
    wikiContent,
    findNodeByPath,
    type WikiNode,
    type WikiContentBlock,
  } from "$lib/wiki/content";

  let slugArr: string[] = [];
  $: slugArr = $page.params?.slug ? $page.params.slug.split("/") : [];

  let node: WikiNode | null = null;
  $: node = findNodeByPath(slugArr) || wikiContent[0] || null;

  function makeId(segment: string) {
    return ["wiki", ...slugArr, segment].filter(Boolean).join("-");
  }

  async function copyAnchor(id: string) {
    const url = new URL(location.href);
    url.hash = id;
    try {
      await navigator.clipboard.writeText(url.toString());
    } catch (e) {
      // Silently fail if clipboard access denied
    }
  }

  // Flatten wiki structure into linear sequence for prev/next navigation
  type FlatNode = { path: string[]; title: string; id: string };

  function flattenWiki(
    nodes: WikiNode[],
    parentPath: string[] = [],
  ): FlatNode[] {
    const result: FlatNode[] = [];
    for (const node of nodes) {
      const currentPath = [...parentPath, node.id];
      result.push({ path: currentPath, title: node.title, id: node.id });
      if (node.children) {
        result.push(...flattenWiki(node.children, currentPath));
      }
    }
    return result;
  }

  let flatWiki: FlatNode[] = [];
  let currentIndex: number = -1;
  let prevNode: FlatNode | null = null;
  let nextNode: FlatNode | null = null;
  let visibleSectionId: string | null = null;
  let lastPathStr: string = "";

  $: {
    flatWiki = flattenWiki(wikiContent);
    const currentPathStr = slugArr.join("/");

    // Reset visibleSectionId when navigating to a new page
    if (currentPathStr !== lastPathStr) {
      visibleSectionId = null;
      lastPathStr = currentPathStr;
    }

    // If we have a visible section from scroll detection, use that
    if (visibleSectionId) {
      currentIndex = flatWiki.findIndex((n) => n.id === visibleSectionId);
    } else {
      // Otherwise use the URL path
      currentIndex = flatWiki.findIndex(
        (n) => n.path.join("/") === currentPathStr,
      );
    }

    prevNode = currentIndex > 0 ? flatWiki[currentIndex - 1] : null;
    nextNode =
      currentIndex >= 0 && currentIndex < flatWiki.length - 1
        ? flatWiki[currentIndex + 1]
        : null;
  }

  function getWikiUrl(path: string[]): string {
    return `/wiki/${path.join("/")}`;
  }

  // Scroll detection with Intersection Observer
  let observer: IntersectionObserver | null = null;
  let isInitialLoad = true;

  onMount(() => {
    // Delay initial observation to avoid triggering on page load
    setTimeout(() => {
      isInitialLoad = false;
    }, 500);

    // Create observer to detect which section is most visible
    observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during initial load to prevent auto-scroll
        if (isInitialLoad) return;

        // Find the entry with the highest intersection ratio
        let mostVisible = entries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio
            ? current
            : prev;
        });

        if (mostVisible.intersectionRatio > 0.15) {
          // Extract section ID from element ID
          const elementId = mostVisible.target.id;
          if (elementId) {
            // Find the matching section in flatWiki
            const parts = elementId.split("-");
            const sectionId = parts[parts.length - 1];

            // Check if this section exists in our flat structure
            const matchingSection = flatWiki.find((n) => n.id === sectionId);
            if (matchingSection) {
              visibleSectionId = sectionId;
            }
          }
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1.0],
        rootMargin: "-20% 0px -30% 0px", // Focus on upper-middle of viewport
      },
    );

    // Observe all sections and subsections
    const observeElements = () => {
      const sections = document.querySelectorAll(".subsection, .nested-item");
      sections.forEach((section) => {
        if (section.id && observer) {
          observer.observe(section);
        }
      });
    };

    // Initial observation with delay
    setTimeout(observeElements, 200);

    // Re-observe when content changes
    const mutationObserver = new MutationObserver(() => {
      // Debounce the re-observation to prevent excessive calls
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(observeElements, 200);
    });

    let mutationTimer: number;
    const articleElement = document.querySelector(".wiki-article");
    if (articleElement) {
      mutationObserver.observe(articleElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
      if (mutationTimer) clearTimeout(mutationTimer);
    };
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

{#if node}
  <div class="wiki-disclaimer">
    <div class="disclaimer-icon">
      <i class="fas fa-exclamation-triangle"></i>
    </div>
    <div class="disclaimer-content">
      <strong>Work in Progress:</strong> This wiki is severely lacking &
      possibly incorrect and still in development. The site is
      <a
        href="https://github.com/LuckyLuuk12/kable-site"
        target="_blank"
        rel="noopener noreferrer">open source</a
      > — assistance and pull requests are welcome!
    </div>
  </div>

  <article class="wiki-article">
    <div class="article-header">
      <div class="header-title">
        <h1>{node.title}</h1>
        <button
          class="anchor"
          on:click={() => copyAnchor(makeId("main"))}
          aria-label="Copy link"
          title="Copy link"><i class="fas fa-link"></i></button
        >
      </div>
      {#if node.description}
        <p class="lead">{node.description}</p>
      {/if}
    </div>

    <!-- Modern content blocks -->
    {#if node.content}
      {#each node.content as block, i}
        <div class="content-block" id={makeId(`c${i}`)}>
          {#if block.type === "paragraph"}
            <p>{@html block.content}</p>
          {:else if block.type === "list"}
            <ul class="wiki-list">
              {#each block.items as item}
                <li>{@html item}</li>
              {/each}
            </ul>
          {:else if block.type === "feature-list"}
            <div class="feature-list">
              {#each block.features as feature}
                <div class="feature-item">
                  <strong class="feature-name">{feature.name}</strong>
                  <span class="feature-desc">{@html feature.description}</span>
                </div>
              {/each}
            </div>
          {:else if block.type === "table"}
            <div class="table-wrapper">
              <table class="wiki-table">
                <thead>
                  <tr>
                    {#each block.headers as header}
                      <th>{header}</th>
                    {/each}
                  </tr>
                </thead>
                <tbody>
                  {#each block.rows as row}
                    <tr>
                      {#each row as cell}
                        <td>{@html cell}</td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else if block.type === "note"}
            <div class="note note-{block.noteType || 'info'}">
              <div class="note-icon">
                {#if block.noteType === "warning"}
                  <i class="fas fa-exclamation-triangle"></i>
                {:else if block.noteType === "tip"}
                  <i class="fas fa-lightbulb"></i>
                {:else}
                  <i class="fas fa-info-circle"></i>
                {/if}
              </div>
              <p>{@html block.content}</p>
            </div>
          {/if}
        </div>
      {/each}
    {/if}

    <!-- Legacy paragraphs support -->
    {#if node.paragraphs && !node.content}
      {#each node.paragraphs as para, i}
        <div class="content-block" id={makeId(`p${i}`)}>
          <p>{@html para}</p>
        </div>
      {/each}
    {/if}

    {#if node.children}
      <div class="subsections">
        {#each node.children as child}
          <div id={makeId(child.id)} class="subsection">
            <div class="section-header">
              <h2>{child.title}</h2>
              <button
                class="anchor"
                on:click={() => copyAnchor(makeId(child.id))}
                aria-label="Copy link"
                title="Copy link"><i class="fas fa-link"></i></button
              >
            </div>

            <!-- Modern content blocks -->
            {#if child.content}
              {#each child.content as block, j}
                <div class="content-block">
                  {#if block.type === "paragraph"}
                    <p>{@html block.content}</p>
                  {:else if block.type === "list"}
                    <ul class="wiki-list">
                      {#each block.items as item}
                        <li>{@html item}</li>
                      {/each}
                    </ul>
                  {:else if block.type === "feature-list"}
                    <div class="feature-list">
                      {#each block.features as feature}
                        <div class="feature-item">
                          <strong class="feature-name">{feature.name}</strong>
                          <span class="feature-desc"
                            >{@html feature.description}</span
                          >
                        </div>
                      {/each}
                    </div>
                  {:else if block.type === "table"}
                    <div class="table-wrapper">
                      <table class="wiki-table">
                        <thead>
                          <tr>
                            {#each block.headers as header}
                              <th>{header}</th>
                            {/each}
                          </tr>
                        </thead>
                        <tbody>
                          {#each block.rows as row}
                            <tr>
                              {#each row as cell}
                                <td>{@html cell}</td>
                              {/each}
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  {:else if block.type === "note"}
                    <div class="note note-{block.noteType || 'info'}">
                      <div class="note-icon">
                        {#if block.noteType === "warning"}
                          <i class="fas fa-exclamation-triangle"></i>
                        {:else if block.noteType === "tip"}
                          <i class="fas fa-lightbulb"></i>
                        {:else}
                          <i class="fas fa-info-circle"></i>
                        {/if}
                      </div>
                      <p>{@html block.content}</p>
                    </div>
                  {/if}
                </div>
              {/each}
            {/if}

            <!-- Legacy paragraphs -->
            {#if child.paragraphs && !child.content}
              {#each child.paragraphs as p}
                <p>{@html p}</p>
              {/each}
            {/if}

            {#if child.children}
              <div class="nested-children">
                {#each child.children as g}
                  <div class="nested-item">
                    <h3 id={makeId(g.id)}>
                      {g.title}
                      <button
                        class="anchor"
                        on:click={() => copyAnchor(makeId(g.id))}
                        aria-label="Copy link"
                        title="Copy link"><i class="fas fa-link"></i></button
                      >
                    </h3>

                    <!-- Modern content blocks -->
                    {#if g.content}
                      {#each g.content as block}
                        <div class="content-block">
                          {#if block.type === "paragraph"}
                            <p>{@html block.content}</p>
                          {:else if block.type === "list"}
                            <ul class="wiki-list">
                              {#each block.items as item}
                                <li>{@html item}</li>
                              {/each}
                            </ul>
                          {:else if block.type === "feature-list"}
                            <div class="feature-list">
                              {#each block.features as feature}
                                <div class="feature-item">
                                  <strong class="feature-name"
                                    >{feature.name}</strong
                                  >
                                  <span class="feature-desc"
                                    >{@html feature.description}</span
                                  >
                                </div>
                              {/each}
                            </div>
                          {:else if block.type === "table"}
                            <div class="table-wrapper">
                              <table class="wiki-table">
                                <thead>
                                  <tr>
                                    {#each block.headers as header}
                                      <th>{header}</th>
                                    {/each}
                                  </tr>
                                </thead>
                                <tbody>
                                  {#each block.rows as row}
                                    <tr>
                                      {#each row as cell}
                                        <td>{@html cell}</td>
                                      {/each}
                                    </tr>
                                  {/each}
                                </tbody>
                              </table>
                            </div>
                          {:else if block.type === "note"}
                            <div class="note note-{block.noteType || 'info'}">
                              <div class="note-icon">
                                {#if block.noteType === "warning"}
                                  <i class="fas fa-exclamation-triangle"></i>
                                {:else if block.noteType === "tip"}
                                  <i class="fas fa-lightbulb"></i>
                                {:else}
                                  <i class="fas fa-info-circle"></i>
                                {/if}
                              </div>
                              <p>{@html block.content}</p>
                            </div>
                          {/if}
                        </div>
                      {/each}
                    {/if}

                    <!-- Legacy paragraphs -->
                    {#if g.paragraphs && !g.content}
                      {#each g.paragraphs as gp}
                        <p>{@html gp}</p>
                      {/each}
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </article>

  <!-- Bottom Navigation Bar -->
  <nav class="wiki-nav-bottom">
    <div class="nav-container">
      {#if prevNode}
        <a href={getWikiUrl(prevNode.path)} class="nav-button nav-prev">
          <div class="nav-direction">
            <i class="fas fa-arrow-left"></i>
            <span>Previous</span>
          </div>
          <div class="nav-title">{prevNode.title}</div>
        </a>
      {:else}
        <div class="nav-button nav-disabled"></div>
      {/if}

      {#if nextNode}
        <a href={getWikiUrl(nextNode.path)} class="nav-button nav-next">
          <div class="nav-direction">
            <span>Next</span>
            <i class="fas fa-arrow-right"></i>
          </div>
          <div class="nav-title">{nextNode.title}</div>
        </a>
      {:else}
        <div class="nav-button nav-disabled"></div>
      {/if}
    </div>
  </nav>
{:else}
  <p>Section not found.</p>
{/if}

<style>
  /* Disclaimer Banner */
  .wiki-disclaimer {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.875rem 1.25rem;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgb(245, 158, 11);
    border-radius: 6px;
    margin: 1rem 1rem 1.5rem 1rem;
    backdrop-filter: blur(8px);
  }

  .disclaimer-icon {
    flex-shrink: 0;
    font-size: 1.25rem;
    color: rgb(245, 158, 11);
  }

  .disclaimer-content {
    line-height: 1.5;
    font-size: 0.95rem;
    color: var(--text);
  }

  .disclaimer-content strong {
    color: rgb(245, 158, 11);
  }

  .disclaimer-content a {
    color: var(--primary-400);
    text-decoration: underline;
    transition: color 0.2s;
  }

  .disclaimer-content a:hover {
    color: var(--primary-300);
  }

  /* Override default header styles from clean-ui */
  :global(.wiki-article),
  :global(.wiki-article h1),
  :global(.wiki-article h2),
  :global(.wiki-article h3) {
    background: transparent !important;
    text-shadow: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin-bottom: 1rem;
    border: none !important;
    color: var(--text);
  }

  .wiki-article {
    margin: 0.5rem 1.5rem;
    line-height: 1.7;
    padding-bottom: 5rem; /* Space for fixed bottom nav */
  }

  .article-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--dark-700);
    padding-bottom: 1rem;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .article-header h1 {
    font-family: unset;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .header-title h1 {
    margin-bottom: 0;
  }

  .lead {
    font-size: 1.2rem;
    color: var(--placeholder);
    line-height: 1.6;
  }

  .content-block {
    margin-bottom: 1.5rem;
  }

  .content-block p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }

  .subsections,
  .subsection {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--dark-800);
  }

  .subsection:last-child {
    border-bottom: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .section-header h2 {
    margin-bottom: 0;
  }

  .anchor {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--dark-600);
    padding: 0.2rem;
    opacity: 0;
    transition:
      opacity 0.2s,
      color 0.2s;
  }

  .section-header:hover .anchor,
  .nested-item h3:hover .anchor,
  .header-title:hover .anchor {
    opacity: 1;
  }

  .anchor:hover {
    color: var(--primary-500);
  }

  /* Wiki Lists */
  .wiki-list {
    list-style: none;
    padding-left: 0;
    margin: 1rem 0;
  }

  .wiki-list li {
    padding: 0.6rem 0 0.6rem 1.5rem;
    position: relative;
    line-height: 1.7;
    border-left: 2px solid var(--dark-700);
    margin-bottom: 0.5rem;
  }

  .wiki-list li::before {
    content: "▸";
    position: absolute;
    left: 0.5rem;
    color: var(--primary-500);
    font-weight: bold;
  }

  /* Feature Lists */
  .feature-list {
    display: grid;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .feature-item {
    background: var(--dark-800);
    border: 1px solid var(--dark-700);
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    gap: 0.5rem;
    transition: border-color 0.2s;
  }

  .feature-item:hover {
    border-color: var(--primary-500);
  }

  .feature-name {
    color: var(--primary-400);
    font-size: 1.05rem;
    display: block;
  }

  .feature-desc {
    color: var(--placeholder);
    line-height: 1.6;
    display: block;
  }

  /* Tables */
  .table-wrapper {
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 6px;
    border: 1px solid var(--dark-700);
  }

  .wiki-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--dark-800);
  }

  .wiki-table thead {
    background: var(--dark-700);
  }

  .wiki-table th {
    text-align: left;
    padding: 0.9rem 1rem;
    font-weight: 600;
    color: var(--primary-400);
    border-bottom: 2px solid var(--primary-500);
  }

  .wiki-table td {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--dark-700);
  }

  .wiki-table tbody tr:last-child td {
    border-bottom: none;
  }

  .wiki-table tbody tr:hover {
    background: var(--dark-750);
  }

  /* Type badges for settings tables */
  :global(.wiki-table .type-badge) {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    font-size: 0.875rem;
    font-family: "Consolas", "Monaco", "Courier New", monospace;
  }

  :global(.wiki-table .type-boolean) {
    background: rgba(16, 185, 129, 0.15);
    color: rgb(16, 185, 129);
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  :global(.wiki-table .type-string) {
    background: rgba(245, 158, 11, 0.15);
    color: rgb(245, 158, 11);
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  :global(.wiki-table .type-number) {
    background: rgba(59, 130, 246, 0.15);
    color: rgb(59, 130, 246);
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  :global(.wiki-table .type-enum) {
    background: rgba(168, 85, 247, 0.15);
    color: rgb(168, 85, 247);
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  :global(.wiki-table .type-array) {
    background: rgba(6, 182, 212, 0.15);
    color: rgb(6, 182, 212);
    border: 1px solid rgba(6, 182, 212, 0.3);
  }

  :global(.wiki-table .type-object) {
    background: rgba(236, 72, 153, 0.15);
    color: rgb(236, 72, 153);
    border: 1px solid rgba(236, 72, 153, 0.3);
  }

  :global(.wiki-table .type-union) {
    background: rgba(139, 92, 246, 0.15);
    color: rgb(139, 92, 246);
    border: 1px solid rgba(139, 92, 246, 0.3);
  }

  /* Notes/Callouts */
  .note {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 6px;
    margin: 1.5rem 0;
    border-left: 4px solid;
  }

  .note-info {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgb(59, 130, 246);
  }

  .note-warning {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgb(245, 158, 11);
  }

  .note-tip {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgb(16, 185, 129);
  }

  .note-icon {
    flex-shrink: 0;
    font-size: 1.2rem;
  }

  .note-info .note-icon {
    color: rgb(59, 130, 246);
  }

  .note-warning .note-icon {
    color: rgb(245, 158, 11);
  }

  .note-tip .note-icon {
    color: rgb(16, 185, 129);
  }

  .note p {
    margin: 0;
    line-height: 1.6;
  }

  /* Nested Children */
  .nested-children {
    margin-left: 1.5rem;
    margin-top: 1.5rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--dark-700);
  }

  .nested-item {
    margin-bottom: 2rem;
  }

  .nested-item:last-child {
    margin-bottom: 0;
  }

  .nested-item h3 {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  /* Bottom Navigation */
  .wiki-nav-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 600;
    background: var(--dark-800);
    border-top: 2px solid var(--primary-500);
    backdrop-filter: blur(12px);
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.3);
  }

  .nav-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 0.5rem 1.25rem;
  }

  .nav-button {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.425rem 0.675rem;
    border-radius: 6px;
    background: var(--dark-700);
    border: 1px solid var(--dark-600);
    transition: all 0.2s ease;
    text-decoration: none;
    color: var(--text);
  }

  .nav-button:not(.nav-disabled):hover {
    background: var(--dark-600);
    border-color: var(--primary-500);
    transform: translateY(-2px);
  }

  .nav-disabled {
    opacity: 0;
    pointer-events: none;
  }

  .nav-prev {
    align-items: flex-start;
  }

  .nav-next {
    align-items: flex-end;
  }

  .nav-direction {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--primary-400);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-title {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
  }

  .nav-prev .nav-title {
    text-align: left;
  }

  .nav-next .nav-title {
    text-align: right;
  }

  @media (max-width: 768px) {
    .nav-container {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .nav-button {
      padding: 0.625rem;
    }

    .nav-prev,
    .nav-next {
      align-items: flex-start;
    }

    .nav-next .nav-title {
      text-align: left;
    }

    .wiki-article {
      padding-bottom: 8rem; /* More space on mobile for taller nav */
    }
  }
</style>
