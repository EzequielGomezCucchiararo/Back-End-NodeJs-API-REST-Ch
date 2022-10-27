import express from 'express';
import { sentencesController } from '../../../controllers/sentences.controller.js';

const router = express.Router();

router
  .get('/', sentencesController.getAllSentences)
  .get('/:id', sentencesController.getById)
  .post('/', sentencesController.create)
  .patch('/:id', sentencesController.update)
  .delete('/:id', sentencesController.remove)
  // TODO: This route can be perfectly separated from "sentence" logic
  .post('/translate', sentencesController.translate)

export const sentencesRoutes = router;
