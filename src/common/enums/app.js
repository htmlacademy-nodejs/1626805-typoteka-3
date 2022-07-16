'use strict';

const ENV = process.env;

const AppEnvironment = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const LogLevel = {
  INFO: `info`,
  ERROR: `error`
};

const LoggerName = {
  API: `api`,
  BASE_LOGGER: `base-logger`
};

module.exports = {
  ENV,
  AppEnvironment,
  LogLevel,
  LoggerName
};
