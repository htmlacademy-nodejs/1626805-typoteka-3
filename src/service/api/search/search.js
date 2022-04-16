'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../../constants`);

const initSearchApi = (app, service) => {
  const searchRouter = new Router();

  app.use(`/search`, searchRouter);

  // GET /api/search?query= — возвращает результаты поиска.
  // Поиск публикаций выполняется по заголовку.
  // Публикация соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
  searchRouter.get(`/`, async (req, res) => {
    const {query} = req.query;

    if (query === undefined) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(`Bag request`);
    }

    const publications = await service.findAll(query);

    if (publications.length) {
      res.status(HTTP_STATUS_CODE.OK).json(publications);
    } else {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json(`Not found`);
    }
  });
};

module.exports = {
  initSearchApi
};
