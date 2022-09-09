<script>
	// Scripts
	import { translationMethodsAvailable } from '../scripts/common-scripts';
	// Stores
	import { settingsStored } from '../stores/settings-stores';

	let selected;
	settingsStored.translationMethod.subscribe((value) => {
		selected = value;
	});
</script>

<!-- <select
	class="w-full text-center text-xl text-gray-700 bg-gray-200 rounded-lg"
	bind:value={translationMethod}
>
	{#each translationMethodsAvailable as method, index}
		<option value={index}>{method}</option>
	{/each}
</select> -->
<!-- if -->
<!-- {#if selected === 0} -->
{#if selected !== null}
	<div class="text-slate-400">
		We are currently using <span class="font-medium"
			>{@html translationMethodsAvailable[selected].title}</span
		>
		to find similar verses. You can change this in the
		<a href="/settings" class="underline">settings</a>.
	</div>
{/if}
