import * as dotenv from 'dotenv';
import { sentencesService } from '../services/sentences.service';

dotenv.config();

const topLimit = process.argv[2] || 100;

sentencesService.getTopSentencesWords(topLimit).then((mostRepeatedWords) => {
  console.log(`Top ${topLimit} repeated words:`);
  mostRepeatedWords.forEach((word, index) => console.log(`${index + 1}. ${word.label} (${word.count})`));
}).catch((error) => {
  console.log(error);
});
