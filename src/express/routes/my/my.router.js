'use strict';

const {Router} = require(`express`);
const myRoute = new Router();
const api = require(`../../api`).getAPI();

myRoute.get(`/`, async (_, res) => {
  const publications = await api.getPublications();

  return res.render(`pages/my/my`, {
    publications,
  });
});

myRoute.get(`/comments`, async (_, res) => {
  const publications = await api.getPublications();

  return res.render(`pages/my/comments`, {
    publications,
  });
});

module.exports = myRoute;
