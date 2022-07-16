'use strict';

const ModelAlias = {
  USER: `user`,
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  ARTICLES: `articles`,
  ARTICLE: `article`,
  ARTICLE_CATEGORIES: `articleCategories`
};

const ModelName = {
  CATEGORY: `Category`,
  COMMENT: `Comment`,
  ARTICLE: `Article`,
  ARTICLE_CATEGORY: `ArticleCategory`,
  USER: `User`,
  SESSION: `Session`
};

const TableName = {
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  USERS: `users`,
  ARTICLES: `articles`,
  ARTICLES_CATEGORIES: `articles_categories`,
  SESSIONS: `sessions`
};

module.exports = {
  ModelAlias,
  ModelName,
  TableName
};
