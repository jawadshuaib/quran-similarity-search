<script>
	// Internal
	import Link from 'svelte-link';
	import { browser } from '$app/env';
	// API
	import translate from '../api/google-translate';
	// Components
	import Tooltip from './Tooltip.svelte';
	// Scripts
	import { decodeHtml, getSelectedText } from '../scripts/common-scripts';
	import {
		areThereAnySavedVerses,
		isVerseSaved,
		saveVerse,
		removeVerse
	} from '../scripts/local-storage-scripts';
	// Stores
	import { searched } from '../stores/search-stores';
	import { didSaveVerse } from '../stores/did-save-verse-stores';

	export let verse;
	export let payloadType;

	let tooltip = '';
	let linkTitle = '';
	let bookmarkColor = '';

	function deselectText() {
		tooltip = '';
	}

	function getTranslation() {
		const selectedText = getSelectedText();

		if (selectedText !== null) {
			try {
				translate(selectedText).then((translated) => {
					tooltip = translated;
				});
			} catch {
				console.log('There was a problem calling the translation API');
			}
		} else {
			tooltip = '';
		}
	}

	// Execute the following whenever verse changes
	$: verse,
		((_) => {
			if (browser) {
				// Set color for the bookmark on load depending on whether the verse is saved or not
				bookmarkColor = isVerseSaved(verse.surah_number, verse.aya_number)
					? 'text-orange-600 hover:text-gray-300'
					: 'text-gray-300 hover:text-orange-600';
			}
		})();

	if (payloadType === 'searched') {
		// Get context for the aya by finding where to provide the start and end
		// for previous and next ayats
		searched.subscribe((surah) => {
			linkTitle = `Get context for this aya in Surah ${decodeHtml(surah.arabicName)}`;
		});
	}

	// Save or remove the verse from local storage
	// Change the color of the bookmark depending on whether the verse is saved or not
	function saveOrRemove(surahNumber, ayaNumber) {
		if (browser) {
			if (isVerseSaved(surahNumber, ayaNumber)) {
				removeVerse(surahNumber, ayaNumber);
				bookmarkColor = 'text-gray-300 hover:text-orange-600';
			} else {
				saveVerse(surahNumber, ayaNumber);
				bookmarkColor = 'text-orange-600 hover:text-gray-300';
			}

			// Store whether or not there are any saved verses in local storage
			areThereAnySavedVerses() && didSaveVerse(true);
		}
	}
</script>

<div on:click={deselectText}>
	<!-- Search verse (can be from a route as well, i.e. /surah/1:1) -->
	{#if payloadType === 'searched'}
		<div class="main-quote py-4 my-2 border-2 border-slate-50 bg-amber-50 rounded items-center">
			<Tooltip title={tooltip}>
				<div
					on:mouseup={getTranslation}
					class="my-2 text-3xl px-5 text-slate-700 text-center font-cormorant"
				>
					{verse.quranic_text}
				</div>
			</Tooltip>
			<div
				class="my-2 text-3xl px-5 text-slate-600 text-center underline decoration-wavy  decoration-sky-100 font-cormorant"
			>
				{decodeHtml(verse.translation)}
			</div>
			<!-- Surah:Verse -->
			<div class="text-4xl my-1 text-slate-500 text-center font-cormorant">
				{verse.surah_number}:{verse.aya_number}
			</div>
			<div class="text-xl mt-2 text-slate-800 text-center font-cormorant wrap-center">
				<!-- Option for saving verses to local storage -->
				<span
					on:click={() => saveOrRemove(verse.surah_number, verse.aya_number)}
					class="cursor-pointer"
					title="Bookmark verse"
				>
					<!-- icon: bookmark -->
					<svg
						class="h-8 w-8 {bookmarkColor}"
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg
					>
				</span>
				<!-- Link to view verse context on Quran.com -->
				<a
					href="https://www.quran.com/{verse.surah_number}?startingVerse={verse.aya_number}"
					title={linkTitle}
					target="_blank"
				>
					<!-- icon: info -->
					<svg
						class="h-8 w-8 text-gray-300 hover:text-gray-600"
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" /> <line x1="12" y1="16" x2="12" y2="12" />
						<line x1="12" y1="8" x2="12.01" y2="8" /></svg
					>
				</a>
			</div>
		</div>
		<!-- Similar or Saved verses -->
	{:else if payloadType === 'similar' || payloadType === 'saved'}
		<div
			class="similar-verse grid grid-cols-12 py-4 my-2 md:border-2 border-slate-50 rounded items-center text-xl text-slate-800 hover:border-slate-200"
		>
			<div class="col-span-1 wrap-right">
				<!-- Option for saving verses to local storage -->
				<span
					on:click={() => saveOrRemove(verse.surah_number, verse.aya_number)}
					class="cursor-pointer"
				>
					<!-- icon: bookmark -->
					<svg
						class="h-8 w-8 {bookmarkColor}"
						viewBox="0 0 30 30"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg
					>
				</span>

				<!-- Link to view similar verses for this particular find -->
				<Link
					href={`/surah/${verse.surah_number}:${verse.aya_number}`}
					class="hover:underline hover:decoration-sky-500"
					title="Find verses similar to this aya"
				>
					<svg
						class="h-8 w-8 text-gray-200 hover:text-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="10" cy="10" r="7" />
						<line x1="7" y1="10" x2="13" y2="10" /> <line x1="10" y1="7" x2="10" y2="13" />
						<line x1="21" y1="21" x2="15" y2="15" /></svg
					>
				</Link>
			</div>
			<!-- Surah:Aya -->
			<div class="col-span-2 md:col-span-1 text-center text-lg md:text-2xl">
				{verse.surah_number}:{verse.aya_number}
			</div>
			<main class="col-span-9 md:col-span-10">
				<Tooltip title={tooltip}>
					<div on:mouseup={getTranslation} class="text-right px-0 md:px-5 text-xl md:text-2xl">
						{@html verse.quranic_text}
					</div>
				</Tooltip>
				<div class="my-2 px-10 md:px-5 text-sm md:text-2xl">{decodeHtml(verse.translation)}</div>
			</main>
		</div>
	{/if}
</div>

<style>
	.main-quote {
		border-left: 5px solid #ccc;
		border-right: 5px solid #ccc;
		border-bottom-left-radius: 18px;
		border-top-right-radius: 18px;
	}
	.wrap-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrap-right {
		display: flex;
		justify-content: right;
		align-items: right;
	}
</style>
