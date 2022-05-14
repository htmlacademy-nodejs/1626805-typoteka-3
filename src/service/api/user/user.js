'use strict';

const {Router} = require(`express`);
const {HTTP_STATUS_CODE} = require(`../../../constants`);

const userValidator = require(`../../middlewares`);

const passwordUtils = require(`../../lib/password`);

const initUserApi = (app, service) => {
  const route = new Router();

  app.use(`/user`, route);

  // userValidator is not function как это исправить я не знаю
  route.post(`/`, userValidator(service), async (req, res) => {
    const data = req.body;

    data.passwordHash = await passwordUtils.hash(data.password);

    const result = await service.create(data);

    delete result.passwordHash;

    res.status(HTTP_STATUS_CODE.CREATED)
      .json(result);
  });
};

module.exports = {
  initUserApi
};
