import { writable } from 'svelte/store';

/**
 * Store similar verses found
 * @param {Object} info
 * @param {Object} similar
 */

const setSimilarVerseStore = (info = {}, similar = []) => {
  similarVerseStore.set({ info, similar });
};

const similarVerseStore = writable({ info: {}, similar: [] });

export { setSimilarVerseStore, similarVerseStore };