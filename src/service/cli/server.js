'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT, API_PREFIX} = require(`../../constants`);
const initApi = require(`../api/api`);

const app = express();

app.use(express.json());
app.use(API_PREFIX, initApi);

module.exports = {
  name: `--server`,
  run(args) {
    const [port] = args;

    const server = app.listen(DEFAULT_PORT, () => {
      console.log(chalk.green(`Сервер запущен на порту ${port || DEFAULT_PORT}`));
    });

    server.once(`error`, (err) => {
      console.error(`Ошибка при создании сервера`, err);
    });
  }
};
