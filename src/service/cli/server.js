'use strict';

const express = require(`express`);
const {DEFAULT_PORT, API_PREFIX, HTTP_STATUS_CODE, EXIT_CODE} = require(`../../constants`);
const initApi = require(`../api/api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

const app = express();

app.use(express.json());
app.use(API_PREFIX, initApi);

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use((req, res) => {
  res.status(HTTP_STATUS_CODE.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [port] = args;
    try {
      app.listen(DEFAULT_PORT, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port || DEFAULT_PORT}`);
      });

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(EXIT_CODE.error);
    }
  }
};
