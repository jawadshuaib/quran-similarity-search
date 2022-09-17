import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to get cloest related lemmas. We get these by finding semnatically similar lemmas
* User can search for either the lemma or the Quranic word
* req ?search=رحمن
* {
  "keyword": "رحمن",
  "is_lemma": true,
  "relatives": "رحم,رحمة,رحيم"
}
*/
const lemmaRelatives = async (lemma) => {   
  
  const url = `${baseURL}/lemma_relatives.php?search=${lemma}`;  

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

export default lemmaRelatives;