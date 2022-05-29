'use strict';

const AppEnvironment = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

const {
  NODE_ENV,
  LOG_LEVEL,
  API_PORT,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  SECRET,
} = process.env;

const ENV = {
  NODE_ENV,
  LOG_LEVEL,
  API_PORT,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  SECRET,
};

const LogLevel = {
  INFO: `info`,
  ERROR: `error`,
};

const LoggerName = {
  API: `api`,
  BASE_LOGGER: `base-logger`,
};

module.exports = {
  AppEnvironment,
  ENV,
  LogLevel,
  LoggerName,
};
