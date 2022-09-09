<script>
	// // Internal
	import { page } from '$app/stores';

	// Components
	import SettingsBar from '../components/SettingsBar.svelte';
	import Nav from '../components/Nav.svelte';
	import Transition from '../components/Transition.svelte';
</script>

<svelte:head><title>Compare Verses in the Quran</title></svelte:head>
<div
	class="bg-cover lg:h-80 md:h-60 sm:h-28 h-10 w-full shadow-lg hue-rotate-30"
	style="background-image: url('pattern-alhambra.jpeg')"
/>
<div style="background-image: url('bg-white-wall.webp');  background-repeat: repeat-y repeat-x;">
	<div class="p-8 max-w-6xl mx-auto bg-white">
		<Nav />
		<Transition url={$page.url}>
			<slot />
		</Transition>
	</div>
	<div class="p-2 max-w-6xl mx-auto text-center">
		<SettingsBar />
	</div>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
