'use strict';

const {define: defineArticleModel} = require(`./article`);
const {define: defineArticleCategoryModel} = require(`./article-category`);
const {define: defineCategoryModel} = require(`./category`);
const {define: defineCommentModel} = require(`./comment`);
const {define: defineUserModel} = require(`./user`);
const {define: defineSessionModel} = require(`./session`);

module.exports = {
  defineArticleModel,
  defineArticleCategoryModel,
  defineCategoryModel,
  defineCommentModel,
  defineUserModel,
  defineSessionModel,
};
