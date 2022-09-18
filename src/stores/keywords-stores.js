// Keep track of the keywords searched, so we can dynamically update the search results
// as user selects

// Store settings related to the translation method
// Internals
import { browser } from '$app/env';
import { writable } from 'svelte/store';
// Scripts
import { getKeyWordsFromLocalStorage, saveKeywordsToLocalStorage } from '../scripts/local-storage-scripts';

// Get the value out of storage on load.
const stored = browser ? getKeyWordsFromLocalStorage() : [];

// Set the stored value or a sane default.
const storedKeywords = writable(stored);

// Anytime the store changes, update the local storage value.
storedKeywords.subscribe((value) => {
  if (browser) {    
    saveKeywordsToLocalStorage(value);
  }
});

export { storedKeywords };