'use strict';

const path = require(`path`);
const express = require(`express`);
const {Api, DiskStorage} = require(`../express/services`);
const {HttpCode} = require(`../common/enums`);
const {initMainRouter} = require(`../express/routes/main/main`);
const {initMyRouter} = require(`../express/routes/my/my`);
const {initArticlesRouter} = require(`../express/routes/articles/articles`);
const {sessionMiddleware} = require(`./session`);
const {AppConfig} = require(`./common`);

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(sessionMiddleware);

const uploadImgPath = path.resolve(__dirname, `./${AppConfig.UPLOAD_DIR}/img/`);
const api = new Api({
  baseURL: AppConfig.API_URL,
  timeout: AppConfig.API_TIMEOUT,
});
const storage = new DiskStorage({
  destination: uploadImgPath
});
const routerSettings = {
  api,
  storage
};

initMainRouter(app, routerSettings);
initMyRouter(app, routerSettings);
initArticlesRouter(app, routerSettings);

app.use(express.static(path.resolve(__dirname, AppConfig.PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, AppConfig.UPLOAD_DIR)));

app.use((_req, res) => {
  return res.status(HttpCode.BAD_REQUEST).render(`pages/errors/404`, {
    errorCode: HttpCode.NOT_FOUND
  });
});
app.use((_err, _req, res, _next) => {
  return res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`pages/errors/500`, {
    errorCode: HttpCode.INTERNAL_SERVER_ERROR
  });
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(AppConfig.DEFAULT_PORT);
