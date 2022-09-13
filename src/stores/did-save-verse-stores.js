// Update whenever the user saves a verse
// This helps us pulse the save button in navigation
import { writable } from 'svelte/store';

const didSaveVerse = (state = false) => {
  verseSaveStatus.set(state);
}

const verseSaveStatus = writable(false);

export { didSaveVerse, verseSaveStatus };