<script lang="ts">
  import { page } from "$app/stores";
  import {
    wikiContent,
    findNodeByPath,
    type WikiNode,
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
      location.hash = id;
    }
    location.hash = id;
  }
</script>

{#if node}
  <article class="wiki-article">
    <header class="article-header">
      <h1>{node.title}</h1>
      {#if node.description}
        <p class="lead">{node.description}</p>
      {/if}
    </header>

    {#if node.paragraphs}
      {#each node.paragraphs as para, i}
        <section class="doc-section" id={makeId(`p${i}`)}>
          <div class="section-header">
            <h3>Overview</h3>
            <button
              class="anchor"
              on:click={() => copyAnchor(makeId(`p${i}`))}
              aria-label="Copy link"
              title="Copy link"><i class="fas fa-link"></i></button
            >
          </div>
          <p>{@html para}</p>
        </section>
      {/each}
    {/if}

    {#if node.children}
      <section class="subsections">
        {#each node.children as child}
          <section id={makeId(child.id)} class="subsection">
            <div class="section-header">
              <h2>{child.title}</h2>
              <button
                class="anchor"
                on:click={() => copyAnchor(makeId(child.id))}
                aria-label="Copy link"
                title="Copy link"><i class="fas fa-link"></i></button
              >
            </div>
            {#if child.paragraphs}
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
                    {#if g.paragraphs}
                      {#each g.paragraphs as gp}
                        <p>{@html gp}</p>
                      {/each}
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </section>
        {/each}
      </section>
    {/if}
  </article>
{:else}
  <p>Section not found.</p>
{/if}

<style>
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
    max-width: 800px;
    margin: 1rem;
  }

  .article-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--dark-700);
    padding-bottom: 1rem;
  }

  .article-header h1 {
    font-family: unset;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .lead {
    font-size: 1.2rem;
    color: var(--placeholder);
  }

  .article-header,
  .doc-section,
  .subsections,
  .subsection {
    margin-bottom: 1rem;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid var(--dark-800);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .section-header h2,
  .section-header h3 {
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
  .nested-item h3:hover .anchor {
    opacity: 1;
  }

  .anchor:hover {
    color: var(--primary-500);
  }

  .nested-children {
    margin-left: 1.5rem;
    margin-top: 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--dark-700);
  }

  .nested-item {
    margin-bottom: 1.5rem;
  }

  .nested-item h3 {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
