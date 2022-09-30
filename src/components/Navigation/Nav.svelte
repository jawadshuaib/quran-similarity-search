<script>
	// Stores
	import { didSaveVerse, verseSaveStatus } from '../../stores/did-save-verse-stores';
	import { keywordsHistory } from '../../stores/keywords-history-stores';

	let elSaved;
	let showHistory = false;

	// From store - updated dynamically as soon as the verse is added or removed
	// We use this to animate the "Saved" nav item
	verseSaveStatus.subscribe((state) => {
		if (state) {
			if (elSaved) {
				const css = ['animate-pulse', 'text-orange-600'];
				elSaved.classList.add(...css);
				setTimeout(() => {
					elSaved.classList.remove(...css);
				}, 500);
			}

			// Reset the store
			didSaveVerse(false);
		}
	});

	keywordsHistory.subscribe((keywords) => {
		if (keywords != null) {
			showHistory = true;
		}
	});

	// hasSavedVerses.subscribe((state) => {
	// 	// showSavedNavItem = state === true ? true : false;
	// 	const totalSavedVerses =
	// 		browser && areThereAnySavedVerses() ? getSavedVerses().split(',').length : 0;

	// 	console.log(originalCountOfSavedVerses, totalSavedVerses);
	// 	if (totalSavedVerses != originalCountOfSavedVerses) {
	// 		if (el) {
	// 			el.classList.add('animate-pulse', 'text-orange-600', 'font-bold');
	// 			setTimeout(() => {
	// 				el.classList.remove('animate-pulse', 'text-orange-600', 'font-bold');
	// 			}, 1000);
	// 		}
	// 	}
	// });

	// From local storage - updated statically when page loads
	// showSavedNavItem = browser ? areThereAnySavedVerses() : showSavedNavItem;
</script>

<nav class="flex justify-center w-full">
	<!-- Search -->
	<a
		sveltekit:prefetch
		href="/"
		class="mr-2 sm:mr-4 lg:mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2"
		>Search</a
	>
	<!-- Saved -->
	<a
		sveltekit:prefetch
		href="/saved"
		bind:this={elSaved}
		class="mr-2 sm:mr-4 lg:mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2"
		>Saved</a
	>
	<!-- History -->
	{#if showHistory}
		<a
			href="/history"
			class="mr-2 sm:mr-4 lg:mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2"
			>History</a
		>
	{/if}
	<!-- Settings -->
	<a
		sveltekit:prefetch
		href="/settings"
		class="mr-2 sm:mr-4 lg:mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2"
		>Settings</a
	>
	<!-- About -->
	<a
		sveltekit:prefetch
		href="/about"
		class="text-lg hover:underline hover:decoration-orange-400 decoration-2">About</a
	>
</nav>
