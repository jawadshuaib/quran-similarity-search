<!-- Show related lemmas to the provided lemma -->
<script>
	// API
	import lemmaRelatives from '../api/fetch-lemma-relatives';
	// Stores
	import { setKeywordsPicked } from '../stores/keywords-picked-stores';

	export let keywords;

	$: relatives = [];
	let keywordsToSearch = [];
	let promises = [];
	let resolution;

	$: keywords,
		((_) => {
			if (keywords == '' || typeof keywords === 'object') {
				return;
			}

			keywords = keywords.split(',');

			// Reset
			relatives = [];
			promises = [];

			// Fetch related lemmas
			keywords.forEach((keyword) => {
				promises.push(lemmaRelatives(keyword));
			});

			resolution = Promise.all(promises).then((results) => {
				results.forEach((json) => {
					const result = json.result;

					result.lemma_relatives.split(',').forEach((relative) => {
						relatives.push({ lemma: relative, url: `keywords/${relative}` });
					});
				});

				// Remove duplicates
				relatives = relatives.filter((v, i, a) => a.findIndex((t) => t.lemma === v.lemma) === i);
			});
		})();

	const handleWordClick = (e) => {
		const classes = e.target.classList;
		if (classes.contains('word')) {
			const word = e.target.innerText;
			keywordsToSearch.push(word);
			// Save in the store - note, it is used in this route itself
			setKeywordsPicked(keywordsToSearch);
		}
	};
</script>

{#await resolution}
	<div class="text-center animate-bounce text-3xl">...</div>
{:then}
	{#if relatives.length}
		<!-- Semantically similar keywords -->
		<div class="text-center">
			Semantically similar terms:
			{#each relatives as relative, idx}
				<span
					on:click={handleWordClick}
					class="word text-xl hover:cursor-pointer hover:text-orange-600"
				>
					{relative.lemma}
				</span>
				{#if idx < relatives.length - 1}
					,
				{/if}
			{/each}
		</div>
	{/if}
{/await}
