import crypto from 'crypto';

// TODO: Manage required parameters & errors
export const sentenceFactory = (description, categories) => {
  const id = crypto.randomUUID();
  const sentence = { id, description, categories };

  return sentence;
};
