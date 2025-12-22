<script lang="ts">
  import { wikiContent } from "$lib/wiki/content";
  import { page } from "$app/stores";
  import { derived } from "svelte/store";
  import { browser } from "$app/environment";

  const currentPath = derived(page, ($page) => {
    const parts = $page.url.pathname.replace(/^\/|\/$/g, "").split("/");
    const wikiIndex = parts.indexOf("wiki");
    if (wikiIndex === -1) return [];
    return parts.slice(wikiIndex + 1).filter(Boolean);
  });

  let collapsedMap: Record<string, boolean> = {};

  function toggle(id: string) {
    collapsedMap = { ...collapsedMap, [id]: !collapsedMap[id] };
  }

  // Sidebar State
  let isSidebarOpen = true;
  let sidebarWidth = 280;
  let isResizing = false;

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function startResize() {
    isResizing = true;
    if (browser) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
  }

  function resize(e: MouseEvent) {
    if (isResizing) {
      // Limit width between 200px and 600px
      sidebarWidth = Math.max(200, Math.min(e.clientX, 600));
    }
  }

  function stopResize() {
    isResizing = false;
    if (browser) {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
  }
</script>

<div class="wiki-shell">
  {#if isSidebarOpen}
    <aside class="wiki-sidebar" style="width: {sidebarWidth}px">
      <div class="sidebar-header">
        <!-- svelte-ignore a11y-consider-explicit-label -->
        <button
          class="collapse-btn"
          on:click={toggleSidebar}
          title="Collapse Sidebar"
        >
          <span class="sidebar-title">Contents</span>
          <i class="fas fa-angle-left"></i>
        </button>
      </div>
      <nav class="sidebar-nav">
        {#each wikiContent as node}
          <div class="nav-group">
            <div class="nav-header">
              <a
                class="nav-link"
                href={`/wiki/${node.id}`}
                class:selected={$currentPath && $currentPath[0] === node.id}
              >
                {node.title}
              </a>
              {#if node.children}
                <button
                  class="toggle-btn"
                  on:click={() => toggle(node.id)}
                  aria-label="toggle"
                  >{collapsedMap[node.id] ? "+" : "–"}</button
                >
              {/if}
            </div>

            {#if node.children && !collapsedMap[node.id]}
              <div class="nav-children">
                {#each node.children as child}
                  <a
                    class="nav-child"
                    href={`/wiki/${node.id}/${child.id}`}
                    class:selected={$currentPath &&
                      $currentPath[1] === child.id}>{child.title}</a
                  >
                  {#if child.children}
                    <div class="nav-grandchildren">
                      {#each child.children as g}
                        <a
                          class="nav-grandchild"
                          href={`/wiki/${node.id}/${child.id}/${g.id}`}
                          class:selected={$currentPath &&
                            $currentPath[2] === g.id}>{g.title}</a
                        >
                      {/each}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </nav>
    </aside>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="resizer" on:mousedown={startResize}></div>
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="collapsed-sidebar"
      on:click={toggleSidebar}
      title="Expand Sidebar"
    >
      <i class="fas fa-angle-right arrow"></i>
    </div>
  {/if}

  <main class="wiki-content">
    <slot />
  </main>
</div>

<style>
  .wiki-shell {
    display: flex;
    height: calc(100vh - 65px); /* Adjust based on navbar height */
    margin-top: 65px; /* Push down below fixed navbar */
    overflow: hidden;
    background: var(--dark-800);
  }

  /* Sidebar */
  .wiki-sidebar {
    height: 100%;
    overflow-y: auto;
    background: var(--dark-800);
    border-right: 1px solid var(--dark-700);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 0.5rem 1rem;
    border-bottom: 1px solid var(--dark-700);
    position: sticky;
    top: 0;
    background: var(--dark-800);
    z-index: 10;
  }

  .sidebar-title {
    font-weight: bold;
    color: var(--text);
    font-size: 0.9rem;
  }

  .collapse-btn {
    background: transparent;
    border: none;
    color: var(--placeholder);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .collapse-btn:hover {
    color: var(--text);
  }

  .sidebar-nav {
    padding: 1rem;
  }

  /* Resizer */
  .resizer {
    width: 2px;
    background: var(--dark-700);
    cursor: col-resize;
    transition: background 0.2s;
    z-index: 20;
  }
  .resizer:hover,
  .resizer:active {
    background: var(--primary-500);
  }

  /* Collapsed Sidebar */
  .collapsed-sidebar {
    width: 3rem;
    background: var(--dark-800);
    border-right: 1px solid var(--dark-700);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .collapsed-sidebar:hover {
    background: var(--dark-800);
  }
  .collapsed-sidebar .arrow {
    font-size: 1.5rem;
    color: var(--placeholder);
  }

  /* Content */
  .wiki-content {
    flex: 1;
    min-width: 0;
    height: 100%;
    overflow-y: auto;
    background: linear-gradient(
      to bottom left,
      var(--dark-800),
      var(--dark-900)
    );
    padding: 2rem;
  }

  /* Nav Items */
  .nav-group {
    margin-bottom: 0.5rem;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-link {
    display: block;
    padding: 0.4rem 0;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    flex: 1;
    font-size: 0.9rem;
  }
  .nav-link:hover {
    color: var(--text);
  }
  .nav-link.selected {
    color: var(--primary-500);
  }

  .toggle-btn {
    background: transparent;
    border: 0;
    cursor: pointer;
    color: var(--placeholder);
    padding: 0 0.5rem;
    font-size: 1rem;
  }
  .toggle-btn:hover {
    color: var(--text);
  }

  .nav-children {
    padding-left: 0.8rem;
    border-left: 1px solid var(--dark-700);
    margin-left: 4px;
    margin-top: 0.25rem;
  }
  .nav-child,
  .nav-grandchild {
    display: block;
    padding: 0.3rem 0;
    color: var(--placeholder);
    text-decoration: none;
    font-size: 0.85rem;
  }
  .nav-child:hover,
  .nav-grandchild:hover {
    color: var(--text);
  }
  .nav-child.selected,
  .nav-grandchild.selected {
    color: var(--primary-500);
  }
  .nav-grandchildren {
    padding-left: 1rem;
    border-left: 1px solid var(--dark-700);
    margin-left: 0.5rem;
  }

  @media (max-width: 768px) {
    .wiki-shell {
      flex-direction: column;
      height: auto;
    }
    .wiki-sidebar {
      width: 100% !important;
      height: auto;
      max-height: 300px;
    }
    .resizer {
      display: none;
    }
    .collapsed-sidebar {
      display: none;
    }
    .wiki-content {
      height: auto;
      overflow: visible;
    }
  }
</style>
