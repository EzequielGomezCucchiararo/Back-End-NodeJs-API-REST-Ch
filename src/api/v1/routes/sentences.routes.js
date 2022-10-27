import express from 'express';
import { sentencesController } from '../../../controllers/sentences.controller.js';

const router = express.Router();

router.get('/', sentencesController.getAllSentences);
router.get('/:id', sentencesController.getById);
router.post('/', sentencesController.create);

export const sentencesRoutes = router;
