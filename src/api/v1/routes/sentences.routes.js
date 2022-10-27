import express from 'express';
import { sentencesController } from '../../../controllers/sentences.controller.js';

const router = express.Router();

router.get('/', sentencesController.getAllSentences);

export const sentencesRoutes = router;
