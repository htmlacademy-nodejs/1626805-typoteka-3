'use strict';

const ArticleKey = {
  ID: `id`,
  TITLE: `title`,
  CREATED_DATE: `createdDate`,
  IMAGE: `image`,
  ANNOUNCE: `announce`,
  FULL_TEXT: `fullText`,
  CATEGORIES: `categories`,
  COMMENTS: `comments`
};

const ArticleCategoryKey = {
  ARTICLE_ID: `articleId`,
  CATEGORY_ID: `categoryId`
};

module.exports = {
  ArticleKey,
  ArticleCategoryKey
};
