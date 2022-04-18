'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../../constants`);
const {commentValidator} = require(`../../middlewares`);

const initCommentApi = (app, service) => {
  const commentRouter = new Router();

  app.use(`/comments`, commentRouter);

  // GET /api/comments/:publicationId — ресурс возвращает список комментариев по publicationId;
  commentRouter.get(`/:publicationId`, async (req, res) => {
    const {publicationId} = req.params;
    const comments = await service.findAll(publicationId);

    res.status(HTTP_STATUS_CODE.OK).json(comments);
  });

  // DELETE /api/comments/:publicationId/:commentId — удаляет из определённой
  // публикации комментарий с идентификатором;
  commentRouter.delete(`/:publicationId/:commentId`, async (req, res) => {
    const {publicationId, commentId} = req.params;

    const deletedComments = await service.drop(publicationId, commentId);

    if (!deletedComments) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(deletedComments);
  });

  // POST /api/comments/:publicationId — создаёт новый комментарий;
  commentRouter.post(`/:publicationId`, commentValidator, async (req, res) => {
    const {publicationId} = req.params;
    const payload = req.body;

    const newComment = await service.create(publicationId, payload);

    if (!newComment) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${publicationId}`);
    }

    res.status(HTTP_STATUS_CODE.CREATED).json(newComment);
  });
};

module.exports = {
  initCommentApi
};
