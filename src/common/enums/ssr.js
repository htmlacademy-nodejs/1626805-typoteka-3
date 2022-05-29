'use strict';

const SsrArticlePath = {
  $ARTICLE_ID: `/:id`,
  $ARTICLE_ID_COMMENT: `/:id/comments`,
  EDIT_$ARTICLE_ID: `/edit/:id`,
  ADD: `/add`,
  CATEGORY_$ARTICLE_ID: `/category/:id`,
};

const SsrMainPath = {
  ROOT: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  SEARCH: `/search`,
};

const SsrMyPath = {
  ROOT: `/`,
  COMMENTS: `/comments`,
};

const SsrPath = {
  MAIN: `/`,
  MY: `/my`,
  ARTICLES: `/articles`,
};

module.exports = {
  SsrArticlePath,
  SsrMainPath,
  SsrMyPath,
  SsrPath
};
