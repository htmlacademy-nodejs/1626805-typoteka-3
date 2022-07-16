'use strict';

const {Router} = require(`express`);
const {ApiPath, CategoryApiPath, HttpCode} = require(`../../../common/enums`);

const initCategoryApi = (app, {categoryService}) => {
  const categoryRouter = new Router();

  app.use(ApiPath.CATEGORIES, categoryRouter);

  categoryRouter.get(CategoryApiPath.ROOT, async (_req, res) => {
    const categories = await categoryService.findAll();

    return res.status(HttpCode.OK).json(categories);
  });
};

module.exports = {
  initCategoryApi,
};
