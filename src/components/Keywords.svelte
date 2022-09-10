<script>
	// Internal
	import { goto } from '$app/navigation';

	export let verse;

	let canSearch = false;
	let keywords = [];
	let el;
	verse.arabic_lemmatized_without_stop_words = 'ABC XYZ';
	if (verse.arabic_lemmatized_without_stop_words != null) {
		keywords = verse.arabic_lemmatized_without_stop_words.split(' ');
	}

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
		class="grid grid-cols-10 gap-2 my-2 text-2xl px-5 font-cormorant text-slate-400 text-center"
		bind:this={el}
	>
		{#each keywords as keyword, idx}
			<div
				id={idx}
				class="keyword rounded col-span-1 border-2 py-2 hover:border-orange-400 hover:border-2 hover:cursor-pointer"
			>
				{keyword}
			</div>
		{/each}
		<!-- Search button -->
		{#if canSearch}
			<div
				on:click={search}
				class="wrap-center rounded col-span-2 bg-orange-500 text-white py-2 hover:bg-orange-700 hover:cursor-pointer"
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
