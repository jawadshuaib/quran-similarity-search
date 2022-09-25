// Temporarily store keywords picked by the user
import { writable } from 'svelte/store';


/**
 * Keep track of the keywords picked by the user
 * @param {String} keyword
 */

 const setKeywordsPicked = (keywords) => {
  keywordsPicked.set(keywords);    
}

let keywordsPicked = writable([]);

export { setKeywordsPicked, keywordsPicked };
