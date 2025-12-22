<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    // redirect /wiki to first section
    goto("/wiki/getting-started");
  });
</script>

<style>
  /* keep minimal: the new layout provides the content */
</style>
