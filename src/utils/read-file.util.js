import fs from 'fs';

export function readFile(pathToFile, encoding = 'utf8') {
  try {
    return fs.readFileSync(pathToFile, encoding)
  } catch (e) {
    return null;
  }
}
