import { SENTENCES_COLLECTION_NAME } from './parse-sentences.js';
import { db, clearCollection } from '../firebase.js';

export const importSentencesToFirestore = async (sentences) => {
  try {
    await clearCollection(db, SENTENCES_COLLECTION_NAME);

    const sentencesCollection = db.collection(SENTENCES_COLLECTION_NAME);

    sentences.forEach(async (sentence) => {
      const sentenceRef = sentencesCollection.doc(sentence.id);
      await sentenceRef.set(sentence);
    });
  } catch (error) {
    throw new Error('Error: the sentences could not be imported into the database');
  }
};
