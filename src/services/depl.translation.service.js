const API_URL = 'https://api-free.deepl.com/v2/translate';
const DEFAULT_LANG = 'EN';

const translateText = async (text, lang = DEFAULT_LANG) => {
  // NOTE: No auth key generated, just a basic "mocked" service; sorry :(
  // TODO: Auth, error handling, know a bit mire how this API works
  const translation = await fetch(`${API_URL}?text=${text}&target_lang=${lang}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return translation;
};

export const deeplTranslationService = {
  translateText,
}
