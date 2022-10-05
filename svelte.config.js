import adapter from '@sveltejs/adapter-auto';

import { config as envConfig} from 'dotenv';
envConfig();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
