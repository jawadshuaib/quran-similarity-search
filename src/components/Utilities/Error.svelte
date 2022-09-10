<script>
	export let title;
	export let description;
	export let type;

	title = title || 'Error';
	description = description || 'Sorry, something went wrong. Please try again.';
	type = type || 'error';

	const types = {
		error: 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800',
		notice: 'text-orange-700 bg-orange-100 dark:bg-orange-200 dark:text-orange-800'
	};

	let typeClass = '';
	if (types[type] !== undefined) {
		typeClass = types[type];
	}
</script>

<div class="p-4 mb-4 text-xl rounded-lg text-center mt-5 {typeClass}" role="alert">
	<span class="font-medium">{title}:</span>
	{description}
</div>
