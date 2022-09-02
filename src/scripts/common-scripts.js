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