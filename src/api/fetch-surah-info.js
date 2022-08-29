import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to check if this Surah exists
* If it exists, then we extract values for it
* req ?surah_number=4
* result {surah_number: 4, ayat_count: 176, arabic_name: 'An-Nisaa', english_name: 'The Women', type: 'Medinan'}
*/
const surahInfo = async (surahNumber) => { 

  const url = `${baseURL}/surah_info.php?surah_number=${surahNumber}`  
  
  try {
    const response = await fetch(url);
    const surah = await response.json();

    if (surah.surah_number === undefined) {
      throw new Error('Surah not found.');
    }
    
    return {
      surahNumber: surah.surah_number,
      ayatCount: surah.ayat_count,
      arabicName: surah.arabic_name,
      englishName: surah.english_name,
      type: surah.type
    };
  }
  catch (error) {  
    return { error }
  }
}

export default surahInfo;