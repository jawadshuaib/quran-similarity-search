const translate = async (text) => {   
  
  const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${text}&target=en`;  
  
  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (json.error !== undefined) {
      throw new Error(json.error.message);
    }
      
    return {      
      translatedText: json.data.translations[0].translatedText
    };
  }
  catch (error) {  
    return { error }
  }
}

export default translate;