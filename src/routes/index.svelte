<script>
	// Scripts
	import { decodeHtml } from '../scripts/common-scripts';

	// Stores
	import { searched } from '../stores/search-stores';

	// Components
	import Search from '../components/Search.svelte';
	import VersesContainer from '../components/VersesContainer.svelte';

	let heading = '';
	searched.subscribe((surah) => {
		if (surah.surahNumber !== 0 && surah.ayaNumber !== 0) {
			heading = `Search Surah ${decodeHtml(surah.arabicName)}, Verse ${surah.ayaNumber}`;
		} else {
			heading = 'Search a Verse in the Quran';
		}
	});
</script>

<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">{heading}</h1>
<Search />
<VersesContainer />
