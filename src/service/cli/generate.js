'use strict';

const path = require(`path`);
const {
  getRandomIntInclusive,
  getDateBeforeByMonth,
  formateDate,
  generateText,
  generateCategory,
  textToArrayByDivider,
  asyncWriteFile,
  asyncReadFile
} = require(`../../utils`);
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);

const MAX_ANNOUNCE_COUNT = 5;
const MAX_ITEMS = 1000;

// generateObject
const generateArticle = async () => {
  const titlesContent = await asyncReadFile(getPathToData(`titles.txt`));
  const sentencesContent = await asyncReadFile(getPathToData(`sentences.txt`));
  const categoriesContent = await asyncReadFile(getPathToData(`categories.txt`));

  const titlesList = textToArrayByDivider(titlesContent, `\n`);
  const sentencesList = textToArrayByDivider(sentencesContent, `\n`);
  const categoriesList = textToArrayByDivider(categoriesContent, `\n`);

  const randomIndexForTitle = getRandomIntInclusive(0, titlesList.length - 1);
  const datePublication = getDateBeforeByMonth();

  return {
    title: titlesList[randomIndexForTitle],
    createdDate: formateDate(datePublication),
    announce: generateText(MAX_ANNOUNCE_COUNT, sentencesList),
    fullText: generateText(sentencesList.length - 1, sentencesList),
    сategory: generateCategory(categoriesList)
  };
};

const getPathToData = (fileName) => {
  return path.join(__dirname, `../..`, `data`, fileName);
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const [value] = count;
    const countArticles = parseInt(value, 10);
    const countIsNaN = Number.isNaN(countArticles);
    let result = [];

    // Если переданное значение не является числом
    if (countIsNaN) {
      const article = await generateArticle();
      result.push(article);
    }

    // Если переданное значение является числом и больше MAX_ITEMS
    if (!countIsNaN && countArticles > MAX_ITEMS) {
      console.info(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.error);
    }

    // Если переданное значение является числом и не больше MAX_ITEMS
    if (!countIsNaN && countArticles <= MAX_ITEMS) {
      result = await Promise.all([...Array(countArticles)].map(async () => await generateArticle()));
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
