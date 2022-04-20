'use strict';

const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateRandomItems,
  textToArrayByDivider,
  asyncWriteFile,
  asyncReadFile,
  generateComments
} = require(`../../utils`);
const chalk = require(`chalk`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);

const MAX_ANNOUNCE_COUNT = 5;
const MAX_ITEMS = 1000;

// generateObject
const generatePublication = async () => {
  const titlesContent = await asyncReadFile(getPathToData(`titles.txt`));
  const sentencesContent = await asyncReadFile(getPathToData(`sentences.txt`));
  const categoriesContent = await asyncReadFile(getPathToData(`categories.txt`));
  const commentsContent = await asyncReadFile(getPathToData(`comments.txt`));

  const titlesList = textToArrayByDivider(titlesContent, `\n`);
  const sentencesList = textToArrayByDivider(sentencesContent, `\n`);
  const categoriesList = textToArrayByDivider(categoriesContent, `\n`);
  const commentsList = textToArrayByDivider(commentsContent, `\n`);

  const randomIndexForTitle = getRandomIntInclusive(0, titlesList.length - 1);
  const datePublication = getDateBeforeByMonth();
  const comments = generateRandomItems(commentsList);
  const categories = generateRandomItems(categoriesList);

  return {
    id: nanoid(5),
    title: titlesList[randomIndexForTitle],
    createdDate: formateDate(datePublication),
    announce: generateText(MAX_ANNOUNCE_COUNT, sentencesList),
    fullText: generateText(sentencesList.length - 1, sentencesList),
    category: categories,
    comments: generateComments(comments, MAX_ID_LENGTH)
  };
};

const getPathToData = (fileName) => {
  return path.join(__dirname, `../..`, `data`, fileName);
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const [value] = count;
    const publicationsCount = parseInt(value, 10);
    const isCountNaN = Number.isNaN(publicationsCount);
    let result = [];

    // Если переданное значение не является числом
    if (isCountNaN) {
      const publication = await generatePublication();
      result.push(publication);
    }

    // Если переданное значение является числом и больше MAX_ITEMS
    if (!isCountNaN && publicationsCount > MAX_ITEMS) {
      console.info(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.error);
    }

    // Если переданное значение является числом и не больше MAX_ITEMS
    if (!isCountNaN && publicationsCount <= MAX_ITEMS) {
      result = await Promise.all([...Array(publicationsCount)].map(async () => await generatePublication()));
    }

    const content = JSON.stringify(result, ``, 2);

    try {
      const message = await asyncWriteFile(`mock.json`, content);

      console.log(chalk.green(message));
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};
