'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/main/main.router`);
const myRoutes = require(`./routes/my/my.router`);
const publicationRoutes = require(`./routes/publications/publications.router`);
const categoryRoutes = require(`./routes/categories/categories.router`);
const commentRoutes = require(`./routes/comments/comments.router`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const {HTTP_STATUS_CODE} = require(`../constants`);

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
  extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/publications`, publicationRoutes);
app.use(`/categories`, categoryRoutes);
app.use(`/comments`, commentRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use((_, res) => res.status(HTTP_STATUS_CODE.BAD_REQUEST).render(`pages/errors/404`));
app.use((_err, _req, res, _next) => res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).render(`pages/errors/500`));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
