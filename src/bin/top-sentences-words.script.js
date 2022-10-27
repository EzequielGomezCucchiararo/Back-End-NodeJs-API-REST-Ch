import * as dotenv from 'dotenv';
import { getTopSentencesWords } from '../sentences/top-sentences-words.js';

dotenv.config();

const topLimit = process.argv[2] || 100;

getTopSentencesWords(topLimit).then((mostRepeatedWords) => {
  console.log(`Top ${topLimit} repeated words:`);
  mostRepeatedWords.forEach((word, index) => console.log(`${index + 1}. ${word.label} (${word.count})`));
}).catch((error) => {
  console.log(error);
});
