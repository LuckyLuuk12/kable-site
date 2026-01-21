<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/stores";

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
<div class="layout-wrapper">
	<main>
		{@render children?.()}
	</main>
	{#if !$page.url.pathname.startsWith("/wiki")}
		<Footer />
	{/if}
</div>

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

	.layout-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	:global(main) {
		padding: 0 !important;
		gap: 0 !important;
		flex: 1;
	}
	:global(section) {
		border-radius: 0 !important;
		background: var(--dark-900) !important;
	}
</style>
