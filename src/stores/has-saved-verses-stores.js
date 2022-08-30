// Keep a store of whether there are any verses saved
import { writable } from 'svelte/store';

const setHasSavedVerses = (state = false) => {
  hasSavedVerses.set(state);
}

const hasSavedVerses = writable(false);

export { setHasSavedVerses, hasSavedVerses };