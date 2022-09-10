<script>
	import { page } from '$app/stores';
	import Error from '../components/Utilities/Error.svelte';

	let description = '';
	let title = $page.status;
	let type = 'error';

	if ($page.status == '404') {
		description =
			'The page you are looking for does not exist. Please make sure you entered the correct path.';
	} else if ($page.status == '500') {
		description =
			'Internal server error occured. Please try again. If the problem persists, please contact us.';
	} else {
		description = 'Sorry, something went wrong. Please try again.';
	}
</script>

<Error {title} {description} {type} />
