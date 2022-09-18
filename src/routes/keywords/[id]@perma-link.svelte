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
	// import { page } from '$app/stores';
	// $page.url.pathname
	// API
	import keywordsSearch from '../../api/fetch-keywords-search';
	// Components
	import Keywords from '../../components/Keywords.svelte';
	import LemmaRelatives from '../../components/LemmaRelatives.svelte';
	import Error from '../../components/Utilities/Error.svelte';
	import Verse from '../../components/Verse.svelte';
	// Scripts
	import { arrayIncludesArray } from '../../scripts/common-scripts';
	// Stores
	import { setKeywordsHistory } from '../../stores/keywords-history-stores';
	import { keywordsPicked } from '../../stores/keywords-picked-stores';

	export let keywords;
	keywords = keywords.split(',').reverse().join(); // Reverse order from right to left
	// Assign to another variable to prevent reactivity
	// We don't want the list of keywords to disappear each time the user de-selects a keyword
	let fixedKeywords = keywords;

	let keywordsToSearch = [];
	// The following subscribe will pick up keywords from LemmaRelatives component
	keywordsPicked.subscribe((value) => {
		if (value != '') {
			console.log(keywordsToSearch, value);
			if (!arrayIncludesArray(keywordsToSearch, value)) {
				keywordsToSearch.push(...value);
				keywordsToSearch = keywordsToSearch;
			}
		}
	});

	let totalKeywords = 0;
	let apiIsLoading;
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

			const keywordsArr = keywords.hasOwnProperty('split') ? keywords.split(',') : [];
			totalKeywords = keywordsArr.length;

			// API is loading
			apiIsLoading = true;
			keywordsSearch(keywords).then((json) => {
				apiIsLoading = false;

				if (json.results === undefined || json.results.length === 0) {
					showError = true;
					return;
				}

				// Save keywords in the store so we can
				// use them in history page
				keywordsArr.length && setKeywordsHistory(keywords);

				verses = json.results.map((verse) => {
					const arr = verse.quranic_text.split(' ');
					const matchesArr = verse.matches.split(',');

					arr.forEach((word, index) => {
						let indexOfKeyword = 0;

						if (
							matchesArr.length > 0 &&
							matchesArr.some((match) => (match != '' ? word.includes(match) : false))
						) {
							// Find the index of the keyword in the verse so we can highlight it
							indexOfKeyword = matchesArr.findIndex((match) => word.includes(match));

							// Highlight the keyword
							arr[index] =
								`<span class="word shadow-md rounded p-1 hover:cursor-pointer hover:text-orange-600 ` +
								pickBgColor(indexOfKeyword) +
								`">${word}</span>`;
						} else {
							arr[
								index
							] = `<span class="word hover:cursor-pointer hover:text-orange-600">${word}</span>`;
						}
					});

					const quranic_text = arr.join(' ');

					return {
						surah_number: verse.surah_number,
						aya_number: verse.aya_number,
						quranic_text,
						translation: verse.translation
					};
				});
			});
		})();

	const handleWordClick = (e) => {
		const classes = e.target.classList;
		if (classes.contains('word')) {
			const word = e.target.innerText;
			keywordsToSearch.push(word);
			keywordsToSearch = keywordsToSearch;
		}
	};

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

	function pickBgColor(idx) {
		return bgColors[idx % bgColors.length];
	}
</script>

<h1 class="sm:text-3xl text-2xl text-center mt-8 uppercase">Keyword Search Results</h1>
<!-- Loading -->
{#if apiIsLoading}
	<div class="text-center animate-bounce text-3xl">...</div>
{/if}
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

<!-- Show related lemmas to the provided lemma -->
<div><LemmaRelatives {keywords} /></div>

<!-- Selected keywords to search -->
{#if keywordsToSearch.length}
	<Keywords keywords={keywordsToSearch.join(' ')} />
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
		<div on:click={handleWordClick}>
			<Verse {verse} payloadType="similar" />
		</div>
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
