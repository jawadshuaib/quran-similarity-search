<script>
	import { fly } from 'svelte/transition';
	export let url;
</script>

{#key url}
	<div in:fly={{ y: -20, duration: 250, delay: 300 }}>
		<slot />
	</div>
{/key}
