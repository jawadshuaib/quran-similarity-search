<script>
	// Internal
	import { page } from '$app/stores';

	// Components
	import Nav from '../components/Nav.svelte';
	import Transition from '../components/Transition.svelte';
</script>

<svelte:head><title>Compare Verses in the Quran</title></svelte:head>
<div
	class="bg-cover lg:h-80 md:h-60 sm:h-28 h-10 w-full shadow-lg"
	style="background-image: url('../pattern-mosque.jpeg')"
/>
<div class="p-8 max-w-6xl mx-auto">
	<Nav />
	<Transition url={$page.url}>
		<slot />
	</Transition>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
