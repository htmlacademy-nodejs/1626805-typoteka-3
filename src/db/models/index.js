'use strict';

const defineArticleModel = require(`./article`);
const defineArticleCategoryModel = require(`./article-category`);
const defineCategoryModel = require(`./category`);
const defineCommentModel = require(`./comment`);
const defineUserModel = require(`./user`);
const defineSessionModel = require(`./session`);

module.exports = {
  defineArticleModel,
  defineArticleCategoryModel,
  defineCategoryModel,
  defineCommentModel,
  defineUserModel,
  defineSessionModel,
};
