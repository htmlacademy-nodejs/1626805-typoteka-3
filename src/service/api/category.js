'use strict';
const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../constants`);

const categoryRoute = new Router();

const initCategoryApi = (app, service) => {
  app.use(`/categories`, categoryRoute);

  // GET /api/categories — возвращает список категорий;
  categoryRoute.get(`/`, (_, res) => {
    const categories = service.findAll();

    return res.status(HTTP_STATUS_CODE.OK).json([...categories]);
  });
};

module.exports = {
  initCategoryApi
};
