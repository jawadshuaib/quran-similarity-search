import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

const translate = async (text) => {   
    
  const url = `${baseURL}/google-translate.php?text=${text.trim()}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (json.error !== undefined) {
      throw new Error(json.error.message);
    }
    console.log(json);  
    return json.translated;
  }
  catch (error) {  
    return { error }
  }
}

export default translate;