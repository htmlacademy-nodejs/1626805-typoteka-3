'use strict';

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
// const Aliase = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--filldb`,
  async run(args) {
    console.log(` - filldb - `, args);

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    // const {Category, Comment, Publication, Role, User, PublicationCategory} = defineModels(sequelize);

    defineModels(sequelize);

    await sequelize.sync({force: true});

    // Таблицы созданы
    // TODO
    // - создать генератор
    // - заполнить каждую таблицу данными
    // - переписать сервис для работы с данными, сделать так чтобы можно было работать с данными из БД
  }
};
