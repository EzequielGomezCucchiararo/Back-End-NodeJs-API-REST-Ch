import { clearCollection, db } from '../services/firebase.service.js';

const pageSize = 1;

const SENTENCES_COLLECTION_NAME = 'sentences';

const getAll = async (page = 1, sortingOrder = 'desc') => {
  try {
    const sentencesCollectionRef = db.collection(SENTENCES_COLLECTION_NAME);

    const query = sentencesCollectionRef
      .orderBy('description', sortingOrder)
      .limit(pageSize)
      .offset(pageSize * (page - 1))

    const sentencesSnapshot = await query.get();
    const sentences = sentencesSnapshot.docs.map((doc) => doc.data());

    return sentences;
  } catch (error) {
    throw error;
  }
};

export const sentencesRepository = {
  SENTENCES_COLLECTION_NAME,
  getAll,
};
