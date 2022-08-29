import { writable } from 'svelte/store';

/**
 * Keep track of the surah/aya searched
 * @param {Object} surah
 */

const setSearched = (surah = { surahNumber: 0, ayatCount: 0, arabicName: '', englishName: '', type: '', ayaNumber: 0 }) => {
  searched.set(surah);
}

const searched = writable({ surahNumber: 0, ayatCount: 0, arabicName: '', englishName: '', type: '', ayaNumber: 0 });

export { setSearched, searched };