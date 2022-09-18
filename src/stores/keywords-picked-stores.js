// Temporarily store keywords picked by the user
import { writable } from 'svelte/store';


/**
 * Keep track of the keywords picked by the user
 * @param {Array} keywords
 */

 const setKeywordsPicked = (keywords) => {
  keywordsPicked.set(keywords);  
  console.log('store', keywords);
}

let keywordsPicked = writable([]);

export { setKeywordsPicked, keywordsPicked };
