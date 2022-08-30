<script>
	// Internal
	import { browser } from '$app/env';

	import { areThereAnySavedVerses, getSavedVerses } from '../scripts/local-storage-scripts';

	let savedVerses = '';
	if (browser && areThereAnySavedVerses()) {
		savedVerses = JSON.parse(`[${JSON.stringify(getSavedVerses())}]`);
		console.log(savedVerses);
	}
</script>

<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">Saved</h1>
<div class="gap-2 py-2 text-center">
	{#if browser && areThereAnySavedVerses()}
		<p class="md:text-xl">Here is a list of the verses you saved: {savedVerses}</p>
	{/if}
	{#if browser && !areThereAnySavedVerses()}
		<div
			class="p-4 mb-4 text-xl text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 text-center mt-5"
			role="alert"
		>
			<span class="font-medium">Notice:</span>
			You haven't saved any verses yet.
		</div>
	{/if}
</div>
