<!-- Show related lemmas to the provided lemma -->
<script>
	import lemmaRelatives from '../api/fetch-lemma-relatives';

	export let lemmas;

	$: relatives = [];
	let promises = [];
	let resolution;

	$: lemmas,
		((_) => {
			if (lemmas == '') {
				return;
			}
			lemmas = lemmas.split(',');
			// Reset
			relatives = [];
			promises = [];

			// Fetch related lemmas
			lemmas.forEach((lemma) => {
				promises.push(lemmaRelatives(lemma));
			});

			resolution = Promise.all(promises).then((results) => {
				results.forEach((json) => {
					const result = json.result;
					result.lemma_relatives.split(',').forEach((relative) => {
						relatives.push(relative);
					});
				});
			});
		})();
</script>

{#await resolution}
	<div class="text-center animate-bounce text-3xl">...</div>
{:then}
	{#if relatives.length}
		<div class="text-center">
			Possible related terms:
			{#each relatives as relative, idx}
				<span class="text-xl">{relative}</span>
				{#if idx < relatives.length - 1}
					,
				{/if}
			{/each}
		</div>
	{/if}
{/await}
