import crypto from 'crypto';
import { sentenceFactory } from '../sentence.factory.js';

const id = '1234567';
const description = 'sentence description A';
const categories = ['categoryA'];

jest.mock('crypto', () => ({ randomUUID: () => id }));

describe('sentenceFactory', () => {
  it('should return a valid "sentence" object', () => {
    const sentence = sentenceFactory(description, categories);

    expect(sentence).toMatchObject({
      id,
      description,
      categories
    });
  });
});
