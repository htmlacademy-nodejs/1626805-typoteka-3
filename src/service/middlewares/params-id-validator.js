'use strict';

const Joi = require(`joi`);
const {HTTP_STATUS_CODE} = require(`../../constants`);

const ErrorMessage = {
  NUMBER: `id должно быть числом`
};

const schema = Joi.object({
  publicationId: Joi.number().messages({
    'number.base': ErrorMessage.NUMBER
  })
});

module.exports = (req, res, next) => {
  const {publicationId} = req.params;
  const {error} = schema.validate({publicationId}, {abortEarly: false});

  if (error) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
