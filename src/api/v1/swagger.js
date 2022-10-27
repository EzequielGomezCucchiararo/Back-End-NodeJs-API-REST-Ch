import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Posts API',
      version: '1.0.0'
    },
  },
  apis: [
    'src/api/v1/routes/index.routes.js',
    'src/services/sentences.repository.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Serving documentation API v1.0.0 at http://localhost:${port}/api/v1/docs`)
};

export const swaggerDocsV1 = swaggerDocs;
