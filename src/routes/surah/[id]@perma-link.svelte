<script context="module">
	// Stores
	import { setUrlParams } from '../../stores/url-params-stores';

	export async function load({ params }) {
		const data = params.id.split(':');

		let surahNumber = 0,
			ayaNumber = 0,
			readyToSearch = false;

		if (data.length > 1) {
			surahNumber = parseInt(data[0]);
			ayaNumber = parseInt(data[1]);

			if (surahNumber > 0 && ayaNumber > 0) {
				readyToSearch = true;

				// Set the store here so we can recover it in the component below
				setUrlParams({
					surahNumber,
					ayaNumber
				});
			}
		}

		// Don't proceed unless the user has entered surah number and aya number
		if (!readyToSearch) {
			return {
				status: 404
			};
		} else {
			return {
				props: {
					data
				}
			};
		}
	}
</script>

<script>
	// API
	import surahInfo from '../../api/fetch-surah-info';
	import similarVerses from '../../api/fetch-similar-verses';
	// Common Scripts
	import { decodeHtml, translationMethodsAvailable } from '../../scripts/common-scripts';
	import { defaultValues } from '../../scripts/env-variables';
	import { saveSearchToLocalStorage } from '../../scripts/local-storage-scripts';
	// Components
	import VersesContainer from '../../components/VersesContainer.svelte';
	// Stores
	import { setLoading } from '../../stores/loading-stores';
	import { setSearched } from '../../stores/search-stores';
	import { setSimilarVerseStore } from '../../stores/similar-verse-stores';
	import { settingsStored } from '../../stores/settings-stores';
	import { urlParams } from '../../stores/url-params-stores';

	let surahNumber = 0,
		ayaNumber = 0,
		promise,
		translationMethod;

	$: surahNumber;
	$: ayaNumber;
	$: promise;

	// Get index of the translation method selected
	settingsStored.translationMethod.subscribe((value) => {
		translationMethod = value;
		findVerses();
	});

	findVerses();

	function findVerses() {
		urlParams.subscribe((params) => {
			surahNumber = params.surahNumber;
			ayaNumber = params.ayaNumber;

			/**
			 * Get surah info
			 * @param {int} surahNumber
			 * @return {Promise} { surah_number: 1, ayat_count: 7, arabic_name: "Al-Faatiha",	english_name: "The Opening", type: "Meccan" }
			 */
			// We use surahInfo promise to check if this particular surah and aya exists
			if (surahNumber > 0 && ayaNumber > 0) {
				setLoading(true);
				promise = surahInfo(surahNumber).then((surah) => {
					let error = false;
					// Make sure the surah number and aya number are valid
					if (surah.hasOwnProperty('error') || ayaNumber > parseInt(surah.ayatCount)) {
						error = true;
					}

					// If surah and aya exist then find similar verses
					// This will provide the relevant information to the VersesContainer through the stores
					if (!error) {
						const options = {
							translationId: translationMethodsAvailable[translationMethod].translationId,
							surahNumber: surahNumber,
							ayaNumber: ayaNumber,
							method: translationMethodsAvailable[translationMethod].method
						};

						// Save surah info in the store
						surah.ayaNumber = ayaNumber;
						setSearched(surah);
						// Save search to local storage so the user gets this page when the load this page
						// next time
						saveSearchToLocalStorage(`${surahNumber}:${ayaNumber}`);

						similarVerses(options).then((verse) => {
							// Update store with similar verses
							setSimilarVerseStore(verse.info, verse.similar);

							// API has stopped loading
							setLoading(false);
						});
					}
					return surah;
				});
			}
		});
	}
</script>

<div class="text-center">
	{#await promise}
		<div class="text-center animate-bounce text-3xl">...</div>
	{:then surah}
		<!-- Triggered when incorrect surah or aya number provided -->
		{#if surah.hasOwnProperty('error')}
			<div
				class="p-4 mb-4 text-xl text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center mt-5"
				role="alert"
			>
				{surah.error}
			</div>
		{:else}
			<!-- surah: {JSON.stringify(surah)} -->
			<h1 class="sm:text-3xl text-2xl text-center mt-8 uppercase">
				Surah {decodeHtml(surah.arabicName)}
			</h1>
			<h2 class="sm:text-xl text-xl text-center mb-8">{decodeHtml(surah.englishName)}</h2>
			<VersesContainer />
		{/if}
	{:catch error}
		<div
			class="p-4 mb-4 text-xl text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center mt-5"
			role="alert"
		>
			<span class="font-medium">Error</span>
			{error}
		</div>
	{/await}
</div>
