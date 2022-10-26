import * as dotenv from 'dotenv';
import { readFile } from '../utils/readFile.js';
import { importSentencesToFirestore } from '../sentences/import-sentences.js';
import { parseSentences } from '../sentences/sentences.factory.js';

dotenv.config();

const filePath = process.argv[2];
const rawSentences = readFile(filePath);
const sentences = parseSentences(rawSentences);

importSentencesToFirestore(sentences).then(() => {
  console.log('Sentences imported to the DB');
}).catch((error) => {
  console.log(error);
});
