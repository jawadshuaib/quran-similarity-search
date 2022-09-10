<script>
	// Internal
	import { browser } from '$app/env';
	// Common Scripts
	import { areThereAnySavedVerses } from '../../scripts/local-storage-scripts';
	// Stores
	import { hasSavedVerses } from '../../stores/has-saved-verses-stores';

	let showSavedNavItem = false;
	// From store - updated dynamically as soon as the verse is added or removed
	hasSavedVerses.subscribe((state) => {
		showSavedNavItem = state === true ? true : false;
	});

	// From local storage - updated statically when page loads
	showSavedNavItem = browser ? areThereAnySavedVerses() : showSavedNavItem;
</script>

<nav class="flex justify-center w-full">
	<a
		sveltekit:prefetch
		href="/"
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">Search</a
	>
	{#if showSavedNavItem}
		<a
			sveltekit:prefetch
			href="/saved"
			class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">Saved</a
		>
	{/if}
	<a
		sveltekit:prefetch
		href="/about"
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">About</a
	>
</nav>
