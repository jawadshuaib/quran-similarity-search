<script context="module">
	export async function load({ params }) {
		const keywords = params.id.split(',');

		let readyToSearch = false;

		if (keywords.length > 0) {
			readyToSearch = true;
		}

		// Don't proceed unless the user has provided keywords to search
		if (!readyToSearch) {
			return {
				status: 404
			};
		} else {
			return {
				props: {
					keywords: params.id
				}
			};
		}
	}
</script>

<script>
	// API
	import keywordsSearch from '../../api/fetch-keywords-search';
	// Components
	import Error from '../../components/Utilities/Error.svelte';
	import Verse from '../../components/Verse.svelte';

	export let keywords;
	let totalKeywords = 0;
	let showError = false;
	let verses = [];
	/**
		 * API: Perform keywords search
		 * @param {string} keywords
		 * @return {Promise} { "results": [
				{	
					"surah_number": 2,						
					"aya_number": 1,						
					"quranic_text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",						
					"minimal": "الحمد لله رب العالمين",
					"arabic_lemmatized": "حمد الله رب عالم",
					"arabic_lemmatized_without_stop_words": "حمد الله رب عالم",		
					"translation": "Praise be to God, Lord of the Worlds."
				}
      ]
  }
	*/

	keywordsSearch(keywords).then((json) => {
		if (json.results === undefined || json.results.length === 0) {
			showError = true;
			return;
		}

		const keywordsArr = keywords.split(',');
		totalKeywords = keywordsArr.length;
		verses = json.results.map((verse) => {
			// For each verse, highlight the keywords
			let arr = verse.quranic_text.split(' ');
			arr.forEach((word, index) => {
				// Remove diacritics before searching for the keywords in the verse
				let indexOfKeyword = 0;
				if (keywordsArr.some((el) => removeTashkeelAll(word).includes(el))) {
					// Find the index of the keyword in the verse so we can highlight it
					indexOfKeyword = keywordsArr.findIndex((el) => removeTashkeelAll(word).includes(el));
					// Highlight the keyword
					arr[index] =
						`<span class="border-2 rounded p-2 ` + pickBgColor(indexOfKeyword) + `">${word}</span>`;
				} else {
					arr[index] = word;
				}
			});

			verse.quranic_text = arr.join(' ');

			return {
				surah_number: verse.surah_number,
				aya_number: verse.aya_number,
				quranic_text: verse.quranic_text,
				translation: verse.translation
			};
		});
	});

	// https://stackoverflow.com/questions/5224267/javascriptremove-arabic-text-diacritic-dynamically
	function removeTashkeelAll(s) {
		return s.replace(/[ؐ-ًؕ-ٖٓ-ٟۖ-ٰٰۭ]/g, '');
	}

	function pickBgColor(idx) {
		const bgColors = ['bg-yellow-200', 'bg-orange-200', 'bg-violet-200', 'bg-green-200'];
		return bgColors[idx % bgColors.length];
	}
</script>

<h1 class="sm:text-3xl text-2xl text-center mt-8 uppercase">Keyword Search Results</h1>
<div class="items-center content-center">
	<div class="flex flex-wrap justify-center mt-3 mb-4 text-3xl font-cormorant text-center">
		{#each keywords.split(',') as keyword, idx}
			<div class="flex-auto w-24 {pickBgColor(idx)} rounded border-2 p-2 mx-2">
				{keyword}
			</div>
		{/each}
	</div>
</div>

{#if showError}
	<Error
		title="Note"
		description="No results were found for the keywords searched."
		type="notice"
	/>
{/if}

{#if verses.length}
	<div class="text-center">
		The following verse{#if verses.length > 1}s{/if} in the Qur'an contain{#if verses.length == 1}s{/if}
		the searched keyword{#if totalKeywords > 1}s{/if}:
	</div>
	{#each verses as verse}
		<Verse {verse} payloadType="similar" />
		<!-- {result.surah_number}:{result.aya_number} {result.quranic_text} {result.translation} -->
	{/each}
{/if}
