<!-- Show related lemmas to the provided lemma -->
<script>
	import lemmaRelatives from '../api/fetch-lemma-relatives';

	export let keywords;

	$: relatives = [];
	let promises = [];
	let resolution;

	$: keywords,
		((_) => {
			if (keywords == '') {
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
</script>

{#await resolution}
	<div class="text-center animate-bounce text-3xl">...</div>
{:then}
	{#if relatives.length}
		<div class="text-center">
			Semantically similar terms:
			{#each relatives as relative, idx}
				<span class="text-xl"
					><a
						href={relative.lemma}
						class="hover:underline hover: decoration-orange-400 decoration-2"
						target="_blank">{relative.lemma}</a
					></span
				>
				{#if idx < relatives.length - 1}
					,
				{/if}
			{/each}
		</div>
	{/if}
{/await}
