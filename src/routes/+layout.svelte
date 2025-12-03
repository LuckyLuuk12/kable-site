<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8329850616808451"
		crossorigin="anonymous"
	></script>
</svelte:head>

{@render children?.()}
