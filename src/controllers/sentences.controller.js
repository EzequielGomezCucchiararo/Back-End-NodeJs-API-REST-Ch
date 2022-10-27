import { sentencesRepository } from '../repositories/sentences.repository.js';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORTING_ORDER = 'desc';

// TODO: Improve error handling
const getAllSentences = async (req, res) => {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_PAGE_SIZE,
    sortingOrder = DEFAULT_SORTING_ORDER,
  } = req.query;

  try {
    const sentences = await sentencesRepository.getAll({page, limit, sortingOrder });

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
  const { payload } = body;

  // TODO: Basic validation here (improve with some modeling tool)
  if (!payload.description) {
    return;
  }

  try {
    const createdSentence = await sentencesRepository.create(payload);
    res.status(201).send({ status: "OK", data: createdSentence });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }

}

const update = async (req, res) => {
  const { id } = req.params;
  const { payload } = req.body;

  try {
    const updatedSentence = await sentencesRepository.update({ id, payload });

    res.status(204).send({ status: 'OK', data: updatedSentence });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await sentencesRepository.remove(id);

    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const sentencesController = {
  getAllSentences,
  getById,
  create,
  update,
  remove
}
