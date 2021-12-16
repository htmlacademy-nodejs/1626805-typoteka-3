'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articleRoutes = require(`./routes/article-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const {HTTP_STATUS_CODE} = require(`../constants`);

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articleRoutes);

app.use((_, res) =>
  res.status(HTTP_STATUS_CODE.BAD_REQUEST).render(`errors/404`)
);
app.use((_err, _req, res, _next) =>
  res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).render(`errors/500`)
);

app.listen(DEFAULT_PORT);
