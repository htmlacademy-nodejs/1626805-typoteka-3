'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../../constants`);
const {publicationValidator} = require(`../../middlewares`);

const initPublicationsApi = (app, service) => {
  const publicationRouter = new Router();

  app.use(`/publications`, publicationRouter);

  // GET /api/publications — ресурс возвращает список публикаций;
  publicationRouter.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;

    let result;
    if (limit || offset) {
      result = await service.findPage({limit, offset});
    } else {
      result = await service.findAll(comments);
    }
    res.status(HTTP_STATUS_CODE.OK).json(result);
  });

  // GET /api/publications/:publicationId — возвращает полную информацию о публикации;
  publicationRouter.get(`/:publicationId`, async (req, res) => {
    const {publicationId} = req.params;
    const publication = await service.findOne(publicationId);

    if (!publication) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${publicationId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(publication);
  });

  // POST /api/publications — создаёт новую публикацию;
  publicationRouter.post(`/`, publicationValidator, async (req, res) => {
    const newPublication = await service.create(req.body);

    res.status(HTTP_STATUS_CODE.CREATED).json(newPublication);
  });

  // PUT /api/publications/:publicationId — редактирует определённую публикацию;
  publicationRouter.put(`/:publicationId`, publicationValidator, async (req, res) => {
    const {publicationId} = req.params;
    const updatedPublication = req.body;
    const publication = await service.update(publicationId, updatedPublication);

    if (!publication) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${publicationId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(publication);
  });

  // DELETE /api/publications/:publicationId — удаляет определённую публикацию;
  publicationRouter.delete(`/:publicationId`, async (req, res) => {
    const {publicationId} = req.params;
    const deletedPublications = await service.drop(publicationId);

    if (!deletedPublications) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${publicationId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(deletedPublications);
  });
};

module.exports = {
  initPublicationsApi
};
