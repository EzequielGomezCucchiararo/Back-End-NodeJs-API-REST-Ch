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

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const sentence = await sentencesRepository.getById(id);

    res.status(200).send({ status: 'OK', data: sentence });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const create = async (req, res) => {
  const { body } = req;
  const { description, categories } = body;

  // TODO: Basic validation here (improve with some modeling tool)
  if (!description) {
    return;
  }

  const payload = { description, categories };
  const createdSentence = await sentencesRepository.create(payload);

  res.status(201).send({ status: "OK", data: createdSentence });
}

export const sentencesController = {
  getAllSentences,
  getById,
  create
}
