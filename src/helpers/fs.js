'use strict';

const fs = require(`fs/promises`);

const readFile = async (filePath) => fs.readFile(filePath, `utf8`);
const writeToFile = async (path, content) => await fs.writeFile(path, content);

module.exports = {
  writeToFile,
  readFile
};
