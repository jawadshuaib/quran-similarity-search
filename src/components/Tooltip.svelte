<script>
	export let title = '';
	let isHovered = false;
	let x;
	let y;
	const offset = 15;

	function mouseOver(event) {
		isHovered = true;
		x = event.pageX + offset;
		y = event.pageY + offset;
	}
	function mouseMove(event) {
		x = event.pageX + offset;
		y = event.pageY + offset;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove}>
	<slot />
</div>

{#if isHovered && title != ''}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: black;
		color: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
	}
</style>
