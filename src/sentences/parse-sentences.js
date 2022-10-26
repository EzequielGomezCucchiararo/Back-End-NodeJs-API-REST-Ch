import { sentenceFactory } from './sentence.factory.js';

const parseCategories = (categoriesMap) => {
  return Object.entries(categoriesMap).reduce((categoriesAcc, [categoryName, isSet]) => {
    if (!!isSet) {
      categoriesAcc.push(categoryName);
    }

    return categoriesAcc;
  }, []);
}

// TODO: Move this const
export const SENTENCES_COLLECTION_NAME = 'sentences';

export const parseSentences = (data) => {
  if (!data) {
    return [];
  }

  // NOTE: Added in order to avoid the Quota exceeded error in FB
  const FB_READS_LIMIT_GUARD = 2;
  const sentences = data.split('\n').slice(0, FB_READS_LIMIT_GUARD);

  return sentences.map((element) => {
    try {
      const parsed = JSON.parse(element);
      const categories = parseCategories(parsed.cats);
      const sentence = sentenceFactory(parsed.text, categories);

      return sentence;

    } catch (e) {
      return null;
    }
  });
}
