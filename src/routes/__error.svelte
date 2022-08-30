<script>
	import { page } from '$app/stores';

	let msg = '';
	if ($page.status == '404') {
		msg =
			'The page you are looking for does not exist. Please make sure you entered the correct path.';
	} else if ($page.status == '500') {
		msg =
			'Internal server error occured. Please try again. If the problem persists, please contact us.';
	} else {
		msg = 'Sorry, something went wrong. Please try again.';
	}
</script>

<div
	class="p-4 mb-4 text-xl text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center mt-5"
	role="alert"
>
	<span class="font-medium">{$page.status}:</span>
	{msg}
</div>
