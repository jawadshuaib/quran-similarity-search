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
			heading = `Surah ${decodeHtml(surah.arabicName)}, Verse ${surah.ayaNumber}`;
		} else {
			heading = ''; //'Search a Verse in the Quran';
		}
	});

	// import translate from '../api/google-translate';
	// try {
	// 	translate('اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي').then((json) => {
	// 		console.log(json.translatedText);
	// 	});
	// } catch {}
</script>

<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">Search</h1>
<Search />
<h1 class="sm:text-2xl text-xl text-center my-8 uppercase">{heading}</h1>
<VersesContainer />
