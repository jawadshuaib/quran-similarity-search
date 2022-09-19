<script>
	// Internal
	import { browser } from '$app/env';
	// Components
	import Error from '../components/Utilities/Error.svelte';
	import Keywords from '../components/Keywords.svelte';
	// Stores
	import { keywordsHistory } from '../stores/keywords-history-stores';
	// Scripts
	import { getKeyWordsFromLocalStorage } from '../scripts/local-storage-scripts';

	let keywords = [];
	const defaultNote = {
		title: 'No History Found',
		description: 'You have not searched any keywords yet.',
		type: 'notice'
	};

	const keywordsFromLocalStorage = browser ? getKeyWordsFromLocalStorage() : null;
	if (keywordsFromLocalStorage != null) {
		keywords = getKeyWordsFromLocalStorage().split(',');
	} else {
		keywordsHistory.subscribe((k) => {
			if (k != null) {
				keywords = k.split(',');
			}
		});
	}
</script>

<svelte:head><title>History of Keywords Searched</title></svelte:head>

{#if keywords.length}
	<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">History</h1>
	<Keywords {keywords} />
{:else}
	<Error {...defaultNote} />
{/if}
