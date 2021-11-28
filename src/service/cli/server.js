'use strict';


const express = require(`express`);
const chalk = require(`chalk`);
const articleRoutes = require(`../../express/routes/post-routes`);

const app = express();

const {DEFAULT_PORT} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(args) {
    const [port] = args;

    app.use(`/posts`, articleRoutes);

    app.listen(DEFAULT_PORT, () => {
      console.log(chalk.green(`Сервер запущен на порту ${port || DEFAULT_PORT}`));
    });
  }
};
