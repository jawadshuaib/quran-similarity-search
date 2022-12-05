import { browser } from '$app/env';

function arrayIncludesArray (arr1, arr2) {
  return arr1.some(r=> arr2.includes(r));
}

function decodeHtml(html) {
  let v = null;
  if (browser) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    v = txt.value;
  }
  return v;
}

// Checks for 0 to 9 digits and the character :
function isNumberKey(str) {
  const ascii = str.charCodeAt(0)  
  var charCode = ascii;
  if (charCode != 58 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}

// Selected or highlighted text
function getSelectedText() {
  let selectedText = null;
  if (window.getSelection().toString().length) {
    selectedText = window.getSelection().toString();
  }
  return selectedText;
}

// https://stackoverflow.com/questions/5224267/javascriptremove-arabic-text-diacritic-dynamically
function removeTashkeel(s) {
  return s.replace(/[ؐ-ًؕ-ٖٓ-ٟۖ-ٰٰۭ]/g, '');
}

function isArabic(str) {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return pattern.test(str);
}

// Default translation requested is 456. This is the id for the itani translation. Another option is 789 when requesting the Arabic lemmatized method.
// Default method for finding similar verses. Options: 'formatted', 'tokenized', 'without_stop_words', 'arabic_lemmatized', 'arabic_lemmatized_without_stop_words' or leave blank for default.  
const translations = {
  english: {    
    translationId: 456,
    title: 'English translation',
    desc: 'In this method, the English translation of the verses are compared with each other.',        
    method: 'without_stop_words'
  },
  arabic: {
    translationId: 789,
    title: 'Arabic text',
    desc: 'In this method, the verses are compared with each other based on the original language.',            
    method: 'arabic_lemmatized',
    get lemmatized () {      
      return {         
        translationId: this.translationId, 
        title: this.title,
        desc: this.desc,        
        method: this.method 
      }
    },
    get lemmatized_without_stop_words () {
      return {        
        translationId: this.translationId, 
        title: this.title + ' ' + '- <span class="underline">excluding</span> stop words',
        desc: this.desc + ' ' + 'However, we exclude the stop words (i.e conjunctions are removed) when making the comparison.',                
        method: 'arabic_lemmatized_without_stop_words'
      }
    }
  }  
}

const translationMethodsAvailable = [
  translations.english,
  translations.arabic.lemmatized,
  translations.arabic.lemmatized_without_stop_words
]

// export { areThereAnySavedVerses, isVerseSaved, getSavedVerses, saveVerse, removeVerse, getSearchFromLocalStorage, saveSearchToLocalStorage, decodeHtml, isNumberKey };
export { getSelectedText, arrayIncludesArray, decodeHtml, isNumberKey, removeTashkeel, isArabic, translationMethodsAvailable, translations };