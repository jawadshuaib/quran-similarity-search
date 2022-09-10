<script>
	export let action;
	export let text;
	export let active = false;
</script>

{#if active}
	<button
		class="my-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
		on:click={action}
	>
		{text}
	</button>
{:else}
	<button class="my-5 bg-slate-300 text-slate-100 py-2 px-4 font-bold rounded">{text}</button>
{/if}
