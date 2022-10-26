import * as dotenv from 'dotenv';
import { db } from '../firebase.js';
import { SENTENCES_COLLECTION_NAME } from './sentences.factory.js';

dotenv.config();

(async () => {
  const limit = process.argv[2] || 100;
  const countWordsSet = new Map();
  const countWordsList = [];
  const mostRepeatedWords = [];
  const sentencesCollection = db.collection(SENTENCES_COLLECTION_NAME);
  const sentencesSnapshot = await sentencesCollection.get();

  sentencesSnapshot.docs.forEach((doc) => {
    const { description } = doc.data();
    const matchWordsRegex = /(\w+)/g;
    const descriptionWords = description.match(matchWordsRegex);

    descriptionWords.forEach((word) => {
      let wordCount = 1;

      if (!countWordsSet.has(word)) {
        countWordsSet.set(word, wordCount);
      } else {
        wordCount = countWordsSet.get(word) + 1;
        countWordsSet.set(word, wordCount);
      }

      countWordsList[wordCount] = countWordsList[wordCount] ? [word, ...countWordsList[wordCount]] : [word];
    });
  });

  let currentIndex = countWordsList.length - 1;

  while (mostRepeatedWords.length < limit && currentIndex > 0) {
    if (countWordsList[currentIndex]) {
      countWordsList[currentIndex].forEach((word) => {
        if (mostRepeatedWords.length < limit) {
          mostRepeatedWords.push({ label: word, count: currentIndex });
        }
      });

      currentIndex -= 1;
    }
  }

  console.log(`Top ${limit} repeated words:`);

  mostRepeatedWords.forEach((word, index) => console.log(`${index + 1}. ${word.label} (${word.count})`));
})();
