import { envVariables } from '../scripts/env-variables';

const baseURL = `${envVariables.isDeveloperMode ? envVariables.isDeveloperEndPoint : envVariables.corsAnywhereProxy + envVariables.isProductionEndPoint}`;

/**
* API to find similar verses to the one entered
* req ?translation=789&surah_number=7&aya_number=34&method=arabic_lemmatized
* result 
{
"info": {
	"name": "Arabic (Simple)",						
	"source": "https://tanzil.net/download/",
	"method": "cosine_similarity_arabic_lemmatized",
	"surah_number": "7",
	"aya_number": "34",
	"quranic_text": "وَلِكُلِّ أُمَّةٍ أَجَلٌ ۖ فَإِذَا جَاءَ أَجَلُهُمْ لَا يَسْتَأْخِرُونَ سَاعَةً ۖ وَلَا يَسْتَقْدِمُونَ",
	"minimal": "ولكل أمة أجل فإذا جاء أجلهم لا يستأخرون ساعة ولا يستقدمون",
	"arabic_lemmatized": "كل أمة أجل إذا جاء أجل لا يستأخرون ساعة لا يستقدمون",
	"arabic_lemmatized_without_stop_words": "أمة جاء يستأخرون ساعة يستقدمون",
	"translation": "For every nation is an appointed time. When their time has come, they cannot delay it by one hour, nor can they advance it."
},
"similar": [
	{ 
		"surah_number": 10, 
		"aya_number": 49,
		"quranic_text": "قُل لَّا أَمْلِكُ لِنَفْسِي ضَرًّا وَلَا نَفْعًا إِلَّا مَا شَاءَ اللَّهُ ۗ لِكُلِّ أُمَّةٍ أَجَلٌ ۚ إِذَا جَاءَ أَجَلُهُمْ فَلَا يَسْتَأْخِرُونَ سَاعَةً ۖ وَلَا يَسْتَقْدِمُونَ",		
		"minimal": "قل لا أملك لنفسي ضرا ولا نفعا إلا ما شاء الله لكل أمة أجل إذا جاء أجلهم فلا يستأخرون ساعة ولا يستقدمون",
		"arabic_lemmatized": "قال لا ملك نفس ضر لا نفع إلا ما شاء الله كل أمة أجل إذا جاء أجل لا يستأخرون ساعة لا يستقدمون",
		"arabic_lemmatized_without_stop_words": "قال ملك ضر نفع شاء الله أمة جاء يستأخرون ساعة يستقدمون",
		"translation": "Say, &ldquo;I have no power to harm or benefit myself, except as God wills. To every nation is an appointed time. Then, when their time arrives, they can neither postpone it by one hour, nor advance it.",
		"similarity": 0.8176298175326768
	}
]
}
*/

const similarVerses = async (options) => { 
	
	const url = options.surahNumber == 1 && options.ayaNumber == 1 ? `/json/1:1.json` : `${baseURL}/similar.php?translation=${options.translationId}&surah_number=${options.surahNumber}&aya_number=${options.ayaNumber}&method=${options.method}`;    	

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