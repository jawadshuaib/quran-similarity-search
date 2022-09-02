<script>
	// Internal
	import { browser } from '$app/env';
	// API
	import verseInfo from '../api/fetch-verse-info';
	// Common Scripts
	import { areThereAnySavedVerses, getSavedVerses } from '../scripts/local-storage-scripts';
	// Components
	import Verse from '../components/Verse.svelte';

	let savedVerses = '';
	let error = false;
	let verses = [];
	let promise;

	let promises = [];
	if (browser && areThereAnySavedVerses()) {
		// Get an array of all the verses saved
		savedVerses = getSavedVerses().split(',');

		let i = 0;
		savedVerses.forEach((verse) => {
			let verseData = verse.split(':');
			let surahNumber = parseInt(verseData[0]);
			let ayaNumber = parseInt(verseData[1]);

			// Create an array of promises so we may resolve them all at once
			promises[i] = verseInfo(surahNumber, ayaNumber);
			i++;
		});

		// Resolve all promises at once
		promise = Promise.all(promises)
			.then((v) => {
				v = v.flat();

				v.map((verse) => {
					const formatted = {
						surah_number: verse.surahNumber,
						aya_number: verse.ayaNumber,
						quranic_text: verse.arabicText,
						translation: verse.englishText
					};

					verses.push(formatted);
				});
			})
			.catch((error) => {
				console.log(`Problem resolving all the errors`, error);
			});
	}
</script>

<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">Saved</h1>
<div class="gap-2 py-2 text-center">
	<!-- Loading API... -->
	{#await promise}
		<div class="text-center animate-bounce text-3xl">...</div>
		<!-- Get each saved verse -->
	{:then}
		{#each verses as verse}
			<Verse {verse} payloadType="saved" opacity="100" />
		{/each}
	{:catch error}
		<p>Error: {error}</p>
	{/await}

	<!-- Notice if there aren't any saved verses -->
	{#if browser && !areThereAnySavedVerses()}
		<div
			class="p-4 mb-4 text-xl text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 text-center mt-5"
			role="alert"
		>
			<span class="font-medium">Notice:</span>
			You haven't saved any verses yet.
		</div>
	{/if}
</div>
