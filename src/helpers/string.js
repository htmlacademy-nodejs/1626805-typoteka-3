'use strict';

const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);

const DEFAULT_ID_LENGTH = 6;

const getRandomId = (size = DEFAULT_ID_LENGTH) => nanoid(size);
const paintMessage = (message, color) => chalk[color](message);

module.exports = {
  paintMessage,
  getRandomId
};
