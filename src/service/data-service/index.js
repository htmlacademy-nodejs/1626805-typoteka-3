'use strict';

const PublicationService = require(`./publication`);
const CategoryService = require(`./category`);
const SearchService = require(`./search`);
const CommentService = require(`./comment`);
const UserService = require(`./user`);

module.exports = {
  PublicationService,
  CategoryService,
  SearchService,
  CommentService,
  UserService
};
