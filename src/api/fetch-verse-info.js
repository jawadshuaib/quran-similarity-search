import { envVariables, defaultValues } from '../scripts/env-variables';
	// Stores
	import { translations } from '../scripts/common-scripts';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to get the verse specified
* req ?surah_number=4&aya_number=1
* result {surah_number: 4, aya_number: 1, arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', english_text: 'In the Name of Allaah, the Most Gracious, the Most Merciful.'}
*/
const verseInfo = async (surahNumber=0, ayaNumber=0) => { 

  const url = `${baseURL}/verse.php?translation=${translations.english.translationId}&surah_number=${surahNumber}&aya_number=${ayaNumber}`  
  
  try {
    const response = await fetch(url);
    const surah = await response.json();

    if (surah.surah_number === undefined) {
      throw new Error('Verse not found.');
    }
    
    return {
      surahNumber: surah.surah_number,
      ayaNumber: surah.aya_number,
      arabicText: surah.arabic_text,
      englishText: surah.english_text
    };
  }
  catch (error) {  
    return { error }
  }
}

export default verseInfo;