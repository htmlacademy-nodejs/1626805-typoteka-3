'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();

articleRouter.get(`/add`, (req, res) => res.render(`post`));
articleRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articleRouter.get(`/edit/:id`, (req, res) => res.render(`post`));
articleRouter.get(`/:id`, (req, res) => res.render(`post-detail`));

module.exports = articleRouter;
