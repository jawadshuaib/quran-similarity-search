// function areThereAnySavedVerses() {
//   const saved = getSavedVerses ();
//   if (saved == null) return false;
//   return saved.length > 0;
// }

// // Check if a verse is saved in the local storage
// function isVerseSaved (surahNumber=0, ayaNumber=0) {
//   const saved = getSavedVerses ();
//   if (saved == null) return false;
//   const lookup = {surah_number: `${surahNumber}`, aya_number: `${ayaNumber}`};    
//   // console.log ("Look up:", JSON.stringify(lookup), "Is it saved?", saved.includes(JSON.stringify(lookup)));
//   return saved.includes(JSON.stringify(lookup));  
// }

// // Get a JSON list of all saved verses
// function getSavedVerses() {
//   return localStorage.getItem('saved');
// }

// // Save a list of all saved verses to local storage
// function saveVerse(surahNumber=0, ayaNumber=0) {
//   const saved = getSavedVerses ();
//   const objToSave = {surah_number: `${surahNumber}`, aya_number: `${ayaNumber}`};
//   if (saved == null) {
//     localStorage.setItem('saved', JSON.stringify(objToSave));
//   } else {      
//     localStorage.setItem('saved', getSavedVerses() + ',' + JSON.stringify(objToSave));
//   }	
// }

// // Remove a verse from the local storage
// function removeVerse(surahNumber=0, ayaNumber=0) {
//   const saved = getSavedVerses ();
//   // if (saved == null) return;
//   const lookup = {surah_number: `${surahNumber}`, aya_number: `${ayaNumber}`};
//   let newObj = saved.replace(JSON.stringify(lookup), '');  
//   // remove leading or trailing commas
//   console.log (newObj);
//   newObj = newObj.replace(/(^,)|(,$)/g, '');
//   newObj = newObj.replace(',,', ',');
//   if (newObj == '') {
//     localStorage.removeItem('saved');
//   } else {
//     localStorage.setItem('saved', newObj);
//   }  
// }


// // This will get the last searched surah:aya from the local storage
// function getSearchFromLocalStorage() {
//   return localStorage.getItem('search');
// }

// // This will set the last searched surah:aya in local storage
// function saveSearchToLocalStorage(search) {
// 	localStorage.setItem('search', search);
// }

function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Checks for 0 to 9 digits and the character :
function isNumberKey(str) {
  const ascii = str.charCodeAt(0)  
  var charCode = ascii;
  if (charCode != 58 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}

// export { areThereAnySavedVerses, isVerseSaved, getSavedVerses, saveVerse, removeVerse, getSearchFromLocalStorage, saveSearchToLocalStorage, decodeHtml, isNumberKey };
export { decodeHtml, isNumberKey };