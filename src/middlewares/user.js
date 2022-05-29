'use strict';

const {CreatedUserValidationMessage, HttpCode, SsrMainPath} = require(`../common/enums`);

const checkAlreadyRegister = (service) => async (req, res, next) => {
  const user = await service.findByEmail(req.body.email);
  const hasUser = Boolean(user);

  if (hasUser) {
    return res.status(HttpCode.BAD_REQUEST).send({
      messages: [CreatedUserValidationMessage.EMAIL_ALREADY_REGISTER],
    });
  }

  return next();
};

const checkUserAuthenticate = (req, res, next) => {
  const {user} = req.session;
  const isLogin = Boolean(user);

  if (!isLogin) {
    return res.redirect(SsrMainPath.LOGIN);
  }

  return next();
};


module.exports = {
  checkAlreadyRegister,
  checkUserAuthenticate,
};
