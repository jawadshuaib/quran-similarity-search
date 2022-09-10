import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to find ayas containing keywords searched
* req ?search=حمد,الله
* { "results": [
				{	
					"surah_number": 2,						
					"aya_number": 1,						
					"quranic_text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",						
					"minimal": "الحمد لله رب العالمين",
					"arabic_lemmatized": "حمد الله رب عالم",
					"arabic_lemmatized_without_stop_words": "حمد الله رب عالم",		
					"translation": "Praise be to God, Lord of the Worlds."
				}
      ]
  }
*/
const keywordsSearch = async (keywords) => {   
  const url = `${baseURL}/keywords.php?search=${keywords}`;  

  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (json.error !== undefined) {
      throw new Error('Invalid search parameters provided.');
    }
    
    return {      
      results: json.results
    };
  }
  catch (error) {  
    return { error }
  }
}

export default keywordsSearch;