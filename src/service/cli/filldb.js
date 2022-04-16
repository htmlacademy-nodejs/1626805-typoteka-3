'use strict';

const path = require(`path`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);
const {
  asyncReadFile,
  getRandomIntInclusive,
  textToArrayByDivider,
  generateText,
  getRandomSubarray
} = require(`../../utils`);

const MAX_ANNOUNCE_COUNT = 5;
const DEFAULT_COUNT = 5;

const logger = getLogger({name: `api`});

const getPathToData = (fileName) => {
  return path.join(__dirname, `../..`, `data`, fileName);
};

const generatePublications = async (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => {
    const randomIndexForTitle = getRandomIntInclusive(0, titles.length - 1);

    return {
      title: titles[randomIndexForTitle],
      announcement: generateText(MAX_ANNOUNCE_COUNT, sentences),
      text: generateText(sentences.length - 1, sentences),
      categories: getRandomSubarray(categories),
      comments: getRandomSubarray(comments.map((item) => ({text: item})))
    };
  });
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const {Category, Publication} = defineModels(sequelize);

    defineModels(sequelize);

    await sequelize.sync({force: true});

    // Таблицы созданы
    // TODO
    // + создать генератор
    // + заполнить каждую таблицу данными
    // - переписать сервис для работы с данными, сделать так чтобы можно было работать с данными из БД

    const titlesContent = await asyncReadFile(getPathToData(`titles.txt`));
    const sentencesContent = await asyncReadFile(getPathToData(`sentences.txt`));
    const categoriesContent = await asyncReadFile(getPathToData(`categories.txt`));
    const commentsContent = await asyncReadFile(getPathToData(`comments.txt`));

    const titles = textToArrayByDivider(titlesContent, `\n`);
    const sentences = textToArrayByDivider(sentencesContent, `\n`);
    const comments = textToArrayByDivider(commentsContent, `\n`);
    const categories = textToArrayByDivider(categoriesContent, `\n`);

    const categoryModels = await Category.bulkCreate(
        categories.map((item) => ({name: item}))
    );

    const [count] = args;
    const countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const publications = await generatePublications(countPublications, titles, categoryModels, sentences, comments);

    const publicationPromises = publications.map(async (publication) => {
      const publicationModel = await Publication.create(publication, {include: [Aliase.COMMENTS]});
      await publicationModel.addCategories(publication.categories);
    });

    await Promise.all(publicationPromises);
  }
};
