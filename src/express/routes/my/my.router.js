'use strict';

const {Router} = require(`express`);
const myRoute = new Router();
const api = require(`../../api`).getAPI();

myRoute.get(`/`, async (_, res) => {
  const articles = await api.getArticles();

  return res.render(`pages/my/my`, {
    articles,
  });
});

myRoute.get(`/comments`, async (_, res) => {
  const articles = await api.getArticles();

  return res.render(`pages/my/comments`, {
    articles,
  });
});

module.exports = myRoute;
