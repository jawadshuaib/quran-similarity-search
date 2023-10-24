import { envVariables } from '../scripts/env-variables';

const baseURL = `${
	envVariables.isDeveloperMode
		? envVariables.isDeveloperEndPoint
		: envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint
}`;

const translate = async (text) => {
	const url = `${baseURL}/google-translate.php?text=${text.trim()}`;

	try {
		const response = await fetch(url);
		const json = await response.json();

		if (json.error !== undefined) {
			throw new Error(json.error.message);
		}

		return json.translated;
	} catch (error) {
		return { error };
	}
};

export default translate;
