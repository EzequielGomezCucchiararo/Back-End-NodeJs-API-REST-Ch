import * as dotenv from 'dotenv';
import express from 'express';
import apicache from 'apicache';
import { swaggerDocsV1 } from './api/v1/swagger.js';
import { routesApiV1 } from './api/v1/routes/index.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(cache('2 minutes'));
app.use(express.json());
app.use('/api/v1', routesApiV1);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  swaggerDocsV1(app, PORT);
});
