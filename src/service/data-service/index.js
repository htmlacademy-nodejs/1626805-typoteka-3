'use strict';

const PublicationService = require(`./publication`);
const CategoryService = require(`./category`);
const SearchService = require(`./search`);
const CommentService = require(`./comment`);

module.exports = {
  PublicationService,
  CategoryService,
  SearchService,
  CommentService
};
