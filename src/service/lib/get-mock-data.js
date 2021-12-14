'use strict';

const fs = require(`fs`).promises;
const FILE_NAME = `mock.json`;
let data = [];

const getMockData = async () => {
  console.log(`getMockData`);

  if (data.length) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf-8`);
    data = JSON.parse(fileContent);
  } catch (e) {
    console.log(e);
    return e;
  }

  return data;
};

module.exports = getMockData;
