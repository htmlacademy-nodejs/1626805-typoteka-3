'use strict';

const {Router} = require(`express`);
const {initArticlesApi} = require(`./article/article`);
const {initCategoryApi} = require(`./category/category`);
const {initSearchApi} = require(`./search/search`);
const {articleService, categoryService, searchService} = require(`../data-service`);

const getMockData = require(`../lib/get-mock-data`);

const apiRouter = new Router();

(async () => {
  try {
    const mockedData = await getMockData();

    initArticlesApi(apiRouter, articleService(mockedData));
    initCategoryApi(apiRouter, categoryService(mockedData));
    initSearchApi(apiRouter, searchService(mockedData));
  } catch (error) {
    console.log(error);
  }
})();

module.exports = apiRouter;
