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

		verses = json.results.map((verse) => {
			// For each verse, highlight the keywords
			let arr = verse.quranic_text.split(' ');
			arr.forEach((word, index) => {
				// Convert keywords to an array and then
				// Remove diacritics before searching for the keywords in the verse
				if (keywords.split(',').some((el) => removeTashkeelAll(word).includes(el))) {
					arr[index] = `<span class="bg-yellow-200">${word}</span>`;
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
	// function remove_diacritics(text) {
	// 	//remove special characters
	// 	text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '');

	// 	//normalize Arabic
	// 	text = text.replace(/(آ|إ|أ)/g, 'ا');
	// 	text = text.replace(/(ة)/g, 'ه');
	// 	text = text.replace(/(ئ|ؤ)/g, 'ء');
	// 	text = text.replace(/(ى)/g, 'ي');

	// 	//convert arabic numerals to english counterparts.
	// 	var starter = 0x660;
	// 	for (var i = 0; i < 10; i++) {
	// 		text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
	// 	}

	// 	return text;
	// }
</script>

{#if showError}
	<Error
		title="Search"
		description="No results were found for the keywords searched."
		type="notice"
	/>
{/if}

{#if verses.length}
	{#each verses as verse}
		<Verse {verse} payloadType="similar" />
		<!-- {result.surah_number}:{result.aya_number} {result.quranic_text} {result.translation} -->
	{/each}
{/if}
