import { sentencesService } from '../services/sentences.service.js';

import { db, clearCollection } from '../firebase.js';

export const importSentencesToFirestore = async (sentences) => {
  try {
    await clearCollection(db, sentencesService.SENTENCES_COLLECTION_NAME);

    const sentencesCollection = db.collection(sentencesService.SENTENCES_COLLECTION_NAME);

    sentences.forEach(async (sentence) => {
      const sentenceRef = sentencesCollection.doc(sentence.id);
      await sentenceRef.set(sentence);
    });
  } catch (error) {
    throw new Error('Error: the sentences could not be imported into the database');
  }
};
