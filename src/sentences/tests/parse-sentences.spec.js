import { parseSentences } from '../parse-sentences.js';

describe('parseSentences', () => {
  describe('when receives an invalid "data" parameter', () => {
    it('should return an empty array', () => {
      const data = '{"text...}';
      const sentences = parseSentences(data);

      expect(sentences).toEqual([]);
    });
  });

  describe('when receives no "data" parameter', () => {
    it('should return an empty array', () => {
      const sentences = parseSentences();

      expect(sentences).toEqual([]);
    });
  });

  describe('when receives a valid "data" parameter', () => {
    describe('if all the elements are valid', () => {
      it('should return a proper result', () => {
        const data = '{"text": "Sie sind offen...", "cats": {"responsibility": 0 }}';
        const sentences = parseSentences(data);

        expect(sentences).toHaveLength(1);
      });
    });

    describe('if there are invalid elements', () => {
      it('should not add them in the returned result', () => {
        const data = '{"text": "Sie sind offen...", "cats": {"responsibility": 0 }}\n{ "text": "I am broken... }';
        const sentences = parseSentences(data);

        expect(sentences).toHaveLength(1);
      });
    });
  });
});
