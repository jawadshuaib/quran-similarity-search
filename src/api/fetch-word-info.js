import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to get the lemma and associated Quranic words
* User can search for either the lemma or the Quranic word
* req ?search=الله
* { "results": [
    {
        "lemma": "الله",
        "connected_words": "بِاللَّهِ,اللَّهُ,وَلِلَّهِ,فَاللَّهُ,وَاللَّهُ,فَلِلَّهِ,وَاللَّهِ,اللَّهَ,لِلَّهِ,اللَّهِ"
    }]
  }
*/
const wordInfo = async (keyword) => {   
  
  const url = `${baseURL}/word_info.php?search=${keyword}`;  

  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (json.error !== undefined) {
      throw new Error('Invalid search parameters provided.');
    }
    
    return {      
      result: json
    };
  }
  catch (error) {  
    return { error }
  }
}

export default wordInfo;