const envVariables = {  
  isDeveloperMode: false,
  corsAnywhereProxy: 'https://glacial-brushlands-90091.herokuapp.com/',
  isDeveloperEndPoint: 'http://localhost/quran/api',
  isProductionEndPoint: 'http://18.220.86.213/api',
  imageProxy: 'https://quran-ml.netlify.app'
};

const defaultValues = {    
  translationMethod: 0, // 0: English, 1: Arabic, 2: Arabic without stop words
  search: '1:1' // Default surah number and aya number when the app loads
};

export { envVariables, defaultValues };