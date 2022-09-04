const envVariables = {  
  isDeveloperMode: false,
  corsAnywhereProxy: 'https://glacial-brushlands-90091.herokuapp.com/',
  isDeveloperEndPoint: 'http://localhost/quran/api',
  isProductionEndPoint: 'http://18.220.86.213/api' // Alternative: https://quran-similarity-score.000webhostapp.com/api 
};

const defaultValues = {
  translationId: 456, // Default translation requested. This is the id for the itani translation.
  results: 5, // Default number of results requested from the API
  search: '1:1', // Default surah number and aya number when the app loads
  method: 'without_stop_words' // Default method for finding similar verses. Options: 'formatted', 'tokenized', 'without_stop_words' or leave blank for default.
};

export { envVariables, defaultValues };