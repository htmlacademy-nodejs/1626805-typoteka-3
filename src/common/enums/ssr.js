'use strict';

const SsrArticlePath = {
  $ARTICLE_ID: `/:id`,
  $ARTICLE_ID_COMMENT: `/:id/comments`,
  EDIT_$ARTICLE_ID: `/edit/:id`,
  ADD: `/add`,
  CATEGORY_$CATEGORY_ID: `/category/:id`
};

const SsrMainPath = {
  ROOT: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  SEARCH: `/search`,
  CATEGORIES: `/categories`,
  CATEGORIES_$CATEGORY_ID: `/categories/:id`
};

const SsrMyPath = {
  ROOT: `/`,
  $ARTICLE_ID: `/:id`,
  COMMENTS: `/comments`,
  ARTICLES_$ARTICLE_ID_COMMENTS_$COMMENT_ID: `/articles/:articleId/comments/:commentId`
};

const SsrPath = {
  MAIN: `/`,
  MY: `/my`,
  ARTICLES: `/articles`
};

module.exports = {
  SsrArticlePath,
  SsrMainPath,
  SsrMyPath,
  SsrPath
};
