// Store settings related to the translation method
import { browser } from '$app/env';
import { writable } from 'svelte/store'
import { getTranslationMethodFromLocalStorage, saveTranslationMethodToLocalStorage } from '../scripts/local-storage-scripts';

// Get the value out of storage on load.
const stored = browser ? getTranslationMethodFromLocalStorage() : null;

// Set the stored value or a sane default.
const translationMethod = writable(stored || 0);

// Anytime the store changes, update the local storage value.
translationMethod.subscribe((value) => {
  if (browser) {
    saveTranslationMethodToLocalStorage(value);
  }
});
export const settingsStored = { 
  translationMethod
};

