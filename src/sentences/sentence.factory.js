import crypto from 'crypto';

export const sentenceFactory = (description, categories) => {
  const id = crypto.randomUUID();
  const sentence = { id, description, categories };

  return sentence;
};
