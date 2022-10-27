import { sentencesRepository } from '../repositories/sentences.repository.js';

const getAllSentences = async (req, res) => {
  try {
    const sentences = await sentencesRepository.getAll();

    res.status(200).send({ status: 'OK', data: sentences });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const sentencesController = {
  getAllSentences,
}
