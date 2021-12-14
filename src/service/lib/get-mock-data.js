'use strict';

const fs = require(`fs`).promises;
const FILE_NAME = `mock.json`;
let data = [];

const getMockData = async () => {
  if (data.length) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf-8`);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.log(error);
    return error;
  }

  return data;
};

module.exports = getMockData;
