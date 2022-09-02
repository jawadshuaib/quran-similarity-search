import { writable } from 'svelte/store';

/**
 * Keep track of when an action is loading
 * @param {Boolean} apiIsLoading
 * @param {Boolean} apiHasFinishedLoading
 */

const setLoading = (apiIsLoading = false) => {
  loading.set(apiIsLoading);
}

const loading = writable(false);

export { setLoading, loading };