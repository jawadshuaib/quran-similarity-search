// Keep track of the keywords searched, so we can show the history of keywords searched
// on a separate page

// Store settings related to the translation method
// Internals
import { browser } from '$app/env';
import { writable } from 'svelte/store';
// Scripts
import { getKeyWordsFromLocalStorage, saveKeywordsToLocalStorage } from '../scripts/local-storage-scripts';

// Get the value out of storage on load.
const stored = browser ? getKeyWordsFromLocalStorage() : [];

// Set the stored value or a sane default.
const keywordsHistory = writable(stored);

const setKeywordsHistory = (keywords) => {
  keywordsHistory.set(keywords);
}

// Anytime the store changes, update the local storage value.
keywordsHistory.subscribe((value) => {
  if (browser) {    
    saveKeywordsToLocalStorage(value);
  }
});

export { setKeywordsHistory, keywordsHistory };