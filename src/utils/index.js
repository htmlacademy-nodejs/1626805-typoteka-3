'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {MAX_ANNOUNCE_COUNT} = require(`../constants`);

//  Максимум и минимум включаются
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDateBeforeByMonth(monthRange = 3) {
  // get count day now - 3 months
  const today = new Date();
  const finalDate = new Date(today);
  const currentMonth = today.getMonth();

  finalDate.setMonth(currentMonth - monthRange);

  const getRandomTime = getRandomIntInclusive(+finalDate, +today);

  return new Date(getRandomTime);
}

// data: Date
// return YYYY-MM-DD hh:mm:ss
function formateDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth()}`.padStart(2, `0`);
  const day = `${date.getDate()}`.padStart(2, `0`);
  const hours = `${date.getHours()}`.padStart(2, `0`);
  const minutes = `${date.getMinutes()}`.padStart(2, `0`);
  const seconds = `${date.getSeconds()}`.padStart(2, `0`);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateText(maxSentencesCount, items) {
  const randomCount = getRandomIntInclusive(1, maxSentencesCount);

  return [...Array(randomCount)].map(() => {
    const randomIndex = getRandomIntInclusive(0, items.length - 1);

    return items[randomIndex];
  }).join();
}

function generateRandomItems(items) {
  const randomCount = getRandomIntInclusive(1, items.length - 1);

  // Save the index for uniqueness
  const temp = {};

  return [...Array(randomCount)].map(() => {
    const randomIndex = getRandomIntInclusive(1, items.length - 1);

    if (!temp[randomIndex]) {
      temp[randomIndex] = true;
      return items[randomIndex];
    }

    return null;
  }).filter((item) => item);
}

function splitString(rawText, divider) {
  return rawText.split(divider);
}

function asyncWriteFile(pathFile, data) {
  return new Promise((res, rej) => {
    fs.writeFile(pathFile, data, (err) => {
      if (err) {
        rej(`Ошибка при записи файла...`);
      }

      res(`Файл создан.`);
    });
  });
}

function asyncReadFile(pathFile) {
  return new Promise((res, rej) => {
    fs.readFile(pathFile, `utf8`, (err, data) => {
      if (err) {
        console.log(`pathFile - `, pathFile);
        rej(`Ошибка чтения файла...`);
      }

      res(data);
    });
  });
}

function getRandomSubarray(items) {
  items = items.slice();
  let count = getRandomIntInclusive(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomIntInclusive(0, items.length - 1), 1
        )
    );
  }
  return result;
}

function getPathFile(directory, fileName) {
  return path.join(__dirname, `..`, directory, fileName);
}

// return [ { id: nanoId, text: string } ]
function generateComments(comments, maxIdLength) {
  return comments.reduce((acc, cur) => {
    return [...acc, {id: nanoid(maxIdLength), text: cur}];
  }, []);
}

const generatePublications = async (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => {
    const randomTitleIndex = getRandomIntInclusive(0, titles.length - 1);

    return {
      title: titles[randomTitleIndex],
      announcement: generateText(MAX_ANNOUNCE_COUNT, sentences),
      text: generateText(sentences.length - 1, sentences),
      categories: getRandomSubarray(categories),
      comments: getRandomSubarray(comments.map((item) => ({text: item})))
    };
  });
};

module.exports = {
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateRandomItems,
  splitString,
  asyncWriteFile,
  asyncReadFile,
  getRandomSubarray,
  getPathFile,
  generateComments,
  generatePublications
};
