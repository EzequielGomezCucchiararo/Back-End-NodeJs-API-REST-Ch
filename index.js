import * as fs from 'fs';
import JobPost from './job-posts/domain/JobPost.js'

function parseCategories(categoriesMap) {
  return Object.entries(categoriesMap).reduce((categoriesAcc, [categoryName, isSet]) => {
    if (!!isSet) {
      categoriesAcc.push(categoryName);
    }

    return categoriesAcc;
  }, []);
}

function parseJobPostsTxt(data) {
  if (!data) return [];

  const jobList = data.split('\n');
  const jobPosts = jobList.reduce((acc, element) => {
    try {
      const parsed = JSON.parse(element);
      const categories = parseCategories(parsed.cats);
      const jobPost = JobPost.new(parsed.text, categories);

      acc.push(jobPost);
    } catch (e) {
      console.log('error');
    }

    return acc;
  }, [])

  return jobPosts;
}

function readTxt(pathToFile, encoding = 'utf8') {
  try {
    return fs.readFileSync(pathToFile, encoding)
  } catch (e) {
    console.log('Error:', e.stack);
    return null;
  }
}

try {
  const data = readTxt('sentences.jsonl.txt');
  const jobPosts = parseJobPostsTxt(data);

  console.log('jobPosts', jobPosts)

}catch(e) {
  console.log('Error:', e.stack);
}
