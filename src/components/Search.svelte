<script>
	// Internal
	import { browser } from '$app/env';
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
	import { isNumberKey, translationMethodsAvailable } from '../scripts/common-scripts';
	// Stores
	import { setLoading } from '../stores/loading-stores';
	import { setSearched } from '../stores/search-stores';
	import { setSimilarVerseStore } from '../stores/similar-verse-stores';
	import { settingsStored } from '../stores/settings-stores';

	let error = false;

	// Get the search from local storage so we can start off the user
	// with their previous state
	let savedSearch = browser ? getSearchFromLocalStorage() : null;
	let search = savedSearch === null ? defaultValues.search : savedSearch;

	// This translationMethod is an index like 0, 1, 2
	// let savedTranslationMethod = browser ? getTranslationMethodFromLocalStorage() : null;
	// let translationMethod =
	// 	savedTranslationMethod === null ? defaultValues.translationMethod : savedTranslationMethod;

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
				const options = {
					translationId: translationMethodsAvailable[translationMethod].translationId,
					surahNumber: surahNumber,
					ayaNumber: ayaNumber,
					results: defaultValues.results,
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

<input
	id="search"
	type="text"
	bind:value={search}
	on:keyup={handleChange}
	placeholder="Enter the Surah Number and Aya Number (i.e. 12:2)"
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
