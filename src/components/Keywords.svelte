<script>
	// -- Subsection within the VersesContainer and kewords/[id] page --

	// Internal
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// API
	import keywordsSearch from '../api/fetch-keywords-search';

	export let keywords;
	export let preSelected;

	let els;
	onMount(() => {
		if (els == null) {
			els = el.getElementsByClassName('keyword');
		}
	});

	let canSearch = false;
	let el;
	let totalResults = 0; // Total results for keywords selected
	let totalKeywordsSelected; // Total keywords selected (by clicking on their div)

	// Execute the following whenever keywords change
	$: keywords,
		((_) => {
			if (keywords != null) {
				keywords = !Array.isArray(keywords) ? keywords.split(' ') : keywords;
				keywords = [...new Set(keywords)];
				keywords = keywords.reverse();
			}

			canSearch = false;
			totalResults = 0;
			totalKeywordsSelected = 0;

			if (el !== undefined) {
				// Strangely enough, I have to do this twice for it to de-select all selected keywords
				deselectAll();
				deselectAll();
			}

			if (preSelected == 'true') {
				if (els !== undefined) {
					selectAll(els);
				}
			}
		})();

	// Find out how many ayas contain the keywords
	// This is displayed to the user as they select keywords
	function totalResultsForKeywords() {
		const keywords = getKeywordsSelected();
		totalKeywordsSelected = keywords.split(',').length;

		if (totalKeywordsSelected > 0) {
			keywordsSearch(keywords).then((json) => {
				totalResults = 0;
				if (json.results !== undefined && json.results.length > 0) {
					totalResults = json.results.length;
				}
			});
		}
	}

	// Select the divs that contain the keywords
	// We add the 'selected' class to keep track of keywords that are selected
	function select(e) {
		if (e.target.classList.contains('keyword')) {
			const selected = 'selected';
			const border = 'border-orange-400';
			const bg = 'bg-orange-100';

			e.target.classList.toggle(selected);
			e.target.classList.toggle(border);
			e.target.classList.toggle(bg);
		}

		// Show search button if keywords are selected
		el.querySelector('.selected') !== null ? (canSearch = true) : (canSearch = false);
	}

	// Redirect the user to the keywords search page
	function search() {
		const keywords = getKeywordsSelected();
		// Search for selected keywords
		goto(`/keywords/${keywords}`);
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

	function deselectAll() {
		const els = el.getElementsByClassName('selected');

		[].forEach.call(els, function (el) {
			el.classList.remove('border-orange-400');
			el.classList.remove('bg-orange-100');
			el.classList.remove('selected');
		});
	}

	function selectAll(els) {
		[].forEach.call(els, function (el) {
			select({ target: el });
		});

		totalResultsForKeywords();
	}
</script>

<div class="border-2 border-slate-50 rounded p-5 items-center">
	<!-- Div's containing keywords and the search button -->
	<div
		on:click={select}
		on:click={totalResultsForKeywords}
		class="flex flex-wrap justify-center mt-2 text-2xl px-5 font-cormorant text-slate-400 text-center"
		bind:this={el}
	>
		{#each keywords as keyword}
			<div
				class="keyword rounded flex-initial w-24 border-2 mx-2 mt-2 py-2 hover:border-orange-400 hover:border-2 hover:cursor-pointer"
			>
				{keyword}
			</div>
		{/each}
		<!-- Search button -->
		{#if canSearch}
			<div
				on:click={search}
				class="wrap-center rounded flex-initial mx-2 mt-2.5 h-12 bg-orange-500 text-white px-3  hover:bg-orange-700 hover:cursor-pointer"
			>
				Search Keywords
			</div>
		{/if}
	</div>

	<!-- Show user pre-emptively how many results the combination of keywords selected will show -->
	<div class="mt-2">
		{#if totalResults > 0}
			<div class="text-slate-400 text-center">
				{#if totalKeywordsSelected > 1}
					Found <span class="font-medium"
						>{totalResults} result{#if totalResults > 1}s{/if}</span
					> for this combination of keywords
				{:else}
					Found <span class="font-medium"
						>{totalResults} result{#if totalResults > 1}s{/if}</span
					> for this keyword.
				{/if}
			</div>
		{:else}
			<div>&nbsp;</div>
		{/if}
	</div>
</div>

<style>
	.wrap-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
