import * as dotenv from 'dotenv';
import { SENTENCES_COLLECTION_NAME } from './sentences.factory.js';
import { parseSentences } from './sentences.factory.js';
import { db, clearCollection } from '../firebase.js';
import { readFile } from '../utils/readFile.js';

dotenv.config();

(async () => {
  try {
    const filePath = process.argv[2];
    const rawSentences = readFile(filePath);
    const sentences = parseSentences(rawSentences);

    await clearCollection(db, SENTENCES_COLLECTION_NAME);

    const sentencesCollection = db.collection(SENTENCES_COLLECTION_NAME);

    sentences.forEach(async (sentence) => {
      const sentenceRef = sentencesCollection.doc(sentence.id);
      await sentenceRef.set(sentence);
    });

    console.log('Sentences imported to the DB');
  } catch (e) {
    console.log('Error:', e.stack);
  }
})();
