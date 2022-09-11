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
	let fixedKeywords = keywords; // Assign to another variable to prevent reactivity
	let totalKeywords = 0;
	let showError = false;
	let verses = [];
	let el;
	const bgColors = [
		'bg-yellow-200',
		'bg-orange-200',
		'bg-purple-200',
		'bg-red-200',
		'bg-sky-200',
		'bg-green-200',
		'bg-violet-200'
	];

	$: keywords,
		((_) => {
			// Reset
			verses = [];
			totalKeywords = 0;
			showError = false;

			// Get the keywords
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
								`<span class="shadow-md rounded p-1 ` +
								pickBgColor(indexOfKeyword) +
								`">${word}</span>`;
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
		})();

	// Search all keywords other than the ones without 'selected' class
	function searchAgain(e) {
		if (e.target.classList.contains('keyword')) {
			const selected = 'selected';
			e.target.classList.toggle(selected);
		}

		// Remove bg from the keyword we deseleted
		updateBgColors();
		// Update the keywords selected
		keywords = getKeywordsSelected();
	}

	function updateBgColors() {
		const els = el.getElementsByClassName('keyword');
		// Remove class
		let i = 0;
		[].forEach.call(els, function (el) {
			// Remove all background classes
			// And then re-assign them a new one based on their index
			el.classList.remove(...bgColors);
			if (el.classList.contains('selected')) {
				el.classList.add(pickBgColor(i));
				i++;
			}
		});
	}

	// Get the keywords selected by the user by looking up the 'selected' class
	// in each div that contains a keyword
	function getKeywordsSelected() {
		// Get keywords selected for search
		const els = el.getElementsByClassName('selected');
		let selected = '';
		[].forEach.call(els, function (el) {
			selected = selected + el.innerText + ',';
		});

		// Remove trailing comma
		return selected.replace(/(,$)/g, '');
	}

	// https://stackoverflow.com/questions/5224267/javascriptremove-arabic-text-diacritic-dynamically
	function removeTashkeelAll(s) {
		return s.replace(/[ؐ-ًؕ-ٖٓ-ٟۖ-ٰٰۭ]/g, '');
	}

	function pickBgColor(idx) {
		return bgColors[idx % bgColors.length];
	}
</script>

<h1 class="sm:text-3xl text-2xl text-center mt-8 uppercase">Keyword Search Results</h1>
<!-- Keywords -->
<div class="items-center content-center">
	<div
		on:click={searchAgain}
		bind:this={el}
		class="flex flex-wrap justify-center mt-3 mb-4 text-3xl font-cormorant text-center text-slate-400"
	>
		{#each fixedKeywords.split(',') as keyword, idx}
			<div
				class="shadow-md keyword selected flex-auto w-24 {pickBgColor(
					idx
				)} rounded border-2 p-2 mx-2 hover:cursor-pointer hover:bg-white hover:shadow-lg hover:border-slate-200"
			>
				{keyword}
			</div>
		{/each}
	</div>
</div>
<!-- Error if no results -->
{#if showError}
	<Error
		title="Note"
		description="No results were found for the keywords searched."
		type="notice"
	/>
{/if}

<!-- Results -->
{#if verses.length}
	<div class="text-center">
		The following <span class="font-semibold"
			>{verses.length} verse{#if verses.length > 1}s{/if}</span
		>
		in the Qur'an contain{#if verses.length == 1}s{/if}
		the above searched keyword{#if totalKeywords > 1}s{/if}:
	</div>
	{#each verses as verse}
		<Verse {verse} payloadType="similar" />
	{/each}
{/if}

<style>
	.selected {
		border-color: orange;
		border-width: 0.2rem;
		color: #000;
	}
	.selected:hover {
		border-color: lightgray;
		color: gray;
	}
</style>
