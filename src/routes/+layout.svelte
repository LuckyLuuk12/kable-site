<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8329850616808451"
		crossorigin="anonymous"
	></script>
</svelte:head>

<Navbar />
<main>
	{@render children?.()}
</main>
<Footer />

<style>
	@font-face {
		font-family: Minecraft; /* set name */
		src: url(Minecraft-Regular.woff2); /* url of the font */
	}
	:global(*) {
		scrollbar-width: thin;
		font-family: "Minecraft", "Inter", sans-serif;
		--card: var(--dark-800);
	}
	:global(main) {
		padding: 0 !important;
		gap: 0 !important;
	}
	:global(section) {
		border-radius: 0 !important;
		background: var(--dark-900) !important;
	}
</style>
