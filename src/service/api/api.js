'use strict';

const {Router} = require(`express`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const {initPublicationsApi} = require(`./publication/publication`);
const {initCategoryApi} = require(`./category/category`);
const {initSearchApi} = require(`./search/search`);
const {initCommentApi} = require(`./comment/comment`);
const {PublicationService, CategoryService, SearchService, CommentService} = require(`../data-service`);

const app = new Router();

defineModels(sequelize);

(async () => {
  try {
    initCategoryApi(app, new CategoryService(sequelize));
    initSearchApi(app, new SearchService(sequelize));
    initPublicationsApi(app, new PublicationService(sequelize));
    initCommentApi(app, new CommentService(sequelize));
  } catch (error) {
    console.log(error);
  }
})();

module.exports = app;
