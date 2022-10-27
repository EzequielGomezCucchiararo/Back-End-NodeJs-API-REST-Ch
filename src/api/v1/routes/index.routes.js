import express from 'express';
import { sentencesRoutes } from './sentences.routes.js';

const router = express.Router();

router.use('/sentences', sentencesRoutes);

export const routesApiV1 = router;
