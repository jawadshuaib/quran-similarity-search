<script>
	// Scripts
	import { translationMethodsAvailable } from '../../scripts/common-scripts';
	// Stores
	import { settingsStored } from '../../stores/settings-stores';

	let currentTranslationMethod;
	settingsStored.translationMethod.subscribe((value) => {
		currentTranslationMethod = value;
	});

	const handleOptionChange = (e) => {
		settingsStored.translationMethod.set(e.target.value);
	};
</script>

<div class="text-slate-400 p-2 max-w-6xl mx-auto text-center">
	We are currently using
	<select class="text-center text-gray-700 bg-gray-200 rounded-lg" on:change={handleOptionChange}>
		{#each translationMethodsAvailable as option, index}
			<option value={index} selected={index == currentTranslationMethod}
				>{@html option.title}</option
			>
		{/each}
	</select>
	to find similar verses. Read more about this in the
	<a href="/settings" class="underline">settings</a>.
	<div>This is the Talal Itani translation of the Qur'an.</div>
</div>
