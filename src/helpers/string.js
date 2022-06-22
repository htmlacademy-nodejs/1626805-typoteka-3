'use strict';

const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);

const DEFAULT_ID_LENGTH = 6;

const getRandomId = (size = DEFAULT_ID_LENGTH) => {
  const randomId = nanoid(size);

  return randomId;
};

const paintMessage = (message, color) => {
  const paintedMessage = chalk[color](message);

  return paintedMessage;
};

module.exports = {
  paintMessage,
  getRandomId,
};
