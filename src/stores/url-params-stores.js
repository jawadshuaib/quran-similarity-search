// Keep a store of the verses searched in the url params
import { writable } from 'svelte/store';

/**
 * Keep track of the surah/aya searched
 * @param {Object} surah
 */

const setUrlParams = (surah = { surahNumber: 0, ayaNumber: 0 }) => {
  urlParams.set(surah);
}

const urlParams = writable({ surahNumber: 0, ayaNumber: 0 });

export { setUrlParams, urlParams };