// Store settings related to the translation method
// Internals
import { browser } from '$app/env';
import { writable } from 'svelte/store'
// Scripts
import { defaultValues } from '../scripts/env-variables';
import { getTranslationMethodFromLocalStorage, saveTranslationMethodToLocalStorage } from '../scripts/local-storage-scripts';

// Get the value out of storage on load.
const stored = browser ? getTranslationMethodFromLocalStorage() : null;

// Set the stored value or a sane default.
const translationMethod = writable(stored == null ? defaultValues.translationMethod : stored);

// Anytime the store changes, update the local storage value.
translationMethod.subscribe((value) => {
  if (browser) {
    saveTranslationMethodToLocalStorage(value);
  }
});
export const settingsStored = { 
  translationMethod
};

