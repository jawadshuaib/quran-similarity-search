const envVariables = {  
  isDeveloperMode: false,
  corsAnywhereProxy: 'https://glacial-brushlands-90091.herokuapp.com/',
  isDeveloperEndPoint: 'http://localhost/quran/api',
  isProductionEndPoint: 'http://18.220.86.213/api' // Alternative: https://quran-similarity-score.000webhostapp.com/api   
};


const defaultValues = {  
  results: 5, // Default number of results requested from the API
  search: '1:1' // Default surah number and aya number when the app loads
};

export { envVariables, defaultValues };