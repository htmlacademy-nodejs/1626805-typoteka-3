'use strict';
const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../../constants`);

const initCategoryApi = (app, service) => {
  const categoryRoute = new Router();

  app.use(`/categories`, categoryRoute);

  // GET /api/categories — возвращает список категорий;
  categoryRoute.get(`/`, async (_, res) => {
    const categories = await service.findAll();

    return res.status(HTTP_STATUS_CODE.OK).json([...categories]);
  });
};

module.exports = {
  initCategoryApi
};
