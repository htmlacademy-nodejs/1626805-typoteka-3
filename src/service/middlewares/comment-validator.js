'use strict';

const Joi = require(`joi`);
const {HTTP_STATUS_CODE, VALIDATION} = require(`../../constants`);

const ErrorCommentMessage = {
  TEXT: `Комментарий содержит меньше 20 символов`,
  USER_ID: `Некорректный идентификатор пользователя`
};

const schema = Joi.object({
  text: Joi.string().min(VALIDATION.MIN_COMMENT_LENGTH).required().messages({
    'string.min': ErrorCommentMessage.TEXT
  }),
  userId: Joi.number().integer().positive().required().messages({
    'number.base': ErrorCommentMessage.USER_ID
  })
});

module.exports = (req, res, next) => {
  const comment = req.body;
  const {error} = schema.validate(comment, {abortEarly: false});

  if (error) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
