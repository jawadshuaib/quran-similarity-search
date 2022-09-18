// Save keywords searched
function saveKeywordsToLocalStorage(keywords) {
  const stored = getKeyWordsFromLocalStorage();
  if (stored != null) {
    // Save stored in keywords
    keywords = stored + ',' + keywords;
    // Remove duplicates from keywords string
    keywords = keywords.split(',').filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    }).join(',');
  }

  if (keywords != null) {
    localStorage.setItem('keywords', keywords);
  }
}

function getKeyWordsFromLocalStorage() {
  return localStorage.getItem('keywords');
}

// Save a list of all saved verses to local storage
// Save verse separated by commas (i.e. 103:1,11:2,2:56)
function saveVerse(surahNumber=0, ayaNumber=0) {
  const saved = getSavedVerses ();
  const verse = `${surahNumber}:${ayaNumber}`;
  if (saved == null) {
    localStorage.setItem('saved', verse);
  } else {      
    localStorage.setItem('saved', getSavedVerses() + ',' + verse);
  }	
}

function areThereAnySavedVerses() {
  const saved = getSavedVerses ();
  if (saved == null) return false;
  return saved.length > 0;
}

// Check if a verse is saved in the local storage
function isVerseSaved (surahNumber=0, ayaNumber=0) {
  const saved = getSavedVerses ();
  if (saved == null) return false;

  const verse = `${surahNumber}:${ayaNumber}`;      
  return saved.includes(verse);  
}

// Get a JSON list of all saved verses
function getSavedVerses() {
  return localStorage.getItem('saved');
}

// Remove a verse from the local storage
function removeVerse(surahNumber=0, ayaNumber=0) {
  const saved = getSavedVerses ();  
  const verse = `${surahNumber}:${ayaNumber}`;
  let remainingVerses = saved.replace(verse, '');

  // remove leading or trailing commas  
  remainingVerses = remainingVerses.replace(/(^,)|(,$)/g, '');
  remainingVerses = remainingVerses.replace(',,', ',');

  if (remainingVerses == '') {
    localStorage.removeItem('saved');
  } else {
    localStorage.setItem('saved', remainingVerses);
  }  
}

// This will get the last searched surah:aya from the local storage
function getSearchFromLocalStorage() {
  return localStorage.getItem('search');
}

// This will set the last searched surah:aya in local storage
function saveSearchToLocalStorage(search) {
	localStorage.setItem('search', search);
}

// This will get the last searched surah:aya from the local storage
function getTranslationMethodFromLocalStorage() {
  return parseInt(localStorage.getItem('translation_method'));
}

// This will set the last searched surah:aya in local storage
function saveTranslationMethodToLocalStorage(id) {
	localStorage.setItem('translation_method', id);
}

export { 
  areThereAnySavedVerses, 
  isVerseSaved,
  getSavedVerses, 
  saveVerse, 
  removeVerse, 
  getSearchFromLocalStorage, 
  saveSearchToLocalStorage, 
  getTranslationMethodFromLocalStorage, 
  saveTranslationMethodToLocalStorage,
  saveKeywordsToLocalStorage,
  getKeyWordsFromLocalStorage
};