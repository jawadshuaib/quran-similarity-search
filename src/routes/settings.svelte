<script>
	// Internal
	import { browser } from '$app/env';
	// Common Scripts
	import { translationMethodsAvailable } from '../scripts/common-scripts';
	import {
		saveTranslationMethodToLocalStorage,
		getTranslationMethodFromLocalStorage
	} from '../scripts/local-storage-scripts';

	import { settingsStored } from '../stores/settings-stores';

	$: currentTranslationMethod = browser ? getTranslationMethodFromLocalStorage() : null;
	const options = translationMethodsAvailable.map((method, index) => {
		return {
			id: index,
			title: method.title,
			desc: method.desc
		};
	});

	const handleOptionChange = (e) => {
		const option = options.find((option) => option.id === parseInt(e.target.value));
		// Save the index of the translation methods available to local storage.
		saveTranslationMethodToLocalStorage(option.id);
		currentTranslationMethod = option.id;

		settingsStored.translationMethod.set(option.id);
	};
</script>

<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">Settings</h1>
<div class="gap-2 py-2 text-justify">
	<div class="md:text-xl">
		<p class="mb-5">
			By default, this web application displays results based on comparison of verses as translated
			in <span class="text-orange-600">English</span>.
		</p>
		<p class="mb-5">
			However, translation can never be acutely precise. You can change this methodology to Arabic
			instead so that the verses are compared to each other based on Arabic itself.
		</p>
		<p class="mb-5">
			Additionally, you can decide whether to include Arabic stop words (i.e. conjunctions,
			prepositions) when making the comparison. Including stop words can dilute the results -
			however, in some cases it can also broaden the context.
		</p>

		<!-- Translation options -->
		{#each options as option}
			<div
				class="flex mb-3 rounded border-2 p-3 {option.id == currentTranslationMethod
					? 'bg-slate-50  border-orange-600'
					: 'bg-inherit border-white'}"
			>
				<div class="flex items-center h-5">
					<input
						type="radio"
						value={option.id}
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
						checked={option.id == currentTranslationMethod}
						on:change={handleOptionChange}
					/>
				</div>
				<div class="ml-2">
					<label for="helper-radio" class="text-gray-900">{@html option.title}</label>
					<p class="text-sm font-normal text-gray-500">
						{option.desc}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
