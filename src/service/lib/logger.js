'use strict';

const pipo = require(`pino`);
const {Env} = require(`../../constants`);

// const LOG_FILE = `./logs/api.log`;
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pipo({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  ...(isDevMode ? {transport: {target: `pino-pretty`}} : {}),
});

// Так не понял как мне быть с pino.destination
// выводит ошибку
// isDevMode ? process.stdout : pino.destination(LOG_FILE)

module.exports = {
  logger,
  getLogger(option = {}) {
    return logger.child(option);
  }
};
