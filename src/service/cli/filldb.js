'use strict';

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Alias = require(`../models/alias`);
const namespace = require(`../lib/namespace`);
const {getLogger} = require(`../lib/logger`);
const {
  asyncReadFile,
  splitString,
  getPathFile,
  generatePublications
} = require(`../../utils`);
const {DEFAULT_COUNT_PUBLICATION} = require(`../../constants`);

const logger = getLogger({name: namespace.API});

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      logger.info(`Connection to database established`);
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }

    const {Category, Publication} = defineModels(sequelize);

    defineModels(sequelize);

    await sequelize.sync({force: true});

    const titlesContent = await asyncReadFile(getPathFile(`data`, `titles.txt`));
    const sentencesContent = await asyncReadFile(getPathFile(`data`, `sentences.txt`));
    const categoriesContent = await asyncReadFile(getPathFile(`data`, `categories.txt`));
    const commentsContent = await asyncReadFile(getPathFile(`data`, `comments.txt`));

    const titles = splitString(titlesContent, `\n`);
    const sentences = splitString(sentencesContent, `\n`);
    const comments = splitString(commentsContent, `\n`);
    const categories = splitString(categoriesContent, `\n`);

    const categoryModels = await Category.bulkCreate(
        categories.map((item) => ({name: item}))
    );

    const [count] = args;
    const publicationsCount = Number.parseInt(count, 10) || DEFAULT_COUNT_PUBLICATION;
    const publications = await generatePublications(publicationsCount, titles, categoryModels, sentences, comments);

    const publicationPromises = publications.map(async (publication) => {
      const publicationModel = await Publication.create(publication, {include: [Alias.COMMENTS]});
      await publicationModel.addCategories(publication.categories);
    });

    await Promise.all(publicationPromises);
  }
};
