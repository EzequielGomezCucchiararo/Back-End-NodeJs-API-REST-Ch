import crypto from 'crypto';

function parseCategories(categoriesMap) {
  return Object.entries(categoriesMap).reduce((categoriesAcc, [categoryName, isSet]) => {
    if (!!isSet) {
      categoriesAcc.push(categoryName);
    }

    return categoriesAcc;
  }, []);
}

export function sentencesFactory(description, categories) {
  const id = crypto.randomUUID();
  const jobPost = { id, description, categories };

  return jobPost;
}

export function parseSentences(data) {
  if (!data) {
    return [];
  }

  // TODO: Remove slice - Added in order to avoid the Quota exceeded error in FB
  const FB_READS_LIMIT_GUARD = 2;
  const jobList = data.split('\n').slice(0, FB_READS_LIMIT_GUARD);
  const jobPosts = jobList.map((element) => {
    try {
      const parsed = JSON.parse(element);
      const categories = parseCategories(parsed.cats);
      const jobPost = sentencesFactory(parsed.text, categories);

      return jobPost;

    } catch (e) {
      console.log('error');
      return null;
    }
  })

  return jobPosts;
}
