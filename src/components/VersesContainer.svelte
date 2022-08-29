<script>
	// Stores
	import { is_empty } from 'svelte/internal';
	import { similarVerseStore } from '../stores/similar-verse-stores';

	// Components
	import Verse from './Verse.svelte';

	let searchedVerseInfo = {};
	let similarVerses = [];
	let searchedFoundSimilarVerses = false;
	let showBismillah = true;

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

			// Map opacity values to similar verses
			verses.similar.map((verse) => {
				verse.opacity = get_verse_opacity(verse.similarity);
			});

			// Similar verses
			similarVerses = verses.similar;

			if (similarVerses.length) {
				searchedFoundSimilarVerses = true;
			}
		}
	});

	// Calculate opacity for similar verses
	function get_verse_opacity(similarity) {
		let opacity = 0;
		if (similarity >= 0.8) {
			opacity = 100;
		} else if (similarity >= 0.59) {
			opacity = 80;
		} else if (similarity >= 0.5) {
			opacity = 70;
		} else if (similarity >= 0.45) {
			opacity = 40;
		} else if (similarity >= 0.3) {
			opacity = 20;
		} else if (similarity >= 0.1) {
			opacity = 10;
		}
		return opacity;
	}
</script>

{#if !is_empty(searchedVerseInfo)}
	<!-- Show Bismilla -->
	{#if showBismillah}
		<div class="bismilla">
			<div class="bismilla-text text-3xl text-slate-400 text-center my-2">
				<span title="In the name of God, the Gracious, the Merciful."
					>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span
				>
			</div>
		</div>
	{/if}

	<!-- Show the verse searched -->
	<Verse verse={searchedVerseInfo} payloadType="searched" opacity="100" />

	<!-- Show similar verses if any are found -->
	{#if similarVerses.length}
		<h4 class="mt-5 text-center font-medium leading-tight text-2xl mb-2 text-orange-600">
			Similar Verse{#if similarVerses.length > 1}s{/if}
		</h4>
		{#each similarVerses as verse}
			<Verse {verse} payloadType="similar" opacity={verse.opacity} />
		{/each}
	{:else if searchedFoundSimilarVerses}
		<h4 class="mt-5 text-center font-medium leading-tight text-2xl mb-2 text-orange-600">
			No Similar Verses Found
		</h4>
	{/if}
{/if}
