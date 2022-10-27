import express from 'express';
import { sentencesController } from '../../../controllers/sentences.controller.js';

const router = express.Router();

router
  .get('/', sentencesController.getAllSentences)
  .get('/:id', sentencesController.getById)
  .post('/', sentencesController.create)
  .patch('/:id', sentencesController.update)
  .delete('/:id', sentencesController.remove)

export const sentencesRoutes = router;
