<script>
	// Internal
	import { page } from '$app/stores';

	// Components
	import DevMode from '../components/Utilities/DevMode.svelte';
	import SettingsBar from '../components/Navigation/SettingsBar.svelte';
	import Nav from '../components/Navigation/Nav.svelte';
	import Transition from '../components/Transition.svelte';

	// Scripts
	import { envVariables } from '../scripts/env-variables';

	const headerImage = `${envVariables.imageProxy}/pattern-alhambra.webp`;
</script>

<svelte:head><title>Linguistic Analysis of the Quran</title></svelte:head>
<!-- Show this bar when in dev mode -->
<DevMode />
<div
	class="bg-cover lg:h-80 md:h-60 sm:h-28 h-10 w-full shadow-lg hue-rotate-30"
	style="background-image: url('{headerImage}')"
/>
<div class="p-8 max-w-6xl mx-auto bg-white">
	<Nav />
	<Transition url={$page.url}>
		<slot />
	</Transition>
</div>
{#if $page.url.pathname === '/'}
	<SettingsBar />
{/if}

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
