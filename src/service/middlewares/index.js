'use strict';

const publicationValidator = require(`./publication-validator`);
const commentValidator = require(`./comment-validator`);
const paramsIdValidator = require(`./params-id-validator`);

module.exports = {
  publicationValidator,
  commentValidator,
  paramsIdValidator
};
