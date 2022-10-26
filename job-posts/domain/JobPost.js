import * as crypto from 'crypto';

export default class JobPost {
  constructor(id, description, categories) {
    this.id = id;
    this.description = description;
    this.categories = categories;
  }

  static new(description, categories) {
    const id = crypto.randomUUID();
    const jobPost = new JobPost(id, description, categories);

    return jobPost;
  }
}
