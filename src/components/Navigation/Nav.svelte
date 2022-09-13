<script>
	// Stores
	import { didSaveVerse, verseSaveStatus } from '../../stores/did-save-verse-stores';

	let el;

	// From store - updated dynamically as soon as the verse is added or removed
	verseSaveStatus.subscribe((state) => {
		if (state) {
			if (el) {
				const css = ['animate-pulse', 'text-orange-600'];
				el.classList.add(...css);
				setTimeout(() => {
					el.classList.remove(...css);
				}, 500);
			}

			// Reset the store
			didSaveVerse(false);
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
	<a
		sveltekit:prefetch
		href="/"
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">Search</a
	>

	<a
		sveltekit:prefetch
		href="/saved"
		bind:this={el}
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">Saved</a
	>

	<a
		sveltekit:prefetch
		href="/settings"
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">Settings</a
	>
	<a
		sveltekit:prefetch
		href="/about"
		class="mx-4 text-lg hover:underline hover:decoration-orange-400 decoration-2">About</a
	>
</nav>
