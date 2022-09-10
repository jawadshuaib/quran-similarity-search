<script>
	// Internal
	import { goto } from '$app/navigation';

	export let verse;

	let canSearch = false;
	let keywords = [];
	let el;

	// Execute the following whenever verse changes
	$: verse,
		((_) => {
			if (verse.arabic_lemmatized != null) {
				keywords = verse.arabic_lemmatized.split(' ');
				keywords = keywords.reverse();
			}
		})();

	// Select the keywords
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
		// Get keywords selected for search
		const els = el.getElementsByClassName('selected');
		let selected = '';
		[].forEach.call(els, function (el) {
			selected = selected + el.innerText + ',';
		});

		// Remove trailing comma
		selected = selected.replace(/(,$)/g, '');

		// Search for selected keywords
		goto(`/keywords/${selected}`);
	}
</script>

<div class="border-2 border-slate-50 rounded p-5 items-center">
	<div
		on:click={select}
		class="flex justify-center my-2 text-2xl px-5 font-cormorant text-slate-400 text-center"
		bind:this={el}
	>
		{#each keywords as keyword}
			<div
				class="keyword rounded flex-initial w-24 border-2 mx-2 py-2 hover:border-orange-400 hover:border-2 hover:cursor-pointer"
			>
				{keyword}
			</div>
		{/each}
		<!-- Search button -->
		{#if canSearch}
			<div
				on:click={search}
				class="wrap-center rounded flex-initial bg-orange-500 text-white px-3 py-2 hover:bg-orange-700 hover:cursor-pointer"
			>
				Search Keywords
			</div>
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
