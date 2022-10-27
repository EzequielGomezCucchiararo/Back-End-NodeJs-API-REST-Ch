import { sentencesService } from '../sentences.service';

describe('sentencesService', () => {
  describe('allows to parse raw sentences', () => {
    describe('when receives an invalid "data" parameter', () => {
      it('should return an empty array', () => {
        const data = '{"text...}';
        const sentences = sentencesService.parseSentences(data);

        expect(sentences).toEqual([]);
      });
    });

    describe('when receives no "data" parameter', () => {
      it('should return an empty array', () => {
        const sentences = sentencesService.parseSentences();

        expect(sentences).toEqual([]);
      });
    });

    describe('when receives a valid "data" parameter', () => {
      describe('if all the elements are valid', () => {
        it('should return a proper result', () => {
          const data = '{"text": "Sie sind offen...", "cats": {"responsibility": 0 }}';
          const sentences = sentencesService.parseSentences(data);

          expect(sentences).toHaveLength(1);
        });
      });

      describe('if there are invalid elements', () => {
        it('should not add them in the returned result', () => {
          const data = '{"text": "Sie sind offen...", "cats": {"responsibility": 0 }}\n{ "text": "I am broken... }';
          const sentences = sentencesService.parseSentences(data);

          expect(sentences).toHaveLength(1);
        });
      });
    });
  });
})
