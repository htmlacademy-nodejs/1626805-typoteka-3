'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../constants`);
const {articleValidator} = require(`../middlewares`);

const articleRouter = new Router();

const initArticlesApi = (app, service) => {
  app.use(`/articles`, articleRouter);

  // GET /api/articles — ресурс возвращает список публикаций;
  articleRouter.get(`/`, (_, res) => {
    console.log(`/`);
    const articles = service.findAll();

    res.status(HTTP_STATUS_CODE.OK).json(articles);
  });

  // GET /api/articles/:articleId — возвращает полную информацию о публикации;
  articleRouter.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(article);
  });

  // POST /api/articles — создаёт новую публикацию;
  articleRouter.post(`/`, articleValidator, (req, res) => {
    const newArticle = service.create(req.body);

    res.status(HTTP_STATUS_CODE.OK).json(newArticle);
  });

  // PUT /api/articles/:articleId — редактирует определённую публикацию;
  articleRouter.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = req.body;
    const article = service.update(articleId, updatedArticle);

    if (!article) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(article);
  });

  // DELETE /api/articles/:articleId — удаляет определённую публикацию;
  articleRouter.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticles = service.drop(articleId);

    if (!deletedArticles) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(deletedArticles);
  });

  // GET /api/articles/:articleId/comments — возвращает список комментариев
  // определённой публикации;
  articleRouter.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;

    const comments = service.findComments(articleId);

    if (!comments) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(comments);
  });

  // DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой
  // публикации комментарий с идентификатором;
  articleRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {articleId, commentId} = req.params;

    const deletedComments = service.dropComments(articleId, commentId);

    if (!deletedComments) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(deletedComments);
  });

  // POST /api/articles/:articleId/comments — создаёт новый комментарий;
  articleRouter.post(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const payload = req.body;

    const newComment = service.createComment(articleId, payload);

    if (!newComment) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    res.status(HTTP_STATUS_CODE.OK).json(newComment);
  });
};

module.exports = {
  initArticlesApi
};
