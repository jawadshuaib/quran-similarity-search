<script>
	import { page } from '$app/stores';
	import { envVariables } from '../../scripts/env-variables';
</script>

{#if $page.url.host == 'localhost:3000' && envVariables.isDeveloperMode}
	<div class="bg-pink-600 p-3 text-white text-2xl">Currently in Developer Mode</div>
{/if}
