import { clearCollection, db } from './firebase.service.js';
import { sentenceFactory } from '../factories/sentence.factory.js';
import { sentencesRepository } from '../repositories/sentences.repository.js';

const getSentencesWords = (sentences) => {
  const words = sentences.reduce((acc, sentence) => {
    const matchWordsRegex = /(\w+)/g;
    const descriptionWords = sentence.description.match(matchWordsRegex);

    return [...acc, ...descriptionWords];
  }, []);

  return words;
};

const countWordsOccurrencesArray = (words) => {
  const countWordsSet = new Map();
  const occurrences = words.reduce((acc, word) => {
    let wordCount = 1;

    if (countWordsSet.has(word)) {
      wordCount = countWordsSet.get(word) + 1;
      countWordsSet.set(word, wordCount);
    } else {
      countWordsSet.set(word, wordCount);
    }

    acc[wordCount] = acc[wordCount] ? [word, ...acc[wordCount]] : [word];

    return acc;
  }, []);

  return occurrences;
}

const getTopSentencesWords = async (topLimit) => {
  const sentences = await sentencesRepository.getAll();
  const sentencesWords = getSentencesWords(sentences);
  const wordsOccurrencesList = countWordsOccurrencesArray(sentencesWords);

  const result = [];
  let currentIndex = wordsOccurrencesList.length - 1;

  while (result.length < topLimit && currentIndex > 0) {
    if (wordsOccurrencesList[currentIndex]) {
      wordsOccurrencesList[currentIndex].forEach((word) => {
        if (result.length < topLimit) {
          result.push({ label: word, count: currentIndex });
        }
      });

      currentIndex -= 1;
    }
  }

  return result;
};

const parseCategories = (categoriesMap) => {
  return Object.entries(categoriesMap).reduce((categoriesAcc, [categoryName, isSet]) => {
    if (!!isSet) {
      categoriesAcc.push(categoryName);
    }

    return categoriesAcc;
  }, []);
}

const parseSentences = (data) => {
  if (!data) {
    return [];
  }

  // NOTE: Added in order to avoid the Quota exceeded error in FB
  const FB_READS_LIMIT_GUARD = 2;
  const sentences = data.split('\n').slice(0, FB_READS_LIMIT_GUARD);

  return sentences.reduce((acc, element) => {
    try {
      const parsed = JSON.parse(element);
      const categories = parseCategories(parsed.cats);
      const sentence = sentenceFactory({ description: parsed.text, categories });

      acc.push(sentence);
    } catch (e) {
      // TODO: Improve this
      console.log('Invalid "sentence" data to be converted');
    }

    return acc;
  }, []);
}

const bulkImport = async (sentences) => {
  try {
    await clearCollection(db, sentencesRepository.SENTENCES_COLLECTION_NAME);

    const sentencesCollection = db.collection(sentencesRepository.SENTENCES_COLLECTION_NAME);

    sentences.forEach(async (sentence) => {
      const sentenceRef = sentencesCollection.doc(sentence.id);
      await sentenceRef.set(sentence);
    });
  } catch (error) {
    throw new Error('Error: the sentences could not be imported into the database');
  }
};

export const sentencesService = {
  bulkImport,
  getTopSentencesWords,
  parseSentences,
}
