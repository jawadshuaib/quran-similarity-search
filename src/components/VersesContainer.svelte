<script>
	// Stores
	import { is_empty } from 'svelte/internal';
	import { similarVerseStore } from '../stores/similar-verse-stores';
	import { loading } from '../stores/loading-stores';
	// Components
	import Bismillah from './Utilities/Bismillah.svelte';
	import Btn from './Utilities/Btn.svelte';
	import Keywords from './Keywords.svelte';
	import Verse from './Verse.svelte';

	let searchedVerseInfo = {};
	let similarVerses = [];
	let searchedFoundSimilarVerses = false;
	let showBismillah = true;

	// Total results to show
	let limit = 5;
	let showMoreBtn = true;

	$: apiIsLoading = true;

	similarVerseStore.subscribe((verses) => {
		// Check if a valid search happened
		if (verses.info.surah_number !== undefined && verses.info.aya_number !== undefined) {
			// Searched verse
			searchedVerseInfo = verses.info;

			// Don't show Bismillah for the first Surah of first ayat
			if (searchedVerseInfo.surah_number == 1 && searchedVerseInfo.aya_number == 1) {
				showBismillah = false;
			} else {
				showBismillah = true;
			}

			// Similar verses
			similarVerses = verses.similar;

			if (similarVerses.length) {
				searchedFoundSimilarVerses = true;
				apiIsLoading = false;
			}
		}
	});

	// Show '...' until API is loading
	loading.subscribe((status) => {
		apiIsLoading = status;
	});

	function showMore() {
		limit += 5;

		showMoreBtn = similarVerses.length > limit ? true : false;
	}
</script>

{#if !is_empty(searchedVerseInfo)}
	<!-- Show Bismilla -->
	<Bismillah {showBismillah} />

	<!-- Show the verse searched -->
	<Verse verse={searchedVerseInfo} payloadType="searched" />
	<!-- Keywords -->
	<h4 class="mt-5 text-center font-medium leading-tight text-2xl mb-2 text-orange-600">Keywords</h4>
	<Keywords verse={searchedVerseInfo} />

	<!-- Show similar verses if any are found -->
	{#if similarVerses.length}
		<h4 class="mt-5 text-center font-medium leading-tight text-2xl mb-2 text-orange-600">
			Similar Verse{#if similarVerses.length > 1}s{/if}
		</h4>
		{#each similarVerses as verse, i}
			{#if i < limit}
				<Verse {verse} payloadType="similar" />
			{/if}
		{/each}
		<!-- Show More Button -->
		{#if similarVerses.length > limit && showMoreBtn}
			<div class="text-center">
				<Btn action={showMore} text="Show More Results" active={true} />
			</div>
		{/if}
	{:else if searchedFoundSimilarVerses}
		<h4 class="mt-5 text-center font-medium leading-tight text-2xl mb-2 text-orange-600">
			No Similar Verses Found
		</h4>
	{/if}
{/if}

{#if apiIsLoading}
	<div class="text-center animate-bounce text-3xl">...</div>
{/if}
