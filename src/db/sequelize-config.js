'use strict';

const {AppEnvironment, ENV} = require(`../common/enums`);

module.exports = {
  [AppEnvironment.DEVELOPMENT]: {
    database: ENV.DB_NAME,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    dialect: ENV.DB_DIALECT
  },
};
