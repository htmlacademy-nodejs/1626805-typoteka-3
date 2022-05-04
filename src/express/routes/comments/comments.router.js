'use strict';

const {Router} = require(`express`);

const commentRouter = new Router();
const api = require(`../../api`).getAPI();

commentRouter.post(`/add`, async (req, res) => {
  const {body} = req;
  const {comment, publicationId} = body;

  try {
    await api.addComments(publicationId, {text: comment});
    res.redirect(`/publications/${publicationId}`);
  } catch (e) {
    res.redirect(`back`);
  }

});

module.exports = commentRouter;
