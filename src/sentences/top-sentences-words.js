import { db } from '../firebase.js';
import { SENTENCES_COLLECTION_NAME } from './parse-sentences.js';

const getSentences = async () => {
  const sentencesCollection = db.collection(SENTENCES_COLLECTION_NAME);
  const sentencesSnapshot = await sentencesCollection.get();
  const sentences = sentencesSnapshot.docs.map((doc) => doc.data());

  return sentences;
}

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

export const getTopSentencesWords = async (topLimit) => {
  const sentences = await getSentences();
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
