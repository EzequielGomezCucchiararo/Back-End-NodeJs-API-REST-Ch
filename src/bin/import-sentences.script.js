import * as dotenv from 'dotenv';
import { readFile } from '../utils/read-file.util.js';
import { sentencesService } from '../services/sentences.service.js';

dotenv.config();

const filePath = process.argv[2];
const rawSentences = readFile(filePath);
const sentences = sentencesService.parseSentences(rawSentences);

sentencesService.bulkImport(sentences).then(() => {
  console.log('Sentences imported to the DB');
}).catch((error) => {
  console.log(error);
});
