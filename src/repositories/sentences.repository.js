import { db } from '../services/firebase.service.js';
import { sentenceFactory } from '../factories/sentence.factory.js';

const SENTENCES_COLLECTION_NAME = 'sentences';
const sentencesCollectionRef = db.collection(SENTENCES_COLLECTION_NAME);

const getAll = async () => {
  try {
    const sentencesSnapshot = await sentencesCollectionRef.get();
    const sentences = sentencesSnapshot.docs.map((doc) => doc.data());

    return sentences;
  } catch (error) {
    throw error;
  }
};

const getSentences = async ({ page , limit, sortingOrder } = {}) => {
  try {
    const query = sentencesCollectionRef
      .orderBy('description', sortingOrder)
      .limit(limit)
      .offset(limit * (page - 1))

    const sentencesSnapshot = await query.get();
    const sentences = sentencesSnapshot.docs.map((doc) => doc.data());

    return sentences;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const query = sentencesCollectionRef.where('id', '==', id);
    const sentence = await query.get();

    return !sentence.empty ? sentence.docs[0].data() : null;
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  const sentence = sentenceFactory(payload);

  try {
    const res = await sentencesCollectionRef.doc(sentence.id).set(sentence);

    return res;
  } catch (error) {
    throw error;
  }
};

const update = async ({ id, payload }) => {
  try {
    const res = await sentencesCollectionRef.doc(id).update(payload);

    return res;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const res = await sentencesCollectionRef.doc(id).delete();

    return res;
  } catch (error) {
    throw error;
  }
};

export const sentencesRepository = {
  SENTENCES_COLLECTION_NAME,
  getSentences,
  getById,
  create,
  remove,
  update,
  getAll
};
