<script>
	// Internal
	import { browser } from '$app/env';
	// API
	import verseInfo from '../api/fetch-verse-info';
	// Common Scripts
	import { areThereAnySavedVerses, getSavedVerses } from '../scripts/local-storage-scripts';
	import { envVariables } from '../scripts/env-variables';
	// Components
	import Error from '../components/Utilities/Error.svelte';
	import Verse from '../components/Verse.svelte';

	const defaultNote = {
		title: 'Note',
		description: "You haven't saved any verses yet.",
		type: 'notice'
	};

	let savedVerses = '';
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

<svelte:head><title>Your Saved Verses of the Quran</title></svelte:head>
<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">Saved</h1>
<div class="gap-2 py-2 text-center">
	<!-- Loading API... -->
	{#await promise}
		<div class="text-center animate-bounce text-3xl">...</div>
		<!-- Get each saved verse -->
	{:then}
		{#each verses as verse}
			<Verse {verse} payloadType="saved" />
		{/each}
	{:catch error}
		<p>Error: {error}</p>
	{/await}

	<!-- Notice if there aren't any saved verses -->
	{#if browser && !areThereAnySavedVerses()}
		<Error {...defaultNote} />
		<div class="text-center">
			<img src="{envVariables.imageProxy}/usage-1.png" alt="How to save verses" />
		</div>
	{/if}
</div>
