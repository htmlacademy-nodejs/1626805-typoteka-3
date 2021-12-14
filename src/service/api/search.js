'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../constants`);

const searchRouter = new Router();

const initSearchApi = (app, service) => {
  app.use(`/search`, searchRouter);

  // GET /api/search?query= — возвращает результаты поиска.
  // Поиск публикаций выполняется по заголовку.
  // Публикация соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
  searchRouter.get(`/`, (req, res) => {
    const {query} = req.query;
    const articles = service.search(query);

    res.status(HTTP_STATUS_CODE.OK).json(articles);
  });
};

module.exports = {
  initSearchApi
};
