// const generateUniqueId = (pattern='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
//   return pattern.replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// function getUserIdFromLocalStorage() {
//   return localStorage.getItem('userId');
// }

// function saveUserIdToLocalStorage(userId) {
// 	localStorage.setItem('userId', userId);
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

// export { generateUniqueId, getUserIdFromLocalStorage, saveUserIdToLocalStorage };
export { decodeHtml, isNumberKey };