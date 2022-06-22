'use strict';

const ApiPath = {
  SEARCH: `/search`,
  CATEGORIES: `/categories`,
  ARTICLES: `/articles`,
  USERS: `/users`,
};

const ArticlesApiPath = {
  ROOT: `/`,
  $ARTICLE_ID: `/:articleId`,
  $ARTICLE_ID_COMMENTS: `/:articleId/comments`,
  $ARTICLE_ID_COMMENTS_$COMMENT_ID: `/:articleId/comments/:commentId`,
};

const CategoryApiPath = {
  ROOT: `/`,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const HttpMethod = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const RequestParam = {
  ID: `id`,
  ARTICLE_ID: `articleId`,
  COMMENT_ID: `commentId`,
};

const SearchApiPath = {
  ROOT: `/`,
};

const UsersApiPath = {
  ROOT: `/`,
  LOGIN: `/login`,
};

module.exports = {
  HttpCode,
  ApiPath,
  SearchApiPath,
  CategoryApiPath,
  ArticlesApiPath,
  HttpMethod,
  RequestParam,
  UsersApiPath,
};
