'use strict';

const Joi = require(`joi`);
const {HTTP_STATUS_CODE, VALIDATION} = require(`../../constants`);

const ErrorOfferMessage = {
  TITLE_MIN: `Заголовок содержит меньше 10 символов`,
  TITLE_MAX: `Заголовок не может содержать более 100 символов`,
  CATEGORIES: `Не выбрана ни одна категория объявления`,
  TEXT_MAX: `Текст не может содержать более 1000 символов`,
  ANNOUNCE_MIN: `Описание содержит меньше 30 символов`,
  ANNOUNCE_MAX: `Описание не может содержать более 1000 символов`,
  PICTURE: `Изображение не выбрано или тип изображения не поддерживается`
};

const schema = Joi.object({
  title: Joi.string().min(VALIDATION.MIN_TITLE_LENGTH).max(VALIDATION.MAX_TITLE_LENGTH).required().messages({
    'string.min': ErrorOfferMessage.TITLE_MIN,
    'string.max': ErrorOfferMessage.TITLE_MAX
  }),
  announcement: Joi.string().min(VALIDATION.MIN_ANNOUNCE_LENGTH).max(VALIDATION.MAX_ANNOUNCE_LENGTH).required().messages({
    'string.min': ErrorOfferMessage.ANNOUNCE_MIN,
    'string.max': ErrorOfferMessage.ANNOUNCE_MAX
  }),
  text: Joi.string().max(VALIDATION.MAX_FILL_TEXT_LENGTH).required().messages({
    'string.max': ErrorOfferMessage.TEXT_MAX
  }),
  picture: Joi.string().required().messages({
    'string.empty': ErrorOfferMessage.PICTURE
  }),
  categories: Joi.array().items(Joi.string()).min(1).required().messages({
    'string.base': ErrorOfferMessage.CATEGORIES
  })
});

module.exports = (req, res, next) => {
  const newPublication = req.body;
  const {error} = schema.validate(newPublication, {abortEarly: false});

  if (error) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
