import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to find similar verses to the one entered
* req ?translation=123&surah_number=18&aya_number=109&results=5&method=tokenized
* result 
{
	info: {
		"name": "Itani - English",						
		"source": "https://tanzil.net/trans/",
		"method": "cosine_similarity_translation_tokenized",
		"surah_number": "18",
		"aya_number": "109",
		"translation": "Say, &ldquo;If the ocean were ink for the words of my Lord, the ocean would run out, before the words of my Lord run out,&rdquo; even if We were to bring the like of it in addition to it.",
	},
	"similar": [
		{ 
			"surah_number": 26, 
			"aya_number": 16,
			"translation": "Go to Pharaoh, and say, &lsquo;We are the Messengers of the Lord of the Worlds.",
			"similarity": 0.6106
		}
	]
}
*/

const similarVerses = async (options) => { 

  const url = `${baseURL}/similar.php?translation=${options.translationId}&surah_number=${options.surahNumber}&aya_number=${options.ayaNumber}&results=${options.results}&method=${options.method}`;    
	
  try {
    const response = await fetch(url);
    const surah = await response.json();

    if (surah.error !== undefined) {
      throw new Error('Invalid search parameters provided.');
    }
    
    return {
      info: surah.info,
      similar: surah.similar
    };
  }
  catch (error) {  
    return { error }
  }
}

export default similarVerses;