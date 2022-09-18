<script>
	// Components
	import Error from '../components/Utilities/Error.svelte';
	import Keywords from '../components/Keywords.svelte';
	// Stores
	import { keywordsHistory } from '../stores/keywords-history-stores';

	let keywords = [];
	const defaultNote = {
		title: 'No History Found',
		description: 'You have not searched any keywords yet.',
		type: 'notice'
	};
	keywordsHistory.subscribe((k) => {
		if (k != null) {
			keywords = k.split(',');
		}
	});
</script>

{#if keywords.length}
	<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">History</h1>
	<div class="">
		<Keywords {keywords} />
	</div>
{:else}
	<Error {...defaultNote} />
{/if}
