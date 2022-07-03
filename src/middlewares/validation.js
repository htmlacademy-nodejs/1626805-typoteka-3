'use strict';

const {ValidationError} = require(`joi`);
const {HttpCode} = require(`../common/enums`);

const validateParamSchema = (schema, param) => async (req, res, next) => {
  const currentParam = req.params[param];

  try {
    await schema.validateAsync(currentParam, {abortEarly: false});
  } catch (err) {
    if (err instanceof ValidationError) {
      const {details} = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        messages: details.map((error) => error.message)
      });
    }
  }

  return next();
};

const validateSchema = (schema) => async (req, res, next) => {
  const {body} = req;

  try {
    await schema.validateAsync(body, {
      abortEarly: false,
      convert: false
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      const {details} = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        messages: details.map((error) => error.message)
      });
    }
  }

  return next();
};

const validateQuerySchema = (schema, param) => async (req, res, next) => {
  const currentParam = req.query[param];

  try {
    await schema.validateAsync(currentParam, {abortEarly: false});
  } catch (err) {
    if (err instanceof ValidationError) {
      const {details} = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        messages: details.map((error) => error.message)
      });
    }
  }

  return next();
};

module.exports = {
  validateSchema,
  validateParamSchema,
  validateQuerySchema
};
