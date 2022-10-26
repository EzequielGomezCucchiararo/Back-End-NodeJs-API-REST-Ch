import * as dotenv from 'dotenv';
import { db, deleteCollection } from '../firebase.js';
import { parseSentences } from './sentences.factory.js';
import { readFile } from '../utils/readFile.js';

dotenv.config();

const SENTENCES_COLLECTION_NAME = 'sentences';

(async () => {
  try {
    const filePath = process.argv[2];
    const rawSentences = readFile(filePath);
    const sentences = parseSentences(rawSentences);

    await deleteCollection(db, SENTENCES_COLLECTION_NAME);

    const sentencesCollection = db.collection(SENTENCES_COLLECTION_NAME);

    sentences.forEach(async (jobPost) => {
      const jobPostRef = sentencesCollection.doc(jobPost.id);
      await jobPostRef.set(jobPost);
    });

    console.log('Sentences added to the DDBB');
  } catch (e) {
    console.log('Error:', e.stack);
  }
})();
