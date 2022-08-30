<script>
	// Stores
	import { hasSavedVerses } from '../stores/has-saved-verses-stores';

	let showSavedNavItem = false;
	hasSavedVerses.subscribe((state) => {
		showSavedNavItem = state === true ? true : false;
	});
</script>

<nav class="flex justify-center w-full">
	<a sveltekit:prefetch href="/" class="mx-4 text-lg hover:underline decoration-2">Search</a>
	{#if showSavedNavItem}
		<a sveltekit:prefetch href="/saved" class="mx-4 text-lg hover:underline decoration-2">Saved</a>
	{/if}
	<a sveltekit:prefetch href="/about" class="mx-4 text-lg hover:underline decoration-2">About</a>
</nav>
