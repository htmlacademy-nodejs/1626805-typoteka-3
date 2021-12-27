'use strict';

const {Router} = require(`express`);
const myRoute = new Router();
const api = require(`../../api`).getAPI();

// DONE
myRoute.get(`/`, async (_, res) => {
  const articles = await api.getArticles();

  return res.render(`pages/my/my`, {
    articles,
  });
});

// DONE
myRoute.get(`/comments`, async (_, res) => {
  const articles = await api.getArticles();

  return res.render(`pages/my/comments`, {
    articles,
  });
});

module.exports = myRoute;
