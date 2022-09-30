<script>
	// Internal
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	// API
	import surahInfo from '../api/fetch-surah-info';
	import similarVerses from '../api/fetch-similar-verses';
	// Common Scripts
	import { defaultValues } from '../scripts/env-variables';
	import {
		getSearchFromLocalStorage,
		saveSearchToLocalStorage
	} from '../scripts/local-storage-scripts';
	// Scripts
	import {
		isNumberKey,
		removeTashkeel,
		isArabic,
		translationMethodsAvailable
	} from '../scripts/common-scripts';
	// Stores
	import { setLoading } from '../stores/loading-stores';
	import { setSearched } from '../stores/search-stores';
	import { setSimilarVerseStore } from '../stores/similar-verse-stores';
	import { settingsStored } from '../stores/settings-stores';

	const searchExamples = ['96:1', 'الرَّحْمَـٰنِ الرَّحِيمِ'];
	let error = false;

	// Get the search from local storage so we can start off the user
	// with their previous state
	let savedSearch = browser ? getSearchFromLocalStorage() : null;
	let search = savedSearch === null ? defaultValues.search : savedSearch;

	let translationMethod;
	settingsStored.translationMethod.subscribe((value) => {
		translationMethod = value;
		if (search != '') {
			handleChange({ key: 'Enter' });
		}
	});

	// Execute handleChange() when user visits the page
	if (search === defaultValues.search || search === savedSearch) {
		handleChange({ key: 'Enter' });
	}

	function handleChange(e) {
		// Redirect the user to the keywords search page if the user has searched for parts of an aya
		if (isArabic(removeTashkeel(search))) {
			if (e.key === 'Enter') {
				goto(`/keywords/${search.split(' ').join()}`);
			}
		} else {
			// Initiate search for similar verses provided correct input is provided (i.e. 23:1)
			findSimilarVerses(e);
		}
	}

	function findSimilarVerses(e) {
		error = false;
		// Check if any character in the input is not a number
		if (search.split('').filter((char) => !isNumberKey(char)).length > 0) {
			error = true;
			return;
		}

		const data = search.split(':');

		let surahNumber = 0,
			ayaNumber = 0,
			readyToSearch = false;

		if (data.length > 1) {
			surahNumber = parseInt(data[0]);
			ayaNumber = parseInt(data[1]);

			if (surahNumber > 0 && ayaNumber > 0) {
				readyToSearch = true;
			}
		}

		// Don't proceed unless the user has entered surah number and aya number
		if (!readyToSearch) {
			return;
		}

		/**
		 * Get surah info
		 * @param {int} surahNumber
		 * @return {Promise} { surah_number: 1, ayat_count: 7, arabic_name: "Al-Faatiha",	english_name: "The Opening", type: "Meccan" }
		 */

		surahInfo(surahNumber).then((surah) => {
			// Make sure the surah number and aya number are valid
			if (surah.hasOwnProperty('error') || ayaNumber > parseInt(surah.ayatCount)) {
				error = true;
				return;
			}

			error = false;
			// Add aya number to the surah object
			surah.ayaNumber = ayaNumber;
			// Update store with surah info
			setSearched(surah);
			// Save search to local storage
			saveSearchToLocalStorage(search);
		});

		if (e.key === 'Enter' && !error) {
			// API is loading
			setLoading(true);

			if (readyToSearch) {
				translationMethod = isNaN(translationMethod)
					? defaultValues.translationMethod
					: translationMethod;
				const options = {
					translationId: translationMethodsAvailable[translationMethod].translationId,
					surahNumber: surahNumber,
					ayaNumber: ayaNumber,
					method: translationMethodsAvailable[translationMethod].method
				};

				similarVerses(options).then((verse) => {
					// Update store with similar verses
					setSimilarVerseStore(verse.info, verse.similar);

					setLoading(false);
				});
			}
		}
	}
</script>

<!-- Search Examples-->
<div class="p3 text-center text-slate-400">
	Search Examples:
	{#each searchExamples as example, idx}
		<span
			on:click={() => {
				search = example;
				handleChange({ key: 'Enter' });
			}}
			class="text-slate-600 underline underline-offset-2 decoration-orange-400 hover:text-black hover:decoration-2 hover:cursor-pointer"
			>{example}</span
		>
		{#if idx < searchExamples.length - 1}
			<span class="text-slate-400"> or </span>
		{/if}
	{/each}
</div>

<input
	id="search"
	type="text"
	bind:value={search}
	on:keyup={handleChange}
	placeholder="Search Quran by phrase (i.e. {searchExamples[1]}) or Surah and Aya number (i.e. {searchExamples[0]})"
	class="text-center w-full rounded-md text-xl p-4 border-2 uppercase placeholder:text-lg placeholder:normal-case {error ===
	true
		? 'border-red-500 focus:border-red-500 border-3'
		: 'border-gray-200'}"
/>

<style>
	input:focus {
		outline: none;
	}
</style>
